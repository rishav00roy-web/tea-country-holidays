"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/require-admin";
import { createClient } from "@/lib/supabase-server";

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  sort_order: number;
}

function revalidateFaqPaths() {
  revalidatePath("/");
  revalidatePath("/faq");
  revalidatePath("/admin/faqs");
}

export async function listFaqs(): Promise<FAQ[]> {
  await requireAdmin();
  const admin = await createClient();

  const { data, error } = await admin
    .from("faqs")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function createFaq(question: string, answer: string): Promise<FAQ> {
  await requireAdmin();
  const admin = await createClient();

  // Compute the next sort_order server-side rather than trusting a value
  // computed from the client's local (possibly stale) list.
  const { data: existing, error: fetchError } = await admin
    .from("faqs")
    .select("sort_order");

  if (fetchError) throw new Error(fetchError.message);
  const maxOrder = existing && existing.length > 0
    ? Math.max(...existing.map((f) => f.sort_order ?? 0))
    : 0;

  const { data, error } = await admin
    .from("faqs")
    .insert([{ question, answer, sort_order: maxOrder + 1 }])
    .select()
    .single();

  if (error) throw new Error(error.message);
  revalidateFaqPaths();
  return data;
}

export async function updateFaq(id: string, question: string, answer: string): Promise<FAQ> {
  await requireAdmin();
  const admin = await createClient();

  const { data, error } = await admin
    .from("faqs")
    .update({ question, answer })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  revalidateFaqPaths();
  return data;
}

export async function deleteFaq(id: string): Promise<void> {
  await requireAdmin();
  const admin = await createClient();

  const { error } = await admin.from("faqs").delete().eq("id", id);

  if (error) throw new Error(error.message);
  revalidateFaqPaths();
}

/**
 * Applies a batch of sort_order updates in one admin-checked call. Used for
 * both the "swap two adjacent rows" case and the "normalize all rows" case
 * that moveFaq() in the page component already computes locally — this
 * action just re-checks admin once and persists whatever set it's given.
 */
export async function reorderFaqs(updates: { id: string; sort_order: number }[]): Promise<void> {
  await requireAdmin();
  const admin = await createClient();

  const results = await Promise.all(
    updates.map((u) =>
      admin.from("faqs").update({ sort_order: u.sort_order }).eq("id", u.id)
    )
  );

  const failed = results.find((r) => r.error);
  if (failed?.error) throw new Error(failed.error.message);
  revalidateFaqPaths();
}
