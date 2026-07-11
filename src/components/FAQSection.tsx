import { useState } from "react";
import { ScrollReveal } from "./ScrollReveal";
import { faqsData } from "../data/faqs";
import { businessConfig } from "../config/business";

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div id="faq" className="bg-white dark:bg-gray-950 py-12 md:py-32">
      <ScrollReveal>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-5">
                <h2 className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                  Frequently asked questions
                </h2>
                <p className="mt-4 text-gray-600 dark:text-gray-400">
                  Can't find the answer you're looking for? Call us at{" "}
                  <a
                    href={businessConfig.phone.link}
                    className="font-semibold text-red-400 hover:text-red-300"
                  >
                    {businessConfig.phone.display}
                  </a>
                </p>
              </div>
              <div className="mt-10 lg:col-span-7 lg:mt-0">
                <dl className="space-y-6 divide-y divide-gray-200 dark:divide-white/10">
                  {faqsData.map((faq, i) => (
                    <div key={i} className="pt-6">
                      <dt>
                        <button
                          onClick={() => setOpen(open === i ? null : i)}
                          className="flex w-full items-start justify-between text-left text-gray-900 dark:text-white transition-all duration-200 ease-in-out hover:scale-105 active:scale-95"
                        >
                          <span className="text-base font-semibold">{faq.q}</span>
                          <span className="ml-6 flex h-7 items-center">
                            <svg
                              className={`size-6 transition-transform ${open === i ? "rotate-180" : ""}`}
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
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
                        <dd className="mt-2 pr-12">
                          <p className="text-base text-gray-600 dark:text-gray-400">{faq.a}</p>
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
    </div>
  );
}
