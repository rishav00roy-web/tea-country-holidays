import dynamic from "next/dynamic";
import Hero          from "@/components/hero";
import SectionDivider from "@/components/SectionDivider";
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
const HomeFAQ             = dynamic(() => import("@/components/home-faq"));

export default function Home() {
  return (
    <>
      <main className="flex-1 flex flex-col w-full overflow-hidden">

        {/* dark */}
        <Hero />

        {/* dark → cream */}
        <SectionDivider from="dark" />
        <WhoWeAre />

        {/* cream → dark */}
        <SectionDivider from="cream" />
        <PackagesScroll />

        {/* dark → dark (mesh-bg); no divider needed */}
        <BentoWhyUs />

        {/* dark → cream */}
        <SectionDivider from="dark" />
        <Destinations />

        {/* cream → dark */}
        <SectionDivider from="cream" />
        <OfferBanner />

        {/* dark → cream */}
        <SectionDivider from="dark" />
        <MasonryTestimonials />

        {/* cream → dark */}
        <SectionDivider from="cream" />
        <ReviewsMarquee />

        {/* dark → cream */}
        <SectionDivider from="dark" />
        <BlogsSection />

        {/* cream → dark */}
        <SectionDivider from="cream" />
        <HomeFAQ />

      </main>

      <BackToTop />
    </>
  );
}
