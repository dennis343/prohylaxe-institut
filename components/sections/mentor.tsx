const highlights = [
  "Mehrfach erprobte Erfolgsprinzipien",
  "Umsetzung in über 150 unterschiedlichen Praxen",
  "Langfristige Begleitung statt einmaliger Impulse",
  "Prophylaxe mit System — Beratung, die begeistert",
]

export function Mentor() {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid items-start gap-12 md:grid-cols-[5fr_7fr] md:gap-16">
          {/* Portrait */}
          <div className="mx-auto w-full max-w-sm md:max-w-none">
            <div className="relative">
              <div className="aspect-[4/5] overflow-hidden rounded-md bg-gradient-to-br from-primary to-[oklch(0.32_0.05_265)]">
                <div className="flex h-full flex-col items-center justify-center px-6 text-center text-primary-foreground">
                  <span className="font-serif text-[11rem] leading-none italic text-accent/70">
                    M
                  </span>
                  <span className="mt-4 text-[11px] uppercase tracking-[0.25em] text-primary-foreground/70">
                    Minka
                  </span>
                </div>
              </div>
              <div
                aria-hidden
                className="absolute -bottom-3 -right-3 h-20 w-20 border border-accent/40"
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="eyebrow">Ihre Mentorin</div>
            <h2 className="serif-display mt-6 text-4xl leading-[1.05] text-foreground md:text-6xl">
              Minka.
            </h2>
            <p className="mt-4 font-serif text-lg italic text-muted-foreground md:text-xl">
              Gründerin Prophylaxe Institut — Dozentin bei WissensReich Academy
            </p>

            <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-muted-foreground md:text-base">
              <p>
                Ich habe bereits über 150 Praxen zu nachhaltigem Wachstum
                verholfen — und ich kann Ihnen nicht nur zeigen, wie es geht,
                sondern ich setze mit Ihnen gemeinsam um.
              </p>
              <p>
                Ich weiß genau, wie es sich anfühlt, wenn die Praxis stagniert
                und man das Gefühl hat, alles selbst machen zu müssen. Aber ich
                habe auch gesehen, wie Praxen mit dem richtigen Mentoring und
                bewährten Prinzipien aufblühen.
              </p>
            </div>

            <ul className="mt-10 space-y-4 border-t border-border pt-8">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-4 text-[15px] text-foreground"
                >
                  <span
                    aria-hidden
                    className="mt-2.5 inline-block h-px w-5 shrink-0 bg-accent"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
