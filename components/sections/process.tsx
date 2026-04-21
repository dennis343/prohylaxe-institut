const processSteps = [
  {
    number: "1a",
    title: "Impuls & Erstkontakt",
    subtitle: "Potenziale sichtbar machen",
    purpose:
      "Klarheit, wo Prophylaxe in Ihrer Praxis heute Potenzial verschenkt.",
    points: [
      "Analyse von Kommunikation, Abläufen, Team & Umsatzpotenzial",
      "Sichtbarmachung von Optimierungsfeldern",
      "Klare Bewertung bestehender Strukturen",
    ],
    result: "Grobanalyse mit Potenzialen, Engpässen und ersten Hebeln.",
    pairHint: "1a + 1b in einem Termin möglich",
  },
  {
    number: "1b",
    title: "Analyse & Detailplanung",
    subtitle: "Aus der Analyse wird ein konkreter Plan",
    purpose:
      'Aus der Grobanalyse wird ein steuerbarer „interner Behandlungsplan" für die Prophylaxe-Säule.',
    points: [
      "Ist-Stand: Abläufe, Teamrollen, Zahlen",
      "Klare Prozesse, Verantwortlichkeiten und messbare Kennzahlen",
      "Saubere Gesprächslogik: Nutzen statt Fachworte",
    ],
    result: "Detailplan mit Maßnahmen, Reihenfolge, Rollen und KPIs.",
  },
  {
    number: "2",
    title: "Prototypische Umsetzung",
    subtitle: "Wirkung im Praxisalltag erleben",
    purpose:
      "Den Plan in einem überschaubaren Rahmen praktisch testen — echte Wirkung im Alltag.",
    points: [
      "Feinschliff von bis zu drei ausgewählten Abläufen",
      "Test der Gesprächsführung, Termin- & Recall-Logik",
      "Kennzahlen messbar: Annahme-, Wiederkehr-, Ausfallquote",
    ],
    result: "Erster Machbarkeitsnachweis mit messbaren Verbesserungen.",
  },
  {
    number: "3",
    title: "Leben des Systems",
    subtitle: "Langfristige Verankerung im Team",
    purpose:
      "Das System wird dauerhaft in der Praxis verankert — teamgetragen, messbar und stabil.",
    points: [
      "Standardisierung aller Stationen: Empfang, Behandlung, Recall",
      "Etablierung einer Prophylaxe-Leitungs-Funktion",
      "Kontinuität in Wirkungskommunikation und Profitabilität",
    ],
    result: "Prophylaxe-System als Selbstläufer — ohne Inhaber-Dauerpräsenz.",
  },
]

export function Process() {
  return (
    <section className="relative overflow-hidden bg-primary py-24 text-primary-foreground md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-10 h-[520px] w-[520px] rounded-full halo-accent opacity-20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04] dot-grid"
      />
      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary-foreground/75">
            <span className="font-serif text-[11px] tracking-[0.3em] text-accent">IV</span>
            <span className="h-px w-10 bg-primary-foreground/25" />
            Der Weg · Praxis-Entwicklungs-System®
          </div>
          <h2 className="serif-display mt-6 text-4xl leading-[1.1] text-primary-foreground md:text-5xl">
            Vier klare Schritte — vom Impuls bis zum Selbstläufer.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-primary-foreground/85 md:text-xl">
            Ein durchgängiger Pfad: Wir machen Potenziale sichtbar, planen
            steuerbar, testen prototypisch — und verankern das System nachhaltig
            im Team.
          </p>
        </div>

        <ol className="mt-16 divide-y divide-primary-foreground/15 border-y border-primary-foreground/15 md:mt-20">
          {processSteps.map((step) => (
            <li
              key={step.number}
              className="grid grid-cols-1 gap-6 py-10 md:grid-cols-[5rem_1fr_1.2fr] md:items-start md:gap-12 md:py-14"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-3xl italic text-accent md:text-4xl">
                  {step.number}
                </span>
                {step.pairHint && (
                  <span className="hidden text-[10px] uppercase tracking-[0.18em] text-primary-foreground/55 md:inline">
                    Tipp
                  </span>
                )}
              </div>

              <div>
                <h3 className="font-serif text-2xl font-normal tracking-tight text-primary-foreground md:text-3xl">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm font-medium uppercase tracking-[0.14em] text-primary-foreground/65">
                  {step.subtitle}
                </p>
                <p className="mt-4 text-base leading-relaxed text-primary-foreground/80">
                  {step.purpose}
                </p>
              </div>

              <div>
                <ul className="space-y-3">
                  {step.points.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-3 text-[15px] leading-relaxed text-primary-foreground/90"
                    >
                      <span
                        aria-hidden
                        className="mt-2.5 inline-block h-px w-4 shrink-0 bg-primary-foreground/30"
                      />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 border-t border-primary-foreground/15 pt-4 text-sm leading-relaxed text-primary-foreground/70">
                  <span className="font-semibold uppercase tracking-[0.14em] text-primary-foreground/75">
                    Ergebnis ·{" "}
                  </span>
                  {step.result}
                </p>
                {step.pairHint && (
                  <p className="mt-3 text-xs italic text-primary-foreground/65">
                    Tipp: {step.pairHint}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
