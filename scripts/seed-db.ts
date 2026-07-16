import { createClient } from "@supabase/supabase-js";
import { fallbackPackages } from "../lib/packages-data";
import { fallbackHotels } from "../app/hotels/hotels-content";
import { fallbackTestimonials } from "../lib/reviews-data";
import { fallbackFAQs } from "../components/home-faq";
import { DEFAULT_SETTINGS } from "../lib/site-settings";
import { blogPosts } from "../app/blog/[slug]/page";
import * as fs from "fs";
import * as path from "path";

// Load .env.local env variables
const envPath = path.join(__dirname, "../.env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  envContent.split("\n").forEach((line) => {
    const parts = line.split("=");
    if (parts.length >= 2) {
      const key = parts[0].trim();
      const val = parts.slice(1).join("=").trim().replace(/^['"]|['"]$/g, "");
      process.env[key] = val;
    }
  });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function main() {
  if (!supabaseUrl || !supabaseServiceKey) {
    console.error("Missing Supabase configuration in .env.local!");
    return;
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  console.log("Starting database seeding...");

  // 1. Seed Packages
  try {
    const { count } = await supabase.from("packages").select("*", { count: "exact", head: true });
    if (count === 0) {
      console.log("Seeding packages...");
      const dbPackages = fallbackPackages.map((pkg) => ({
        title: pkg.title,
        description: pkg.description,
        duration: pkg.duration,
        theme: pkg.theme,
        category: pkg.category[0] || "Domestic",
        image: pkg.image,
        published: true,
      }));
      const { error } = await supabase.from("packages").insert(dbPackages);
      if (error) throw error;
      console.log(`Successfully seeded ${dbPackages.length} packages.`);
    } else {
      console.log("Packages table already has data. Skipping.");
    }
  } catch (err: any) {
    console.error("Failed to seed packages:", err.message);
  }

  // 2. Seed Hotels
  try {
    const { count } = await supabase.from("hotels").select("*", { count: "exact", head: true });
    if (count === 0) {
      console.log("Seeding hotels...");
      const dbHotels = fallbackHotels.map((h) => ({
        name: h.name,
        city: h.city,
        description: h.description,
        price: h.price,
        rating: h.rating,
        image: h.image,
        published: true,
      }));
      const { error } = await supabase.from("hotels").insert(dbHotels);
      if (error) throw error;
      console.log(`Successfully seeded ${dbHotels.length} hotels.`);
    } else {
      console.log("Hotels table already has data. Skipping.");
    }
  } catch (err: any) {
    console.error("Failed to seed hotels:", err.message);
  }

  // 3. Seed FAQs
  try {
    const { count } = await supabase.from("faqs").select("*", { count: "exact", head: true });
    if (count === 0) {
      console.log("Seeding FAQs...");
      const dbFAQs = fallbackFAQs.map((f, idx) => ({
        question: f.question,
        answer: f.answer,
        sort_order: idx + 1,
      }));
      const { error } = await supabase.from("faqs").insert(dbFAQs);
      if (error) throw error;
      console.log(`Successfully seeded ${dbFAQs.length} FAQs.`);
    } else {
      console.log("FAQs table already has data. Skipping.");
    }
  } catch (err: any) {
    console.error("Failed to seed FAQs:", err.message);
  }

  // 4. Seed Reviews
  try {
    const { count } = await supabase.from("reviews").select("*", { count: "exact", head: true });
    if (count === 0 || count === null) {
      console.log("Seeding reviews...");
      const dbReviews = fallbackTestimonials.map((t) => ({
        name: t.name,
        review_text: t.review_text,
        trip_type: "Custom Tour",
        photo_url: t.profile_pic_url,
        published: true,
      }));
      const { error } = await supabase.from("reviews").insert(dbReviews);
      if (error) throw error;
      console.log(`Successfully seeded ${dbReviews.length} reviews.`);
    } else {
      console.log("Reviews table already has data. Skipping.");
    }
  } catch (err: any) {
    console.error("Failed to seed reviews:", err.message);
  }

  // 5. Seed Blogs
  try {
    const { count } = await supabase.from("blog_posts").select("*", { count: "exact", head: true });
    if (count === 0) {
      console.log("Seeding blog posts...");
      const dbBlogs = blogPosts.map((b) => ({
        title: b.title,
        slug: b.slug,
        content: b.content.trim(),
        category: b.category,
        image: b.image,
        read_time: b.readTime,
        published_date: b.date,
        published: true,
      }));
      const { error } = await supabase.from("blog_posts").insert(dbBlogs);
      if (error) throw error;
      console.log(`Successfully seeded ${dbBlogs.length} blog posts.`);
    } else {
      console.log("Blog posts table already has data. Skipping.");
    }
  } catch (err: any) {
    console.error("Failed to seed blog posts:", err.message);
  }

  // 6. Seed Site Settings
  try {
    const { count } = await supabase.from("site_settings").select("*", { count: "exact", head: true });
    if (count === 0) {
      console.log("Seeding site settings...");
      const dbSettings = [
        { key: "phone", value: DEFAULT_SETTINGS.phone },
        { key: "whatsapp", value: DEFAULT_SETTINGS.whatsapp },
        { key: "address", value: DEFAULT_SETTINGS.address },
        { key: "early_bird_text", value: DEFAULT_SETTINGS.earlyBirdText },
        { key: "early_bird_deadline", value: DEFAULT_SETTINGS.earlyBirdDeadline },
        { key: "early_bird_enabled", value: String(DEFAULT_SETTINGS.earlyBirdEnabled) },
      ];
      const { error } = await supabase.from("site_settings").upsert(dbSettings, { onConflict: "key" });
      if (error) throw error;
      console.log(`Successfully seeded site settings.`);
    } else {
      console.log("Site settings table already has data. Skipping.");
    }
  } catch (err: any) {
    console.error("Failed to seed site settings:", err.message);
  }

  console.log("Database seeding completed.");
}

main();
