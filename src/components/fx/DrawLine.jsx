import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/** Thin vertical line that grows downward with scroll. Give it a height via className. */
export default function DrawLine({ className = "" }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ref.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 75%",
            end: "bottom 35%",
            scrub: true,
          },
        }
      );
    },
    { scope: ref }
  );

  return <div ref={ref} className={`w-px origin-top bg-white/50 ${className}`} />;
}
