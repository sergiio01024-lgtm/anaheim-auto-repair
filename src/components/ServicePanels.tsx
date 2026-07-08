import React from "react";
import { ScrollReveal } from "./ScrollReveal";

const cardsData = [
  {
    eyebrow: "MUFFLER & EXHAUST",
    title: "Muffler & Exhaust Repair",
    subtitle: "Muffler replacement, catalytic converters, and full exhaust work — our specialty for over 45 years. We fix the rattle, the roar, and the check-engine light.",
    photo: "/photos/placeholder.jpg",
  },
  {
    eyebrow: "BRAKES & SUSPENSION",
    title: "Brakes & Suspension",
    subtitle: "Brake pads, rotors, shocks, struts, alignment, and steering. Stop safely and ride smooth — inspected and done right the first time.",
    photo: "/photos/placeholder.jpg",
  },
  {
    eyebrow: "ENGINE & TRANSMISSION",
    title: "Engine & Transmission",
    subtitle: "Check-engine diagnostics, timing belts, transmission service and rebuilds, and major engine repair. The hard jobs other shops send away.",
    photo: "/photos/placeholder.jpg",
  },
  {
    eyebrow: "MAINTENANCE",
    title: "Oil Changes & Maintenance",
    subtitle: "Oil and filter changes, 30k/60k/90k service, AC recharge, batteries, and tune-ups. Keep your car running and avoid the big repairs.",
    photo: "/photos/placeholder.jpg",
  },
];

const alsoOffered = [
  "AC & Heating Repair",
  "Alignment",
  "Tires & Rotation",
  "Check Engine Diagnostics",
  "Smog Check Prep",
];

export function ServicePanels() {
  const handleQuoteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div id="services" className="service-card-section">
      <ScrollReveal>
        {/* Section header */}
        <div className="service-card-section-header">
          <span className="text-sm font-semibold tracking-wider uppercase text-red-400 block mb-2">
            Our Services
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Complete Auto & Muffler Service
          </h2>
        </div>

        {/* 2×2 card grid */}
        <div className="service-card-grid">
          {cardsData.map((card, idx) => (
            <div
              key={idx}
              className="service-card transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              style={{ backgroundColor: idx % 2 === 0 ? "#1C1C1C" : "#222222" }}
            >
              {/* Centered Placeholder Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0">
                <span className="text-white/20 text-xs font-semibold tracking-wider uppercase mb-1">Photo coming soon</span>
                <span className="text-white/10 text-[10px] max-w-[150px] text-center">{card.title}</span>
              </div>

              {/* Top-left: eyebrow + title + subtitle */}
              <div className="z-10">
                <span className="text-xs font-bold tracking-widest uppercase text-red-400 block mb-1.5">
                  {card.eyebrow}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold mb-2 leading-tight">
                  {card.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-200 leading-relaxed max-w-xs">
                  {card.subtitle}
                </p>
              </div>

              {/* Bottom-left: buttons */}
              <div className="flex flex-col sm:flex-row gap-2.5 mt-4 z-10">
                <a
                  href="#contact"
                  onClick={handleQuoteClick}
                  className="rounded-full bg-red-500 hover:bg-red-400 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:scale-105 active:scale-95 text-center"
                >
                  Get a Free Quote
                </a>
                <a
                  href="tel:+17148264444"
                  className="rounded-full bg-transparent hover:bg-white hover:text-gray-900 border border-white px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:scale-105 active:scale-95 text-center"
                >
                  Call (714) 826-4444
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Also-offered compact list */}
        <div className="also-offered">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <span className="font-medium text-gray-700 dark:text-gray-300">Also offered: </span>
            {alsoOffered.map((service, i) => (
              <span key={i}>
                {service}
                {i < alsoOffered.length - 1 && (
                  <span className="mx-2 text-gray-300 dark:text-gray-600">·</span>
                )}
              </span>
            ))}
          </p>
        </div>
      </ScrollReveal>
    </div>
  );
}
