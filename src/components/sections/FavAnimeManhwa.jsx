import { useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const mediaList = [
  {
    id: "a1",
    title: "NARUTO",
    type: "anime",
    genre: "ACTION & ADVENTURE / SHONEN",
    rating: "10/10",
    image: "/images/covers/naruto.jpg",
    comment: "Fight choreography hits like a real combat log.",
  },
  {
    id: "a2",
    title: "VINLAND SAGA",
    type: "anime",
    genre: "DRAMA / HISTORICAL",
    rating: "10/10",
    image: "/images/covers/vinland-saga.jpg",
    comment: "Best character arc I've seen in any medium.",
  },
  {
    id: "a3",
    title: "RE:ZERO",
    type: "anime",
    genre: "ISEKAI / DARK FANTASY & ADVENTURE",
    rating: "9.5/10",
    image: "/images/covers/rezero.jpg",
    comment: "Slow, quiet, and devastating in the best way.",
  },
  {
    id: "m1",
    title: "STAR-EMBRACING SWORDMASTER",
    type: "manhwa",
    genre: "ACTION / FANTASY",
    rating: "10/10",
    image: "/images/covers/swordmaster.jpg",
    comment: "The panel art alone justifies the S-rank.",
  },
  {
    id: "m2",
    title: "ETERNALLY REGRESSING KNIGHT",
    type: "manhwa",
    genre: "ACTION / ADVENTURE",
    rating: "9/10",
    image: "/images/covers/eternally-regressing-knight.jpg",
    comment: "Meta storytelling that actually pays off.",
  },
  {
    id: "m3",
    title: "RETURN OF THE MOUNT HUA SECT",
    type: "manhwa",
    genre: "ACTION / ADVENTURE",
    rating: "8/10",
    image: "/images/covers/return-of-the-mount-hua-sect.jpg",
    comment: "Reliable weekly comfort read.",
  },
];

const FILTERS = ["ALL", "ANIME", "MANHWA"];

export default function FavAnimeManhwa() {
  const [filter, setFilter] = useState("ALL");
  const sectionRef = useRef(null);

  const filtered = useMemo(() => {
    if (filter === "ALL") return mediaList;
    return mediaList.filter((m) => m.type === filter.toLowerCase());
  }, [filter]);

  useGSAP(
    () => {
      gsap.from(".signal-card", {
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.08,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        },
      });

      const speeds = [0.12, -0.12, 0.08];
      gsap.utils.toArray(".card-media-img").forEach((img, i) => {
        gsap.to(img, {
          y: () => img.parentElement.offsetHeight * speeds[i % speeds.length],
          ease: "none",
          scrollTrigger: {
            trigger: img.closest(".signal-card"),
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    },
    { scope: sectionRef, dependencies: [filter] }
  );

  return (
    <section
      id="anime-manhwa"
      ref={sectionRef}
      className="relative bg-base px-6 py-24 md:px-12"
    >
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6 border-b border-white/10 pb-6">
        <div>
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-signal-teal">
            Signal Search // Database
          </div>
          <h2 className="mt-2 font-display text-4xl font-bold uppercase text-white md:text-5xl">
            Fav Anime &amp; Manhwa
          </h2>
        </div>

        <div className="flex gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`clip-path-cut-sm border px-4 py-2 font-mono text-xs uppercase tracking-widest transition-colors ${
                filter === f
                  ? "border-acid bg-acid text-base-deep"
                  : "border-white/20 text-white/60 hover:border-acid/60 hover:text-acid"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <article
            key={item.id}
            className="signal-card group relative overflow-hidden border border-white/10 bg-surface/60 clip-path-cut-sm"
          >
            <div className="relative h-56 w-full overflow-hidden bg-surface-raised">
              <img
                src={item.image}
                alt={item.title}
                className="card-media-img h-full w-full scale-125 object-cover transition-transform duration-500 group-hover:scale-[1.35]"
              />
              <div className="absolute right-2 top-2 border border-acid/70 bg-base-deep/80 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-acid">
                {item.type === "anime" ? "Anime" : "Manhwa"}
              </div>
              <div className="absolute bottom-2 left-2 border border-signal-orange/70 bg-base-deep/80 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-signal-orange">
                S-RANK // {item.rating}
              </div>
            </div>

            <div className="p-4">
              <h3 className="font-display text-lg font-semibold uppercase text-white">
                {item.title}
              </h3>
              <div className="mt-1 font-mono text-[11px] uppercase tracking-widest text-white/40">
                {item.genre}
              </div>
              <p className="mt-3 text-sm italic text-white/60">
                "{item.comment}"
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}