import type { Metadata } from "next"
import { PageHero } from "@/components/sections/page-hero"
import { FoerderCheckForm } from "@/components/foerder-check-form"
import { CTA } from "@/components/sections/cta"

export const metadata: Metadata = {
  title: "Förder-Quickcheck — BAFA-Eignung in 90 Sekunden",
  description:
    "Prüfen Sie in fünf kurzen Schritten, ob Ihre Zahnarztpraxis BAFA-förderfähig ist. Persönliche Einschätzung per E-Mail — ohne Verpflichtung.",
  alternates: { canonical: "/foerder-check" },
}

const pillars = [
  {
    title: "KMU-Kriterien",
    body: "Weniger als 250 Mitarbeitende, Jahresumsatz bis 50 Mio. € oder Bilanzsumme bis 43 Mio. €. Die meisten Zahnarztpraxen erfüllen das.",
  },
  {
    title: "Regionaler Fördersatz",
    body: "50 % in Westdeutschland, bis zu 80 % in Ostdeutschland und Berlin. Bemessungsgrundlage: Beratungshonorar bis 3.500 €.",
  },
  {
    title: "Concierge-Antrag",
    body: "Wir übernehmen die Antragstellung bei der BAFA und stellen den Verwendungsnachweis. Sie reichen nur unterschriebene Vorlagen ein.",
  },
]

export default function FoerderCheckPage() {
  return (
    <main>
      <PageHero
        eyebrow="Förder-Quickcheck"
        title="In 90 Sekunden wissen, ob Ihre Beratung gefördert wird."
        description="Fünf kurze Fragen, eine persönliche Ersteinschätzung und ein konkreter nächster Schritt. Kein Download-Zwang, keine automatische Newsletter-Anmeldung."
        breadcrumbs={[{ href: "/foerder-check", label: "Förder-Quickcheck" }]}
      />

      <section className="bg-background pb-16 sm:pb-20 md:pb-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-5 md:px-8">
          <div className="grid gap-10 md:grid-cols-[7fr_5fr] md:gap-14">
            <FoerderCheckForm />

            <aside className="space-y-8">
              <div className="rounded-lg border border-border bg-secondary/40 p-6 sm:p-7">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                  So prüfen wir
                </p>
                <ul className="mt-5 space-y-5">
                  {pillars.map((p) => (
                    <li key={p.title} className="border-l-2 border-accent/40 pl-4">
                      <p className="font-serif text-lg italic leading-snug text-foreground">
                        {p.title}
                      </p>
                      <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                        {p.body}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border border-accent/25 bg-accent/5 p-6 sm:p-7">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                  Transparenz-Hinweis
                </p>
                <p className="mt-4 font-serif text-lg italic leading-snug text-foreground">
                  Die Einschätzung ersetzt keinen BAFA-Bescheid.
                </p>
                <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
                  Die finale Förderzusage erteilt ausschließlich das Bundes­amt für Wirtschaft und
                  Ausfuhrkontrolle (BAFA). Unser Quickcheck zeigt Ihnen jedoch zuverlässig, ob ein
                  Antrag überhaupt sinnvoll ist — bevor Sie Zeit investieren.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <CTA />
    </main>
  )
}
