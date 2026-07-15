# Performance & Marquee Analysis Report

## Core Findings Summary
The Next.js site has significant performance optimization opportunities on both mobile and desktop. Key issues include:
1. **Image Configuration Issues**: Suboptimal `sizes` configurations causing oversized/blurry images, redundant `priority` and `loading` attributes, and preloading hidden logos.
2. **Heavy DOM & Slideshow Overheads**: The `MasonryTestimonials` component renders multiple hidden images simultaneously per card, running a `setInterval` slideshow on all cards that triggers heavy layout/paint overhead.
3. **Marquee Component Bug**: The custom marquee lags due to missing GPU promotion and lazy-loading of translating images. It exposes a green background because it only duplicates the list once. If there are few reviews, the track is narrower than the viewport, creating empty space on the right during translations. Using the pre-installed `react-fast-marquee` library will fix all marquee bugs and clean up unused variables.
4. **Bundle Bloat**: Static imports of client-only components (`FloatingActionBar`, `CookieBanner`, `ScrollRevealInit`) bloat the initial layout bundle. `react-icons` is also missing from `optimizePackageImports` in `next.config.ts`.
5. **Linter Alignment**: Linter reports unused variable warnings in the current `reviews-marquee.tsx` (`_key`, `isDuplicate`) and `packages-scroll.tsx` (`openWhatsApp`), and setState-in-effect issues in `cookie-banner.tsx` and `navbar.tsx`.

---

## 1. Observation

### A. Reviews Marquee Component (`components/reviews-marquee.tsx` & `app/globals.css`)
- **Duplication Logic**: `components/reviews-marquee.tsx` lines 252-255 duplicates the reviews once:
  ```typescript
  const doubled = [
    ...initialReviews.map(r => ({ ...r, _key: `a-${r.id}`, isDuplicate: false })),
    ...initialReviews.map(r => ({ ...r, _key: `b-${r.id}`, isDuplicate: true })),
  ];
  ```
- **CSS Animation Definition**: `app/globals.css` lines 388-397 defines:
  ```css
  @keyframes marquee-left {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .marquee-track {
    display: flex;
    width: max-content;
    animation: marquee-left 40s linear infinite;
  }
  ```
  *Note*: There is no `will-change: transform` or 3D transform (`transform: translate3d(0,0,0)`) on `.marquee-track` to promote it to a GPU compositor layer.
- **Card Sizing**: In `components/reviews-marquee.tsx` line 189, each card has:
  ```typescript
  className="flex-shrink-0 w-[340px] ... mx-3 ..."
  ```
  This yields a total width per card (including margin) of `340px + 6px + 6px = 352px` (or `364px` depending on spacing/padding).
- **Reduced Motion Hiding**: `app/globals.css` lines 255-257 hides duplicates:
  ```css
  .review-card-duplicate {
    display: none !important;
  }
  ```
- **Marquee Images**: The component uses Next.js `Image` for avatars and tour photos with `loading="lazy"` (lines 199, 235).
- **Lint Warning**: Running `npm run lint` yields:
  ```
  C:\Users\User\.gemini\antigravity\scratch\tea-country-holidays\components\reviews-marquee.tsx
    298:25  warning  '_key' is assigned a value but never used         @typescript-eslint/no-unused-vars
    298:31  warning  'isDuplicate' is assigned a value but never used  @typescript-eslint/no-unused-vars
  ```

### B. Image Component Properties
- **Hero Image (`components/hero.tsx`)**:
  - Line 194: `sizes="(max-width: 768px) 50vw, 100vw"`.
  - Line 198: `quality={isFirst ? 45 : 35}`.
  - Lines 195-197: `priority={isFirst}` and `loading={isFirst ? "eager" : "lazy"}` are specified together.
- **Packages Scroll Image (`components/packages-scroll.tsx`)**:
  - Line 133: `sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"`.
  - Line 124: The card has `w-[85%]` on mobile.
  - Line 5: `openWhatsApp` is imported/defined but never used, yielding a lint warning:
    ```
    C:\Users\User\.gemini\antigravity\scratch\tea-country-holidays\components\packages-scroll.tsx
      5:10  warning  'openWhatsApp' is defined but never used  @typescript-eslint/no-unused-vars
    ```
