import { ITranscriptService } from '@/domain/interfaces';
import { YoutubeTranscript } from 'youtube-transcript-plus';

export class YoutubeTranscriptService implements ITranscriptService {
  async fetchTranscript(videoId: string): Promise<string> {
    try {
      console.log(`Fetching transcript for video: ${videoId}`);
      const transcriptItems = await YoutubeTranscript.fetchTranscript(videoId);
      
      if (!transcriptItems || transcriptItems.length === 0) {
        throw new Error('No transcript available for this video');
      }
      
      const transcript = transcriptItems.map(item => item.text).join(' ');
      console.log(`Transcript fetched successfully: ${transcript.length} characters`);
      
      return transcript;
    } catch (error) {
      console.error(`Failed to fetch transcript for video ${videoId}:`, error);
      throw new Error(`Failed to fetch transcript: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}
