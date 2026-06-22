"use client";

import { useState } from "react";
import Navbar              from "@/components/navbar";
import Hero                from "@/components/hero";
import WhoWeAre            from "@/components/who-we-are";
import PackagesScroll      from "@/components/packages-scroll";
import BentoWhyUs          from "@/components/bento-why-us";
import Destinations        from "@/components/destinations";
import MasonryTestimonials from "@/components/masonry-testimonials";
import OfferBanner         from "@/components/offer-banner";
import ReviewsMarquee      from "@/components/reviews-marquee";
import BookingModal        from "@/components/booking-modal";
import Footer              from "@/components/footer";
import BlogsSection        from "@/components/blogs-section";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Navbar />

      <main className="flex-1 flex flex-col w-full overflow-hidden">
        <Hero />
        
        <WhoWeAre />
        <PackagesScroll />
        <BentoWhyUs />
        <Destinations />
        <OfferBanner />
        <MasonryTestimonials />
        <ReviewsMarquee />
        <BlogsSection />
      </main>

      <Footer />

      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Back to Top - moved up slightly on mobile so it doesn't hide behind StickyCTA */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-24 md:bottom-6 left-6 z-50 w-11 h-11 bg-brand-evergreen/90 hover:bg-brand-gold border border-brand-gold/30 text-brand-gold hover:text-brand-evergreen rounded-full flex items-center justify-center shadow-xl transition-all hover:-translate-y-1 text-lg hidden sm:flex"
        aria-label="Back to top"
      >
        ↑
      </button>
    </>
  );
}