- **Navbar Drawer Logo (`components/navbar.tsx`)**:
  - Line 377: The mobile drawer logo (initially hidden) is configured with `priority`.
- **Masonry Testimonials Flip Card (`components/masonry-testimonials.tsx`)**:
  - Lines 101-116: Renders *all* images inside the `photos` array simultaneously by mapping over them and controlling visibility via opacity:
    ```typescript
    {photos.map((photo, i) => (
      <Image
        key={photo}
        src={photo}
        alt=""
        fill
        quality={50}
        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-opacity duration-1000 pointer-events-none"
        style={{
          opacity: i === currentPhotoIndex ? 0.7 : 0,
          zIndex: 1
        }}
        onError={() => handleImageError(photo)}
      />
    ))}
    ```
  - Lines 86-91: An interval changes `currentPhotoIndex` every 2.5 seconds.

### C. Bundle Optimization Opportunities
- **Static Imports in Layout (`app/layout.tsx`)**:
  - Lines 4-8 statically import `FloatingActionBar`, `ScrollRevealInit`, and `CookieBanner`.
  - Lines 106-111 render them on every page.
- **Package Imports (`next.config.ts`)**:
  - Lines 36-39 optimize package imports for `lucide-react` and `react-fast-marquee`.
  - `react-icons` (imported in `FloatingActionBar.tsx` line 7) is missing from `optimizePackageImports`.

---

## 2. Logic Chain

### A. Why the Marquee Lags
1. **CPU Compositing/Repainting**: The browser runs keyframe translations on `.marquee-track` without `will-change: transform`. Without GPU layer promotion, the browser falls back to CPU-based repaint operations for the entire list of reviews as they translate.
2. **Lazy Loading inside Marquee**: Using `loading="lazy"` on images within a continuously moving marquee is an anti-pattern. As the marquee slides, cards enter the viewport threshold, triggering dynamic image loads, decodes, and style recalculations on the main thread, causing frame rate drops (stuttering).
3. **Double Images**: Doubling the array mounts twice as many DOM nodes and images, compounding the CPU painting bottleneck.

### B. Why the Marquee Exposes the Green Background
1. **Array Length Dependencies**: The custom marquee doubles the array, creating a track of length $2 \times W_{original}$. It animates translation by `translateX(-50%)`, which shifts the track by exactly $-W_{original}$.
2. **Viewport-to-Track Ratio**: When reviews are fetched from Supabase (mapped in `app/page.tsx`), the number of fetched items can be small (e.g. 1-3 reviews).
3. **Blank Space Generation**: If there are only 3 reviews, $W_{original}$ is approximately $3 \times 352\text{px} = 1056\text{px}$. On a typical desktop monitor (e.g. 1920px), $W_{original} < W_{viewport}$.
4. **Resulting Gap**: When the track translates by $-1056\text{px}$, the duplicate cards end at $1056\text{px}$ from the left of the viewport. Since the screen is 1920px wide, the remaining $864\text{px}$ on the right is empty.
5. **Background Leak & Snapping**: This empty space exposes the section's background color (`bg-brand-evergreen` = `#013220` green). When the keyframe loops back to `0%`, it snaps instantly, creating a visual glitch.
6. **Prefers-Reduced-Motion Bug**: Under prefers-reduced-motion, duplicate cards are set to `display: none`. This leaves the right side of the screen permanently empty if the original set is not wider than the screen.

