import React, { useState } from "react";
import { ScrollReveal } from "./ScrollReveal";
import { secondaryServices } from "../data/services";
import { businessConfig } from "../config/business";
import { trackEvent } from "../utils/analytics";

const pathMap: Record<string, string> = {
  "muffler-exhaust": "/muffler-repair-anaheim",
  "catalytic-converters": "/catalytic-converter-anaheim",
  "brakes-suspension": "/brake-repair-anaheim",
  "engine-diagnostics": "/engine-repair-anaheim",
  "transmission-service": "/transmission-repair-anaheim",
  "routine-maintenance": "/auto-maintenance-anaheim",
};

interface ServiceModule {
  number: string;
  id: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
  imageAlt: string;
}

const serviceModules: ServiceModule[] = [
  {
    number: "01",
    id: "muffler-exhaust",
    title: "Muffler & Exhaust",
    description:
      "Muffler replacement, exhaust pipe fitting, catalytic converter installation, custom exhaust systems, and leak repair. Our core specialty since 1978.",
    tags: ["Mufflers", "Exhaust Pipes", "Catalytic Converters", "Custom Exhaust", "Leak Repair"],
    image: "/images/exhaust-pipes.webp",
    imageAlt: "Custom exhaust piping work under vehicle",
  },
  {
    number: "02",
    id: "brakes-suspension",
    title: "Brakes, Suspension & Alignment",
    description:
      "Brake pads, rotors, calipers, shock absorbers, struts, steering linkages, and computerized wheel alignment for a smooth, safe ride.",
    tags: ["Brake Pads & Rotors", "Calipers", "Shocks & Struts", "Wheel Alignment", "Steering"],
    image: "/images/brake-work.webp",
    imageAlt: "Mechanic replacing brake rotor and caliper",
  },
  {
    number: "03",
    id: "engine-diagnostics",
    title: "Engine & Transmission",
    description:
      "Check-engine diagnostics, spark plugs, timing belts, transmission fluid flushes, clutch repairs, and major mechanical work.",
    tags: ["Engine Diagnostics", "Spark Plugs", "Timing Belts", "Transmission", "Clutch Repair"],
    image: "/images/engine-work.webp",
    imageAlt: "Mechanic performing engine diagnostics and tune-up",
  },
  {
    number: "04",
    id: "routine-maintenance",
    title: "Maintenance & Diagnostics",
    description:
      "Oil and filter changes, fluid checks, 30k/60k/90k mileage service, AC recharge, battery testing, and general preventative care.",
    tags: ["Oil Changes", "Fluid Service", "AC Recharge", "Batteries", "Tune-Ups"],
    image: "/images/tire-alignment.webp",
    imageAlt: "Computerized wheel alignment system in use",
  },
];

