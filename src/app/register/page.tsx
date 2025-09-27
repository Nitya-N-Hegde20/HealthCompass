'use client';

import React, { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

export default function RegisterPage() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage(null);

    const formData = new FormData(e.currentTarget);

    // Map frontend fields to backend model
    const payload = {
      FullName: formData.get("name"),
      Age: Number(formData.get("age")),
      Gender: formData.get("gender"),
      Phone: formData.get("mobile"),
      Email: formData.get("email"),
      Address: formData.get("location"),
    };

    try {
      const response = await fetch("https://api.craftech.top/api/Patient/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setSuccessMessage(data.message);
      toast({
        title: "Success!",
        description: data.message,
      });
    } catch (err: any) {
       let errorMessage = err.message;
       if (err instanceof TypeError && err.message === 'Failed to fetch') {
         errorMessage = 'Could not connect to the server. This may be a CORS issue. Please ensure the backend allows requests from this origin.';
       }
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-[calc(100vh-4rem)] py-12 px-4">
      <Image
        src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop"
        alt="Doctor using a tablet in a modern medical setting"
        fill
        className="object-cover"
        data-ai-hint="doctor technology"
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 w-full max-w-2xl">
        <Card className="bg-background/80 backdrop-blur-md shadow-2xl border-0 animate-in fade-in-0 zoom-in-95 duration-500">
          <CardHeader>
            <CardTitle className="text-3xl">Get Started</CardTitle>
            <CardDescription>Create your HealthCompass account to get personalized help.</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name*</Label>
                <Input id="name" name="name" placeholder="John Doe" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile Number*</Label>
                <Input id="mobile" name="mobile" placeholder="+1 123 456 7890" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email ID (Optional)</Label>
                <Input id="email" name="email" type="email" placeholder="john.doe@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Age*</Label>
                <Input id="age" name="age" type="number" placeholder="35" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender*</Label>
                <select
                  id="gender"
                  name="gender"
                  required
                  defaultValue=""
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="" disabled>Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location*</Label>
                <Input id="location" name="location" placeholder="City, Country" required />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              {successMessage ? (
                <div className="text-center p-4 bg-green-100 text-green-800 rounded-md w-full">
                  <p>{successMessage}</p>
                  <Button asChild variant="link">
                    <Link href="/chat">Proceed to Symptom Analysis</Link>
                  </Button>
                </div>
              ) : (
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Registering...</> : 'Register'}
                </Button>
              )}
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
