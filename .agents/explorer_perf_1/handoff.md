# Performance and Reviews Marquee Investigation Handoff

## 1. Observation
In our investigation of the codebase, we observed the following specific implementation details and issues:

### A. Reviews Marquee Component (`components/reviews-marquee.tsx`)
1. **Marquee Track Structure**:
   - The marquee track duplicates the review list once to form a continuous loop:
     ```tsx
     // lines 252-255
     const doubled = [
       ...initialReviews.map(r => ({ ...r, _key: `a-${r.id}`, isDuplicate: false })),
       ...initialReviews.map(r => ({ ...r, _key: `b-${r.id}`, isDuplicate: true })),
     ];
     ```
   - The track translates using a custom CSS animation:
     ```tsx
     // lines 290-304
     <div className="marquee-viewport flex overflow-hidden select-none">
       <div className="marquee-track py-2" aria-label="Customer reviews">
         {doubled.map((review) => (
           <div
             key={review._key}
             className={review.isDuplicate ? "review-card-duplicate shrink-0 snap-start" : "review-card-original shrink-0 snap-start"}
           >
             {/* ... */}
           </div>
         ))}
       </div>
     </div>
     ```
2. **Lazy Loading of Animated Images**:
   - Review cards contain user avatar images and tour photos that are set to lazy loading:
     ```tsx
     // lines 198-200
     className="w-12 h-12 rounded-full border-2 border-brand-gold/30 object-cover bg-slate-50"
     loading="lazy"
     ```
     ```tsx
     // lines 235-236
     className="object-cover"
     loading="lazy"
     ```

### B. Custom CSS Animations (`app/globals.css`)
- The marquee track uses custom keyframes to translate left:
  ```css
  /* lines 387-398 */
  @keyframes marquee-left {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .marquee-track {
    display: flex;
    width: max-content;
    animation: marquee-left 40s linear infinite;
  }
  .marquee-track:hover { animation-play-state: paused; }
  ```
- **Crucial omission**: `.marquee-track` does not have any GPU promotion properties (`will-change: transform` or `transform: translate3d(...)`).

### C. Image Component Properties
1. **Hero Section (`components/hero.tsx`)**:
   - **Sizes mismatch**: The background hero image occupies the full screen width (`100vw`) on both mobile and desktop. However, `sizes` is defined as:
     ```tsx
     // line 194
     sizes="(max-width: 768px) 50vw, 100vw"
     ```
   - **Low quality**: The hero slide quality is set very low:
     ```tsx
     // line 198
     quality={isFirst ? 45 : 35}
     ```
2. **Packages Scroll (`components/packages-scroll.tsx`)**:
   - **Sizes mismatch**: On mobile (<= 640px), each package card takes up 85% of the viewport width (`w-[85%]`). However, `sizes` is defined as:
     ```tsx
     // line 133
     sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
     ```
   - **Low quality**: Card images are set to `quality={45}` (line 132).

### D. Bundle Configuration and imports
1. **Unused Dependencies**:
   - `package.json` contains `"react-icons": "^5.7.0"`.
   - However, social icons in `components/footer.tsx` (lines 48-52) are implemented using custom inline SVG paths rather than importing from `react-icons`. A global search yields zero usages of `react-icons` in the active components directory.
2. **Dynamic Imports (`app/page.tsx`)**:
   - The homepage dynamically imports below-the-fold components using:
     ```tsx
     // lines 14-22
     const WhoWeAre            = nextDynamic(() => import("@/components/who-we-are"));
     const ReviewsMarquee      = nextDynamic(() => import("@/components/reviews-marquee"));
     ```
   - These dynamic imports do not use `{ ssr: false }`, meaning they are still evaluated and rendered during server-side rendering (SSR), adding to the initial HTML payload and hydration work.

---

## 2. Logic Chain

### Why the Reviews Marquee Lags
1. **Lack of GPU Promotion**: The `.marquee-track` is translated using CSS `transform` but does not instruct the browser to promote the track to its own compositor layer. Consequently, the browser recalculates layouts and repaints the elements on the CPU for every frame. Because the cards have complex CSS properties (rounded corners, shadows, borders), this results in severe rendering lag and stuttering.
2. **On-the-fly Image Decoding**: The images inside the marquee cards use `loading="lazy"`. As the marquee scrolls, off-screen cards enter the viewport, triggering the browser to load, decode, and paint the images *during the scroll animation*. Since image decoding is CPU-intensive, it causes sudden frame drops (stutters) on each new card entry.

### Why the Reviews Marquee Green Background Leak
1. The parent `<section>` has a dark green background (`bg-brand-evergreen`).
2. The marquee loop depends on translating the track by exactly `-50%` of its width.
3. For the marquee to scroll endlessly without gaps, the width of the first half (the original review items) must be larger than the viewport width.
4. If there are few reviews in the database (e.g. 1 to 3 reviews), the width of the original set (e.g., 3 cards * 364px = 1092px) is narrower than standard desktop viewports (e.g., 1440px or 1920px).
5. When the track translates by `-50%`, the duplicate set moves into the center, and no items exist behind it. Because the track width is smaller than the viewport, the right edge of the screen becomes empty, exposing the green background of the parent section.

### Why Images are Blurry/Pixelated on Mobile
1. On mobile viewports (<= 768px), the Hero background image occupies `100vw`. However, the `sizes` property tells the browser the image is only `50vw`. The browser requests a lower-resolution image, which is then scaled up to `100vw`, causing noticeable blurriness.
2. On mobile viewports (<= 640px), the Packages cards take up `85vw`. However, the `sizes` property tells the browser they are only `50vw`. The browser downloads a low-resolution image, which is stretched to `85vw`, resulting in pixelation.
3. The visual quality is further degraded by low quality values (`quality={35}` and `quality={45}`).

