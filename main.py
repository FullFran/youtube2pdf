from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
import uvicorn
import logging
from subtitles import fetch_subtitles  # Importa la función del otro archivo
from sub2md import subtitles_to_markdown  # Importa la función del otro archivo
from md2pdf import markdown_to_pdf  # Importa la función del otro archivo

# Configurar logging para depuración
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

@app.get("/subtitles/{video_id}")
async def get_subtitles(video_id: str):
    result = fetch_subtitles(video_id)

    # Si hay error, devolverlo como HTTPException
    if "error" in result:
        raise HTTPException(status_code=404, detail=result["error"])
    
    return result

@app.get("/subtitles/{video_id}/markdown")
async def get_markdown_report(video_id: str):
    result = fetch_subtitles(video_id)

    if "error" in result:
        raise HTTPException(status_code=404, detail=result["error"])
    
    markdown_report = subtitles_to_markdown(result)

    if markdown_report is None:
        raise HTTPException(status_code=500, detail="Error al generar el informe en Markdown.")

    return {"video_id": video_id, "markdown": markdown_report}

@app.get("/subtitles/{video_id}/pdf")
async def get_pdf_report(video_id: str):
    result = fetch_subtitles(video_id)

    if "error" in result:
        raise HTTPException(status_code=404, detail=result["error"])
    
    markdown_report = subtitles_to_markdown(result)

    if markdown_report is None:
        raise HTTPException(status_code=500, detail="Error al generar el informe en Markdown.")

    pdf_path = markdown_to_pdf(markdown_report, f"{video_id}.pdf")

    if pdf_path is None:
        raise HTTPException(status_code=500, detail="Error al generar el PDF.")

    return FileResponse(pdf_path, media_type="application/pdf", filename=f"{video_id}.pdf")


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
