## 2026-07-15T00:19:48Z
Implement the following performance optimizations and compilation/lint fixes in the codebase:

1. Create a new hook file C:\Users\User\.gemini\antigravity\scratch\tea-country-holidays\hooks\use-parallax-zoom.ts with the following optimized implementation:
```typescript
import { useEffect, useRef } from "react";

interface ParallaxOptions {
  speed: number;
  zoomFrom: number;
  zoomTo: number;
}

export function useParallaxZoom({ speed, zoomFrom, zoomTo }: ParallaxOptions) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (ref.current) {
            const top = window.scrollY;
            const y = top * speed;
            const zoom = zoomFrom + (zoomTo - zoomFrom) * Math.min(1, top / 1000);
            ref.current.style.transform = `translate3d(0, \${y}px, 0) scale(\${zoom})`;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [speed, zoomFrom, zoomTo]);

  return ref;
}
```

2. Fix reviews marquee component (components/reviews-marquee.tsx):
   - Import `Marquee` from "react-fast-marquee".
   - Replace the custom marquee container/track (approx. lines 290 to 304) with the `<Marquee>` component:
     ```tsx
     <Marquee pauseOnHover autoFill speed={40} className="py-2" aria-label="Customer reviews">
       {initialReviews.map((review) => (
         <ReviewCard key={review.id} review={review} />
       ))}
     </Marquee>
     ```
   - Change `loading="lazy"` on all `<Image>` elements inside `ReviewCard` components (e.g. avatar, tour photo) to `loading="eager"` or `priority` to eliminate paint/decoding stutters on scroll.
   - Clean up any unused code variables.

3. Fix image sizing and priorities for performance:
   - In `components/hero.tsx` (line 194), change `sizes` property to: `sizes="100vw"`. Also increase LCP slide image quality to `75` (line 198).
   - In `components/packages-scroll.tsx` (line 133), change `sizes` property to: `sizes="(max-width: 640px) 85vw, (max-width: 1024px) 33vw, 25vw"`. Also increase quality to `70` (line 132).
   - In `components/destinations.tsx` (line 72), change `sizes` property to: `sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 25vw"`.
   - In `components/masonry-testimonials.tsx` (line 108), change `sizes` property to: `sizes="(max-width: 640px) 90vw, 384px"`.

4. Fix redundant image renders:
   - In `components/masonry-testimonials.tsx` (lines 101-116), instead of rendering all photos in the `photos` array simultaneously via `photos.map` and hiding them with `opacity: 0`, render only the active photo:
     ```tsx
     {photos[currentPhotoIndex] && (
       <Image
         src={photos[currentPhotoIndex]}
         alt=""
         fill
         quality={50}
         sizes="(max-width: 640px) 90vw, 384px"
         className="object-cover transition-opacity duration-1000 pointer-events-none opacity-70"
         onError={() => handleImageError(photos[currentPhotoIndex])}
       />
     )}
     ```
   - In `app/holidays/holidays-content.tsx` (lines 280-294), do the same for the hover slideshow: replace `imagesList.map` with rendering only the active hover image (`imagesList[currentIdx]`).
   - In `app/holidays/holidays-content.tsx` (line 150), remove the `priority` prop from the modal image because the modal is closed by default.

5. Fix the mismatched import in `app/faq/page.tsx`:
   - Change line 2 to: `import FAQAccordion from "./FAQAccordion";`

6. Fix the unbalanced HTML/div tags in the 5 subpage content files:
   - `app/events/events-content.tsx`
   - `app/flights/flights-content.tsx`
   - `app/holidays/holidays-content.tsx`
   - `app/hotels/hotels-content.tsx`
   - `app/railways/railways-content.tsx`
   - Identify where the open `relative overflow-hidden` and `relative z-10` divs exist at the start of these files and replace the whole block (which also contains the deleted hook refs `heroBgRef` and `heroContentRef`) with a single `<div className="bg-[#1B4332] pt-32 pb-16 px-4">` (or matching the exact padding of the respective file). Make sure the closing tags are balanced properly.

7. Verify your work:
   - Run `npm run build` and `npm run lint` and verify they succeed.
   - Run existing E2E tests (`npm run test:e2e`) if they exist.
   - Write your handoff to `C:\Users\User\.gemini\antigravity\scratch\tea-country-holidays\.agents\worker_perf_1\handoff.md` with build/test outputs and verification commands.
