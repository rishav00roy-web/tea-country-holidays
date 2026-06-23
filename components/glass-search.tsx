"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { MapPin, Calendar, Users, Plane, Train, Car, Navigation, Check, ChevronDown } from "lucide-react";
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

// ─── Custom Hooks ──────────────────────────────────────────────────────────

function useOnClickOutside(ref: React.RefObject<HTMLElement | null>, handler: () => void) {
  // useCallback ensures the same reference is used — prevents infinite effect loops
  const stableHandler = useCallback(handler, []); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    const listener = (e: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) return;
      stableHandler();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener, { passive: true });
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, stableHandler]);
}

// ─── Sub-components ────────────────────────────────────────────────────────

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
      <label className="text-[10px] font-bold text-brand-evergreen/50 uppercase tracking-wider block mb-1.5">
        {label}
      </label>
      <div className="relative">
        <Icon size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-evergreen/40 pointer-events-none" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          placeholder={placeholder}
          className={`w-full pl-9 pr-4 py-3 bg-gray-50 rounded-xl text-sm font-medium outline-none transition-all text-brand-ink border ${
            isActive
              ? "border-brand-gold ring-2 ring-brand-gold/20 bg-white"
              : "border-gray-200 hover:border-gray-300"
          }`}
        />
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────

