# Project Context: tea-country-holidays

## Environment Configuration
- supabaseUrl = `https://lnrkqyxiwbkvkazyzcbe.supabase.co`
- supabaseAnonKey = `sb_publishable_77hHe5GT89vj8HGt9tXrUg_jQ_McY10`
- `.env.local` contains Supabase connection keys (URL and Anon key).

## Target Dependencies
- Migrating from `@supabase/auth-helpers-nextjs` to `@supabase/ssr` to support modern Next.js async cookies.
- React version: 19.2.4
- Next.js version: 16.2.9
- TailwindCSS version: 4.0.0-alpha (using postcss/vite configuration).

## Current Pages
- `/` (Home)
- `/blog` (using `app/blog/[slug]/page.tsx`)
- `/login` (using `app/login/page.tsx`, renders client content `login-content.tsx`)
- `/holidays` (renders `holidays-content.tsx`)
- `/hotels` (renders `hotels-content.tsx`)
- `/events` (renders `events-content.tsx`)
- `/flights` (renders `flights-content.tsx`)
- `/railways` (renders `railways-content.tsx`)
