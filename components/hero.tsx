"use client";

import { useEffect, useState, memo } from "react";
import Image from "next/image";
import GlassSearch from "@/components/glass-search";

const WORDS = [
  "Meghalaya",
  "Kerala",
  "Rajasthan",
  "Dubai",
  "Bhutan",
  "Maldives",
];

const TYPEWRITER_SPEED = 80;
const ERASE_SPEED      = 45;
const PAUSE_AFTER      = 1800;
const PAUSE_BEFORE     = 400;

const DESTINATIONS = [
  { name: "Meghalaya", img: "https://images.unsplash.com/photo-1686472886489-1d2d7e08ff9c?w=1920&q=75" },
  { name: "Kerala",    img: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1920&q=75" },
  { name: "Rajasthan", img: "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1920&q=75" },
  { name: "Dubai",     img: "https://images.unsplash.com/photo-1708361089093-beef4c4584e7?w=1920&q=75" },
  { name: "Bhutan",    img: "https://images.unsplash.com/photo-1578556881786-851d4b79cb73?w=1920&q=75" },
  { name: "Maldives",  img: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1920&q=75" },
];

// ─── Isolated Typewriter ───────────────────────────────────────────────────
const Typewriter = memo(function Typewriter({
  wordIndex,
  onWordComplete,
}: {
  wordIndex: number;
  onWordComplete: () => void;
}) {
  const [displayed, setDisplayed] = useState(WORDS[wordIndex]);
  const [phase, setPhase] = useState<"typing" | "pausing" | "erasing" | "waiting">("pausing");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayed("");
      setPhase("typing");
    }, 0);
    return () => clearTimeout(timer);
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
    <span className="text-[#F4A011] inline-block min-w-[6ch]">
      {displayed}
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

// ─── Hero ─────────────────────────────────────────────────────────────────
export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);

  const advanceWord = () =>
    setWordIndex((prev) => (prev + 1) % WORDS.length);

  const nextIndex = (wordIndex + 1) % DESTINATIONS.length;

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
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(8px); }
        }
        @keyframes radialPulse {
          0%, 100% { opacity: 0.18; }
          50%       { opacity: 0.32; }
        }
      `}</style>

      <section className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center pb-16 bg-[#013220]">

        {/* Deep Green Base Background Gradient */}
        <div
          className="absolute inset-0 z-0"
          style={{
            background:
              "linear-gradient(160deg, #01291a 0%, #013220 40%, #001f14 100%)",
          }}
          aria-hidden="true"
        />

        {/* Destination Background Slideshow
            - Index 0 (Meghalaya) is ALWAYS rendered so it is discoverable in
              initial HTML and qualifies for fetchpriority=high via priority prop.
            - Subsequent slides are rendered only when current or upcoming,
              keeping bandwidth use the same as before.                          */}
        {DESTINATIONS.map((dest, idx) => {
          const isCurrent = idx === wordIndex;
          const isNext    = idx === nextIndex;
          const isFirst   = idx === 0;

          // Always keep index 0 in the DOM (LCP image must be in initial HTML).
          // Skip all others unless they are current or next.
          if (!isFirst && !isCurrent && !isNext) return null;

          return (
            <Image
              key={dest.name}
              src={dest.img}
              alt=""
              fill
              sizes="100vw"
              // Only the first image gets priority (fetchpriority=high + preload).
              // Never set priority on slides that are merely "next" — that would
              // preload images the user may never see.
              priority={isFirst}
              // Do NOT set loading="lazy" on the priority image — Next.js ignores
              // it but Lighthouse still flags the attribute on the element.
              // Non-priority images default to lazy automatically.
              quality={isFirst ? 80 : 65}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out z-0"
              style={{
                opacity: isCurrent ? 0.7 : 0,
              }}
            />
          );
        })}

        {/* Vignette & Contrast Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80 z-0"
          aria-hidden="true"
        />

        {/* Golden radial glow */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 48%, rgba(212,175,55,0.22) 0%, transparent 70%)",
            animation: "radialPulse 5s ease-in-out infinite",
          }}
        />

        {/* Hero content */}
        <div className="relative z-10 flex flex-col items-center text-center px-4 gap-4 select-none w-full max-w-6xl mx-auto">

          {/* Eyebrow */}
          <p
            className="text-[#F4A011] uppercase tracking-[0.3em] text-xs font-semibold pt-20 sm:pt-0"
            style={{ animation: "fadeUp 0.8s ease both 0.1s", opacity: 1 }}
          >
            Tea Country Holidays
          </p>

          {/* Main headline */}
          <h1
            className="font-serif text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-snug md:leading-tight"
            style={{ animation: "fadeUp 0.8s ease both 0.35s", opacity: 0, animationFillMode: "both" }}
          >
            Discover{" "}
            <Typewriter wordIndex={wordIndex} onWordComplete={advanceWord} />
          </h1>

          {/* Sub-line */}
          <p
            className="font-serif italic text-brand-cream/90 tracking-[0.1em] text-lg sm:text-xl md:text-2xl font-medium"
            style={{ animation: "fadeUp 0.8s ease both 0.6s", animationFillMode: "both", opacity: 0 }}
          >
            Northeast India, Curated. Since 2014.
          </p>

          {/* Decorative divider */}
          <div
            className="w-16 h-px bg-[#F4A011]/50 mt-2"
            style={{ animation: "fadeUp 0.8s ease both 0.8s", opacity: 0 }}
          />

          {/* Search bar */}
          <div
            className="w-full pt-8 relative z-20"
            style={{ animation: "fadeUp 0.8s ease both 1s", opacity: 0 }}
          >
            <GlassSearch />
          </div>

          {/* Stats Bar */}
          <div
            className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[#F5F0E8] font-sans text-[13px] tracking-[0.05em] mt-4 opacity-0 relative z-10"
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

        {/* Smooth transition curve into next section */}
        <div className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden leading-none" aria-hidden="true">
          <svg
            viewBox="0 0 1440 60"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="block w-full h-10 sm:h-14"
          >
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#FEFAEF" />
          </svg>
        </div>
      </section>
    </>
  );
}
