import type { Metadata } from "next"
import Link from "next/link"
import { PageHero } from "@/components/sections/page-hero"
import { Button } from "@/components/ui/button"
import { CTA } from "@/components/sections/cta"
import { Funding } from "@/components/sections/funding"

export const metadata: Metadata = {
  title: "Programme — Beratung & Mentoring",
  description:
    "Zwei förderfähige Einstiegs-Beratungen und das Praxis-Mentoring in drei Stufen. Strukturiert, messbar und mit persönlicher Begleitung.",
  alternates: { canonical: "/programme" },
}

const consulting = [
  {
    variant: "Variante 1",
    title: "Strategische Prophylaxe-Integration",
    tagline:
      "Konzeption für ein zusätzliches, kalkulierbares und steuerbares Profitcenter.",
    points: [
      "Analyse der aktuellen Umsatz- und Leistungsstruktur",
      "Bewertung bestehender Prophylaxe- und Zusatzleistungen",
      "Strukturiertes Profitcenter-Modell mit Steuerungs-KPIs",
      "Preismodelle, Abo-Strategien & Wirtschaftlichkeitsrechnung",
      "Konkreter Umsetzungs- und Einführungsfahrplan",
    ],
    result:
      "Sie wissen, wo Sie heute stehen — und welcher Pfad in Ihrer Praxis am schnellsten Wirkung zeigt.",
  },
  {
    variant: "Variante 2",
    title: "Kommunikations- und Bindungsoptimierung",
    tagline:
      "Mehr freiwillige Termin­wahrnehmung. Höhere Weiterempfehlung. Stärkere Teamwirkung.",
    points: [
      "Patientenweg vom Erstkontakt bis zum Wiedertermin",
      "Patienten-Wirkungs-Kommunikation® & Gesprächsleitfäden",
      "Rollenklärung im Team & Recruiting-Wirkung",
      "Produktive Fehlerkultur und messbare Zufriedenheit",
      "Kommunikations-Coaching für Behandlung und Empfang",
    ],
    result:
      "Patienten kommen freiwillig wieder. Das Team versteht seine Rolle. Empfehlungen entstehen ohne Anlass.",
  },
]

const mentoring = [
  {
    number: "01",
    name: "Reinschnuppern",
    duration: "3 Monate",
    tagline: "Erste Potenziale sichtbar, strukturierter Start.",
    description:
      "Sie lernen das System kennen und identifizieren die größten Hebel in Ihrer Praxis. Ideal, wenn Sie zunächst prüfen möchten, ob unser Ansatz zu Ihrer Praxis passt.",
    outcomes: [
      "Potenzial-Analyse Ihrer aktuellen Prophylaxe",
      "Zielbild und klare Wachstumspfade",
      "Quick-Wins für Team und Abläufe",
      "Persönliches Mentoring-Onboarding",
    ],
  },
  {
    number: "02",
    name: "Umsetzer-Programm",
    duration: "6 Monate",
    tagline: "Systematischer Aufbau von Prophylaxe, Team & Abläufen.",
    description:
      "Hier entsteht die Struktur, die Ihre Praxis nachhaltig verändert. Gemeinsam etablieren wir das Prophylaxe-System und entwickeln Ihr Team zu echten Leistungsträgern.",
    outcomes: [
      "Prophylaxe-System Schritt für Schritt implementiert",
      "Patientenkommunikation & Beratungsleitfäden",
      "Teamentwicklung: Rollen, Prozesse, Routinen",
      "Monatliches Mentoring & laufende Begleitung",
    ],
  },
  {
    number: "03",
    name: "Elite-Training",
    duration: "18 Monate",
    tagline: "Selbsttragende Renditesäule auf Autopilot.",
    description:
      "Strategische Teamentwicklung und Verankerung aller Prozesse. Ihr Praxiserfolg wird selbsttragend — wirtschaftlich gesund, mit starkem Team und maximaler Freiheit für Sie als Inhaberin oder Inhaber.",
    outcomes: [
      "Prophylaxe als nachhaltiger Renditetreiber etabliert",
      "Selbststeuerndes, mitdenkendes Team",
      "Automatisierte Wiederholungstermine & Bindung",
      "Quartalsweise Strategie- und Review-Termine",
      "Voller Zugriff auf Mentoring-Ressourcen & Events",
    ],
    highlight: true,
  },
]

