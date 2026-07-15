# Next.js Site Performance Analysis and Bug Fix Report

This report presents findings from a read-only performance and code quality investigation of the **Tea Country Holidays** Next.js project.

---

## 1. Observation

### A. Reviews Marquee Bug and Stuttering (`components/reviews-marquee.tsx`)
1. **Marquee Lag (GPU Acceleration):** 
   In `app/globals.css` (lines 388–398), the CSS class `.marquee-track` is animated continuously using a standard `translateX` keyframe:
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
   No GPU acceleration hint (`will-change: transform` or `transform: translate3d`) is provided. This triggers style recalculations and repaints on every frame of the animation, causing CPU bottlenecks.
2. **Marquee Lag (Lazy Images):**
   In `components/reviews-marquee.tsx` (lines 193–200 and 228–236), the avatar image and tour photo components use `loading="lazy"`:
   ```tsx
   <Image
     src={avatarSrc}
     alt={review.name}
     width={48}
     height={48}
     className="w-12 h-12 rounded-full border-2 border-brand-gold/30 object-cover bg-slate-50"
     loading="lazy"
   />
   ```
   As the marquee translates, offscreen cards that enter the viewport trigger on-demand network loads and image decodes. Image decoding blocks the main thread, leading to periodic frame drops (stutters) during scroll.
3. **Exposed Green Background:**
   The marquee duplicates the reviews array once (`doubled` has length $2N$, line 252). The animation translates `.marquee-track` left by `translateX(-50%)`. If the total width of a single set of reviews ($N \times 364\text{px}$) is less than the viewport width, translating it left by half its width exposes an empty gap on the right. This gap reveals the dark green background of the parent section (`bg-brand-evergreen` which is `#013220`, line 258).
4. **Alternative Optimized Marquee:**
   The package `"react-fast-marquee"` is already installed in `package.json` (line 21) but is not used in the project.

