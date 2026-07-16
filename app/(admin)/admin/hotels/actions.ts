"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/require-admin";
import { createClient } from "@/lib/supabase-server";

export interface Hotel {
  id: string;
  name: string;
  city: string;
  description: string;
  image: string;
  price: number;
  rating: number;
  published: boolean;
}

export interface HotelPayload {
  name: string;
  city: string;
  description: string;
  image: string;
  price: number;
  rating: number;
  published: boolean;
}

export async function listHotels(): Promise<Hotel[]> {
  await requireAdmin();
  const admin = await createClient();

  const { data, error } = await admin
    .from("hotels")
    .select("*")
    .order("name", { ascending: true });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function createHotel(payload: HotelPayload): Promise<Hotel> {
  await requireAdmin();
  const admin = await createClient();

  const { data, error } = await admin
    .from("hotels")
    .insert([payload])
    .select()
    .single();

  if (error) throw new Error(error.message);
  revalidatePath("/hotels");
  revalidatePath("/admin/hotels");
  return data;
}

export async function updateHotel(id: string, payload: HotelPayload): Promise<Hotel> {
  await requireAdmin();
  const admin = await createClient();

  const { data, error } = await admin
    .from("hotels")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  revalidatePath("/hotels");
  revalidatePath("/admin/hotels");
  return data;
}

export async function deleteHotel(id: string): Promise<void> {
  await requireAdmin();
  const admin = await createClient();

  const { error } = await admin.from("hotels").delete().eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/hotels");
  revalidatePath("/admin/hotels");
}

export async function toggleHotelPublished(id: string, published: boolean): Promise<void> {
  await requireAdmin();
  const admin = await createClient();

  const { error } = await admin
    .from("hotels")
    .update({ published })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/hotels");
  revalidatePath("/admin/hotels");
}
