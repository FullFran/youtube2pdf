import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { createClient } from '@/lib/supabase/server';
import { ArrowRight, Calendar, FileText, Video } from 'lucide-react';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { DashboardHeader } from '../dashboard/_components/DashboardHeader';

export const dynamic = 'force-dynamic';

export default async function MyReportsPage() {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect('/auth/login');
  }

  const { data: reports } = await supabase
    .from('reports')
    .select(`
      id,
      created_at,
      pdf_url,
      videos (
        id,
        title,
        url
      )
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen bg-slate-950">
      <DashboardHeader />
      
      <main className="container mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Mis Informes</h1>
          <p className="text-gray-400">Historial de informes generados y sus videos asociados.</p>
        </div>

        {!reports || reports.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/50 rounded-xl border border-slate-800">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-gray-500" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">No tienes informes aún</h3>
            <p className="text-gray-400 mb-6">Genera tu primer informe a partir de un video de YouTube.</p>
            <Link href="/dashboard">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                Generar nuevo informe
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report) => (
              <Card key={report.id} className="bg-slate-900/50 border-slate-800 hover:border-purple-500/50 transition-colors">
                <CardHeader>
                  <CardTitle className="text-white line-clamp-2 min-h-[3.5rem]">
                    {report.videos?.title || `Video ${report.videos?.id}`}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-400">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(report.created_at).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </div>
                    {report.videos && (
                        <div className="flex items-center text-sm text-gray-400">
                            <Video className="w-4 h-4 mr-2" />
                            <a href={report.videos.url} target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 truncate">
                                Ver video original
                            </a>
                        </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  <Link href={`/my-reports/${report.id}`} className="flex-1">
                    <Button variant="secondary" className="w-full bg-slate-800 hover:bg-slate-700 text-white">
                      Ver detalle
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
