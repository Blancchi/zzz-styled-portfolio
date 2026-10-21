import { createContext, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext(null);

/**
 * useLenis — read access to the singleton Lenis instance from any
 * descendant (e.g. to lenis.scrollTo() a section on nav click).
 */
export function useLenis() {
  return useContext(LenisContext);
}

/**
 * SmoothScroll
 *
 * Owns one Lenis instance and drives it from GSAP's ticker instead of
 * its own requestAnimationFrame loop. This keeps Lenis and every GSAP
 * tween (including ScrollTrigger-driven ones) on the exact same frame
 * clock, which is what prevents the 1-frame jitter/tearing you get
 * when two independent rAF loops both mutate transforms.
 */
export default function SmoothScroll({ children }) {
  const lenisRef = useRef(null);
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    const instance = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo.out
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
      // Let native touch scrolling stay native on mobile for feel/perf.
      syncTouch: false,
    });

    lenisRef.current = instance;
    setLenis(instance);

    // Every Lenis scroll frame must tell ScrollTrigger to recompute,
    // or pinned/scrubbed animations will read a stale scroll position.
    instance.on("scroll", ScrollTrigger.update);

    // Drive Lenis from GSAP's ticker (already a rAF loop) instead of
    // calling lenis.raf() from its own loop. GSAP passes time in
    // seconds; Lenis wants milliseconds.
    const update = (time) => {
      instance.raf(time * 1000);
    };
    gsap.ticker.add(update);

    // GSAP smooths its own ticker by default (lagSmoothing), which can
    // fight Lenis's easing on long frames. Disable it for scroll work.
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(update);
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}
