/**
 * ParallaxCard — the individual tile used inside ParallaxColumns for
 * Projects and Hobbies. Kept separate from the anime/manhwa MediaCard
 * markup in FavAnimeManhwa.jsx since the two grids differ in fields.
 */
export default function ParallaxCard({ title, tag, description, image, accent = "acid" }) {
  const ACCENTS = {
    acid: "border-acid/60 text-acid",
    orange: "border-signal-orange/60 text-signal-orange",
    teal: "border-signal-teal/60 text-signal-teal",
  };

  return (
    <article className="group relative overflow-hidden border border-white/10 bg-surface/60 clip-path-cut-sm">
      <div className="relative h-44 w-full overflow-hidden bg-surface-raised">
        {image && (
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        )}
        {tag && (
          <div
            className={`absolute right-2 top-2 border bg-base-deep/80 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest ${ACCENTS[accent]}`}
          >
            {tag}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-display text-lg font-semibold uppercase text-white">
          {title}
        </h3>
        {description && (
          <p className="mt-2 text-sm text-white/60">{description}</p>
        )}
      </div>
    </article>
  );
}
