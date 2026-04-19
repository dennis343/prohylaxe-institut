import Link from "next/link"
import { Button } from "@/components/ui/button"

const benefits = [
  {
    title: "Bevorzugte Starttermine",
    description:
      "Als Wartelisten-Teilnehmer erhalten Sie bevorzugten Zugang und können Ihren Starttermin flexibel abstimmen.",
  },
  {
    title: "Frühzeitige Informationen",
    description:
      "Exklusive Einblicke und detaillierte Informationen zu den Programminhalten, bevor diese öffentlich zugänglich sind.",
  },
  {
    title: "Exklusiver Pionierbonus",
    description:
      "Als Dankeschön für frühes Vertrauen erhalten Sie einen besonderen Pionierbonus, der nur für Wartelisten-Teilnehmer verfügbar ist.",
  },
]

export function Waitlist() {
  return (
    <section className="bg-secondary/40 py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="eyebrow mx-auto justify-center">Jetzt vormerken</div>
          <h2 className="serif-display mt-6 text-3xl leading-[1.1] text-foreground md:text-5xl">
            Sichern Sie sich Ihren{" "}
            <em className="italic text-accent">Vorsprung.</em>
          </h2>
          <p className="mt-6 text-base text-muted-foreground md:text-lg">
            Die Warteliste ist kostenlos und unverbindlich. Es gilt: First come,
            first served.
          </p>
        </div>

        <ol className="mt-16 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-3">
          {benefits.map((b, i) => (
            <li
              key={b.title}
              className="flex flex-col gap-4 bg-background p-8 md:p-10"
            >
              <span className="font-serif text-sm italic text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-serif text-xl font-light tracking-tight text-foreground md:text-2xl">
                {b.title}
              </h3>
              <p className="text-[14px] leading-relaxed text-muted-foreground">
                {b.description}
              </p>
            </li>
          ))}
        </ol>

        <div className="mt-14 flex flex-col items-center gap-4 text-center">
          <Button
            asChild
            size="lg"
            className="rounded-full px-8 text-sm tracking-wide"
          >
            <Link href="/kontakt#warteliste">
              Jetzt unverbindlich vormerken lassen
            </Link>
          </Button>
          <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Antwort in 1–2 Werktagen · 100 % unverbindlich
          </p>
        </div>
      </div>
    </section>
  )
}
