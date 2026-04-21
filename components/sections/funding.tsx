import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { SectionLabel } from "@/components/ui/section-label"

const fundingBenefits = [
  "Vom Bund anerkannte Beratungseinrichtung",
  "Cash-Back nach Umsetzung der Beratung",
  "Concierge-Service: Wir übernehmen die komplette Antragstellung",
]

const eligibility = [
  "Zahnarztpraxen als KMU (< 250 Mitarbeitende, Umsatz bis 50 Mio. €)",
  "Praxen mit Wachstums- oder Strukturthemen — nicht nur in Krise",
  "Jungunternehmen (< 2 Jahre) mit eigener Förderkulisse",
  "Bestandspraxen, die Prozesse und Prophylaxe professionalisieren",
]

export function Funding() {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-12 md:grid-cols-[5fr_7fr] md:gap-16">
          <div>
            <SectionLabel numeral="V" label="Das Safety-Net" />
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

            <div className="mt-10 flex items-center gap-5 rounded-md border border-border bg-card p-5">
              <div className="relative h-14 w-24 shrink-0 text-foreground/80">
                <Image
                  src="/bafa/bafa-logo-placeholder.svg"
                  alt="BAFA — Bundesamt für Wirtschaft und Ausfuhrkontrolle"
                  fill
                  sizes="96px"
                  className="object-contain object-left"
                />
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/60">
                  Fördermittelgeber
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                  Bundesamt für Wirtschaft und Ausfuhr­kontrolle — Programm{" "}
                  <em className="not-italic text-foreground">Förderung unter­nehmerischen Know-hows</em>.
                </p>
              </div>
            </div>

            <div className="mt-10 border-t border-border pt-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/60">
                Warum es diese Förderung gibt
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                Der Bund unterstützt kleine und mittlere Unternehmen dabei, sich strategisch
                weiter­zuentwickeln — und honoriert Beratung, die Substanz schafft statt
                Powerpoint. Für Zahnarztpraxen heißt das: ein Teil der Investition in
                Strukturen, Prozesse und Prophylaxe fließt direkt zurück.
              </p>
            </div>

            <div className="mt-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/60">
                Wer die Förderung nutzen sollte
              </p>
              <ul className="mt-4 space-y-3">
                {eligibility.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[14px] leading-relaxed text-foreground"
                  >
                    <span aria-hidden className="mt-[0.55em] inline-block h-px w-4 shrink-0 bg-foreground/30" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2">
              <div className="bg-card p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/55">
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
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-foreground/55">
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
                    className="mt-3 inline-block h-px w-5 shrink-0 bg-foreground/30"
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

            <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Button
                asChild
                size="lg"
                className="rounded-full px-7 text-sm font-semibold tracking-wide"
              >
                <Link href="/foerder-check">
                  Förder-Quickcheck starten →
                </Link>
              </Button>
              <Link
                href="/kontakt"
                className="text-sm font-medium text-foreground"
              >
                <span className="border-b border-accent/60 pb-0.5">
                  Lieber persönlich fragen
                </span>
              </Link>
            </div>
            <p className="mt-4 text-[12px] uppercase tracking-[0.18em] text-muted-foreground">
              90 Sekunden · ohne Verpflichtung · Einschätzung per E-Mail
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
