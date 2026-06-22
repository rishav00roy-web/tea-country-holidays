# Handoff Report: Milestone 1 Auth Migration

## 1. Observation
The following configurations and files were directly observed:

1. **`package.json`**:
   - Line 12 shows `@supabase/auth-helpers-nextjs` is a dependency:
     ```json
     "@supabase/auth-helpers-nextjs": "^0.10.0",
     ```
   - Line 13 shows `@supabase/supabase-js` is a dependency:
     ```json
     "@supabase/supabase-js": "^2.108.1",
     ```

2. **`PROJECT.md` Interface Contract**:
   - Lines 33-36 define the contract for Supabase SSR Client initialization:
     ```markdown
     ### Supabase SSR Client initialization (lib/supabase.ts or app-router SSR helper)
     - Should export unified helper to create supabase client using `@supabase/ssr`.
     - For route handler / Server Components: `createClient` utilizing cookies configuration.
     - For client components: `createBrowserClient`.
     ```

3. **`lib/supabase.ts`**:
   - Currently exports a static client using `@supabase/supabase-js`:
     ```typescript
     import { createClient } from '@supabase/supabase-js'

     const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://lnrkqyxiwbkvkazyzcbe.supabase.co';
     const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_77hHe5GT89vj8HGt9tXrUg_jQ_McY10';

     export const supabase = createClient(supabaseUrl, supabaseAnonKey)
     ```

4. **`app/auth/callback/route.ts`**:
   - Currently uses `@supabase/auth-helpers-nextjs`'s `createRouteHandlerClient`:
     ```typescript
     import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
     import { cookies } from "next/headers";
     import { NextResponse } from "next/server";

     export async function GET(request: Request) {
       const requestUrl = new URL(request.url);
       const code = requestUrl.searchParams.get("code");

       if (code) {
         const supabase = createRouteHandlerClient({ cookies });
         await supabase.auth.exchangeCodeForSession(code);
       }

       return NextResponse.redirect(requestUrl.origin);
     }
     ```

5. **`hooks/use-auth-gate.ts`**:
   - Currently uses `@supabase/auth-helpers-nextjs`'s `createClientComponentClient`:
     ```typescript
     "use client"
     import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
     import { useRouter } from "next/navigation"
     import { openWhatsApp } from "@/lib/whatsapp"

     export function useAuthGate() {
       const supabase = createClientComponentClient()
       const router = useRouter()

       const gatedWhatsApp = async (message: string, redirectPath?: string) => {
         const { data: { session } } = await supabase.auth.getSession()
         if (!session) {
           const redirect = redirectPath || (typeof window !== "undefined" ? window.location.pathname : "/")
           router.push(`/login?redirect=${encodeURIComponent(redirect)}&reason=quote`)
           return
         }
         openWhatsApp(message)
       }

       return { gatedWhatsApp }
     }
     ```

6. **`app/login/login-content.tsx`**:
   - Line 7 imports `createClientComponentClient` from `@supabase/auth-helpers-nextjs`.
   - Line 64 instantiates the client component helper:
     ```typescript
     const supabase = createClientComponentClient();
     ```

---

## 2. Logic Chain
To complete the Auth Migration from `@supabase/auth-helpers-nextjs` to `@supabase/ssr` while respecting the Interface Contract and target Next.js 16 requirements:

1. **Dependency Update (`package.json`)**:
   - Replacing `@supabase/auth-helpers-nextjs` with `@supabase/ssr` requires deleting `"@supabase/auth-helpers-nextjs"` and adding `"@supabase/ssr": "^0.5.2"`.

2. **Supabase Helper Export (`lib/supabase.ts`)**:
   - To satisfy the interface contract:
     - We must export a client-side helper `createBrowserClient` that instantiates `createBrowserClient` from `@supabase/ssr`. Implementing it as a client-side singleton avoids recreating the client on every hook invocation or re-render.
     - We must export a server-side helper `createClient` that configures `createServerClient` from `@supabase/ssr` with standard Next.js cookie handling.
     - Since `next/headers` is a server-only module, importing it statically at the top of `lib/supabase.ts` causes compilation errors in client components. Therefore, `next/headers` must be dynamically imported (`await import("next/headers")`) inside the async `createClient` function.
     - In Next.js 16, `cookies()` is asynchronous and must be awaited before using its methods (`getAll()`, `setAll()`).

3. **OAuth Callback Handler (`app/auth/callback/route.ts`)**:
   - Swapping out `createRouteHandlerClient({ cookies })` for the new `createClient()` async helper ensures cookies are set correctly during the authentication code exchange flow.