export default function GlassSearch() {
  const [activeTab, setActiveTab] = useState<"where" | "who" | null>(null);

  // Form state
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [checkin, setCheckin] = useState("");
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [transport, setTransport] = useState<TransportMode>("Flight");

  // Autocomplete state
  const [activeInput, setActiveInput] = useState<"origin" | "destination" | null>(null);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<LocationRow[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(containerRef, () => setActiveTab(null));

  // Close "where" dropdown also clears active input
  const closeWhere = useCallback(() => {
    setActiveTab(null);
    setActiveInput(null);
    setQuery("");
    setSuggestions([]);
  }, []);

  // ── Debounced Supabase search ──────────────────────────────────────────
  useEffect(() => {
    if (!query || query.length < 1) {
      setSuggestions([]);
      return;
    }
    const timer = setTimeout(async () => {
      setIsSearching(true);
      // Search across name, code, AND search_terms for the best coverage
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

  // When user focuses an input, pre-populate the query with current value
  const handleFocus = (which: "origin" | "destination") => {
    setActiveInput(which);
    setQuery(which === "origin" ? origin : destination);
  };

  const handleChange = (which: "origin" | "destination", val: string) => {
    setActiveInput(which);
    setQuery(val);
    // Also update the real field so it reflects the typed text until a suggestion is picked
    if (which === "origin") setOrigin(val);
    else setDestination(val);
  };

  const handleSelect = (loc: LocationRow) => {
    const displayName = loc.code ? `${loc.name} (${loc.code})` : loc.name;
    if (activeInput === "origin") {
      setOrigin(displayName);
      // Auto-focus destination if still empty
      if (!destination) {
        setActiveInput("destination");
        setQuery("");
      } else {
        setActiveInput(null);
        setSuggestions([]);
      }
    } else {
      setDestination(displayName);
      setActiveInput(null);
      setSuggestions([]);
    }
  };

  // ── WhatsApp message generator ─────────────────────────────────────────
  const handleSearch = () => {
    const originText  = origin || "my city";
    const destText    = destination || "anywhere";
    const dateText    = checkin ? new Date(checkin).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) : "flexible dates";
    const kidsText    = children > 0 ? ` and ${children} child${children > 1 ? "ren" : ""}` : "";
    const message     = `Hi! I'm planning a trip from ${originText} to ${destText} around ${dateText}. We are ${adults} adult${adults > 1 ? "s" : ""}${kidsText}, looking to travel via ${transport}. Can an expert help me out?`;
    window.open(`https://wa.me/918826048272?text=${encodeURIComponent(message)}`, "_blank");
  };

  // ── Derived display values ─────────────────────────────────────────────
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
      {/* ── Main Glass Bar ── */}
      <div className="backdrop-blur-md bg-[#1B4332]/90 border border-[#F4A011]/30 rounded-2xl shadow-2xl p-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">

        {/* WHERE */}
        <button
          type="button"
          onClick={() => setActiveTab(activeTab === "where" ? null : "where")}
          className={`flex-1 flex items-center justify-between px-5 py-3.5 rounded-xl transition-all text-left ${
            activeTab === "where" ? "bg-white/20 shadow-inner" : "hover:bg-white/10 active:bg-white/15"
          }`}
        >
          <div className="flex flex-col gap-0.5">
            <span className="text-[#F4A011] text-[10px] font-bold uppercase tracking-widest">Where to?</span>
            <span className="text-white font-medium text-sm truncate max-w-[220px]">{whereLabel}</span>
          </div>
          <ChevronDown size={14} className={`text-white/40 ml-2 transition-transform ${activeTab === "where" ? "rotate-180" : ""}`} />
        </button>

        <div className="hidden sm:block w-px h-9 bg-white/15 self-center" />

        {/* WHEN — inline date picker, no extra dropdown needed */}
        <div className="flex-1 px-5 py-3.5 rounded-xl hover:bg-white/10 transition-all flex flex-col gap-0.5 cursor-pointer relative">
          <label htmlFor="gs-checkin" className="text-[#F4A011] text-[10px] font-bold uppercase tracking-widest cursor-pointer">
            When?
          </label>
          <div className="flex items-center gap-2">
            <Calendar size={13} className="text-white/50 pointer-events-none shrink-0" />
            <span className={`text-sm font-medium ${checkin ? "text-white" : "text-white/50"} pointer-events-none select-none`}>
              {whenLabel}
            </span>
          </div>
          {/* Invisible date input covers the whole tile for the native picker */}
          <input
            id="gs-checkin"
            type="date"
            value={checkin}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setCheckin(e.target.value)}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>

        <div className="hidden sm:block w-px h-9 bg-white/15 self-center" />

        {/* WHO & HOW */}
        <button
          type="button"
          onClick={() => setActiveTab(activeTab === "who" ? null : "who")}
          className={`flex-1 flex items-center justify-between px-5 py-3.5 rounded-xl transition-all text-left ${
            activeTab === "who" ? "bg-white/20 shadow-inner" : "hover:bg-white/10 active:bg-white/15"
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
          className="w-full sm:w-auto shrink-0 bg-[#F4A011] hover:bg-amber-400 active:bg-amber-500 text-[#1B4332] font-bold text-sm px-7 py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 whitespace-nowrap shadow-lg active:scale-95"
        >
          Plan My Trip ✈
        </button>
      </div>

      {/* ── WHERE Dropdown ── */}
      {activeTab === "where" && (
        <div
          className="absolute left-4 right-4 sm:left-0 sm:right-auto sm:w-[440px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 mt-3"
          style={{ zIndex: 60 }}
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

          {/* Suggestions list */}
          {showSuggestions && (
            <div className="mt-4 border-t border-gray-100 pt-3 max-h-[220px] overflow-y-auto">
              {isSearching ? (
                <div className="flex items-center gap-2 px-1 py-3">
                  <div className="w-4 h-4 border-2 border-brand-gold/30 border-t-brand-gold rounded-full animate-spin" />
                  <span className="text-xs text-gray-400">Searching your database…</span>
                </div>
              ) : suggestions.length > 0 ? (
                <ul className="space-y-0.5">
                  {suggestions.map((loc) => (
                    <li
                      key={loc.id}
                      onMouseDown={(e) => { e.preventDefault(); handleSelect(loc); }}
                      className="px-3 py-2.5 hover:bg-brand-varden rounded-xl cursor-pointer flex items-center justify-between group transition-colors"
                    >
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-bold text-brand-evergreen group-hover:text-brand-gold transition-colors truncate">{loc.name}</span>
                        <span className="text-[11px] text-gray-400">{loc.region}, {loc.country} {"\u00B7"} {loc.type}</span>
                      </div>
                      {loc.code && (
                        <span className="ml-3 shrink-0 text-[11px] font-mono bg-brand-evergreen/5 px-2 py-0.5 rounded-md text-brand-evergreen/50 border border-brand-evergreen/10">
                          {loc.code}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-gray-400 px-1 py-2">No results found. Try a different name or code.</p>
              )}
            </div>
          )}

          {/* Done button */}
          <button
            type="button"
            onMouseDown={(e) => { e.preventDefault(); closeWhere(); }}
            className="mt-4 w-full py-2.5 bg-brand-evergreen hover:bg-brand-green text-white text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Check size={16} /> Done
          </button>
        </div>
      )}

      {/* ── WHO & HOW Dropdown ── */}
      {activeTab === "who" && (
        <div
          className="absolute right-4 left-4 sm:left-auto sm:right-0 sm:w-[340px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 mt-3"
          style={{ zIndex: 60 }}
        >
          {/* Travellers */}
          <h4 className="text-[10px] font-bold text-brand-evergreen/50 uppercase tracking-wider mb-4">Travellers</h4>
          <div className="space-y-4 mb-5">
            {[
              { label: "Adults", sub: "Age 12+", count: adults, setCount: setAdults, min: 1 },
              { label: "Children", sub: "Age 0–11", count: children, setCount: setChildren, min: 0 },
            ].map(({ label, sub, count, setCount, min }) => (
              <div key={label} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-brand-ink">{label}</p>
                  <p className="text-[11px] text-gray-400">{sub}</p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setCount(Math.max(min, count - 1))}
                    className="w-9 h-9 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-brand-gold hover:text-brand-gold text-brand-evergreen font-bold text-lg transition-all cursor-pointer disabled:opacity-30"
                    disabled={count <= min}
                  >
                    −
                  </button>
                  <span className="w-5 text-center text-sm font-bold text-brand-ink">{count}</span>
                  <button
                    onClick={() => setCount(count + 1)}
                    className="w-9 h-9 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-brand-gold hover:text-brand-gold text-brand-evergreen font-bold text-lg transition-all cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          <hr className="border-gray-100 mb-5" />

          {/* Transport mode */}
          <h4 className="text-[10px] font-bold text-brand-evergreen/50 uppercase tracking-wider mb-3">Preferred Transport</h4>
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
                      ? "border-brand-gold bg-amber-50 text-brand-gold scale-[1.03] shadow-sm"
                      : "border-gray-200 bg-white text-gray-400 hover:border-gray-300"
                  }`}
                >
                  <MIcon size={22} />
                  <span className="text-[11px] font-bold">{mode}</span>
                </button>
              );
            })}
          </div>

          {/* Done */}
          <button
            type="button"
            onClick={() => setActiveTab(null)}
            className="w-full py-2.5 bg-brand-evergreen hover:bg-brand-green text-white text-sm font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Check size={16} /> Done
          </button>
        </div>
      )}
    </div>
  );
}
