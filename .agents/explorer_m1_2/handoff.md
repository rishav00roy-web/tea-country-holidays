# Milestone 1: Auth Migration Analysis Report

## Observation
I conducted a read-only analysis of the project to assess the migration from `@supabase/auth-helpers-nextjs` to `@supabase/ssr` in the context of Next.js 16/15.

1. **Project Dependencies (`package.json`)**:
   - Next.js version: `16.2.9` (line 16)
   - React version: `19.2.4` (line 17)
   - Current Auth Helper: `"@supabase/auth-helpers-nextjs": "^0.10.0"` (line 12)
   - Supabase JS library: `"@supabase/supabase-js": "^2.108.1"` (line 13)

2. **Supabase Client Initialization (`lib/supabase.ts`)**:
   - Currently exports a static Supabase client initialized via `@supabase/supabase-js`:
     ```typescript
     import { createClient } from '@supabase/supabase-js'
     const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://lnrkqyxiwbkvkazyzcbe.supabase.co';
     const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_77hHe5GT89vj8HGt9tXrUg_jQ_McY10';
     export const supabase = createClient(supabaseUrl, supabaseAnonKey)
     ```

3. **Client-Side Auth Gate (`hooks/use-auth-gate.ts`)**:
   - Currently imports `createClientComponentClient` from `@supabase/auth-helpers-nextjs` (line 2).
   - Initializes the client Component client on line 7:
     ```typescript
     const supabase = createClientComponentClient()
     ```

4. **Login Interface (`app/login/login-content.tsx`)**:
   - Currently imports `createClientComponentClient` from `@supabase/auth-helpers-nextjs` (line 7).
   - Initializes the client on line 64:
     ```typescript
     const supabase = createClientComponentClient();
     ```

5. **OAuth/Session Callback (`app/auth/callback/route.ts`)**:
   - Currently imports `createRouteHandlerClient` from `@supabase/auth-helpers-nextjs` (line 1).
   - Initializes the client using Next.js headers:
     ```typescript
     const supabase = createRouteHandlerClient({ cookies });
     await supabase.auth.exchangeCodeForSession(code);
     ```

6. **Middleware Check**:
   - Searched the project root and subdirectories using `find_by_name` for `middleware.ts`. No middleware file currently exists in the project.

---

## Logic Chain
1. **Asynchronous Cookies in Next.js 15/16**: Because the project uses Next.js `16.2.9` (Observation 1), the `cookies()` API from `next/headers` is asynchronous and returns a Promise. When configuring `@supabase/ssr` server-side clients, `await cookies()` must be used to retrieve the cookies store.
2. **Migration Need**: Because `@supabase/auth-helpers-nextjs` is deprecated and the project scope calls for `@supabase/ssr` migration (Observation 1), all client instantiations must use `@supabase/ssr`.
3. **Cookie Interception & Synchronization**: Because Server Components cannot set cookies during the render phase (only during middleware or route handlers), `@supabase/ssr`'s server client requires a `setAll` cookie handler that catches cookie modification errors. To ensure the user's session remains active and refreshed, a `middleware.ts` file (Observation 6) must be implemented to refresh the session and rewrite the updated cookies back to both the request and response headers.
4. **Client Separation**:
   - For client-side rendering (Hooks, Client Components like `useAuthGate` and `login-content.tsx`), the client should be created using `createBrowserClient` from `@supabase/ssr`.
   - For server-side rendering (Route Handlers, Server Components, and Server Actions), the client should be created using `createServerClient` from `@supabase/ssr`.
5. **Cookie Security Options**: Next.js App Router context requires standard cookie properties:
   - `path: '/'` ensures cookies are shared across all pages of the application.
   - `sameSite: 'lax'` allows cross-origin navigation redirects (e.g. from Google OAuth callback back to the application) to send the cookies.
   - `secure: process.env.NODE_ENV === 'production'` ensures cookies are only transmitted over HTTPS in production, while permitting HTTP on local development environments.

---

## Caveats
- **Local Dev vs Production Envs**: The Supabase URL and Anon Key are hardcoded fallback values in `lib/supabase.ts` (Observation 2). For proper production operation, matching environment variables must be populated in the production environment.
- **External Network Blocking**: Under the CODE_ONLY network mode, we cannot fetch packages directly via npm during the investigation phase. The package install command will need to be executed by the implementer.

---

## Conclusion
To migrate the codebase to `@supabase/ssr` successfully, we propose a precise implementation strategy containing the following steps:

### Step 1: Update Dependencies
In `package.json`, remove `@supabase/auth-helpers-nextjs` and add `@supabase/ssr`:
```json
  "dependencies": {
    "@supabase/ssr": "^0.5.2",
    "@supabase/supabase-js": "^2.108.1",
    ...
  }
```

### Step 2: Rewrite `lib/supabase.ts`
Implement a new modular Supabase client factory that exports `createBrowserClient` (for Client Components) and `createClient` (async, for Server Components/Route Handlers):

```typescript
import { createBrowserClient as createSupabaseBrowserClient, createServerClient as createSupabaseServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://lnrkqyxiwbkvkazyzcbe.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_77hHe5GT89vj8HGt9tXrUg_jQ_McY10';

// Browser-safe client
export function createBrowserClient() {
  return createSupabaseBrowserClient(supabaseUrl, supabaseAnonKey)
}

// Server-side client (Route Handlers, Server Components, Server Actions)
export async function createClient() {
  const cookieStore = await cookies()

  return createSupabaseServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
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
            // Safe to ignore if middleware handles session refreshing
          }
        },
      },
    }
  )
}
```

### Step 3: Implement `middleware.ts`
Create `middleware.ts` in the root directory to handle automatic session refreshing:

```typescript
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://lnrkqyxiwbkvkazyzcbe.supabase.co';
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_77hHe5GT89vj8HGt9tXrUg_jQ_McY10';

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh session if expired
  await supabase.auth.getUser()

  return supabaseResponse
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images/assets (png, jpg, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
```

### Step 4: Refactor Auth Utilities and Pages

#### A. Update Client Hook: `hooks/use-auth-gate.ts`
```typescript
// Before:
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
// const supabase = createClientComponentClient()

// After:
import { createBrowserClient } from "@/lib/supabase"
// inside useAuthGate():
const supabase = createBrowserClient()
```

#### B. Update Login Page: `app/login/login-content.tsx`
```typescript
// Before:
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
// const supabase = createClientComponentClient()

// After:
import { createBrowserClient } from "@/lib/supabase"
// inside LoginContent():
const supabase = createBrowserClient()
```

#### C. Update Route Callback: `app/auth/callback/route.ts`
```typescript
// Before:
// import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
// import { cookies } from "next/headers";
// const supabase = createRouteHandlerClient({ cookies });

// After:
import { createClient } from "@/lib/supabase";
import { NextResponse } from "next/server";

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

---

## Verification Method
To verify the migration works correctly:
1. **Dependency Installation**: Run `npm install` to install `@supabase/ssr` and remove the old package.
2. **Project Compilation**: Run `npm run build` to verify there are no compilation errors related to TypeScript, Next.js async cookies, or missing package imports.
3. **Session Refresh and Access**: Ensure that when a user logs in, the cookies containing session data (`sb-access-token`, `sb-refresh-token`, etc.) are written and refreshed through `middleware.ts`.
4. **OAuth Validation**: Test Google Sign-in and the `/auth/callback` path to verify that the exchange of code for session succeeds and redirects the user back to the home page with an active session.