export function ServicePanels() {
  const [showSecondary, setShowSecondary] = useState(false);

  const handleServiceClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const path = pathMap[id] || "/";
    trackEvent({ type: "estimate_cta_click", label: `View Service: ${id}` });
    window.history.pushState({}, "", path);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  const handleSecondaryClick = () => {
    setShowSecondary(!showSecondary);
    trackEvent({
      type: "estimate_cta_click",
      label: showSecondary ? "Hide Secondary Services" : "Show Secondary Services",
    });
  };

  return (
    <section id="services" className="bg-[#F1F2F2] py-20 sm:py-24">
      <ScrollReveal>
        {/* Section Header */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-14 sm:mb-16">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C8202F] block mb-3">
              What We Do
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#16191D] tracking-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Professional Auto Repair & Muffler Services
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#606770] leading-relaxed">
              From specialized custom exhaust systems to complete automotive diagnostics.
            </p>
          </div>
        </div>

        {/* Service Modules */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {serviceModules.map((service) => {
              const path = pathMap[service.id] || "/";
              return (
                <div
                  key={service.id}
                  className="group relative rounded-2xl overflow-hidden bg-white border border-[#DDE0E3] hover:border-[#C9CDD2] shadow-[0_8px_24px_rgba(22,25,29,0.07)] transition-all"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-5">
                    {/* Image */}
                    <div className="sm:col-span-2 relative overflow-hidden">
                      <div className="aspect-[4/3] sm:aspect-auto sm:h-full">
                        <img
                          src={service.image}
                          alt={service.imageAlt}
                          className="img-cover transition-transform duration-300 group-hover:scale-[1.03]"
                          loading="lazy"
                        />
                      </div>
                      {/* Number Badge */}
                      <div className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded bg-black/60 backdrop-blur-sm">
                        <span className="text-xs font-mono font-semibold text-white">{service.number}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="sm:col-span-3 p-6 sm:p-7 flex flex-col justify-between">
                      <div>
                        <h3
                          className="text-xl sm:text-2xl font-bold text-[#16191D] mb-2.5"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {service.title}
                        </h3>
                        <p className="text-base text-[#606770] leading-relaxed mb-4.5">
                          {service.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-5">
                          {service.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-block px-3 py-1 rounded-md text-xs font-medium text-[#606770] bg-[#F6F6F3] border border-[#DDE0E3]"
                              style={{ fontFamily: "var(--font-mono)" }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between border-t border-[#DDE0E3] pt-4 min-h-[44px]">
                        <a
                          href={path}
                          onClick={(e) => handleServiceClick(e, service.id)}
                          className="text-base font-semibold text-[#C8202F] hover:text-[#AE1D2A] transition-colors focus-visible:outline-2 focus-visible:outline-[#C8202F] rounded py-1"
                        >
                          View Details →
                        </a>
                        <a
                          href={businessConfig.phone.link}
                          onClick={() =>
                            trackEvent({
                              type: "phone_click",
                              displayPhone: businessConfig.phone.display,
                            })
                          }
                          className="text-xs font-semibold text-[#606770] hover:text-[#16191D] transition-colors focus-visible:outline-2 focus-visible:outline-[#C8202F] rounded py-1 uppercase tracking-wider"
                          style={{ fontFamily: "var(--font-mono)" }}
                        >
                          Call Shop
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Secondary Services Disclosure */}
          <div className="mt-12 text-center">
            <button
              onClick={handleSecondaryClick}
              className="inline-flex items-center gap-2 rounded-lg border border-[#DDE0E3] bg-white hover:bg-[#F6F6F3] px-6 py-3 text-sm font-semibold text-[#16191D] transition-all shadow-sm focus-visible:outline-2 focus-visible:outline-[#C8202F]"
              aria-expanded={showSecondary}
              aria-controls="secondary-services-list"
            >
              {showSecondary ? "Hide Additional Services" : "Show Additional Services"}
              <svg
                className={`size-4 text-[#818891] transition-transform duration-200 ${showSecondary ? "rotate-180" : ""}`}
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
                className="mt-6 mx-auto max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 rounded-xl border border-[#DDE0E3] bg-white p-6 sm:p-8 text-left shadow-sm"
              >
                {secondaryServices.map((s, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-sm text-[#606770] font-medium">
                    <span className="text-[#C8202F] text-xs font-bold">✓</span> {s}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* CTA Block */}
          <div className="mt-12 text-center max-w-xl mx-auto">
            <p className="text-[#606770] font-medium mb-4 text-sm">
              Need a repair or service not listed? Speak with our mechanics.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="rounded-lg bg-[#C8202F] hover:bg-[#AE1D2A] px-6 py-3 text-sm font-semibold text-white transition-colors text-center shadow-sm focus-visible:outline-2 focus-visible:outline-[#C8202F]"
              >
                Request an Estimate
              </a>
              <a
                href={businessConfig.phone.link}
                onClick={() =>
                  trackEvent({ type: "phone_click", displayPhone: businessConfig.phone.display })
                }
                className="rounded-lg border border-[#DDE0E3] bg-white hover:bg-[#F6F6F3] text-[#16191D] px-6 py-3 text-sm font-semibold transition-all text-center shadow-sm focus-visible:outline-2 focus-visible:outline-[#C8202F]"
              >
                Call {businessConfig.phone.display}
              </a>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
