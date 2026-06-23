import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Search } from "lucide-react"

export default function HolidaysLoading() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
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
          
          {/* Search bar skeleton */}
          <div className="mt-8 flex gap-3 max-w-lg">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#1B4332]/50" />
              <input
                type="text"
                disabled
                placeholder="Search destinations or themes..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 bg-gray-100/50 rounded-lg focus:outline-none shadow-sm text-gray-400 placeholder:text-gray-400 font-medium cursor-not-allowed"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter tabs skeleton */}
        <div className="flex flex-wrap gap-2 mb-10">
          {["All", "Domestic", "International", "Beach", "Honeymoon", "Adventure", "Pilgrimage"].map((f, i) => (
            <div
              key={i}
              className="px-4 py-2 text-sm font-medium rounded-full bg-gray-200 text-transparent animate-pulse select-none"
            >
              {f}
            </div>
          ))}
        </div>

        {/* Package grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col animate-pulse">
              {/* Image Skeleton */}
              <div className="relative h-56 bg-gray-200" />
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  {/* Title Skeleton */}
                  <div className="h-6 bg-gray-200 rounded-md w-3/4 mb-3" />
                  {/* Description Skeletons */}
                  <div className="h-4 bg-gray-200 rounded-md w-full mb-2" />
                  <div className="h-4 bg-gray-200 rounded-md w-5/6 mb-4" />
                </div>
                {/* Buttons Skeletons */}
                <div className="flex gap-3 mt-auto pt-4">
                  <div className="flex-1 h-10 bg-gray-200 rounded-lg" />
                  <div className="flex-1 h-10 bg-gray-200 rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  )
}
