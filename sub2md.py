import openai
import os

# 🔹 Configurar la API Key
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")  # Asegúrate de definir esta variable de entorno
openai.api_key = OPENAI_API_KEY

def subtitles_to_markdown(subtitle_data):
    """
    Convierte una transcripción de video en un informe en Markdown usando OpenAI GPT-4.
    """
    if "error" in subtitle_data:
        print(f"❌ No se pueden procesar los subtítulos: {subtitle_data['error']}")
        return None

    video_id = subtitle_data["video_id"]
    language = subtitle_data["language"]
    text = subtitle_data["text"]

    # 🔹 Definir el prompt para generar el informe en Markdown
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

    try:
        # 🔹 Generar la respuesta con OpenAI
        response = openai.ChatCompletion.create(
            model="gpt-4-turbo",
            messages=[{"role": "system", "content": "Eres un asistente que genera informes en Markdown."},
                      {"role": "user", "content": prompt}],
            temperature=0.7
        )

        # 🔹 Extraer la respuesta generada
        markdown_report = response["choices"][0]["message"]["content"]
        return markdown_report

    except openai.error.OpenAIError as e:
        print(f"❌ Error al generar el informe con OpenAI: {e}")
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
