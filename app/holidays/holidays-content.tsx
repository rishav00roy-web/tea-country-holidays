"use client"

import { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import { Clock, ArrowRight, Search, MessageCircle, X, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Package } from "@/lib/packages-data"

function optimizeUnsplashUrl(url: string) {
  if (url && (url.includes("images.unsplash.com") || url.includes("plus.unsplash.com"))) {
    try {
      const baseUrl = url.split("?")[0];
      return `${baseUrl}?w=400&q=65&auto=format`;
    } catch {
      return url;
    }
  }
  return url || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&q=65&auto=format";
}

function getPackageHighlights(pkg: Package): string[] {
  const title = pkg.title.toLowerCase();
  const theme = pkg.theme.toLowerCase();
  
  if (title.includes("meghalaya")) {
    return [
      "Trek to the Double Decker Living Root Bridge in Nongriat",
      "Explore the limestone caves of Mawsmai and Arwah",
      "Witness Nohkalikai and Seven Sisters waterfalls cascading down green cliffs",
      "Enjoy crystal-clear water boating at Dawki on Umngot River"
    ];
  }
  if (title.includes("kaziranga")) {
    return [
      "Elephant Safari / Jeep Safari in Kaziranga National Park",
      "Spot the endangered Indian One-Horned Rhinoceros",
      "Explore local Orchid Park and experience traditional Assamese culture",
      "Bird watching and river sightseeing along the Brahmaputra"
    ];
  }
  if (title.includes("tawang")) {
    return [
      "Visit the iconic Tawang Monastery (second largest in the world)",
      "Cross the scenic, snow-covered Sela Pass at 13,700 feet",
      "Explore Madhuri Lake and witness the majestic Nuranang Falls",
      "Pay tribute at the historic Jaswant Garh War Memorial"
    ];
  }
  if (title.includes("darjeeling") || title.includes("gangtok")) {
    return [
      "Spectacular sunrise views over Mt. Kanchenjunga from Tiger Hill",
      "Joyride on the historic UNESCO-listed Himalayan Toy Train",
      "Visit world-famous lush green Darjeeling tea gardens",
      "Explore peaceful Tibetan Buddhist monasteries in Gangtok"
    ];
  }
  if (title.includes("kerala")) {
    return [
      "Overnight cruise on a traditional luxury houseboat in Alleppey backwaters",
      "Walk through the sprawling tea estates and misty hills of Munnar",
      "Spot wildlife at Periyar Lake National Park in Thekkady",
      "Sunbathe and relax on the golden shores of Kovalam Beach"
    ];
  }
  if (title.includes("dubai")) {
    return [
      "Burj Khalifa observation deck entry with stunning panoramic views",
      "Thrilling Red Dune Desert Safari with BBQ Dinner & Tanoura Show",
      "Shop at Dubai Mall and watch the majestic Fountain Show",
      "Dhow Cruise Marina dinner with glittering skyscraper backdrops"
    ];
  }
  if (title.includes("bali")) {
    return [
      "Visit cliffside Uluwatu Temple and iconic Tanah Lot sea temple",
      "Tour Ubud's sacred monkey forest and Tegalalang rice terraces",
      "Sunset seafood dinner on the white sand shores of Jimbaran Bay",
      "Explore traditional Balinese art villages and local markets"
    ];
  }
  if (title.includes("rajasthan") || title.includes("jaipur") || title.includes("udaipur") || title.includes("ranthambore") || title.includes("triangle")) {
    return [
      "Guided tours of Amber Fort, Hawa Mahal, and Jaipur City Palace",
      "Thrilling tiger safari in Ranthambore National Park (if in package)",
      "Romantic sunset boat cruise on Lake Pichola in Udaipur",
      "Camel ride and desert camping under the stars in Jaisalmer"
    ];
  }
  if (theme.includes("pilgrimage") || title.includes("temple") || title.includes("yatra") || title.includes("devi")) {
    return [
      "Seamless VIP darshan arrangements at holy shrines",
      "Participation in evening Ganga Aarti / temple prayers",
      "Comfortable lodging located close to temple premises",
      "Explore sacred nearby historical and spiritual landmarks"
    ];
  }
  
  // Default highlights
  return [
    "Curated sightseeing itineraries with experienced local drivers/guides",
    "Handpicked hotels and accommodations with complimentary breakfast",
    "Private air-conditioned vehicle for all transfers and excursions",
    "24/7 on-trip support from Tea Country Holidays experts"
  ];
}

interface PackageModalProps {
  pkg: Package;
  isOpen: boolean;
  onClose: () => void;
}

function PackageModal({ pkg, isOpen, onClose }: PackageModalProps) {
  const [currentImgIdx, setCurrentImgIdx] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const imagesList = pkg.images && pkg.images.length > 0 ? pkg.images : [pkg.image];
  const highlights = getPackageHighlights(pkg);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in">
      {/* Modal Container */}
      <div className="bg-white dark:bg-[#12291f] rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-w-4xl w-full max-h-[90vh] md:max-h-[85vh] relative animate-in zoom-in-95 duration-200 border border-[#F4A011]/25">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 bg-black/40 hover:bg-black/60 md:bg-[#D8F3DC] md:hover:bg-[#1B4332] md:text-[#1B4332] md:hover:text-white text-white rounded-full transition-all shadow-md cursor-pointer"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Left Side: Package Image / Carousel */}
        <div className="w-full md:w-1/2 relative bg-gray-50 flex flex-col justify-center min-h-[220px] md:min-h-[400px]">
          <div className="relative w-full h-full min-h-[220px] md:min-h-[400px] overflow-hidden">
            <Image
              src={optimizeUnsplashUrl(imagesList[currentImgIdx])}
              alt={pkg.alt || pkg.title}
              fill
              className="object-cover transition-all duration-500"
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={50}
            />
            {/* Theme tag */}
            <div className="absolute top-4 left-4 bg-[#F4A011] text-white text-xs font-semibold px-3 py-1 rounded-full z-10 shadow-sm">
              {pkg.theme}
            </div>

            {/* Navigation Arrows */}
            {imagesList.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentImgIdx((prev) => (prev === 0 ? imagesList.length - 1 : prev - 1))}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-all z-10 cursor-pointer text-sm font-bold"
                >
                  &larr;
                </button>
                <button
                  onClick={() => setCurrentImgIdx((prev) => (prev === imagesList.length - 1 ? 0 : prev + 1))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-all z-10 cursor-pointer text-sm font-bold"
                >
                  &rarr;
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                  {imagesList.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImgIdx(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === currentImgIdx ? "bg-[#F4A011] w-5" : "bg-white/50 w-1.5"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Side: Package details */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[60vh] md:max-h-full">
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs">
              <span className="font-semibold text-[#F4A011] uppercase tracking-widest">{pkg.theme}</span>
              <span className="text-gray-300 dark:text-gray-600">•</span>
              <span className="font-medium text-gray-500 dark:text-gray-400">{pkg.duration}</span>
            </div>

            <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#1B4332] dark:text-[#faf8f3] mb-3 leading-tight">
              {pkg.title}
            </h2>

            <p className="text-gray-600 dark:text-white/70 text-sm mb-6 leading-relaxed">
              {pkg.description}
            </p>

            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1B4332] dark:text-[#F4A011] mb-3.5 flex items-center gap-1.5">
                <span>Highlights & Sightseeing</span>
              </h3>
              <ul className="space-y-3">
                {highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-600 dark:text-white/80 leading-relaxed">
                    <CheckCircle className="h-4.5 w-4.5 text-[#F4A011] shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-4 border-t border-gray-100 dark:border-white/10 pt-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#1B4332] dark:text-white/60 mb-3">Inclusions</h3>
              <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-xs text-gray-500 dark:text-white/50 font-semibold">
                <div className="flex items-center gap-1.5">✓ Hotels & Lodging</div>
                <div className="flex items-center gap-1.5">✓ Daily Breakfast</div>
                <div className="flex items-center gap-1.5">✓ Private AC Cab</div>
                <div className="flex items-center gap-1.5">✓ Toll & Driver Allowances</div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-gray-100 dark:border-white/10 flex flex-col gap-3">
            <a
              href={`https://wa.me/918826048272?text=${encodeURIComponent(
                `Hi, I'm interested in the ${pkg.title} package (${pkg.duration}). Please send me a quote and detailed itinerary.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#1B4332] hover:bg-[#1B4332]/95 active:bg-[#1B4332] text-white text-xs font-bold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer uppercase tracking-wider text-center"
            >
              Get Quote
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function PackageCard({ pkg }: { pkg: Package }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const imagesList = useMemo(() => pkg.images && pkg.images.length > 0 ? pkg.images : [pkg.image], [pkg.images, pkg.image]);

  useEffect(() => {
    if (!hovered || imagesList.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % imagesList.length);
    }, 1500);
    return () => clearInterval(interval);
  }, [hovered, imagesList]);

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => {
    setHovered(false);
    setCurrentIdx(0);
  };

  return (
    <>
      <div 
        className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative h-56 overflow-hidden bg-gray-50 shrink-0">
          {imagesList[currentIdx] && (
            <Image
              src={optimizeUnsplashUrl(imagesList[currentIdx])}
              alt={pkg.alt || pkg.title}
              fill
              loading="lazy"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              quality={50}
              className="object-cover transition-all duration-700 absolute inset-0 w-full h-full opacity-100 scale-100"
            />
          )}
          <div className="absolute top-4 left-4 bg-[#F4A011] text-white text-xs font-semibold px-3 py-1 rounded-full z-10">
            {pkg.theme}
          </div>
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-[#1C1C1E] text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5 z-10">
            <Clock className="h-3.5 w-3.5" />
            {pkg.duration}
          </div>
          {imagesList.length > 1 && (
            <div className="absolute bottom-4 right-4 flex gap-1 z-10">
              {imagesList.map((_, idx) => (
                <div 
                  key={idx} 
                  className={cn(
                    "h-1.5 w-3 rounded-full transition-all duration-300",
                    idx === currentIdx ? "bg-[#F4A011] w-5" : "bg-white/50"
                  )}
                />
              ))}
            </div>
          )}
        </div>
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div className="flex flex-col gap-1">
            <h3 className="font-serif text-xl font-semibold text-[#1B4332] mb-2 line-clamp-2 min-h-[3.25rem] flex items-center">{pkg.title}</h3>
            <p className="text-[#1C1C1E]/60 text-sm mb-4 line-clamp-3">{pkg.description}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2.5 mt-auto pt-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex-1 bg-[#1B4332] text-white text-sm font-medium py-3 sm:py-2.5 rounded-lg hover:bg-[#1B4332]/90 active:bg-[#1B4332] transition-colors flex items-center justify-center gap-2 cursor-pointer min-h-[44px] text-center"
            >
              Get More Info <ArrowRight className="h-4 w-4 shrink-0" />
            </button>
            <a
              href={`https://wa.me/918826048272?text=${encodeURIComponent(
                `Hi, I'm interested in the ${pkg.title} package. Please send me a quote.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-white text-[#1B4332] border-2 border-[#F4A011] text-sm font-semibold py-3 sm:py-2.5 rounded-lg hover:bg-[#1B4332] hover:text-white hover:border-[#1B4332] transition-all cursor-pointer min-h-[44px] uppercase tracking-wide flex items-center justify-center text-center"
            >
              Get Quote
            </a>
          </div>
        </div>
      </div>

      <PackageModal 
        pkg={pkg}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}


import { useSearchParams } from "next/navigation"

const filters = ["All", "Domestic", "International", "Beach", "Honeymoon", "Adventure", "Pilgrimage", "Heritage", "Nature"]

export default function HolidaysContent({ 
  initialPackages 
}: { 
  initialPackages: Package[]
}) {
  const searchParams = useSearchParams()
  const initialDestination = searchParams?.get("destination") || ""

  const [activeFilter, setActiveFilter] = useState("All")
  const [search, setSearch] = useState(initialDestination)

  const filtered = initialPackages.filter(pkg => {
    // Handle both array categories (fallback data) and string categories (Supabase data)
    const cat = pkg.category as unknown
    let matchesFilter = false
    if (activeFilter === "All") {
      matchesFilter = true
    } else if (Array.isArray(cat)) {
      matchesFilter = cat.includes(activeFilter)
    } else if (typeof cat === "string") {
      matchesFilter = cat.toLowerCase().includes(activeFilter.toLowerCase())
    }

    const matchesSearch = !search
      ? true
      : pkg.title.toLowerCase().includes(search.toLowerCase()) ||
        (pkg.theme && pkg.theme.toLowerCase().includes(search.toLowerCase())) ||
        (pkg.description && pkg.description.toLowerCase().includes(search.toLowerCase()))

    return matchesFilter && matchesSearch
  })

  return (
    <main className="min-h-screen bg-white">
      <div className="bg-[#1B4332] pt-32 pb-16 px-4">
        <div className="mx-auto max-w-7xl">
          <span className="text-[#F4A011] font-semibold text-xs tracking-[0.25em] uppercase mb-4 block">
            EXPLORE HOLIDAYS
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-normal text-white mb-4 leading-tight">
            Find Your Perfect <span className="italic text-[#F4A011]">Holiday</span>
          </h1>
          <p className="text-white/70 max-w-xl">
            Handpicked packages across India and the world. 
            Get a personalised quote from our travel experts.
          </p>
          
          <form role="search" className="mt-8 flex gap-3 max-w-lg" onSubmit={e => e.preventDefault()}>
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#1B4332]/50" />
              <input
                type="search"
                name="destination"
                placeholder="Search destinations or themes..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                autoComplete="destination"
                autoCorrect="on"
                spellCheck={true}
                className="w-full pl-10 pr-4 py-3 border border-gray-400 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B4332]/30 focus:border-[#1B4332] shadow-sm text-gray-900 placeholder:text-gray-500 font-medium"
              />
            </div>
          </form>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
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

        {filtered.length === 0 ? (
          <div className="text-center py-20 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#1B4332]/8 flex items-center justify-center mx-auto mb-5">
              <Search className="w-7 h-7 text-[#1B4332]/40" />
            </div>
            <h3 className="font-serif text-2xl text-[#1B4332] mb-2">
              No packages found{search ? ` for "${search}"` : ""}
            </h3>
            <p className="text-[#1C1C1E]/50 text-sm mb-2">
              We may not have a listed package for this destination yet —
              but that doesn&apos;t mean we can&apos;t make it happen.
            </p>
            <p className="text-[#1C1C1E]/40 text-sm mb-8">
              Manami and the team specialise in custom itineraries. Tell us where you want to go and we&apos;ll build the perfect trip around you.
            </p>
            <a
              href={`https://wa.me/918826048272?text=${encodeURIComponent(
                `Hi Manami, I searched for "${search || "a destination"}" on your holidays page but couldn't find a matching package. Can you help me plan a custom trip?`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#1B4332] text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-[#1B4332]/90 transition-colors cursor-pointer shadow-sm min-h-[44px]"
            >
              <MessageCircle className="w-4 h-4" />
              Message Manami on WhatsApp
            </a>
            <p className="text-[#1C1C1E]/30 text-xs mt-4">Replies within minutes · No booking fees</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(pkg => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
