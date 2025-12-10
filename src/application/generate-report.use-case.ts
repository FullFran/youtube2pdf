import { IAIService, IPdfService, ITranscriptService } from '@/domain/interfaces';

export class GenerateReportUseCase {
  constructor(
    private transcriptService: ITranscriptService,
    private aiService: IAIService,
    private pdfService: IPdfService
  ) {}

  async execute(videoId: string): Promise<{ markdown: string; pdfBuffer: Buffer }> {
    // 1. Fetch Transcript
    console.log(`Fetching transcript for ${videoId}...`);
    const transcript = await this.transcriptService.fetchTranscript(videoId);

    // 2. Generate Summary
    console.log(`Generating summary...`);
    const markdown = await this.aiService.generateSummary(transcript);

    // 3. Generate PDF
    console.log(`Generating PDF...`);
    const pdfBuffer = await this.pdfService.generatePdf(markdown);

    return { markdown, pdfBuffer };
  }
}
