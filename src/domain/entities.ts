export interface Video {
  id: string;
  url: string;
  title: string;
  duration?: number;
}

export interface Report {
  id: string;
  videoId: string;
  userId: string;
  markdownContent: string;
  pdfUrl?: string;
  createdAt: Date;
}

export interface User {
  id: string;
  email: string;
  subscriptionStatus: 'free' | 'pro';
}
