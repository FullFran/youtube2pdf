import markdown
from weasyprint import HTML
import logging
import os

# Configurar logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def markdown_to_pdf(markdown_text, output_filename="output.pdf"):
    """
    Convierte un texto en formato Markdown a un archivo PDF.
    
    :param markdown_text: Texto en formato Markdown.
    :param output_filename: Nombre del archivo de salida en formato PDF.
    :return: Ruta del archivo PDF generado.
    """
    try:
        # Convertir Markdown a HTML
        html_content = markdown.markdown(markdown_text)

        # Crear el archivo PDF
        pdf_path = os.path.join(os.getcwd(), output_filename)
        HTML(string=html_content).write_pdf(pdf_path)

        logger.info(f"PDF generado correctamente: {pdf_path}")
        return pdf_path

    except Exception as e:
        logger.error(f"Error al generar el PDF: {e}")
        return None
