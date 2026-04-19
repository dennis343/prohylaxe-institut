import Link from "next/link"
import { Button } from "@/components/ui/button"

const fundingBenefits = [
  "Vom Bund anerkannte Beratungseinrichtung",
  "Cash-Back nach Umsetzung der Beratung",
  "Concierge-Service: Wir übernehmen die komplette Antragstellung",
]

export function Funding() {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-12 md:grid-cols-[5fr_7fr] md:gap-16">
          <div>
            <div className="eyebrow">Förderung möglich</div>
            <h2 className="serif-display mt-6 text-4xl leading-[1.1] text-foreground md:text-5xl">
              Bis zu{" "}
              <em className="italic text-accent">80 % Zuschuss</em> auf Ihre
              Beratung.
            </h2>
            <p className="lead mt-6">
              Das Prophylaxe-Institut gehört offiziell zu den vom Bund
              anerkannten Beratungs­einrichtungen. Zahnarztpraxen sind
              förderfähig — und unser Concierge übernimmt die komplette
              Bürokratie.
            </p>
          </div>

          <div>
            <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2">
              <div className="bg-card p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  Westdeutschland
                </p>
                <p className="mt-3 font-serif text-4xl text-foreground md:text-5xl">
                  50 %
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Zuschuss · Effektive Netto-Investition:
                </p>
                <p className="mt-1 font-serif text-2xl text-foreground">
                  1.750 €
                </p>
              </div>
              <div className="bg-card p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  Ostdeutschland
                </p>
                <p className="mt-3 font-serif text-4xl text-foreground md:text-5xl">
                  80 %
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Zuschuss · Effektive Netto-Investition:
                </p>
                <p className="mt-1 font-serif text-2xl text-foreground">
                  700 €
                </p>
              </div>
            </div>

            <ul className="mt-10 space-y-4 border-t border-border pt-8">
              {fundingBenefits.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-4 text-base leading-relaxed text-foreground"
                >
                  <span
                    aria-hidden
                    className="mt-3 inline-block h-px w-5 shrink-0 bg-accent"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <figure className="mt-12 border-l-2 border-accent pl-6">
              <blockquote className="font-serif text-xl font-normal italic leading-snug text-foreground md:text-2xl">
                „Die Frage ist nicht: Bekomme ich einen Zuschuss?{" "}
                Sondern: Wie viele Patienten und wie viel Umsatz verliere ich
                derzeit unbemerkt?"
              </blockquote>
              <figcaption className="mt-4 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Minka</span>{" "}
                — Gründerin Prophylaxe-Institut
              </figcaption>
            </figure>

            <div className="mt-10">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full border-foreground/15 px-7 text-sm font-medium tracking-wide hover:bg-primary hover:text-primary-foreground"
              >
                <Link href="/kontakt">
                  Förder-Eignung prüfen lassen →
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
