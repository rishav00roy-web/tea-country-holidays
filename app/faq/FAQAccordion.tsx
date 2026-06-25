"use client";

import { useState } from "react";

type FAQ = {
  question: string;
  answer: string;
};

type FAQAccordionProps = {
  faqs: FAQ[];
};

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-3">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-xl bg-white overflow-hidden"
        >
          <button
            onClick={() => toggle(index)}
            className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer"
            aria-expanded={openIndex === index}
          >
            <span className="text-[#1a3c2e] font-medium text-sm md:text-base pr-4">
              {faq.question}
            </span>
            <span
              className={`flex-shrink-0 w-6 h-6 rounded-full border-2 border-[#c9a84c] flex items-center justify-center transition-transform duration-200 ${
                openIndex === index ? "rotate-45" : ""
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
            className={`transition-all duration-300 ease-in-out ${
              openIndex === index
                ? "max-h-96 opacity-100"
                : "max-h-0 opacity-0"
            } overflow-hidden`}
          >
            <p className="px-6 pb-5 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
              {faq.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
