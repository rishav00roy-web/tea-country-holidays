"use client"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import { useAuthGate } from "@/hooks/use-auth-gate"
import { Sparkles, Calendar, Users, FileText, User } from "lucide-react"

export default function EventsContent() {
  const { gatedWhatsApp } = useAuthGate()

  return (
    <main className="min-h-screen bg-brand-varden">
      <Navbar />

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
                Corporate Retreats -- Destination Weddings -- Private Parties -- Bespoke Itineraries
              </div>

              <p className="text-brand-ink/75 text-base leading-relaxed mb-6">
                Sharon and the Tea Country team specialise in organizing unique events tailored specifically to your group's desires. We coordinate premium stays, immersive local experiences, and logistics down to the last detail.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="p-3 rounded-xl bg-brand-evergreen/10 text-brand-evergreen">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-brand-evergreen text-lg mb-1">Handpicked Venues</h4>
                  <p className="text-brand-ink/65 text-sm">Access to exclusive colonial tea bungalows, private mountain lodges, and stunning waterfront resorts.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-3 rounded-xl bg-brand-evergreen/10 text-brand-evergreen">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-bold text-brand-evergreen text-lg mb-1">End-to-End Coordination</h4>
                  <p className="text-brand-ink/65 text-sm">From guest transfers, meals, and accommodations to local sightseeing and specialized themed activities.</p>
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

      <WhatsAppButton />
      <Footer />
    </main>
  )
}
