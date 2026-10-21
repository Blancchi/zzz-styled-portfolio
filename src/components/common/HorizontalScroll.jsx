import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/**
 * HorizontalScroll — pins its children as full-screen panels and slides
 * them left as you scroll vertically (the "hero slides away, next panel
 * rides in" effect).
 *
 * Depth: any descendant with class `depth-item` and `data-speed="0.15"`
 * gets an EXTRA x-shift of (distance * speed) on the same scrub, so it
 * slides faster (positive) or slower (negative) than the track.
 *
 * Desktop only (md+) and skipped for reduced-motion; below that, panels
 * simply stack vertically.
 */
export default function HorizontalScroll({ children }) {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const track = trackRef.current;
          const distance = () => track.scrollWidth - window.innerWidth;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: wrapRef.current,
              start: "top top",
              end: () => "+=" + distance(),
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          tl.to(track, { x: () => -distance(), ease: "none" }, 0);

          gsap.utils.toArray(".depth-item", track).forEach((el) => {
            const speed = parseFloat(el.dataset.speed || "0");
            if (!speed) return;
            tl.to(el, { x: () => -distance() * speed, ease: "none" }, 0);
          });
        }
      );

      return () => mm.revert();
    },
    { scope: wrapRef }
  );

  return (
    <div ref={wrapRef} className="relative overflow-hidden md:h-screen">
      <div
        ref={trackRef}
        className="relative flex flex-col will-change-transform md:h-full md:w-max md:flex-row"
      >
        {/* Thick HUD line that runs through every panel */}
        <div className="pointer-events-none absolute left-0 top-[46%] z-0 hidden h-[3px] w-full bg-acid/70 md:block" />
        {children}
      </div>
    </div>
  );
}
