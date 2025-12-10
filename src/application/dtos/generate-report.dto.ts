
import { z } from 'zod';

export const GenerateReportSchema = z.object({
  videoId: z.string().min(1, "Video ID is required"),
});

export type GenerateReportInputDto = z.infer<typeof GenerateReportSchema>;

export interface GenerateReportOutputDto {
  markdown: string;
  pdfBuffer: Buffer;
}
