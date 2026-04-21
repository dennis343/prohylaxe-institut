import { SectionLabel } from "@/components/ui/section-label"

const beforeItems = [
  "Moderate Deckungsbeiträge",
  "Hohe Mitarbeiterfluktuation",
  "Wenig Zeit für Patienten und Familie",
]

const afterItems = [
  "Deutlich höhere Umsätze und wiederkehrende Patienten",
  "Stabiles, engagiertes Team, das mitdenkt",
  "Mehr eigene Freiheit und Lebensqualität",
]

export function Transformation() {
  return (
    <section className="bg-secondary/40 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <SectionLabel
            numeral="II"
            label="Was sich verändert"
            className="mx-auto justify-center"
          />
          <h2 className="serif-display mt-6 text-3xl leading-[1.1] text-foreground md:text-5xl">
            Vom Irgendwie
            <br className="hidden sm:block" /> zur Praxis auf Autopilot.
          </h2>
        </div>

        <div className="mt-16 grid gap-10 md:mt-20 md:grid-cols-2 md:gap-16">
          <article className="relative pl-6 md:pl-8">
            <span className="absolute left-0 top-1 h-full w-px bg-border" />
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              Vorher
            </p>
            <h3 className="mt-4 font-serif text-3xl font-light tracking-tight text-foreground md:text-4xl">
              Es geht irgendwie
            </h3>
            <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
              Chaos in den Abläufen, ungenutzte Potenziale in der Prophylaxe,
              überlastete Praxisinhaber und ein Team, das nicht voll ausgeschöpft
              wird.
            </p>
            <ul className="mt-8 space-y-3 text-[15px] text-muted-foreground">
              {beforeItems.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-2 inline-block h-px w-3 shrink-0 bg-muted-foreground/60"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="relative pl-6 md:pl-8">
            <span className="absolute left-0 top-1 h-full w-px bg-foreground/40" />
            <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-foreground/70">
              Nachher
            </p>
            <h3 className="mt-4 font-serif text-3xl font-light tracking-tight text-foreground md:text-4xl">
              Praxis auf Autopilot
            </h3>
            <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
              Strukturierte Prozesse, maximal genutzte Prophylaxe-Potenziale,
              entlastete Praxisinhaber und ein hochmotiviertes,
              eigenverantwortliches Team.
            </p>
            <ul className="mt-8 space-y-3 text-[15px] text-foreground">
              {afterItems.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-2 inline-block h-px w-3 shrink-0 bg-foreground/40"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  )
}