### B. Image Component Performance
1. **Redundant Image Renders (Testimonials):**
   In `components/masonry-testimonials.tsx` (lines 101–116), all photos in the `photos` array are rendered concurrently:
   ```tsx
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
   Even though only the active image has `opacity: 0.7` (the rest are hidden at `opacity: 0`), Next.js downloads, optimizes, and decodes all these images simultaneously for each card.
2. **Redundant Image Renders (Holidays Hover):**
   In `app/holidays/holidays-content.tsx` (lines 280–294), the hover slide-show maps and renders all images in the `imagesList` simultaneously:
   ```tsx
   {imagesList.map((img, idx) => (
     <Image
       key={img}
       src={optimizeUnsplashUrl(img)}
       alt={pkg.alt || pkg.title}
       fill
       loading="lazy"
       sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
       quality={65}
       className={cn(
         "object-cover transition-all duration-700 absolute inset-0 w-full h-full",
         idx === currentIdx ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
       )}
     />
   ))}
   ```
   This duplicates image downloads and render workloads for cards that are not even being hovered.
3. **Eager Preloading in Closed Modals:**
   In `app/holidays/holidays-content.tsx` (line 150), the modal image has the `priority` prop set:
   ```tsx
   <Image
     src={optimizeUnsplashUrl(imagesList[currentImgIdx])}
     alt={pkg.alt || pkg.title}
     fill
     className="object-cover transition-all duration-500"
     sizes="(max-width: 768px) 100vw, 50vw"
     quality={70}
     priority
   />
   ```
   Since the modal is closed by default, setting `priority` forces Next.js to eager-load this heavy image on initial page load, hurting Largest Contentful Paint (LCP).
4. **Incorrect/Suboptimal `sizes` Attributes:**
   - `components/hero.tsx` (line 194): `sizes="(max-width: 768px) 50vw, 100vw"`. The hero image is absolute-positioned and spans `100vw` on mobile. The `50vw` size serves pixelated/blurry images.
   - `components/packages-scroll.tsx` (line 133): `sizes="(max-width: 640px) 50vw, ..."`. Cards take `w-[85%]` (`85vw`) on mobile. The `50vw` size causes blurry images.
   - `components/destinations.tsx` (line 72): `sizes` uses `20vw` for desktop. The grid has 4 columns (`25vw`), causing slight blurriness on large screens.
   - `components/masonry-testimonials.tsx` (line 108): uses `90vw` / `50vw` / `33vw` even though the card width is capped at `max-w-sm` (`384px`), downloading oversized assets on large viewports.

### C. Build & Lint Failures
Running `npm run build` fails with 7 Turbopack errors. Running `npm run lint` fails with 64 problems (53 errors).
1. **Broken TSX Syntax (Unbalanced HTML/JSX tags):**
   The script `revert-subpages.js` replaced `</div>` elements incorrectly. The following files are missing matching closing `</div>` elements and fail compilation:
   - `app/events/events-content.tsx`
   - `app/flights/flights-content.tsx`
   - `app/holidays/holidays-content.tsx`
   - `app/hotels/hotels-content.tsx`
   - `app/railways/railways-content.tsx`
2. **Missing Hook File:**
   `components/hero.tsx` (line 6) imports `useParallaxZoom` from `@/hooks/use-parallax-zoom`, but the file `hooks/use-parallax-zoom.ts` does not exist in the project.
3. **Mismatched Import Path:**
   `app/faq/page.tsx` (line 2) imports `FAQAccordion` from `@/components/faq-accordion` instead of `./FAQAccordion` (where it is actually located).
4. **Variable Hoisting (ESLint Errors):**
   In admin pages (`app/(admin)/admin/blogs/page.tsx` line 46, `faqs/page.tsx` line 41, `hotels/page.tsx` line 45, `packages/page.tsx` line 46, `reviews/page.tsx` line 42, `settings/page.tsx` line 31), functions declared as `const` are called inside `useEffect` before their declaration, resulting in ReferenceErrors:
   ```typescript
   useEffect(() => {
     fetchBlogs(); // fetchBlogs is accessed before it is declared
   }, []);
   const fetchBlogs = async () => { ... }
   ```
5. **State Updates in Effect:**
   `react-hooks/set-state-in-effect` errors in `cookie-banner.tsx` (line 14), `glass-search.tsx` (line 165), and `navbar.tsx` (line 68) due to synchronous state calls inside `useEffect`.
6. **Ref Update During Render:**
   `react-hooks/refs` error in `components/glass-search.tsx` (line 37): `refsRef.current = refs;` modifies refs during rendering.

---

## 2. Logic Chain

1. **Continuous CSS animations without GPU layer promotion:** When a browser animates an element using `transform` but does not promote the element to its own compositor layer (using `will-change: transform` or `transform: translate3d(0,0,0)`), it triggers style recalculations and layout paints on the main thread for every frame. Because the marquee cards have complex elements (shadows, rounded borders, images), this causes paint lag and stuttering, especially on low-powered mobile devices.
2. **Decodes block main thread:** Browsers block the main thread to decode images when they enter the viewport if they are lazy loaded. Since a marquee scrolls continuously, lazy images constantly enter the viewport and trigger decodes. Changing images to eager loading (`loading="eager"` or `priority`) pre-decodes them and eliminates this runtime lag.
3. **Loop translation gaps:** In a two-set infinite marquee, translating the track left by 50% shifts it by the width of one set of items. If the width of one set of items is less than the viewport width, the viewport width exceeds the track's remaining visible content. The resulting empty space exposes the section's dark green background.
4. **Oversized and redundant image downloads:** rendering multiple `<Image>` components inside `.map()` loops and hiding them with CSS opacity (`opacity: 0`) still triggers Next.js to request, optimize, and serve all of those images. Using a single `<Image>` tag with a dynamically updating `src` ensures only the active image is fetched, drastically reducing network and CPU load.
5. **Modal priority waste:** Setting `priority` on an image inside a closed modal forces Next.js to load the image immediately on page load. Since the image is not in the viewport on initial load, this delays the LCP of the page.
6. **Incorrect sizes prop limits resolution:** Next.js uses the `sizes` prop to choose the correct image width from `srcset`. When `sizes` is configured smaller than the actual rendered size (e.g., `50vw` on mobile instead of `100vw` or `85vw`), the browser downloads a lower-resolution asset, resulting in a blurry display.
7. **Unbalanced divs break AST parsing:** Turbopack and ESLint parse code into Abstract Syntax Trees (AST). Missing closing `</div>` tags result in malformed ASTs, throwing compilation errors and blocking production builds.
8. **Hoisting constraints:** Variables defined with `const` are in the temporal dead zone until their definition is reached. Calling a `const` function before its declaration throws a ReferenceError. Using standard function declarations (`function fetchBlogs() {}`) or moving the declaration above the caller resolves this.

---

## 3. Caveats

- Since the codebase fails to compile due to syntax and path errors, we could not run `@next/bundle-analyzer` dynamically or verify the exact final production bundle sizes.
- Image performance details are based on code-level inspection of properties (sizes, quality, priority) and verified layout styles.
- Network requests could not be measured directly in a running browser due to the CODE_ONLY environment constraints.

---

## 4. Conclusion

1. **Marquee Lag:** Caused by lack of GPU layer promotion and lazy-loaded image decoding blocking the main thread.
2. **Marquee Background Leak:** Caused by item list width being smaller than the viewport width during `translateX(-50%)` translation.
3. **Image Inefficiencies:** Caused by redundant hidden image elements in slideshows, eager preloading of closed modals, and incorrect `sizes` configurations causing blurry images on mobile and oversized images on desktop.
4. **Build Failures:** Caused by buggy subpage revert replacements (unbalanced divs), missing `hooks/use-parallax-zoom.ts` reference in `hero.tsx`, and an incorrect import path in `app/faq/page.tsx`.
5. **Code Quality Errors:** Caused by variable hoisting violations with `const` and synchronous state changes in `useEffect`.

---

## 5. Verification Method

### Recommended Commands to Verify Build & Lint

To independently verify the compile and lint status, run:

1. **Lint Checks:**
   ```powershell
   npm run lint
   ```
2. **Production Build:**
   ```powershell
   npm run build
   ```

### Specific Files and Lines to Inspect

- **Marquee Fix:**
  - In `components/reviews-marquee.tsx`, import `Marquee` from `"react-fast-marquee"` and replace lines 290–304 with:
    ```tsx
    <Marquee pauseOnHover autoFill speed={40}>
      {initialReviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </Marquee>
    ```
- **Image Redundancy Fix:**
  - In `components/masonry-testimonials.tsx` and `app/holidays/holidays-content.tsx`, replace the `.map` on photos with a single `<Image>` tag using `photos[currentPhotoIndex]` or `imagesList[currentIdx]` as the `src`.
- **Sizes Attribute Fixes:**
  - In `components/hero.tsx` (line 194), change sizes to: `sizes="100vw"`.
  - In `components/packages-scroll.tsx` (line 133), change sizes to: `sizes="(max-width: 640px) 85vw, (max-width: 1024px) 33vw, 25vw"`.
  - In `components/destinations.tsx` (line 72), change sizes to: `sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 25vw"`.
  - In `components/masonry-testimonials.tsx` (line 108), change sizes to: `sizes="(max-width: 640px) 90vw, 384px"`.
- **Build / Div Fixing:**
  - Manually review the closing tags in `app/events/events-content.tsx` and the other 4 subpage content files to add back the missing two `</div>` elements.
  - Fix import in `app/faq/page.tsx` line 2 to: `import FAQAccordion from "./FAQAccordion";`.
