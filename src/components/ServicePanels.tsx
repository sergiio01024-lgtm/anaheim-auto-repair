import React, { useState } from "react";
import { ScrollReveal } from "./ScrollReveal";
import { primaryServices, secondaryServices } from "../data/services";
import { businessConfig } from "../config/business";

export function ServicePanels() {
  const [showSecondary, setShowSecondary] = useState(false);

  const handleQuoteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" className="bg-zinc-50 py-24 border-b border-zinc-200">
      <ScrollReveal>
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16 px-6">
          <span className="text-sm font-bold tracking-widest uppercase text-primary block mb-3">
            What We Do
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900">
            Professional Auto Repair & Muffler Services
          </h2>
          <p className="mt-4 text-base text-zinc-600 font-medium">
            From specialized custom exhaust systems to complete automotive mechanical diagnostics.
          </p>
        </div>

        {/* 6 Core Services Grid */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {primaryServices.map((service) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                className="bg-white border border-zinc-200 rounded-xl p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex size-12 items-center justify-center rounded-lg bg-red-50 text-primary mb-6">
                    <IconComponent className="size-6" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 mb-3">{service.title}</h3>
                  <p className="text-sm text-zinc-600 leading-relaxed mb-6 font-medium">
                    {service.description}
                  </p>
                </div>

                <div className="border-t border-zinc-100 pt-4 flex items-center justify-between">
                  <a
                    href="#contact"
                    onClick={handleQuoteClick}
                    className="text-sm font-bold text-primary hover:text-red-700 transition-colors focus-visible:outline-2 focus-visible:outline-primary rounded"
                  >
                    {service.ctaText} →
                  </a>
                  <a
                    href={businessConfig.phone.link}
                    className="text-xs text-zinc-500 hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary rounded"
                  >
                    Call Shop
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Secondary Services Disclosure */}
        <div className="mt-16 text-center px-6">
          <button
            onClick={() => setShowSecondary(!showSecondary)}
            className="inline-flex items-center gap-2 rounded-md border border-zinc-300 bg-white hover:bg-zinc-50 px-5 py-2.5 text-sm font-bold text-zinc-700 shadow-sm transition-colors focus-visible:outline-2 focus-visible:outline-primary"
            aria-expanded={showSecondary}
            aria-controls="secondary-services-list"
          >
            {showSecondary ? "Hide Additional Services" : "Show Additional Services"}
            <svg
              className={`size-4 text-zinc-500 transition-transform ${showSecondary ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>

          {showSecondary && (
            <div
              id="secondary-services-list"
              className="mt-8 mx-auto max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 bg-white border border-zinc-200 rounded-xl p-8 shadow-sm text-left animate-fade-in"
            >
              {secondaryServices.map((s, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-sm text-zinc-700 font-semibold"
                >
                  <span className="text-primary text-base font-bold">✓</span> {s}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA Block */}
        <div className="mt-16 text-center max-w-xl mx-auto px-6">
          <p className="text-zinc-600 font-semibold mb-4 text-sm">
            Need a repair or service not listed? Speak with our mechanics.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <a
              href="#contact"
              onClick={handleQuoteClick}
              className="rounded-md bg-primary hover:bg-red-700 px-5 py-3 text-sm font-bold text-white shadow-sm transition-colors text-center focus-visible:outline-2 focus-visible:outline-primary"
            >
              Get a Free Quote
            </a>
            <a
              href={businessConfig.phone.link}
              className="rounded-md bg-white border border-zinc-300 hover:bg-zinc-50 text-zinc-700 px-5 py-3 text-sm font-bold shadow-sm transition-colors text-center focus-visible:outline-2 focus-visible:outline-primary"
            >
              Call {businessConfig.phone.display}
            </a>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
