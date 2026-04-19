import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

const proof = [
  { value: "150+", label: "begleitete Praxen" },
  { value: "3–18", label: "Monate Mentoring" },
  { value: "50–80 %", label: "Beratung förderfähig" },
  { value: "DACH", label: "Beratungsraum" },
]

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-background"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035] dot-grid"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-10 h-[520px] w-[520px] rounded-full halo-accent opacity-25 blur-3xl md:-right-24"
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 pb-20 pt-14 md:grid-cols-[7fr_5fr] md:gap-16 md:px-8 md:pb-28 md:pt-20">
        <div>
          <div className="flex items-center gap-4">
            <span className="font-serif text-[11px] tracking-[0.32em] text-accent">
              00 — Prophylaxe-Institut
            </span>
            <span aria-hidden className="h-px w-10 bg-accent" />
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground/70">
              by Minka
            </span>
          </div>

          <h1
            id="hero-title"
            className="serif-display mt-8 text-[42px] leading-[1.05] text-foreground sm:text-6xl md:text-[72px] lg:text-[80px]"
          >
            Nachhaltiger Praxis­erfolg{" "}
            <em className="italic text-accent">mit System.</em>
          </h1>

          <p className="lead mt-8 max-w-xl text-balance">
            Wir entwickeln Prophylaxe vom Pflichttermin zur steuerbaren,
            messbaren und teamfähigen Renditesäule — persönlich begleitet
            durch Minka, in über 150 Praxen erprobt.
          </p>

          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
            <Button
              asChild
              size="lg"
              className="w-full rounded-full px-8 text-base font-semibold tracking-wide sm:w-auto"
            >
              <Link href="/kontakt">Erstgespräch anfragen</Link>
            </Button>
            <Link
              href="#programme"
              className="group inline-flex items-center gap-2 text-base font-medium text-foreground"
            >
              <span className="link-underline">
                Beratung &amp; Mentoring ansehen
              </span>
              <span
                aria-hidden
                className="text-accent transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>

          {/* Accreditation line — adds charm + authority */}
          <div className="mt-12 hidden items-center gap-5 text-[11px] uppercase tracking-[0.22em] text-muted-foreground md:flex">
            <span>ZFA</span>
            <span aria-hidden className="h-px w-4 bg-border" />
            <span>ZMP</span>
            <span aria-hidden className="h-px w-4 bg-border" />
            <span>Praxismanagerin IHK</span>
            <span aria-hidden className="h-px w-4 bg-border" />
            <span>iTOP-Teacher</span>
          </div>
        </div>

        {/* Portrait with decorative frame */}
        <div className="relative mx-auto w-full max-w-sm md:max-w-none">
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-secondary shadow-[0_30px_80px_-40px_rgba(0,0,0,0.4)]">
              <Image
                src="/minka/portrait.jpg"
                alt="Rusminka Minka Mujezinovic — Gründerin Prophylaxe-Institut"
                fill
                priority
                sizes="(max-width: 768px) 90vw, 40vw"
                className="object-cover object-top"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent"
              />
            </div>

            {/* corner marks */}
            <div
              aria-hidden
              className="absolute -bottom-3 -right-3 h-20 w-20 border border-accent/50"
            />
            <div
              aria-hidden
              className="absolute -top-3 -left-3 h-12 w-12 border-l border-t border-accent"
            />

            {/* small caption tag */}
            <div className="absolute -bottom-4 left-4 flex items-center gap-3 rounded-full border border-border bg-background/95 px-4 py-2 shadow-sm backdrop-blur md:left-6">
              <span
                aria-hidden
                className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
              />
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground/80">
                Mentorin seit 2015
              </span>
            </div>
          </div>

          <p className="mt-8 font-serif text-sm italic text-muted-foreground md:text-base">
            Minka Mujezinovic — Gründerin &amp; Mentorin
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-border pb-16 pt-10 md:grid-cols-4 md:gap-x-10 md:pb-24">
          {proof.map((item) => (
            <div key={item.label} className="flex flex-col gap-1.5">
              <dt className="font-serif text-3xl font-normal tracking-tight text-foreground md:text-4xl">
                {item.value}
              </dt>
              <dd className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {item.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
