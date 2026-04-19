import type { Metadata } from "next"
import Link from "next/link"
import { PageHero } from "@/components/sections/page-hero"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Prophylaxe-Intensivtag — 1 Tag, 25 Praxen, volles Programm",
  description:
    "Einmal im Jahr: der Prophylaxe-Intensivtag mit Minka. Ein Tag, bewusst klein gehalten, volle Tiefe statt Massenveranstaltung. Termin wird rechtzeitig kommuniziert.",
  alternates: { canonical: "/prophylaxe-intensivtag" },
}

const siteUrl = "https://prophylaxe-institut.de"

const agenda = [
  {
    time: "09:00",
    title: "Ankommen & Warm-up",
    text: "Kaffee, kurze Vorstellrunde, Abgleich der Erwartungen. Kein Frontal-Opening, sondern Resonanzrunde.",
  },
  {
    time: "09:30",
    title: "Modul I — Prophylaxe als Profitcenter",
    text: "Leistungsstruktur, Preislogik, Zusatzleistungsquote. Rechnen live an echten Praxiszahlen.",
  },
  {
    time: "11:30",
    title: "Modul II — Recall-Architektur",
    text: "Einladungs-Rhythmik, Patienten-Wirkungs-Kommunikation®, Umgang mit Absagen.",
  },
  {
    time: "13:30",
    title: "Gemeinsames Mittagessen",
    text: "Bewusst lang: 90 Minuten. Hier entstehen die ehrlichen Gespräche zwischen Kolleginnen und Kollegen.",
  },
  {
    time: "15:00",
    title: "Modul III — Team-Entwicklung",
    text: "ZFA-to-ZMP-Pipeline, Rollenklärung, Gehaltsmodelle, Bindung. Interaktiv, nicht Frontal.",
  },
  {
    time: "17:00",
    title: "Sparrings-Runde mit Minka",
    text: "Offene Fragen aus den Praxen. Jede:r Teilnehmer:in kann eine konkrete Situation einbringen.",
  },
  {
    time: "18:30",
    title: "Ausklang",
    text: "Getränk, Gespräch, informeller Austausch — nicht verpflichtend, aber meistens bleibt man.",
  },
]

const includes = [
  "Arbeitsmappe mit Vorlagen und Canvas",
  "Persönlicher 30-Min-Follow-up-Call innerhalb 6 Wochen",
  "Zugang zur privaten Teilnehmer:innen-Runde (geschützt)",
  "Tagesverpflegung inkl. Mittagessen und Getränken",
  "Fortbildungspunkte (werden beantragt, Bestätigung folgt)",
]

const faqs = [
  {
    q: "Wann und wo findet der nächste Intensivtag statt?",
    a: "Wir kommunizieren Termin und Ort rechtzeitig per Newsletter und direkter Einladung. Wenn Sie sich für eine Platzreservierung interessieren, sprechen Sie uns an — die Teilnehmerzahl ist bewusst auf 25 begrenzt.",
  },
  {
    q: "Was kostet die Teilnahme?",
    a: "Die Teilnahme kostet 1.450 € netto pro Person. Ermäßigte Preise für Teams (ab 2 Personen einer Praxis) auf Anfrage.",
  },
  {
    q: "Für wen ist der Tag gedacht?",
    a: "Inhaberinnen und Inhaber von Zahnarztpraxen, erfahrene Praxismanager:innen und Prophylaxe-Team-Leads. Der Tag ist bewusst nicht ZFA-Einstiegsniveau — wir setzen Grundwissen voraus und gehen in die Tiefe.",
  },
  {
    q: "Wird der Tag gestreamt oder aufgezeichnet?",
    a: "Nein. Der Tag lebt von der Vertraulichkeit und dem Austausch vor Ort. Einzelne Module können später in Online-Formaten vertieft werden.",
  },
]

