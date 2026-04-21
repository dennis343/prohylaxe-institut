import { ChapterContinuation } from "@/components/ui/section-label"

const approaches = [
  {
    title: "Prophylaxe als Renditetreiber",
    description:
      "Wir etablieren Prophylaxe und Dentalhygiene als dauerhaftes und lukratives Angebot in Ihrer Praxis.",
  },
  {
    title: "Team-Entwicklung",
    description:
      "Ihr Team — insbesondere ZFA und DH-Personal — wird zu tragenden Leistungsträgern entwickelt.",
  },
  {
    title: "Zeitliche Entlastung",
    description:
      "Praxisinhaber werden zeitlich entlastet und können sich auf das Wesentliche konzentrieren.",
  },
]

export function Approach() {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="max-w-2xl">
          <ChapterContinuation numeral="i · ii" label="Unser Ansatz" />
          <h2 className="serif-display mt-6 text-3xl leading-[1.1] text-foreground md:text-5xl">
            Persönliches Mentoring für nachhaltigen Praxiserfolg.
          </h2>
          <p className="lead mt-6">
            Kein Blabla. Vorhersehbarer Erfolg. System statt Chaos.
          </p>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:mt-20 md:grid-cols-3">
          {approaches.map((a, i) => (
            <article
              key={a.title}
              className="group relative flex flex-col gap-6 bg-background p-8 transition-colors duration-500 hover:bg-secondary/50 md:p-10"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-serif text-xs italic text-foreground/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="h-px flex-1 bg-border" />
                <span
                  aria-hidden
                  className="font-serif text-foreground/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                >
                  ✦
                </span>
              </div>
              <h3 className="font-serif text-2xl font-normal tracking-tight text-foreground md:text-3xl">
                {a.title}
              </h3>
              <p className="text-[15px] leading-relaxed text-muted-foreground">
                {a.description}
              </p>
            </article>
          ))}
        </div>

        <figure className="mx-auto mt-20 max-w-3xl text-center md:mt-28">
          <span
            aria-hidden
            className="font-serif text-7xl italic leading-none text-foreground/35 md:text-8xl"
          >
            &ldquo;
          </span>
          <blockquote className="-mt-6 font-serif text-2xl font-light italic leading-[1.3] tracking-tight text-foreground md:text-4xl">
            Genau so wie Prophylaxe nur wirkt, wenn sie regelmäßig durchgeführt
            wird, entfalten auch unternehmerische Erfolgsprinzipien nur dann ihre
            Wirkung, wenn man kontinuierlich dranbleibt.
          </blockquote>
          <figcaption className="mt-8 text-xs uppercase tracking-[0.22em] text-muted-foreground">
            <span className="mx-auto mb-3 block h-px w-12 bg-border" />
            Minka — Ihre Mentorin
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
