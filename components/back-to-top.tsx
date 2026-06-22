"use client";

export function BackToTop() {
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-24 md:bottom-16 left-6 z-50 w-11 h-11 bg-brand-evergreen/90 hover:bg-brand-gold border border-brand-gold/30 text-brand-gold hover:text-brand-evergreen rounded-full flex items-center justify-center shadow-xl transition-all hover:-translate-y-1 text-lg hidden sm:flex cursor-pointer"
      aria-label="Back to top"
    >
      ↑
    </button>
  );
}
