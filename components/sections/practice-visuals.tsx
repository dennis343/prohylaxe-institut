import Image from "next/image"
import { SectionLabel } from "@/components/ui/section-label"

const visuals = [
  {
    src: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1600&q=80",
    alt: "Moderne Zahnarztpraxis mit Behandlungsstuhl und Tageslicht",
    caption: "Struktur im Behandlungsraum",
  },
  {
    src: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1600&q=80",
    alt: "Prophylaxe-Behandlung in einer Zahnarztpraxis",
    caption: "Prophylaxe mit Haltung",
  },
  {
    src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1600&q=80",
    alt: "Team-Besprechung in einer Zahnarztpraxis",
    caption: "Team als Erfolgsfaktor",
  },
]

export function PracticeVisuals() {
  return (
    <section className="relative bg-secondary/40 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <SectionLabel numeral="IV" label="Die Praxis im Blick" />
            <h2 className="serif-display mt-6 text-3xl leading-[1.1] text-foreground md:text-5xl">
              Prophylaxe{" "}
              <em className="italic text-accent">mit Seele.</em>
            </h2>
            <p className="lead mt-5 max-w-lg">
              Drei Motive aus dem Praxisalltag — als Haltungs­erinnerung: Raum,
              Beziehung, Team.
            </p>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground md:text-right">
            Jeder Baustein wirkt für sich. Zusammen ergeben sie eine spürbar
            andere Praxis.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3 md:gap-6">
          {visuals.map((v, i) => (
            <figure
              key={v.src}
              className="group relative overflow-hidden rounded-md bg-background"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={v.src}
                  alt={v.alt}
                  fill
                  sizes="(max-width: 768px) 90vw, 30vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-primary/70 via-primary/10 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80"
                />
                <div className="absolute left-5 top-5 flex items-center gap-2">
                  <span className="font-serif text-xs italic text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span aria-hidden className="h-px w-6 bg-accent" />
                </div>
              </div>
              <figcaption className="absolute bottom-5 left-5 right-5 font-serif text-lg italic text-primary-foreground md:text-xl">
                {v.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
