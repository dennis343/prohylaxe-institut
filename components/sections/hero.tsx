import { Button } from "@/components/ui/button"
import Link from "next/link"

const proof = [
  { value: "150+", label: "begleitete Praxen" },
  { value: "3–18", label: "Monate Mentoring" },
  { value: "ZFA · DH · Inhaber", label: "im Team entwickelt" },
  { value: "Förderung", label: "häufig möglich" },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Subtle editorial grain */}
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

      <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-16 md:px-8 md:pb-32 md:pt-28">
        <div className="max-w-3xl">
          <div className="eyebrow">Prophylaxe Institut by Minka</div>

          <h1 className="serif-display mt-8 text-[42px] leading-[1.02] text-foreground sm:text-6xl md:text-[76px] lg:text-[88px]">
            Nachhaltiger <br className="hidden sm:block" />
            Praxis­erfolg{" "}
            <em className="font-normal italic text-accent">mit System.</em>
          </h1>

          <p className="mt-8 max-w-xl text-balance text-base leading-relaxed text-muted-foreground md:text-lg">
            Kontinuität statt einmaliger Impulse: Wir etablieren Prophylaxe als
            Ihren strategischen Umsatz- und Bindungsfaktor — persönlich begleitet
            durch Minka, in über 150 Praxen erprobt.
          </p>

          <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
            <Button
              asChild
              size="lg"
              className="w-full rounded-full px-8 text-sm tracking-wide sm:w-auto"
            >
              <Link href="/kontakt#warteliste">Auf die Warteliste</Link>
            </Button>
            <Link
              href="/kontakt"
              className="group inline-flex items-center gap-2 text-sm font-medium text-foreground"
            >
              <span className="border-b border-accent/50 pb-0.5 group-hover:border-accent">
                Oder Erstgespräch anfragen
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

        <dl className="mt-20 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-border pt-10 md:mt-28 md:grid-cols-4 md:gap-x-10">
          {proof.map((item) => (
            <div key={item.label} className="flex flex-col gap-1.5">
              <dt className="font-serif text-3xl font-light tracking-tight text-foreground md:text-4xl">
                {item.value}
              </dt>
              <dd className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {item.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
