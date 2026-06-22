"use client";

import { Star } from "lucide-react";
import { useInView } from "@/hooks/useAnimations";
import { InitialsAvatar } from "./reviews-marquee";

const testimonials = [
  {
    id: 1, name: "Rahul Sharma", tour: "Magical Meghalaya Explorer",
    review: "An absolute dream vacation! Everything from living root bridges to Nohkalikai Falls was perfectly timed. The guide was knowledgeable and the hotel spotless. TeaCountryHolidays sets a benchmark for Northeast India travel.",
  },
  {
    id: 2, name: "Priya Desai", tour: "Maldives Honeymoon Special",
    review: "Our honeymoon in Maldives was magical beyond words. The overwater villa, private sunset dinner, and every tiny detail was planned to perfection. We didn't have to worry about a single thing.",
  },
  {
    id: 3, name: "Amit Patel", tour: "Dubai Glitz & Glamour",
    review: "Exceptional service from first enquiry to return. Visa, hotel, desert safari, Burj Khalifa — all handled flawlessly. Pricing was transparent. Will definitely trust TeaCountryHolidays for our next trip.",
  },
];

export default function Testimonials() {
  const [ref, visible] = useInView();

  return (
    <section className="py-20 md:py-28 bg-brand-varden overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <span
            className="text-brand-red font-bold text-sm tracking-[0.2em] uppercase block mb-3 opacity-0"
            style={{ animation: visible ? "fadeSlideUp 0.7s ease forwards 0s" : "none" }}
          >
            Customer Stories
          </span>
          <h2
            className="font-serif text-4xl md:text-5xl font-bold text-brand-evergreen opacity-0"
            style={{ animation: visible ? "fadeSlideUp 0.7s ease forwards 0.12s" : "none" }}
          >
            What Our Travellers Say
          </h2>
          <div
            className="w-24 h-[3px] bg-gradient-to-r from-transparent via-brand-gold to-transparent mx-auto mt-6 opacity-0 scale-x-0 origin-center"
            style={{ animation: visible ? "growLine 0.6s ease forwards 0.3s" : "none" }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={t.id}
              className="relative bg-brand-floral p-8 rounded-2xl flex flex-col border border-brand-gold/10
                hover:border-brand-gold/40 hover:shadow-2xl hover:-translate-y-2
                transition-all duration-500 opacity-0 cursor-default group"
              style={{
                animation: visible ? `fadeSlideUp 0.65s ease forwards ${0.15 + i * 0.12}s` : "none",
              }}
            >
              {/* Watermark quote */}
              <span className="absolute top-0 right-5 font-serif text-[140px] leading-none text-brand-evergreen/[0.04] select-none pointer-events-none group-hover:text-brand-gold/[0.06] transition-colors duration-500">
                "
              </span>

              <div className="flex gap-1 mb-5 relative z-10">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-brand-ink/75 italic text-base leading-relaxed mb-6 flex-grow relative z-10">
                "{t.review}"
              </p>

              <div className="flex items-center gap-4 pt-5 border-t border-brand-gold/10 relative z-10">
                <InitialsAvatar name={t.name} />
                <div>
                  <span className="font-bold text-brand-evergreen block">{t.name}</span>
                  <span className="text-brand-gold text-xs font-medium">{t.tour}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeSlideUp { from { opacity:0; transform:translateY(32px); } to { opacity:1; transform:translateY(0); } }
        @keyframes growLine { from { opacity:0; transform:scaleX(0); } to { opacity:1; transform:scaleX(1); } }
      ` }} />
    </section>
  );
}
