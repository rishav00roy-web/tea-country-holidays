import { Users, Star, MapPin, Award, Plane, Mountain } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "500+ Happy Travellers",
    desc: "Families, couples & solo adventurers who trusted us with their most precious moments.",
  },
  {
    icon: Star,
    title: "4.9/5 Google Rating",
    desc: "Consistently highly rated by our customers for our exceptional service and dedication.",
  },
  {
    icon: MapPin,
    title: "50+ Destinations",
    desc: "From the peaks of Northeast India to the vibrant streets of Dubai, we cover it all.",
  },
  {
    icon: Mountain,
    title: "Northeast Specialists",
    desc: "Deep-rooted local expertise in crafting unparalleled journeys across Northeast India.",
  },
  {
    icon: Award,
    title: "10 Years Experience",
    desc: "A decade of crafting perfect itineraries, ensuring smooth and memorable holidays.",
  },
  {
    icon: Plane,
    title: "IATA Accredited",
    desc: "Recognized globally for maintaining the highest standards in travel and aviation.",
  },
];

export default function BentoWhyUs() {
  return (
    <div id="bento-why-us-wrapper" className="relative isolate">
      {/* Background bleed container */}
      <div className="absolute -inset-x-0 -inset-y-[60px] mesh-bg -z-10" />

      <section className="relative py-20 md:py-28 overflow-hidden bg-transparent">
        {/* Ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-gold/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <span className="section-label inline-block text-brand-gold mb-3">
            Why Choose Us
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white">
            Travel Smarter.{" "}
            <span className="text-brand-gold">Live Better.</span>
          </h2>
          <p className="mt-4 text-white/60 max-w-2xl mx-auto text-sm md:text-base">
            Discover what makes TeaCountryHolidays the preferred choice for hundreds of travelers seeking unforgettable, seamless journeys.
          </p>
        </div>

        <div className="reveal-stagger grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:-translate-y-2 hover:bg-white/10 hover:border-brand-gold/30 hover:shadow-2xl hover:shadow-brand-gold/5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center mb-6 text-brand-gold">
                  <Icon strokeWidth={1.5} size={24} />
                </div>
                <h3 className="text-white font-serif text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
      </section>
    </div>
  );
}
