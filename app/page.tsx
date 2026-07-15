import nextDynamic from "next/dynamic";
import Hero          from "@/components/hero";
import SectionDivider from "@/components/SectionDivider";
import { BackToTop } from "@/components/back-to-top";
import { createPublicClient } from "@/lib/supabase-public";
import { getSiteSettings } from "@/lib/site-settings";

// Fallback data imports
import { fallbackPackages } from "@/components/packages-scroll";
import { fallbackFAQs } from "@/components/home-faq";
import { fallbackReviews } from "@/components/reviews-marquee";
import { fallbackTestimonials } from "@/lib/reviews-data";

const WhoWeAre            = nextDynamic(() => import("@/components/who-we-are"));
const PackagesScroll      = nextDynamic(() => import("@/components/packages-scroll"));
const BentoWhyUs          = nextDynamic(() => import("@/components/bento-why-us"));
const Destinations        = nextDynamic(() => import("@/components/destinations"));
const OfferBanner         = nextDynamic(() => import("@/components/offer-banner"));
const MasonryTestimonials = nextDynamic(() => import("@/components/masonry-testimonials"));
const ReviewsMarquee      = nextDynamic(() => import("@/components/reviews-marquee"));
const BlogsSection        = nextDynamic(() => import("@/components/blogs-section"));
const HomeFAQ             = nextDynamic(() => import("@/components/home-faq"));

export const revalidate = 3600;

export default async function Home() {
  let carouselPackages = fallbackPackages;
  let faqList = fallbackFAQs;
  let reviewsList = fallbackReviews;
  let testimonialsList = fallbackTestimonials;

  try {
    const supabase = createPublicClient();

    // Parallel server-side data fetching
    const [packagesRes, faqsRes, reviewsRes] = await Promise.all([
      supabase
        .from("packages")
        .select("title, duration, theme, category, image")
        .eq("published", true)
        .order("created_at", { ascending: false })
        .limit(8),
      supabase
        .from("faqs")
        .select("*")
        .order("sort_order", { ascending: true }),
      supabase
        .from("reviews")
        .select("*")
        .eq("published", true)
    ]);

    // Map Packages
    if (!packagesRes.error && packagesRes.data && packagesRes.data.length > 0) {
      carouselPackages = packagesRes.data.map(item => ({
        name: item.title,
        duration: item.duration,
        destination: item.theme || (Array.isArray(item.category) ? item.category[0] : item.category) || "Holiday",
        imageUrl: item.image || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=75"
      }));
    }

    // Map FAQs
    if (!faqsRes.error && faqsRes.data && faqsRes.data.length > 0) {
      faqList = faqsRes.data;
    }

    // Map Reviews & Testimonials
    if (!reviewsRes.error && reviewsRes.data && reviewsRes.data.length > 0) {
      reviewsList = reviewsRes.data.map(item => ({
        id: item.id,
        name: item.name,
        rating: 5,
        date: "Recent",
        review_text: item.review_text || "",
        profile_pic_url: item.photo_url || undefined,
        hasPhoto: false,
        photoUrl: null,
        tour: item.trip_type || "Custom Tour"
      }));

      testimonialsList = reviewsRes.data.map(item => ({
        id: item.id,
        name: item.name,
        rating: "5",
        review_text: item.review_text || "",
        profile_pic_url: item.photo_url || "",
        photos: [] as string[],
        tour: item.trip_type || "Custom Tour"
      }));
    }
  } catch (err) {
    console.error("Failed to fetch homepage data on server:", err);
  }

  const settings = await getSiteSettings();

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
        <PackagesScroll initialPackages={carouselPackages} />

        {/* varden (#FEF0D5) → BentoWhyUs (mesh #0A2E1D) */}
        <div id="bento-why-us-wrapper" className="relative isolate overflow-hidden">
          <SectionDivider topColor="#FEF0D5" bottomColor="#0A2E1D" curve="up" className="bg-transparent" />
          <BentoWhyUs />

          {/* mesh (#0A2E1D) → Destinations (#FEFAEF) */}
          <SectionDivider topColor="#0A2E1D" bottomColor="#FEFAEF" curve="down" className="bg-transparent" />
        </div>
        <Destinations />

        {/* cream (#FEFAEF) → OfferBanner (dark #013220 overlay) */}
        {/* Controlled by the early_bird_enabled toggle in /admin/settings — see lib/site-settings.ts */}
        {settings.earlyBirdEnabled && (
          <div id="offer-banner-wrapper" className="relative overflow-hidden">
            <SectionDivider topColor="#FEFAEF" bottomColor="#013220" curve="up" className="bg-transparent" />
            <OfferBanner
              whatsappNumber={settings.whatsapp}
              bannerText={settings.earlyBirdText}
              deadline={settings.earlyBirdDeadline}
            />
            <SectionDivider topColor="#013220" bottomColor="#FEFAEF" curve="down" className="bg-transparent" />
          </div>
        )}
        <MasonryTestimonials initialTestimonials={testimonialsList} />

        {/* cream (#FEFAEF) → ReviewsMarquee (#013220) */}
        <SectionDivider topColor="#FEFAEF" bottomColor="#013220" curve="up" />
        <ReviewsMarquee initialReviews={reviewsList} />

        {/* dark (#013220) → BlogsSection (cream) */}
        <SectionDivider topColor="#013220" bottomColor="#FEFAEF" curve="down" />
        <BlogsSection />

        {/* cream (#FEFAEF) → HomeFAQ (#fafaf7) — both light, no divider needed */}
        <HomeFAQ initialFAQs={faqList} />

      </main>

      <BackToTop />
    </>
  );
}
