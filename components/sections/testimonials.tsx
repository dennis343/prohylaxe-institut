const testimonials = [
  {
    quote:
      "Das Prophylaxe-System hat unsere Praxis grundlegend verändert. Mein Team arbeitet eigenständig, die Patienten sind begeistert — und die Auswertungen sprechen für sich.",
    name: "Dr. Anna Schmidt",
    role: "Zahnärztin, München",
  },
  {
    quote:
      "Endlich ein Mentoring, das nicht bei der Theorie stehen bleibt. Minka kommt regelmäßig in die Umsetzung — und genau das macht den Unterschied.",
    name: "Dr. Markus Becker",
    role: "Praxisinhaber, Stuttgart",
  },
  {
    quote:
      "Wir haben in 12 Monaten unsere Prophylaxe-Umsätze verdoppelt — ohne dass ich selbst mehr Behandlungszeit aufbringen musste. Das war der eigentliche Wendepunkt.",
    name: "Dr. Lena Wagner",
    role: "Praxisinhaberin, Hamburg",
  },
]

export function Testimonials() {
  return (
    <section className="bg-secondary/40 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-2xl">
          <div className="eyebrow">Stimmen aus der Praxis</div>
          <h2 className="serif-display mt-6 text-3xl leading-[1.1] text-foreground md:text-5xl">
            Was unsere{" "}
            <em className="italic text-accent">Mentees berichten.</em>
          </h2>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:mt-20 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col bg-background p-8 md:p-10"
            >
              <span
                aria-hidden
                className="font-serif text-5xl italic leading-none text-accent/60"
              >
                &ldquo;
              </span>
              <blockquote className="mt-4 flex-1 font-serif text-lg font-light italic leading-snug text-foreground md:text-xl">
                {t.quote}
              </blockquote>
              <figcaption className="mt-8 border-t border-border pt-5">
                <p className="text-[15px] font-medium text-foreground">
                  {t.name}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {t.role}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
