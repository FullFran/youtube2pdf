from youtube_transcript_api import YouTubeTranscriptApi, TranscriptsDisabled, NoTranscriptFound
from youtube_transcript_api.proxies import WebshareProxyConfig
import logging
import os
from dotenv import load_dotenv

# Cargar variables de entorno desde .env
load_dotenv()

# Configurar logging para depuración (nivel DEBUG para mayor detalle)
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Configurar la API de YouTube Transcript con Webshare Proxy
try:
    PROXY_USERNAME = os.getenv("WEBSHARE_PROXY_USERNAME")
    PROXY_PASSWORD = os.getenv("WEBSHARE_PROXY_PASSWORD")

    if not PROXY_USERNAME or not PROXY_PASSWORD:
        raise ValueError("Faltan credenciales de Webshare Proxy en las variables de entorno.")

    ytt_api = YouTubeTranscriptApi(
        proxy_config=WebshareProxyConfig(
            proxy_username=PROXY_USERNAME,
            proxy_password=PROXY_PASSWORD,
        )
    )
    logger.info("✅ Proxy configurado correctamente con Webshare.")

except Exception as e:
    logger.exception(f"⚠️ Error al configurar el proxy: {e}")
    ytt_api = YouTubeTranscriptApi()
    logger.info("🚫 Proxy deshabilitado, usando conexión directa.")


def fetch_subtitles(video_id: str):
    """
    Obtiene los subtítulos de un video de YouTube, priorizando los manuales.
    
    :param video_id: ID del video de YouTube
    :return: Diccionario con subtítulos o un mensaje de error
    """
    try:
        logger.info(f"Solicitando subtítulos para el video: {video_id}")

        # Obtener lista de subtítulos disponibles
        try:
            transcript_list = ytt_api.list_transcripts(video_id)
            logger.debug(f"Lista de subtítulos obtenida: {transcript_list}")
        except TranscriptsDisabled:
            logger.error("Los subtítulos están deshabilitados para este video.")
            return {"error": "Los subtítulos están deshabilitados para este video."}
        except NoTranscriptFound:
            logger.error("No se encontraron subtítulos para este video.")
            return {"error": "No se encontraron subtítulos para este video."}
        except Exception as e:
            logger.exception(f"Error al obtener la lista de subtítulos: {e}")
            return {"error": "Error inesperado al intentar recuperar los subtítulos."}

        # Intentar primero con subtítulos manuales
        for transcript in transcript_list:
            if not transcript.is_generated:
                try:
                    logger.debug(f"Intentando obtener subtítulos manuales (idioma: {transcript.language}).")
                    subtitles = transcript.fetch()
                    logger.debug(f"Subtítulos manuales obtenidos: {subtitles}")
                    # Usar acceso por atributo en lugar de subíndice
                    full_text = " ".join([entry.text for entry in subtitles])
                    return {
                        "video_id": video_id,
                        "language": transcript.language,
                        "generated": False,
                        "text": full_text
                    }
                except Exception as e:
                    logger.exception(f"Error al obtener subtítulos manuales para {transcript.language}: {e}")
                    continue

        # Si no hay subtítulos manuales, intentar con los generados automáticamente
        for transcript in transcript_list:
            if transcript.is_generated:
                try:
                    logger.debug(f"Intentando obtener subtítulos automáticos (idioma: {transcript.language}).")
                    subtitles = transcript.fetch()
                    logger.debug(f"Subtítulos automáticos obtenidos: {subtitles}")
                    full_text = " ".join([entry.text for entry in subtitles])
                    return {
                        "video_id": video_id,
                        "language": transcript.language,
                        "generated": True,
                        "text": full_text
                    }
                except Exception as e:
                    logger.exception(f"Error al obtener subtítulos automáticos para {transcript.language}: {e}")
                    continue

        logger.error("No se encontraron subtítulos disponibles para este video.")
        return {"error": "No subtitles available for this video."}

    except Exception as e:
        logger.exception(f"Error inesperado en la API: {e}")
        return {"error": "Error interno del servidor."}

