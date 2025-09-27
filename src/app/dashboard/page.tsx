import { getSession } from '@/lib/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PatientChart } from '@/components/dashboard/patient-chart';
import { getPatients } from '@/lib/actions';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { PatientTable } from '@/components/dashboard/patient-table';

export default async function DashboardPage() {
  const session = await getSession();
  const { patients, count: totalRegistrations, error: patientDataError } = await getPatients();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Welcome, {session?.name ?? 'Admin'}!</h1>
      
      {patientDataError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Connection Error</AlertTitle>
          <AlertDescription>
            Could not connect to the backend to fetch patient data. Please ensure the backend service is running.
            <p className="font-mono text-xs mt-2">{patientDataError}</p>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Registrations</CardTitle>
            <CardDescription>All-time user sign-ups</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{totalRegistrations}</p>
            <p className="text-sm text-muted-foreground">{patientDataError ? 'Could not fetch data' : 'From backend'}</p>
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

      <div className="grid gap-8 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Registered Patients</CardTitle>
            <CardDescription>A list of all users who have registered.</CardDescription>
          </CardHeader>
          <CardContent>
            <PatientTable patients={patients} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Patient Inquiries by Specialist</CardTitle>
          </CardHeader>
          <CardContent>
            <PatientChart />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
