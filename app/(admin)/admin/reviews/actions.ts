"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/require-admin";
import { createAdminClient } from "@/lib/supabase-admin";

export interface Review {
  id: string;
  name: string;
  review_text: string;
  trip_type: string;
  photo_url: string;
  published: boolean;
}

export interface ReviewPayload {
  name: string;
  review_text: string;
  trip_type: string;
  photo_url: string;
  published: boolean;
}

function revalidateReviewPaths() {
  revalidatePath("/");
  revalidatePath("/admin/reviews");
}

export async function listReviews(): Promise<Review[]> {
  await requireAdmin();
  const admin = createAdminClient();

  const { data, error } = await admin
    .from("reviews")
    .select("*")
    .order("name", { ascending: true });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function createReview(payload: ReviewPayload): Promise<Review> {
  await requireAdmin();
  const admin = createAdminClient();

  const { data, error } = await admin
    .from("reviews")
    .insert([payload])
    .select()
    .single();

  if (error) throw new Error(error.message);
  revalidateReviewPaths();
  return data;
}

export async function updateReview(id: string, payload: ReviewPayload): Promise<Review> {
  await requireAdmin();
  const admin = createAdminClient();

  const { data, error } = await admin
    .from("reviews")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  revalidateReviewPaths();
  return data;
}

export async function deleteReview(id: string): Promise<void> {
  await requireAdmin();
  const admin = createAdminClient();

  const { error } = await admin.from("reviews").delete().eq("id", id);

  if (error) throw new Error(error.message);
  revalidateReviewPaths();
}

export async function toggleReviewPublished(id: string, published: boolean): Promise<void> {
  await requireAdmin();
  const admin = createAdminClient();

  const { error } = await admin
    .from("reviews")
    .update({ published })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidateReviewPaths();
}
