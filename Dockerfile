# Usa una imagen ligera de Python
FROM python:3.11-slim

# Instala dependencias del sistema necesarias para WeasyPrint y Google Generative AI
RUN apt-get update && apt-get install -y \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libcairo2 \
    libjpeg62-turbo \
    libpng-dev \
    libffi-dev \
    libgdk-pixbuf-2.0-0 \
    libglib2.0-0 \
    && apt-get clean

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos del proyecto al contenedor
COPY . .

# Instala las dependencias de Python
RUN pip install --no-cache-dir -r requirements.txt

# Expone el puerto 8000 para FastAPI
EXPOSE 8000

# Configura la variable de entorno para la API Key de Gemini (se pasará en runtime)
ENV GEMINI_API_KEY=""

# Comando para ejecutar la aplicación con Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