const faqs = [
  {
    q: "Für welche Praxen eignen sich Beratung und Mentoring?",
    a: "Für Zahnärztinnen, Zahnärzte und Praxisinhaber, die Prophylaxe strategisch als Umsatz- und Bindungsfaktor etablieren möchten — unabhängig von der Praxisgröße.",
  },
  {
    q: "Wo liegt der Unterschied zwischen Beratung und Mentoring?",
    a: "Die Beratungs­bausteine sind klar abgegrenzte Projekte mit definierter Laufzeit (förderfähig). Das Mentoring ist eine längere, vertiefte Begleitung — mit direktem Sparring und kontinuierlicher Umsetzungsarbeit.",
  },
  {
    q: "Kann ich beide Beratungs­varianten kombinieren?",
    a: "Ja. Beide Bausteine sind unabhängig nutzbar — und im selben Förderjahr kombinierbar (bis zu zwei geförderte Beratungen pro Jahr). Unser Fördermittel-Concierge-Team übernimmt die Abwicklung.",
  },
  {
    q: "Wie läuft das Mentoring konkret ab?",
    a: "Nach einem Kennenlerngespräch legen wir gemeinsam Ziele und einen Fahrplan fest. Danach begleiten wir Sie in regelmäßigen Terminen, mit konkreten Umsetzungsschritten zwischen den Sessions.",
  },
  {
    q: "Gibt es Fördermittel für die Beratung?",
    a: "Ja. Praxen aus West-Bundesländern erhalten in der Regel 50 % Förderung (Netto-Eigenanteil 1.750 €), Praxen aus Ost-Bundesländern bis zu 80 % (Netto-Eigenanteil 700 €). Voraussetzungen prüfen wir kostenfrei.",
  },
]

