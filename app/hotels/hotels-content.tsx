"use client"

import { useState, Suspense } from "react"
import Image from "next/image"
import { MapPin, Calendar, Users, Star, MessageCircle } from "lucide-react"
import { useAuthGate } from "@/hooks/use-auth-gate"
import { useSearchParams } from "next/navigation"

export interface Hotel {
  id: string | number;
  name: string;
  city: string;
  image: string;
  price: number;
  rating: number;
  description: string;
  published?: boolean;
}

export const fallbackHotels: Hotel[] = [
  { id: 1, name: "Vivanta Dal View", city: "Srinagar", image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80", price: 8500, rating: 5, description: "Luxury stay overlooking the scenic Dal Lake and surrounding mountain ranges." },
  { id: 2, name: "DoubleTree by Hilton", city: "Goa", image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80", price: 7200, rating: 5, description: "Modern comfort and leisure close to Goa's most vibrant beaches." },
  { id: 3, name: "Hotel Kalka Royal", city: "Jaipur", image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80", price: 4200, rating: 4, description: "Traditional heritage stay with exceptional Rajasthani hospitality." },
  { id: 4, name: "Ubud Resort & Spa", city: "Bali", image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80", price: 9500, rating: 5, description: "Tropical paradise nestled within lush Balinese forests and rivers." },
  { id: 5, name: "Marina View Suite", city: "Dubai", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80", price: 12500, rating: 5, description: "Stunning skyline views with easy access to Dubai's premium shopping hubs." },
  { id: 6, name: "Misty Valleys Resort", city: "Manali", image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80", price: 5800, rating: 4, description: "Cozy retreat surrounded by pine woods and crisp mountain air." }
]

function HotelsPageContent({ initialHotels }: { initialHotels: Hotel[] }) {
  const { gatedWhatsApp } = useAuthGate()
  const searchParams = useSearchParams()

  const cityParam = searchParams.get("city") || ""
  const checkinParam = searchParams.get("checkin") || ""
  const checkoutParam = searchParams.get("checkout") || ""
  const guestsParam = searchParams.get("guests") || "2"

  const [city, setCity] = useState(cityParam)
  const [checkin, setCheckin] = useState(checkinParam)
  const [checkout, setCheckout] = useState(checkoutParam)
  const [guests, setGuests] = useState(guestsParam)

  const filtered = initialHotels.filter(hotel => {
    const searchStr = (city || cityParam).toLowerCase()
    return !searchStr ? true : hotel.city.toLowerCase().includes(searchStr) || hotel.name.toLowerCase().includes(searchStr)
  })

  return (
    <main className="min-h-screen bg-white">
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

          <form
            role="search"
            className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10"
            onSubmit={e => e.preventDefault()}
          >
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#F4A011]" />
              <input
                type="search"
                name="city"
                placeholder="City or hotel name"
                defaultValue={cityParam}
                onChange={e => setCity(e.target.value)}
                autoComplete="address-level2"
                autoCorrect="on"
                spellCheck={true}
                className="w-full pl-10 pr-4 py-3 bg-white border border-transparent rounded-lg text-sm text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20"
              />
            </div>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#F4A011]" />
              <input
                type="date"
                name="checkin"
                value={checkin}
                onChange={e => setCheckin(e.target.value)}
                autoComplete="off"
                className="w-full pl-10 pr-4 py-3 bg-white border border-transparent rounded-lg text-sm text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20"
              />
            </div>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#F4A011]" />
              <input
                type="date"
                name="checkout"
                value={checkout}
                onChange={e => setCheckout(e.target.value)}
                autoComplete="off"
                className="w-full pl-10 pr-4 py-3 bg-white border border-transparent rounded-lg text-sm text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20"
              />
            </div>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#F4A011]" />
              <select
                name="guests"
                value={guests}
                onChange={e => setGuests(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white border border-transparent rounded-lg text-sm text-[#1C1C1E] focus:outline-none focus:ring-2 focus:ring-[#1B4332]/20 appearance-none bg-no-repeat"
              >
                {[1,2,3,4,5,6].map(g => (
                  <option key={g} value={g}>{g} {g === 1 ? "Guest" : "Guests"}</option>
                ))}
              </select>
            </div>
          </form>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {filtered.length === 0 ? (
          <div className="text-center py-20 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#1B4332]/8 flex items-center justify-center mx-auto mb-5">
              <MapPin className="w-7 h-7 text-[#1B4332]/40" />
            </div>
            <h3 className="font-serif text-2xl text-[#1B4332] mb-2">
              No hotels found{city ? ` in "${city}"` : ""}
            </h3>
            <p className="text-[#1C1C1E]/50 text-sm mb-2">
              We don&apos;t have a listed property here yet — but Sharon works with a wide network of hotels across India and abroad.
            </p>
            <p className="text-[#1C1C1E]/40 text-sm mb-8">
              Send her a message and she&apos;ll check availability, negotiate rates, and handle the booking for you.
            </p>
            <button
              onClick={() => gatedWhatsApp(
                `Hi Sharon, I searched for hotels in "${city || "a location"}" on your website but couldn't find a match. Can you help me find and book a hotel there?`
              )}
              className="inline-flex items-center gap-2 bg-[#1B4332] text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-[#1B4332]/90 transition-colors cursor-pointer shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              Message Sharon on WhatsApp
            </button>
            <p className="text-[#1C1C1E]/30 text-xs mt-4">Replies within minutes · No booking fees</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(hotel => (
              <div key={hotel.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col">
                <div className="relative h-56 overflow-hidden">
                  <Image src={hotel.image || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80"} alt={hotel.name} fill loading="lazy" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" quality={65} className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-[#1C1C1E] text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                    {hotel.rating}
                  </div>
                  <div className="absolute bottom-4 left-4 bg-[#1B4332] text-white text-xs font-medium px-3 py-1 rounded-full">
                    📍 {hotel.city}
                  </div>
                </div>
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-[#1B4332] mb-2">{hotel.name}</h3>
                    <p className="text-[#1C1C1E]/60 text-sm mb-4">{hotel.description}</p>
                  </div>
                  <div>
                    <button
                      onClick={() => gatedWhatsApp(
                        `Hi, I'm interested in booking ${hotel.name} in ${hotel.city}. Please share availability and rates.`
                      )}
                      className="btn-pill"
                    >
                      Book via Us
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

export default function HotelsContent({ initialHotels = fallbackHotels }: { initialHotels?: Hotel[] }) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-white text-[#1B4332] font-semibold">Loading Hotels...</div>}>
      <HotelsPageContent initialHotels={initialHotels} />
    </Suspense>
  )
}
