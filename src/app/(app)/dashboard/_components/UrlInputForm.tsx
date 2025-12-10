'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';

interface UrlInputFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const loadingSteps = [
  { text: 'Extrayendo subtítulos del video...', icon: '📝' },
  { text: 'Analizando contenido con IA...', icon: '🤖' },
  { text: 'Generando informe estructurado...', icon: '📊' },
  { text: 'Creando PDF profesional...', icon: '📄' },
];

export function UrlInputForm({ onSubmit, loading, error }: UrlInputFormProps) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!loading) {
      setCurrentStep(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % loadingSteps.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [loading]);

  return (
    <Card className="mb-8 bg-slate-900/50 border-slate-800">
      <CardHeader>
        <CardTitle className="text-white">Generar Nuevo Informe</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={onSubmit} className="flex gap-4">
          <Input
            name="url"
            placeholder="Pega la URL del video de YouTube..."
            required
            disabled={loading}
            className="flex-1 bg-slate-800 border-slate-700 text-white placeholder:text-gray-500 disabled:opacity-50"
          />
          <Button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 min-w-[140px]"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Procesando
              </span>
            ) : (
              'Generar PDF'
            )}
          </Button>
        </form>

        {/* Loading Progress Indicator */}
        {loading && (
          <div className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-lg animate-pulse">
                  {loadingSteps[currentStep].icon}
                </div>
                <div className="absolute inset-0 rounded-full border-2 border-purple-500/30 animate-ping" />
              </div>
              <div>
                <p className="text-white font-medium">{loadingSteps[currentStep].text}</p>
                <p className="text-gray-400 text-sm">Esto puede tomar unos segundos...</p>
              </div>
            </div>
            
            {/* Progress Steps */}
            <div className="flex gap-2">
              {loadingSteps.map((step, index) => (
                <div
                  key={index}
                  className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                    index <= currentStep 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600' 
                      : 'bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {error && (
          <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-red-400 flex items-center gap-2">
              <span>⚠️</span> {error}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
