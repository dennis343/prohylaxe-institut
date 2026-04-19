import type { Metadata } from "next"
import Link from "next/link"
import { PageHero } from "@/components/sections/page-hero"
import { TidyCalEmbed } from "@/components/tidycal-embed"

export const metadata: Metadata = {
  title: "15-Minuten-Kennenlernen buchen",
  description:
    "Unverbindlicher Schnellstart-Call mit dem Prophylaxe-Institut. Wählen Sie direkt einen Termin — wir klären Potenzial, Passung und Förderungsrahmen in 15 Minuten.",
  alternates: { canonical: "/gespraech" },
}

const bulletsBefore = [
  "Ihre aktuelle Prophylaxe-Situation in 2 Sätzen",
  "Ziel in 6–12 Monaten",
  "Größe des Teams und bisherige Strukturen",
]

const bulletsCall = [
  "Ehrliche Einschätzung: Passt unser Ansatz?",
  "Welche Förderung in Ihrem Bundesland realistisch ist",
  "Nächste Schritte — ohne Verkaufsdruck",
]

export default function GespraechPage() {
  return (
    <main>
      <PageHero
        eyebrow="15-Minuten-Schnellstart"
        title="Kurz sprechen — ohne Umwege."
        description="Wählen Sie direkt einen freien Slot. Wir hören zu, klären Passung und sagen ehrlich, ob wir Ihnen helfen können — oder jemanden kennen, der besser passt."
        breadcrumbs={[{ href: "/gespraech", label: "Gespräch" }]}
      />

      <section className="bg-background pb-16 md:pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-5 md:px-8">
          <div className="grid gap-12 lg:grid-cols-[7fr_5fr] lg:gap-16">
            <div className="order-2 lg:order-1">
              <div className="overflow-hidden rounded-lg border border-border bg-card">
                <div className="border-b border-border px-5 py-4 sm:px-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                    Terminauswahl
                  </p>
                  <p className="mt-1 font-serif text-lg italic text-foreground">
                    Wählen Sie Datum &amp; Uhrzeit
                  </p>
                </div>
                <div className="min-h-[520px] px-2 py-4 sm:px-4 sm:py-6">
                  <TidyCalEmbed path="team/prophylaxe/schnellstart" />
                </div>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                Falls der Kalender nicht lädt:{" "}
                <a
                  href="https://tidycal.com/team/prophylaxe/schnellstart"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline-offset-4 hover:underline"
                >
                  direkt auf tidycal.com öffnen
                </a>
                .
              </p>
            </div>

            <aside className="order-1 lg:order-2">
              <div className="border-t border-border pt-10">
                <div className="eyebrow">So bereiten Sie sich vor</div>
                <ul className="mt-6 space-y-4">
                  {bulletsBefore.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-4 text-base leading-relaxed text-foreground"
                    >
                      <span
                        aria-hidden
                        className="mt-3 inline-block h-px w-5 shrink-0 bg-accent"
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-12 border-t border-border pt-10">
                <div className="eyebrow">Was Sie aus dem Gespräch mitnehmen</div>
                <ul className="mt-6 space-y-4">
                  {bulletsCall.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-4 text-base leading-relaxed text-foreground"
                    >
                      <span
                        aria-hidden
                        className="mt-3 inline-block h-px w-5 shrink-0 bg-accent"
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-12 border-l-2 border-accent bg-secondary/40 px-5 py-6 sm:px-6">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                  Lieber schreiben?
                </p>
                <p className="mt-3 text-sm leading-relaxed text-foreground">
                  Sie können auch{" "}
                  <Link href="/kontakt" className="text-accent underline-offset-4 hover:underline">
                    schriftlich anfragen
                  </Link>
                  . Wir antworten in 1–2 Werktagen persönlich.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}
