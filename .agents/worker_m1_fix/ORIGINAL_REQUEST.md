## 2026-06-21T16:40:12Z

You are Worker for Milestone 1 Fixes. Your working directory is C:\Users\User\.gemini\antigravity\scratch\tea-country-holidays\.agents\worker_m1_fix.
Your task is to refine and fix the routing/UX issues identified in the Auth Migration (Milestone 1).

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Please execute these changes:
1. Refactor `app/auth/callback/route.ts` to:
   - Extract the `next` query parameter (defaulting to `/`).
   - Use `NextResponse.redirect(new URL(next, requestUrl.origin))` to redirect to the proper path.
   - Wrap the session exchange call in a try-catch block for gracefulness.
2. Refactor `app/login/login-content.tsx` to:
   - Use `useSearchParams` from `next/navigation` to read the `redirect` parameter (defaulting to `/`).
   - For email signup (`emailRedirectTo`) and Google OAuth login (`redirectTo`), append `?next=${encodeURIComponent(redirect)}` to the redirect URLs.
   - For successful login and signup, use `router.push(redirect)` instead of the hardcoded `"/"`.
   - Instead of calling `const supabase = createBrowserClient()` inside the render function (which causes recreate on every render), import the singleton `supabase` instance from `@/lib/supabase` (e.g., `import { supabase } from "@/lib/supabase"`) and use that.
3. Refactor `hooks/use-auth-gate.ts` to also use the singleton `supabase` instance from `@/lib/supabase` instead of calling `createBrowserClient()`.
4. Run compiler check `npx tsc --noEmit` and build command `npm run build` to verify that all changes build and compile correctly.

Once you have verified the build compiles successfully, write your findings and build/test outputs to handoff.md in your working directory and notify me.
