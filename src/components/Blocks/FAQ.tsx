'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQBlockProps {
  heading?: string;
  items?: FAQItem[];
}

export default function FAQBlock({
  heading = "Frequently Asked Questions",
  items = []
}: FAQBlockProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-gradient-to-b from-(--color-gallery) to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {heading && (
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-(--color-primary) mb-4">
                FAQs
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {heading}
              </p>
            </div>
          )}
          <div className="space-y-4">
            {items.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] border-2 border-transparent hover:border-(--color-sidecar) overflow-hidden transition-all hover:shadow-[0_15px_40px_rgba(0,0,0,0.12)]"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-8 py-6 text-left flex justify-between items-center hover:bg-(--color-sidecar)/10 transition-colors group"
                >
                  <h3 className="text-xl font-bold text-(--color-primary) pr-8 group-hover:text-(--color-roti) transition-colors">
                    {item.question}
                  </h3>
                  <span className="text-(--color-roti) text-3xl font-bold shrink-0 w-10 h-10 flex items-center justify-center rounded-full bg-(--color-sidecar) group-hover:bg-(--color-roti) group-hover:text-white transition-all">
                    {openIndex === index ? '−' : '+'}
                  </span>
                </button>
                {openIndex === index && (
                  <div className="px-8 pb-8 pt-2 border-t border-(--color-gallery)">
                    <p className="text-gray-700 leading-relaxed text-lg pt-4">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

