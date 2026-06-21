"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Calendar, Users, Search } from "lucide-react";

export default function SearchBar() {
  const [destination, setDestination] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [travellers, setTravellers] = useState("2");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(
      `/holidays?destination=${encodeURIComponent(destination)}&date=${checkin}&checkout=${checkout}&travellers=${encodeURIComponent(travellers)}`
    );
  };

  return (
    <div className="relative z-30 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 sm:-mt-16">
      <div className="bg-white dark:bg-brand-evergreen/80 rounded-2xl shadow-[0_25px_60px_-12px_rgba(1,50,32,0.25)] border border-brand-gold/20 p-5 sm:p-6 backdrop-blur-sm">
        {/* Label */}
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gold mb-4">Quick Search</p>

        <form onSubmit={handleSearch} className="flex flex-col lg:flex-row items-stretch gap-3">
          {/* Destination */}
          <div className="flex-1 relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-gold" />
            <input 
              type="text" 
              placeholder="Where are you going?"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-brand-varden border border-transparent rounded-xl focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 transition-all font-medium text-brand-evergreen dark:text-brand-cream placeholder:text-brand-ink/40 outline-none" 
            />
          </div>

          {/* Check-in */}
          <div className="lg:w-48 relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-gold" />
            <input 
              type="date"
              value={checkin}
              onChange={(e) => setCheckin(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-brand-varden border border-transparent rounded-xl focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 transition-all font-medium text-brand-evergreen dark:text-brand-cream outline-none" 
            />
          </div>

          {/* Check-out */}
          <div className="lg:w-48 relative">
            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-gold" />
            <input 
              type="date"
              value={checkout}
              onChange={(e) => setCheckout(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-brand-varden border border-transparent rounded-xl focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 transition-all font-medium text-brand-evergreen dark:text-brand-cream outline-none" 
            />
          </div>

          {/* Travellers */}
          <div className="lg:w-44 relative">
            <Users className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-gold" />
            <select 
              value={travellers}
              onChange={(e) => setTravellers(e.target.value)}
              className="w-full pl-12 pr-8 py-4 bg-brand-varden border border-transparent rounded-xl focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 transition-all font-medium text-brand-evergreen dark:text-brand-cream appearance-none cursor-pointer outline-none"
            >
              {Array.from({length:20},(_,i)=>(
                <option key={i+1} value={i+1} className="bg-[#013220] text-[#faf8f3]">{i+1} {i===0?"Traveller":"Travellers"}</option>
              ))}
            </select>
            <svg className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-evergreen/40 dark:text-brand-cream/50 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </div>

          {/* Search Button */}
          <button 
            type="submit"
            className="lg:w-auto flex items-center justify-center gap-2 bg-brand-evergreen hover:bg-brand-gold hover:text-brand-evergreen text-white font-bold px-8 py-4 rounded-xl transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
          >
            <Search className="h-5 w-5" />
            <span>Search</span>
          </button>
        </form>
      </div>
    </div>
  );
}
