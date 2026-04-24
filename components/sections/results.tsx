import Link from "next/link"
import { ChapterContinuation } from "@/components/ui/section-label"

type Slot = {
  metric: string
  label: string
  context: string
  placeholder?: boolean
}

const slots: Slot[] = [
  {
    metric: "Ø +XX %",
    label: "Prophylaxe-Stunden / Monat",
    context: "nach 6 Monaten Begleitung — Durchschnitt über alle begleiteten Praxen",
    placeholder: true,
  },
  {
    metric: "Ø +XX %",
    label: "Zusatzleistungs-Quote",
    context: "aus erklärten Zusatzleistungen, die tatsächlich vereinbart werden",
    placeholder: true,
  },
  {
    metric: "Ø +XX pp",
    label: "Recall-Treue",
    context: "Anteil aktiv wiederkehrender Prophylaxe-Patient:innen im 6-Monats-Fenster",
    placeholder: true,
  },
  {
    metric: "150+",
    label: "Begleitete Praxen im DACH-Raum",
    context: "Einzelpraxen bis Gemeinschaftspraxen — seit 2015",
  },
]

export function Results() {
  return (
    <section
      id="ergebnisse"
      aria-labelledby="ergebnisse-title"
      className="bg-background py-16 sm:py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-5 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <ChapterContinuation numeral="ii · ii" label="Ehrliche Zahlen" />
            <h2
              id="ergebnisse-title"
              className="serif-display mt-6 text-[28px] leading-[1.1] text-foreground sm:text-4xl md:text-5xl"
            >
              Ehrliche Zahlen statt Marketing-Uplifts.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
              Wir arbeiten gerade an einer belastbaren Durchschnitts-Statistik
              aus 150+ Praxisbegleitungen. Bis zu den bestätigten Werten
              stehen Platzhalter — wir erfinden keine Uplifts.
            </p>
          </div>
          <Link
            href="/erfolgsgeschichten"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-foreground"
          >
            <span className="border-b border-accent/60 pb-0.5">
              Praxis-Cases ansehen
            </span>
            <span aria-hidden className="text-accent">
              →
            </span>
          </Link>
        </div>

        <dl className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 md:grid-cols-4">
          {slots.map((s) => (
            <div
              key={s.label}
              className="flex flex-col gap-3 bg-background p-6 sm:p-7"
            >
              <dt className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                {s.label}
              </dt>
              <dd className="font-serif text-3xl italic leading-none text-foreground sm:text-4xl">
                {s.metric}
              </dd>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {s.context}
              </p>
              {s.placeholder && (
                <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/80">
                  In Validierung
                </p>
              )}
            </div>
          ))}
        </dl>

        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Wir arbeiten mit anonymisierten, von den Praxen freigegebenen
          Kennzahlen. Einzelne Case-Studies publizieren wir unter{" "}
          <Link href="/erfolgsgeschichten" className="text-accent underline-offset-4 hover:underline">
            Erfolgsgeschichten
          </Link>
          .
        </p>
      </div>
    </section>
  )
}
