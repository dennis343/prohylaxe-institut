import type { Metadata } from "next"
import { PageHero } from "@/components/sections/page-hero"
import { LeadMagnetForm } from "@/components/lead-magnet-form"

export const metadata: Metadata = {
  title: "Prophylaxe-Potenzial-Checkliste — kostenloser Download",
  description:
    "12 Fragen zur Standortbestimmung Ihrer Prophylaxe-Abteilung: Struktur, Preislogik, Recall-System, Team. PDF direkt per E-Mail.",
  alternates: { canonical: "/ressourcen/prophylaxe-checkliste" },
}

const chapters = [
  {
    label: "Kapitel I",
    title: "Angebotsstruktur",
    text: "Drei Ebenen oder alles in einem Topf? 4 Fragen zur Klärung Ihres Leistungsspiegels — inkl. typischer Preisspannen nach DACH-Region.",
  },
  {
    label: "Kapitel II",
    title: "Recall-Architektur",
    text: "Wann wird eingeladen, wer spricht an, welche Worte verwenden wir? 3 Fragen, die den Unterschied zwischen 40 % und 75 % Recall-Treue machen.",
  },
  {
    label: "Kapitel III",
    title: "Team & Qualifizierung",
    text: "Rollenbild, Entwicklungspfad, Gehaltsmodell — 3 Fragen, um zu prüfen, ob Ihre ZFA-to-ZMP-Pipeline trägt.",
  },
  {
    label: "Kapitel IV",
    title: "Wirtschaftlichkeit",
    text: "Deckungsbeitrag pro Stunde, Zusatzleistungsquote, Umsatzanteil. 2 Fragen für die ehrliche Standortbestimmung.",
  },
]

export default function LeadMagnetPage() {
  return (
    <main>
      <PageHero
        eyebrow="Kostenlose Ressource"
        title="Prophylaxe-Potenzial-Checkliste — in 12 Fragen zur Standortbestimmung."
        description="Struktur, Preis, Recall, Team. Die Checkliste bündelt 150+ Praxisbegleitungen in einem 20-minütigen Self-Check. Direkt als PDF per E-Mail."
        breadcrumbs={[
          { href: "/ressourcen/prophylaxe-checkliste", label: "Checkliste" },
        ]}
      />

      <section className="bg-background pb-16 md:pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-5 md:px-8">
          <div className="grid gap-12 lg:grid-cols-[6fr_6fr] lg:gap-16">
            <div>
              <div className="eyebrow">Was drin steht</div>
              <div className="mt-6 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2">
                {chapters.map((c) => (
                  <article key={c.title} className="flex flex-col bg-background p-6 sm:p-7">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                      {c.label}
                    </p>
                    <h2 className="mt-3 font-serif text-lg leading-snug text-foreground sm:text-xl">
                      {c.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {c.text}
                    </p>
                  </article>
                ))}
              </div>

              <div className="mt-10 border-l-2 border-accent bg-secondary/40 p-6 sm:p-7">
                <p className="font-serif text-lg italic text-foreground sm:text-xl">
                  „Wer die 12 Fragen ehrlich beantwortet, hat in der Regel 2–3
                  konkrete Ansatzpunkte auf dem Papier — ohne dass wir schon
                  miteinander gesprochen hätten."
                </p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  Minka Mujezinovic
                </p>
              </div>

              <ul className="mt-8 space-y-3 text-sm leading-relaxed text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span aria-hidden className="mt-2 inline-block h-px w-5 shrink-0 bg-accent" />
                  <span>PDF, 6 Seiten, sofort per E-Mail</span>
                </li>
                <li className="flex items-start gap-3">
                  <span aria-hidden className="mt-2 inline-block h-px w-5 shrink-0 bg-accent" />
                  <span>Keine Newsletter-Pflicht — ein einmaliger Versand</span>
                </li>
                <li className="flex items-start gap-3">
                  <span aria-hidden className="mt-2 inline-block h-px w-5 shrink-0 bg-accent" />
                  <span>Selbst ausfüllen oder im Team — 20 Minuten reichen</span>
                </li>
              </ul>
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
                <div className="eyebrow">Checkliste anfordern</div>
                <h2 className="mt-4 font-serif text-2xl italic text-foreground sm:text-3xl">
                  Sofort per E-Mail.
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Vorname, E-Mail, Einwilligung — fertig. Kein Login, keine
                  Umwege.
                </p>
                <div className="mt-6">
                  <LeadMagnetForm
                    asset="prophylaxe-checkliste"
                    assetLabel="Checkliste"
                  />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}
