import React, { useState } from "react";
import { LucideIcon } from "./LucideIcon";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "How are files processed without server uploads?",
    answer: "We use modern browser APIs, including HTML5 Canvas, window.crypto, and FileReader, to perform operations directly inside your tab. Images, barcodes, and passwords are calculated in memory on your own CPU. Your files are never transmitted across a network, which makes processing both secure and instantaneous."
  },
  {
    question: "Are there any volume limits or usage fees?",
    answer: "No. There are no subscriptions, payment gates, or daily limits. All developer utilities, converters, and generators are fully accessible without registration."
  },
  {
    question: "Is my personal data or generation history logged?",
    answer: "No data is logged because we do not run a tracking database. Since operations occur locally inside your browser, clearing your cache or closing the tab removes all temporary assets instantly."
  },
  {
    question: "How does the AI metadata generator process queries?",
    answer: "AI tools run through our secure server-side API proxy connected directly to Gemini. This keeps prompt execution fast and secure, preventing any direct exposures of system configurations or API keys to the public client."
  }
];

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-12 md:py-16 max-w-4xl mx-auto px-4 md:px-6 space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Frequently asked questions
        </h2>
        <p className="text-sm text-slate-500">
          Everything you need to know about processing data securely inside your browser.
        </p>
      </div>

      <div className="space-y-3.5">
        {FAQS.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200/60 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden transition-all shadow-sm"
            >
              <button
                onClick={() => toggleFaq(idx)}
                className="w-full flex items-center justify-between p-5 text-left font-semibold text-slate-700 dark:text-slate-300 hover:text-blue-600 transition-colors cursor-pointer select-none"
              >
                <span className="text-sm md:text-base">{faq.question}</span>
                <LucideIcon
                  name={isOpen ? "Minus" : "Plus"}
                  className={`text-slate-400 shrink-0 ${isOpen ? "text-blue-500" : ""}`}
                  size={16}
                />
              </button>

              {isOpen && (
                <div className="p-5 pt-0 border-t border-slate-100 dark:border-slate-800/50 bg-slate-50/50 dark:bg-slate-950/20 text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
