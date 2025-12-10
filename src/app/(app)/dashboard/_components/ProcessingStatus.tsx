'use client';

import { Brain, CheckCircle, Download, FileText, Loader2, Sparkles } from 'lucide-react';

interface ProcessingStatusProps {
  isActive: boolean;
  currentStep: 'idle' | 'transcript' | 'thinking' | 'writing' | 'pdf' | 'done';
  thinkingStatus?: string;
}

const steps = [
  { id: 'transcript', label: 'Obteniendo transcripción', icon: Download },
  { id: 'thinking', label: 'Analizando contenido', icon: Brain },
  { id: 'writing', label: 'Generando informe', icon: Sparkles },
  { id: 'pdf', label: 'Creando PDF', icon: FileText },
];

export function ProcessingStatus({ isActive, currentStep, thinkingStatus }: ProcessingStatusProps) {
  if (!isActive && currentStep === 'idle') return null;

  const currentIndex = steps.findIndex(s => s.id === currentStep);
  
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-4 fade-in duration-300">
      <div className="bg-slate-900/95 backdrop-blur-lg border border-slate-700 rounded-2xl shadow-2xl px-6 py-4 min-w-[320px]">
        {/* Steps Progress */}
        <div className="space-y-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isCompleted = currentIndex > index;
            const isCurrent = currentStep === step.id;
            const isPending = currentIndex < index;
            
            return (
              <div 
                key={step.id}
                className={`flex items-center gap-3 transition-all duration-300 ${
                  isPending ? 'opacity-40' : 'opacity-100'
                }`}
              >
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
                  ${isCompleted ? 'bg-green-500/20 text-green-400' : ''}
                  ${isCurrent ? 'bg-purple-500/20 text-purple-400' : ''}
                  ${isPending ? 'bg-slate-700/50 text-slate-500' : ''}
                `}>
                  {isCompleted ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : isCurrent ? (
                    <Icon className="w-4 h-4 animate-pulse" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </div>
                
                <div className="flex-1">
                  <p className={`text-sm font-medium ${
                    isCompleted ? 'text-green-400' :
                    isCurrent ? 'text-white' :
                    'text-slate-500'
                  }`}>
                    {step.label}
                  </p>
                  {isCurrent && thinkingStatus && step.id === 'thinking' && (
                    <p className="text-xs text-purple-400/70 mt-0.5">{thinkingStatus}</p>
                  )}
                </div>
                
                {isCurrent && (
                  <Loader2 className="w-4 h-4 text-purple-400 animate-spin" />
                )}
                {isCompleted && (
                  <span className="text-xs text-green-400/70">✓</span>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Progress bar */}
        <div className="mt-4 h-1 bg-slate-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((currentIndex + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
