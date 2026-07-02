export default function FlightsLoading() {
  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      
      {/* Hero Banner */}
      <div className="bg-[#1B4332] pt-32 pb-16 px-4">
        <div className="mx-auto max-w-7xl">
          <span className="text-[#F4A011] font-semibold text-xs tracking-[0.25em] uppercase mb-4 block">
            FLIGHT BOOKINGS
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-white mb-4 leading-tight">
            Book Your <span className="italic text-[#F4A011]">Flights</span>
          </h1>
          <p className="text-white/70 max-w-xl">
            Sourcing the best airline fares and handling your booking from takeoff to landing.
          </p>
          
          {/* Form container skeleton */}
          <div className="mt-8 bg-white rounded-2xl shadow-xl p-6 sm:p-8 max-w-4xl border border-gray-100 animate-pulse">
            <div className="flex gap-4 mb-6">
              <div className="h-8 bg-gray-200 rounded-full w-24" />
              <div className="h-8 bg-gray-200 rounded-full w-24" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="h-10 bg-gray-200 rounded-lg w-full" />
              <div className="h-10 bg-gray-200 rounded-lg w-full" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="h-10 bg-gray-200 rounded-lg w-full" />
              <div className="h-10 bg-gray-200 rounded-lg w-full" />
            </div>
            <div className="h-12 bg-[#F4A011]/30 rounded-lg w-full mt-8" />
          </div>
        </div>
      </div>
    </main>
  )
}
