'use client';

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { register } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Registering...</> : 'Register'}
    </Button>
  );
}

export default function RegisterPage() {
  const [state, formAction] = useActionState(register, undefined);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.error) {
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: state.error,
      });
    }
    if (state?.success) {
      toast({
        title: "Success!",
        description: state.success,
      });
    }
  }, [state, toast]);

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
          <form action={formAction}>
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
                <Select name="gender" required>
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location*</Label>
                <Input id="location" name="location" placeholder="City, Country" required />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="familyMembers">Family Member Details (Optional)</Label>
                <Textarea id="familyMembers" name="familyMembers" placeholder="e.g., Spouse, Age 40, No known conditions." />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
               {state?.success ? (
                <div className="text-center p-4 bg-green-100 text-green-800 rounded-md w-full">
                  <p>{state.success}</p>
                  <Button asChild variant="link">
                    <Link href="/chat">Proceed to Symptom Analysis</Link>
                  </Button>
                </div>
              ) : (
                <SubmitButton />
              )}
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
