"use client"

import { useState } from "react"
import { Plane, Calendar, Users } from "lucide-react"
import { useAuthGate } from "@/hooks/use-auth-gate"
import TravelAutocomplete from "@/components/travel-autocomplete"

function FlightsPageContent({
  fromParam = "",
  toParam = "",
  dateParam = "",
  travellersParam = "1 Traveller",
  typeParam = "one-way",
}: {
  fromParam?: string
  toParam?: string
  dateParam?: string
  travellersParam?: string
  typeParam?: string
}) {
  const { gatedWhatsApp } = useAuthGate()

  const [tripType, setTripType] = useState<"one-way" | "round-trip">(
    typeParam === "round-trip" ? "round-trip" : "one-way"
  )
  const [from, setFrom] = useState(fromParam)
  const [to, setTo] = useState(toParam)
  const [date, setDate] = useState(dateParam)
  const [returnDate, setReturnDate] = useState("")
  const [travellers, setTravellers] = useState(travellersParam)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const message = `Hi, I need a ${tripType === "one-way" ? "one-way" : "round-trip"} flight from ${from || "[Departure]"} to ${to || "[Destination]"} on ${date || "[Date]"} for ${travellers}.${tripType === "round-trip" ? ` Return on ${returnDate || "[Return Date]"}.` : ""} Please share the best options.`
    gatedWhatsApp(message)
  }

  return (
    <main className="min-h-screen bg-[#FAFAF8]">
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

      <div className="mx-auto max-w-2xl px-4 py-16">
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-gray-100">
          <div className="flex gap-4 mb-6 border-b border-gray-100 pb-4">
            <button
              type="button"
              onClick={() => setTripType("one-way")}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                tripType === "one-way" ? "bg-[#1B4332] text-white" : "bg-gray-100 text-[#1C1C1E] hover:bg-gray-200"
              }`}
            >
              One-way
            </button>
            <button
              type="button"
              onClick={() => setTripType("round-trip")}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer ${
                tripType === "round-trip" ? "bg-[#1B4332] text-white" : "bg-gray-100 text-[#1C1C1E] hover:bg-gray-200"
              }`}
            >
              Round-trip
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <TravelAutocomplete
              label="From"
              placeholder="Search city or airport"
              value={from}
              onChange={setFrom}
              icon={Plane}
              iconClassName="rotate-45"
            />
            <TravelAutocomplete
              label="To"
              placeholder="Search city or airport"
              value={to}
              onChange={setTo}
              icon={Plane}
              iconClassName="-rotate-45"
            />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="flight-date" className="block text-xs font-bold text-[#1B4332] uppercase tracking-wider mb-2">Departure Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1B4332]/50" />
                  <input
                    id="flight-date"
                    type="date"
                    name="departure"
                    required
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    autoComplete="off"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20 focus:border-[#1B4332] text-sm text-[#1C1C1E]"
                  />
                </div>
              </div>
              {tripType === "round-trip" && (
                <div>
                  <label htmlFor="flight-return" className="block text-xs font-bold text-[#1B4332] uppercase tracking-wider mb-2">Return Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1B4332]/50" />
                    <input
                      id="flight-return"
                      type="date"
                      name="return"
                      required
                      value={returnDate}
                      onChange={e => setReturnDate(e.target.value)}
                      autoComplete="off"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20 focus:border-[#1B4332] text-sm text-[#1C1C1E]"
                    />
                  </div>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="flight-travellers" className="block text-xs font-bold text-[#1B4332] uppercase tracking-wider mb-2">Travellers</label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1B4332]/50" />
                <select
                  id="flight-travellers"
                  name="travellers"
                  value={travellers}
                  onChange={e => setTravellers(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20 focus:border-[#1B4332] text-sm text-[#1C1C1E] appearance-none"
                >
                  <option value="1 Traveller">1 Traveller</option>
                  <option value="2 Travellers">2 Travellers</option>
                  <option value="3 Travellers">3 Travellers</option>
                  <option value="4 Travellers">4 Travellers</option>
                  <option value="5+ Travellers">5+ Travellers</option>
                </select>
              </div>
            </div>

            <button type="submit" className="btn-pill mt-6">
              Find Flights via Tea Country
            </button>
          </form>

          <p className="text-[#1C1C1E]/40 text-sm italic text-center mt-4">
            We source the best fares and handle your booking end to end.
          </p>
        </div>
      </div>
    </main>
  )
}

interface FlightsContentProps {
  fromParam?: string
  toParam?: string
  dateParam?: string
  travellersParam?: string
  typeParam?: string
}

export default function FlightsContent({
  fromParam = "",
  toParam = "",
  dateParam = "",
  travellersParam = "1 Traveller",
  typeParam = "one-way"
}: FlightsContentProps) {
  return (
    <FlightsPageContent
      fromParam={fromParam}
      toParam={toParam}
      dateParam={dateParam}
      travellersParam={travellersParam}
      typeParam={typeParam}
    />
  )
}
