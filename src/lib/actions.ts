'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { setSession, deleteSession } from '@/lib/auth';
import { analyzeSymptoms } from '@/ai/flows/ai-symptom-analysis';

// --- Login Action ---
const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

export async function login(prevState: any, formData: FormData) {
  const validatedFields = loginSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: 'Invalid fields.',
    };
  }
  
  const { username, password } = validatedFields.data;

  // Hardcoded credentials for demo purposes
  if (username === 'admin' && password === 'password') {
    await setSession();
  } else {
    return {
      error: 'Invalid username or password.',
    };
  }
  
  redirect('/dashboard');
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
