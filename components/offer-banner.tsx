"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

interface OfferBannerProps {
  // Sourced from site_settings via lib/site-settings.ts, passed down from
  // the server-rendered app/page.tsx — see item 4 in the handoff doc.
  whatsappNumber: string;
  bannerText: string;
  deadline: string; // ISO date string (yyyy-mm-dd), or "" for no deadline
}

function formatDeadline(deadline: string): string | null {
  if (!deadline) return null;
  const date = new Date(deadline);
  if (isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function isDeadlinePassed(deadline: string): boolean {
  if (!deadline) return false;
  const date = new Date(deadline);
  if (isNaN(date.getTime())) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}

export default function OfferBanner({ whatsappNumber, bannerText, deadline }: OfferBannerProps) {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const formattedDeadline = formatDeadline(deadline);
  const whatsappOfferUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hi, I'd like to claim the Early Bird discount offer."
  )}`;
  const whatsappDealsUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hi, can you share your current holiday deals and offers?"
  )}`;

  useEffect(() => {
    let ticking = false;

    const updatePosition = () => {
      // Reactive check for prefers-reduced-motion
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        if (parallaxRef.current) {
          parallaxRef.current.style.transform = 'none';
        }
        return;
      }

      if (parallaxRef.current) {
        const rect = parallaxRef.current.parentElement?.getBoundingClientRect();
        if (rect) {
          const offset = (rect.top / window.innerHeight) * 30;
          // Clamp translation to +/- 50px
          const clampedOffset = Math.max(-50, Math.min(50, offset));
          parallaxRef.current.style.transform = `translateY(${clampedOffset}px)`;
        }
      }
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updatePosition();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Run initial update on mount (respecting prefers-reduced-motion)
    updatePosition();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const expired = isDeadlinePassed(deadline);
  if (expired) return null;

  return (
    /*
      Key fix: Remove overflow-hidden from <section> so the background image
      fills flush against the wave dividers above and below.
      Use isolate + z-0 so stacking context is self-contained.
      The parallax wrapper uses inset-[-60px] to bleed beyond the section edges,
      ensuring no gap is visible at the wave seam on any screen width.
    */
    <section className="relative py-24 md:py-36 isolate" style={{ background: "#013220" }}>

      {/* Parallax wrapper — -inset-x-0 -inset-y-[150px] gives generous bleed room for both parallax shift and wave overlap */}
      <div
        ref={parallaxRef}
        className="absolute -inset-x-0 -inset-y-[150px] overflow-hidden -z-10"
        style={{ willChange: "transform" }}
      >
        <Image
          src="https://images.unsplash.com/photo-1686472886489-1d2d7e08ff9c?w=1600&q=65&auto=format&fm=webp"
          alt="Tea plantation landscape"
          fill
          sizes="100vw"
          quality={50}
          className="object-cover object-center scale-[1.02]"
          loading="lazy"
        />
        {/* Dark overlay moved inside the wrapper to bleed and translate with the image */}
        <div className="absolute inset-0 bg-brand-evergreen/80" />
        {/* Gold tint moved inside the wrapper to bleed and translate with the image */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-evergreen/60 via-transparent to-brand-evergreen/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl mx-auto px-4 reveal">
        <span className="section-label text-brand-gold block mb-4 animate-pulse">
          ✦ Limited Time Offer ✦
        </span>
        <h2 className="font-serif text-3xl md:text-6xl font-bold text-white leading-tight mb-6">
          Early Bird Discounts<br />
          <span className="text-brand-gold italic">Limited Time Offer</span>
        </h2>
        <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
          {bannerText}
          {formattedDeadline && (
            <>
              {" "}Offer valid until{" "}
              <strong className="text-white">{formattedDeadline}</strong>.
            </>
          )}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={whatsappOfferUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-9 py-4 bg-brand-gold hover:bg-amber-400 text-brand-evergreen font-bold rounded-full transition-all hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(212,175,55,0.4)] text-base relative overflow-hidden group inline-flex items-center justify-center"
          >
            <span className="relative z-10">Claim Offer Now</span>
            <span className="absolute inset-0 bg-white/20 -translate-x-full -skew-x-[15deg] group-hover:translate-x-[120%] transition-transform duration-500" />
          </a>
          <a
            href={whatsappDealsUrl}
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
