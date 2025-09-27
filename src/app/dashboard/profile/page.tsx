import { getSession } from '@/lib/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { User } from 'lucide-react';

export default async function ProfilePage() {
  const session = await getSession();

  // Mock data for the admin
  const adminDetails = {
    name: session?.name || 'Admin User',
    email: 'uday@email.com',
    age: 42,
    role: 'System Administrator',
    memberSince: '2023-01-15',
  };

  return (
    <div className="flex flex-col h-full space-y-8">
      <h1 className="text-3xl font-bold">Admin Profile</h1>
      
      <Card className="overflow-hidden flex-1 flex flex-col">
        <CardHeader className="bg-muted/30">
          <div className="flex items-center gap-4">
             <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <User className="h-6 w-6" />
              </div>
            <div>
              <CardTitle>{adminDetails.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{adminDetails.role}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
            <div className="space-y-1">
              <Label className="text-muted-foreground">Email Address</Label>
              <p className="text-lg font-medium">{adminDetails.email}</p>
            </div>
            <div className="space-y-1">
              <Label className="text-muted-foreground">Age</Label>
              <p className="text-lg font-medium">{adminDetails.age}</p>
            </div>
             <div className="space-y-1">
              <Label className="text-muted-foreground">Member Since</Label>
              <p className="text-lg font-medium">{adminDetails.memberSince}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
