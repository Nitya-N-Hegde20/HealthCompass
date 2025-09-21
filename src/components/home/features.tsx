import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, LocateIcon, ShieldCheck } from 'lucide-react';

const featureData = [
  {
    icon: <Lightbulb className="w-8 h-8 text-primary" />,
    title: 'Symptom Clarity',
    description: 'Feeling unwell but unsure which specialist to see? Our AI helps identify the right path, reducing anxiety and delays.',
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    title: 'Find Trusted Doctors',
    description: 'Once you know the specialty, we help you find reliable, well-rated doctors in your area, cutting through the noise.',
  },
  {
    icon: <LocateIcon className="w-8 h-8 text-primary" />,
    title: 'Simple & Accessible',
    description: 'Get guidance through a simple conversation. No complex apps or technical skills needed to start your health journey.',
  },
];

export function Features() {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-background px-3 py-1 text-sm">Our Promise</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Why Choose HealthCompass?</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We streamline your path to healthcare, providing clarity and confidence when you need it most.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center justify-center gap-8 sm:grid-cols-1 md:grid-cols-3 lg:max-w-none lg:grid-cols-3 mt-12">
          {featureData.map((item, index) => (
            <Card key={index} className="transform transition-transform duration-300 hover:scale-105 hover:shadow-xl bg-background flex flex-col items-center text-center">
              <CardHeader className="flex flex-col items-center text-center gap-4">
                {item.icon}
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center flex-1">
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </card>
          ))}
        </div>
      </div>
    </section>
  );
}
