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
  CircleDot,
  LucideIcon,
} from "lucide-react";

export interface ServiceCard {
  eyebrow: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
}

export interface FullService {
  name: string;
  icon: LucideIcon;
}

export const cardsData: ServiceCard[] = [
  {
    eyebrow: "MUFFLER & EXHAUST",
    title: "Muffler & Exhaust Repair",
    subtitle:
      "Muffler replacement, catalytic converters, and full exhaust work — our specialty for over 45 years. We fix the rattle, the roar, and the check-engine light.",
    icon: Wind,
  },
  {
    eyebrow: "BRAKES & SUSPENSION",
    title: "Brakes & Suspension",
    subtitle:
      "Brake pads, rotors, shocks, struts, alignment, and steering. Stop safely and ride smooth — inspected and done right the first time.",
    icon: Disc,
  },
  {
    eyebrow: "ENGINE & TRANSMISSION",
    title: "Engine & Transmission",
    subtitle:
      "Check-engine diagnostics, timing belts, transmission service and rebuilds, and major engine repair. The hard jobs other shops send away.",
    icon: Settings,
  },
  {
    eyebrow: "MAINTENANCE",
    title: "Oil Changes & Maintenance",
    subtitle:
      "Oil and filter changes, 30k/60k/90k service, AC recharge, batteries, and tune-ups. Keep your car running and avoid the big repairs.",
    icon: Wrench,
  },
];

export const fullServices: FullService[] = [
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
  { name: "Wheel Balancing", icon: Disc },
];

export const footerServices: string[] = [
  "Muffler & Exhaust",
  "Brakes & Suspension",
  "Engine Repair",
  "Transmission Service",
  "Oil Changes",
  "AC & Heating Repair",
  "Check Engine Diagnostics",
  "Tune-Ups",
  "Alignment",
  "Batteries",
  "Catalytic Converters",
  "Smog Check Prep",
];
