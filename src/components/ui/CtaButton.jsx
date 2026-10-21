import { useRef } from "react";
import gsap from "gsap";

const VARIANTS = {
  primary: {
    base: "bg-acid text-base-deep border-acid",
    fillFrom: "#E2FF00",
    fillTo: "#FF5500",
  },
  ghost: {
    base: "bg-transparent text-white border-white/40",
    fillFrom: "transparent",
    fillTo: "#00F0FF",
  },
};

export default function CtaButton({ children, variant = "primary", onClick, className = "" }) {
  const btnRef = useRef(null);
  const v = VARIANTS[variant];

  const handleEnter = () => {
    gsap.to(btnRef.current, {
      skewX: -8,
      scale: 1.04,
      backgroundColor: v.fillTo,
      borderColor: v.fillTo,
      color: variant === "primary" ? "#0A0B0D" : "#0A0B0D",
      duration: 0.35,
      ease: "power4.out",
    });
  };

  const handleLeave = () => {
    gsap.to(btnRef.current, {
      skewX: 0,
      scale: 1,
      backgroundColor: variant === "primary" ? v.fillFrom : "transparent",
      borderColor: variant === "primary" ? v.fillFrom : "rgba(255,255,255,0.4)",
      color: variant === "primary" ? "#0A0B0D" : "#FFFFFF",
      duration: 0.4,
      ease: "power4.out",
    });
  };

  return (
    <button
      ref={btnRef}
      onClick={onClick}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={`clip-path-cut-sm border-2 px-8 py-3 font-display text-sm font-semibold uppercase tracking-widest transition-colors ${v.base} ${className}`}
    >
      {children}
    </button>
  );
}