### C. Image Optimization Issues
1. **Hero Blurriness**: The Hero component is full-width (`w-full`), but its mobile sizes attribute is `50vw`. This tells the browser that the image only occupies half the screen width on mobile. On high-DPI (2x or 3x retina) mobile screens, the browser fetches an under-dimensioned image, making the main visual look blurry.
2. **Hero Quality**: Setting quality to 35/45 causes severe compression artifacting on high-resolution photographs, hurting visual appeal.
3. **Redundant Attributes**: Combining `priority` (which forces eager preloading) with `loading="eager"` or `loading="lazy"` creates redundancy. Next.js natively manages preloading when `priority` is present.
4. **Packages Blurriness**: The package cards take `85%` width on mobile screens (`w-[85%]`). However, `sizes` specifies `50vw` on mobile. The browser fetches low-resolution images, making the cards look blurry.
5. **Hidden Priority Preload**: The logo inside the mobile drawer has `priority` set. Since the drawer starts closed, preloading this hidden image wastes initial bandwidth and preloading resources.
6. **Testimonial Slideshow Overheads**: The `FlipCard` component mounts all photos in the array into the DOM simultaneously and toggles opacity. The browser downloads and decodes all these images, and the continuous 2.5-second opacity transition forces the browser to re-rasterize and composite multiple overlapping images.

### D. Layout Bundle Bloat
1. **Static SSR Blockers**: Statically importing `CookieBanner` and `FloatingActionBar` (which access client-only browser APIs like `localStorage` and `window.matchMedia`) causes hydration discrepancies and increases layout bundle size.
2. **Unused Icons Bundling**: `react-icons` is a massive icon library. If tree-shaking fails, importing `FaWhatsapp` in `FloatingActionBar` causes the entire icon bundle to be sent to the client. Since `react-icons` is not in `optimizePackageImports`, Next.js does not optimize its imports at build time.

---

## 3. Caveats
- **Supabase Live Data**: The exact number of reviews currently stored in the Supabase database is not verified, but the logic handles any arbitrary database count. If the table is empty or has fewer than 6 items, the green background leak is fully reproducible.
- **Third-Party CDN**: Supabase storage caching headers are assumed to be standard, but caching behavior can influence initial load times.

---

## 4. Conclusion
The site performance can be improved by replacing the custom marquee with `react-fast-marquee` (already in `package.json`), dynamically importing client-only layout components, optimizing image size/quality attributes, and correcting DOM image overheads in testimonials.

---

## 5. Optimization & Bug Fix Recommendations

### A. Marquee Component Fixes (`components/reviews-marquee.tsx`)
1. **Use `react-fast-marquee`**:
   Replace the custom keyframe-based track with the pre-installed `<Marquee>` component. This resolves both performance lag (via optimized CSS transformations) and the green background leak (via automatic dynamic duplication to exceed the viewport width).
   *Proposed Code Update*:
   ```typescript
   import Marquee from "react-fast-marquee";
   // Remove the custom doubled array logic

   export default function ReviewsMarquee({ initialReviews = fallbackReviews }: { initialReviews?: Review[] }) {
     return (
       <section className="py-16 bg-brand-evergreen overflow-hidden">
         {/* Header code stays the same */}
         
         <div className="marquee-viewport flex overflow-hidden select-none">
           <Marquee pauseOnHover speed={40} gradient={false}>
             {initialReviews.map((review) => (
               <ReviewCard key={review.id} review={review} />
             ))}
           </Marquee>
         </div>
         
         {/* Footer code stays the same */}
       </section>
     );
   }
   ```
   *Additional Benefit*: This change completely deletes lines 252-255 and 298 in `components/reviews-marquee.tsx`, removing the TypeScript/ESLint warnings for unused `_key` and `isDuplicate` variables.
2. **Marquee Images Eager Loading**:
   Change the `loading` attribute on the avatar images in `ReviewCard` to `"eager"` or remove `loading="lazy"`. Since these are tiny (48x48px) and scroll continuously, pre-loading them prevents visual stuttering during translation.

