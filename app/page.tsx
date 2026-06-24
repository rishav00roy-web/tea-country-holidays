import dynamic from "next/dynamic";
import Hero     from "@/components/hero";
import { BackToTop } from "@/components/back-to-top";

// Below-fold sections: code-split and lazy-loaded so they don't
// block the hero from painting. Each gets a null fallback (no
// skeleton flash) since they all start off-screen.
const WhoWeAre            = dynamic(() => import("@/components/who-we-are"));
const PackagesScroll      = dynamic(() => import("@/components/packages-scroll"));
const BentoWhyUs          = dynamic(() => import("@/components/bento-why-us"));
const Destinations        = dynamic(() => import("@/components/destinations"));
const OfferBanner         = dynamic(() => import("@/components/offer-banner"));
const MasonryTestimonials = dynamic(() => import("@/components/masonry-testimonials"));
const ReviewsMarquee      = dynamic(() => import("@/components/reviews-marquee"));
const BlogsSection        = dynamic(() => import("@/components/blogs-section"));

export default function Home() {
  return (
    <>
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

      <BackToTop />
    </>
  );
}
