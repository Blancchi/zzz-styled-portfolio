import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Menu, X, Zap } from "lucide-react";
import CtaButton from "../ui/CtaButton";
import NavTab from "../ui/NavTab";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "Hobbies", href: "#hobbies" },
  { label: "Fav Anime & Manhwa", href: "#anime-manhwa" },
  { label: "Contact", href: "#contact" },
];

export default function Hero() {
  const rootRef = useRef(null);
  const titleRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useGSAP(
    () => {
      const chars = titleRef.current.querySelectorAll(".char");

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(".hero-nav", {
        yPercent: -100,
        opacity: 0,
        duration: 0.5,
        stagger: 0.06,
      })
        .from(
          ".hero-badge",
          { opacity: 0, x: -24, skewX: -20, duration: 0.4 },
          "-=0.2"
        )
        .from(
          chars,
          {
            yPercent: 120,
            opacity: 0,
            duration: 0.7,
            stagger: 0.02,
            ease: "expo.out",
          },
          "-=0.1"
        )
        .from(".hero-subtitle", { opacity: 0, y: 16, duration: 0.5 }, "-=0.35")
        .from(
          ".hero-cta",
          {
            opacity: 0,
            y: 20,
            scale: 0.92,
            duration: 0.45,
            stagger: 0.1,
            ease: "back.out(1.7)",
          },
          "-=0.25"
        )
        .from(
          ".hero-portrait",
          { opacity: 0, xPercent: 6, scale: 1.05, duration: 0.9, ease: "expo.out" },
          "-=0.7"
        )
        .from(
          ".hero-agent-tag",
          { opacity: 0, y: -10, duration: 0.4 },
          "-=0.3"
        );
    },
    { scope: rootRef }
  );

  const title = "HI, I'M MARK TROYLAN B. GOYAL";

  return (
    <section
      ref={rootRef}
      className="relative z-10 flex min-h-screen w-full shrink-0 flex-col overflow-hidden bg-base px-6 pb-10 pt-6 md:h-screen md:w-screen md:px-12"
    >
      {/* Top nav — skewed HUD tabs on desktop; hamburger + stacked panel on mobile */}
      <div className="relative z-30 flex items-center justify-end border-b border-white/10 pb-4">
        <div className="hero-nav hidden gap-2 md:flex">
          {NAV_LINKS.map((link) => (
            <NavTab key={link.href} label={link.label} href={link.href} />
          ))}
        </div>

        <button
          onClick={() => setMenuOpen((o) => !o)}
          className="hero-nav border border-white/20 p-2 text-white md:hidden"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {menuOpen && (
        <div className="absolute right-6 top-[4.25rem] z-30 flex flex-col gap-2 border border-white/15 bg-base-deep/95 p-3 backdrop-blur-sm md:hidden">
          {NAV_LINKS.map((link) => (
            <NavTab
              key={link.href}
              label={link.label}
              href={link.href}
              onNavigate={() => setMenuOpen(false)}
            />
          ))}
        </div>
      )}

      {/* Two-column main content */}
      <div className="relative z-10 grid flex-1 grid-cols-1 items-center gap-10 pt-12 md:grid-cols-2 md:gap-4">
        {/* Left: identity + copy */}
        <div className="hero-copy-col depth-item order-2 md:order-1" data-speed="-0.12">
          <span className="hero-badge inline-block max-w-full border border-signal-teal/50 bg-surface/70 px-4 py-1.5 font-mono text-xs uppercase leading-relaxed tracking-widest text-signal-teal clip-path-cut-sm">
            Computer Science Student // Sorsogon State University – Bulan Campus
          </span>

          <h1
            ref={titleRef}
            className="mt-5 font-display text-[8vw] font-bold uppercase leading-[1.05] tracking-tight text-white sm:text-[7vw] md:text-[3.4vw]"
          >
            {title.split(" ").map((word, wi) => (
              // Each word is its own overflow-hidden mask + inline-block unit,
              // so the line can only wrap BETWEEN words, never mid-word, and
              // the yPercent reveal still masks correctly per word.
              <span
                key={wi}
                className="mr-[0.28em] inline-block overflow-hidden align-top last:mr-0"
              >
                <span className="inline-block">
                  {word.split("").map((c, ci) => (
                    <span
                      key={ci}
                      className="char inline-block will-change-transform"
                    >
                      {c}
                    </span>
                  ))}
                </span>
              </span>
            ))}
          </h1>

          <p className="hero-subtitle mt-6 max-w-md text-base text-white/70 md:text-lg">
            Backend-focused CS student, Video Editor, and a gamer.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <span className="hero-cta inline-block">
              <CtaButton
                variant="primary"
                onClick={() =>
                  document
                    .querySelector("#projects")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <span className="inline-flex items-center gap-2">
                  <Zap size={16} strokeWidth={2.5} />
                  Projects
                </span>
              </CtaButton>
            </span>
            <span className="hero-cta inline-block">
              <CtaButton
                variant="ghost"
                onClick={() =>
                  document
                    .querySelector("#contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Contact
              </CtaButton>
            </span>
          </div>
        </div>

        {/* Right: portrait, blended into background on its left edge */}
        <div className="hero-portrait depth-item order-1 relative mx-auto h-[420px] w-full max-w-sm md:order-2 md:h-[min(560px,62vh)] md:max-w-none" data-speed="0.15">
          <div
            className="relative h-full w-full overflow-hidden clip-path-cut-lg"
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0%, black 22%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, black 22%)",
            }}
          >
            <img
              src="/images/profile.jpg"
              alt="Mark Troylan B. Goyal"
              className="hero-portrait-img h-full w-full object-cover object-top"
            />
            {/* Extra gradient wash so the blend reads correctly over any photo */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-base via-transparent to-transparent" />
          </div>

          {/* Floating technical tag */}
          <div className="hero-agent-tag absolute -bottom-4 left-0 border border-acid/60 bg-surface/80 px-3 py-1 font-mono text-xs uppercase tracking-widest text-acid backdrop-blur-sm md:left-4">
            AGENT_ID // BLANCCHI
          </div>

          {/* Corner frame */}
          <span className="pointer-events-none absolute -right-2 -top-2 h-8 w-8 border-r-2 border-t-2 border-acid/70" />
          <span className="pointer-events-none absolute -bottom-2 -right-2 h-8 w-8 border-b-2 border-r-2 border-acid/70" />
        </div>
      </div>
    </section>
  );
}
