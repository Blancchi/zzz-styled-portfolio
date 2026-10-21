/** Second panel in the horizontal track: the heading rides in along the line. */
export default function IntroPanel() {
  return (
    <section className="relative flex min-h-[60vh] w-full shrink-0 items-center px-6 md:h-screen md:w-screen md:px-12">
      <div className="relative z-10 bg-base pr-6">
        <div className="font-mono text-xs uppercase tracking-[0.3em] text-signal-teal">
          Agent Profile // 009
        </div>
        <h2 className="mt-2 font-display text-4xl font-bold uppercase text-white md:text-6xl">
          Who <span className="text-acid">Am I?</span>
        </h2>
      </div>
    </section>
  );
}
