import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

const proof = [
  { value: "150+", label: "begleitete Praxen" },
  { value: "seit 2015", label: "Mentorin im Fachgebiet" },
  { value: "50–80 %", label: "Beratung förderfähig" },
]

const trustLine = [
  "Zahnmedizinische Fachangestellte",
  "Prophylaxeassistentin (ZMP)",
  "Praxismanagerin (IHK)",
  "iTOP-Teacher (Curaden)",
]

export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-background"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04] dot-grid"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-10 h-[520px] w-[520px] rounded-full halo-accent opacity-30 blur-3xl md:-right-24"
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 pb-14 pt-10 sm:px-5 sm:pb-18 sm:pt-12 md:grid-cols-[7fr_5fr] md:gap-14 md:px-8 md:pb-24 md:pt-20 lg:gap-16">
        <div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="font-serif text-[11px] tracking-[0.32em] text-accent">
              Prophylaxe-Institut
            </span>
            <span aria-hidden className="h-px w-10 bg-accent" />
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-foreground">
              by Minka
            </span>
          </div>

          <h1
            id="hero-title"
            className="serif-display mt-6 text-[36px] leading-[1.02] text-foreground sm:mt-8 sm:text-5xl md:text-[64px] lg:text-[80px]"
          >
            Nachhaltiger Praxis­erfolg{" "}
            <em className="italic text-accent">mit System.</em>
          </h1>

          <p className="lead mt-6 max-w-xl text-pretty sm:mt-8 sm:text-balance">
            Wir entwickeln Prophylaxe vom Pflichttermin zur steuerbaren,
            messbaren und teamfähigen Renditesäule — persönlich begleitet
            durch Minka, in über 150 Zahnarztpraxen erprobt.
          </p>

          <div className="mt-9 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:gap-5">
            <Button
              asChild
              size="lg"
              className="rounded-full px-8 text-base font-semibold tracking-wide shadow-[0_18px_40px_-22px_rgba(0,0,0,0.55)]"
            >
              <Link href="/gespraech">Erstgespräch anfragen</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full border-foreground/30 bg-transparent px-7 text-base font-medium tracking-wide text-foreground hover:bg-foreground hover:text-background"
            >
              <Link href="/foerder-check">Förder-Check in 90 Sek.</Link>
            </Button>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            Kostenlos · unverbindlich · persönliche Antwort in 24 h
          </p>

          <div className="mt-10 hidden flex-wrap items-center gap-x-5 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground md:flex">
            {trustLine.map((item, i) => (
              <span key={item} className="flex items-center gap-5">
                {i > 0 && (
                  <span aria-hidden className="h-px w-4 bg-border" />
                )}
                <span>{item}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Portrait with decorative frame */}
        <div className="relative mx-auto w-full max-w-sm md:max-w-none">
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-secondary shadow-[0_36px_90px_-40px_rgba(0,0,0,0.5)]">
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
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/15 via-transparent to-transparent"
              />
            </div>

            <div
              aria-hidden
              className="absolute -bottom-3 -right-3 h-20 w-20 border border-accent/60"
            />
            <div
              aria-hidden
              className="absolute -top-3 -left-3 h-12 w-12 border-l border-t border-accent"
            />

            <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-full border border-border bg-background px-4 py-2 shadow-md md:left-6">
              <span
                aria-hidden
                className="inline-block h-2 w-2 rounded-full bg-accent"
              />
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-foreground">
                Mentorin seit 2015
              </span>
            </div>
          </div>

          <p className="mt-8 font-serif text-sm italic text-foreground md:text-base">
            Minka Mujezinovic — Gründerin &amp; Mentorin
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <dl className="grid grid-cols-3 gap-x-4 gap-y-6 border-t border-border pb-12 pt-8 sm:gap-x-6 sm:gap-y-8 sm:pb-16 sm:pt-10 md:gap-x-10 md:pb-24">
          {proof.map((item) => (
            <div key={item.label} className="flex flex-col gap-1.5">
              <dt className="font-serif text-2xl font-normal tracking-tight text-foreground sm:text-3xl md:text-4xl">
                {item.value}
              </dt>
              <dd className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground sm:text-xs">
                {item.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
