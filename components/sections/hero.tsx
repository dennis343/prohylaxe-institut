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
    <section className="relative overflow-hidden bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
          backgroundSize: "24px 24px",
          color: "var(--foreground)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-10 h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,var(--accent),transparent_70%)] opacity-15 blur-3xl md:-right-24"
      />

      <div className="relative mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-5 pb-20 pt-16 md:grid-cols-[7fr_5fr] md:gap-16 md:px-8 md:pb-32 md:pt-24">
        <div>
          <div className="eyebrow">Prophylaxe-Institut by Minka</div>

          <h1 className="serif-display mt-8 text-[42px] leading-[1.05] text-foreground sm:text-6xl md:text-[72px] lg:text-[80px]">
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
              <span className="border-b border-accent/60 pb-0.5 group-hover:border-accent">
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
        </div>

        {/* Portrait */}
        <div className="relative mx-auto w-full max-w-sm md:max-w-none">
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-secondary">
              <Image
                src="/minka/portrait.jpg"
                alt="Rusminka Minka Mujezinovic — Gründerin Prophylaxe-Institut"
                fill
                priority
                sizes="(max-width: 768px) 90vw, 40vw"
                className="object-cover object-top"
              />
            </div>
            <div
              aria-hidden
              className="absolute -bottom-3 -right-3 h-20 w-20 border border-accent/50"
            />
          </div>
          <p className="mt-5 font-serif text-sm italic text-muted-foreground md:text-base">
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
