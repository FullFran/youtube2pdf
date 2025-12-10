import { Cta } from './_components/Cta';
import { Features } from './_components/Features';
import { Footer } from './_components/Footer';
import { Hero } from './_components/Hero';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-slate-950">
      <Hero />
      <Features />
      <Cta />
      <Footer />
    </main>
  );
}
