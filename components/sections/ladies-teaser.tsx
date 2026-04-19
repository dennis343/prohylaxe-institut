import Link from "next/link"

export function LadiesTeaser() {
  return (
    <section
      aria-label="April-Spezial"
      className="bg-background"
    >
      <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-5 sm:pb-20 md:px-8 md:pb-24">
        <Link
          href="/ladies"
          className="group relative block overflow-hidden rounded-lg border border-accent/30 bg-accent/5 p-6 transition-colors hover:bg-accent/10 sm:p-8 md:p-10"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-12 h-56 w-56 rounded-full bg-[radial-gradient(closest-side,var(--accent),transparent_70%)] opacity-20 blur-3xl"
          />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-10">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                <span aria-hidden>♥</span>
                April-Spezial
              </span>
              <h2 className="serif-display mt-4 text-2xl leading-[1.1] text-foreground sm:text-3xl md:text-4xl">
                All the Single Ladies —{" "}
                <em className="italic text-accent">
                  ein Liebesbrief an unsere ZFAs.
                </em>
              </h2>
              <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-muted-foreground">
                Augenzwinkernde Kampagne: Warum Prophylaxe-Profis zu Unrecht
                Single sind — mit literarischem Bewerbungsformular.
              </p>
            </div>
            <span className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-foreground">
              <span className="border-b border-accent/60 pb-0.5">
                Zur Kampagne
              </span>
              <span
                aria-hidden
                className="text-accent transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </span>
          </div>
        </Link>
      </div>
    </section>
  )
}
