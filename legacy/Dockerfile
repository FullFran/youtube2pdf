# Usa una imagen base ligera con Python
FROM python:3.11-slim

# Instala dependencias del sistema necesarias para WeasyPrint
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

# Configura la variable de entorno para la API Key de Gemini
ENV OPENAI_API_KEY=""

# Comando para ejecutar la aplicación
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