export default function ProgrammePage() {
  return (
    <main>
      <PageHero
        eyebrow="Beratung & Mentoring"
        title="Zwei Einstiegs-Beratungen — und ein Mentoring für die Tiefe."
        description="Sie starten mit einem konkreten, geförderten Beratungsbaustein. Wer schneller, sicherer und mit weniger Umwegen umsetzen möchte, geht direkt ins Mentoring."
        breadcrumbs={[{ href: "/programme", label: "Programme" }]}
        actions={
          <>
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 text-base font-semibold tracking-wide"
            >
              <Link href="/kontakt">Erstgespräch anfragen</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-foreground/15 px-7 text-sm font-medium tracking-wide hover:bg-primary hover:text-primary-foreground"
            >
              <Link href="/kontakt#warteliste">Auf die Warteliste</Link>
            </Button>
          </>
        }
      />

      {/* Einstieg: Beratungs-Bausteine */}
      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="flex items-center gap-4">
            <span className="font-serif text-lg italic text-accent">
              Einstieg
            </span>
            <span className="h-px flex-1 bg-border" />
            <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Förderfähig 50–80 %
            </span>
          </div>

          <div className="mt-10 max-w-2xl">
            <h2 className="serif-display text-3xl leading-[1.1] text-foreground md:text-4xl">
              Zwei Beratungs­varianten —{" "}
              <em className="italic text-accent">jeweils 3.500 €</em>
            </h2>
            <p className="lead mt-6">
              Klar abgegrenzt, mit definiertem Ergebnis und kompletter
              Förder­abwicklung über unseren Concierge-Service.
            </p>
          </div>

          <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2">
            {consulting.map((c) => (
              <article
                key={c.variant}
                className="flex flex-col bg-card p-8 md:p-10"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  {c.variant}
                </span>
                <h3 className="mt-4 font-serif text-2xl font-normal tracking-tight text-foreground md:text-3xl">
                  {c.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                  {c.tagline}
                </p>

                <ul className="mt-8 space-y-4 border-t border-border pt-6">
                  {c.points.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-3 text-[15px] leading-relaxed text-foreground"
                    >
                      <span
                        aria-hidden
                        className="mt-2.5 inline-block h-px w-4 shrink-0 bg-accent"
                      />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 border-t border-border pt-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                    Ergebnis
                  </p>
                  <p className="mt-3 font-serif text-lg italic leading-snug text-foreground">
                    {c.result}
                  </p>
                </div>

                <div className="mt-10 flex items-end justify-between gap-4 border-t border-border pt-6">
                  <div>
                    <p className="font-serif text-2xl text-foreground md:text-3xl">
                      3.500&nbsp;€
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      pro Beratung · Förderung möglich
                    </p>
                  </div>
                  <Link
                    href="/kontakt"
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

          <div className="mt-10 grid gap-6 md:grid-cols-[2fr_1fr] md:items-end">
            <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
              Beide Bausteine sind unabhängig nutzbar — und im selben
              Förder­jahr kombinierbar (bis zu zwei geförderte Beratungen
              pro Jahr). Förder­quote 50&nbsp;% (West) bzw. 80&nbsp;% (Ost).
            </p>
            <div className="md:text-right">
              <Link
                href="/kontakt"
                className="inline-flex items-center gap-2 font-serif text-lg italic text-foreground"
              >
                <span className="border-b border-accent/60 pb-0.5">
                  Förder-Eignung prüfen
                </span>
                <span aria-hidden className="text-accent">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Funding />

      {/* Elite: Mentoring-Stufen */}
      <section className="bg-secondary/40 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="flex items-center gap-4">
            <span className="font-serif text-lg italic text-accent">
              Elite
            </span>
            <span className="h-px flex-1 bg-border" />
            <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Praxis-Mentoring in drei Stufen
            </span>
          </div>

          <div className="mt-10 max-w-2xl">
            <h2 className="serif-display text-3xl leading-[1.1] text-foreground md:text-5xl">
              Mentoring —{" "}
              <em className="italic text-accent">drei aufeinander aufbauende Stufen.</em>
            </h2>
            <p className="lead mt-6">
              Direktes Sparring, engere Begleitung und konsequente Umsetzung.
              Sie wählen die Tiefe, die zu Ihrer Praxisphase passt.
            </p>
          </div>

          <div className="mt-12 space-y-5">
            {mentoring.map((m) => (
              <article
                key={m.number}
                className={
                  m.highlight
                    ? "relative overflow-hidden rounded-lg bg-primary p-8 text-primary-foreground md:p-12"
                    : "relative overflow-hidden rounded-lg border border-border bg-background p-8 md:p-12"
                }
              >
                {m.highlight && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-32 -top-20 h-[440px] w-[440px] rounded-full bg-[radial-gradient(closest-side,var(--accent),transparent_70%)] opacity-15 blur-3xl"
                  />
                )}
                <div className="relative grid gap-10 md:grid-cols-[5fr_7fr] md:gap-16">
                  <div>
                    <div className="flex items-baseline gap-4">
                      <span
                        className={
                          m.highlight
                            ? "font-serif text-5xl text-accent md:text-6xl"
                            : "font-serif text-5xl text-accent md:text-6xl"
                        }
                      >
                        {m.number}
                      </span>
                      <span
                        className={
                          m.highlight
                            ? "text-xs font-semibold uppercase tracking-[0.18em] text-accent"
                            : "text-xs font-semibold uppercase tracking-[0.18em] text-accent"
                        }
                      >
                        {m.duration}
                      </span>
                    </div>
                    <h3
                      className={
                        m.highlight
                          ? "mt-6 font-serif text-3xl font-normal leading-tight text-primary-foreground md:text-4xl"
                          : "mt-6 font-serif text-3xl font-normal leading-tight text-foreground md:text-4xl"
                      }
                    >
                      {m.name}
                    </h3>
                    <p
                      className={
                        m.highlight
                          ? "mt-4 font-serif text-lg italic text-primary-foreground/85"
                          : "mt-4 font-serif text-lg italic text-foreground/80"
                      }
                    >
                      {m.tagline}
                    </p>
                    {m.highlight && (
                      <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-accent/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                        Empfohlen
                      </span>
                    )}
                  </div>

                  <div>
                    <p
                      className={
                        m.highlight
                          ? "text-base leading-relaxed text-primary-foreground/85 md:text-lg"
                          : "text-base leading-relaxed text-foreground/85 md:text-lg"
                      }
                    >
                      {m.description}
                    </p>
                    <ul
                      className={
                        m.highlight
                          ? "mt-8 space-y-4 border-t border-primary-foreground/20 pt-6"
                          : "mt-8 space-y-4 border-t border-border pt-6"
                      }
                    >
                      {m.outcomes.map((o) => (
                        <li
                          key={o}
                          className={
                            m.highlight
                              ? "flex items-start gap-3 text-[15px] leading-relaxed text-primary-foreground"
                              : "flex items-start gap-3 text-[15px] leading-relaxed text-foreground"
                          }
                        >
                          <span
                            aria-hidden
                            className="mt-2.5 inline-block h-px w-4 shrink-0 bg-accent"
                          />
                          <span>{o}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8">
                      <Button
                        asChild
                        size="lg"
                        className={
                          m.highlight
                            ? "rounded-full bg-accent px-8 text-sm font-semibold tracking-wide text-accent-foreground hover:bg-accent/90"
                            : "rounded-full px-8 text-sm font-semibold tracking-wide"
                        }
                      >
                        <Link href="/kontakt">Stufe anfragen</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-12 max-w-2xl font-serif text-xl italic leading-snug text-foreground md:text-2xl">
            „Nicht notwendig. Meist sinnvoll. Immer lohnenswert."
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <div className="max-w-2xl">
            <div className="eyebrow">FAQ</div>
            <h2 className="serif-display mt-6 text-3xl leading-[1.1] text-foreground md:text-4xl">
              Häufige Fragen.
            </h2>
          </div>

          <div className="mt-12 divide-y divide-border border-y border-border">
            {faqs.map((faq) => (
              <details key={faq.q} className="group py-6">
                <summary className="flex cursor-pointer items-start justify-between gap-6 font-serif text-lg font-normal text-foreground md:text-xl">
                  {faq.q}
                  <span
                    aria-hidden
                    className="mt-2 text-accent transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </main>
  )
}
