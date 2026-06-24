"use client"
import { useState } from "react"
import Image from "next/image"
import { Clock, ArrowRight, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuthGate } from "@/hooks/use-auth-gate"

import { Package } from "@/lib/packages-data"

function optimizeUnsplashUrl(url: string) {
  if (url.includes("images.unsplash.com")) {
    try {
      const baseUrl = url.split("?")[0];
      return `${baseUrl}?w=400&q=65&auto=format`;
    } catch {
      return url;
    }
  }
  return url;
}

const filters = ["All", "Domestic", "International", "Beach", "Honeymoon", "Adventure", "Pilgrimage"]

export default function HolidaysContent({ 
  initialDestination = "", 
  initialPackages 
}: { 
  initialDestination?: string
  initialPackages: Package[]
}) {
  const [activeFilter, setActiveFilter] = useState("All")
  const [search, setSearch] = useState(initialDestination)
  const { gatedWhatsApp } = useAuthGate()

  const filtered = initialPackages.filter(pkg => {
    const matchesFilter = activeFilter === "All" || pkg.category.includes(activeFilter)
    const matchesSearch = !search
      ? true
      : pkg.title.toLowerCase().includes(search.toLowerCase()) ||
        pkg.theme.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div className="bg-[#1B4332] pt-32 pb-16 px-4">
        <div className="mx-auto max-w-7xl">
          <span className="text-[#F4A011] font-semibold text-xs tracking-[0.25em] uppercase mb-4 block">
            EXPLORE HOLIDAYS
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-white mb-4 leading-tight">
            Find Your Perfect <span className="italic text-[#F4A011]">Holiday</span>
          </h1>
          <p className="text-white/70 max-w-xl">
            Handpicked packages across India and the world. 
            Get a personalised quote from our travel experts.
          </p>
          
          {/* Search bar */}
          <div className="mt-8 flex gap-3 max-w-lg">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#1B4332]/50" />
              <input
                type="text"
                placeholder="Search destinations or themes..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                autoCorrect="on"
                autoComplete="on"
                spellCheck={true}
                className="w-full pl-10 pr-4 py-3 border border-gray-400 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B4332]/30 focus:border-[#1B4332] shadow-sm text-gray-900 placeholder:text-gray-500 font-medium"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-full transition-colors cursor-pointer",
                activeFilter === f
                  ? "bg-[#1B4332] text-white"
                  : "bg-[#D8F3DC] text-[#1B4332] hover:bg-[#1B4332]/10"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Package grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#1C1C1E]/60 text-lg mb-2">No packages found.</p>
            <p className="text-[#1C1C1E]/40 text-sm mb-6">
              Let us create a custom itinerary for you.
            </p>
            <button
              onClick={() => gatedWhatsApp(
                `Hi, I'm looking for a custom holiday package. Can you help me plan my trip?`
              )}
              className="bg-[#F4A011] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#F4A011]/90 transition-colors cursor-pointer"
            >
              Get Custom Quote
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(pkg => (
              <div key={pkg.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col">
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={optimizeUnsplashUrl(pkg.image)}
                    alt={pkg.title}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={65}
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 bg-[#F4A011] text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {pkg.theme}
                  </div>
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-[#1C1C1E] text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {pkg.duration}
                  </div>
                </div>
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-[#1B4332] mb-2">{pkg.title}</h3>
                    <p className="text-[#1C1C1E]/60 text-sm mb-4">{pkg.description}</p>
                  </div>
                  <div className="flex gap-3 mt-auto">
                    <button
                      onClick={() => gatedWhatsApp(
                        `Hi, I'd like to know more about the ${pkg.title} package (${pkg.duration}). Please share the full itinerary and pricing.`
                      )}
                      className="flex-1 bg-[#1B4332] text-white text-sm font-medium py-2.5 rounded-lg hover:bg-[#1B4332]/90 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      View Details <ArrowRight className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => gatedWhatsApp(
                        `Hi, I'm interested in the ${pkg.title} package. Please send me a quote.`
                      )}
                      className="btn-pill flex-1"
                    >
                      Get Quote
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
