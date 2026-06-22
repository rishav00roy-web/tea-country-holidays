"use client";

import { useState } from "react";
import Image from "next/image";
import { useInView } from "@/hooks/useAnimations";

const PILLS = [
  "All","Meghalaya","Sikkim","Bhutan","Assam","Kerala","Rajasthan","Dubai","Bali",
];

const IMAGES = [
  { id:1, name:"Cherrapunji",    cat:"Meghalaya", src:"https://images.unsplash.com/photo-1568535459885-b4fc72e035a4?w=600&q=75" },
  { id:2, name:"Gangtok, Sikkim",cat:"Sikkim",    src:"https://images.unsplash.com/photo-1622308644420-b20142dc993c?w=600&q=75" },
  { id:3, name:"Paro, Bhutan",   cat:"Bhutan",    src:"https://images.unsplash.com/photo-1578556881786-851d4b79cb73?w=600&q=75" },
  { id:4, name:"Kaziranga",      cat:"Assam",     src:"https://images.unsplash.com/photo-1637391783805-f1393be00fcf?w=600&q=75" },
  { id:5, name:"Alleppey",       cat:"Kerala",    src:"https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&q=75" },
  { id:6, name:"Jaipur",         cat:"Rajasthan", src:"https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600&q=75" },
  { id:7, name:"Dubai Marina",   cat:"Dubai",     src:"https://images.unsplash.com/photo-1708361089093-beef4c4584e7?w=600&q=75" },
  { id:8, name:"Ubud, Bali",     cat:"Bali",      src:"https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=75" },
];

export default function Destinations() {
  const [active, setActive] = useState("All");
  const [ref, visible] = useInView();

  const filtered = active === "All" ? IMAGES : IMAGES.filter(i => i.cat === active);

  return (
    <section className="py-20 md:py-28 bg-brand-floral overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div ref={ref} className="text-center mb-12">
          <span className="text-brand-red font-bold text-sm tracking-[0.2em] uppercase block mb-3 opacity-0"
            style={{ animation: visible ? "fadeUp 0.7s ease both 0s" : "none" }}>
            Where do you want to go?
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-brand-evergreen dark:text-white opacity-0"
            style={{ animation: visible ? "fadeUp 0.7s ease both 0.12s" : "none" }}>
            Explore by Destination
          </h2>
        </div>

        {/* Filter pills */}
        <div className="flex overflow-x-auto pb-4 -mx-4 px-4 hide-scrollbar gap-2.5 snap-x opacity-0"
          style={{ animation: visible ? "fadeUp 0.7s ease both 0.24s" : "none" }}>
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

        {/* Image grid */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {filtered.map((img, i) => (
            <div key={img.id}
              className="group relative overflow-hidden rounded-2xl cursor-pointer"
              style={{
                aspectRatio:"3/4",
                animation:`fadeUp 0.5s ease both ${i * 0.07}s`,
                boxShadow:"10px 10px 24px rgba(1,20,10,0.22),-2px -2px 10px rgba(8,50,25,0.1)",
              }}>

              <div className="absolute inset-0 bg-gradient-to-t from-brand-evergreen/90 via-brand-evergreen/15 to-transparent z-10 opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

              <Image src={img.src} alt={img.name}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy" />

              {/* Hover gold border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-brand-gold/60 rounded-2xl transition-colors duration-300 z-20 pointer-events-none" />

              <div className="absolute bottom-0 left-0 w-full p-4 z-30">
                <p className="text-brand-gold text-xs font-bold uppercase tracking-wider mb-0.5 opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                  Explore →
                </p>
                <h3 className="text-white font-bold text-sm md:text-base drop-shadow-lg">{img.name}</h3>
                <p className="text-white/50 text-xs mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{img.cat}</p>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center py-16 text-brand-ink/40 font-serif text-xl italic">More destinations coming soon…</p>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html:`@keyframes fadeUp{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:translateY(0)}}` }} />
    </section>
  );
}
