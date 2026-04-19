const challenges = [
  {
    title: "Wirtschaftliche Unsicherheit",
    description:
      "Sie wissen nicht, wie Sie Ihre Praxis wirtschaftlich gesund weiterentwickeln können.",
  },
  {
    title: "Mangelnde Prophylaxe-Nutzung",
    description:
      "Prophylaxe wird nicht strategisch als Umsatz- und Bindungsfaktor genutzt.",
  },
  {
    title: "Komplizierte Abläufe",
    description:
      "Abläufe sind ineffizient und erzielen keine höheren Deckungsbeiträge.",
  },
  {
    title: "Abhängigkeit von Behandlungszeit",
    description:
      "Sie können nur wachsen, wenn Sie selbst mehr Behandlungszeit aufbringen.",
  },
  {
    title: "Team-Herausforderungen",
    description:
      "Es fehlt ein starkes, mitdenkendes Team, das Sie entlastet.",
  },
  {
    title: "Fehlende Langzeitstrategie",
    description:
      "Sie suchen nach einer langfristigen Begleitung, die über kurzfristige Lösungen hinausgeht.",
  },
]

export function Challenges() {
  return (
    <section className="bg-secondary/40 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-2xl">
          <div className="eyebrow">Die Realität in vielen Praxen</div>
          <h2 className="serif-display mt-6 text-3xl leading-[1.1] text-foreground md:text-5xl">
            Kämpfen Sie mit diesen{" "}
            <em className="italic text-accent">Herausforderungen?</em>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            Viele Zahnärzte und Praxisinhaber fühlen sich allein gelassen.
            Einzelmaßnahmen oder einmalige Coachings reichen nicht aus, um
            nachhaltigen Erfolg zu sichern.
          </p>
        </div>

        <ol className="mt-16 divide-y divide-border border-y border-border md:mt-20">
          {challenges.map((c, i) => (
            <li
              key={c.title}
              className="grid grid-cols-[auto_1fr] items-start gap-x-6 py-8 md:grid-cols-[4rem_1fr_1.4fr] md:gap-x-10 md:py-10"
            >
              <span className="font-serif text-sm italic text-accent md:text-base">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-serif text-xl font-light tracking-tight text-foreground md:text-2xl">
                {c.title}
              </h3>
              <p className="col-span-2 mt-3 max-w-xl text-[15px] leading-relaxed text-muted-foreground md:col-span-1 md:mt-0">
                {c.description}
              </p>
            </li>
          ))}
        </ol>

        <p className="mt-16 max-w-xl text-balance font-serif text-xl font-light italic tracking-tight text-foreground md:text-2xl">
          Es ist Zeit für einen echten Wandel — mit System statt Zufall.
        </p>
      </div>
    </section>
  )
}
