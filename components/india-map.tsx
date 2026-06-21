"use client";

import { useState } from "react";
import { useInView } from "@/hooks/useAnimations";

interface Destination {
  name: string;
  top: string;
  left: string;
}

const destinations: Destination[] = [
  { name: "Leh / Ladakh",       top: "5%",  left: "28%" },
  { name: "Uttarakhand",        top: "18%", left: "30%" },
  { name: "Jaipur",             top: "32%", left: "22%" },
  { name: "Delhi",              top: "22%", left: "32%" },
  { name: "Kolkata",            top: "38%", left: "62%" },
  { name: "Assam / Guwahati",   top: "28%", left: "72%" },
  { name: "Meghalaya",          top: "35%", left: "74%" },
  { name: "Bhutan",             top: "22%", left: "76%" },
  { name: "Mumbai",             top: "52%", left: "20%" },
  { name: "Goa",                top: "62%", left: "22%" },
  { name: "Kerala",             top: "75%", left: "25%" },
  { name: "Andaman",            top: "65%", left: "75%" },
];

function DestinationPin({ d }: { d: Destination }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="absolute flex flex-col items-center"
      style={{ top: d.top, left: d.left, transform: "translate(-50%, 0)" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Tooltip */}
      {hovered && (
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-brand-gold text-brand-evergreen text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap shadow-xl z-10">
          {d.name} Packages &rarr;
        </div>
      )}

      {/* Outer pulse ring */}
      <span className="relative flex items-center justify-center">
        <span className="absolute w-5 h-5 rounded-full bg-brand-gold/30 animate-ping" />
        <span className="w-3 h-3 rounded-full bg-brand-gold animate-pulse relative z-10" />
      </span>

      {/* Label */}
      <span className="text-white/80 text-[10px] font-semibold whitespace-nowrap mt-1 text-center leading-tight max-w-[80px]">
        {d.name}
      </span>
    </div>
  );
}

const countBadges = [
  { label: "Northeast India", count: "6 destinations", color: "bg-brand-gold/20 border-brand-gold/40 text-brand-gold" },
  { label: "Pan India",       count: "8 destinations", color: "bg-white/10 border-white/20 text-white/80" },
  { label: "International",   count: "10+ destinations", color: "bg-brand-red/20 border-brand-red/30 text-brand-red/90" },
];

export default function IndiaMap() {
  const [ref, inView] = useInView({ threshold: 0.12 });

  return (
    <section className="py-20 md:py-28 bg-brand-floral">
      <div
        ref={ref}
        className={`max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-700 ${
          inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block text-brand-gold text-xs font-semibold uppercase tracking-[0.2em] mb-3">
            Our Coverage
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-brand-evergreen">
            Destinations Across India
          </h2>
        </div>

        {/* Map Backdrop */}
        <div
          className="relative rounded-3xl overflow-hidden bg-brand-evergreen/95 mx-auto max-w-4xl"
          style={{ aspectRatio: "4/3" }}
        >
          {/* Grid lines */}
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(rgba(212,175,55,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(212,175,55,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"
          />

          {/* Subtle vignette */}
          <div
            aria-hidden
            className="absolute inset-0 bg-radial-[ellipse_at_center] from-transparent to-black/40 pointer-events-none"
          />

          {/* India silhouette hint — decorative border glow */}
          <div
            aria-hidden
            className="absolute inset-8 rounded-2xl border border-brand-gold/10 pointer-events-none"
          />

          {/* Destination pins */}
          {destinations.map((d) => (
            <DestinationPin key={d.name} d={d} />
          ))}

          {/* Corner label */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse" />
            <span className="text-white/40 text-[10px] font-medium uppercase tracking-widest">
              Interactive Map
            </span>
          </div>
        </div>

        {/* Count badges row */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {countBadges.map((b) => (
            <div
              key={b.label}
              className={`flex items-center gap-2 border rounded-full px-5 py-2.5 text-sm font-semibold ${b.color}`}
            >
              <span className="opacity-70 font-normal">{b.label}:</span>
              <span>{b.count}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
