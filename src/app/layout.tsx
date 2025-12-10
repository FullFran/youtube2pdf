import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import type React from "react"; // Import React
import "./globals.css";

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "YouTube2PDF",
  description:
    "Turn YouTube videos into actionable PDF summaries and study guides using AI.",
  keywords: [
    "youtube to pdf",
    "video summarizer",
    "ai study guide",
    "youtube transcript",
    "pdf generator",
    "student tools",
    "research tools",
    "openai",
    "supabase",
    "nextjs",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(bricolageGrotesque.className, "antialiased")}>
        {children}
      </body>
    </html>
  );
}
