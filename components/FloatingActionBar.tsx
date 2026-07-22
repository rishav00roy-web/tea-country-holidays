"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Map, Phone } from "lucide-react";
export default function FloatingActionBar({
  whatsapp = "918826048272",
  phone = "918826048272",
}: {
  whatsapp?: string;
  phone?: string;
}) {
  const pathname = usePathname();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const updateHeight = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        document.documentElement.style.setProperty('--action-bar-height', `${rect.height}px`);
      }
    };

    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      document.documentElement.style.setProperty('--action-bar-height', '0px');
    };
  }, [pathname]);

  const isHidden = pathname && (pathname.startsWith("/admin") || pathname.startsWith("/login") || pathname === "/_not-found");

  useEffect(() => {
    if (isHidden) {
      document.documentElement.style.setProperty('--action-bar-height', '0px');
    }
  }, [isHidden]);

  if (isHidden) {
    return null;
  }

  const isHomeActive = pathname === "/";
  const isPackagesActive = pathname === "/holidays";

  return (
    <div
      ref={containerRef}
      id="floating-action-bar"
      className="fixed left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-3 md:hidden w-[92%] max-w-[360px]"
      style={{
        bottom: "calc(16px + env(safe-area-inset-bottom))",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      {/* Dark green backdrop pill */}
      <div className="mobile-nav-pill w-full bg-[#1B4332]/95 backdrop-blur-md border border-[#F4A011]/30 rounded-full shadow-2xl py-2 px-6 flex items-center justify-between">
        {/* Home Link */}
        <Link
          href="/"
          className={`flex flex-col items-center justify-center min-h-[44px] gap-0.5 flex-1 text-center transition-colors duration-200 ${
            isHomeActive ? "text-[#e8b84b]" : "text-white/80 hover:text-white"
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[11px] font-medium">Home</span>
        </Link>

        {/* Packages Link */}
        <Link
          href="/holidays"
          className={`flex flex-col items-center justify-center min-h-[44px] gap-0.5 flex-1 text-center transition-colors duration-200 border-x border-white/10 ${
            isPackagesActive ? "text-[#e8b84b]" : "text-white/80 hover:text-white"
          }`}
        >
          <Map className="w-5 h-5" />
          <span className="text-[11px] font-medium">Packages</span>
        </Link>

        {/* Call Link */}
        <a
          href={`tel:+${phone}`}
          className="flex flex-col items-center justify-center min-h-[44px] gap-0.5 flex-1 text-center text-white/80 hover:text-white transition-colors duration-200"
        >
          <Phone className="w-5 h-5" />
          <span className="text-[11px] font-medium">Call Us</span>
        </a>
      </div>
    </div>
  );
}
