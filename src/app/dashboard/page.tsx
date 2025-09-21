import { getSession } from '@/lib/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PatientChart } from '@/components/dashboard/patient-chart';

export default async function DashboardPage() {
  const session = await getSession();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Welcome, {session?.name ?? 'Admin'}!</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Registrations</CardTitle>
            <CardDescription>All-time user sign-ups</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">1,234</p>
            <p className="text-sm text-muted-foreground">+5.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>AI Chats</CardTitle>
            <CardDescription>Symptom analyses performed</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">8,910</p>
            <p className="text-sm text-muted-foreground">+12.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top Inquiry</CardTitle>
            <CardDescription>Most frequent specialist</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">Cardiology</p>
            <p className="text-sm text-muted-foreground">Based on AI suggestions</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Patient Inquiries by Specialist</CardTitle>
        </CardHeader>
        <CardContent>
          <PatientChart />
        </CardContent>
      </Card>
    </div>
  );
}
