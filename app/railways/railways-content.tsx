"use client"

import { useState } from "react"
import { Calendar, Users, Train } from "lucide-react"
import { useAuthGate } from "@/hooks/use-auth-gate"
import TravelAutocomplete from "@/components/travel-autocomplete"
import { RAILWAY_SUGGESTIONS } from "@/lib/travel-locations"

export default function RailwaysContent() {
  const { gatedWhatsApp } = useAuthGate()

  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [date, setDate] = useState("")
  const [passengers, setPassengers] = useState("1")
  const [cls, setCls] = useState("Sleeper")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const message = `Hi, I need train tickets from ${from || "[Departure]"} to ${to || "[Destination]"} on ${date || "[Date]"} for ${passengers} passenger(s) in ${cls} class. Please help with booking.`
    gatedWhatsApp(message)
  }

  return (
    <main className="min-h-screen bg-[#FAFAF8]">
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

      <div className="mx-auto max-w-2xl px-4 py-16">
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TravelAutocomplete
                label="From Station"
                placeholder="Search station or code"
                value={from}
                onChange={setFrom}
                icon={Train}
                suggestions={RAILWAY_SUGGESTIONS}
              />
              <TravelAutocomplete
                label="To Station"
                placeholder="Search station or code"
                value={to}
                onChange={setTo}
                icon={Train}
                suggestions={RAILWAY_SUGGESTIONS}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#1B4332] uppercase tracking-wider mb-2">Travel Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1B4332]/50" />
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20 focus:border-[#1B4332] text-sm text-[#1C1C1E]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#1B4332] uppercase tracking-wider mb-2">Passengers</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1B4332]/50" />
                  <select
                    value={passengers}
                    onChange={e => setPassengers(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20 focus:border-[#1B4332] text-sm text-[#1C1C1E] appearance-none"
                  >
                    {Array.from({ length: 10 }, (_, i) => i + 1).map(n => (
                      <option key={n} value={n}>{n} {n === 1 ? "Passenger" : "Passengers"}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#1B4332] uppercase tracking-wider mb-2">Class</label>
              <select
                value={cls}
                onChange={e => setCls(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20 focus:border-[#1B4332] text-sm text-[#1C1C1E] appearance-none"
              >
                {["Sleeper", "3AC", "2AC", "1AC", "Chair Car"].map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className="btn-pill mt-6"
            >
              Book via Tea Country
            </button>
          </form>

          <p className="text-[#1C1C1E]/40 text-sm italic text-center mt-4">
            We check IRCTC availability and confirm your booking directly.
          </p>
        </div>
      </div>
    </main>
  )
}
