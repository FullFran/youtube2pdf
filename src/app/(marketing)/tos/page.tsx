import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms and Conditions | YouTube2PDF",
  description: "Terms and Conditions for YouTube2PDF usage",
};

const TOS = () => {
  return (
    <main className="max-w-xl mx-auto">
      <div className="p-5">
        <Link href="/" className="btn btn-ghost mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path
              fillRule="evenodd"
              d="M15 10a.75.75 0 01-.75.75H7.612l2.158 1.96a.75.75 0 11-1.04 1.08l-3.5-3.25a.75.75 0 010-1.08l3.5-3.25a.75.75 0 111.04 1.08L7.612 9.25h6.638A.75.75 0 0115 10z"
              clipRule="evenodd"
            />
          </svg>
          Back to Home
        </Link>
        <h1 className="text-3xl font-extrabold pb-6">
          Terms and Conditions
        </h1>

        <pre
          className="leading-relaxed whitespace-pre-wrap text-sm text-foreground/80 font-sans"
          style={{ fontFamily: "inherit" }}
        >
          {`Last Updated: December 10, 2025

Welcome to YouTube2PDF! These Terms and Conditions ("Terms") govern your use of our website and services, which allow you to convert YouTube videos into PDF summaries and study guides. By accessing or using YouTube2PDF, you agree to be bound by these Terms.

1. Description of Service

YouTube2PDF provides a platform that utilizes Artificial Intelligence to extract transcripts from YouTube videos and generate summarized PDF reports.

2. Ownership and Usage Rights

When you purchase a subscription or credits on YouTube2PDF, you gain access to our PDF generation tools. You retain ownership of the PDF documents you generate using our service.

3. Refunds

We want you to be satisfied with our service. If you are not happy with your purchase, you may request a full refund within 7 days of the transaction date. Please contact us at support@youtube2pdf.com to initiate a refund.

4. User Data and Privacy

We collect personal information necessary to provide our services, such as your name, email address, and payment information. We also use cookies to improve your experience. For more details on how we handle your data, please refer to our Privacy Policy.

5. Governing Law

These Terms are governed by and construed in accordance with the laws of Spain.

6. Changes to Terms

We reserve the right to modify these Terms at any time. We will notify you of any significant changes by email or by posting a notice on our website. Your continued use of the service after any such changes constitutes your acceptance of the new Terms.

7. Contact Information

If you have any questions about these Terms, please contact us at support@youtube2pdf.com.`}
        </pre>
      </div>
    </main>
  );
};

export default TOS;
