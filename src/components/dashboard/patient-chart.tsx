'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

const chartData = [
  { specialist: 'Cardiologist', patients: 186, fill: 'var(--color-cardiologist)' },
  { specialist: 'Neurologist', patients: 120, fill: 'var(--color-neurologist)' },
  { specialist: 'Dermatologist', patients: 98, fill: 'var(--color-dermatologist)' },
  { specialist: 'Orthopedist', patients: 87, fill: 'var(--color-orthopedist)' },
  { specialist: 'Gastro', patients: 75, fill: 'var(--color-gastro)' },
  { specialist: 'Other', patients: 150, fill: 'var(--color-other)' },
];

const chartConfig = {
  patients: {
    label: 'Patients',
  },
  cardiologist: {
    label: 'Cardiologist',
    color: 'hsl(var(--chart-1))',
  },
  neurologist: {
    label: 'Neurologist',
    color: 'hsl(var(--chart-2))',
  },
  dermatologist: {
    label: 'Dermatologist',
    color: 'hsl(var(--chart-3))',
  },
  orthopedist: {
    label: 'Orthopedist',
    color: 'hsl(var(--chart-4))',
  },
  gastro: {
    label: 'Gastroenterologist',
    color: 'hsl(var(--chart-5))',
  },
  other: {
    label: 'Other',
    color: 'hsl(var(--muted))',
  },
};

export function PatientChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[250px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="specialist"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <YAxis />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <Bar dataKey="patients" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
