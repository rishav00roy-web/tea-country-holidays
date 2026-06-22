import Navbar              from "@/components/navbar";
import Hero                from "@/components/hero";
import WhoWeAre            from "@/components/who-we-are";
import PackagesScroll      from "@/components/packages-scroll";
import BentoWhyUs          from "@/components/bento-why-us";
import Destinations        from "@/components/destinations";
import MasonryTestimonials from "@/components/masonry-testimonials";
import OfferBanner         from "@/components/offer-banner";
import ReviewsMarquee      from "@/components/reviews-marquee";
import Footer              from "@/components/footer";
import BlogsSection        from "@/components/blogs-section";
import { BackToTop }       from "@/components/back-to-top";

export default function Home() {
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

      <BackToTop />
    </>
  );
}
