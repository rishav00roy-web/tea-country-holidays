import { cache } from "react";
import { createPublicClient } from "@/lib/supabase-public";

export interface SiteSettings {
  phone: string;
  whatsapp: string;
  address: string;
  earlyBirdEnabled: boolean;
  earlyBirdText: string;
  earlyBirdDeadline: string;
}

// Fallback values match what was previously hardcoded across the site, so
// nothing changes visually if site_settings is empty, unreachable, or the
// anon key doesn't have SELECT access to it yet (see note below).
const DEFAULT_SETTINGS: SiteSettings = {
  phone: "918826048272",
  whatsapp: "918826048272",
  address: "G.S. Road, Christian Basti, Guwahati, Assam 781005",
  earlyBirdEnabled: false,
  earlyBirdText: "Save on your next holiday! Book before the deadline.",
  earlyBirdDeadline: "",
};

/**
 * Public, read-only site settings for use on live pages (home, footer,
 * navbar, terms, privacy, faq, holidays, blog, etc). Wrapped in React's
 * cache() so multiple components reading this during the same server
 * render only trigger one Supabase query, not one per caller.
 *
 * IMPORTANT: this reads with the regular anon-key server client, not the
 * service-role admin client — site_settings needs a public SELECT RLS
 * policy for this to actually return live data instead of always falling
 * back to DEFAULT_SETTINGS. If that policy isn't set yet in Supabase,
 * this will silently serve defaults (safe, but stale) rather than throwing
 * on the homepage. Worth checking the Supabase dashboard for this policy.
 */
export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  try {
    const supabase = createPublicClient();
    const { data, error } = await supabase.from("site_settings").select("*");

    if (error || !data) return DEFAULT_SETTINGS;

    const result = { ...DEFAULT_SETTINGS };
    data.forEach((row) => {
      switch (row.key) {
        case "phone":
          if (row.value) result.phone = row.value;
          break;
        case "whatsapp":
          if (row.value) result.whatsapp = row.value;
          break;
        case "address":
          if (row.value) result.address = row.value;
          break;
        case "early_bird_enabled":
          result.earlyBirdEnabled = row.value === "true";
          break;
        case "early_bird_text":
          if (row.value) result.earlyBirdText = row.value;
          break;
        case "early_bird_deadline":
          if (row.value) result.earlyBirdDeadline = row.value;
          break;
      }
    });

    return result;
  } catch (err) {
    console.error("Failed to fetch site settings, using defaults:", err);
    return DEFAULT_SETTINGS;
  }
});
