"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/require-admin";
import { createAdminClient } from "@/lib/supabase-admin";

export interface Package {
  id: string;
  title: string;
  description: string;
  duration: string;
  theme: string;
  category: string;
  image: string;
  published: boolean;
  created_at: string;
}

export interface PackagePayload {
  title: string;
  description: string;
  duration: string;
  theme: string;
  category: string;
  image: string;
  published: boolean;
}

export async function listPackages(): Promise<Package[] | { __serverError: string }> {
  try {
    await requireAdmin();
    const admin = createAdminClient();

    const { data, error } = await admin
      .from("packages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);
    return data ?? [];
  } catch (err: unknown) {
    return { __serverError: err instanceof Error ? err.message : String(err) };
  }
}

export async function createPackage(payload: PackagePayload): Promise<Package> {
  await requireAdmin();
  const admin = createAdminClient();

  const { data, error } = await admin
    .from("packages")
    .insert([payload])
    .select()
    .single();

  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/holidays");
  revalidatePath("/admin/packages");
  return data;
}

export async function updatePackage(id: string, payload: PackagePayload): Promise<Package> {
  await requireAdmin();
  const admin = createAdminClient();

  const { data, error } = await admin
    .from("packages")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/holidays");
  revalidatePath("/admin/packages");
  return data;
}

export async function deletePackage(id: string): Promise<void> {
  await requireAdmin();
  const admin = createAdminClient();

  const { error } = await admin.from("packages").delete().eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/holidays");
  revalidatePath("/admin/packages");
}

export async function togglePackagePublished(id: string, published: boolean): Promise<void> {
  await requireAdmin();
  const admin = createAdminClient();

  const { error } = await admin
    .from("packages")
    .update({ published })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/holidays");
  revalidatePath("/admin/packages");
}
