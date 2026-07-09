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
    <div id="services" className="service-card-section bg-gray-50 dark:bg-gray-950/40 border-y border-gray-200 dark:border-white/5">
      <ScrollReveal>
        {/* Section header */}
        <div className="service-card-section-header">
          <span className="text-sm font-semibold tracking-wider uppercase text-red-650 dark:text-red-400 block mb-2">
            Our Services
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Complete Auto & Muffler Service
          </h2>
        </div>

        {/* 2×2 card grid */}
        <div className="service-card-grid items-stretch">
          {cardsData.map((card, idx) => (
            <div
              key={idx}
              className="service-card flex flex-col bg-white dark:bg-zinc-900 border border-gray-200 dark:border-white/10 rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
            >
              {/* Shrunk Photo Banner Strip */}
              <div className="relative w-full aspect-[16/9] mb-6 rounded-xl overflow-hidden bg-gradient-to-r from-gray-100 to-gray-200 dark:from-zinc-800 dark:to-zinc-900 border border-gray-200/50 dark:border-white/5 flex flex-col items-center justify-center p-4">
                <span className="text-gray-400 dark:text-gray-500 text-[10px] sm:text-xs font-semibold tracking-wider uppercase mb-1">
                  Photo coming soon
                </span>
                <span className="text-gray-300 dark:text-gray-600 text-[8px] sm:text-[10px] max-w-[150px] text-center">
                  {card.title}
                </span>
              </div>

              {/* Eyebrow Label */}
              <span className="text-xs font-bold tracking-widest uppercase text-red-650 dark:text-red-400 block mb-2">
                {card.eyebrow}
              </span>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-bold mb-3 leading-tight text-gray-900 dark:text-white">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed mb-6 flex-grow">
                {card.subtitle}
              </p>

              {/* Button Row */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href="#contact"
                  onClick={handleQuoteClick}
                  className="flex-1 rounded-full bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-400 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-center shadow-sm whitespace-nowrap"
                >
                  Get a Free Quote
                </a>
                <a
                  href="tel:+17148264444"
                  className="flex-1 rounded-full bg-transparent hover:bg-gray-100 border border-gray-300 text-gray-700 dark:text-gray-300 dark:border-white/20 dark:hover:bg-white/5 px-5 py-2.5 text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-center whitespace-nowrap"
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
