'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { setSession, deleteSession } from '@/lib/auth';
import { analyzeSymptoms } from '@/ai/flows/ai-symptom-analysis';

// --- Login Action ---
const loginSchema = z.object({
  email: z.string().email('A valid email is required'),
  password: z.string().min(1, 'Password is required'),
});

export async function login(prevState: any, formData: FormData) {
  const validatedFields = loginSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: 'Invalid fields. Please provide a valid email and password.',
    };
  }
  
  const { email, password } = validatedFields.data;
  const apiLoginUrl = 'https://api.craftech.top/api/Admin/login';

  try {
    const response = await fetch(apiLoginUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ Email: email, Password: password }),
    });

    if (response.ok) {
      await setSession();
      redirect('/dashboard');
    } else {
      const errorText = await response.text();
      console.error('Backend Login Error:', errorText);
      return { error: `Login failed: ${errorText || response.statusText}` };
    }
  } catch (error: any) {
    console.error('Network Error during login:', error);
    return { error: `Could not connect to the login service. Details: ${error.message}` };
  }
}


// --- Logout Action ---
export async function logout() {
  await deleteSession();
  redirect('/');
}

// --- Chat Action ---
export async function getSymptomAnalysis(symptoms: string) {
  try {
    const result = await analyzeSymptoms({
      symptoms,
      problemDescription: "A user is looking for a medical specialist based on their symptoms."
    });
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to get analysis. Please try again.' };
  }
}

// --- Dashboard Actions ---
export async function getPatientCount(): Promise<{ count: number; error: string | null; }> {
  const apiPatientsUrl = 'https://api.craftech.top/api/Admin/patients';

  try {
    const response = await fetch(apiPatientsUrl, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store', // Ensure we always get fresh data
    });

    if (response.ok) {
      const patients = await response.json();
      return { count: patients.length, error: null };
    } else {
      const errorText = await response.text();
      console.error('API Error fetching patients:', errorText);
      return { count: 0, error: `Failed to fetch patient data: ${errorText || response.statusText}` };
    }
  } catch (error: any) {
    console.error('Network Error fetching patients:', error);
    return { count: 0, error: `Could not connect to the patient data service. Details: ${error.message}` };
  }
}
