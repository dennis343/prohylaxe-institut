import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { PageHero } from "@/components/sections/page-hero"
import { Button } from "@/components/ui/button"
import { CTA } from "@/components/sections/cta"

export const metadata: Metadata = {
  title: "Minka — Ihre Mentorin",
  description:
    "Minka Mujezinovic begleitet seit über 150 Praxen nachhaltiges Wachstum. Persönliches Mentoring mit Fokus auf Prophylaxe, Team und Patientenkommunikation.",
  alternates: { canonical: "/mentor" },
}

const credentials = [
  "Zahnmedizinische Fachangestellte (ZFA)",
  "Zahnmedizinische Prophylaxeassistentin (ZMP)",
  "Praxismanagerin (IHK)",
  "Aufbau und langjährige Leitung hochprofitabler Prophylaxeabteilungen",
  "Referentin & iTOP-Teacher (Curaden)",
  "Spezialistin für Mundhygieneinstruktion, Schmelzregeneration & bioaktive Konzepte",
]

const principles = [
  {
    title: "Kontinuität statt Einmal-Impulse",
    text: "Nachhaltiger Erfolg entsteht durch regelmäßige Begleitung — genauso wie Prophylaxe nur dann wirkt, wenn sie kontinuierlich stattfindet.",
  },
  {
    title: "Umsetzung statt Theorie",
    text: "Wir setzen Strategien gemeinsam in Ihrer Praxis um — Schritt für Schritt, messbar und mit klaren Meilensteinen.",
  },
  {
    title: "Team als Erfolgsfaktor",
    text: "Ein starkes, mitdenkendes Team ist die Grundlage jeder erfolgreichen Praxis — wir entwickeln es zu echten Leistungsträgern.",
  },
  {
    title: "Prophylaxe mit Seele",
    text: "Beratung statt Waschanlage — Mundhygiene wird zu echtem Coaching und persönlichem Dialog. Das spüren Patienten und bleiben.",
  },
]

export default function MentorPage() {
  return (
    <main>
      <PageHero
        eyebrow="Ihre Mentorin"
        title={`Rusminka „Minka" Mujezinovic — persönlich, praxisnah, umsetzungsstark.`}
        description="Über 150 Praxen habe ich auf dem Weg zu nachhaltigem Wachstum begleitet. Ich zeige Ihnen nicht nur, wie es geht — ich setze mit Ihnen gemeinsam um."
        breadcrumbs={[{ href: "/mentor", label: "Mentorin" }]}
        actions={
          <>
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 text-base font-semibold tracking-wide"
            >
              <Link href="/kontakt">Erstgespräch mit Minka</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-foreground/15 px-7 text-sm font-medium tracking-wide hover:bg-primary hover:text-primary-foreground"
            >
              <Link href="/programme">Programme ansehen</Link>
            </Button>
          </>
        }
      />

      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="grid items-start gap-12 md:grid-cols-[5fr_7fr] md:gap-16">
            <div>
              <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-secondary">
                <Image
                  src="/minka/portrait.jpg"
                  alt="Minka Mujezinovic — Portrait"
                  fill
                  sizes="(max-width: 768px) 90vw, 40vw"
                  className="object-cover object-top"
                />
              </div>
              <p className="mt-5 font-serif text-sm italic text-muted-foreground md:text-base">
                Charmant, elegant, wertschätzend — auf Augenhöhe.
              </p>
            </div>

            <div>
              <div className="eyebrow">Meine Überzeugung</div>
              <h2 className="serif-display mt-6 text-3xl leading-[1.1] text-foreground md:text-4xl">
                Wenn wir Prophylaxe ernst nehmen,{" "}
                <em className="italic text-accent">verändert sich alles.</em>
              </h2>

              <div className="mt-8 space-y-5 text-base leading-relaxed text-foreground/85 md:text-lg">
                <p>
                  Ich weiß genau, wie es sich anfühlt, wenn die Praxis
                  stagniert und man das Gefühl hat, alles selbst machen zu
                  müssen. Ich habe aber auch gesehen, wie Praxen mit dem
                  richtigen Mentoring und bewährten Prinzipien aufblühen.
                </p>
                <p>
                  Prophylaxe ist mehr als eine Leistung — sie ist das Herz
                  einer wirtschaftlich gesunden Praxis und das stärkste
                  Bindungsinstrument. Umsatz, Team, Patientenerlebnis und
                  Ihre persönliche Freiheit verändern sich gleichzeitig.
                </p>
              </div>

              <ul className="mt-10 space-y-4 border-t border-border pt-8">
                {credentials.map((item) => (
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
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary/40 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="max-w-2xl">
            <div className="eyebrow">Haltung</div>
            <h2 className="serif-display mt-6 text-3xl leading-[1.1] text-foreground md:text-5xl">
              Wie ich{" "}
              <em className="italic text-accent">arbeite.</em>
            </h2>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2">
            {principles.map((p) => (
              <article
                key={p.title}
                className="flex flex-col bg-background p-8 md:p-10"
              >
                <h3 className="font-serif text-xl font-normal tracking-tight text-foreground md:text-2xl">
                  {p.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  {p.text}
                </p>
              </article>
            ))}
          </div>

          <figure className="mt-16 max-w-3xl border-l-2 border-accent pl-6 md:pl-8">
            <blockquote className="font-serif text-2xl font-normal italic leading-snug text-foreground md:text-3xl">
              „Genau so wie Prophylaxe nur wirkt, wenn sie regelmäßig
              stattfindet, entfalten auch unternehmerische Erfolgs­prinzipien
              nur dann ihre Wirkung, wenn man kontinuierlich dranbleibt."
            </blockquote>
            <figcaption className="mt-5 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Minka</span>{" "}
              — Ihre Mentorin
            </figcaption>
          </figure>
        </div>
      </section>

      <CTA />
    </main>
  )
}
