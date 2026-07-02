export default function RailwaysLoading() {
  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      
      {/* Hero Banner */}
      <div className="bg-[#1B4332] pt-32 pb-16 px-4">
        <div className="mx-auto max-w-7xl">
          <span className="text-[#F4A011] font-semibold text-xs tracking-[0.25em] uppercase mb-4 block">
            RAILWAY RESERVATIONS
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-white mb-4 leading-tight">
            Book Train <span className="italic text-[#F4A011]">Tickets</span>
          </h1>
          <p className="text-white/70 max-w-xl">
            Hassle-free train ticket reservations. We check IRCTC availability and confirm your booking directly.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-xl px-4 py-16">
        {/* Form container skeleton */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100 animate-pulse space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="h-10 bg-gray-200 rounded-lg w-full" />
            <div className="h-10 bg-gray-200 rounded-lg w-full" />
          </div>
          <div className="h-10 bg-gray-200 rounded-lg w-full" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="h-10 bg-gray-200 rounded-lg w-full" />
            <div className="h-10 bg-gray-200 rounded-lg w-full" />
          </div>
          <div className="h-12 bg-[#F4A011]/30 rounded-lg w-full mt-6" />
        </div>
      </div>
    </main>
  )
}
