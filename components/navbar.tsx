"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, User, Map, Building2, Plane, Train, Calendar, Info, BookOpen, Phone } from "lucide-react";

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

const LINK_ICONS: Record<string, React.ComponentType<any>> = {
  "Holidays": Map,
  "Hotels": Building2,
  "Flights": Plane,
  "Railways": Train,
  "Events": Calendar,
  "About": Info,
  "Blogs": BookOpen,
  "Contact": Phone,
};

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDark,     setIsDark]     = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const pathname = usePathname();

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
      {/* ── Main nav bar ── */}
      <nav className="fixed top-0 inset-x-0 z-50 transition-all duration-300 py-0 px-0 md:py-4 md:px-4 bg-transparent pointer-events-none">
        <div
          className="max-w-7xl mx-auto px-3 md:px-6 py-3 md:py-2.5 rounded-none md:rounded-full flex items-center justify-between gap-2 md:gap-6 pointer-events-auto border-b border-x-0 border-t-0 md:border transition-all duration-300 w-full"
          style={{
            background: scrolled
              ? (isDark ? "#1B4332" : "#FAFAF8")
              : (isDark ? "rgba(13, 31, 26, 0.25)" : "rgba(255, 255, 255, 0.08)"),
            backdropFilter: scrolled ? "none" : "blur(16px)",
            WebkitBackdropFilter: scrolled ? "none" : "blur(16px)",
            borderColor: scrolled
              ? (isDark ? "rgba(200, 134, 10, 0.3)" : "rgba(45, 80, 22, 0.25)")
              : "rgba(255, 255, 255, 0.15)",
            boxShadow: scrolled ? "0 4px 20px rgba(0, 0, 0, 0.15)" : "none",
          }}
        >

          {/* ── Logo ── */}
          <Link href="/" className="shrink-0 flex items-center" style={{ background: "transparent" }}>
            <img
              src="/logo.png"
              alt="Tea Country Holidays"
              className="h-9 md:h-12 w-auto"
              style={{
                background: 'transparent',
                backgroundColor: 'transparent',
                border: 'none',
                boxShadow: 'none',
                padding: 0,
                objectFit: 'contain'
              }}
            />
          </Link>

          {/* ── Desktop links ── */}
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

          {/* ── Right controls ── */}
          <div className="hidden md:flex navbar-right gap-1.5">

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

            <Link href="https://wa.me/918826048272?text=Hi,%20I'm%20looking%20to%20plan%20a%20custom%20trip.%20Can%20an%20expert%20help%20me%20out?"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand-gold hover:bg-amber-400 text-brand-evergreen font-bold px-6 py-2.5 rounded-full text-sm transition-all duration-200 shadow hover:shadow-lg hover:-translate-y-0.5">
              Consult an Expert
            </Link>
          </div>

          {/* ── Hamburger / Mobile Controls ── */}
          <div className="flex md:hidden items-center gap-1.5">
            {/* Mobile Dark Mode Toggle */}
            <label className="switch scale-75 origin-right" title="Toggle dark mode" aria-label="Toggle dark mode">
              <input id="darkToggleMobileNavbar" type="checkbox" checked={isDark} onChange={toggleDark} />
              <span className="slider round">
                <span className="sun-moon">
                  <svg id="moon-dot-1" className="moon-dot" viewBox="0 0 6 6"><circle cx="3" cy="3" r="3"/></svg>
                  <svg id="moon-dot-2" className="moon-dot" viewBox="0 0 10 10"><circle cx="5" cy="5" r="5"/></svg>
                  <svg id="moon-dot-3" className="moon-dot" viewBox="0 0 3 3"><circle cx="1.5" cy="1.5" r="1.5"/></svg>
                  <svg id="light-ray-1" viewBox="0 0 43 43"><circle cx="21.5" cy="21.5" r="21.5"/></svg>
                  <svg id="light-ray-2" viewBox="0 0 55 55"><circle cx="27.5" cy="27.5" r="27.5"/></svg>
                  <svg id="light-ray-3" viewBox="0 0 60 60"><circle cx="30" cy="30" r="30"/></svg>
                </span>
                <svg id="cloud-1" className="cloud-light" viewBox="0 0 40 20"><ellipse cx="20" cy="14" rx="18" ry="8"/><ellipse cx="14" cy="10" rx="10" ry="7"/><ellipse cx="26" cy="10" rx="8" ry="6"/></svg>
                <svg id="cloud-3" className="cloud-dark"  viewBox="0 0 30 16"><ellipse cx="15" cy="11" rx="13" ry="6"/><ellipse cx="10" cy="7"  rx="7"  ry="5"/><ellipse cx="20" cy="7"  rx="6"  ry="4"/></svg>
                <span className="stars">
                  <svg id="star-1" className="star" viewBox="0 0 20 20"><polygon points="10,2 12,8 18,8 13,12 15,18 10,14 5,18 7,12 2,8 8,8"/></svg>
                  <svg id="star-2" className="star" viewBox="0 0 6 6"><polygon points="3,0 3.7,2.3 6,2.3 4.1,3.7 4.8,6 3,4.6 1.2,6 1.9,3.7 0,2.3 2.3,2.3"/></svg>
                  <svg id="star-3" className="star" viewBox="0 0 12 12"><polygon points="6,1 7.4,4.6 11,4.6 8.2,7 9.3,11 6,8.6 2.7,11 3.8,7 1,4.6 4.6,4.6"/></svg>
                  <svg id="star-4" className="star" viewBox="0 0 18 18"><polygon points="9,1 11,7 17,7 12,10.5 14,17 9,13 4,17 6,10.5 1,7 7,7"/></svg>
                </span>
              </span>
            </label>

            {/* Hamburger Button */}
            <button
              className="p-2 rounded-md min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
              aria-label="Toggle menu"
              onClick={() => setMobileOpen(v => !v)}
            >
              {mobileOpen
                ? <X    className={`w-6 h-6 transition-colors duration-300 ${scrolled && !isDark ? "text-[#2D5016]" : "text-white"}`} />
                : <Menu className={`w-6 h-6 transition-colors duration-300 ${scrolled && !isDark ? "text-[#2D5016]" : "text-white"}`} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile menu overlay backdrop ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden transition-opacity duration-300"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Mobile menu drawer ── */}
      <div className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-[320px] bg-[#FAFAF8] dark:bg-[#0f2419] flex flex-col h-full shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
        mobileOpen ? "translate-x-0" : "translate-x-full"
      }`}>
        {/* Top area */}
        <div className="flex items-center justify-between p-4 border-b border-brand-gold/10 dark:border-white/10">
          <Link href="/" onClick={() => setMobileOpen(false)}>
            <img src="/logo.png" alt="Tea Country Holidays" className="h-10 w-auto object-contain" />
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2 text-[#1B4332] dark:text-[#FAFAF8] min-w-[44px] min-h-[44px] flex items-center justify-center cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Links list */}
        <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-1">
          {NAV_LINKS.map(l => {
            const IconComp = LINK_ICONS[l.name] || Info;
            const isActive = pathname === l.href || (pathname === '/' && l.href.startsWith('/#'));

            return l.isPlaceholder ? (
              <div key={l.name} className="flex items-center justify-between px-6 py-3.5 border-l-4 border-transparent opacity-50">
                <div className="flex items-center gap-4">
                  <IconComp className="w-6 h-6 text-[#F4A011] shrink-0" />
                  <span className="text-[#1B4332] dark:text-[#FAFAF8] text-lg font-serif">{l.name}</span>
                </div>
                <span className="text-[10px] font-bold text-[#F4A011] bg-[#F4A011]/10 border border-[#F4A011]/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Soon
                </span>
              </div>
            ) : (
              <Link
                key={l.name}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-4 px-6 py-3.5 border-l-4 font-serif text-lg transition-all ${
                  isActive
                    ? "border-[#F4A011] bg-green-50 dark:bg-emerald-950/20 text-[#1B4332] dark:text-[#FAFAF8]"
                    : "border-transparent text-[#1B4332] dark:text-[#FAFAF8] hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                <IconComp className="w-6 h-6 text-[#F4A011] shrink-0" />
                <span>{l.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Bottom area */}
        <div className="p-6 border-t border-brand-gold/10 dark:border-white/10 space-y-4">
          <a
            href="https://wa.me/918826048272?text=Hi,%20I'm%20looking%20to%20plan%20a%20custom%20trip.%20Can%20an%20expert%20help%20me%20out?"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold rounded-xl transition-all shadow-md active:scale-95 text-base cursor-pointer"
          >
            <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.023-5.116-2.887-6.98-1.866-1.865-4.343-2.891-6.983-2.893-5.446 0-9.87 4.42-9.874 9.865-.001 1.748.461 3.453 1.337 4.975l-.94 3.432 3.515-.922zm11.199-7.558c-.305-.153-1.805-.89-2.085-.992-.28-.102-.483-.153-.686.153-.203.305-.788.992-.966 1.196-.178.203-.356.229-.66.076-.304-.152-1.287-.475-2.451-1.513-.906-.809-1.517-1.809-1.695-2.114-.178-.305-.019-.47.132-.621.136-.136.305-.318.457-.478.152-.16.203-.274.305-.457.102-.183.05-.343-.025-.496-.076-.153-.686-1.654-.94-2.264-.247-.595-.5-.514-.685-.523-.178-.009-.38-.01-.584-.01-.203 0-.534.076-.813.38-.28.305-1.066 1.042-1.066 2.541 0 1.5 1.092 2.947 1.244 3.15.152.204 2.15 3.284 5.208 4.604.728.314 1.296.502 1.74.643.717.228 1.37.196 1.887.118.577-.085 1.805-.738 2.06-1.424.253-.686.253-1.271.177-1.373-.076-.102-.28-.153-.584-.305z"/>
            </svg>
            <span>Consult an Expert</span>
          </a>

          <div className="flex items-center justify-between bg-black/5 dark:bg-white/5 p-3 rounded-xl">
            <div className="text-left">
              <p className="text-[10px] text-[#1B4332]/50 dark:text-cream/50 uppercase tracking-wider font-semibold">Call Support</p>
              <p className="text-sm font-bold text-[#1B4332] dark:text-[#FAFAF8]">+91 88260 48272</p>
            </div>
            <a
              href="tel:+918826048272"
              className="bg-[#F4A011] hover:bg-amber-500 text-[#1B4332] font-bold p-2.5 rounded-lg flex items-center justify-center transition-all shadow active:scale-95 cursor-pointer"
              title="Call support"
            >
              <Phone className="w-5 h-5 shrink-0" />
            </a>
          </div>
        </div>
      </div>

      {/* ── Login Modal ── */}
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
