import { Hero } from '@/components/home/hero';
import { About } from '@/components/home/about';
import { Features } from '@/components/home/features';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <Features />
      <About />
    </div>
  );
}
