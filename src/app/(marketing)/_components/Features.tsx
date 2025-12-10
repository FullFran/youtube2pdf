'use client';

import { Download, FileText, Globe, Zap } from 'lucide-react';

const features = [
  {
    icon: Globe,
    title: 'Extracción de Subtítulos',
    description: 'Obtenemos los subtítulos de cualquier video de YouTube, en cualquier idioma disponible.',
  },
  {
    icon: Zap,
    title: 'Resumen con IA',
    description: 'GPT-4o-mini analiza el contenido y genera un informe estructurado: título, resumen, puntos clave y conclusión.',
  },
  {
    icon: FileText,
    title: 'Formato Profesional',
    description: 'El resultado se formatea en Markdown limpio, listo para exportar o compartir.',
  },
  {
    icon: Download,
    title: 'Descarga PDF',
    description: 'Descarga tu informe como PDF con un solo clic para leerlo offline o imprimirlo.',
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 bg-slate-950">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-white mb-4">
          ¿Cómo Funciona?
        </h2>
        <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
          Tres simples pasos para transformar horas de video en documentos concisos.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 hover:border-purple-500/50 transition-all hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
