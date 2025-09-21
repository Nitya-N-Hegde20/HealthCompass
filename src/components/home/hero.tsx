import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

export function Hero() {
  return (
    <section
      className="relative w-full h-[80vh] min-h-[500px] flex items-center justify-center text-center text-white"
    >
      <Image
        src="https://picsum.photos/seed/clinic-reception/1920/1080"
        alt="A modern and clean hospital reception area."
        fill
        priority
        className="object-cover"
        data-ai-hint="modern clinic"
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="container relative z-10 px-4 md:px-6 flex flex-col items-center">
        <div className="max-w-3xl space-y-6">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Navigate Your Health with Confidence
          </h1>
          <p className="text-lg md:text-xl text-gray-200">
            Unsure which doctor to see? HealthCompass analyzes your symptoms and guides you to the right specialist, instantly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/chat">
                Chat with AI
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
