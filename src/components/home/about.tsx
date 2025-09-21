import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export function About() {
  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-8 text-center">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">The HealthCompass Mission</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Bridging the Gap Between Symptom and Specialist</h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              In today’s healthcare landscape, individuals experiencing unfamiliar health symptoms often face uncertainty about which medical specialist to consult. This confusion can lead to delayed care, increased anxiety, and potentially worse health outcomes.
            </p>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              HealthCompass was created to solve this problem. We provide a conversational, accessible, and location-aware solution to guide you from symptom description to finding a trustworthy doctor nearby—all without needing complex apps or technical know-how.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
