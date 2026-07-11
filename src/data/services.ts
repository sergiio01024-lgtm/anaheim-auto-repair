import { Wind, Disc, Settings, Wrench, Gauge, Activity, LucideIcon } from "lucide-react";

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  ctaText: string;
}

export const primaryServices: ServiceItem[] = [
  {
    id: "muffler-exhaust",
    title: "Muffler & Exhaust Repair",
    description:
      "Muffler replacement, custom pipe bending, and exhaust leak repairs. Our core specialty for over 45 years.",
    icon: Wind,
    ctaText: "Exhaust Quote",
  },
  {
    id: "catalytic-converters",
    title: "Catalytic Converters",
    description:
      "Yelp-verified catalytic converter replacement, theft-prevention shield installations, and smog diagnostics.",
    icon: Activity,
    ctaText: "Converter Quote",
  },
  {
    id: "brakes-suspension",
    title: "Brakes & Suspension",
    description:
      "Brake pads, rotors, calipers, shock absorbers, struts, and steering linkages for a smooth, safe ride.",
    icon: Disc,
    ctaText: "Brake Quote",
  },
  {
    id: "engine-diagnostics",
    title: "Engine Diagnostics & Repair",
    description:
      "Precise check-engine light diagnostics, spark plugs, timing belts, and major mechanical repair work.",
    icon: Gauge,
    ctaText: "Engine Quote",
  },
  {
    id: "transmission-service",
    title: "Transmission Service & Repair",
    description:
      "Transmission fluid flushes, clutch repairs, and rebuilds to ensure reliable gear shifting and power transfer.",
    icon: Settings,
    ctaText: "Transmission Quote",
  },
  {
    id: "routine-maintenance",
    title: "Routine Maintenance & Oil Changes",
    description:
      "Oil and filter changes, fluid checks, 30k/60k/90k mileage checkups, and general preventative care.",
    icon: Wrench,
    ctaText: "Book Maintenance",
  },
];

export const secondaryServices = [
  "Wheel Alignment",
  "Tire Rotation & Balancing",
  "Battery Replacement & Testing",
  "AC Recharge & Heating Repair",
  "Radiators & Water Pumps",
  "CV Boots & Axles",
  "Timing Belt Replacement",
  "Ignition System Tune-Ups",
  "Fuel System Cleaning",
  "Smog Check Preparation",
  "Starter & Alternator Repair",
  "Belt & Hose Replacements",
];

export const footerServices = [
  "Muffler & Exhaust",
  "Catalytic Converters",
  "Brakes & Suspension",
  "Engine Diagnostics",
  "Transmission Service",
  "Routine Maintenance",
];