---

## 3. Caveats
- **Environment**: We did not run a live build using `@next/bundle-analyzer` as Next.js restricts running parallel builds when one is already active or stale.
- **Review Database Count**: Our analysis assumes that the Supabase database could return a small number of reviews (e.g. less than 5), which is a common scenario in early deployments and directly causes the custom marquee gap.

---

## 4. Conclusion & Optimization Recommendations

### A. Marquee Optimizations & Bug Fixes
There are two ways to solve the marquee lag and background leak:

#### Solution 1: Use `react-fast-marquee` (Highly Recommended)
Since the package is already in `dependencies` and set up in `next.config.ts`, replacing the custom marquee is clean and robust. It natively handles GPU acceleration, screen resize updates, and automatically duplicates cards multiple times to fill any screen size.
- **Proposed modification in `components/reviews-marquee.tsx`**:
  ```tsx
  import Marquee from "react-fast-marquee";
  // ...
  export default function ReviewsMarquee({ initialReviews = fallbackReviews }: { initialReviews?: Review[] }) {
    return (
      <section className="py-16 bg-brand-evergreen overflow-hidden">
        {/* Header content ... */}
        
        <Marquee
          gradient={false}
          pauseOnHover={true}
          speed={40}
          aria-label="Customer reviews"
        >
          {initialReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </Marquee>

        {/* Footer info ... */}
      </section>
    );
  }
  ```

#### Solution 2: Fix Custom CSS Marquee
If you choose to keep the custom CSS implementation:
1. Promote the track to the GPU compositor layer in `app/globals.css`:
   ```css
   .marquee-track {
     display: flex;
     width: max-content;
     animation: marquee-left 40s linear infinite;
     will-change: transform;
     transform: translate3d(0, 0, 0);
   }
   ```
2. Remove `loading="lazy"` (default to eager) from `Image` components inside the marquee cards, or change them to load eagerly:
   ```tsx
   // In ReviewCard:
   <Image src={avatarSrc} alt={review.name} ... loading="eager" />
   // and
   <Image src={review.photoUrl} alt="..." ... loading="eager" />
   ```
3. Prevent green background exposure by replicating reviews dynamically in code until the track width is guaranteed to exceed the viewport width (e.g., minimum 8 cards).

---

### B. Image Component Optimizations
1. **Hero Section (`components/hero.tsx`)**:
   - Change `sizes` to `100vw` on mobile, since it occupies the full screen width.
   - Increase `quality` to `70` or `75` (default) for LCP slides to restore visual fidelity.
   - Remove the duplicate `loading` prop since `priority` is set.
   ```tsx
   <Image
     key={dest.name}
     src={dest.img}
     alt=""
     fill
     sizes="100vw"
     priority={isFirst}
     fetchPriority={isFirst ? "high" : "low"}
     quality={isFirst ? 75 : 60}
     className={`absolute inset-0 w-full h-full object-cover ${dest.pos || "object-center"}`}
   />
   ```
2. **Packages Scroll (`components/packages-scroll.tsx`)**:
   - Change mobile `sizes` breakpoint to `85vw` to match the CSS card width (`w-[85%]`).
   - Increase quality to `70` to remove compression artifacts.
   ```tsx
   <Image
     src={pkg.imageUrl}
     alt={pkg.name}
     fill
     quality={70}
     sizes="(max-width: 640px) 85vw, (max-width: 1024px) 33vw, 25vw"
     className="object-cover pointer-events-none"
     loading="lazy"
   />
   ```

---

### C. Bundle Optimizations
1. **Optimize Dynamic Imports (`app/page.tsx`)**:
   - For client-only interactive components (`ReviewsMarquee`, `PackagesScroll`, `OfferBanner`), use `{ ssr: false }` to prevent rendering them on the server, which reduces initial HTML weight and avoids hydration overhead:
     ```tsx
     const PackagesScroll = nextDynamic(() => import("@/components/packages-scroll"), { ssr: false });
     const ReviewsMarquee = nextDynamic(() => import("@/components/reviews-marquee"), { ssr: false });
     ```
2. **Clean up `package.json`**:
   - Remove `"react-icons": "^5.7.0"` if confirmed it is not used in other pages, reducing node_modules and dependency bloat.

---

## 5. Verification Method

### A. Independent Verification Commands
To test and verify the recommendations:
1. Run the Next.js production build command to check for errors:
   ```bash
   npm run build
   ```
2. Verify that there are no TypeScript compile errors and review the generated chunk sizes.

### B. Files to Inspect
1. **`components/reviews-marquee.tsx`**: Check if `react-fast-marquee` is imported and used, or if the images have been updated to `loading="eager"`.
2. **`app/globals.css`**: Check if `.marquee-track` has `will-change: transform` and `transform: translate3d(0, 0, 0)` if keeping the custom marquee.
3. **`components/hero.tsx`** and **`components/packages-scroll.tsx`**: Verify that `sizes` properties match the CSS width on mobile, and `quality` has been raised to standard values (e.g. `70-75`).

### C. Invalidation Conditions
- The recommendations are invalid if the reviews marquee is replaced by a static grid, or if the database is guaranteed to always return 10+ reviews (though the `react-fast-marquee` solution is still recommended for robustness against database changes).
