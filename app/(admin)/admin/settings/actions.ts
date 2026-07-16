"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/require-admin";
import { createClient } from "@/lib/supabase-server";

export interface SiteSettingsPayload {
  phone: string;
  whatsapp: string;
  address: string;
  early_bird_text: string;
  early_bird_deadline: string;
  early_bird_enabled: boolean;
}

const SETTINGS_KEYS = [
  "phone",
  "whatsapp",
  "address",
  "early_bird_text",
  "early_bird_deadline",
  "early_bird_enabled",
] as const;

function revalidateSettingsPaths() {
  // Every page that reads from site_settings needs revalidating once a
  // save happens, since this table is the single source of truth for
  // contact details and the early-bird banner across the whole site.
  revalidatePath("/");
  revalidatePath("/admin/settings");
  revalidatePath("/terms");
  revalidatePath("/privacy");
  revalidatePath("/faq");
  revalidatePath("/holidays");
  revalidatePath("/blog/[slug]", "page");
}

/**
 * Reads all site_settings rows for the admin form. This is intentionally
 * separate from lib/site-settings.ts's public getSiteSettings() — that one
 * is for public pages and is cached/best-effort with fallback defaults.
 * This one is admin-only, always fresh, and throws on error so the admin
 * form can surface a real failure instead of silently falling back.
 */
export async function getAdminSiteSettings(): Promise<SiteSettingsPayload> {
  await requireAdmin();
  const admin = await createClient();

  const { data, error } = await admin.from("site_settings").select("*");
  if (error) throw new Error(error.message);

  const result: SiteSettingsPayload = {
    phone: "",
    whatsapp: "",
    address: "",
    early_bird_text: "",
    early_bird_deadline: "",
    early_bird_enabled: false,
  };

  data?.forEach((row) => {
    if (row.key === "early_bird_enabled") {
      result.early_bird_enabled = row.value === "true";
    } else if (row.key === "early_bird_deadline") {
      if (row.value) {
        const dateObj = new Date(row.value);
        result.early_bird_deadline = !isNaN(dateObj.getTime())
          ? dateObj.toISOString().split("T")[0]
          : row.value;
      }
    } else if ((SETTINGS_KEYS as readonly string[]).includes(row.key)) {
      (result as any)[row.key] = row.value ?? "";
    }
  });

  return result;
}

export async function saveSiteSettings(payload: SiteSettingsPayload): Promise<void> {
  await requireAdmin();
  const admin = await createClient();

  const rows = [
    { key: "phone", value: payload.phone },
    { key: "whatsapp", value: payload.whatsapp },
    { key: "address", value: payload.address },
    { key: "early_bird_text", value: payload.early_bird_text },
    { key: "early_bird_deadline", value: payload.early_bird_deadline },
    { key: "early_bird_enabled", value: String(payload.early_bird_enabled) },
  ];

  const { error } = await admin.from("site_settings").upsert(rows, { onConflict: "key" });
  if (error) throw new Error(error.message);

  revalidateSettingsPaths();
}
