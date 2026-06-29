"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie } from "lucide-react";

export default function CookieBanner() {
  const [hasChecked, setHasChecked] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (consent === "accepted" || consent === "declined") {
      setIsVisible(false);
    }
    setHasChecked(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setIsVisible(false);
  };

  if (hasChecked && !isVisible) return null;

  return (
    <div
      data-testid="cookie-consent-banner"
      className="cookie-consent-banner fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md bg-[#1B4332] text-white p-5 rounded-2xl shadow-2xl border border-brand-gold/30 z-50 flex flex-col gap-4 transition-all duration-300 animate-in fade-in slide-in-from-bottom-5"
    >
      <div className="flex gap-3 items-start">
        <div className="p-2 bg-white/10 rounded-xl shrink-0 text-[#F4A011]">
          <Cookie className="h-5 w-5" />
        </div>
        <div>
          <h4 className="font-serif text-base font-bold text-[#F4A011] mb-1">
            Cookie Consent
          </h4>
          <p className="text-white/80 text-xs leading-relaxed">
            We use cookies to improve your browsing experience, analyze site traffic, and personalize travel itineraries. By clicking &ldquo;Accept&rdquo;, you consent to our use of cookies. Read our{" "}
            <Link href="/privacy" className="underline text-[#F4A011] hover:text-white transition-colors">
              Privacy Policy
            </Link>{" "}
            for details.
          </p>
        </div>
      </div>
      <div className="flex gap-2.5 justify-end mt-1">
        <button
          onClick={handleDecline}
          className="px-4 py-2 border border-white/20 rounded-lg text-xs font-semibold hover:bg-white/10 hover:border-white/40 active:bg-white/5 transition-all cursor-pointer text-white"
        >
          Decline
        </button>
        <button
          onClick={handleAccept}
          className="px-5 py-2 bg-[#F4A011] text-[#1B4332] font-bold rounded-lg text-xs hover:bg-[#d48c0f] hover:text-white active:bg-[#F4A011] shadow-md transition-all cursor-pointer"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
