"use client";

import { useEffect, useState, memo, useRef } from "react";
import Image from "next/image";
import GlassSearch from "@/components/glass-search";

const WORDS = [
  "Meghalaya",
  "Kerala",
  "Rajasthan",
  "Dubai",
  "Bhutan",
  "Maldives",
  "Switzerland",
  "France",
  "Uzbekistan",
  "Bali",
  "Thailand",
  "Kashmir",
];

const TYPEWRITER_SPEED = 80;
const ERASE_SPEED      = 45;
const PAUSE_AFTER      = 1800;
const PAUSE_BEFORE     = 400;

const DESTINATIONS = [
  { name: "Meghalaya", img: "https://images.unsplash.com/photo-1686472886489-1d2d7e08ff9c?w=1920&q=75", pos: "object-center" },
  { name: "Kerala",    img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1920&q=75", pos: "object-center" },
  { name: "Rajasthan", img: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1920&q=75", pos: "object-[center_35%]" },
  { name: "Dubai",     img: "https://images.unsplash.com/photo-1708361089093-beef4c4584e7?w=1920&q=75", pos: "object-center" },
  { name: "Bhutan",    img: "https://images.unsplash.com/photo-1578556881786-851d4b79cb73?w=1920&q=75", pos: "object-[35%_center]" },
  { name: "Maldives",  img: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1920&q=75", pos: "object-center" },
  { name: "Switzerland", img: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=1920&q=75", pos: "object-center" },
  { name: "France",    img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1920&q=75", pos: "object-[center_60%]" },
  { name: "Uzbekistan", img: "https://images.unsplash.com/photo-1664602078796-68ee76b3fc59?w=1920&q=75", pos: "object-center" },
  { name: "Bali",      img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1920&q=75", pos: "object-center" },
  { name: "Thailand",  img: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=1920&q=75", pos: "object-center" },
  { name: "Kashmir",   img: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=1920&q=75", pos: "object-center" },
];

const Typewriter = memo(function Typewriter({
  wordIndex,
  onWordComplete,
}: {
  wordIndex: number;
  onWordComplete: () => void;
}) {
  const [displayed, setDisplayed] = useState(WORDS[wordIndex]);
  const [phase, setPhase] = useState<"typing" | "pausing" | "erasing" | "waiting">("pausing");
  const isFirstMount = useRef(true);

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    setDisplayed("");
    setPhase("typing");
  }, [wordIndex]);

  useEffect(() => {
    const word = WORDS[wordIndex];

    if (phase === "typing") {
      if (displayed.length < word.length) {
        const t = setTimeout(
          () => setDisplayed(word.slice(0, displayed.length + 1)),
          TYPEWRITER_SPEED
        );
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setPhase("pausing"), PAUSE_AFTER);
        return () => clearTimeout(t);
      }
    }

    if (phase === "pausing") {
      const t = setTimeout(() => setPhase("erasing"), PAUSE_AFTER);
      return () => clearTimeout(t);
    }

    if (phase === "erasing") {
      if (displayed.length > 0) {
        const t = setTimeout(
          () => setDisplayed(displayed.slice(0, -1)),
          ERASE_SPEED
        );
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => {
          onWordComplete();
        }, PAUSE_BEFORE);
        return () => clearTimeout(t);
      }
    }
  }, [displayed, phase, wordIndex, onWordComplete]);

  return (
    <span className="text-[#F4A011] inline-block min-w-[6ch] font-display">
      {displayed || "\u200B"}
      <span
        style={{
          display: "inline-block",
          width: "2px",
          height: "0.85em",
          background: "#F4A011",
          marginLeft: "4px",
          verticalAlign: "middle",
          animation: "blink 0.75s step-end infinite",
        }}
      />
    </span>
  );
});

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [isCrossfading, setIsCrossfading] = useState(false);

  const advanceWord = () => {
    setIsCrossfading(false);
    setPrevIndex(wordIndex);
    setWordIndex((prev) => (prev + 1) % WORDS.length);
  };

  // Let the old slide render for one frame, then fade between slides.
  useEffect(() => {
    if (prevIndex === null) return;
    const frame = window.requestAnimationFrame(() => {
      setIsCrossfading(true);
    });

    const t = window.setTimeout(() => {
      setPrevIndex(null);
      setIsCrossfading(false);
    }, 950);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(t);
    };
  }, [prevIndex]);

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
        @keyframes radialPulse {
          0%, 100% { opacity: 0.18; }
          50%       { opacity: 0.32; }
        }
      `}</style>

      <section className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center pb-16 bg-[#013220]">

        {/* Deep Green Base */}
        <div
          className="absolute inset-0 z-0"
          style={{ background: "linear-gradient(160deg, #01291a 0%, #013220 40%, #001f14 100%)" }}
          aria-hidden="true"
        />

        {/* Slideshow — previous slide stays visible (z-1) while new one fades in on top (z-2) */}
        {DESTINATIONS.map((dest, idx) => {
          const isCurrent = idx === wordIndex;
          const isPrev    = idx === prevIndex;
          const isFirst   = idx === 0;

          // Only render current, previous, and first (LCP)
          if (!isFirst && !isCurrent && !isPrev) return null;

          return (
            <Image
              key={dest.name}
              src={dest.img}
              alt=""
              fill
              sizes="100vw"
              priority={isFirst}
              loading={isFirst ? "eager" : "lazy"}
              fetchPriority={isFirst ? "high" : "low"}
              quality={isFirst ? 60 : 50}
              className={`absolute inset-0 w-full h-full object-cover ${dest.pos || "object-center"}`}
              style={{
                opacity: isCurrent
                  ? (prevIndex === null ? 1 : (isCrossfading ? 1 : 0))
                  : isPrev
                    ? (isCrossfading ? 0 : 1)
                    : 0,
                zIndex: isCurrent ? 2 : isPrev ? 1 : 0,
                transform: isCurrent
                  ? (prevIndex === null ? "scale(1)" : (isCrossfading ? "scale(1)" : "scale(1.035)"))
                  : isPrev
                    ? (isCrossfading ? "scale(1.01)" : "scale(1)")
                    : "scale(1)",
                transition: "opacity 950ms ease-in-out, transform 950ms ease-in-out",
              }}
            />
          );
        })}

        {/* Vignette */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/75 z-[3]"
          aria-hidden="true"
        />

        {/* Golden radial glow */}
        <div
          className="absolute inset-0 pointer-events-none z-[3]"
          aria-hidden="true"
          style={{
            background: "radial-gradient(ellipse 70% 55% at 50% 48%, rgba(212,175,55,0.22) 0%, transparent 70%)",
            animation: "radialPulse 5s ease-in-out infinite",
          }}
        />

        {/* Hero content */}
        <div className="relative z-[4] flex flex-col items-center text-center px-4 gap-4 select-none w-full max-w-6xl mx-auto">

          <p
            className="text-[#F4A011] uppercase tracking-[0.3em] text-xs font-semibold pt-24 sm:pt-0"
            style={{ animation: "fadeUp 0.8s ease both 0.1s" }}
          >
            Tea Country Holidays
          </p>

          <h1
            className="font-serif text-white text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-snug md:leading-tight"
            style={{ animation: "fadeUp 0.8s ease both 0.35s", opacity: 0, animationFillMode: "both" }}
          >
            Discover{" "}
            <Typewriter wordIndex={wordIndex} onWordComplete={advanceWord} />
          </h1>

          <p
            className="font-serif italic text-brand-cream/90 tracking-[0.1em] text-base sm:text-xl md:text-2xl font-medium"
            style={{ animation: "fadeUp 0.8s ease both 0.6s", animationFillMode: "both", opacity: 0 }}
          >
            Northeast India, Curated. Since 2014.
          </p>

          <div
            className="w-16 h-px bg-[#F4A011]/50 mt-2"
            style={{ animation: "fadeUp 0.8s ease both 0.8s", opacity: 0 }}
          />

          <div
            className="w-full pt-8 relative z-20"
            style={{ animation: "fadeUp 0.8s ease both 1s", opacity: 0 }}
          >
            <GlassSearch />
          </div>

          <div
            className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 sm:gap-x-4 sm:gap-y-2 text-[#F5F0E8] font-sans text-[11px] sm:text-[13px] tracking-[0.05em] mt-4 opacity-0 relative z-10"
            style={{ animation: "fadeUp 0.8s ease both 1.2s" }}
          >
            <span className="text-[#C8860A]">✦</span>
            <span>500+ Tours Crafted</span>
            <span className="text-white/20">|</span>
            <span>50+ Destinations</span>
            <span className="text-white/20">|</span>
            <span>4.9★ Google Rating</span>
            <span className="text-white/20">|</span>
            <span>10 Years of Excellence</span>
          </div>

        </div>
      </section>
    </>
  );
}
