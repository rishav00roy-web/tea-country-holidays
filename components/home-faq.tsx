"use client";

import { useState } from "react";
import Link from "next/link";

export interface FAQ {
  id?: string | number;
  question: string;
  answer: string;
  sort_order?: number;
}

export const fallbackFAQs: FAQ[] = [
  {
    question: "What is the best time to visit Northeast India?",
    answer:
      "October to April is the best time to visit Northeast India. The weather is cool and dry, ideal for wildlife safaris, trekking, and sightseeing. December to February is peak season with clear skies and vibrant festivals. Avoid June to September — heavy monsoon rains frequently cause landslides and road closures.",
  },
  {
    question: "Do I need a permit to visit Northeast India?",
    answer:
      "It depends on the state. Assam, Meghalaya, and Tripura require no permits for Indian nationals. Arunachal Pradesh, Manipur, Mizoram, and Nagaland require an Inner Line Permit (ILP), now available online within a few hours. Tea Country Holidays assists all clients with permit arrangements.",
  },
  {
    question: "Can I customise my holiday itinerary?",
    answer:
      "Yes, every package is fully customisable. You can add or remove destinations, adjust the number of days, choose your accommodation type, or build an itinerary entirely from scratch. Just share your travel dates, group size, and budget and we'll put together a tailored plan.",
  },
];

export default function HomeFAQ({ initialFAQs = fallbackFAQs }: { initialFAQs?: FAQ[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className="py-20 px-4 bg-[#fafaf7] dark:bg-[#0A2E1D]">
      {/* heading */}
      <div className="max-w-3xl mx-auto text-center mb-12 reveal">
        <p className="section-label text-[#a88a3a] mb-3 font-sans">
          Got Questions?
        </p>
        <h2 className="text-2xl md:text-4xl font-bold text-[#1a3c2e] dark:text-white font-display leading-tight">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-500 dark:text-white/70 mt-3 text-sm font-sans">
          Quick answers to the most common questions about travelling Northeast India with us.
        </p>
      </div>

      {/* accordion items */}
      <div className="reveal-stagger max-w-3xl mx-auto space-y-3">
        {initialFAQs.map((faq, i) => (
          <div
            key={faq.id || i}
            className="border border-gray-200 dark:border-white/10 rounded-xl bg-white dark:bg-[#12291f] overflow-hidden shadow-sm"
          >
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer min-h-[44px]"
              aria-expanded={openIndex === i}
              aria-controls={`faq-panel-${i}`}
            >
              <span className="text-[#1a3c2e] dark:text-white font-medium text-sm md:text-base pr-4">
                {faq.question}
              </span>
              <span
                className={`flex-shrink-0 w-6 h-6 rounded-full border-2 border-[#c9a84c] flex items-center justify-center transition-transform duration-300 ${
                  openIndex === i ? "rotate-45" : ""
                }`}
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 1V9M1 5H9"
                    stroke="#c9a84c"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </button>

            <div
              id={`faq-panel-${i}`}
              className={`grid transition-all duration-300 ease-in-out ${
                openIndex === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-5 text-gray-600 dark:text-white/70 text-sm leading-relaxed border-t border-gray-100 dark:border-white/10 pt-4">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA button */}
      <div className="flex justify-center mt-10">
        <Link
          href="/faq"
          className="inline-flex items-center gap-2 border-2 border-[#1a3c2e] dark:border-white text-[#1a3c2e] dark:text-white hover:bg-[#1a3c2e] hover:text-white dark:hover:bg-white dark:hover:text-[#1a3c2e] font-semibold px-8 py-3 rounded-full text-sm transition-all duration-200 font-sans group"
        >
          View All FAQs
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-200 group-hover:translate-x-1"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
