export default function HotelsLoading() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Banner */}
      <div className="bg-[#1B4332] pt-32 pb-16 px-4">
        <div className="mx-auto max-w-7xl">
          <span className="text-[#F4A011] font-semibold text-xs tracking-[0.25em] uppercase mb-4 block">
            EXPLORE HOTELS
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-white mb-4 leading-tight">
            Find the Perfect <span className="italic text-[#F4A011]">Stay</span>
          </h1>
          <p className="text-white/70 max-w-xl">
            Sought-after locations, boutique stays, and five-star luxury.
            Get exclusive rates and availability managed by our team.
          </p>

          {/* Search bar skeleton */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl bg-white/10 p-4 rounded-2xl border border-white/10 animate-pulse">
            <div className="h-10 bg-white/20 rounded-lg w-full" />
            <div className="h-10 bg-white/20 rounded-lg w-full" />
            <div className="h-10 bg-white/20 rounded-lg w-full" />
            <div className="h-10 bg-white/20 rounded-lg w-full" />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Hotel grid skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col animate-pulse">
              <div className="relative h-56 bg-gray-200" />
              <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                  <div className="h-6 bg-gray-200 rounded-md w-3/4 mb-3" />
                  <div className="h-4 bg-gray-200 rounded-md w-full mb-2" />
                  <div className="h-4 bg-gray-200 rounded-md w-5/6 mb-4" />
                </div>
                <div className="flex gap-3 mt-auto pt-4">
                  <div className="flex-1 h-10 bg-gray-200 rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
