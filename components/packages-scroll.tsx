"use client";

import { useRef } from "react";
import Image from "next/image";


export interface CarouselPackage {
  name: string;
  duration: string;
  destination: string;
  imageUrl: string;
}

export const fallbackPackages: CarouselPackage[] = [
  {
    name: "Tawang Monastery Journey",
    duration: "6 Nights / 5 Days",
    destination: "Pilgrimage",
    imageUrl: "https://images.unsplash.com/photo-1628443266300-e8490ee38875?w=800&q=80&auto=format&fit=crop",
  },
  {
    name: "Darjeeling & Gangtok Retreat",
    duration: "6 Nights / 5 Days",
    destination: "Honeymoon",
    imageUrl: "https://images.unsplash.com/photo-1698753864905-a447aa362ec9?w=800&q=80&auto=format&fit=crop",
  },
  {
    name: "Majuli Cultural Island",
    duration: "6 Nights / 5 Days",
    destination: "Pilgrimage",
    imageUrl: "https://images.unsplash.com/photo-1759738101670-7d50ae3f1bd2?w=800&q=80&auto=format&fit=crop",
  },
  {
    name: "Cherrapunji Misty Valleys",
    duration: "6 Nights / 5 Days",
    destination: "Honeymoon",
    imageUrl: "https://images.unsplash.com/photo-1689089526066-c7e6e95ee265?w=800&q=80&auto=format&fit=crop",
  },
  {
    name: "Meghalaya Explorer",
    duration: "6 Nights / 5 Days",
    destination: "Adventure",
    imageUrl: "https://images.unsplash.com/photo-1686472886489-1d2d7e08ff9c?w=800&q=80&auto=format&fit=crop",
  },
  {
    name: "Kaziranga Wild Safari",
    duration: "6 Nights / 5 Days",
    destination: "Adventure",
    imageUrl: "https://images.unsplash.com/photo-1637391783805-f1393be00fcf?w=800&q=80&auto=format&fit=crop",
  },
  {
    name: "Kashmir Paradise",
    duration: "6 Nights / 5 Days",
    destination: "Domestic",
    imageUrl: "https://images.unsplash.com/photo-1614056965546-42fbe24eb36c?w=800&q=80&auto=format&fit=crop",
  },
  {
    name: "Goa Beach Getaway",
    duration: "6 Nights / 5 Days",
    destination: "Beach",
    imageUrl: "https://images.unsplash.com/photo-1558894930-0e1f89b9f0ce?w=800&q=80&auto=format&fit=crop",
  },
];

export default function PackagesScroll({
  initialPackages = fallbackPackages,
  whatsappNumber = "918826048272",
}: {
  initialPackages?: CarouselPackage[];
  whatsappNumber?: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  // openWhatsApp is used directly to avoid popup blocker issues with async auth checks

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const containerWidth = scrollRef.current.clientWidth;
      const scrollAmount = direction === "left" ? -containerWidth : containerWidth;
      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-16 bg-brand-varden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header flex row */}
        <div className="mb-8 flex items-end justify-between reveal">
          {/* Heading */}
          <div>
            <h2 className="text-2xl md:text-4xl font-bold text-brand-evergreen dark:text-[#faf8f3] font-display">
              Trending Packages
            </h2>
            <p className="mt-2 text-brand-evergreen/60 dark:text-[#faf8f3]/65 text-base">
              Explore handpicked journeys curated just for you
            </p>
          </div>

          {/* Navigation Buttons (Desktop only) */}
          <div className="hidden md:flex gap-3">
            <button
              onClick={() => scroll("left")}
              className="w-12 h-12 rounded-full border border-brand-gold/30 hover:border-brand-gold flex items-center justify-center text-brand-evergreen dark:text-brand-cream hover:bg-brand-gold/10 transition-all cursor-pointer font-bold text-lg"
              aria-label="Previous packages"
            >
              &larr;
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-12 h-12 rounded-full border border-brand-gold/30 hover:border-brand-gold flex items-center justify-center text-brand-evergreen dark:text-brand-cream hover:bg-brand-gold/10 transition-all cursor-pointer font-bold text-lg"
              aria-label="Next packages"
            >
              &rarr;
            </button>
          </div>
        </div>

        {/* Scrollable Row - Inside Frame */}
        <div
          ref={scrollRef}
          className="w-full overflow-x-auto pb-8 hide-scrollbar snap-x snap-mandatory scroll-smooth"
        >
          <div className="flex gap-6 w-full items-stretch">
            {initialPackages.map((pkg) => (
              <div
                key={pkg.name}
                className="shrink-0 w-[85%] md:w-[calc(33.33%-16px)] xl:w-[calc(25%-18px)] snap-start bg-brand-floral rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-brand-gold/10 hover:border-brand-gold/30 flex flex-col h-full"
              >
                {/* Card Image */}
                <div className="aspect-[4/3] w-full relative overflow-hidden shrink-0">
                  <Image
                    src={pkg.imageUrl}
                    alt={pkg.name}
                    fill
                    quality={50}
                    sizes="(max-width: 640px) 85vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover pointer-events-none"
                    loading="lazy"
                    draggable={false}
                  />
                </div>

                {/* Card Body */}
                <div className="p-5 flex flex-col flex-1 gap-3 justify-between">
                  <div className="flex flex-col gap-2">
                    {/* Destination Tag */}
                    <span className="inline-block self-start bg-brand-gold/10 text-[#826207] dark:text-brand-gold text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                      {pkg.destination}
                    </span>

                    {/* Name */}
                    <h3 className="text-brand-evergreen dark:text-white font-bold text-lg leading-snug line-clamp-2 min-h-[3.25rem] flex items-center">
                      {pkg.name}
                    </h3>
                  </div>

                  {/* Duration & CTA Container */}
                  <div className="flex flex-col gap-3 mt-auto pt-2">
                    {/* Duration */}
                    <div className="flex items-center justify-between">
                      <span className="text-brand-evergreen/80 dark:text-brand-cream text-sm font-semibold bg-brand-evergreen/10 dark:bg-white/10 px-3 py-1.5 rounded-lg w-full text-center">
                        {pkg.duration}
                      </span>
                    </div>

                    {/* Glowing CTA */}
                    <a 
                      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                        `Hi, I'm interested in the ${pkg.name} package (${pkg.duration}). Please share more details.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative w-full h-12 bg-[#1a3a2a] border border-brand-gold/20 text-left p-3 text-white text-sm font-bold rounded-xl overflow-hidden transition-all duration-500 hover:border-[#b8960c] hover:text-[#d4a017] before:absolute before:w-12 before:h-12 before:content-[''] before:right-1 before:top-1 before:z-10 before:bg-[#2d6a4f] before:rounded-full before:blur-lg before:transition-all before:duration-500 after:absolute after:z-10 after:w-20 after:h-20 after:content-[''] after:bg-[#b8960c] after:right-8 after:top-3 after:rounded-full after:blur-lg after:transition-all after:duration-500 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:before:[box-shadow:_20px_20px_20px_30px_#b8960c] hover:after:-right-8 cursor-pointer flex items-center"
                    >
                      <span className="relative z-20">Enquire Now</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Mobile swipe hint */}
        <p className="flex md:hidden items-center justify-center gap-2 text-xs text-brand-evergreen/70 dark:text-brand-cream/70 mt-3 select-none">
          <span>←</span> Swipe to explore <span>→</span>
        </p>
      </div>
    </section>
  );
}
