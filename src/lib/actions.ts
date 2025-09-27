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
  // This URL should point to your running ASP.NET Web API.
  const apiLoginUrl = 'http://localhost:5054/api/Admin/login'; 

  try {
    const response = await fetch(apiLoginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // The backend expects properties that match the Admin model (Email, Password).
      body: JSON.stringify({ Email: email, Password: password }),
    });

    if (response.ok) {
      // The backend returns a success message, so we can set our session.
      // const sessionData = await response.json(); 
      await setSession(); // Using our simple session for now
      redirect('/dashboard');
    } else {
      const errorData = await response.text();
      return {
        error: `Login failed: ${errorData || response.statusText}`,
      };
    }
  } catch (error) {
    console.error('API call failed:', error);
    if (error instanceof TypeError && error.message.includes('fetch failed')) {
      return {
         error: 'Connection failed. Please ensure the backend is running at ' + apiLoginUrl + ' and that there are no CORS issues.',
      };
    }
    return {
      error: 'Could not connect to the login service. Please ensure the backend is running and reachable.',
    };
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
