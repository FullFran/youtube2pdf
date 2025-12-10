# 🎥 YouTube2PDF

Turn YouTube videos into actionable PDF summaries and study guides using AI.

YouTube2PDF is a powerful tool that extracts transcripts from YouTube videos, processes them with OpenAI's advanced language models, and generates clean, professional PDF reports. Perfect for students, researchers, and professionals who need to digest video content quickly.

![YouTube2PDF Banner](https://placehold.co/1200x400/2563eb/ffffff?text=YouTube2PDF)

## ✨ Features

-   **📽️ Video Transcription**: Automatically fetch and parse transcripts from YouTube videos.
-   **🧠 AI-Powered Summaries**: Utilize OpenAI to generate concise summaries, study notes, and key takeaways.
-   **📄 PDF Generation**: Export processed content into beautifully formatted PDF documents.
-   **🔐 Secure Authentication**: User sign-up and login powered by **Supabase Auth**.
-   **💾 Cloud Persistence**: Save your generated PDF reports and video history to **Supabase Database**.
-   **📊 User Dashboard**: Manage your generated reports and view usage history.

## 🛠️ Tech Stack

Built with a modern, type-safe stack for performance and scalability:

-   **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Database & Auth**: [Supabase](https://supabase.com/)
-   **ORM**: [Drizzle ORM](https://orm.drizzle.team/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
-   **AI**: [OpenAI API](https://openai.com/)
-   **PDF Engine**: [React-PDF](https://react-pdf.org/) / `pdf-lib`

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

-   Node.js 18+ installed
-   Docker (optional, for containerized database)
-   Supabase account
-   OpenAI API Key

### 1. Clone the repository

```bash
git clone https://github.com/blakia/youtube2pdf.git
cd youtube2pdf
```

### 2. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 3. Environment Setup

Create a `.env` file in the root directory and configure the following variables (see `.env.example`):

```bash
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
DATABASE_URL=your_database_connection_string

# OpenAI
OPENAI_API_KEY=your_openai_api_key

# Other services (if applicable)
MAILGUN_API_KEY=...
STRIPE_SECRET_KEY=...
```

### 4. Database Setup

Using Drizzle Kit to push the schema to your Supabase database:

```bash
npm run db:push
```

### 5. Run the Application

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🐳 Docker Support

The project includes Docker configurations for both development and production.

### Run with Docker Compose

```bash
# Development
docker-compose -f docker/dev/docker-compose.yml up --build

# Production
docker-compose -f docker/prod/docker-compose.yml up --build -d
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the project
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
