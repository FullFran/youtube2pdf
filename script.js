const API_BASE_URL = "https://youtube2pdf-production.up.railway.app"; // ✅ Eliminada barra extra

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
        const response = await fetch(`${API_BASE_URL}/subtitles/${videoId}`); // ✅ Corregida la URL
        const data = await response.json();

        if (response.ok) {
            document.getElementById("result").innerText = JSON.stringify(data, null, 2);
        } else {
            alert(data.detail);
        }
    } catch (error) {
        alert("Error al obtener los subtítulos.");
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
        const response = await fetch(`${API_BASE_URL}/subtitles/${videoId}/markdown`); // ✅ Corregida la URL
        const data = await response.json();

        if (response.ok) {
            document.getElementById("result").innerText = data.markdown;
        } else {
            alert(data.detail);
        }
    } catch (error) {
        alert("Error al obtener el Markdown.");
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

    // ✅ Corregida la URL para abrir el PDF correctamente
    window.open(`${API_BASE_URL}/subtitles/${videoId}/pdf`, "_blank");
}

