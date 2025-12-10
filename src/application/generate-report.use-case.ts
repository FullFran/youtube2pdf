import { IAIService, IPdfService, ITranscriptService } from '@/domain/interfaces';
import { GenerateReportInputDto, GenerateReportOutputDto, GenerateReportSchema } from './dtos/generate-report.dto';

export class GenerateReportUseCase {
  constructor(
    private transcriptService: ITranscriptService,
    private aiService: IAIService,
    private pdfService: IPdfService
  ) {}

  async execute(input: GenerateReportInputDto): Promise<GenerateReportOutputDto> {
    // Validate input
    const { videoId } = GenerateReportSchema.parse(input);

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
