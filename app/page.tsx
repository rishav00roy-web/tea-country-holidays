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
        <SectionDivider topColor="#013220" bottomColor="#FEFAEF" curve="down" />
        <WhoWeAre />

        {/* cream (#FEFAEF) → PackagesScroll (#FEF0D5 varden) */}
        <SectionDivider topColor="#FEFAEF" bottomColor="#FEF0D5" curve="up" />
        <PackagesScroll />

        {/* varden (#FEF0D5) → BentoWhyUs (mesh #0A2E1D) */}
        <SectionDivider topColor="#FEF0D5" bottomColor="#0A2E1D" curve="up" />
        <BentoWhyUs />

        {/* mesh (#0A2E1D) → Destinations (#FEFAEF) */}
        <SectionDivider topColor="#0A2E1D" bottomColor="#FEFAEF" curve="down" className="mesh-bg" />
        <Destinations />

        {/* cream (#FEFAEF) → OfferBanner (dark #013220 overlay) */}
        <SectionDivider topColor="#FEFAEF" bottomColor="#013220" curve="up" />
        <OfferBanner />

        {/* dark (#013220) → MasonryTestimonials (cream) */}
        <SectionDivider topColor="#013220" bottomColor="#FEFAEF" curve="down" />
        <MasonryTestimonials />

        {/* cream (#FEFAEF) → ReviewsMarquee (#013220) */}
        <SectionDivider topColor="#FEFAEF" bottomColor="#013220" curve="up" />
        <ReviewsMarquee />

        {/* dark (#013220) → BlogsSection (cream) */}
        <SectionDivider topColor="#013220" bottomColor="#FEFAEF" curve="down" />
        <BlogsSection />

        {/* cream (#FEFAEF) → HomeFAQ (#fafaf7) — both light, no divider needed */}
        <HomeFAQ />

      </main>

      <BackToTop />
    </>
  );
}
