import React from "react";
import { ScrollReveal } from "./ScrollReveal";
import { 
  Wind, 
  Disc, 
  Settings, 
  Wrench, 
  Droplet, 
  Gauge, 
  Thermometer, 
  Battery, 
  Zap, 
  CircleDot 
} from "lucide-react";

const cardsData = [
  {
    eyebrow: "MUFFLER & EXHAUST",
    title: "Muffler & Exhaust Repair",
    subtitle: "Muffler replacement, catalytic converters, and full exhaust work — our specialty for over 45 years. We fix the rattle, the roar, and the check-engine light.",
    photo: "/photos/placeholder.jpg",
    icon: Wind,
  },
  {
    eyebrow: "BRAKES & SUSPENSION",
    title: "Brakes & Suspension",
    subtitle: "Brake pads, rotors, shocks, struts, alignment, and steering. Stop safely and ride smooth — inspected and done right the first time.",
    photo: "/photos/placeholder.jpg",
    icon: Disc,
  },
  {
    eyebrow: "ENGINE & TRANSMISSION",
    title: "Engine & Transmission",
    subtitle: "Check-engine diagnostics, timing belts, transmission service and rebuilds, and major engine repair. The hard jobs other shops send away.",
    photo: "/photos/placeholder.jpg",
    icon: Settings,
  },
  {
    eyebrow: "MAINTENANCE",
    title: "Oil Changes & Maintenance",
    subtitle: "Oil and filter changes, 30k/60k/90k service, AC recharge, batteries, and tune-ups. Keep your car running and avoid the big repairs.",
    photo: "/photos/placeholder.jpg",
    icon: Wrench,
  },
];

const fullServices = [
  { name: "Muffler & Exhaust", icon: Wind },
  { name: "Catalytic Converters", icon: Wind },
  { name: "Brake Repair", icon: Disc },
  { name: "Suspension & Struts", icon: CircleDot },
  { name: "Engine Repair", icon: Settings },
  { name: "Transmission Service", icon: Settings },
  { name: "Check Engine Diagnostics", icon: Gauge },
  { name: "Oil Changes", icon: Droplet },
  { name: "30k/60k/90k Service", icon: Wrench },
  { name: "AC & Heating Repair", icon: Thermometer },
  { name: "Alignment", icon: Settings },
  { name: "Tires & Rotation", icon: Disc },
  { name: "Batteries & Starting", icon: Battery },
  { name: "Radiators & Water Pumps", icon: Droplet },
  { name: "CV Boots & Axles", icon: Wrench },
  { name: "Timing Belts", icon: Settings },
  { name: "Tune-Ups", icon: Zap },
  { name: "Fuel System Cleaning", icon: Droplet },
  { name: "Smog Check Prep", icon: Gauge },
  { name: "Wheel Balancing", icon: Disc }
];

export function ServicePanels() {
  const handleQuoteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div id="services" className="service-card-section bg-gray-50 dark:bg-gray-950/40 border-y border-gray-200 dark:border-white/5 animate-fade-in">
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
          {cardsData.map((card, idx) => {
            const CardIcon = card.icon;
            return (
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

                {/* Eyebrow Label & Icon */}
                <div className="flex items-start justify-between gap-4 mb-2">
                  <span className="text-xs font-bold tracking-widest uppercase text-red-650 dark:text-red-400 block pt-1">
                    {card.eyebrow}
                  </span>
                  <div className="flex size-10 items-center justify-center rounded-lg bg-red-50 dark:bg-red-950/20 text-red-650 dark:text-red-400 shrink-0">
                    <CardIcon className="size-5" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold mb-3 leading-tight text-gray-900 dark:text-white">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                  {card.subtitle}
                </p>
              </div>
            );
          })}
        </div>

        {/* Shared CTA Block */}
        <div className="mt-12 text-center max-w-xl mx-auto flex flex-col items-center">
          <p className="text-gray-600 dark:text-gray-300 font-medium mb-4 text-sm sm:text-base">
            Not sure what you need? Tell us and we'll give you a free quote.
          </p>
          <div className="flex flex-row gap-3">
            <a
              href="#contact"
              onClick={handleQuoteClick}
              className="rounded-full bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-400 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-center shadow-sm"
            >
              Get a Free Quote
            </a>
            <a
              href="tel:+17148264444"
              className="rounded-full bg-transparent hover:bg-gray-100 dark:hover:bg-white/5 border border-gray-300 dark:border-white/20 text-gray-700 dark:text-gray-300 px-6 py-3 text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] text-center"
            >
              Call (714) 826-4444
            </a>
          </div>
        </div>

        {/* Full Service List Grid */}
        <div className="mt-24 pt-16 border-t border-gray-200 dark:border-white/5">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
              Everything We Do
            </h3>
            <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
              From a quick oil change to a full engine rebuild — one shop for all of it.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {fullServices.map((service, i) => {
              const ServiceIcon = service.icon;
              return (
                <div 
                  key={i} 
                  className="flex items-center gap-3 bg-white dark:bg-zinc-900/50 border border-gray-200 dark:border-white/5 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
                >
                  <div className="flex size-9 items-center justify-center rounded-lg bg-red-50 dark:bg-red-950/20 text-red-655 dark:text-red-400 shrink-0">
                    <ServiceIcon className="size-4" />
                  </div>
                  <span className="text-sm font-medium text-gray-950 dark:text-gray-200">
                    {service.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
