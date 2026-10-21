import ParallaxColumns from "../common/ParallaxColumns";
import ParallaxCard from "../ui/ParallaxCard";

const hobbyList = [
  {
    id: "h1",
    title: "Reading Manhwas",
    tag: "Action / Regression",
    description: "Deep-diving into high-tier action, regression, and fantasy panel art for visual pacing.",
    image: "/images/covers/swordmaster.jpeg",
  },
  {
    id: "h2",
    title: "Playing Games",
    tag: "Gacha / RPG",
    description: "Analyzing combat feedback, UI polish, and game mechanics in modern games.",
    image: "/images/covers/naruto.jpg",
  },
  {
    id: "h3",
    title: "Editing",
    tag: "Video & Graphic",
    description: "Crafting motion graphics, video cuts, and visual effects to sharpen design skills.",
    image: "/images/covers/vinland-saga.jpg",
  },
  {
    id: "h4",
    title: "Watching Anime & Movies",
    tag: "Shonen / Fantasy",
    description: "Studying frame composition, dark fantasy aesthetics, and cinematic storytelling.",
    image: "/images/covers/rezero.jpg",
  },
];

const COLUMN_COUNT = 2;
const SPEEDS = [-0.15, 0.15];

function distributeIntoColumns(items, count) {
  const columns = Array.from({ length: count }, () => []);
  items.forEach((item, i) => columns[i % count].push(item));
  return columns;
}

export default function Hobbies() {
  const columns = distributeIntoColumns(hobbyList, COLUMN_COUNT).map((col) =>
    col.map((h) => (
      <ParallaxCard
        key={h.id}
        title={h.title}
        tag={h.tag}
        description={h.description}
        image={h.image}
        accent="orange"
      />
    ))
  );

  return (
    <section
      id="hobbies"
      className="relative border-t border-white/10 bg-base px-6 py-24 md:px-12"
    >
      <div className="mb-10 border-b border-white/10 pb-6">
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-signal-orange">
          free-time // Personal
        </div>
        <h2 className="mt-2 font-display text-4xl font-bold uppercase text-white md:text-5xl">
          Hobbies
        </h2>
      </div>

      <ParallaxColumns columns={columns} speeds={SPEEDS} />
    </section>
  );
}