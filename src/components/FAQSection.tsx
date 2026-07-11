import { useState } from "react";
import { ScrollReveal } from "./ScrollReveal";
import { faqsData } from "../data/faqs";
import { businessConfig } from "../config/business";

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white py-24 border-b border-zinc-200">
      <ScrollReveal>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-5">
                <span className="text-sm font-bold tracking-widest uppercase text-primary block mb-3">
                  Questions
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900">
                  Frequently Asked Questions
                </h2>
                <p className="mt-4 text-base text-zinc-650 font-semibold">
                  Can't find the answer you're looking for? Call us at{" "}
                  <a
                    href={businessConfig.phone.link}
                    className="font-bold text-primary hover:underline"
                  >
                    {businessConfig.phone.display}
                  </a>
                </p>
              </div>
              <div className="mt-10 lg:col-span-7 lg:mt-0">
                <dl className="space-y-4 divide-y divide-zinc-250">
                  {faqsData.map((faq, i) => (
                    <div key={i} className="pt-4 first:pt-0">
                      <dt>
                        <button
                          onClick={() => setOpen(open === i ? null : i)}
                          className="flex w-full items-start justify-between text-left text-zinc-900 py-2 focus-visible:outline-2 focus-visible:outline-primary rounded px-1"
                          aria-expanded={open === i}
                          aria-controls={`faq-answer-${i}`}
                        >
                          <span className="text-base font-bold">{faq.q}</span>
                          <span className="ml-6 flex h-7 items-center">
                            <svg
                              className={`size-5 text-zinc-500 transition-transform duration-200 ${open === i ? "rotate-180" : ""}`}
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m19.5 8.25-7.5 7.5-7.5-7.5"
                              />
                            </svg>
                          </span>
                        </button>
                      </dt>
                      {open === i && (
                        <dd id={`faq-answer-${i}`} className="mt-2 pr-12">
                          <p className="text-sm text-zinc-600 leading-relaxed font-semibold">
                            {faq.a}
                          </p>
                        </dd>
                      )}
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
