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
