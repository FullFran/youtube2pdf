import openai
import os

# Configurar la clave de API de OpenAI
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")  # Asegúrate de definir esta variable de entorno

client = openai.OpenAI(api_key=OPENAI_API_KEY)  # NUEVO: Crear cliente

def subtitles_to_markdown(subtitle_data):
    """
    Convierte una transcripción de video en un informe en formato Markdown utilizando OpenAI.
    """
    if "error" in subtitle_data:
        print(f"❌ No se pueden procesar los subtítulos: {subtitle_data['error']}")
        return None

    language = subtitle_data.get("language", "es")
    text = subtitle_data.get("text", "")

    if not text:
        print("❌ La transcripción del video está vacía.")
        return None

    # Definir el prompt para generar el informe en Markdown
    messages = [
        {"role": "system", "content": "Eres un asistente experto en generar informes en formato Markdown."},
        {"role": "user", "content": f"""
        A partir de los subtítulos de un video, genera un resumen bien estructurado en formato Markdown con:

        - **Título del informe**
        - **Resumen del contenido**
        - **Puntos clave**
        - **Conclusión**

        Subtítulos en {language}:

        {text}

        Por favor, responde exclusivamente en formato Markdown sin agregar explicaciones adicionales.
        """}
    ]

    try:
        # Generar la respuesta con OpenAI
        response = client.chat.completions.create(  # NUEVA SINTAXIS
            model="gpt-4o-mini",
            messages=messages,
            max_tokens=1500,
            temperature=0.7
        )

        # Extraer el texto generado
        markdown_report = response.choices[0].message.content
        return markdown_report
    except openai.APIError as e:
        print(f"❌ Error al generar el informe con OpenAI: {e}")
        return None