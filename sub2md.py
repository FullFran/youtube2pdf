import google.generativeai as genai
import os

# 🔹 Configurar la API Key
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")  # Reemplaza con tu clave
genai.configure(api_key=GEMINI_API_KEY)

def subtitles_to_markdown(subtitle_data):
    """
    Convierte una transcripción de video en un informe en Markdown usando Gemini.
    """
    if "error" in subtitle_data:
        print(f"❌ No se pueden procesar los subtítulos: {subtitle_data['error']}")
        return None

    video_id = subtitle_data["video_id"]
    language = subtitle_data["language"]
    text = subtitle_data["text"]

    # 🔹 Configurar el modelo Gemini 1.5 Pro
    model = genai.GenerativeModel("gemini-1.5-pro-latest")

    # 🔹 Definir el prompt para generar el informe
    prompt = f"""
    Eres un asistente experto en generar informes en Markdown. 
    A partir de los subtítulos de un video, genera un resumen bien estructurado con:

    - **Título del informe**
    - **Resumen del contenido**
    - **Puntos clave**
    - **Conclusión**

    Subtítulos en {language}:

    {text}

    Por favor, responde exclusivamente en formato Markdown sin agregar explicaciones adicionales.
    """

    # 🔹 Generar la respuesta con Gemini
    response = model.generate_content(prompt)

    if response and response.text:
        return response.text
    else:
        print("❌ Error al generar el informe con Gemini")
        return None

# 🔹 Ejemplo de uso con una transcripción de prueba
test_subtitles = {
    "video_id": "dQw4w9WgXcQ",
    "language": "es",
    "text": "Aquí va la transcripción completa del video..."
}

markdown_report = subtitles_to_markdown(test_subtitles)

if markdown_report:
    print("✅ Informe generado con éxito:\n")
    print(markdown_report[:500])  # Muestra los primeros 500 caracteres
