import Link from "next/link"
import { Button } from "@/components/ui/button"

export function CTA() {
  return (
    <section
      id="cta"
      className="relative overflow-hidden bg-primary py-28 text-primary-foreground md:py-40"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--accent),transparent_70%)] opacity-20 blur-3xl"
      />
      <div className="relative mx-auto max-w-3xl px-5 text-center md:px-8">
        <div className="inline-flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.22em]">
          <span className="font-serif text-[11px] tracking-[0.3em] text-accent">
            VI
          </span>
          <span aria-hidden className="h-px w-10 bg-primary-foreground/25" />
          <span className="text-primary-foreground/90">Der Anstoß</span>
        </div>
        <h2 className="serif-display mt-6 text-4xl leading-[1.05] md:text-6xl">
          Investieren Sie in eine Zukunft, in der Ihre Praxis{" "}
          <em className="italic text-accent">floriert.</em>
        </h2>
        <p className="mx-auto mt-8 max-w-xl text-base text-primary-foreground/90 md:text-lg">
          Wirtschaftlich gesund wachsen, Prophylaxe als strategischen
          Umsatztreiber nutzen, ein motiviertes Team aufbauen — und dabei mehr
          Freiheit gewinnen.
        </p>

        <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-8">
          <Button
            asChild
            size="lg"
            className="w-full rounded-full bg-accent px-8 text-sm tracking-wide text-accent-foreground hover:bg-accent/90 sm:w-auto"
          >
            <Link href="/kontakt#warteliste">Auf die Warteliste</Link>
          </Button>
          <Link
            href="/gespraech"
            className="group inline-flex items-center gap-2 text-sm font-medium text-primary-foreground"
          >
            <span className="border-b border-primary-foreground/40 pb-0.5 group-hover:border-accent">
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
    </section>
  )
}
