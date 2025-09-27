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
      // The backend should return a token or session identifier.
      // For this example, we'll continue using our simple session management.
      await setSession();
      redirect('/dashboard');
    } else {
      // Try to read the error message from the backend.
      const errorText = await response.text();
      // If the backend provides a JSON error, you might need to parse it:
      // const errorJson = JSON.parse(errorText);
      console.error('Backend Login Error:', errorText);
      return { error: errorText || 'Invalid credentials provided.' };
    }
  } catch (error: any) {
    // This block catches network errors (e.g., backend is down).
    console.error('Network Error during login:', error);
    return { error: `Could not connect to the backend service. Please ensure it is running and accessible. Details: ${error.message}` };
  }
}


// --- Logout Action ---
export async function logout() {
  await deleteSession();
  redirect('/');
}

// --- Registration Action ---
const registerSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  mobile: z.string().min(10, 'A valid mobile number is required'),
  email: z.string().email('Invalid email address').optional().or(z.literal('')),
  age: z.coerce.number().min(1, 'Age is required'),
  gender: z.enum(['male', 'female', 'other'], { required_error: 'Gender is required' }),
  location: z.string().min(2, 'Location is required'),
  familyMembers: z.string().optional(),
});

export async function register(prevState: any, formData: FormData) {
  const validatedFields = registerSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: 'Invalid data provided. Please check the fields.',
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // In a real app, you would save this data to a database.
  console.log('New registration:', validatedFields.data);

  return { success: 'Registration successful! You can now use our services.' };
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
      console.error('API Error:', errorText);
      return { count: 0, error: `Failed to fetch patients: ${response.statusText}` };
    }
  } catch (error: any) {
    console.error('Network Error:', error);
    return { count: 0, error: `Could not connect to the backend service. ${error.message}` };
  }
}
