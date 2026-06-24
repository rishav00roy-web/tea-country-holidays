"use client";

import { useEffect, useRef } from "react";

const WHATSAPP_OFFER = "https://wa.me/918826048272?text=Hi%2C%20I%27d%20like%20to%20claim%20the%20Early%20Bird%20discount%20offer.";
const WHATSAPP_DEALS = "https://wa.me/918826048272?text=Hi%2C%20can%20you%20share%20your%20current%20holiday%20deals%20and%20offers%3F";

export default function OfferBanner() {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!bannerRef.current) return;
      const rect = bannerRef.current.getBoundingClientRect();
      const offset = (rect.top / window.innerHeight) * 30;
      bannerRef.current.style.setProperty("--parallax-offset", `${offset}px`);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={bannerRef}
      className="relative py-24 md:py-36 overflow-hidden"
    >
      {/* Parallax BG image — served as WebP via Unsplash auto-format */}
      <div
        className="absolute inset-[-40px] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1686472886489-1d2d7e08ff9c?w=1600&q=65&auto=format&fm=webp')",
          transform: "translateY(var(--parallax-offset, 0px))",
          transition: "transform 0.05s linear",
        }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-brand-evergreen/80" />
      {/* Gold tint */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-evergreen/60 via-transparent to-brand-evergreen/60" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto px-4">
        <span className="text-brand-gold font-bold text-xs tracking-[0.3em] uppercase block mb-4 animate-pulse">
          Limited Time Offer
        </span>
        <h2 className="font-serif text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
          Early Bird Discounts<br />
          <span className="text-brand-gold italic">Up to 25% Off</span>
        </h2>
        <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
          Book your dream holiday before{" "}
          <strong className="text-white">31st July 2026</strong> and unlock
          exclusive early-bird pricing, free travel insurance, and priority
          support.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={WHATSAPP_OFFER}
            target="_blank"
            rel="noopener noreferrer"
            className="px-9 py-4 bg-brand-gold hover:bg-amber-400 text-brand-evergreen font-bold rounded-full transition-all hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(212,175,55,0.4)] text-base relative overflow-hidden group inline-flex items-center justify-center"
          >
            <span className="relative z-10">Claim Offer Now</span>
            <span className="absolute inset-0 bg-white/20 translate-x-[-100%] skew-x-[-15deg] group-hover:translate-x-[120%] transition-transform duration-500" />
          </a>
          <a
            href={WHATSAPP_DEALS}
            target="_blank"
            rel="noopener noreferrer"
            className="px-9 py-4 border-2 border-white/40 hover:border-brand-gold hover:text-brand-gold text-white rounded-full font-semibold transition-all hover:-translate-y-1.5 text-base inline-flex items-center justify-center"
          >
            View All Deals
          </a>
        </div>
      </div>
    </section>
  );
}
