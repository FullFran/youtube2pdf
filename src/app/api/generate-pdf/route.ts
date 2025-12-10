import { PdfService } from '@/infrastructure/pdf.service';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

const pdfService = new PdfService();

export async function POST(request: NextRequest) {
  try {
    const { markdown, videoId } = await request.json();

    if (!markdown) {
      return new Response(JSON.stringify({ error: 'Markdown content is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    console.log('Generating PDF from markdown...');
    const pdfBuffer = await pdfService.generatePdf(markdown);
    const pdfBase64 = pdfBuffer.toString('base64');
    
    // Try to save report to database if user is logged in
    try {
      const cookieStore = await cookies();
      const supabase = await createClient(cookieStore);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user && videoId) {
        await supabase.from('reports').insert({
          video_id: videoId,
          markdown_content: markdown,
          user_id: user.id
        });
        console.log(`Report saved for video ${videoId} via Supabase Client`);
      }
    } catch (dbError) {
      console.error('Database error (report):', dbError);
      // Continue even if DB save fails
    }
    
    console.log('PDF generated successfully');
    return new Response(JSON.stringify({ pdfBase64 }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error('PDF generation error:', error);
    return new Response(JSON.stringify({ error: error.message || 'Failed to generate PDF' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
