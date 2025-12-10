import { Report, Video } from './entities';

export interface IVideoRepository {
  save(video: Video): Promise<void>;
  findById(id: string): Promise<Video | null>;
}

export interface IReportRepository {
  save(report: Report): Promise<void>;
  findByUserId(userId: string): Promise<Report[]>;
  findById(id: string): Promise<Report | null>;
}

export interface ITranscriptService {
  fetchTranscript(videoId: string): Promise<string>;
}

export type StreamChunk = { 
  type: 'thinking' | 'content' | 'reasoning'; 
  data: string; 
};

export interface IAIService {
  generateSummary(transcript: string): Promise<string>;
  generateSummaryStream(transcript: string): AsyncGenerator<StreamChunk, void, unknown>;
}

export interface IPdfService {
  generatePdf(markdown: string): Promise<Buffer>;
}
