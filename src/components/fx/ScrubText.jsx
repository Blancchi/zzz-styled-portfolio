import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/** Words go from dim to fully lit as you scroll through the paragraph. */
export default function ScrubText({ text, className = "" }) {
  const ref = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ref.current.querySelectorAll(".sw"),
        { opacity: 0.12 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            end: "bottom 65%",
            scrub: true,
          },
        }
      );
    },
    { scope: ref, dependencies: [text] }
  );

  return (
    <p ref={ref} className={className}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="sw mr-[0.25em] inline-block">
          {w}
        </span>
      ))}
    </p>
  );
}
