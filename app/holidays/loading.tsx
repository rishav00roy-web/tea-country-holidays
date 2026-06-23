import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function Loading() {
  return (
    <main className="min-h-screen bg-white flex flex-col w-full">
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
          <div className="mt-8 flex gap-3 max-w-lg animate-pulse">
            <div className="h-12 bg-white/20 rounded-lg w-full" />
          </div>
        </div>
      </div>

      <div className="flex-1 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Filter tabs skeleton */}
        <div className="flex flex-wrap gap-2 mb-10 animate-pulse">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="h-9 bg-gray-200 rounded-full w-24" />
          ))}
        </div>

        {/* Package grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-xl overflow-hidden border border-gray-100 flex flex-col">
              <div className="h-52 bg-gray-200 animate-pulse w-full" />
              <div className="p-4 space-y-3 flex-1">
                <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4" />
                <div className="h-4 bg-gray-100 rounded animate-pulse w-1/2" />
                <div className="h-4 bg-gray-100 rounded animate-pulse w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
