-- Create Packages Table
CREATE TABLE IF NOT EXISTS public.packages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text NOT NULL,
  duration text NOT NULL,
  theme text NOT NULL,
  category text NOT NULL,
  image text NOT NULL,
  published boolean DEFAULT false NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Create Hotels Table
CREATE TABLE IF NOT EXISTS public.hotels (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  city text NOT NULL,
  description text NOT NULL,
  image text NOT NULL,
  price numeric NOT NULL,
  rating numeric NOT NULL,
  published boolean DEFAULT false NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Create Blog Posts Table
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text NOT NULL,
  cover_image text NOT NULL,
  content text NOT NULL,
  published boolean DEFAULT false NOT NULL,
  published_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Create FAQs Table
CREATE TABLE IF NOT EXISTS public.faqs (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  question text NOT NULL,
  answer text NOT NULL,
  sort_order integer DEFAULT 0 NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Enable RLS (Since we use Service Role Key for Admin, regular users only get SELECT)
ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hotels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published items
CREATE POLICY "Allow public read-only on published packages" ON public.packages FOR SELECT USING (published = true);
CREATE POLICY "Allow public read-only on published hotels" ON public.hotels FOR SELECT USING (published = true);
CREATE POLICY "Allow public read-only on published blog posts" ON public.blog_posts FOR SELECT USING (published = true);
CREATE POLICY "Allow public read-only on all FAQs" ON public.faqs FOR SELECT USING (true);
