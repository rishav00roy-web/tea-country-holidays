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
        </div>
      </div>
      
      {/* Form container skeleton - placed outside hero, matching actual box */}
      <div className="mx-auto max-w-2xl px-4 py-16">
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 animate-pulse">
          <div className="flex gap-4 mb-6 border-b border-gray-100 pb-4">
            <div className="h-9 bg-gray-200 rounded-lg flex-1" />
            <div className="h-9 bg-gray-200 rounded-lg flex-1" />
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-16" />
                <div className="h-10 bg-gray-200 rounded-lg w-full" />
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-16" />
                <div className="h-10 bg-gray-200 rounded-lg w-full" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-28" />
                <div className="h-10 bg-gray-200 rounded-lg w-full" />
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-28" />
                <div className="h-10 bg-gray-200 rounded-lg w-full" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-20" />
              <div className="h-10 bg-gray-200 rounded-lg w-full" />
            </div>
            <div className="h-11 bg-gray-200 rounded-full w-full mt-6" />
          </div>
        </div>
      </div>
    </main>
  )
}
