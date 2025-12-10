'use client';

import { useState } from 'react';
import { DashboardHeader } from './_components/DashboardHeader';
import { ProcessingStatus } from './_components/ProcessingStatus';
import { ReportCard } from './_components/ReportCard';
import { UrlInputForm } from './_components/UrlInputForm';

type ProcessingStep = 'idle' | 'transcript' | 'thinking' | 'writing' | 'pdf' | 'done';

export default function DashboardPage() {
  const [loading, setLoading] = useState(false);
  const [streamingMarkdown, setStreamingMarkdown] = useState<string>('');
  const [thinkingStatus, setThinkingStatus] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<ProcessingStep>('idle');
  const [report, setReport] = useState<{ markdown: string; pdfBase64: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    const videoUrl = formData.get('url') as string;
    
    if (!videoUrl) {
      setError('URL is required');
      return;
    }

    // Extract video ID
    const videoIdMatch = videoUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    const videoId = videoIdMatch ? videoIdMatch[1] : null;

    if (!videoId) {
      setError('Invalid YouTube URL');
      return;
    }

    setLoading(true);
    setError(null);
    setReport(null);
    setStreamingMarkdown('');
    setThinkingStatus('');
    setCurrentStep('transcript');

    try {
      const response = await fetch('/api/generate-stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoId, videoUrl }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to generate report');
        setLoading(false);
        setCurrentStep('idle');
        return;
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let fullMarkdown = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const text = decoder.decode(value, { stream: true });
          const lines = text.split('\n\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6));
                
                if (data.type === 'thinking') {
                  setCurrentStep('thinking');
                  setThinkingStatus(data.data);
                } else if (data.type === 'content') {
                  if (currentStep !== 'writing') {
                    setCurrentStep('writing');
                  }
                  fullMarkdown += data.data;
                  setStreamingMarkdown(fullMarkdown);
                } else if (data.type === 'done') {
                  // Stream completed, now generate PDF
                  setCurrentStep('pdf');
                  if (fullMarkdown) {
                    try {
                      const pdfResponse = await fetch('/api/generate-pdf', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ markdown: fullMarkdown, videoId }),
                      });
                      
                      if (pdfResponse.ok) {
                        const { pdfBase64 } = await pdfResponse.json();
                        setReport({ markdown: fullMarkdown, pdfBase64 });
                      } else {
                        setReport({ markdown: fullMarkdown, pdfBase64: '' });
                      }
                    } catch (pdfError) {
                      setReport({ markdown: fullMarkdown, pdfBase64: '' });
                    }
                  }
                  setCurrentStep('done');
                  setTimeout(() => setCurrentStep('idle'), 2000);
                } else if (data.type === 'error') {
                  setError(data.data);
                  setCurrentStep('idle');
                }
              } catch (e) {
                // Ignore parsing errors
              }
            }
          }
        }
      }
    } catch (e) {
      console.error('Stream error:', e);
      setError('Ha ocurrido un error inesperado.');
      setCurrentStep('idle');
    } finally {
      setLoading(false);
    }
  }

  const isProcessing = currentStep !== 'idle' && currentStep !== 'done';

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <DashboardHeader />
      
      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Generador de Informes
            </h1>
            <p className="text-gray-400">
              Pega la URL de un video de YouTube y genera un informe PDF profesional
            </p>
          </div>

          <UrlInputForm onSubmit={handleSubmit} loading={loading} error={error} />

          {/* Show streaming content while writing */}
          {streamingMarkdown && !report && (
            <ReportCard 
              markdown={streamingMarkdown} 
              pdfBase64="" 
              isStreaming={currentStep === 'writing'}
            />
          )}
          
          {/* Show final report */}
          {report && (
            <ReportCard 
              markdown={report.markdown} 
              pdfBase64={report.pdfBase64}
              isStreaming={false}
            />
          )}
        </div>
      </main>

      {/* Floating Processing Status */}
      <ProcessingStatus 
        isActive={isProcessing}
        currentStep={currentStep}
        thinkingStatus={thinkingStatus}
      />
    </div>
  );
}
