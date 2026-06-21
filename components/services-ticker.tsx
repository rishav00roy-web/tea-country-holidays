"use client";

import { PlaneTakeoff, Hotel, FileCheck, Anchor, Car, Globe } from "lucide-react";

const services = [
  { icon: PlaneTakeoff, label: "Flight Booking" },
  { icon: Hotel,        label: "Hotel Reservations" },
  { icon: FileCheck,    label: "Visa Assistance" },
  { icon: Anchor,       label: "Cruises" },
  { icon: Car,          label: "Transfers" },
  { icon: Globe,        label: "Tour Packages" },
  { icon: PlaneTakeoff, label: "Flight Booking" },
  { icon: Hotel,        label: "Hotel Reservations" },
  { icon: FileCheck,    label: "Visa Assistance" },
  { icon: Anchor,       label: "Cruises" },
  { icon: Car,          label: "Transfers" },
  { icon: Globe,        label: "Tour Packages" },
];

export default function ServicesTicker() {
  return (
    <div className="bg-brand-evergreen border-y border-brand-gold/20 py-4 overflow-hidden select-none">
      <div className="marquee-track">
        {services.map(({ icon: Icon, label }, i) => (
          <div
            key={i}
            className="flex items-center gap-3 px-8 text-white/70 hover:text-brand-gold transition-colors cursor-default group shrink-0"
          >
            <Icon className="w-5 h-5 text-brand-gold/70 group-hover:text-brand-gold transition-colors" strokeWidth={1.5} />
            <span className="text-sm font-semibold uppercase tracking-widest whitespace-nowrap">{label}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold/30 ml-4 group-hover:bg-brand-gold transition-colors" />
          </div>
        ))}
      </div>
    </div>
  );
}
