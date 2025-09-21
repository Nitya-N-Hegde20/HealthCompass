'use server';

/**
 * @fileOverview An AI-powered symptom analysis tool that suggests relevant medical specialists.
 *
 * - analyzeSymptoms - A function that handles the symptom analysis process.
 * - AISymptomAnalysisInput - The input type for the analyzeSymptoms function.
 * - AISymptomAnalysisOutput - The return type for the analyzeSymptoms function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AISymptomAnalysisInputSchema = z.object({
  symptoms: z
    .string()
    .describe('A description of the symptoms the user is experiencing.'),
  problemDescription: z
    .string()
    .optional()
    .describe('The problem description the user provided.'),
});
export type AISymptomAnalysisInput = z.infer<typeof AISymptomAnalysisInputSchema>;

const AISymptomAnalysisOutputSchema = z.object({
  suggestedSpecialists: z
    .string()
    .describe('A list of suggested medical specialists based on the symptoms.'),
  reasoning: z
    .string()
    .describe('The AI’s reasoning for suggesting the specialists.'),
});
export type AISymptomAnalysisOutput = z.infer<typeof AISymptomAnalysisOutputSchema>;

export async function analyzeSymptoms(input: AISymptomAnalysisInput): Promise<AISymptomAnalysisOutput> {
  return analyzeSymptomsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiSymptomAnalysisPrompt',
  input: {schema: AISymptomAnalysisInputSchema},
  output: {schema: AISymptomAnalysisOutputSchema},
  prompt: `You are an AI-powered tool that analyzes user-provided symptoms and suggests relevant medical specialists.

  Problem Description: {{{problemDescription}}}

  Symptoms: {{{symptoms}}}

  Based on the symptoms and problem description, suggest relevant medical specialists and explain your reasoning.
  Format your response as follows:

  Suggested Specialists: [specialist1], [specialist2], ...
  Reasoning: [explanation]`,
});

const analyzeSymptomsFlow = ai.defineFlow(
  {
    name: 'analyzeSymptomsFlow',
    inputSchema: AISymptomAnalysisInputSchema,
    outputSchema: AISymptomAnalysisOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
