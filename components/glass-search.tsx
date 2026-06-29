"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { MapPin, Calendar, Users, Plane, Train, Car, Navigation, Check, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/lib/supabase";

type TransportMode = "Flight" | "Train" | "Road";
type LocationRow = {
  id: number;
  name: string;
  code: string;
  type: string;
  region: string;
  country: string;
};

const TRANSPORT_ICONS = {
  Flight: Plane,
  Train: Train,
  Road: Car,
} as const;

const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DAY_HEADERS = ["Su","Mo","Tu","We","Th","Fr","Sa"];

function useOnClickOutside(ref: React.RefObject<HTMLElement | null>, handler: () => void) {
  const handlerRef = useRef(handler);
  useEffect(() => { handlerRef.current = handler; });

  useEffect(() => {
    const listener = (e: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) return;
      handlerRef.current();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener, { passive: true });
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref]);
}

function buildCalendarDays(year: number, month: number): (number | null)[] {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);
  return days;
}

// Shared glass dropdown style — same look as calendar
const GLASS_DROPDOWN: React.CSSProperties = {
  background: "rgba(1, 50, 32, 0.97)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(244, 160, 17, 0.25)",
};

function LocationInput({
  label,
  placeholder,
  value,
  icon: Icon,
  isActive,
  onFocus,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  isActive: boolean;
  onFocus: () => void;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="text-[10px] font-bold text-[#F4A011]/70 uppercase tracking-wider block mb-1.5">
        {label}
      </label>
      <div className="relative">
        <Icon size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          placeholder={placeholder}
          autoCorrect="on"
          autoComplete="on"
          spellCheck={true}
          className={`w-full pl-9 pr-4 py-3 rounded-xl text-sm font-medium outline-none transition-all text-white placeholder:text-white/30 border ${
            isActive
              ? "bg-white/15 border-[rgba(212,175,55,0.35)]"
              : "bg-white/8 border-white/10 hover:border-[rgba(212,175,55,0.35)]"
          }`}
          style={{
            background: isActive ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.06)",
            boxShadow: isActive ? "0 0 0 2px rgba(212,175,55,0.25)" : undefined,
          }}
        />
      </div>
    </div>
  );
}

