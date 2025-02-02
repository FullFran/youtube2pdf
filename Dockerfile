# Usa una imagen base más ligera
FROM python:3.11-slim

# Instala las dependencias del sistema necesarias para WeasyPrint
RUN apt-get update && apt-get install -y \
    libpangocairo-1.0-0 \
    libpangoft2-1.0-0 \
    libgdk-pixbuf2.0-0 \
    libffi-dev \
    libgobject-2.0-0 \
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

# Configura la variable de entorno para que FastAPI use el host correcto
ENV HOST=0.0.0.0

# Comando para ejecutar la aplicación con Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
