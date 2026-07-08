import React from "react";
import { ScrollReveal } from "./ScrollReveal";

const cardsData = [
  {
    eyebrow: "COMMERCIAL",
    title: "Commercial Electrical",
    subtitle: "Tenant improvements, new builds, and switchgear — done to code and inspection-ready so your business stays powered and compliant.",
    photo: "/photos/commercial-switchgear-panel.webp",
  },
  {
    eyebrow: "PANEL UPGRADES",
    title: "Panel & Service Upgrades",
    subtitle: "Modern, code-compliant panels that keep your home safe, add capacity, and pass inspection the first time.",
    photo: "/photos/residential-panel-upgrade-exterior.webp",
  },
  {
    eyebrow: "GENERATORS",
    title: "Generator Installations",
    subtitle: "Standby and portable generators sized and wired to code — so the power stays on when the grid goes down.",
    photo: "/photos/commercial-generac-generator-install.webp",
  },
  {
    eyebrow: "RESIDENTIAL",
    title: "Residential Wiring & Lighting",
    subtitle: "New construction, rewires, and recessed lighting — clean, reliable work that makes your home safer and brighter.",
    photo: "/photos/residential-kitchen-recessed-lighting.webp",
  },
];

const alsoOffered = [
  "EV Charger Installation",
  "Lighting Installation",
  "Outlet & Switch Repair",
  "Emergency Repairs",
  "Temporary Power Connections",
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
          <span className="text-sm font-semibold tracking-wider uppercase text-orange-400 block mb-2">
            Our Services
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Comprehensive Electrical Solutions
          </h2>
        </div>

        {/* 2×2 card grid */}
        <div className="service-card-grid">
          {cardsData.map((card, idx) => (
            <div
              key={idx}
              className="service-card transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/40 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              style={{ backgroundImage: `url('${card.photo}')` }}
            >
              {/* Top-left: eyebrow + title + subtitle */}
              <div>
                <span className="text-xs font-bold tracking-widest uppercase text-orange-400 block mb-1.5">
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
              <div className="flex flex-col sm:flex-row gap-2.5 mt-4">
                <a
                  href="#contact"
                  onClick={handleQuoteClick}
                  className="rounded-full bg-orange-500 hover:bg-orange-400 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:scale-105 active:scale-95 text-center"
                >
                  Get a Free Quote
                </a>
                <a
                  href="tel:+18589979251"
                  className="rounded-full bg-transparent hover:bg-white hover:text-gray-900 border border-white px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:scale-105 active:scale-95 text-center"
                >
                  Call (858) 997-9251
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
