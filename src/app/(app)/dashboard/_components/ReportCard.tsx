'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Loader2, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ReportCardProps {
  markdown: string;
  pdfBase64: string;
  isStreaming?: boolean;
}

export function ReportCard({ markdown, pdfBase64, isStreaming = false }: ReportCardProps) {
  const downloadPdf = () => {
    if (!pdfBase64) return;
    const link = document.createElement('a');
    link.href = `data:application/pdf;base64,${pdfBase64}`;
    link.download = 'informe-youtube.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="bg-slate-900/50 border-slate-800">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <CardTitle className="text-white">Vista Previa del Informe</CardTitle>
          {isStreaming && (
            <div className="flex items-center gap-2 text-purple-400">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span className="text-sm">Escribiendo...</span>
            </div>
          )}
        </div>
        <Button
          onClick={downloadPdf}
          variant="outline"
          disabled={!pdfBase64}
          className="border-purple-500 text-purple-400 hover:bg-purple-500/10 disabled:opacity-50"
        >
          <Download className="w-4 h-4 mr-2" />
          Descargar PDF
        </Button>
      </CardHeader>
      <CardContent>
        <div className="prose prose-invert prose-purple max-w-none bg-slate-800/50 p-6 rounded-lg border border-slate-700 prose-headings:text-white prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-p:text-gray-300 prose-strong:text-white prose-ul:text-gray-300 prose-ol:text-gray-300 prose-li:marker:text-purple-400 min-h-[200px]">
          {markdown ? (
            <>
              <ReactMarkdown>{markdown}</ReactMarkdown>
              {isStreaming && (
                <span className="inline-block w-2 h-5 bg-purple-500 animate-pulse ml-1" />
              )}
            </>
          ) : (
            <div className="flex items-center justify-center h-[200px] text-gray-500">
              <Loader2 className="w-6 h-6 animate-spin mr-2" />
              Esperando contenido...
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
