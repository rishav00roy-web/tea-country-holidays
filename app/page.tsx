import dynamic from "next/dynamic";
import Hero          from "@/components/hero";
import SectionDivider from "@/components/SectionDivider";
import { BackToTop } from "@/components/back-to-top";

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

        {/* #013220 (brand-evergreen) */}
        <Hero />

        {/* hero (#013220) → WhoWeAre (#FEFAEF) */}
        <SectionDivider from="hero" />
        <WhoWeAre />

        {/* cream (#FEFAEF) → PackagesScroll (#FEF0D5 varden) */}
        <SectionDivider from="cream" />
        <PackagesScroll />

        {/* varden (#FEF0D5) → BentoWhyUs (mesh #0A2E1D) */}
        <SectionDivider from="varden" />
        <BentoWhyUs />

        {/* mesh (#0A2E1D) → Destinations (#FEFAEF) */}
        <SectionDivider from="mesh" />
        <Destinations />

        {/* cream (#FEFAEF) → OfferBanner (dark #013220 overlay) */}
        <SectionDivider from="cream" />
        <OfferBanner />

        {/* dark (#013220) → MasonryTestimonials (cream) */}
        <SectionDivider from="dark" />
        <MasonryTestimonials />

        {/* cream (#FEFAEF) → ReviewsMarquee (#013220) */}
        <SectionDivider from="cream" />
        <ReviewsMarquee />

        {/* dark (#013220) → BlogsSection (cream) */}
        <SectionDivider from="dark" />
        <BlogsSection />

        {/* cream (#FEFAEF) → HomeFAQ (#fafaf7) — both light, no divider needed */}
        <HomeFAQ />

      </main>

      <BackToTop />
    </>
  );
}