export default function GlassSearch() {
  const [activeTab, setActiveTab] = useState<"where" | "when" | "who" | null>(null);

  const [origin, setOrigin]           = useState("");
  const [destination, setDestination] = useState("");
  const [checkin, setCheckin]         = useState("");
  const [adults, setAdults]           = useState(2);
  const [children, setChildren]       = useState(0);
  const [transport, setTransport]     = useState<TransportMode>("Flight");

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [viewYear, setViewYear]   = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const [activeInput, setActiveInput]   = useState<"origin" | "destination" | null>(null);
  const [query, setQuery]               = useState("");
  const [suggestions, setSuggestions]   = useState<LocationRow[]>([]);
  const [isSearching, setIsSearching]   = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(containerRef, () => setActiveTab(null));

  const closeWhere = useCallback(() => {
    setActiveTab(null);
    setActiveInput(null);
    setQuery("");
    setSuggestions([]);
  }, []);

  const calDays = buildCalendarDays(viewYear, viewMonth);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const isPast     = (day: number) => new Date(viewYear, viewMonth, day) < today;
  const isToday    = (day: number) => new Date(viewYear, viewMonth, day).toDateString() === today.toDateString();
  const isSelected = (day: number) => {
    if (!checkin) return false;
    return new Date(viewYear, viewMonth, day).toDateString() ===
      new Date(checkin + "T00:00:00").toDateString();
  };

  const handleDateSelect = (day: number) => {
    if (isPast(day)) return;
    const dateStr = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    setCheckin(dateStr);
    setActiveTab(null);
  };

  useEffect(() => {
    if (!query || query.length < 1) {
      const timer = setTimeout(() => setSuggestions([]), 0);
      return () => clearTimeout(timer);
    }
    const timer = setTimeout(async () => {
      setIsSearching(true);
      const { data, error } = await supabase
        .from("locations")
        .select("id,name,code,type,region,country")
        .or(`name.ilike.%${query}%,code.ilike.%${query}%,search_terms.ilike.%${query}%`)
        .limit(7);
      if (!error && data) setSuggestions(data);
      setIsSearching(false);
    }, 280);
    return () => clearTimeout(timer);
  }, [query]);

  const handleFocus = (which: "origin" | "destination") => {
    setActiveInput(which);
    setQuery(which === "origin" ? origin : destination);
  };

  const handleChange = (which: "origin" | "destination", val: string) => {
    setActiveInput(which);
    setQuery(val);
    if (which === "origin") setOrigin(val);
    else setDestination(val);
  };

  const handleSelect = (loc: LocationRow) => {
    const displayName = loc.code ? `${loc.name} (${loc.code})` : loc.name;
    if (activeInput === "origin") {
      setOrigin(displayName);
      if (!destination) { setActiveInput("destination"); setQuery(""); }
      else { setActiveInput(null); setSuggestions([]); }
    } else {
      setDestination(displayName);
      setActiveInput(null);
      setSuggestions([]);
    }
  };

  const handleSearch = () => {
    const originText = origin || "my city";
    const destText   = destination || "anywhere";
    const dateText   = checkin
      ? new Date(checkin).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
      : "flexible dates";
    const kidsText  = children > 0 ? ` and ${children} child${children > 1 ? "ren" : ""}` : "";
    const message   = `Hi! I'm planning a trip from ${originText} to ${destText} around ${dateText}. We are ${adults} adult${adults > 1 ? "s" : ""}${kidsText}, looking to travel via ${transport}. Can an expert help me out?`;
    const url = `https://wa.me/918826048272?text=${encodeURIComponent(message)}`;
    window.location.assign(url);
  };

  const whereLabel = origin || destination
    ? `${origin || "Anywhere"} → ${destination || "Anywhere"}`
    : "Select destinations";

  const whenLabel = checkin
    ? new Date(checkin + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "short" })
    : "Any date";

  const TIcon = TRANSPORT_ICONS[transport];
  const showSuggestions = activeInput && (query.length >= 1 || suggestions.length > 0);

  return (
    <div
      className="max-w-[960px] w-full mx-auto px-4"
      ref={containerRef}
      style={{ position: "relative", zIndex: 50 }}
    >
      {/* ── Main Glass Bar — true frosted glass ── */}
      <div
        className="border border-white/20 rounded-2xl shadow-2xl p-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
        style={{
          background: "rgba(1, 40, 26, 0.58)", // Brand dark evergreen for high-contrast visibility against bright waterfalls
          backdropFilter: "blur(24px) saturate(1.3)",
          WebkitBackdropFilter: "blur(24px) saturate(1.3)",
          border: "1px solid rgba(212, 175, 55, 0.35)", // Subtle brand gold border for premium feel and clear boundary definition
          borderRadius: "16px",
          boxShadow: "0 12px 40px rgba(1, 32, 20, 0.45), inset 0 1px 0 rgba(255,255,255,0.05)",
          transition: "box-shadow 0.3s ease, border-color 0.3s ease",
        }}
      >
        {/* WHERE */}
        <button
          type="button"
          onClick={() => setActiveTab(activeTab === "where" ? null : "where")}
          className={`flex-1 flex items-center justify-between px-5 py-3.5 rounded-xl transition-all text-left ${
            activeTab === "where" ? "bg-white/15 shadow-inner" : "hover:bg-white/10 active:bg-white/15"
          }`}
        >
          <div className="flex flex-col gap-0.5">
            <span className="text-[#F4A011] text-[10px] font-bold uppercase tracking-widest">Where to?</span>
            <span className="text-white font-medium text-sm truncate max-w-[220px]">{whereLabel}</span>
          </div>
          <ChevronDown size={14} className={`text-white/40 ml-2 transition-transform ${activeTab === "where" ? "rotate-180" : ""}`} />
        </button>

        <div className="hidden sm:block w-px h-9 bg-white/15 self-center" />

        {/* WHEN */}
        <button
          type="button"
          onClick={() => setActiveTab(activeTab === "when" ? null : "when")}
          className={`flex-1 flex items-center justify-between px-5 py-3.5 rounded-xl transition-all text-left ${
            activeTab === "when" ? "bg-white/15 shadow-inner" : "hover:bg-white/10 active:bg-white/15"
          }`}
        >
          <div className="flex flex-col gap-0.5">
            <span className="text-[#F4A011] text-[10px] font-bold uppercase tracking-widest">When?</span>
            <span className="text-white font-medium text-sm flex items-center gap-1.5">
              <Calendar size={13} className="text-white/50" />
              {whenLabel}
            </span>
          </div>
          <ChevronDown size={14} className={`text-white/40 ml-2 transition-transform ${activeTab === "when" ? "rotate-180" : ""}`} />
        </button>

        <div className="hidden sm:block w-px h-9 bg-white/15 self-center" />

        {/* WHO & HOW */}
        <button
          type="button"
          onClick={() => setActiveTab(activeTab === "who" ? null : "who")}
          className={`flex-1 flex items-center justify-between px-5 py-3.5 rounded-xl transition-all text-left ${
            activeTab === "who" ? "bg-white/15 shadow-inner" : "hover:bg-white/10 active:bg-white/15"
          }`}
        >
          <div className="flex flex-col gap-0.5">
            <span className="text-[#F4A011] text-[10px] font-bold uppercase tracking-widest">Who &amp; How?</span>
            <span className="text-white font-medium text-sm flex items-center gap-1.5">
              <Users size={13} className="text-white/50" />
              {adults + children} traveller{adults + children !== 1 ? "s" : ""} {"\u00B7"} <TIcon size={13} className="text-white/50" /> {transport}
            </span>
          </div>
          <ChevronDown size={14} className={`text-white/40 ml-2 transition-transform ${activeTab === "who" ? "rotate-180" : ""}`} />
        </button>

        {/* CTA */}
        <button
          type="button"
          onClick={handleSearch}
          className="btn-plan-trip w-full sm:w-auto shrink-0 bg-[#F4A011] hover:bg-amber-400 active:bg-amber-500 text-[#013220] font-bold text-sm px-7 py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap shadow-lg active:scale-95"
        >
          Plan My Trip ✈
        </button>
      </div>

      {/* ── WHERE Dropdown — dark glass ── */}
      {activeTab === "where" && (
        <div
          className="absolute left-4 right-4 sm:left-0 sm:right-auto sm:w-[440px] mt-3 rounded-2xl shadow-2xl overflow-hidden p-5"
          style={{ zIndex: 60, ...GLASS_DROPDOWN }}
        >
          <div className="space-y-4">
            <LocationInput
              label="✈ Leaving From"
              placeholder="City, airport or code (e.g. IGI, DEL)…"
              value={activeInput === "origin" ? query : origin}
              icon={Navigation}
              isActive={activeInput === "origin"}
              onFocus={() => handleFocus("origin")}
              onChange={(v) => handleChange("origin", v)}
            />
            <LocationInput
              label="📍 Going To"
              placeholder="Destination (e.g. Meghalaya, Bali)…"
              value={activeInput === "destination" ? query : destination}
              icon={MapPin}
              isActive={activeInput === "destination"}
              onFocus={() => handleFocus("destination")}
              onChange={(v) => handleChange("destination", v)}
            />
          </div>

          {showSuggestions && (
            <div className="mt-4 border-t border-white/10 pt-3 max-h-[220px] overflow-y-auto">
              {isSearching ? (
                <div className="flex items-center gap-2 px-1 py-3">
                  <div className="w-4 h-4 border-2 border-[#F4A011]/30 border-t-[#F4A011] rounded-full animate-spin" />
                  <span className="text-xs text-white/40">Searching your database…</span>
                </div>
              ) : suggestions.length > 0 ? (
                <ul className="space-y-0.5">
                  {suggestions.map((loc) => (
                    <li
                      key={loc.id}
                      onMouseDown={(e) => { e.preventDefault(); handleSelect(loc); }}
                      className="px-3 py-2.5 hover:bg-white/10 rounded-xl cursor-pointer flex items-center justify-between group transition-colors"
                    >
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-bold text-white group-hover:text-[#F4A011] transition-colors truncate">{loc.name}</span>
                        <span className="text-[11px] text-white/40">{loc.region}, {loc.country} {"\u00B7"} {loc.type}</span>
                      </div>
                      {loc.code && (
                        <span className="ml-3 shrink-0 text-[11px] font-mono bg-white/10 px-2 py-0.5 rounded-md text-white/50 border border-white/10">
                          {loc.code}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-white/40 px-1 py-2">No results found. Try a different name or code.</p>
              )}
            </div>
          )}

          <button
            type="button"
            onMouseDown={(e) => { e.preventDefault(); closeWhere(); }}
            className="mt-4 w-full py-2.5 bg-[#F4A011] hover:bg-amber-400 text-[#013220] text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Check size={16} /> Done
          </button>
        </div>
      )}

      {/* ── WHEN — Calendar Dropdown (unchanged) ── */}
      {activeTab === "when" && (
        <div
          className="absolute left-4 right-4 sm:left-1/4 sm:right-auto sm:w-[320px] mt-3 rounded-2xl shadow-2xl overflow-hidden"
          style={{ zIndex: 60, ...GLASS_DROPDOWN }}
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
            <button
              type="button"
              onClick={prevMonth}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-[#F4A011] hover:bg-white/10 transition-all"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="text-[#F4A011] font-bold text-sm tracking-wide">
              {MONTH_NAMES[viewMonth]} {viewYear}
            </span>
            <button
              type="button"
              onClick={nextMonth}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-[#F4A011] hover:bg-white/10 transition-all"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="px-4 py-3">
            <div className="grid grid-cols-7 mb-2">
              {DAY_HEADERS.map(d => (
                <div key={d} className="text-center text-[10px] font-bold text-white/30 uppercase py-1">
                  {d}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-y-1">
              {calDays.map((day, i) => {
                if (!day) return <div key={`empty-${i}`} />;
                const past     = isPast(day);
                const todayDay = isToday(day);
                const selected = isSelected(day);
                return (
                  <button
                    key={day}
                    type="button"
                    disabled={past}
                    onClick={() => handleDateSelect(day)}
                    className={`
                      w-9 h-9 mx-auto rounded-full text-sm font-medium transition-all flex items-center justify-center
                      ${past
                        ? "text-white/20 cursor-not-allowed"
                        : selected
                          ? "bg-[#F4A011] text-[#013220] font-bold shadow-lg"
                          : todayDay
                            ? "border border-[#F4A011]/70 text-[#F4A011] hover:bg-[#F4A011]/20"
                            : "text-white hover:bg-white/15 cursor-pointer"
                      }
                    `}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between px-5 py-3 border-t border-white/10">
            <button
              type="button"
              onClick={() => { setCheckin(""); }}
              className="text-xs text-white/40 hover:text-white/70 transition-colors font-medium"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => setActiveTab(null)}
              className="flex items-center gap-1.5 text-xs font-bold text-[#F4A011] hover:text-amber-400 transition-colors"
            >
              <Check size={14} /> Done
            </button>
          </div>
        </div>
      )}

      {/* ── WHO & HOW Dropdown — dark glass ── */}
      {activeTab === "who" && (
        <div
          className="absolute right-4 left-4 sm:left-auto sm:right-0 sm:w-[340px] mt-3 rounded-2xl shadow-2xl overflow-hidden p-5"
          style={{ zIndex: 60, ...GLASS_DROPDOWN }}
        >
          <h4 className="text-[10px] font-bold text-[#F4A011]/70 uppercase tracking-wider mb-4">Travellers</h4>

          <div className="space-y-4 mb-5">
            {[
              { label: "Adults", sub: "Age 12+", count: adults, setCount: setAdults, min: 1 },
              { label: "Children", sub: "Age 0–11", count: children, setCount: setChildren, min: 0 },
            ].map(({ label, sub, count, setCount, min }) => (
              <div key={label} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-white">{label}</p>
                  <p className="text-[11px] text-white/40">{sub}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setCount(Math.max(min, count - 1))}
                    disabled={count <= min}
                    className="w-9 h-9 rounded-full border-2 border-white/20 flex items-center justify-center hover:border-[#F4A011] hover:text-[#F4A011] text-white font-bold text-lg transition-all cursor-pointer disabled:opacity-30"
                  >−</button>
                  <span className="w-5 text-center text-sm font-bold text-white">{count}</span>
                  <button
                    onClick={() => setCount(count + 1)}
                    className="w-9 h-9 rounded-full border-2 border-white/20 flex items-center justify-center hover:border-[#F4A011] hover:text-[#F4A011] text-white font-bold text-lg transition-all cursor-pointer"
                  >+</button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 mb-5" />

          <h4 className="text-[10px] font-bold text-[#F4A011]/70 uppercase tracking-wider mb-3">Preferred Transport</h4>
          <div className="grid grid-cols-3 gap-2 mb-5">
            {(["Flight", "Train", "Road"] as TransportMode[]).map((mode) => {
              const MIcon = TRANSPORT_ICONS[mode];
              const active = transport === mode;
              return (
                <button
                  key={mode}
                  onClick={() => setTransport(mode)}
                  className={`py-3 rounded-xl border-2 flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                    active
                      ? "border-[#F4A011] bg-[#F4A011]/15 text-[#F4A011] scale-[1.03] shadow-sm"
                      : "border-white/15 bg-white/5 text-white/50 hover:border-white/30 hover:text-white/80"
                  }`}
                >
                  <MIcon size={22} />
                  <span className="text-[11px] font-bold">{mode}</span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => setActiveTab(null)}
            className="w-full py-2.5 bg-[#F4A011] hover:bg-amber-400 text-[#013220] text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Check size={16} /> Done
          </button>
        </div>
      )}
    </div>
  );
}
