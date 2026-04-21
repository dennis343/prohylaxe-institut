import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChapterContinuation } from "@/components/ui/section-label"

const consulting = [
  {
    variant: "Variante 1",
    title: "Strategische Prophylaxe-Integration",
    description:
      "Konzeption für ein zusätzliches, kalkulierbares und steuerbares Profitcenter in Ihrer Praxis.",
    points: [
      "Analyse der aktuellen Umsatz- und Leistungsstruktur",
      "Bewertung bestehender Prophylaxe- und Zusatzleistungen",
      "Strukturiertes Profitcenter-Modell mit Steuerungs-KPIs",
      "Preismodelle, Abo-Strategien & Wirtschaftlichkeitsrechnung",
    ],
  },
  {
    variant: "Variante 2",
    title: "Kommunikations- und Bindungsoptimierung",
    description:
      "Mehr freiwillige Termin­wahrnehmung. Höhere Weiterempfehlung. Stärkere Teamwirkung.",
    points: [
      "Patientenweg vom Erstkontakt bis zum Wiedertermin",
      "Patienten-Wirkungs-Kommunikation® & Gesprächsleitfäden",
      "Rollenklärung im Team & Recruiting-Wirkung",
      "Produktive Fehlerkultur und messbare Zufriedenheit",
    ],
  },
]

const mentoringStages = [
  {
    name: "Reinschnuppern",
    duration: "3 Monate",
    text: "Erste Potenziale sichtbar, strukturierter Start.",
  },
  {
    name: "Umsetzer-Programm",
    duration: "6 Monate",
    text: "Systematischer Aufbau von Prophylaxe, Team & Abläufen.",
  },
  {
    name: "Elite-Training",
    duration: "18 Monate",
    text: "Selbsttragende Renditesäule auf Autopilot.",
  },
]

export function Programs() {
  return (
    <section className="bg-background py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-5 md:px-8">
        <div className="max-w-2xl">
          <ChapterContinuation numeral="iv · ii" label="Angebote" />
          <h2 className="serif-display mt-6 text-[32px] leading-[1.1] text-foreground sm:text-4xl md:text-5xl">
            Zwei Einstiegs-Beratungen — und ein Mentoring für die Tiefe.
          </h2>
          <p className="lead mt-6">
            Sie starten mit einem konkreten, geförderten Beratungsbaustein.
            Wer schneller, sicherer und mit weniger Umwegen umsetzen möchte,
            geht direkt ins Mentoring-Programm.
          </p>
        </div>

        {/* Einstiegsprodukte: zwei Beratungsbausteine */}
        <div className="mt-16 md:mt-20">
          <div className="flex items-center gap-4">
            <span className="font-serif text-lg italic text-foreground/60">
              Einstieg
            </span>
            <span className="h-px flex-1 bg-border" />
            <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Förderfähig 50–80 %
            </span>
          </div>

          <div className="mt-8 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2">
            {consulting.map((c) => (
              <article
                key={c.variant}
                className="group flex flex-col bg-card p-6 transition-colors duration-500 hover:bg-secondary/30 sm:p-8 md:p-10"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/55">
                  {c.variant}
                </span>
                <h3 className="mt-4 font-serif text-2xl font-normal tracking-tight text-foreground md:text-3xl">
                  {c.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  {c.description}
                </p>

                <ul className="mt-8 space-y-4 border-t border-border pt-6">
                  {c.points.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-3 text-[15px] leading-relaxed text-foreground"
                    >
                      <span
                        aria-hidden
                        className="mt-2.5 inline-block h-px w-4 shrink-0 bg-foreground/30"
                      />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 flex items-end justify-between gap-4 border-t border-border pt-6">
                  <div>
                    <p className="font-serif text-2xl italic text-accent md:text-[28px]">
                      50–80&nbsp;% gefördert
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      BAFA-Beratungsförderung · West 50 % · Ost 80 %
                    </p>
                  </div>
                  <Link
                    href="/gespraech"
                    className="inline-flex items-center gap-2 text-sm font-medium text-foreground"
                  >
                    <span className="border-b border-accent/60 pb-0.5">
                      Anfragen
                    </span>
                    <span aria-hidden className="text-accent">
                      →
                    </span>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Beide Bausteine sind unabhängig nutzbar — und im selben Förderjahr
            kombinierbar (bis zu zwei geförderte Beratungen pro Jahr).
          </p>
        </div>

        {/* Elite: Mentoring-Programm */}
        <div className="mt-20 md:mt-28">
          <div className="flex items-center gap-4">
            <span className="font-serif text-lg italic text-foreground/60">
              Elite
            </span>
            <span className="h-px flex-1 bg-border" />
            <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Mentoring-Programm
            </span>
          </div>

          <article className="relative mt-8 overflow-hidden rounded-lg bg-primary p-6 text-primary-foreground sm:p-8 md:p-14">
            <span
              aria-hidden
              className="pointer-events-none absolute -right-32 -top-20 h-[440px] w-[440px] rounded-full bg-[radial-gradient(closest-side,var(--accent),transparent_70%)] opacity-15 blur-3xl"
            />
            <div className="relative grid gap-12 md:grid-cols-[6fr_5fr] md:gap-16">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/80">
                  Empfohlen für ambitionierte Praxen
                </span>
                <h3 className="serif-display mt-6 text-[28px] leading-[1.1] sm:text-3xl md:text-5xl">
                  Praxis-Mentoring — in der Tiefe begleitet.
                </h3>
                <p className="mt-6 text-base leading-relaxed text-primary-foreground/85 md:text-lg">
                  Direktes Sparring, engere Begleitung und konsequente
                  Umsetzung — drei Stufen, die aufeinander aufbauen.
                </p>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <Button
                    asChild
                    size="lg"
                    className="rounded-full bg-accent px-8 text-sm font-semibold tracking-wide text-accent-foreground hover:bg-accent/90"
                  >
                    <Link href="/programme">Mentoring-Stufen ansehen</Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="rounded-full border-primary-foreground/30 bg-transparent px-8 text-sm font-medium tracking-wide text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                  >
                    <Link href="/gespraech">Erstgespräch anfragen</Link>
                  </Button>
                </div>
              </div>

              <ul className="space-y-6 md:border-l md:border-primary-foreground/20 md:pl-12">
                {mentoringStages.map((s) => (
                  <li key={s.name}>
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="font-serif text-xl text-primary-foreground md:text-2xl">
                        {s.name}
                      </span>
                      <span className="shrink-0 text-xs uppercase tracking-[0.18em] text-primary-foreground/65">
                        {s.duration}
                      </span>
                    </div>
                    <p className="mt-2 text-[15px] leading-relaxed text-primary-foreground/80">
                      {s.text}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <p className="mt-8 max-w-2xl font-serif text-lg italic leading-snug text-foreground md:text-xl">
            „Nicht notwendig. Meist sinnvoll. Immer lohnenswert."
          </p>
        </div>
      </div>
    </section>
  )
}
