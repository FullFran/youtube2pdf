import { Button } from '@/components/ui/button';
import { PdfService } from '@/infrastructure/pdf.service';
import { createClient } from '@/lib/supabase/server';
import { ArrowLeft } from 'lucide-react';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { DashboardHeader } from '../../dashboard/_components/DashboardHeader';
import { ReportCard } from '../../dashboard/_components/ReportCard';

const pdfService = new PdfService();

// Force dynamic because we fetch user specific data
export const dynamic = 'force-dynamic';

export default async function ReportDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/auth/login');
  }

  // Fetch report details
  const { data: report } = await supabase
    .from('reports')
    .select(`
      id,
      markdown_content,
      created_at,
      videos (
        id,
        title,
        url
      )
    `)
    .eq('id', parseInt(id))
    .eq('user_id', user.id) // Ensure user owns the report
    .single();

  if (!report) {
    redirect('/my-reports');
  }

  // Identify YouTube Video ID for embedding
  const videoId = report.videos?.id;

  // Generate PDF on the fly for download functionality in ReportCard (since we didn't save base64 in DB, only content)
  // Optimization: use the new generatePdf method or existing API?
  // Since ReportCard expects pdfBase64, we might need to generate it here server-side or let the client handle it via API.
  // Actually ReportCard expects pdfBase64 string.
  // Let's generate it here server side using the service we have.
  let pdfBase64 = '';
  try {
      const pdfBuffer = await pdfService.generatePdf(report.markdown_content);
      pdfBase64 = pdfBuffer.toString('base64');
  } catch (e) {
      console.error("Error generating PDF preview", e);
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <DashboardHeader />
      
      <main className="flex-1 container mx-auto px-6 py-8">
        <div className="mb-6">
          <Link href="/my-reports">
            <Button variant="ghost" className="text-gray-400 hover:text-white pl-0 gap-2">
              <ArrowLeft className="w-4 h-4" />
              Volver a mis informes
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-white mt-4">{report.videos?.title || `Informe #${report.id}`}</h1>
          <p className="text-sm text-gray-500 mt-1">
            Generado el {new Date(report.created_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
          {/* Left Column: Video */}
          <div className="space-y-4">
             <div className="aspect-video w-full rounded-xl overflow-hidden border border-slate-800 bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}`}
                  title="YouTube video player"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
             </div>
             <div className="p-4 bg-slate-900/30 border border-slate-800 rounded-xl">
                <h3 className="text-lg font-semibold text-white mb-2">Video Original</h3>
                <a href={report.videos?.url} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline break-all">
                    {report.videos?.url}
                </a>
             </div>
          </div>

          {/* Right Column: Report */}
          <div className="h-full">
             <ReportCard 
                markdown={report.markdown_content} 
                pdfBase64={pdfBase64} 
             />
          </div>
        </div>
      </main>
    </div>
  );
}
