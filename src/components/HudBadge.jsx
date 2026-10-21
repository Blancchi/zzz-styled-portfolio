/**
 * HudBadge — small skewed status chip, e.g. "SYS_STATUS: OPTIMAL".
 * `tone` picks the accent color; defaults to the acid primary.
 */
const TONES = {
  acid: "border-acid/60 text-acid",
  orange: "border-signal-orange/60 text-signal-orange",
  teal: "border-signal-teal/60 text-signal-teal",
};

export default function HudBadge({ label, value, tone = "acid", className = "" }) {
  return (
    <div
      className={`inline-flex items-center gap-2 border bg-surface/70 px-3 py-1 font-mono text-xs tracking-wide clip-path-badge skew-panel ${TONES[tone]} ${className}`}
    >
      <span className="text-white/50">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
