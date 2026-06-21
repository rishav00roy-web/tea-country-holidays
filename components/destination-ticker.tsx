"use client";

import Marquee from "react-fast-marquee";

const destinations = [
  "Kedarnath",
  "Rishikesh",
  "Mussoorie",
  "Jim Corbett",
  "Auli",
  "Guwahati",
  "Cherrapunji",
  "Kaziranga",
  "Gangtok",
  "Paro Bhutan",
  "Maldives",
  "Dubai",
  "Bali",
  "Kerala",
  "Jaipur",
  "Andaman",
  "Munnar",
  "Coorg",
  "Spiti Valley",
  "Leh Ladakh",
];

export default function DestinationTicker() {
  return (
    <div className="bg-brand-evergreen border-t-2 border-b-2 border-brand-gold/60 py-2 overflow-hidden">
      <Marquee speed={60} gradient={false} pauseOnHover={true}>
        {destinations.map((destination, index) => (
          <span key={index} className="flex items-center">
            <span className="flex items-center gap-2 px-6 text-white/80 hover:text-brand-gold transition-colors font-semibold text-sm uppercase tracking-widest cursor-default">
              {destination}
            </span>
            <span className="text-brand-gold font-bold text-base select-none">
              �
            </span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}
