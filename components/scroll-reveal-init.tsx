"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollRevealInit() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.reveal').forEach(el => {
        el.classList.add('revealed');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    const observeElements = () => {
      document.querySelectorAll(".reveal:not(.revealed), .reveal-stagger:not(.revealed)").forEach((el) => {
        observer.observe(el);
      });
    };

    // Initial check
    observeElements();

    let pendingRevealCheck = false;
    const checkForNewReveals = () => {
      document.querySelectorAll(".reveal:not(.revealed), .reveal-stagger:not(.revealed)").forEach((el) => {
        observer.observe(el);
      });
    };

    const mutationCallback = () => {
      if (!pendingRevealCheck) {
        pendingRevealCheck = true;
        const schedule = window.requestIdleCallback || ((cb: () => void) => setTimeout(cb, 50));
        schedule(() => {
          checkForNewReveals();
          pendingRevealCheck = false;
        });
      }
    };
    
    const mutationObserver = new MutationObserver(mutationCallback);
    
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [pathname]);

  return null;
}
