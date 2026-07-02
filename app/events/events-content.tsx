"use client"
import { useAuthGate } from "@/hooks/use-auth-gate"
import { Sparkles, Users, FileText, User, MapPin, Compass } from "lucide-react"

export default function EventsContent() {
  const { gatedWhatsApp } = useAuthGate()

  return (
    <main className="min-h-screen bg-brand-varden">

      {/* Hero Banner */}
      <div className="bg-[#1B4332] pt-36 pb-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle at 10% 20%, #F4A011 0%, transparent 40%), radial-gradient(circle at 90% 80%, #F4A011 0%, transparent 40%)"
          }}
        />
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

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: What We Do */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="font-serif text-3xl font-bold text-brand-evergreen mb-6">
                What We Do
              </h2>
              
              {/* Words separated by -- lines */}
              <div className="text-sm sm:text-base font-semibold text-[#F4A011] uppercase tracking-wider mb-8 leading-loose border-y border-[#F4A011]/20 py-4">
                Corporate Retreats ·· Destination Weddings ·· Private Parties ·· Bespoke Itineraries
              </div>

              <p className="text-brand-ink/75 text-base leading-relaxed mb-6">
                <strong className="text-brand-evergreen">Manami</strong> and the Tea Country Holidays team specialise in crafting extraordinary group and private experiences tailored to your vision. Whether it&apos;s an intimate destination wedding in a colonial tea bungalow, a high-impact corporate retreat in the Himalayan foothills, or a luxury bespoke itinerary for discerning travellers — we coordinate every detail so you don&apos;t have to.
              </p>
              
              <p className="text-brand-ink/75 text-base leading-relaxed mb-6">
                We are Assam&apos;s go-to travel partner for exclusive group tours, honeymoon packages, pilgrimage circuits, and adventure expeditions across Northeast India and beyond.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="p-3 rounded-xl bg-brand-evergreen/10 text-brand-evergreen">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-evergreen text-lg mb-1">Handpicked Venues</h3>
                  <p className="text-brand-ink/65 text-sm">Exclusive access to colonial tea bungalows, heritage river lodges, private mountain retreats, and award-winning waterfront resorts across Northeast India and beyond.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-3 rounded-xl bg-brand-evergreen/10 text-brand-evergreen">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-evergreen text-lg mb-1">End-to-End Coordination</h3>
                  <p className="text-brand-ink/65 text-sm">From guest transfers, curated meals, and premium accommodations to local sightseeing, cultural immersions, and specialised themed activities — we handle it all.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-3 rounded-xl bg-brand-evergreen/10 text-brand-evergreen">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-evergreen text-lg mb-1">Local Expertise</h3>
                  <p className="text-brand-ink/65 text-sm">With deep roots in Assam and Northeast India, Manami&apos;s team brings insider knowledge of hidden gems, cultural nuances, and travel logistics that only true locals can offer.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-3 rounded-xl bg-brand-evergreen/10 text-brand-evergreen">
                  <Compass className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-evergreen text-lg mb-1">Custom Itineraries</h3>
                  <p className="text-brand-ink/65 text-sm">Every trip is designed from scratch around your group&apos;s interests, pace, and budget — no cookie-cutter packages, ever.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-[#1B4332] p-8 sm:p-10 text-white relative overflow-hidden shadow-xl"
              style={{
                boxShadow: "0 20px 40px rgba(1, 20, 10, 0.15)"
              }}>
              {/* Subtle background glow */}
              <div className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: "radial-gradient(circle at 100% 0%, #F4A011 0%, transparent 60%)"
                }}
              />
              
              <div className="relative z-10">
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold mb-2">
                  Plan Your Event
                </h3>
                <p className="text-white/70 text-sm mb-8">
                  Fill in the details below, and our dedicated event planner will reach out to design your bespoke package.
                </p>

                <div className="space-y-4">
                  {/* Name field */}
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-white/40">
                      <User className="h-5 w-5" />
                    </span>
                    <input
                      type="text"
                      id="custom-event-name"
                      placeholder="Your Name"
                      autoCorrect="on"
                      autoComplete="name"
                      spellCheck={true}
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 border border-white/20 
                        text-white placeholder:text-white/40 focus:outline-none 
                        focus:border-[#F4A011] focus:ring-1 focus:ring-[#F4A011] transition-all"
                    />
                  </div>

                  {/* Event Type field */}
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-white/40">
                      <Sparkles className="h-5 w-5" />
                    </span>
                    <input
                      type="text"
                      id="custom-event-type"
                      placeholder="Type of Event (e.g. Wedding, Corporate Retreat)"
                      autoCorrect="on"
                      autoComplete="on"
                      spellCheck={true}
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 border border-white/20 
                        text-white placeholder:text-white/40 focus:outline-none 
                        focus:border-[#F4A011] focus:ring-1 focus:ring-[#F4A011] transition-all"
                    />
                  </div>

                  {/* Guest count field */}
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-white/40">
                      <Users className="h-5 w-5" />
                    </span>
                    <input
                      type="text"
                      id="custom-event-guests"
                      placeholder="Expected Guest Count"
                      autoCorrect="on"
                      autoComplete="on"
                      spellCheck={true}
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 border border-white/20 
                        text-white placeholder:text-white/40 focus:outline-none 
                        focus:border-[#F4A011] focus:ring-1 focus:ring-[#F4A011] transition-all"
                    />
                  </div>

                  {/* Details field */}
                  <div className="relative">
                    <span className="absolute left-3 top-3.5 text-white/40">
                      <FileText className="h-5 w-5" />
                    </span>
                    <textarea
                      id="custom-event-details"
                      rows={4}
                      placeholder="Tell us about your preferred destination, date, and vision..."
                      autoCorrect="on"
                      autoComplete="on"
                      spellCheck={true}
                      className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/10 border border-white/20 
                        text-white placeholder:text-white/40 focus:outline-none 
                        focus:border-[#F4A011] focus:ring-1 focus:ring-[#F4A011] resize-none transition-all"
                    />
                  </div>

                  <button
                    onClick={() => {
                      const name = (document.getElementById("custom-event-name") as HTMLInputElement)?.value || ""
                      const type = (document.getElementById("custom-event-type") as HTMLInputElement)?.value || ""
                      const guests = (document.getElementById("custom-event-guests") as HTMLInputElement)?.value || ""
                      const details = (document.getElementById("custom-event-details") as HTMLTextAreaElement)?.value || ""
                      gatedWhatsApp(
                        `Hi, I'd like to plan a custom event.\n\nName: ${name}\nEvent Type: ${type}\nGuests: ${guests}\nDetails: ${details}`
                      )
                    }}
                    className="w-full py-4 bg-[#F4A011] hover:bg-[#F4A011]/90 text-white font-bold rounded-lg 
                      transition-all hover:shadow-[0_10px_20px_rgba(244,160,17,0.3)] cursor-pointer"
                  >
                    Send Custom Event Request
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}
