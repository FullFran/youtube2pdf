const API_BASE_URL = "https://youtube2pdf-production.up.railway.app"; // ✅ Asegurar que no haya doble //

function extractVideoId(url) {
    const regex = /(?:youtu\.be\/|youtube\.com\/(?:.*[?&]v=|embed\/|v\/|shorts\/))([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}

async function getSubtitles() {
    let videoUrl = document.getElementById("videoId").value;
    let videoId = extractVideoId(videoUrl);

    if (!videoId) {
        alert("Por favor, introduce una URL válida de YouTube.");
        return;
    }

    try {
        console.log(`🔹 Solicitando subtítulos desde: ${API_BASE_URL}/subtitles/${videoId}`);
        const response = await fetch(`${API_BASE_URL}/subtitles/${videoId}`);

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("🔹 Respuesta de la API:", data);

        if (data && typeof data === "object") {
            document.getElementById("result").innerText = JSON.stringify(data, null, 2);
        } else {
            throw new Error("Formato de respuesta inesperado.");
        }
    } catch (error) {
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

    try {
        console.log(`🔹 Solicitando Markdown desde: ${API_BASE_URL}/subtitles/${videoId}/markdown`);
        const response = await fetch(`${API_BASE_URL}/subtitles/${videoId}/markdown`);

        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("🔹 Respuesta de la API:", data);

        if (data && data.markdown) {
            document.getElementById("result").innerText = data.markdown;
        } else {
            throw new Error("Formato de respuesta inesperado.");
        }
    } catch (error) {
        alert(`Error al obtener el Markdown: ${error.message}`);
        console.error(error);
    }
}

function getPDF() {
    let videoUrl = document.getElementById("videoId").value;
    let videoId = extractVideoId(videoUrl);

    if (!videoId) {
        alert("Por favor, introduce una URL válida de YouTube.");
        return;
    }

    let pdfUrl = `${API_BASE_URL}/subtitles/${videoId}/pdf`;
    console.log(`🔹 Abriendo PDF desde: ${pdfUrl}`);

    window.open(pdfUrl, "_blank");
}
