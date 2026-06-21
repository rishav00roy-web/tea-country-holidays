"use client";

import Link from "next/link";
import { useInView } from "@/hooks/useAnimations";

// All images verified to load from Unsplash (stable photo IDs)
const tours = [
  {
    id:1, name:"Magical Meghalaya Explorer",   duration:"5N / 6D", price:"24,999",
    image:"https://images.unsplash.com/photo-1686472886489-1d2d7e08ff9c?w=800&q=80",
    limitedSeats:true,  category:"Northeast India",
  },
  {
    id:2, name:"Mystical Sikkim & Darjeeling", duration:"6N / 7D", price:"28,500",
    image:"https://images.unsplash.com/photo-1622308644420-b20142dc993c?w=800&q=80",
    limitedSeats:false, category:"Northeast India",
  },
  {
    id:3, name:"Bhutan: The Last Shangri-La",  duration:"7N / 8D", price:"45,000",
    image:"https://images.unsplash.com/photo-1578556881786-851d4b79cb73?w=800&q=80",
    limitedSeats:true,  category:"International",
  },
  {
    id:4, name:"Kerala Backwaters Retreat",    duration:"4N / 5D", price:"18,999",
    image:"https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80",
    limitedSeats:false, category:"Domestic",
  },
  {
    id:5, name:"Royal Rajasthan Heritage",     duration:"8N / 9D", price:"32,500",
    image:"https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80",
    limitedSeats:true,  category:"Domestic",
  },
  {
    id:6, name:"Dubai Glitz & Glamour",        duration:"5N / 6D", price:"55,000",
    image:"https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=800&q=80",
    limitedSeats:false, category:"International",
  },
];

export default function FeaturedTours() {
  const [headerRef, headerVisible] = useInView();

  return (
    <section className="py-20 md:py-28 bg-brand-varden overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="text-brand-red font-bold text-sm tracking-[0.2em] uppercase block mb-3 opacity-0"
            style={{ animation: headerVisible ? "fadeUp 0.7s ease both 0s" : "none" }}>
            Handpicked For You
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-evergreen dark:text-white opacity-0"
            style={{ animation: headerVisible ? "fadeUp 0.7s ease both 0.12s" : "none" }}>
            Journeys Worth Taking
          </h2>
          <p className="text-brand-ink/55 mt-4 max-w-xl mx-auto opacity-0"
            style={{ animation: headerVisible ? "fadeUp 0.7s ease both 0.24s" : "none" }}>
            From misty Northeast valleys to golden international shores — a journey for every dream.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour, i) => <TourCard key={tour.id} tour={tour} index={i} />)}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <Link href="#"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white dark:bg-[#12291f] border-2 border-brand-evergreen dark:border-brand-gold/40 hover:bg-brand-evergreen hover:text-white dark:hover:bg-brand-evergreen text-brand-evergreen dark:text-white rounded-full font-bold transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-0.5">
            Explore All Packages →
          </Link>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html:`@keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}` }} />
    </section>
  );
}

function TourCard({ tour, index }: { tour: typeof tours[0]; index: number }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref}
      className="group relative bg-brand-floral rounded-2xl overflow-hidden flex flex-col
        shadow-[0_2px_20px_rgba(1,50,32,0.07)] hover:shadow-[0_24px_60px_rgba(1,50,32,0.18)]
        border-t-[3px] border-t-transparent hover:border-t-brand-gold
        border border-brand-gold/0 hover:border-brand-gold/20
        transition-all duration-500 hover:-translate-y-2 opacity-0"
      style={{ animation: visible ? `fadeUp 0.65s ease both ${index * 0.07}s` : "none" }}>

      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-brand-varden">
        <img src={tour.image} alt={tour.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-evergreen/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {tour.limitedSeats && (
          <span className="absolute top-3 left-3 bg-brand-red text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
            Limited Seats
          </span>
        )}
        <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-brand-evergreen text-[10px] font-bold px-2.5 py-1 rounded-full">
          {tour.category}
        </span>

        {/* Hover CTA overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
          <span className="bg-brand-gold text-brand-evergreen font-bold px-6 py-2.5 rounded-full text-sm translate-y-3 group-hover:translate-y-0 transition-transform duration-300 shadow-xl">
            View Package →
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-grow">
        <span className="inline-block bg-brand-gold/10 text-brand-gold text-xs font-bold px-3 py-1 rounded-full mb-3 w-fit border border-brand-gold/20">
          {tour.duration}
        </span>
        <h3 className="text-base font-bold text-brand-evergreen dark:text-white leading-snug mb-4 group-hover:text-brand-gold transition-colors duration-300">
          {tour.name}
        </h3>
        <div className="mt-auto flex items-center justify-between">
          <Link href="#" className="text-brand-gold font-semibold text-sm hover:text-brand-evergreen transition-colors flex items-center gap-0.5 group/link">
            Details <span className="transition-transform duration-200 group-hover/link:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
