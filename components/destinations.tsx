"use client";

import { useState } from "react";
import Image from "next/image";

const PILLS = [
  "All","Meghalaya","Sikkim","Bhutan","Assam","Kerala","Rajasthan","Dubai","Bali",
];

const IMAGES = [
  { id:1, name:"Cherrapunji",    cat:"Meghalaya", src:"https://images.unsplash.com/photo-1609276804051-8c5e906cc430?w=800&q=80&auto=format&fit=crop" },
  { id:2, name:"Gangtok, Sikkim",cat:"Sikkim",    src:"https://images.unsplash.com/photo-1622308644420-b20142dc993c?w=800&q=80&auto=format&fit=crop" },
  { id:3, name:"Paro, Bhutan",   cat:"Bhutan",    src:"https://images.unsplash.com/photo-1578556881786-851d4b79cb73?w=800&q=80&auto=format&fit=crop" },
  { id:4, name:"Kaziranga",      cat:"Assam",     src:"https://images.unsplash.com/photo-1613725194245-d8e21cf5d42e?w=800&q=80&auto=format&fit=crop" },
  { id:5, name:"Alleppey",       cat:"Kerala",    src:"https://images.unsplash.com/photo-1609828913552-f9138ed9e42d?w=800&q=80&auto=format&fit=crop" },
  { id:6, name:"Jaipur",         cat:"Rajasthan", src:"https://images.unsplash.com/photo-1524229321985-1e1989075d9b?w=800&q=80&auto=format&fit=crop" },
  { id:7, name:"Dubai Marina",   cat:"Dubai",     src:"https://images.unsplash.com/photo-1708361089093-beef4c4584e7?w=800&q=80&auto=format&fit=crop" },
  { id:8, name:"Ubud, Bali",     cat:"Bali",      src:"https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80&auto=format&fit=crop" },
];

export default function Destinations() {
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? IMAGES : IMAGES.filter(i => i.cat === active);

  return (
    <section className="py-20 md:py-28 bg-brand-floral overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="reveal text-center mb-12">
          <span className="section-label text-brand-gold">
            Where do you want to go?
          </span>
          <h2 className="reveal font-serif text-3xl md:text-5xl font-bold text-brand-evergreen dark:text-white">
            Explore by Destination
          </h2>
        </div>

        {/* Filter pills */}
        <div className="reveal flex overflow-x-auto pb-4 -mx-4 px-4 hide-scrollbar gap-2.5 snap-x">
          {PILLS.map(d => (
            <button key={d} onClick={() => setActive(d)}
              className={`whitespace-nowrap px-5 py-2.5 rounded-full font-semibold text-sm snap-center border-2 transition-all duration-200 ${
                active === d
                  ? "bg-brand-evergreen text-brand-gold border-brand-evergreen shadow-md scale-105"
                  : "bg-white dark:bg-[#12291f] text-brand-evergreen dark:text-[#faf8f3] border-brand-gold/25 dark:border-brand-gold/30 hover:border-brand-gold hover:bg-brand-varden dark:hover:bg-[#1a3a2a]"
              }`}>
              {d}
            </button>
          ))}
        </div>

        {/* Image grid — square aspect on mobile to keep cards compact, 3/4 portrait on desktop */}
        <div className="reveal-stagger mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {filtered.map((img) => (
            <div key={img.id}
              className="group relative overflow-hidden rounded-2xl cursor-pointer"
              style={{
                aspectRatio: "1/1",
                boxShadow: "10px 10px 24px rgba(1,20,10,0.22),-2px -2px 10px rgba(8,50,25,0.1)",
              }}>

              {/* On md+ screens use taller portrait ratio via inner absolute wrapper */}
              <style>{`.dest-card-md { aspect-ratio: 3/4 !important; }`}</style>

              <div className="absolute inset-0 bg-gradient-to-t from-brand-evergreen/90 via-brand-evergreen/30 to-transparent z-10 opacity-80 md:opacity-60 md:group-hover:opacity-90 transition-opacity duration-500" />

              <Image src={img.src} alt={img.name}
                fill
                quality={50}
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                loading="lazy" />

              {/* Hover gold border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-brand-gold/60 rounded-2xl transition-colors duration-300 z-20 pointer-events-none" />

              <div className="absolute bottom-0 left-0 w-full p-3 sm:p-4 z-30">
                <p className="text-brand-gold text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-0.5 md:opacity-0 md:group-hover:opacity-100 md:-translate-y-1 md:group-hover:translate-y-0 transition-all duration-300">
                  Explore →
                </p>
                <h3 className="text-white font-bold text-xs sm:text-sm md:text-base drop-shadow-lg leading-tight">{img.name}</h3>
                <p className="text-white/50 text-[10px] sm:text-xs mt-0.5 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300">{img.cat}</p>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center py-16 text-brand-ink/40 font-serif text-xl italic">More destinations coming soon…</p>
        )}
      </div>
    </section>
  );
}
