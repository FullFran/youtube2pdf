import { IPdfService } from '@/domain/interfaces';
import { PDFDocument, PDFFont, PDFPage, StandardFonts, rgb } from 'pdf-lib';

// Brand colors (converted to RGB 0-1 range)
const colors = {
  primary: rgb(168/255, 85/255, 247/255),      // #A855F7
  primaryDark: rgb(126/255, 34/255, 206/255),  // #7E22CE
  text: rgb(30/255, 41/255, 59/255),           // #1E293B
  textMuted: rgb(71/255, 85/255, 105/255),     // #475569
  border: rgb(226/255, 232/255, 240/255),      // #E2E8F0
  white: rgb(1, 1, 1),
};

export class PdfService implements IPdfService {
  async generatePdf(markdown: string): Promise<Buffer> {
    const pdfDoc = await PDFDocument.create();
    const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    
    const pageWidth = 595.28;  // A4 width
    const pageHeight = 841.89; // A4 height
    const margin = 50;
    const contentWidth = pageWidth - margin * 2;
    
    let page = pdfDoc.addPage([pageWidth, pageHeight]);
    let y = pageHeight - margin;
    
    // Draw header on first page
    y = this.drawHeader(page, y, helveticaBold, helvetica, margin, contentWidth);
    
    // Parse and render markdown
    const lines = markdown.split('\n');
    
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) {
        y -= 10;
        continue;
      }
      
      // Check if we need a new page
      if (y < margin + 80) {
        page = pdfDoc.addPage([pageWidth, pageHeight]);
        y = pageHeight - margin;
      }
      
      // Heading 1
      if (trimmed.startsWith('# ')) {
        y -= 20;
        y = this.drawText(page, trimmed.slice(2), margin, y, helveticaBold, 18, colors.primaryDark, contentWidth);
        y -= 10;
      }
      // Heading 2
      else if (trimmed.startsWith('## ')) {
        y -= 15;
        // Draw underline
        page.drawLine({
          start: { x: margin, y: y - 3 },
          end: { x: margin + contentWidth, y: y - 3 },
          thickness: 1,
          color: colors.border,
        });
        y = this.drawText(page, trimmed.slice(3), margin, y, helveticaBold, 14, colors.text, contentWidth);
        y -= 12;
      }
      // Heading 3
      else if (trimmed.startsWith('### ')) {
        y -= 10;
        y = this.drawText(page, trimmed.slice(4), margin, y, helveticaBold, 12, colors.text, contentWidth);
        y -= 8;
      }
      // List items
      else if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const text = '• ' + this.cleanText(trimmed.slice(2));
        y = this.drawText(page, text, margin + 10, y, helvetica, 10, colors.textMuted, contentWidth - 10);
        y -= 6;
      }
      // Numbered list
      else if (/^\d+\.\s/.test(trimmed)) {
        const text = trimmed.replace(/^(\d+)\.\s/, '$1. ');
        y = this.drawText(page, this.cleanText(text), margin + 10, y, helvetica, 10, colors.textMuted, contentWidth - 10);
        y -= 6;
      }
      // Regular paragraph
      else {
        y = this.drawText(page, this.cleanText(trimmed), margin, y, helvetica, 10, colors.textMuted, contentWidth);
        y -= 8;
      }
    }
    
    // Add footer to all pages
    const pages = pdfDoc.getPages();
    for (let i = 0; i < pages.length; i++) {
      this.drawFooter(pages[i], helvetica, margin, pageWidth, i + 1, pages.length);
    }
    
    const pdfBytes = await pdfDoc.save();
    return Buffer.from(pdfBytes);
  }
  
  private drawHeader(page: PDFPage, y: number, boldFont: PDFFont, regularFont: PDFFont, margin: number, contentWidth: number): number {
    const generatedDate = new Date().toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    
    // Logo text
    page.drawText('YouTube2PDF', {
      x: margin,
      y: y,
      size: 22,
      font: boldFont,
      color: colors.primaryDark,
    });
    
    // Subtitle
    page.drawText(`Informe generado automaticamente • ${generatedDate}`, {
      x: margin,
      y: y - 18,
      size: 9,
      font: regularFont,
      color: colors.textMuted,
    });
    
    // Header line
    page.drawLine({
      start: { x: margin, y: y - 30 },
      end: { x: margin + contentWidth, y: y - 30 },
      thickness: 2,
      color: colors.primary,
    });
    
    return y - 50;
  }
  
  private drawFooter(page: PDFPage, font: PDFFont, margin: number, pageWidth: number, pageNum: number, totalPages: number): void {
    const footerY = 30;
    
    // Footer line
    page.drawLine({
      start: { x: margin, y: footerY + 10 },
      end: { x: pageWidth - margin, y: footerY + 10 },
      thickness: 0.5,
      color: colors.border,
    });
    
    // Footer text
    page.drawText('Generado con YouTube2PDF', {
      x: margin,
      y: footerY,
      size: 8,
      font: font,
      color: colors.textMuted,
    });
    
    // Page number
    const pageText = `Pagina ${pageNum} de ${totalPages}`;
    const pageTextWidth = font.widthOfTextAtSize(pageText, 8);
    page.drawText(pageText, {
      x: pageWidth - margin - pageTextWidth,
      y: footerY,
      size: 8,
      font: font,
      color: colors.primary,
    });
  }
  
  private drawText(page: PDFPage, text: string, x: number, y: number, font: PDFFont, size: number, color: any, maxWidth: number): number {
    const words = text.split(' ');
    let line = '';
    let currentY = y;
    
    for (const word of words) {
      const testLine = line ? `${line} ${word}` : word;
      const width = font.widthOfTextAtSize(testLine, size);
      
      if (width > maxWidth && line) {
        page.drawText(line, { x, y: currentY, size, font, color });
        currentY -= size + 3;
        line = word;
      } else {
        line = testLine;
      }
    }
    
    if (line) {
      page.drawText(line, { x, y: currentY, size, font, color });
      currentY -= size + 3;
    }
    
    return currentY;
  }
  
  private cleanText(text: string): string {
    return text
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/\*([^*]+)\*/g, '$1')
      .replace(/`([^`]+)`/g, '$1');
  }
}
