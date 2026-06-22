"use client"
import { useState } from "react"
import Image from "next/image"
import { Clock, ArrowRight, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { useAuthGate } from "@/hooks/use-auth-gate"

const filters = ["All", "Domestic", "International", "Beach", "Honeymoon", "Adventure", "Pilgrimage"]

const packages = [
  // 6 Northeast India packages
  { id: 1, title: "Meghalaya Explorer", image: "https://images.unsplash.com/photo-1686472886489-1d2d7e08ff9c?w=800&q=80", duration: "5 Days / 4 Nights", price: 12999, theme: "Adventure", category: ["Domestic", "Adventure"], description: "Explore Cherrapunji falls, living root bridges, and pristine caves." },
  { id: 2, title: "Kaziranga Wild Safari", image: "https://images.unsplash.com/photo-1637391783805-f1393be00fcf?w=800&q=80", duration: "4 Days / 3 Nights", price: 14999, theme: "Adventure", category: ["Domestic", "Adventure"], description: "Meet the one-horned rhino in Assam's famous wildlife sanctuary." },
  { id: 3, title: "Tawang Monastery Journey", image: "https://images.unsplash.com/photo-1628443266300-e8490ee38875?w=800&q=80", duration: "7 Days / 6 Nights", price: 24999, theme: "Pilgrimage", category: ["Domestic", "Pilgrimage", "Adventure"], description: "Scenic high-mountain pass travel to the historic Tawang Monastery." },
  { id: 4, title: "Darjeeling & Gangtok Retreat", image: "https://images.unsplash.com/photo-1698753864905-a447aa362ec9?w=800&q=80", duration: "6 Days / 5 Nights", price: 18999, theme: "Honeymoon", category: ["Domestic", "Honeymoon"], description: "Breathtaking views of Kanchenjunga, tea gardens, and peaceful lakes." },
  { id: 5, title: "Majuli Cultural Island", image: "https://images.unsplash.com/photo-1759738101670-7d50ae3f1bd2?w=800&q=80", duration: "4 Days / 3 Nights", price: 9999, theme: "Pilgrimage", category: ["Domestic", "Pilgrimage"], description: "Experience Satras, traditional mask making, and Assamese heritage." },
  { id: 6, title: "Cherrapunji Misty Valleys", image: "https://images.unsplash.com/photo-1689089526066-c7e6e95ee265?w=800&q=80", duration: "5 Days / 4 Nights", price: 11999, theme: "Honeymoon", category: ["Domestic", "Honeymoon"], description: "Chasing waterfalls and staying in cozy treehouses in the wettest place." },
  
  // 3 Rest of India packages
  { id: 7, title: "Goa Beach Getaway", image: "/images/photo-1512343879784-a960bf40e7f2.jpg", duration: "4 Days / 3 Nights", price: 12999, theme: "Beach", category: ["Domestic", "Beach"], description: "Relax on pristine sandy beaches with lively nightlife and coastal vibes." },
  { id: 8, title: "Kashmir Paradise", image: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?w=800&q=80", duration: "6 Days / 5 Nights", price: 24999, theme: "Honeymoon", category: ["Domestic", "Honeymoon", "Adventure"], description: "Explore breathtaking snow peaks, pristine lakes, and alpine meadows." },
  { id: 9, title: "Varanasi (Uttar Pradesh)", image: "https://images.unsplash.com/photo-1561359313-0639aad49ca6?w=800&q=80", duration: "4 Days / 3 Nights", price: 8999, theme: "Pilgrimage", category: ["Domestic", "Pilgrimage"], description: "One of the oldest continuously inhabited cities and the holiest of sacred destinations on the Ganges." },
  
  // 3 International packages to make sure the "International" filter has options
  { id: 10, title: "Dubai Extravaganza", image: "https://images.unsplash.com/photo-1708361089093-beef4c4584e7?w=800&q=80", duration: "5 Days / 4 Nights", price: 45999, theme: "International", category: ["International"], description: "Experience modern luxury, desert safaris, and futuristic skylines." },
  { id: 11, title: "Bali Escape", image: "/images/photo-1537996194471-e657df975ab4.jpg", duration: "6 Days / 5 Nights", price: 42999, theme: "International", category: ["International", "Beach", "Honeymoon"], description: "Visit sacred cliffside temples, pool villas, and serene sunsets." },
  { id: 12, title: "Thailand Adventure", image: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&q=80", duration: "6 Days / 5 Nights", price: 35999, theme: "International", category: ["International", "Adventure"], description: "Enjoy exotic temples, vibrant street markets, and tropical islands." },

  // Additional 6 pilgrimage packages requested by the user
  { id: 13, title: "The Char Dham Yatra (Uttarakhand)", image: "https://images.unsplash.com/photo-1698574996391-73f103113f60?w=800&q=80", duration: "10 Days / 9 Nights", price: 29999, theme: "Pilgrimage", category: ["Domestic", "Pilgrimage"], description: "The ultimate Hindu pilgrimage circuit in Garhwal Uttarakhand, encompassing four sacred shrines." },
  { id: 14, title: "Tirupati Balaji (Andhra Pradesh)", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80", duration: "3 Days / 2 Nights", price: 6999, theme: "Pilgrimage", category: ["Domestic", "Pilgrimage"], description: "Highly revered visit to Venkateswara Temple on Tirumala Hills, Andhra Pradesh." },
  { id: 15, title: "Vaishno Devi (Jammu & Kashmir)", image: "https://images.unsplash.com/photo-1773965040894-330722d21ffd?w=800&q=80", duration: "4 Days / 3 Nights", price: 7999, theme: "Pilgrimage", category: ["Domestic", "Pilgrimage"], description: "Seek blessings at the sacred cave shrine in Trikuta Mountains, Katra J&K." },
  { id: 16, title: "The Golden Temple (Punjab)", image: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?w=800&q=80", duration: "3 Days / 2 Nights", price: 5999, theme: "Pilgrimage", category: ["Domestic", "Pilgrimage"], description: "Visit Amritsar's Golden Temple, featuring its stunning gold facade and langar kitchen." },
  { id: 17, title: "Jagannath Temple (Odisha)", image: "https://images.unsplash.com/photo-1706790574525-d218c4c52b5c?w=800&q=80", duration: "4 Days / 3 Nights", price: 9999, theme: "Pilgrimage", category: ["Domestic", "Pilgrimage"], description: "Revered Char Dham destination in Puri, Odisha, famous for the Rath Yatra." },
  { id: 18, title: "Rameshwaram (Tamil Nadu)", image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80", duration: "4 Days / 3 Nights", price: 11999, theme: "Pilgrimage", category: ["Domestic", "Pilgrimage"], description: "Critical stop on Char Dham circuit in Tamil Nadu housing Shiva's Jyotirlinga." },
]

export default function HolidaysContent({ initialDestination = "" }: { initialDestination?: string }) {
  const [activeFilter, setActiveFilter] = useState("All")
  const [search, setSearch] = useState(initialDestination)
  const { gatedWhatsApp } = useAuthGate()

  const filtered = packages.filter(pkg => {
    const matchesFilter = activeFilter === "All" || pkg.category.includes(activeFilter)
    const matchesSearch = !search
      ? true
      : pkg.title.toLowerCase().includes(search.toLowerCase()) ||
        pkg.theme.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Banner */}
      <div className="bg-[#1B4332] pt-32 pb-16 px-4">
        <div className="mx-auto max-w-7xl">
          <span className="text-[#F4A011] font-semibold text-xs tracking-[0.25em] uppercase mb-4 block">
            EXPLORE HOLIDAYS
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-white mb-4 leading-tight">
            Find Your Perfect <span className="italic text-[#F4A011]">Holiday</span>
          </h1>
          <p className="text-white/70 max-w-xl">
            Handpicked packages across India and the world. 
            Get a personalised quote from our travel experts.
          </p>
          
          {/* Search bar */}
          <div className="mt-8 flex gap-3 max-w-lg">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#1B4332]/50" />
              <input
                type="text"
                placeholder="Search destinations or themes..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-400 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B4332]/30 focus:border-[#1B4332] shadow-sm text-gray-900 placeholder:text-gray-500 font-medium"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-full transition-colors cursor-pointer",
                activeFilter === f
                  ? "bg-[#1B4332] text-white"
                  : "bg-[#D8F3DC] text-[#1B4332] hover:bg-[#1B4332]/10"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Package grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[#1C1C1E]/60 text-lg mb-2">No packages found.</p>
            <p className="text-[#1C1C1E]/40 text-sm mb-6">
              Let us create a custom itinerary for you.
            </p>
            <button
              onClick={() => gatedWhatsApp(
                `Hi, I'm looking for a custom holiday package. Can you help me plan my trip?`
              )}
              className="bg-[#F4A011] text-white font-semibold px-6 py-3 rounded-lg hover:bg-[#F4A011]/90 transition-colors cursor-pointer"
            >
              Get Custom Quote
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(pkg => (
              <div key={pkg.id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col">
                <div className="relative h-56 overflow-hidden">
                  <Image src={pkg.image} alt={pkg.title} fill loading="lazy" className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute top-4 left-4 bg-[#F4A011] text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {pkg.theme}
                  </div>
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-[#1C1C1E] text-xs font-medium px-3 py-1.5 rounded-full flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {pkg.duration}
                  </div>
                </div>
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-xl font-semibold text-[#1B4332] mb-2">{pkg.title}</h3>
                    <p className="text-[#1C1C1E]/60 text-sm mb-4">{pkg.description}</p>
                  </div>
                  <div className="flex gap-3 mt-auto">
                    <button
                      onClick={() => gatedWhatsApp(
                        `Hi, I'd like to know more about the ${pkg.title} package (${pkg.duration}). Please share the full itinerary and pricing.`
                      )}
                      className="flex-1 bg-[#1B4332] text-white text-sm font-medium py-2.5 rounded-lg hover:bg-[#1B4332]/90 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      View Details <ArrowRight className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => gatedWhatsApp(
                        `Hi, I'm interested in the ${pkg.title} package. Please send me a quote.`
                      )}
                      className="btn-pill flex-1"
                    >
                      Get Quote
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
