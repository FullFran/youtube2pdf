const API_BASE_URL = "https://youtube2pdf-production.up.railway.app"; // ✅ Sin barra al final

function extractVideoId(url) {
    const regex = /(?:youtu\.be\/|youtube\.com\/(?:.*[?&]v=|embed\/|v\/|shorts\/))([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

function showLoader(show) {
    document.getElementById("loader").style.display = show ? "block" : "none";
}

async function getSubtitles() {
    let videoUrl = document.getElementById("videoId").value;
    let videoId = extractVideoId(videoUrl);

    if (!videoId) {
        alert("Por favor, introduce una URL válida de YouTube.");
        return;
    }

    showLoader(true);
    try {
        let url = `${API_BASE_URL}/subtitles/${videoId}`;
        console.log(`🔹 Solicitando subtítulos desde: ${url}`);

        const response = await fetch(url);
        console.log("🔹 Respuesta de la API:", response);

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("🔹 Datos recibidos:", data);

        showLoader(false);

        if (data && typeof data === "object") {
            document.getElementById("result").innerText = JSON.stringify(data, null, 2);
        } else {
            throw new Error("Formato de respuesta inesperado.");
        }
    } catch (error) {
        showLoader(false);
        alert(`Error al obtener los subtítulos: ${error.message}`);
        console.error(error);
    }
}

async function getMarkdown() {
    let videoUrl = document.getElementById("videoId").value;
    let videoId = extractVideoId(videoUrl);

    if (!videoId) {
        alert("Por favor, introduce una URL válida de YouTube.");
        return;
    }

    showLoader(true);
    try {
        let url = `${API_BASE_URL}/subtitles/${videoId}/markdown`;
        console.log(`🔹 Solicitando Markdown desde: ${url}`);

        const response = await fetch(url);
        console.log("🔹 Respuesta de la API:", response);

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("🔹 Datos recibidos:", data);

        showLoader(false);

        if (data && data.markdown) {
            document.getElementById("result").innerText = data.markdown;
        } else {
            throw new Error("Formato de respuesta inesperado.");
        }
    } catch (error) {
        showLoader(false);
        alert(`Error al obtener el Markdown: ${error.message}`);
        console.error(error);
    }
}

async function getPDF() {
    let videoUrl = document.getElementById("videoId").value;
    let videoId = extractVideoId(videoUrl);

    if (!videoId) {
        alert("Por favor, introduce una URL válida de YouTube.");
        return;
    }

    let pdfUrl = `${API_BASE_URL}/subtitles/${videoId}/pdf`;
    
     // 🔹 Mostrar mensaje de procesamiento
    document.getElementById("pdf-status").classList.remove("hidden");
    document.getElementById("pdf-status").innerText = "📄 Procesando PDF...";

    console.log(`🔹 Generando PDF desde: ${pdfUrl}`);

    try {
        // 🔹 Esperar la respuesta de la API
        let response = await fetch(pdfUrl);
        
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        // 🔹 Convertir respuesta en blob (archivo)
        let blob = await response.blob();

        // 🔹 Crear un enlace de descarga automático
        let link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "Informe.pdf";

        // 🔹 Ocultar mensaje y simular que la descarga ha sido generada
        setTimeout(() => {
            document.getElementById("pdf-status").innerText = "✅ PDF listo para descargar.";
            link.click(); // Simula la descarga automática
        }, 3000);
        
    } catch (error) {
        document.getElementById("pdf-status").innerText = "❌ Error al generar el PDF.";
        console.error(error);
    }
}
