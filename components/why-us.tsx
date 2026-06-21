"use client";

import { PlaneTakeoff, Star, Map, HeartHandshake } from "lucide-react";
import { useInView, useCounter } from "@/hooks/useAnimations";

const stats = [
  { icon: PlaneTakeoff, value: 500, suffix: "+", label: "Tours Crafted" },
  { icon: Star,          value: 4.9, suffix: "",  label: "Google Rating", isFloat: true },
  { icon: Map,           value: 15,  suffix: "+", label: "Destinations" },
  { icon: HeartHandshake,value: 10,  suffix: "",  label: "Years Experience" },
];

function StatBlock({
  icon: Icon, value, suffix, label, isFloat, trigger, delay,
}: {
  icon: React.ElementType; value: number; suffix: string; label: string;
  isFloat?: boolean; trigger: boolean; delay: number;
}) {
  const count = useCounter(isFloat ? Math.round(value * 10) : value, 1800, trigger);
  const display = isFloat ? (count / 10).toFixed(1) : count;

  return (
    <div
      className="flex flex-col items-center text-center px-6 py-4 opacity-0"
      style={{
        animation: trigger ? `fadeSlideUp 0.7s ease forwards ${delay}s` : "none",
      }}
    >
      <div className="w-16 h-16 rounded-full bg-brand-gold/10 border border-brand-gold/25 flex items-center justify-center mb-5 group-hover:bg-brand-gold/20 transition-colors">
        <Icon className="w-7 h-7 text-brand-gold" strokeWidth={1.5} />
      </div>
      <span className="font-serif text-5xl md:text-6xl font-bold text-white block mb-1">
        {display}{suffix}
      </span>
      <span className="text-white/50 text-xs uppercase tracking-[0.2em] font-medium mt-1">
        {label}
      </span>
    </div>
  );
}

export default function WhyUs() {
  const [ref, isVisible] = useInView();

  return (
    <section className="bg-brand-evergreen py-20 md:py-24 relative z-10 overflow-hidden" ref={ref}>
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section label */}
        <div
          className="text-center mb-14 opacity-0"
          style={{ animation: isVisible ? "fadeSlideUp 0.7s ease forwards 0s" : "none" }}
        >
          <span className="text-brand-gold/60 font-bold text-xs tracking-[0.25em] uppercase">Why Choose Us</span>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mt-2">
            Numbers That Speak For Themselves
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 md:divide-x md:divide-brand-gold/15">
          {stats.map((s, i) => (
            <StatBlock key={s.label} {...s} trigger={isVisible} delay={0.15 + i * 0.12} />
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </section>
  );
}
