import { useState } from "react";
import { ScrollReveal } from "./ScrollReveal";
import { faqsData } from "../data/faqs";
import { businessConfig } from "../config/business";
import { trackEvent } from "../utils/analytics";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="bg-white py-20 sm:py-24">
      <ScrollReveal>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Left Column — Sticky Header */}
            <div className="lg:col-span-2 lg:sticky lg:top-28 lg:self-start">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#C8202F] block mb-3">FAQ</span>
              <h2
                className="text-3xl sm:text-4xl font-bold text-[#16191D] tracking-tight mb-5"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Common Questions
              </h2>
              <p className="text-base text-[#606770] leading-relaxed mb-7">
                Don't see your question? Call us directly — we're happy to help.
              </p>
              <a
                href={businessConfig.phone.link}
                onClick={() =>
                  trackEvent({ type: "phone_click", displayPhone: businessConfig.phone.display })
                }
                className="inline-flex items-center gap-2 rounded-lg bg-[#C8202F] hover:bg-[#AE1D2A] px-6 py-3.5 text-sm font-semibold text-white transition-colors shadow-sm focus-visible:outline-2 focus-visible:outline-[#C8202F]"
              >
                Call {businessConfig.phone.display}
              </a>
            </div>

            {/* Right Column — Accordion */}
            <div className="lg:col-span-3">
              <div className="divide-y divide-[#DDE0E3] border-t border-b border-[#DDE0E3]">
                {faqsData.map((faq, idx) => {
                  const isOpen = openIndex === idx;
                  return (
                    <div key={idx}>
                      <button
                        onClick={() => toggle(idx)}
                        className="w-full flex items-start justify-between gap-4 py-5 text-left focus-visible:outline-2 focus-visible:outline-[#C8202F] rounded-sm group"
                        aria-expanded={isOpen}
                        aria-controls={`faq-answer-${idx}`}
                      >
                        <div className="flex items-start gap-3.5">
                          <span
                            className="text-xs font-mono font-semibold text-[#818891] pt-1 flex-shrink-0"
                            aria-hidden="true"
                          >
                            Q{String(idx + 1).padStart(2, "0")}
                          </span>
                          <span
                            className="text-base sm:text-lg font-bold text-[#16191D] group-hover:text-[#C8202F] transition-colors"
                            style={{ fontFamily: "var(--font-display)" }}
                          >
                            {faq.q}
                          </span>
                        </div>
                        <svg
                          className={`size-5 text-[#818891] flex-shrink-0 mt-1 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                      </button>
                      <div
                        id={`faq-answer-${idx}`}
                        role="region"
                        className={`overflow-hidden transition-all duration-300 ease-out ${
                          isOpen ? "max-h-96 opacity-100 pb-5" : "max-h-0 opacity-0"
                        }`}
                      >
                        <p className="text-base text-[#606770] leading-relaxed pl-[calc(2.25rem+0.875rem)]">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
