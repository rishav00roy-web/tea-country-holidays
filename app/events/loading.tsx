import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function EventsLoading() {
  return (
    <main className="min-h-screen bg-brand-varden">
      <Navbar />
      
      {/* Hero Banner */}
      <div className="bg-[#1B4332] pt-36 pb-20 px-4 text-center relative overflow-hidden">
        <div className="mx-auto max-w-4xl relative z-10">
          <span className="text-[#F4A011] font-semibold text-xs tracking-[0.25em] uppercase mb-4 block">
            Bespoke Planning Services
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal text-white mb-6 leading-tight">
            Custom Events & <span className="italic text-[#F4A011]">Celebrations</span>
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            From historic tea estate retreats to premium destination weddings, we bring your vision to life with seamless planning and execution.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start animate-pulse">
          {/* Left Column: What We Do */}
          <div className="lg:col-span-5 space-y-6">
            <div className="h-8 bg-gray-200 rounded-md w-1/3 mb-4" />
            <div className="h-6 bg-gray-200 rounded-md w-full mb-4" />
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded-md w-full" />
              <div className="h-4 bg-gray-200 rounded-md w-full" />
              <div className="h-4 bg-gray-200 rounded-md w-4/5" />
            </div>
          </div>
          
          {/* Right Column: Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-brand-gold/15 space-y-4">
            <div className="h-8 bg-gray-200 rounded-md w-1/2 mb-6" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="h-10 bg-gray-200 rounded-lg w-full" />
              <div className="h-10 bg-gray-200 rounded-lg w-full" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="h-10 bg-gray-200 rounded-lg w-full" />
              <div className="h-10 bg-gray-200 rounded-lg w-full" />
            </div>
            <div className="h-24 bg-gray-200 rounded-lg w-full" />
            <div className="h-12 bg-[#F4A011]/30 rounded-lg w-full mt-6" />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
