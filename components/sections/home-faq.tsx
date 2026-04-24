import { SectionLabel } from "@/components/ui/section-label"

const faqs = [
  {
    q: "Wie schnell sehen wir erste Ergebnisse?",
    a: "Die ersten Strukturen greifen typischerweise nach 6–10 Wochen: klarere Abläufe, entlastete Behandler, erste spürbare Änderungen im Patientenverhalten. Belastbare KPI-Effekte (Prophylaxe-Stunden, Recall-Quote, Zusatzleistungen) sehen wir in der Regel nach 4–6 Monaten — passend zum Rhythmus Ihrer Recall-Intervalle.",
  },
  {
    q: "Warum sollten wir das nicht intern mit einer eigenen Kraft lösen?",
    a: "Können Sie. In vielen Praxen scheitert der Eigenaufbau aber nicht am Wollen, sondern am Fehlen der Systematik und der Außenperspektive. Wir bringen erprobte Prozesse, einen messbaren Fahrplan und konsequentes Nachhalten — statt gut gemeinter Insellösungen, die im Alltag erodieren.",
  },
  {
    q: "Wie viel Zeitaufwand bedeutet das für die Praxisinhaber:innen?",
    a: "Weniger, als Sie denken. Planen Sie 60–90 Minuten alle zwei Wochen für Steuerungs-Sessions ein. Die eigentliche Umsetzung geschieht im Team — das ist Teil der Philosophie: Prophylaxe wird teamfähig, nicht chef-abhängig.",
  },
  {
    q: "Passt das auch für Praxen, die schon gut laufen?",
    a: "Ja — oft sogar besonders gut. Praxen mit stabiler Auslastung haben die Reife, Prophylaxe strategisch auf die nächste Stufe zu heben: höhere Wertschöpfung pro Stunde, bessere Mitarbeiterbindung, klarere Nachfolge-Perspektive.",
  },
  {
    q: "Wie funktioniert die Förderung konkret?",
    a: "Beide Einstiegsberatungen sind im Rahmen der BAFA-Beratungsförderung zu 50 % (West) bzw. bis zu 80 % (Ost) förderfähig. Unser Concierge-Team übernimmt die komplette Antragstellung. Ihr Netto-Eigenanteil pro Beratung: ab 1.750 € (West) bzw. ab 700 € (Ost). Zwei Beratungen pro Förderjahr sind kombinierbar.",
  },
  {
    q: "Was passiert, wenn wir nach der Beratung weitermachen wollen?",
    a: "Dann greift das Mentoring in drei Stufen (3 / 6 / 18 Monate). Sie wählen die Tiefe — wir passen Rhythmus und Fokus an. Kein Pflicht-Upgrade, kein Automatismus: Die Beratung ist eigenständig nutzbar.",
  },
]

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
}

export function HomeFaq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="bg-background py-16 sm:py-20 md:py-28"
    >
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-5xl px-4 sm:px-5 md:px-8">
        <div className="max-w-2xl">
          <SectionLabel numeral="V · ii" label="Häufige Fragen" />
          <h2
            id="faq-title"
            className="serif-display mt-6 text-[28px] leading-[1.1] text-foreground sm:text-4xl md:text-5xl"
          >
            Antworten auf das, was Praxen wirklich fragen.
          </h2>
        </div>

        <div className="mt-12 divide-y divide-border border-y border-border">
          {faqs.map((f) => (
            <details key={f.q} className="group marker:hidden">
              <summary className="flex min-h-[60px] cursor-pointer list-none items-center justify-between gap-6 py-5 text-left">
                <span className="font-serif text-lg leading-snug text-foreground sm:text-xl md:text-2xl">
                  {f.q}
                </span>
                <span
                  aria-hidden
                  className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-all group-open:rotate-45 group-hover:border-accent group-hover:text-accent"
                >
                  +
                </span>
              </summary>
              <p className="mb-6 max-w-3xl text-[15.5px] leading-[1.7] text-foreground sm:text-base">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