const eventJsonLd = {
  "@context": "https://schema.org",
  "@type": "Event",
  name: "Prophylaxe-Intensivtag mit Minka",
  description:
    "Einmal jährlich: intensiver Tag mit 25 Praxen — Profitcenter, Recall, Team. Bewusst klein gehalten.",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  organizer: { "@id": `${siteUrl}#organization` },
  performer: { "@id": `${siteUrl}#minka` },
  location: {
    "@type": "Place",
    name: "Veranstaltungsort wird rechtzeitig kommuniziert",
    address: { "@type": "PostalAddress", addressCountry: "DE" },
  },
  offers: {
    "@type": "Offer",
    price: "1450",
    priceCurrency: "EUR",
    availability: "https://schema.org/PreOrder",
    url: `${siteUrl}/prophylaxe-intensivtag`,
  },
  url: `${siteUrl}/prophylaxe-intensivtag`,
}

export default function ProphylaxeIntensivtagPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
      <PageHero
        eyebrow="Prophylaxe-Intensivtag"
        title="Ein Tag. 25 Praxen. Volle Tiefe statt Massenveranstaltung."
        description="Einmal im Jahr versammeln wir eine kleine Runde inhabergeführter Praxen für einen konzentrierten Tag: Profitcenter, Recall, Team. Keine Bühne — ein Raum, in dem ernsthaft gearbeitet wird."
        breadcrumbs={[
          { href: "/prophylaxe-intensivtag", label: "Intensivtag" },
        ]}
        actions={
          <>
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 text-base font-semibold tracking-wide"
            >
              <Link href="/gespraech">Platz reservieren — 15-Min-Call</Link>
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

      <section className="bg-background py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-5 md:px-8">
          <div className="eyebrow">Tages-Ablauf</div>
          <h2 className="serif-display mt-6 text-3xl leading-[1.1] text-foreground sm:text-4xl md:text-5xl">
            Rhythmus des Tages —{" "}
            <em className="italic text-accent">bewusst ruhig getaktet.</em>
          </h2>

          <ol className="mt-12 space-y-5 border-y border-border py-8">
            {agenda.map((a) => (
              <li
                key={a.time}
                className="grid gap-3 sm:grid-cols-[auto_1fr] sm:gap-8"
              >
                <div className="font-serif text-lg italic text-accent sm:w-24 sm:shrink-0">
                  {a.time}
                </div>
                <div>
                  <h3 className="font-serif text-lg text-foreground sm:text-xl">
                    {a.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
                    {a.text}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-secondary/40 py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-5 md:px-8 md:grid md:grid-cols-[5fr_7fr] md:gap-16">
          <div>
            <div className="eyebrow">Im Preis enthalten</div>
            <h2 className="serif-display mt-6 text-2xl leading-[1.1] text-foreground sm:text-3xl">
              Was Sie{" "}
              <em className="italic text-accent">mitnehmen.</em>
            </h2>
          </div>
          <ul className="mt-8 space-y-4 md:mt-0">
            {includes.map((item) => (
              <li
                key={item}
                className="flex items-start gap-4 text-base leading-relaxed text-foreground"
              >
                <span aria-hidden className="mt-3 inline-block h-px w-5 shrink-0 bg-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-background py-14 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-5 md:px-8">
          <div className="eyebrow">Häufige Fragen</div>
          <h2 className="serif-display mt-6 text-2xl leading-[1.1] text-foreground sm:text-3xl">
            Was Teilnehmer:innen vorher{" "}
            <em className="italic text-accent">wissen wollen.</em>
          </h2>

          <div className="mt-8 divide-y divide-border border-y border-border">
            {faqs.map((f) => (
              <details key={f.q} className="group py-6 marker:hidden sm:py-7">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 text-left">
                  <span className="font-serif text-lg leading-snug text-foreground sm:text-xl">
                    {f.q}
                  </span>
                  <span
                    aria-hidden
                    className="mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-accent transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
                  {f.a}
                </p>
              </details>
            ))}
          </div>

          <div className="mt-12 rounded-lg border border-accent/30 bg-accent/5 p-6 sm:p-8">
            <p className="font-serif text-xl italic text-foreground sm:text-2xl">
              Interesse an einem Platz?
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Wir arbeiten mit einer Warteliste, weil die Runde bewusst klein
              bleibt. Kurzes Kennenlernen per Call — dann wissen wir beide, ob
              der Tag zu Ihnen passt.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-6 rounded-full px-7 text-sm font-semibold tracking-wide"
            >
              <Link href="/gespraech">15-Min-Call wählen</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
