'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative z-10 container mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
          Convierte Videos de YouTube <br />
          <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            en Informes PDF
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10">
          Extrae los subtítulos de cualquier video, genera un resumen inteligente con IA
          y descarga un PDF profesional en segundos.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/dashboard">
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg px-8 py-6 rounded-full shadow-lg shadow-purple-500/25 transition-all hover:scale-105">
              Procesar un Video Ahora →
            </Button>
          </Link>
          <Link href="#features">
            <Button size="lg" variant="outline" className="bg-transparent text-white border-white/50 hover:bg-white/10 hover:border-white/70 text-lg px-8 py-6 rounded-full backdrop-blur-sm transition-all hover:scale-105">
              Ver Cómo Funciona
            </Button>
          </Link>
        </div>

        <p className="mt-8 text-gray-400 text-sm">
          ✨ Sin tarjeta de crédito • Gratis para empezar
        </p>
      </div>
    </section>
  );
}
