"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Calendar, Users, Search } from "lucide-react";

export default function GlassSearch() {
  const [destination, setDestination] = useState("");
  const [checkin, setCheckin] = useState("");
  const [travellers, setTravellers] = useState("2");
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/holidays?destination=${encodeURIComponent(destination)}&date=${checkin}&travellers=${encodeURIComponent(travellers)}`);
  }

  return (
    <div className="max-w-[860px] w-full mx-auto px-4">
      {/* Glass card */}
      <div className="backdrop-blur-xl bg-brand-evergreen/80 border border-brand-gold/30 rounded-2xl shadow-2xl p-6">

        <form onSubmit={handleSearch}>
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-end">

            {/* Destination */}
            <div className="flex-1 flex flex-col gap-1.5">
              <label className="text-white/75 text-xs uppercase tracking-[0.12em]">
                Destination
              </label>
              <div className="relative">
                <MapPin
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none"
                />
                <input
                  type="text"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Where to?"
                  className="bg-white/15 backdrop-blur-sm border border-white/30 text-white placeholder:text-white/65 rounded-xl pl-9 pr-4 py-3.5 w-full outline-none focus:border-brand-gold focus:bg-white/20 transition-all"
                />
              </div>
            </div>

            {/* Check-in */}
            <div className="flex-1 flex flex-col gap-1.5">
              <label className="text-white/75 text-xs uppercase tracking-[0.12em]">
                Check-in
              </label>
              <div className="relative">
                <Calendar
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none"
                />
                <input
                  type="date"
                  value={checkin}
                  onChange={(e) => setCheckin(e.target.value)}
                  className="bg-white/15 backdrop-blur-sm border border-white/30 text-white placeholder:text-white/65 rounded-xl pl-9 pr-4 py-3.5 w-full outline-none focus:border-brand-gold focus:bg-white/20 transition-all [color-scheme:dark]"
                />
              </div>
            </div>

            {/* Travellers */}
            <div className="flex-1 flex flex-col gap-1.5">
              <label className="text-white/75 text-xs uppercase tracking-[0.12em]">
                Travellers
              </label>
              <div className="relative">
                <Users
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none"
                />
                <select
                  value={travellers}
                  onChange={(e) => setTravellers(e.target.value)}
                  className="bg-white/15 backdrop-blur-sm border border-white/30 text-white rounded-xl pl-9 pr-4 py-3.5 w-full outline-none focus:border-brand-gold focus:bg-white/20 transition-all appearance-none cursor-pointer"
                >
                  {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n} className="bg-[#013220] text-white">
                      {n} {n === 1 ? "Traveller" : "Travellers"}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Search button */}
            <div className="flex flex-col gap-1.5">
              <label className="text-transparent text-xs uppercase tracking-wider select-none hidden sm:block">
                &nbsp;
              </label>
              <button
                type="submit"
                className="bg-[#D4AF37] hover:bg-amber-400 text-[#013220] font-bold px-8 py-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 whitespace-nowrap shadow-lg shadow-amber-900/20 active:scale-95"
              >
                <Search size={18} />
                Search
              </button>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}
