'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Cta() {
  return (
    <section className="py-24 bg-gradient-to-r from-purple-900/50 to-pink-900/50">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          ¿Listo para Empezar?
        </h2>
        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          Ahorra horas de tomar notas. Deja que la IA haga el trabajo pesado por ti.
        </p>
        <Link href="/dashboard">
          <Button size="lg" className="bg-white text-purple-900 hover:bg-gray-100 text-lg px-10 py-6 rounded-full shadow-xl transition-all hover:scale-105">
            Probar Gratis Ahora
          </Button>
        </Link>
      </div>
    </section>
  );
}
