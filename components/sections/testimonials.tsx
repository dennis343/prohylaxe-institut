import { YouTubeConsentEmbed } from "@/components/youtube-consent-embed"
import { SectionLabel } from "@/components/ui/section-label"

const videoTestimonials = [
  {
    id: "L6KeIxMGDQ4",
    caption: "Endlich Struktur — und ein begeistertes Team.",
  },
  {
    id: "KiMLABEpcSo",
    caption: "Patienten kommen freiwillig wieder.",
  },
]

const writtenTestimonials = [
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
    <section className="bg-secondary/40 py-16 sm:py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-5 md:px-8">
        <div className="max-w-2xl">
          <SectionLabel numeral="X" label="Stimmen aus der Praxis" />
          <h2 className="serif-display mt-6 text-[32px] leading-[1.1] text-foreground sm:text-4xl md:text-5xl">
            Was unsere{" "}
            <em className="italic text-accent">Mentees berichten.</em>
          </h2>
        </div>

        {/* Video-Testimonials (YouTube Shorts) */}
        <div className="mt-12 grid gap-6 sm:mt-16 sm:gap-8 md:mt-20 md:grid-cols-2">
          {videoTestimonials.map((v) => (
            <figure
              key={v.id}
              className="overflow-hidden rounded-lg border border-border bg-background"
            >
              <div className="relative aspect-[9/16] w-full bg-primary">
                <YouTubeConsentEmbed
                  id={v.id}
                  title={`Video-Testimonial: ${v.caption}`}
                />
              </div>
              <figcaption className="border-t border-border p-5 sm:p-6">
                <p className="font-serif text-lg italic text-foreground md:text-xl">
                  „{v.caption}"
                </p>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Video-Testimonial
                </p>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Schriftliche Testimonials */}
        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:mt-16 md:grid-cols-3">
          {writtenTestimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col bg-background p-6 sm:p-8 md:p-10"
            >
              <span
                aria-hidden
                className="font-serif text-5xl italic leading-none text-accent/70"
              >
                &ldquo;
              </span>
              <blockquote className="mt-4 flex-1 font-serif text-lg font-normal italic leading-snug text-foreground md:text-xl">
                {t.quote}
              </blockquote>
              <figcaption className="mt-8 border-t border-border pt-5">
                <p className="text-base font-medium text-foreground">
                  {t.name}
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
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
