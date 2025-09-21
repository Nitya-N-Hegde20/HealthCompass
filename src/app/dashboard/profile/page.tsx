import { getSession } from '@/lib/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';

export default async function ProfilePage() {
  const session = await getSession();

  // Mock data for the admin
  const adminDetails = {
    name: session?.name || 'Admin User',
    email: 'admin@healthcompass.com',
    age: 42,
    role: 'System Administrator',
    memberSince: '2023-01-15',
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Admin Profile</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>View and manage your profile details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://picsum.photos/seed/admin-logo/200" alt="Admin avatar" data-ai-hint="admin logo" />
              <AvatarFallback>{adminDetails.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h2 className="text-2xl font-bold">{adminDetails.name}</h2>
              <p className="text-muted-foreground">{adminDetails.role}</p>
            </div>
          </div>
          
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
