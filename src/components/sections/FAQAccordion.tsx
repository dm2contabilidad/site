'use client';

import { useState } from 'react';
import type { FAQ } from '@/types/faq';

interface FAQAccordionProps {
  faqs: FAQ[];
  title?: string;
}

export function FAQAccordion({ faqs, title = 'Perguntas frequentes' }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  if (faqs.length === 0) return null;

  return (
    <div>
      {title && (
        <h2
          className="text-2xl md:text-3xl font-bold text-navy-900 mb-8"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {title}
        </h2>
      )}
      <div className="divide-y divide-neutral-200">
        {faqs.map((faq, index) => (
          <div key={index}>
            <button
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              className="w-full flex items-start justify-between py-5 text-left group"
              aria-expanded={openIndex === index}
            >
              <span className="text-base md:text-lg font-medium text-neutral-900 pr-4 group-hover:text-navy-800 transition-colors">
                {faq.question}
              </span>
              <span className="shrink-0 mt-1 text-neutral-400 group-hover:text-navy-600 transition-colors">
                <svg
                  className={`w-5 h-5 transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </span>
            </button>
            <div
              className={`
                overflow-hidden transition-all duration-200 ease-in-out
                ${openIndex === index ? 'max-h-96 pb-5' : 'max-h-0'}
              `}
            >
              <p className="text-neutral-600 leading-relaxed pr-8">
                {faq.answer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
