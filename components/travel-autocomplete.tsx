"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import { ChevronDown, Loader2 } from "lucide-react";
// supabase imported dynamically to optimize bundle load size

type TravelAutocompleteProps = {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  icon: ComponentType<{ className?: string; size?: number }>;
  iconClassName?: string;
};

type Suggestion = {
  id: number;
  name: string;
  code: string;
  type: string;
  region: string;
  country: string;
};

const cache = new Map<string, Suggestion[]>();

function escapeLike(value: string) {
  return value.replace(/[%_\\]/g, "\\$&").replace(/\s+/g, " ").trim();
}

function buildLabel(item: Suggestion) {
  return item.code ? `${item.name} (${item.code})` : item.name;
}

export default function TravelAutocomplete({
  label,
  placeholder,
  value,
  onChange,
  icon: Icon,
  iconClassName,
}: TravelAutocompleteProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const requestIdRef = useRef(0);

  useEffect(() => {
    const onDocClick = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  useEffect(() => {
    if (!open) return;

    const query = value.trim();
    if (query.length < 2) return;

    const cached = cache.get(query.toLowerCase());
    if (cached) {
      const cachedTimer = window.setTimeout(() => {
        setSuggestions(cached);
        setLoading(false);
      }, 0);
      return () => window.clearTimeout(cachedTimer);
    }

    const requestId = ++requestIdRef.current;
    const timer = window.setTimeout(async () => {
      const q = escapeLike(query);
      const { supabase } = await import("@/lib/supabase");
      const { data, error } = await supabase
        .from("locations")
        .select("id,name,code,type,region,country")
        .or(`name.ilike.%${q}%,code.ilike.%${q}%,search_terms.ilike.%${q}%`)
        .limit(10);

      if (requestIdRef.current !== requestId) return;

      const next = (!error && data ? data : []) as Suggestion[];
      cache.set(query.toLowerCase(), next);
      setSuggestions(next);
      setLoading(false);
    }, 160);

    return () => window.clearTimeout(timer);
  }, [open, value]);

  const pick = (item: Suggestion) => {
    onChange(buildLabel(item));
    setOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative">
      <label className="block text-xs font-bold text-[#1B4332] uppercase tracking-wider mb-2">
        {label}
      </label>
      <div className="relative">
        <Icon className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1B4332]/50 ${iconClassName ?? ""}`} />
        <input
          type="text"
          value={value}
          onChange={(event) => {
            const nextValue = event.target.value;
            onChange(nextValue);
            if (nextValue.trim().length < 2) {
              setSuggestions([]);
              setLoading(false);
            } else {
              setLoading(true);
            }
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          autoCorrect="off"
          autoComplete="off"
          spellCheck={false}
          className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20 focus:border-[#1B4332] text-sm text-[#1C1C1E]"
        />
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin text-[#1B4332]/35" />
          ) : (
            <ChevronDown className="h-4 w-4 text-[#1B4332]/35" />
          )}
        </div>
      </div>

      {open && suggestions.length > 0 && (
        <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl">
          {suggestions.map((item) => (
            <button
              key={item.id}
              type="button"
              onMouseDown={(event) => {
                event.preventDefault();
                pick(item);
              }}
              className="w-full px-4 py-3 text-left hover:bg-[#1B4332]/5 flex items-start justify-between gap-4"
            >
              <div className="min-w-0">
                <div className="text-sm font-semibold text-[#1B4332] truncate">{item.name}</div>
                <div className="text-xs text-[#1C1C1E]/50 truncate">{item.region}, {item.country}</div>
              </div>
              <span className="shrink-0 rounded-md bg-[#D8F3DC] px-2 py-1 text-[11px] font-bold text-[#1B4332]">
                {item.code}
              </span>
            </button>
          ))}
        </div>
      )}

      {open && !loading && value.trim().length >= 2 && suggestions.length === 0 && (
        <div className="absolute z-30 mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-[#1C1C1E]/50 shadow-xl">
          No matches found.
        </div>
      )}
    </div>
  );
}
