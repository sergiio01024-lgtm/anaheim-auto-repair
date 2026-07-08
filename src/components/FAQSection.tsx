import { useState } from "react";
import { ScrollReveal } from "./ScrollReveal";

const faqs = [
  { q: "Do you do free estimates?", a: "Yes. We give free, upfront quotes — including over the phone for many jobs. Call us at (714) 826-4444 and we'll walk you through it." },
  { q: "What kind of cars do you work on?", a: "All makes and models, foreign and domestic — Honda, Toyota, Ford, Chevy, BMW, Mercedes, Audi, Nissan, Lexus, and more." },
  { q: "Do you do mufflers and catalytic converters?", a: "Yes — muffler and exhaust work is our specialty. Muffler replacement, catalytic converters, and full exhaust systems are what we've done best for over 45 years." },
  { q: "Can I get a quote over the phone?", a: "Often, yes. Call (714) 826-4444 and describe the issue. For exhaust work you can even email photos and we'll quote it." },
  { q: "Do you do oil changes and routine maintenance?", a: "Absolutely. Oil and filter changes, 30k/60k/90k service, AC recharge, batteries, tune-ups, and more." },
  { q: "What are your hours?", a: "Monday through Friday 8:30 AM to 5:30 PM, Saturday 8:30 AM to 4:30 PM. Closed Sunday." },
  { q: "Where are you located?", a: "2583 W Ball Rd, Anaheim, CA 92804 — easy to reach from anywhere in Orange County." },
  { q: "Do you check engine lights?", a: "Yes. We run check-engine diagnostics and will tell you honestly what's going on before doing any work." },
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
                  <a href="tel:7148264444" className="font-semibold text-red-400 hover:text-red-300">
                    (714) 826-4444
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
