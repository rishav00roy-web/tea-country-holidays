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
      {/* WhatsApp bubble with pulsing ring */}
      <a
        href={`https://wa.me/${whatsapp}?text=Hi%2C%20I'm%20looking%20to%20plan%20a%20custom%20trip.%20Can%20an%20expert%20help%20me%20out%3F`}
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-btn relative flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer z-50 self-end mr-2"
        aria-label="Contact us on WhatsApp"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.333 4.993L2 22l5.13-1.344a9.92 9.92 0 004.881 1.281h.005c5.507 0 9.99-4.48 9.99-9.988C22.007 6.478 17.524 2 12.012 2zm5.72 14.156c-.235.66-1.362 1.218-1.875 1.277-.456.052-.904.22-2.923-.578-2.427-.96-3.99-3.42-4.11-3.582-.121-.161-1.012-1.345-1.012-2.565 0-1.22.636-1.822.862-2.072.227-.25.49-.313.65-.313.16 0 .324.002.463.008.146.006.342-.056.536.406.2.477.683 1.666.746 1.792.062.126.104.272.02.438-.083.167-.125.272-.25.417-.124.146-.262.327-.375.438-.125.124-.256.26-.11.51.147.25.65.1.8 1.488 2.052.743.66.19 1.216.3 1.562.342.346.043.547.018.75-.22.203-.236.862-.998 1.094-1.34.23-.343.46-.288.766-.175.305.112 1.933.91 2.268 1.077.335.166.558.248.64.388.083.14.083.812-.152 1.472z"/>
        </svg>
      </a>

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
