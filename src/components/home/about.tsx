import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export function About() {
  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm">The HealthCompass Mission</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Bridging the Gap Between Symptom and Specialist</h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              In today’s healthcare landscape, individuals experiencing unfamiliar health symptoms often face uncertainty about which medical specialist to consult. This confusion can lead to delayed care, increased anxiety, and potentially worse health outcomes.
            </p>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              HealthCompass was created to solve this problem. We provide a conversational, accessible, and location-aware solution to guide you from symptom description to finding a trustworthy doctor nearby—all without needing complex apps or technical know-how.
            </p>
          </div>
          <div className="flex flex-col gap-4 justify-center">
            <Card className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
              <CardHeader>
                <CardTitle>From Confusion to Clarity</CardTitle>
                <CardDescription>No more guessing games. Describe your symptoms and get instant, AI-driven recommendations for the right specialist.</CardDescription>
              </CardHeader>
              <CardContent>
                <Image 
                  src="https://picsum.photos/seed/health2/600/400"
                  width={600}
                  height={400}
                  alt="A person looking thoughtful"
                  className="rounded-lg object-cover w-full"
                  data-ai-hint="person thinking"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
