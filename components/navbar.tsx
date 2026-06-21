"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, User } from "lucide-react";

const NAV_LINKS: { name: string; href: string; isPlaceholder?: boolean }[] = [
  { name: "Holidays",  href: "/holidays" },
  { name: "Hotels",    href: "/hotels" },
  { name: "Flights",   href: "/flights" },
  { name: "Railways",  href: "/railways" },
  { name: "Events",    href: "/events" },
  { name: "About",     href: "/#who-we-are" },
  { name: "Blogs",     href: "/#blogs" },
  { name: "Contact",   href: "/#footer" },
];

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDark,     setIsDark]     = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const toggleDark = () => {
    setIsDark(v => {
      document.body.classList.toggle("dark", !v);
      return !v;
    });
  };

  return (
    <>
      {/* â”€â”€ Main nav bar â”€â”€ */}
      <nav className="fixed top-0 inset-x-0 z-50 transition-all duration-300 py-4 px-4 bg-transparent pointer-events-none">
        <div
          className="max-w-7xl mx-auto px-6 py-2.5 rounded-full flex items-center justify-between gap-6 pointer-events-auto border transition-all duration-300"
          style={{
            background: scrolled
              ? (isDark ? "rgba(13, 31, 26, 0.85)" : "rgba(250, 250, 247, 0.85)")
              : "rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            borderColor: scrolled
              ? (isDark ? "rgba(200, 134, 10, 0.3)" : "rgba(45, 80, 22, 0.25)")
              : "rgba(255, 255, 255, 0.15)",
            boxShadow: scrolled ? "0 8px 32px 0 rgba(0, 0, 0, 0.2)" : "none",
          }}
        >

          {/* â”€â”€ Logo â”€â”€ */}
          <Link href="/" className="shrink-0 flex items-center" style={{ background: "transparent" }}>
            <img
              src="/logo.png"
              alt="Tea Country Holidays"
              style={{
                background: 'transparent',
                backgroundColor: 'transparent',
                border: 'none',
                boxShadow: 'none',
                padding: 0,
                height: '48px',
                width: 'auto',
                objectFit: 'contain'
              }}
            />
          </Link>

          {/* â”€â”€ Desktop links â”€â”€ */}
          <div className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map(l => (
              l.isPlaceholder ? (
                <div key={l.name} className="group relative">
                  <span className={`text-sm font-semibold cursor-pointer transition-colors duration-200 ${
                    scrolled && !isDark ? "text-[#2D5016] hover:text-[#C8860A]" : "text-[#F5F0E8] hover:text-[#C8860A]"
                  }`}>
                    {l.name}
                  </span>
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-[#013220] border border-[#C8860A]/30 text-[#F5F0E8] text-[10px] py-1.5 px-3 rounded shadow-lg whitespace-nowrap z-50">
                    Coming Soon
                  </div>
                </div>
              ) : (
                <Link key={l.name} href={l.href}
                  className={`text-sm font-semibold transition-colors duration-200 ${
                    scrolled && !isDark ? "text-[#2D5016] hover:text-[#C8860A]" : "text-[#F5F0E8] hover:text-[#C8860A]"
                  }`}>
                  {l.name}
                </Link>
              )
            ))}
          </div>

          {/* â”€â”€ Right controls â”€â”€ */}
          <div className="hidden md:flex navbar-right">

            {/* Dark mode toggle */}
            <label className="switch" title="Toggle dark mode" aria-label="Toggle dark mode">
              <input id="darkToggle" type="checkbox" checked={isDark} onChange={toggleDark} />
              <span className="slider round">
                <span className="sun-moon">
                  {/* Moon craters */}
                  <svg id="moon-dot-1" className="moon-dot" viewBox="0 0 6 6"><circle cx="3" cy="3" r="3"/></svg>
                  <svg id="moon-dot-2" className="moon-dot" viewBox="0 0 10 10"><circle cx="5" cy="5" r="5"/></svg>
                  <svg id="moon-dot-3" className="moon-dot" viewBox="0 0 3 3"><circle cx="1.5" cy="1.5" r="1.5"/></svg>
                  {/* Light rays */}
                  <svg id="light-ray-1" viewBox="0 0 43 43"><circle cx="21.5" cy="21.5" r="21.5"/></svg>
                  <svg id="light-ray-2" viewBox="0 0 55 55"><circle cx="27.5" cy="27.5" r="27.5"/></svg>
                  <svg id="light-ray-3" viewBox="0 0 60 60"><circle cx="30" cy="30" r="30"/></svg>
                </span>
                {/* Clouds */}
                <svg id="cloud-1" className="cloud-light" viewBox="0 0 40 20"><ellipse cx="20" cy="14" rx="18" ry="8"/><ellipse cx="14" cy="10" rx="10" ry="7"/><ellipse cx="26" cy="10" rx="8" ry="6"/></svg>
                <svg id="cloud-3" className="cloud-dark"  viewBox="0 0 30 16"><ellipse cx="15" cy="11" rx="13" ry="6"/><ellipse cx="10" cy="7"  rx="7"  ry="5"/><ellipse cx="20" cy="7"  rx="6"  ry="4"/></svg>
                {/* Stars */}
                <span className="stars">
                  <svg id="star-1" className="star" viewBox="0 0 20 20"><polygon points="10,2 12,8 18,8 13,12 15,18 10,14 5,18 7,12 2,8 8,8"/></svg>
                  <svg id="star-2" className="star" viewBox="0 0 6 6"><polygon points="3,0 3.7,2.3 6,2.3 4.1,3.7 4.8,6 3,4.6 1.2,6 1.9,3.7 0,2.3 2.3,2.3"/></svg>
                  <svg id="star-3" className="star" viewBox="0 0 12 12"><polygon points="6,1 7.4,4.6 11,4.6 8.2,7 9.3,11 6,8.6 2.7,11 3.8,7 1,4.6 4.6,4.6"/></svg>
                  <svg id="star-4" className="star" viewBox="0 0 18 18"><polygon points="9,1 11,7 17,7 12,10.5 14,17 9,13 4,17 6,10.5 1,7 7,7"/></svg>
                </span>
              </span>
            </label>

            {/* Login button */}
            <Link 
              href="/login"
              className="relative w-[110px] h-[42px] rounded-xl flex items-center justify-center p-[2px] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-amber-500/20"
              style={{
                background: "linear-gradient(to bottom right, #C8860A 0%, rgba(200, 134, 10, 0) 30%)",
                backgroundColor: "rgba(200, 134, 10, 0.2)",
                textDecoration: "none"
              }}
            >
              <div className={`w-full h-full rounded-[10px] flex items-center justify-center gap-2 font-semibold text-sm transition-colors duration-300 ${
                scrolled && !isDark ? "bg-[#FAFAF7] text-[#2D5016]" : "bg-[#1a2e0f] text-[#F5F0E8]"
              }`}>
                <User className={`w-4 h-4 transition-colors duration-300 ${scrolled && !isDark ? "text-[#2D5016]" : "text-[#F5F0E8]"}`} />
                <span>Login</span>
              </div>
            </Link>

            <Link href="#"
              className="bg-brand-gold hover:bg-amber-400 text-brand-evergreen font-bold px-6 py-2.5 rounded-full text-sm transition-all duration-200 shadow hover:shadow-lg hover:-translate-y-0.5">
              Book Now
            </Link>
          </div>

          {/* â”€â”€ Hamburger â”€â”€ */}
          <button className="md:hidden p-2 rounded-md" aria-label="Toggle menu"
            onClick={() => setMobileOpen(v => !v)}>
            {mobileOpen
              ? <X    className={`w-6 h-6 transition-colors duration-300 ${scrolled && !isDark ? "text-[#2D5016]" : "text-white"}`} />
              : <Menu className={`w-6 h-6 transition-colors duration-300 ${scrolled && !isDark ? "text-[#2D5016]" : "text-white"}`} />}
          </button>
        </div>
      </nav>

      {/* â”€â”€ Mobile drawer â”€â”€ */}
      <div className={`fixed inset-0 z-40 bg-[#FAFAF7] dark:bg-[#0d1f1a] flex flex-col pt-24 px-8 transition-transform duration-300 ease-in-out md:hidden ${
        mobileOpen ? "translate-x-0" : "translate-x-full"
      }`}>
        {NAV_LINKS.map(l => (
          l.isPlaceholder ? (
            <div key={l.name} className="flex items-center justify-between border-b border-[#2D5016]/10 dark:border-white/10 py-5">
              <span className="text-[#2D5016]/40 dark:text-white/40 text-2xl font-serif">
                {l.name}
              </span>
              <span className="text-xs font-bold text-[#C8860A] bg-[#C8860A]/10 border border-[#C8860A]/20 px-3 py-1 rounded-full uppercase tracking-wider">
                Soon
              </span>
            </div>
          ) : (
            <Link key={l.name} href={l.href}
              className="text-[#2D5016] dark:text-[#F5F0E8] text-2xl font-serif border-b border-[#2D5016]/10 dark:border-white/10 py-5 hover:text-[#C8860A] transition-colors"
              onClick={() => setMobileOpen(false)}>
              {l.name}
            </Link>
          )
        ))}
        <div className="pt-8 flex items-center gap-6">
          <Link href="#"
            className="bg-brand-gold text-brand-evergreen font-bold px-8 py-3 rounded-full text-lg"
            onClick={() => setMobileOpen(false)}>
            Book Now
          </Link>
          <Link 
            href="/login"
            className="user-profile" 
            onClick={() => setMobileOpen(false)}
            style={{ textDecoration: "none" }}
          >
            <div className="user-profile-inner">
              <User className="w-5 h-5 text-[#F5F0E8]" />
              <span>Login</span>
            </div>
          </Link>
          <label className="switch">
            <input id="darkToggleMobile" type="checkbox" checked={isDark} onChange={toggleDark} />
            <span className="slider round"><span className="sun-moon" /></span>
          </label>
        </div>
      </div>

      {/* â”€â”€ Login Modal â”€â”€ */}
      {showLoginModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#013220]/75 backdrop-blur-sm" onClick={() => setShowLoginModal(false)} />
          <div className="relative bg-[#FAFAF7] dark:bg-[#0d1f1a] rounded-2xl shadow-2xl w-full max-w-md p-8 border border-[#C8860A]/20 text-center animate-[fadeUp_0.4s_ease_both]">
            <button 
              onClick={() => setShowLoginModal(false)} 
              className="absolute top-4 right-4 text-brand-evergreen/60 dark:text-white/60 hover:text-brand-evergreen dark:hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-16 h-16 rounded-full bg-[#C8860A]/10 flex items-center justify-center mx-auto mb-4 border border-[#C8860A]/20">
              <User className="w-8 h-8 text-[#C8860A]" />
            </div>
            <h3 className="font-serif text-brand-evergreen dark:text-white text-2xl font-bold mb-2">Member Login</h3>
            <p className="text-brand-evergreen/60 dark:text-white/60 text-sm mb-6">
              Unlock premium itineraries, special discounts, and track your bookings.
            </p>
            <div className="space-y-4 text-left">
              <div>
                <label className="text-xs font-semibold text-brand-evergreen/70 dark:text-white/70 uppercase tracking-wider block mb-1">Email Address</label>
                <input type="email" placeholder="you@example.com"
                  className="w-full px-4 py-3 bg-white dark:bg-black/35 border border-[#C8860A]/20 rounded-xl text-sm focus:border-[#C8860A] outline-none text-brand-evergreen dark:text-white" />
              </div>
              <div>
                <label className="text-xs font-semibold text-brand-evergreen/70 dark:text-white/70 uppercase tracking-wider block mb-1">Password</label>
                <input type="password" placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
                  className="w-full px-4 py-3 bg-white dark:bg-black/35 border border-[#C8860A]/20 rounded-xl text-sm focus:border-[#C8860A] outline-none text-brand-evergreen dark:text-white" />
              </div>
            </div>
            <button 
              onClick={() => {
                alert("Demo Login successful!");
                setShowLoginModal(false);
              }}
              className="w-full mt-6 bg-[#C8860A] hover:bg-amber-500 text-brand-evergreen font-bold py-3 rounded-xl transition-all shadow-lg hover:shadow-xl font-sans"
            >
              Login
            </button>
            <p className="text-xs text-brand-evergreen/40 dark:text-white/40 mt-4">
              Don't have an account? <span className="text-[#C8860A] cursor-pointer hover:underline">Sign up</span>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
