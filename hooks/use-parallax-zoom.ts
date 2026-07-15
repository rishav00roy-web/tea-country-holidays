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
            ref.current.style.transform = `translate3d(0, ${y}px, 0) scale(${zoom})`;
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
