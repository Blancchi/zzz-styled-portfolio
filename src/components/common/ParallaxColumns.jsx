import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * ParallaxColumns — multi-column scroll-driven parallax, after Olivier
 * Larose's technique (https://www.youtube.com/watch?v=DWio4NCIdeQ):
 *
 * Content is split into N columns. As the container scrolls through the
 * viewport, each column is translated vertically by an amount equal to
 * `-columnHeight * speed`, scrubbed 1:1 to scroll position. Alternating
 * positive/negative speeds make neighboring columns drift apart as you
 * scroll, which is what reads as "parallax" rather than a uniform shift.
 *
 * Props:
 * - columns: array of arrays of ReactNode — one sub-array per column.
 * - speeds: array of numbers, one per column (e.g. [0.15, -0.12, 0.2]).
 *   Positive = column ends up lower than start; negative = higher.
 *   Defaults to alternating ±0.15 if omitted.
 * - className: classes for the outer grid.
 * - columnClassName: classes for each column div.
 */
export default function ParallaxColumns({
  columns,
  speeds,
  className = "",
  columnClassName = "",
}) {
  const containerRef = useRef(null);
  const columnRefs = useRef([]);
  columnRefs.current = [];

  const registerColumn = (el) => {
    if (el && !columnRefs.current.includes(el)) columnRefs.current.push(el);
  };

  useGSAP(
    () => {
      columnRefs.current.forEach((col, i) => {
        const speed = speeds?.[i] ?? (i % 2 === 0 ? 0.16 : -0.16);
        if (!speed) return;

        gsap.to(col, {
          y: () => -col.offsetHeight * speed,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });

      // Column heights differ once the above y-offsets apply, so the
      // page height ScrollTrigger measured at mount can go stale —
      // refresh once everything (including images) has settled.
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      return () => window.removeEventListener("load", refresh);
    },
    { scope: containerRef, dependencies: [columns.length] }
  );

  return (
    <div
      ref={containerRef}
      className={`grid gap-6 ${className}`}
      style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}
    >
      {columns.map((col, i) => (
        <div
          key={i}
          ref={registerColumn}
          className={`flex flex-col gap-6 will-change-transform ${columnClassName}`}
        >
          {col}
        </div>
      ))}
    </div>
  );
}
