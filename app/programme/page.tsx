import type { Metadata } from "next"
import Link from "next/link"
import { PageHero } from "@/components/sections/page-hero"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, ArrowRight, Sparkles } from "lucide-react"
import { CTA } from "@/components/sections/cta"
import { Funding } from "@/components/sections/funding"

export const metadata: Metadata = {
  title: "Programme – Mentoring für Zahnarztpraxen",
  description:
    "Drei aufeinander aufbauende Mentoring-Stufen für nachhaltigen Praxiserfolg: Reinschnuppern, Umsetzer-Programm und Elite-Training.",
  alternates: { canonical: "/programme" },
}

const programs = [
  {
    number: "01",
    title: "Reinschnuppern",
    duration: "3 Monate",
    tagline: "Für erste Potenziale und strukturierten Start.",
    description:
      "Sie lernen das System kennen und identifizieren die größten Hebel in Ihrer Praxis. Ideal, wenn Sie zunächst prüfen möchten, ob unser Ansatz zu Ihrer Praxis passt.",
    outcomes: [
      "Potenzial-Analyse Ihrer aktuellen Prophylaxe",
      "Zielbild und klare Wachstumspfade",
      "Quick-Wins für Team und Abläufe",
      "Persönliches Mentoring-Onboarding",
    ],
    highlight: false,
  },
  {
    number: "02",
    title: "Umsetzer-Programm",
    duration: "6 Monate",
    tagline: "Systematischer Aufbau von Prophylaxe, Team und Abläufen.",
    description:
      "Hier entsteht die Struktur, die Ihre Praxis nachhaltig verändert. Gemeinsam etablieren wir das Prophylaxe-System und entwickeln Ihr Team zu echten Leistungsträgern.",
    outcomes: [
      "Prophylaxe-System Schritt für Schritt implementiert",
      "Patientenkommunikation & Beratungsleitfäden",
      "Teamentwicklung inkl. Rollen, Prozesse, Routinen",
      "Monatliches Mentoring & laufende Begleitung",
    ],
    highlight: false,
  },
  {
    number: "03",
    title: "Elite-Training",
    duration: "18 Monate",
    tagline: "Langfristige Etablierung als echte Renditequelle auf Autopilot.",
    description:
      "Strategische Teamentwicklung und Verankerung aller Prozesse. Ihr Praxiserfolg wird selbsttragend – wirtschaftlich gesund, mit starkem Team und maximaler Freiheit für Sie als Inhaberin oder Inhaber.",
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
    q: "Für welche Praxen eignet sich das Mentoring?",
    a: "Für Zahnärztinnen, Zahnärzte und Praxisinhaber, die Prophylaxe strategisch als Umsatz- und Bindungsfaktor etablieren möchten – unabhängig von der Praxisgröße.",
  },
  {
    q: "Wie läuft das Mentoring konkret ab?",
    a: "Nach einem Kennenlerngespräch legen wir gemeinsam Ziele und einen Fahrplan fest. Danach begleiten wir Sie in regelmäßigen Terminen, mit konkreten Umsetzungsschritten zwischen den Sessions.",
  },
  {
    q: "Kann ich zwischen den Stufen wechseln?",
    a: "Ja. Viele Praxen starten mit dem Reinschnupper-Programm und entscheiden sich anschließend für Umsetzer- oder Elite-Stufe, weil der ROI spürbar ist.",
  },
  {
    q: "Gibt es Fördermittel?",
    a: "Für Praxisberatung und begleitete Umsetzung sind häufig öffentliche Zuschüsse möglich. Unser Fördermittel-Concierge-Team übernimmt die komplette organisatorische Abwicklung.",
  },
]

export default function ProgrammePage() {
  return (
    <main>
      <PageHero
        eyebrow="Ihr Weg zum Erfolg"
        title="Mentoring-Stufen, passend für jede Praxisphase"
        description="Wir bieten ein Wachstumsmentoring für ausgewählte Dentalpraxen in drei aufeinander aufbauenden Stufen – individuell konfiguriert, mit persönlicher Begleitung."
        breadcrumbs={[{ href: "/programme", label: "Programme" }]}
        actions={
          <>
            <Button size="lg" asChild>
              <Link href="/kontakt#warteliste">Auf die Warteliste</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/kontakt">Erstgespräch anfragen</Link>
            </Button>
          </>
        }
      />

      <section className="bg-background py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
            {programs.map((p) => (
              <Card
                key={p.number}
                className={`relative overflow-hidden border-0 shadow-sm transition-all hover:shadow-lg ${
                  p.highlight
                    ? "bg-gradient-to-b from-primary/10 to-transparent ring-2 ring-primary/20"
                    : "bg-card"
                }`}
              >
                {p.highlight && (
                  <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    <Sparkles className="h-3.5 w-3.5" />
                    Empfohlen
                  </div>
                )}
                <div className="absolute left-4 top-4 text-6xl font-bold text-primary/10">
                  {p.number}
                </div>
                <CardHeader className="relative pt-20 pb-2">
                  <span className="inline-block w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {p.duration}
                  </span>
                  <CardTitle className="mt-4 text-2xl text-foreground">{p.title}</CardTitle>
                  <p className="mt-1 text-sm font-medium text-primary">{p.tagline}</p>
                </CardHeader>
                <CardContent className="relative">
                  <p className="text-muted-foreground">{p.description}</p>
                  <ul className="mt-6 space-y-2">
                    {p.outcomes.map((o) => (
                      <li key={o} className="flex items-start gap-2 text-sm">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span className="text-foreground">{o}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="mt-6 w-full" asChild>
                    <Link href="/kontakt">
                      Stufe anfragen
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <p className="mt-10 text-center text-muted-foreground">
            Individuelles Angebot – Konditionsgestaltung gemäß Ihren Zielen.
          </p>
        </div>
      </section>

      <Funding />

      <section className="bg-secondary/50 py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">FAQ</p>
            <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Häufig gestellte Fragen
            </h2>
          </div>
          <div className="mx-auto mt-12 max-w-3xl space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-xl border border-border bg-card p-6 shadow-sm"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-semibold text-foreground">
                  {faq.q}
                  <span className="text-primary transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-muted-foreground">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CTA />
    </main>
  )
}
