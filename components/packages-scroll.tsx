"use client";

import { useRef } from "react";
import Image from "next/image";
import { useAuthGate } from "@/hooks/use-auth-gate";

export interface CarouselPackage {
  name: string;
  duration: string;
  destination: string;
  imageUrl: string;
}

export const fallbackPackages: CarouselPackage[] = [
  {
    name: "Meghalaya Explorer",
    duration: "5N/6D",
    destination: "Northeast India",
    imageUrl: "https://images.unsplash.com/photo-1609276804051-8c5e906cc430?w=800&q=80&auto=format&fit=crop",
  },
  {
    name: "Bhutan Royal Tour",
    duration: "7N/8D",
    destination: "Bhutan",
    imageUrl: "https://images.unsplash.com/photo-1598869012638-f5351b49498f?w=800&q=80&auto=format&fit=crop",
  },
  {
    name: "Kerala Backwaters",
    duration: "4N/5D",
    destination: "Kerala",
    imageUrl: "https://images.unsplash.com/photo-1609828913552-f9138ed9e42d?w=800&q=80&auto=format&fit=crop",
  },
  {
    name: "Dubai Highlights",
    duration: "5N/6D",
    destination: "Dubai",
    imageUrl: "https://images.unsplash.com/photo-1708361089093-beef4c4584e7?w=800&q=80&auto=format&fit=crop",
  },
  {
    name: "Sikkim Circuit",
    duration: "6N/7D",
    destination: "Sikkim",
    imageUrl: "https://images.unsplash.com/photo-1748722873181-03b100cfd883?w=800&q=80&auto=format&fit=crop",
  },
  {
    name: "Rajasthan Heritage",
    duration: "8N/9D",
    destination: "Rajasthan",
    imageUrl: "https://images.unsplash.com/photo-1524229321985-1e1989075d9b?w=800&q=80&auto=format&fit=crop",
  },
  {
    name: "Bali Escape",
    duration: "6N/7D",
    destination: "Bali",
    imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80&auto=format&fit=crop",
  },
  {
    name: "Andaman Paradise",
    duration: "5N/6D",
    destination: "Andaman",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80&auto=format&fit=crop",
  },
];

export default function PackagesScroll({ initialPackages = fallbackPackages }: { initialPackages?: CarouselPackage[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { gatedWhatsApp } = useAuthGate();

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
            <h2 className="text-3xl md:text-4xl font-bold text-brand-evergreen dark:text-[#faf8f3] font-display">
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
          <div className="flex gap-6 w-full">
            {initialPackages.map((pkg) => (
              <div
                key={pkg.name}
                className="shrink-0 w-[85%] md:w-[calc(33.33%-16px)] xl:w-[calc(25%-18px)] snap-start bg-brand-floral rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-brand-gold/10 hover:border-brand-gold/30"
              >
                {/* Card Image */}
                <div className="aspect-[4/3] w-full relative overflow-hidden">
                  <Image
                    src={pkg.imageUrl}
                    alt={pkg.name}
                    fill
                    quality={65}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover pointer-events-none"
                    loading="lazy"
                    draggable={false}
                  />
                </div>

                {/* Card Body */}
                <div className="p-5 flex flex-col gap-3">
                  {/* Destination Tag */}
                  <span className="inline-block self-start bg-brand-gold/10 text-brand-gold text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                    {pkg.destination}
                  </span>

                  {/* Name */}
                  <h3 className="text-brand-evergreen dark:text-white font-bold text-lg leading-snug">
                    {pkg.name}
                  </h3>

                  {/* Duration */}
                  <div className="flex items-center justify-between mb-2 mt-1">
                    <span className="text-brand-evergreen/80 dark:text-brand-cream text-sm font-semibold bg-brand-evergreen/10 dark:bg-white/10 px-3 py-1.5 rounded-lg w-full text-center">
                      {pkg.duration}
                    </span>
                  </div>

                  {/* Glowing CTA */}
                  <button 
                    onClick={() => gatedWhatsApp(
                      `Hi, I'm interested in the ${pkg.name} package (${pkg.duration}). Please share more details.`
                    )}
                    className="group relative w-full h-12 bg-[#1a3a2a] border border-brand-gold/20 text-left p-3 text-white text-sm font-bold rounded-xl overflow-hidden transition-all duration-500 hover:border-[#b8960c] hover:text-[#d4a017] before:absolute before:w-12 before:h-12 before:content-[''] before:right-1 before:top-1 before:z-10 before:bg-[#2d6a4f] before:rounded-full before:blur-lg before:transition-all before:duration-500 after:absolute after:z-10 after:w-20 after:h-20 after:content-[''] after:bg-[#b8960c] after:right-8 after:top-3 after:rounded-full after:blur-lg after:transition-all after:duration-500 hover:before:right-12 hover:before:-bottom-8 hover:before:blur hover:before:[box-shadow:_20px_20px_20px_30px_#b8960c] hover:after:-right-8 cursor-pointer"
                  >
                    <span className="relative z-20">Enquire Now</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
