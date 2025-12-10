'use server';

import { GenerateReportUseCase } from '@/application/generate-report.use-case';
import { OpenAIService } from '@/infrastructure/openai.service';
import { PdfService } from '@/infrastructure/pdf.service';
import { YoutubeTranscriptService } from '@/infrastructure/youtube-transcript.service';

// Dependency Injection (Manually for now)
const transcriptService = new YoutubeTranscriptService();
const aiService = new OpenAIService();
const pdfService = new PdfService();
const generateReportUseCase = new GenerateReportUseCase(transcriptService, aiService, pdfService);

export async function generateReportAction(formData: FormData) {
  const videoUrl = formData.get('url') as string;

  if (!videoUrl) {
    return { error: 'URL is required' };
  }

  // Extract video ID (Basic regex)
  const videoIdMatch = videoUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
  const videoId = videoIdMatch ? videoIdMatch[1] : null;

  if (!videoId) {
    return { error: 'Invalid YouTube URL' };
  }

  try {
    const { markdown, pdfBuffer } = await generateReportUseCase.execute({ videoId });
    
    console.log('Use case completed successfully');
    console.log('Markdown length:', markdown?.length);
    console.log('PDF Buffer length:', pdfBuffer?.length);
    
    // In a real app, we would upload the PDF to S3/Blob storage and return the URL.
    // For this MVP, we will return the markdown and a base64 PDF string (client can download).
    const pdfBase64 = pdfBuffer.toString('base64');
    
    console.log('PDF Base64 length:', pdfBase64?.length);
    
    const response = { success: true, markdown, pdfBase64, videoId };
    console.log('Returning response with success:', response.success);
    
    return response;
  } catch (error: any) {
    console.error('Action error:', error);
    return { error: error.message || 'Failed to generate report' };
  }
}