### B. Testimonial Slideshow Optimization (`components/masonry-testimonials.tsx`)
1. **Render Only Active Slide**:
   Instead of mapping over all photos and changing opacity, render *only* the active photo to reduce DOM bloat and prevent redundant image decoding:
   *Proposed Code Update*:
   ```typescript
   // Inside FlipCard
   return (
     <div className="review-flip-card-container mx-auto w-full max-w-sm" style={{ animationDelay: `${index * 150}ms` }}>
       <div className="review-flip-card-inner">
         <div className="review-flip-card-front relative flex flex-col items-center justify-center p-6 w-full h-full">
           {photos.length > 0 && (
             <Image
               key={photos[currentPhotoIndex]}
               src={photos[currentPhotoIndex]}
               alt=""
               fill
               quality={50}
               sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 33vw"
               className="object-cover pointer-events-none"
             />
           )}
           <div className="absolute inset-0 bg-black/40 pointer-events-none" style={{ zIndex: 2 }} />
           <div className="relative z-10 flex flex-col items-center justify-center">
             {avatarSrc && !hasFailed ? (
               <Image 
                 src={avatarSrc} 
                 alt={data.name}
                 width={80}
                 height={80}
                 className="w-20 h-20 rounded-full border-2 border-[#C8860A] shadow-md object-cover mb-4 bg-white"
                 onError={() => setHasFailed(true)}
               />
             ) : (
               <InitialsAvatar name={data.name} />
             )}
             <h3 className="font-serif text-xl font-bold text-white drop-shadow-md text-center">{data.name}</h3>
           </div>
         </div>
         {/* Back content stays the same */}
       </div>
     </div>
   );
   ```

### C. Image Component Properties
1. **Hero Image Sizes (`components/hero.tsx`)**:
   - Change `sizes="(max-width: 768px) 50vw, 100vw"` to `sizes="100vw"` (line 194).
   - Increase quality to `quality={isFirst ? 80 : 65}` to improve Largest Contentful Paint (LCP) visual appeal (line 198).
   - Clean up redundant loading attributes: remove `loading={isFirst ? "eager" : "lazy"}` on line 196 since Next.js `priority={isFirst}` takes precedence.
2. **Packages Scroll Sizes (`components/packages-scroll.tsx`)**:
   - Change `sizes` to `sizes="(max-width: 640px) 85vw, (max-width: 1024px) 33vw, 25vw"` (line 133).
   - Clean up unused import: Remove `openWhatsApp` on line 5 of `components/packages-scroll.tsx` to fix the ESLint warning.
3. **Navbar Mobile Drawer Logo (`components/navbar.tsx`)**:
   - Remove the `priority` prop from the drawer logo on line 375 to prevent unnecessary preloading of hidden assets.

### D. Bundle Optimization
1. **Dynamic Layout Imports (`app/layout.tsx`)**:
   - Convert static imports of `CookieBanner`, `FloatingActionBar`, and `ScrollRevealInit` to dynamic imports with `{ ssr: false }`:
     ```typescript
     import nextDynamic from "next/dynamic";

     const FloatingActionBar = nextDynamic(() => import("@/components/FloatingActionBar"), { ssr: false });
     const ScrollRevealInit = nextDynamic(() => import("@/components/scroll-reveal-init"), { ssr: false });
     const CookieBanner = nextDynamic(() => import("@/components/cookie-banner"), { ssr: false });
     ```
2. **Optimize Package Imports (`next.config.ts`)**:
   - Add `"react-icons"` to `optimizePackageImports` (line 36):
     ```typescript
     optimizePackageImports: [
       "lucide-react",
       "react-fast-marquee",
       "react-icons",
     ]
     ```

---

## 6. Verification Method

### A. Independent Verification Commands
1. Run the build script to ensure there are no compilation or typescript errors:
   ```bash
   npm run build
   ```
2. Run the linter to verify code syntax and import alignment:
   ```bash
   npm run lint
   ```

### B. Files to Inspect
- `components/reviews-marquee.tsx` (ensure custom css marquee is replaced with `react-fast-marquee`).
- `components/masonry-testimonials.tsx` (ensure mapped rendering is replaced with active slide rendering).
- `components/hero.tsx` (inspect `sizes`, `quality` and `loading` attributes).
- `components/packages-scroll.tsx` (inspect `sizes` attribute).
- `components/navbar.tsx` (inspect drawer `Image` priority).
- `app/layout.tsx` (inspect dynamic imports).
- `next.config.ts` (inspect `optimizePackageImports`).

### C. Invalidation Conditions
- The proposed changes will be invalidated if `react-fast-marquee` is removed from `package.json` dependencies.
- Changes to image sizes are invalidated if the layout widths of the hero element or package card components are altered.
