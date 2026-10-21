import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MessageSquare, Twitter, Github, Video, Disc as Discord, Copy, ExternalLink } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const SOCIAL_LINKS = [
  {
    name: "GITHUB",
    handle: "Blancchi",
    href: "https://github.com/Blancchi",
    icon: Github,
    tag: "Link // 01",
  },
  {
    name: "X / TWITTER",
    handle: "@BlancchiIi",
    href: "https://x.com/BlancchiIi",
    icon: Twitter,
    tag: "Link // 02",
  },
  {
    name: "TIKTOK",
    handle: "@blancchi",
    href: "https://tiktok.com/@blancchi",
    icon: Video,
    tag: "Link // 03",
  },
  {
    name: "DISCORD",
    handle: "blancchi",
    href: "#",
    icon: Discord,
    tag: "COMM // DIRECT",
    isDiscord: true,
  },
];

export default function Contact() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      gsap.to(".contact-content", {
        y: () => -window.innerHeight * 0.05,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    },
    { scope: containerRef }
  );

  const copyDiscord = (handle) => {
    navigator.clipboard.writeText(handle);
    alert(`Copied Discord tag: ${handle}`);
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative bg-base px-6 py-24 md:px-12 border-t border-white/10 overflow-hidden"
    >
      <div className="contact-content mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col items-start justify-between gap-4 border-b border-white/10 pb-6 md:flex-row md:items-end">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-acid">
              COMMUNICATION // LINK
            </span>
            <h2 className="mt-2 font-display text-4xl font-bold uppercase tracking-tight text-white md:text-5xl">
              FOLLOW ME ON
            </h2>
          </div>
          <p className="max-w-md font-mono text-xs uppercase text-white/50">
            [YOU CAN] — FOLLOW ME ON TIKTOK FOR MY ANIME EDITS :D 
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SOCIAL_LINKS.map((social) => {
            const Icon = social.icon;

            return (
              <div
                key={social.name}
                className="group relative flex flex-col justify-between border border-white/10 bg-surface/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-acid hover:bg-surface/90"
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-[10px] text-white/40">
                    <span>{social.tag}</span>
                    <Icon className="h-4 w-4 text-white/60 transition-colors group-hover:text-acid" />
                  </div>

                  <h3 className="mt-4 font-display text-lg font-bold uppercase tracking-wider text-white group-hover:text-acid">
                    {social.name}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-white/60">
                    {social.handle}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-white/5">
                  {social.isDiscord ? (
                    <button
                      onClick={() => copyDiscord(social.handle)}
                      className="inline-flex w-full items-center justify-between font-mono text-xs uppercase text-white/80 hover:text-acid cursor-pointer"
                    >
                      <span>COPY USERNAME</span>
                      <Copy className="h-3.5 w-3.5" />
                    </button>
                  ) : (
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-between font-mono text-xs uppercase text-white/80 hover:text-acid"
                    >
                      <span>OPEN LINK</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>

                <span className="absolute top-0 right-0 h-2 w-2 border-r border-t border-acid/0 transition-all group-hover:border-acid" />
              </div>
            );
          })}
        </div>

        <div className="mt-8 border border-white/10 bg-surface/40 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <MessageSquare className="h-5 w-5 text-acid" />
            <span className="font-mono text-sm text-white/80">
              DIRECT_MAIL // gyoza498@gmail.com
            </span>
          </div>
          <a
            href="mailto:gyoza498@gmail.com"
            className="border border-acid bg-acid/10 px-6 py-2 font-mono text-xs uppercase tracking-widest text-acid hover:bg-acid hover:text-base transition-colors"
          >
            SEND TRANSMISSION
          </a>
        </div>
      </div>
    </section>
  );
}