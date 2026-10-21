import { useRef } from "react";
import gsap from "gsap";
import { useLenis } from "../common/SmoothScroll";

export default function NavTab({ label, href, onNavigate }) {
  const ref = useRef(null);
  const lenis = useLenis();

  const handleClick = (e) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (!target) return;
    if (lenis) {
      lenis.scrollTo(target, { offset: -24, duration: 1.2 });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
    onNavigate?.();
  };

  const handleEnter = () => {
    gsap.to(ref.current, {
      skewX: -12,
      backgroundColor: "#E2FF00",
      color: "#0A0B0D",
      duration: 0.25,
      ease: "power4.out",
    });
  };

  const handleLeave = () => {
    gsap.to(ref.current, {
      skewX: 0,
      backgroundColor: "transparent",
      color: "#FFFFFF",
      duration: 0.3,
      ease: "power4.out",
    });
  };

  return (
    <a
      ref={ref}
      href={href}
      onClick={handleClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="nav-tab border border-white/15 px-4 py-2 font-mono text-xs uppercase tracking-widest text-white transition-colors"
    >
      {label}
    </a>
  );
}
