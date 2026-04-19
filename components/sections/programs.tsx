import Link from "next/link"
import { Button } from "@/components/ui/button"

const programs = [
  {
    number: "01",
    title: "Reinschnuppern",
    duration: "3 Monate",
    description:
      "Für erste Potenziale und strukturierten Start. Sie lernen das System kennen und identifizieren die größten Hebel in Ihrer Praxis.",
  },
  {
    number: "02",
    title: "Umsetzer-Programm",
    duration: "6 Monate",
    description:
      "Systematischer Aufbau von Prophylaxe, Team und Abläufen. Hier entsteht die Struktur, die Ihre Praxis nachhaltig verändert.",
  },
  {
    number: "03",
    title: "Elite-Training",
    duration: "18 Monate",
    description:
      "Langfristige Etablierung als echte Renditequelle auf Autopilot und strategische Teamentwicklung. Ihr Praxiserfolg wird selbsttragend.",
    highlight: true,
  },
]

export function Programs() {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-2xl">
          <div className="eyebrow">Ihr Weg zum Erfolg</div>
          <h2 className="serif-display mt-6 text-3xl leading-[1.1] text-foreground md:text-5xl">
            Drei Mentoring-Stufen —{" "}
            <em className="italic text-accent">passend für jede Praxisphase.</em>
          </h2>
          <p className="mt-6 text-base text-muted-foreground md:text-lg">
            Wir bieten ein Wachstumsmentoring für ausgewählte Dentalpraxen in
            drei aufeinander aufbauenden Stufen an.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:mt-20 md:grid-cols-3 md:gap-5">
          {programs.map((p) => (
            <article
              key={p.number}
              className={
                p.highlight
                  ? "group relative flex flex-col overflow-hidden rounded-lg bg-primary p-8 text-primary-foreground md:p-10"
                  : "group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card p-8 md:p-10"
              }
            >
              {p.highlight && (
                <span className="absolute right-6 top-6 rounded-full border border-accent/60 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-accent">
                  Empfohlen
                </span>
              )}

              <span
                className={
                  p.highlight
                    ? "font-serif text-sm italic text-accent"
                    : "font-serif text-sm italic text-accent"
                }
              >
                {p.number}
              </span>

              <h3
                className={
                  p.highlight
                    ? "mt-8 font-serif text-3xl font-light tracking-tight md:text-4xl"
                    : "mt-8 font-serif text-3xl font-light tracking-tight text-foreground md:text-4xl"
                }
              >
                {p.title}
              </h3>

              <p
                className={
                  p.highlight
                    ? "mt-2 text-[13px] uppercase tracking-[0.18em] text-primary-foreground/70"
                    : "mt-2 text-[13px] uppercase tracking-[0.18em] text-muted-foreground"
                }
              >
                {p.duration}
              </p>

              <p
                className={
                  p.highlight
                    ? "mt-8 flex-1 text-[15px] leading-relaxed text-primary-foreground/80"
                    : "mt-8 flex-1 text-[15px] leading-relaxed text-muted-foreground"
                }
              >
                {p.description}
              </p>

              <Link
                href="/programme"
                className={
                  p.highlight
                    ? "mt-10 inline-flex items-center gap-2 text-sm font-medium text-accent"
                    : "mt-10 inline-flex items-center gap-2 text-sm font-medium text-foreground"
                }
              >
                <span className="border-b border-accent/50 pb-0.5">
                  Stufe ansehen
                </span>
                <span aria-hidden className="text-accent">→</span>
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start gap-6 border-t border-border pt-10 md:flex-row md:items-center md:justify-between">
          <p className="max-w-xl font-serif text-lg italic text-muted-foreground md:text-xl">
            Individuelles Angebot — Konditionsgestaltung gemäß Ihren Zielen.
          </p>
          <Button
            asChild
            variant="outline"
            className="rounded-full border-foreground/15 px-6 text-sm tracking-wide hover:bg-primary hover:text-primary-foreground"
          >
            <Link href="/programme">Alle Programme vergleichen →</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