4. **Auth Hooks (`hooks/use-auth-gate.ts`)**:
   - Swapping out `createClientComponentClient()` for `createBrowserClient()` from `@lib/supabase` allows client-side components and hooks to verify current sessions without the deprecated helpers.

5. **Login Form (`app/login/login-content.tsx`)**:
   - Swapping out `createClientComponentClient()` for `createBrowserClient()` from `@lib/supabase` enables sign-in and sign-up flows using the new SSR library.

---

## 3. Caveats
- **Cookies Mutation in Server Components**: Next.js does not allow cookies to be modified inside Server Components (only in Route Handlers and Server Actions). The try-catch block inside `setAll` captures and ignores write attempts in Server Components, which is standard and expected behavior.
- **Middleware**: The current codebase does not have any `middleware.ts` file. Therefore, all auth gating and checks occur on the client side using `useAuthGate`.
- **E2E Tests**: The E2E tests are still being constructed under a separate track, so verification must rely on typechecking and compilation checks.

---

## 4. Conclusion & Precise Strategy
We propose a complete, drop-in strategy to migrate the auth setup.

### Proposed File Modifications

#### A. `package.json`
- **Before**:
  ```json
  "dependencies": {
    "@supabase/auth-helpers-nextjs": "^0.10.0",
    "@supabase/supabase-js": "^2.108.1",
  ```
- **After**:
  ```json
  "dependencies": {
    "@supabase/ssr": "^0.5.2",
    "@supabase/supabase-js": "^2.108.1",
  ```

#### B. `lib/supabase.ts`
Replace the entire file with:
```typescript
import { createServerClient, createBrowserClient as ssrCreateBrowserClient } from '@supabase/ssr'
import type { SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://lnrkqyxiwbkvkazyzcbe.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_77hHe5GT89vj8HGt9tXrUg_jQ_McY10';

let browserClient: SupabaseClient | null = null;

// Helper for client-side components
export function createBrowserClient() {
  if (typeof window === 'undefined') {
    return ssrCreateBrowserClient(supabaseUrl, supabaseAnonKey)
  }
  if (!browserClient) {
    browserClient = ssrCreateBrowserClient(supabaseUrl, supabaseAnonKey)
  }
  return browserClient
}

// Helper for server-side route handlers / Server Components
export async function createClient() {
  const { cookies } = await import('next/headers')
  const cookieStore = await cookies()

  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        } catch {
          // The `setAll` method can be called from a Server Component.
          // This can be ignored if you have middleware refreshing
          // user sessions.
        }
      },
    },
  })
}
```

#### C. `app/auth/callback/route.ts`
Replace the entire file with:
```typescript
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  return NextResponse.redirect(requestUrl.origin);
}
```

#### D. `hooks/use-auth-gate.ts`
Replace the entire file with:
```typescript
"use client"
import { createBrowserClient } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { openWhatsApp } from "@/lib/whatsapp"

export function useAuthGate() {
  const supabase = createBrowserClient()
  const router = useRouter()

  const gatedWhatsApp = async (message: string, redirectPath?: string) => {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      const redirect = redirectPath || (typeof window !== "undefined" ? window.location.pathname : "/")
      router.push(`/login?redirect=${encodeURIComponent(redirect)}&reason=quote`)
      return
    }
    openWhatsApp(message)
  }

  return { gatedWhatsApp }
}
```

#### E. `app/login/login-content.tsx`
- **Before** (line 7):
  ```typescript
  import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
  ```
- **After** (line 7):
  ```typescript
  import { createBrowserClient } from "@/lib/supabase";
  ```
- **Before** (line 64):
  ```typescript
  const supabase = createClientComponentClient();
  ```
- **After** (line 64):
  ```typescript
  const supabase = createBrowserClient();
  ```

---

## 5. Verification Method
1. **Dependency Installation**:
   Ensure dependencies are updated and installed by running:
   ```powershell
   npm install
   ```
2. **Type Safety & Compilation Check**:
   Confirm that all imports and references are resolved correctly and that no Typescript errors exist:
   ```powershell
   npx tsc --noEmit
   ```
3. **Next.js Build Check**:
   Execute the full Next.js build command to verify server-side and client-side bundlers compile everything cleanly:
   ```powershell
   npm run build
   ```
4. **Invalidation Conditions**:
   The verification is invalid if:
   - Client components throw compile-time/runtime errors regarding `next/headers` leakage.
   - Typescript compilation fails due to un-awaited dynamic imports.
   - The `@supabase/ssr` client is instantiated without correct parameters.
