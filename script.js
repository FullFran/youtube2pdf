const API_BASE_URL = "https://youtube2pdf-production.up.railway.app/"; 

function extractVideoId(url) {
    const regex = /(?:youtu\.be\/|youtube\.com\/(?:.*v=|embed\/|v\/|shorts\/))([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
}


async function getSubtitles() {
    let videoUrl = document.getElementById("videoId").value;
    let videoId = extractVideoId(videoUrl);

    if (!videoId) {
        alert("Por favor, introduce una URL válida de youtube.");
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}subtitles/${videoId}`);
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
    const videoId = document.getElementById("videoId").value;
    if (!videoId) {
        alert("Por favor, introduce un ID de video.");
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}subtitles/${videoId}/markdown`);
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
    const videoId = document.getElementById("videoId").value;
    if (!videoId) {
        alert("Por favor, introduce un ID de video.");
        return;
    }

    // Abrir el PDF en una nueva pestaña
    window.open(`${API_BASE_URL}subtitles/${videoId}/pdf`, "_blank");
}
