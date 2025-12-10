"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

  {
    question: "Is YouTube2PDF free to use?",
    answer:
      "Yes! You can generate PDF summaries from YouTube videos completely for free.",
  },
  {
    question: "How does it work?",
    answer:
      "We fetch the transcript from the YouTube video, process it with OpenAI to generate a summary and study notes, and then convert it into a downloadable PDF.",
  },
  {
    question: "Do I need an OpenAI API Key?",
    answer:
      "Yes, you need to provide your own OpenAI API Key to generate the AI summaries. Your key is stored securely and only used for your requests.",
  },
  {
    question: "Can I save my reports?",
    answer:
      "Yes! If you sign up for an account, all your generated reports will be saved to your dashboard for future access.",
  },
  {
    question: "What languages are supported?",
    answer: "YouTube2PDF supports any video that has a transcript available on YouTube.",
  },
  {
    question: "Is it open source?",
    answer:
      "Yes! YouTube2PDF is open-source. You can check out the code on our GitHub repository.",
  },

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      id="faq"
      className="min-h-screen bg-[#0F0F0F] px-4 py-12 md:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-4 text-center text-4xl font-medium text-white">
          Frequently Asked Questions
        </h2>
        <p className="mb-12 text-center text-base text-zinc-500">
          Have another question? Contact us on{" "}
          <a
            href="https://x.com/idee8agency"
            target="_blank"
            className="text-zinc-200 hover:text-white underline"
          >
            Twitter
          </a>{" "}
          or by{" "}
          <a
            href="mailto:hi@idee8.agency"
            target="_blank"
            className="text-zinc-200 hover:text-white underline"
          >
            email
          </a>
          .
        </p>

        <div className="space-y-[2px]">
          {faqs.map((faq, index) => (
            <div key={index} className="overflow-hidden">
              <button
                onClick={() => toggleQuestion(index)}
                className="flex w-full items-center justify-between bg-zinc-900/50 px-6 py-4 text-left transition-colors hover:bg-zinc-900"
              >
                <span className="text-[16px] font-medium text-white">
                  {faq.question}
                </span>
                <span className="ml-6 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-zinc-700">
                  <PlusIcon
                    className={`h-3 w-3 text-white transition-transform duration-200 ${openIndex === index ? "rotate-45" : ""}`}
                  />
                </span>
              </button>
              <div
                className={`grid transition-all duration-200 ease-in-out ${
                  openIndex === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="bg-zinc-900/30 px-6 py-4 text-base text-zinc-400">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PlusIcon({ className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>
  );
}
