import DrawLine from "../fx/DrawLine";
import ScrubText from "../fx/ScrubText";

const STACK = [
  { label: "Program", items: ["BS Computer Science, 4th year at Sorsogon State University - Bulan Campus"] },
  { label: "Stack", items: ["React, Tailwind CSS, GSAP and Lenis, Node.js, Express.js, RESTful APIs, PostgreSQL/MySQL, MongoDB, and Authentication."] },
  {
    label: "Also", items: ["A Gamer, video editing in CapCut, and Loves reading manhwa/manga and watching anime."],
  },
];

export default function About() {
  return (
    <section id="about" className="relative border-t border-white/10 bg-base px-6 py-32 md:px-12">
      <div className="grid gap-10 md:grid-cols-[1fr_auto_1.2fr] md:gap-16">
        <h2 className="font-display text-4xl font-bold uppercase leading-tight text-white md:text-5xl">
          Still learning,
          <br />
          <span className="text-acid">Grinding.</span>
        </h2>

        <DrawLine className="hidden h-[60vh] md:block" />

        <ScrubText
          className="self-center font-body text-lg leading-relaxed text-white md:text-2xl"
          text="I'm a fourth-year CS student, still figuring out which language to master. Right now I'm focusing on backend development, though I wouldn't call myself an expert yet. On the front end, I like building interfaces that feel as sharp and responsive as a game menu."
        />
      </div>

      <div className="mt-24 grid gap-8 md:grid-cols-3">
        {STACK.map((group) => (
          <div key={group.label} className="border-t border-acid/40 pt-4">
            <div className="font-mono text-xs uppercase tracking-widest text-acid">
              {group.label}
            </div>
            <ul className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="clip-path-cut-sm border border-white/15 bg-surface/60 px-3 py-1 font-mono text-xs uppercase tracking-wider text-white/80"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
