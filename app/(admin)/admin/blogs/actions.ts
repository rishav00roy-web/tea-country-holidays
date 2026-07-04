"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/require-admin";
import { createAdminClient } from "@/lib/supabase-admin";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  cover_image: string;
  content: string;
  published: boolean;
  published_at: string | null;
}

export interface BlogPostPayload {
  title: string;
  slug: string;
  excerpt: string;
  cover_image: string;
  content: string;
  published: boolean;
  published_at: string | null;
}

function friendlyBlogError(error: { code?: string; message: string }): Error {
  if (error.code === "23505") {
    return new Error("This slug is already taken. Please choose a unique slug.");
  }
  return new Error(error.message);
}

export async function listBlogs(): Promise<BlogPost[]> {
  await requireAdmin();
  const admin = createAdminClient();

  const { data, error } = await admin
    .from("blog_posts")
    .select("*")
    .order("published_at", { ascending: false, nullsFirst: false });

  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function createBlog(payload: BlogPostPayload): Promise<BlogPost> {
  await requireAdmin();
  const admin = createAdminClient();

  const { data, error } = await admin
    .from("blog_posts")
    .insert([payload])
    .select()
    .single();

  if (error) throw friendlyBlogError(error);
  revalidatePath("/");
  revalidatePath(`/blog/${payload.slug}`);
  revalidatePath("/admin/blogs");
  return data;
}

export async function updateBlog(id: string, payload: BlogPostPayload): Promise<BlogPost> {
  await requireAdmin();
  const admin = createAdminClient();

  const { data, error } = await admin
    .from("blog_posts")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw friendlyBlogError(error);
  revalidatePath("/");
  revalidatePath(`/blog/${payload.slug}`);
  revalidatePath("/admin/blogs");
  return data;
}

export async function deleteBlog(id: string): Promise<void> {
  await requireAdmin();
  const admin = createAdminClient();

  const { error } = await admin.from("blog_posts").delete().eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin/blogs");
}

export async function toggleBlogPublished(
  id: string,
  published: boolean,
  published_at: string | null
): Promise<void> {
  await requireAdmin();
  const admin = createAdminClient();

  const { error } = await admin
    .from("blog_posts")
    .update({ published, published_at })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/");
  revalidatePath("/admin/blogs");
}
