import { useState } from "react";
import { ScrollReveal } from "./ScrollReveal";

const faqs = [
  { q: "How much does a panel upgrade cost?", a: "Panel upgrades typically range from $1,500 to $3,500 depending on the size of your home and the amperage needed. We provide a free, upfront quote before any work begins — no surprises." },
  { q: "Do you pull permits?", a: "Yes, always. We pull permits on every job that requires one. This protects you as the homeowner and ensures the work is done to code." },
  { q: "How fast can you come out?", a: "We do our best to schedule jobs quickly. For electrical emergencies, call (858) 997-9251 and we will assist you as soon as we can." },
  { q: "Are you licensed and insured?", a: "Yes. LTE Electric is a fully licensed C-10 Electrical Contractor in California (#1072569) and carries $2,000,000 in liability insurance and $25,000 in bonding." },
  { q: "Do you work on both homes and businesses?", a: "Yes. We handle residential and commercial electrical work across all of San Diego County." },
  { q: "What areas do you serve?", a: "We serve all of San Diego County including San Diego, Chula Vista, El Cajon, Santee, Escondido, La Mesa, Lemon Grove, National City, Spring Valley, Lakeside, Poway, and surrounding cities." },
  { q: "Do you offer free estimates?", a: "Yes, we provide free estimates on all jobs. Call us at (858) 997-9251 or fill out our contact form and we'll get back to you to schedule." },
  { q: "Can you install a Tesla Wall Connector or EV charger?", a: "Absolutely. We install all major EV charger brands including Tesla Wall Connector, ChargePoint, and JuiceBox. We handle permits, wiring, and setup from start to finish." },
];

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
                  <a href="tel:8589979251" className="font-semibold text-red-400 hover:text-red-300">
                    (858) 997-9251
                  </a>
                </p>
              </div>
              <div className="mt-10 lg:col-span-7 lg:mt-0">
                <dl className="space-y-6 divide-y divide-gray-200 dark:divide-white/10">
                  {faqs.map((faq, i) => (
                    <div key={i} className="pt-6">
                      <dt>
                        <button
                          onClick={() => setOpen(open === i ? null : i)}
                          className="flex w-full items-start justify-between text-left text-gray-900 dark:text-white transition-all duration-200 ease-in-out hover:scale-105 active:scale-95"
                        >
                          <span className="text-base font-semibold">{faq.q}</span>
                          <span className="ml-6 flex h-7 items-center">
                            <svg className={`size-6 transition-transform ${open === i ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
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
