## 2026-06-21T16:31:28Z
You are Worker for Milestone 1. Your working directory is C:\Users\User\.gemini\antigravity\scratch\tea-country-holidays\.agents\worker_m1.
Your task is to implement the Auth Migration (Milestone 1).

MANDATORY INTEGRITY WARNING:
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A Forensic Auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

Please execute these steps:
1. Update `package.json` to replace `@supabase/auth-helpers-nextjs` with `@supabase/ssr` (version `^0.5.2`).
2. Run `npm install` (using your own code/command execution capability) to install dependencies.
3. Refactor `lib/supabase.ts` to implement the interface contracts:
   - Export `createBrowserClient()` using `@supabase/ssr` for client components.
   - Export `createClient()` (asynchronous server client) using `@supabase/ssr` with cookie options.
   - Crucial: Dynamic import `await import('next/headers')` inside `createClient()` so `next/headers` does not leak to client-side components.
4. Refactor `app/auth/callback/route.ts` to use the new server client helper.
5. Refactor `hooks/use-auth-gate.ts` and `app/login/login-content.tsx` to use the new browser client helper.
6. Create `middleware.ts` in the root directory to handle session refreshing via `@supabase/ssr`. Ensure to handle cookie options correctly for Next.js App Router.
7. Run the compiler check `npx tsc --noEmit` and build command `npm run build` to ensure the project compiles and builds successfully with no errors.

Once you have verified the build compiles successfully, write your findings and build/test outputs to handoff.md in your working directory and notify me.
