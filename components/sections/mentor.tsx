import Image from "next/image"
import { SectionLabel } from "@/components/ui/section-label"

const credentials = [
  "Zahnmedizinische Fachangestellte (ZFA)",
  "Zahnmedizinische Prophylaxeassistentin (ZMP)",
  "Praxismanagerin (IHK)",
  "Referentin & iTOP-Teacher (Curaden)",
  "Spezialistin für Mundhygieneinstruktion, Schmelzregeneration & bioaktive Konzepte",
]

const combines = [
  { left: "Praxisnähe", right: "tiefe Praxisrealität" },
  { left: "Systematik", right: "wirtschaftliche Klarheit" },
  { left: "wirtschaftliche Steuerung", right: "umsetzungsstarke Kommunikation" },
]

export function Mentor() {
  return (
    <section className="bg-background py-16 sm:py-20 md:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-5 md:px-8">
        <div className="grid items-start gap-10 md:grid-cols-[5fr_7fr] md:gap-16">
          {/* Portrait collage */}
          <div className="mx-auto w-full max-w-sm md:max-w-none">
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-secondary">
                <Image
                  src="/minka/seminar.jpg"
                  alt="Minka Mujezinovic im Seminar"
                  fill
                  sizes="(max-width: 768px) 90vw, 40vw"
                  className="object-cover"
                />
              </div>
              <div
                aria-hidden
                className="absolute -bottom-3 -right-3 h-20 w-20 border border-accent/50"
              />
            </div>
            <p className="mt-5 font-serif text-sm italic text-muted-foreground md:text-base">
              Beim Seminar — charmant, elegant, auf Augenhöhe.
            </p>
          </div>

          <div>
            <SectionLabel numeral="V" label="Ihre Mentorin" />
            <h2 className="serif-display mt-6 text-[32px] leading-[1.05] text-foreground sm:text-5xl md:text-6xl">
              Rusminka „Minka"{" "}
              <em className="italic text-accent">Mujezinovic.</em>
            </h2>
            <p className="mt-4 font-serif text-lg italic text-muted-foreground md:text-xl">
              Gründerin Prophylaxe-Institut · ZFA · ZMP · Praxismanagerin
            </p>

            <div className="mt-8 space-y-5 text-base leading-relaxed text-foreground/85 md:text-lg">
              <p>
                Aufbau und langjährige Leitung hochprofitabler Prophylaxe­
                abteilungen — und über 150 Praxen, denen ich zu nachhaltigem
                Wachstum verholfen habe.
              </p>
              <p>
                Ich kann Ihnen nicht nur zeigen, wie es geht — ich setze mit
                Ihnen gemeinsam um. Tiefe Praxis­realität trifft auf
                wirtschaftliche Klarheit.
              </p>
            </div>

            <ul className="mt-10 space-y-4 border-t border-border pt-8">
              {credentials.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-4 text-base leading-relaxed text-foreground"
                >
                  <span
                    aria-hidden
                    className="mt-3 inline-block h-px w-5 shrink-0 bg-accent"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-12 grid gap-px overflow-hidden rounded-md border border-border bg-border sm:grid-cols-3">
              {combines.map((c) => (
                <div key={c.left} className="bg-card p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                    Verbindet
                  </p>
                  <p className="mt-3 font-serif text-base text-foreground md:text-lg">
                    {c.left}
                  </p>
                  <p className="mt-1 text-sm italic text-muted-foreground">
                    × {c.right}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bühnen-Bild als Wirkungs-Banner */}
        <div className="mt-16 overflow-hidden rounded-lg sm:mt-20 md:mt-28">
          <div className="relative aspect-[4/5] w-full bg-primary sm:aspect-[16/9] md:aspect-[16/7]">
            <Image
              src="/minka/buehne.jpg"
              alt="Minka Mujezinovic auf der Bühne"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent"
            />
            <div className="absolute inset-0 flex items-end p-5 sm:p-8 md:p-14">
              <p className="serif-display max-w-2xl text-xl leading-tight text-primary-foreground sm:text-2xl md:text-4xl">
                Patienten spüren Struktur.{" "}
                <em className="italic text-accent">
                  Und Struktur schafft Vertrauen.
                </em>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
