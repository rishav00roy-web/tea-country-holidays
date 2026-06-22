## 2026-06-21T16:29:20Z
You are Explorer 1. Your working directory is C:\Users\User\.gemini\antigravity\scratch\tea-country-holidays\.agents\explorer_m1_1.
Your task is to analyze Milestone 1: Auth Migration.
Specifically, look at:
1. package.json and how to replace `@supabase/auth-helpers-nextjs` with `@supabase/ssr`.
2. The current initialization in `lib/supabase.ts`. How should we structure the Supabase SSR client helpers according to the Interface Contract in `PROJECT.md`?
   - Should export unified helper to create supabase client using `@supabase/ssr`.
   - For route handler / Server Components: `createClient` utilizing cookies configuration.
   - For client components: `createBrowserClient`.
3. How to rewrite `app/auth/callback/route.ts` to use `@supabase/ssr` and its new API.
4. How to rewrite `hooks/use-auth-gate.ts` to use `@supabase/ssr` or custom hooks.
5. How to rewrite `app/login/login-content.tsx` to use the new browser client helper from `@supabase/ssr` (since it currently uses `createClientComponentClient` from auth helpers).

Read the code files directly. Propose a precise implementation strategy and provide details on how to write the code. Do not modify any files yourself. Report your findings in handoff.md in your working directory.
