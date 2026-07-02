"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Map, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

export default function FloatingActionBar() {
  const pathname = usePathname();

  // Return null if the path starts with "/admin" or equals/starts with "/login"
  if (pathname && (pathname.startsWith("/admin") || pathname.startsWith("/login"))) {
    return null;
  }

  const isHomeActive = pathname === "/";
  const isPackagesActive = pathname === "/holidays";

  return (
    <div
      id="floating-action-bar"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-3 md:hidden w-[92%] max-w-[360px]"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      {/* WhatsApp bubble with pulsing ring */}
      <a
        href="https://wa.me/918826048272?text=Hi%2C%20I'm%20looking%20to%20plan%20a%20custom%20trip.%20Can%20an%20expert%20help%20me%20out%3F"
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer z-50 self-end mr-2"
        aria-label="Contact us on WhatsApp"
      >
        {/* Pulsing ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-75 animate-ping -z-10" />
        <FaWhatsapp className="w-6 h-6" />
      </a>

      {/* Dark green backdrop pill */}
      <div className="w-full bg-[#1B4332]/95 backdrop-blur-md border border-[#F4A011]/30 rounded-full shadow-2xl py-2 px-6 flex items-center justify-between">
        {/* Home Link */}
        <Link
          href="/"
          className={`flex flex-col items-center gap-0.5 flex-1 text-center transition-colors duration-200 ${
            isHomeActive ? "text-[#e8b84b]" : "text-white/80 hover:text-white"
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-medium">Home</span>
        </Link>

        {/* Packages Link */}
        <Link
          href="/holidays"
          className={`flex flex-col items-center gap-0.5 flex-1 text-center transition-colors duration-200 border-x border-white/10 ${
            isPackagesActive ? "text-[#e8b84b]" : "text-white/80 hover:text-white"
          }`}
        >
          <Map className="w-5 h-5" />
          <span className="text-[10px] font-medium">Packages</span>
        </Link>

        {/* Call Link */}
        <a
          href="tel:+918826048272"
          className="flex flex-col items-center gap-0.5 flex-1 text-center text-white/80 hover:text-white transition-colors duration-200"
        >
          <Phone className="w-5 h-5" />
          <span className="text-[10px] font-medium">Call Us</span>
        </a>
      </div>
    </div>
  );
}
