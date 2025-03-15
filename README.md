# 🎬 YouTube2PDF - Subtitle Extraction & Report Generation  

🚀 **Quickly save and organize YouTube subtitles for easy reference, structured notes, and professional documentation.**  
Whether you're watching **technical tutorials, lectures, interviews, or research videos**, this tool helps you extract subtitles and convert them into **readable reports** in **Markdown or PDF**—without manually taking notes.  

---

## 🌟 Why This Matters  

Technical videos contain **valuable information**, but revisiting them for key points is time-consuming.  
Instead of **rewatching an entire video**, this tool lets you **save and structure subtitles into organized reports** for quick reference.  

✅ **Never lose track of important content** – Convert YouTube subtitles into searchable documents.  
✅ **Improve learning efficiency** – Review tutorials and courses as structured reports.  
✅ **Enhance accessibility** – Keep a readable copy of video content without replaying it.  
✅ **Save time** – No need to manually transcribe or format subtitles.  

---

## 🎯 How It Works  

1. **Paste a YouTube video URL** – The system retrieves subtitles automatically.  
2. **Select your format** – Get structured **Markdown reports or PDFs**.  
3. **AI-powered formatting** – Large Language Models (LLMs) organize subtitles into structured reports.  
4. **Download your file** – Ready-to-use documents in seconds.  

💡 **Example Use Cases:**  
- Developers saving **coding tutorials** as documentation.  
- Students organizing **lecture notes** efficiently.  
- Professionals keeping track of **webinars & training videos**.  

---

## 🛠️ Key Features  

✅ **Extracts subtitles from YouTube videos**  
✅ **AI-enhanced Markdown formatting** for structured notes  
✅ **Automatic PDF generation** for offline access  
✅ **Fast, lightweight API** for subtitle processing  
✅ **Cloud-based, no installation needed**  


## 📌 Try It Now  

A live demo is available on fullfran.github.io/youtube2pdf/, where you can test the tool by pasting a YouTube URL and selecting the desired format.  

## 🛠️ Technologies Used
- FastAPI (Python) – High-performance API for subtitle extraction
- Large Language Models (LLMs) – AI-powered text formatting
- Docker – Containerized deployment
- Railway Cloud – Scalable backend hosting
- GitHub Pages – Frontend deployment
- JavaScript (Vanilla, Fetch API) – Interactive UI

This stack ensures:

- ⚡ Fast API responses with FastAPI
- 🤖 AI-enhanced text processing for subtitle formatting
- ☁️ Cloud-hosted backend for instant availability
- 📦 Scalable & portable deployment with Docker


---

## 🚀 Deployment Guide  

### 🔧 Running Locally  
1. **Clone the repository**  
   ```bash
   git clone https://github.com/fullfran/youtube2pdf.git
   cd youtube2pdf
   ```

2. **Create a virtual environment and install dependencies**  
   ```bash
   python -m venv venv
   source venv/bin/activate  # En Windows usa: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Run the FastAPI server**  
   ```bash
   uvicorn app.main:app --reload
   ```

4. Open `http://127.0.0.1:8000/docs` to access the API.  

---

### 🐳 Running with Docker  
1. **Build the Docker image**  
   ```bash
   docker build -t youtube2pdf .
   ```

2. **Run the container**  
   ```bash
   docker run -p 8000:8000 youtube2pdf
   ```

3. Open `http://127.0.0.1:8000/docs` to access the API.  


---

### 🚄 Deploying on Railway  
1. **Fork the repository** on GitHub.  
2. **Go to Railway** and create a new project.  
3. **Connect it to your forked repository**.  
4. **Add the required environment variables**.  
5. **Deploy with one click** and get a live URL ready to use.  





