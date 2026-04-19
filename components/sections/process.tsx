const processSteps = [
  {
    badge: "Patientenverständnis",
    title: "Klare Kommunikation von Leistungen",
    description:
      "Patienten verstehen, warum Prophylaxe sinnvoll ist — nicht nur, was gemacht wird.",
  },
  {
    badge: "Vertrauensaufbau",
    title: "Wirkungsvolle Patientenkommunikation",
    description:
      "Die richtige Sprache schafft Vertrauen, Sicherheit und Bereitschaft zur Mitarbeit.",
  },
  {
    badge: "Kommunikation",
    title: "Charmantes Anbieten sinnvoller Zusatzleistungen",
    description:
      "Zusatzleistungen werden beraten, nicht verkauft — ehrlich, wertschätzend und passend.",
  },
  {
    badge: "Individuelle Betreuung",
    title: "Beratung statt Waschanlage",
    description:
      "Mundhygiene wird zum Coaching und persönlichen Dialog.",
  },
]

export function Process() {
  return (
    <section className="bg-primary py-24 text-primary-foreground md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em] text-accent">
            <span className="h-px w-8 bg-accent" />
            Für Zahnärztinnen, Zahnärzte &amp; Teams
          </div>
          <h2 className="serif-display mt-6 text-3xl leading-[1.1] text-primary-foreground md:text-5xl">
            Prophylaxe wird zum{" "}
            <em className="italic text-accent">Kommunikations-</em>
            <br className="hidden md:block" /> und{" "}
            <em className="italic text-accent">Serviceprozess.</em>
          </h2>
          <p className="mt-6 text-base text-primary-foreground/70 md:text-lg">
            Ein Prozess, der Patienten begeistert und Praxiserfolg steigert.
          </p>
        </div>

        <ol className="mt-16 divide-y divide-primary-foreground/15 border-y border-primary-foreground/15 md:mt-20">
          {processSteps.map((step, i) => (
            <li
              key={step.title}
              className="grid grid-cols-1 gap-4 py-8 md:grid-cols-[4rem_1fr_1.2fr] md:items-start md:gap-12 md:py-10"
            >
              <span className="font-serif text-sm italic text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-accent">
                  {step.badge}
                </p>
                <h3 className="mt-3 font-serif text-2xl font-light tracking-tight md:text-3xl">
                  {step.title}
                </h3>
              </div>
              <p className="max-w-md text-[15px] leading-relaxed text-primary-foreground/70">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
