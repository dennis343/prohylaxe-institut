import Link from "next/link"
import { Button } from "@/components/ui/button"

const fundingBenefits = [
  "Unterstützung bei der Beantragung von Zuschüssen",
  "Komplette organisatorische Abwicklung",
  "Wartelisten-Teilnehmer haben einen zusätzlichen Vorteil",
]

export function Funding() {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-12 md:grid-cols-[5fr_7fr] md:gap-16">
          <div>
            <div className="eyebrow">Förderung möglich</div>
            <h2 className="serif-display mt-6 text-3xl leading-[1.1] text-foreground md:text-5xl">
              Wir kümmern uns um die{" "}
              <em className="italic text-accent">gesamte Abwicklung.</em>
            </h2>
          </div>

          <div>
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              Für Praxisberatung und begleitete Umsetzung sind häufig öffentliche
              Zuschüsse möglich. Das Beste daran: Wir übernehmen die komplette
              organisatorische Abwicklung für interessierte Praxen durch unser
              Fördermittel-Concierge-Team.
            </p>

            <ul className="mt-10 space-y-5 border-t border-border pt-8">
              {fundingBenefits.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-4 text-[15px] text-foreground"
                >
                  <span
                    aria-hidden
                    className="mt-2.5 inline-block h-px w-5 shrink-0 bg-accent"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <figure className="mt-12 border-l-2 border-accent pl-6">
              <blockquote className="font-serif text-xl font-light italic leading-snug text-foreground md:text-2xl">
                &bdquo;Die Unterstützung bei den Förderanträgen war Gold wert.
                Ich hätte das alleine nie geschafft!&ldquo;
              </blockquote>
              <figcaption className="mt-4 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Dr. Anna Schmidt</span>{" "}
                — Zahnärztin aus München
              </figcaption>
            </figure>

            <div className="mt-10">
              <Button
                asChild
                variant="outline"
                className="rounded-full border-foreground/15 px-6 text-sm tracking-wide hover:bg-primary hover:text-primary-foreground"
              >
                <Link href="/kontakt">
                  Mehr zum Fördermittel-Concierge →
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
