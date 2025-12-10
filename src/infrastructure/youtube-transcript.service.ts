import { ITranscriptService } from '@/domain/interfaces';
import { YoutubeTranscript } from 'youtube-transcript';
import { Innertube } from 'youtubei.js';

export class YoutubeTranscriptService implements ITranscriptService {
  async fetchTranscript(videoId: string): Promise<string> {
    console.log(`Starting transcript fetch for video: ${videoId}`);

    // Strategy 1: Try youtube-transcript (Scraping)
    // Works well locally, but often blocked on Vercel.
    try {
      console.log('Attempting Strategy 1: youtube-transcript (Scraping)...');
      const transcriptItems = await YoutubeTranscript.fetchTranscript(videoId);

      if (transcriptItems && transcriptItems.length > 0) {
        const text = transcriptItems.map(item => item.text).join(' ');
        console.log(`Strategy 1 Success: fetched ${text.length} characters`);
        return text;
      }
    } catch (error) {
      console.warn(`Strategy 1 (youtube-transcript) failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    // Strategy 2: Try youtubei.js (Innertube)
    // More robust against IP blocking as it mimics internal clients, but can be flaky with "Precondition check failed".
    try {
      console.log('Attempting Strategy 2: youtubei.js (Innertube)...');
      
      const youtube = await Innertube.create({
        lang: 'en',
        location: 'US',
        retrieve_player: false // Optimize for speed and reduced blockage risk
      });

      const info = await youtube.getInfo(videoId);
      const transcriptData = await info.getTranscript();

      if (transcriptData?.transcript?.content?.body?.initial_segments) {
         const segments = transcriptData.transcript.content.body.initial_segments;
         const text = segments.map((seg: any) => seg.snippet.text).join(' ');
         console.log(`Strategy 2 Success: fetched ${text.length} characters`);
         return text;
      }
    } catch (error) {
       console.error(`Strategy 2 (Innertube) failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    throw new Error('All transcript fetch strategies failed for this video.');
  }
}
