import { OpenAIService } from '@/infrastructure/openai.service';
import { YoutubeTranscriptService } from '@/infrastructure/youtube-transcript.service';
import { createClient } from '@/lib/supabase/client';
import { NextRequest } from 'next/server';

const transcriptService = new YoutubeTranscriptService();
const aiService = new OpenAIService();

export async function POST(request: NextRequest) {
  try {
    const { videoId, videoUrl } = await request.json();

    if (!videoId) {
      return new Response(JSON.stringify({ error: 'Video ID is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Fetch transcript first
    console.log(`Fetching transcript for ${videoId}...`);
    const transcript = await transcriptService.fetchTranscript(videoId);
    console.log(`Transcript fetched: ${transcript.length} characters`);

    // Save video to database if not exists
    try {
      const supabase = createClient();
      const { data: existingVideo } = await supabase
        .from('videos')
        .select('id')
        .eq('id', videoId)
        .single();

      if (!existingVideo) {
        await supabase.from('videos').insert({
          id: videoId,
          url: videoUrl || `https://youtube.com/watch?v=${videoId}`,
          title: `Video ${videoId}`, // Will be updated with actual title later
        });
        console.log(`Video ${videoId} saved to database via Supabase Client`);
      }
    } catch (dbError) {
      console.error('Database error (video):', dbError);
      // Continue even if DB save fails
    }

    // Create a TransformStream for streaming the response
    const encoder = new TextEncoder();
    const stream = new TransformStream();
    const writer = stream.writable.getWriter();

    // Start streaming in the background
    (async () => {
      try {
        console.log('Starting summary stream...');
        for await (const chunk of aiService.generateSummaryStream(transcript)) {
          await writer.write(encoder.encode(`data: ${JSON.stringify(chunk)}\n\n`));
        }
        await writer.write(encoder.encode(`data: ${JSON.stringify({ type: 'done' })}\n\n`));
        console.log('Stream completed');
      } catch (error) {
        console.error('Stream error:', error);
        await writer.write(encoder.encode(`data: ${JSON.stringify({ type: 'error', data: 'Stream failed' })}\n\n`));
      } finally {
        await writer.close();
      }
    })();

    return new Response(stream.readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error: any) {
    console.error('API error:', error);
    return new Response(JSON.stringify({ error: error.message || 'Failed to generate report' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
