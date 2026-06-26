import { Award, Users, MapPin, Leaf } from "lucide-react";

const pillars = [
  { icon: Award,          title: "10 Years of Trust",          desc: "A decade of crafting seamless journeys across Northeast India and beyond, earning the confidence of thousands of families." },
  { icon: Users,          title: "People-First Philosophy",     desc: "Every itinerary is designed around you — your pace, your interests, your budget. No template tours, ever." },
  { icon: MapPin,         title: "Rooted in Guwahati",          desc: "Born in the heart of Assam, we carry a deep love for the land, its tea gardens, wildlife, and vibrant culture." },
  { icon: Leaf,           title: "Sustainable Travel",          desc: "We partner with local guides, eco-resorts, and community-driven experiences to give back to the destinations we love." },
];

const STATS = [
  ["500+", "Tours Crafted"],
  ["4.9★", "Google Rating"],
  ["50+",  "Destinations"],
];

export default function WhoWeAre() {
  return (
    <section id="who-we-are" className="py-20 md:py-32 bg-brand-floral overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div className="reveal">
            <span className="section-label text-brand-red block mb-4">
              Our Story
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-brand-evergreen dark:text-white leading-[1.1] mb-6">
              Who We <span className="text-brand-gold italic">Are</span>
            </h2>
            <p className="text-brand-ink/65 text-lg leading-relaxed mb-5">
              Founded in the lush heartland of Assam, <strong className="text-brand-evergreen dark:text-brand-gold">TeaCountryHolidays</strong> is more than a travel agency — we are storytellers who connect travellers with the soul of Northeast India and the world beyond.
            </p>
            <p className="text-brand-ink/65 text-lg leading-relaxed mb-8">
              From the mist-covered peaks of Sikkim and ancient monasteries of Bhutan, to the golden sands of Maldives and the futuristic skyline of Dubai — we bring every dream destination to your doorstep. Our IATA-accredited team handles flights, visas, hotels, transfers, and cruises under one roof.
            </p>

            <div className="flex items-center gap-4 mb-8">
              <span className="h-px flex-1 bg-gradient-to-r from-brand-gold/60 to-transparent" />
              <span className="text-brand-gold text-2xl font-serif">✦</span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {STATS.map(([n, l]) => (
                <div key={l} className="group">
                  <span className="font-serif text-3xl font-bold text-brand-evergreen dark:text-[#faf8f3] block group-hover:text-brand-gold transition-colors duration-300">{n}</span>
                  <span className="text-xs text-brand-ink/50 uppercase tracking-wider">{l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Pillar cards */}
          <div className="reveal-stagger grid sm:grid-cols-2 gap-5">
            {pillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="group bg-white dark:bg-[#12291f] border border-brand-gold/10 dark:border-brand-gold/25 rounded-2xl p-6 hover:border-brand-gold/50 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-400 cursor-default"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-varden dark:bg-[#0d1f1a] group-hover:bg-brand-gold/15 flex items-center justify-center mb-4 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-brand-gold" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-bold text-brand-evergreen dark:text-[#faf8f3] text-base mb-2 group-hover:text-brand-gold transition-colors duration-300">{p.title}</h3>
                  <p className="text-sm text-brand-ink/55 dark:text-[#faf8f3]/65 leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>

        </div>
      </div>

    </section>
  );
}
