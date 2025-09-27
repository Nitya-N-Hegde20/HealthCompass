'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Patient } from '@/lib/actions';
import { Badge } from '../ui/badge';

interface PatientTableProps {
  patients: Patient[];
}

export function PatientTable({ patients }: PatientTableProps) {
  if (!patients || patients.length === 0) {
    return <p className="text-muted-foreground">No patient data available.</p>;
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead className="hidden sm:table-cell">Email</TableHead>
            <TableHead className="text-right">Age</TableHead>
            <TableHead className="hidden md:table-cell">Gender</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient) => (
            <TableRow key={patient.patientID}>
              <TableCell className="font-medium">{patient.fullName}</TableCell>
              <TableCell className="hidden sm:table-cell text-muted-foreground">
                {patient.email}
              </TableCell>
              <TableCell className="text-right">{patient.age}</TableCell>
              <TableCell className="hidden md:table-cell">
                 <Badge variant="secondary" className="capitalize">{patient.gender}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
