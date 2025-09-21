'use client';

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { login } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full bg-primary/80 hover:bg-primary text-primary-foreground" disabled={pending}>
      {pending ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Logging in...</> : 'Login'}
    </Button>
  );
}

export default function LoginPage() {
  const [state, formAction] = useActionState(login, undefined);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.error) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: state.error,
      });
    }
  }, [state, toast]);

  return (
     <div className="relative flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
      <Image
        src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2070&auto=format&fit=crop"
        alt="Doctor using a tablet in a modern medical setting"
        fill
        className="object-cover"
        data-ai-hint="doctor technology"
      />
      <div className="absolute inset-0 bg-primary/10" />
      <div className="relative z-10 w-full max-w-sm">
        <Card className="bg-card/60 backdrop-blur-lg border-white/20 text-card-foreground shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" name="username" placeholder="admin" required className="bg-transparent/20 placeholder:text-foreground/60" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" placeholder="password" required className="bg-transparent/20 placeholder:text-foreground/60" />
              </div>
              <SubmitButton />
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
