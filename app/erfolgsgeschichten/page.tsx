import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { PageHero } from "@/components/sections/page-hero"
import { Button } from "@/components/ui/button"
import { CTA } from "@/components/sections/cta"
import { caseStudies } from "@/lib/case-studies"

export const metadata: Metadata = {
  title: "Erfolgsgeschichten — Praxen, die Prophylaxe neu gedacht haben",
  description:
    "Drei dokumentierte Praxis-Cases: Ausgangslage, Maßnahmen, Ergebnisse. Keine erfundenen Zahlen — belegbare Entwicklung von Prophylaxe als tragender Säule.",
  alternates: { canonical: "/erfolgsgeschichten" },
}

const siteUrl = "https://prophylaxe-institut.de"

const itemListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: caseStudies.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.title,
    url: `${siteUrl}/erfolgsgeschichten/${c.slug}`,
  })),
}

export default function CaseStudiesIndexPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <PageHero
        eyebrow="Erfolgsgeschichten"
        title="Drei Praxen, drei Ausgangslagen — ein Ankerprinzip."
        description="Wir dokumentieren unsere Begleitungen gemeinsam mit den Praxen. Zahlen erscheinen hier erst nach Freigabe — bis dahin zeigen wir Struktur, Weg und O-Ton."
        breadcrumbs={[{ href: "/erfolgsgeschichten", label: "Erfolgsgeschichten" }]}
        actions={
          <Button
            asChild
            size="lg"
            className="rounded-full px-8 text-base font-semibold tracking-wide"
          >
            <Link href="/gespraech">15-Min-Kennenlernen</Link>
          </Button>
        }
      />

      <section className="bg-background py-16 sm:py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-5 md:px-8">
          <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((c) => (
              <article
                key={c.slug}
                className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-accent/60"
              >
                {c.image && (
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary">
                    <Image
                      src={c.image}
                      alt={c.practice}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    <span>{c.region}</span>
                    <span aria-hidden className="text-accent/60">·</span>
                    <span>{c.duration}</span>
                    {c.placeholder && (
                      <>
                        <span aria-hidden className="text-accent/60">·</span>
                        <span className="text-accent">In Arbeit</span>
                      </>
                    )}
                  </div>
                  <h2 className="mt-4 font-serif text-xl leading-snug text-foreground sm:text-2xl">
                    {c.title}
                  </h2>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted-foreground">
                    {c.summary}
                  </p>
                  <Link
                    href={`/erfolgsgeschichten/${c.slug}`}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground"
                  >
                    <span className="border-b border-accent/60 pb-0.5">
                      Case ansehen
                    </span>
                    <span
                      aria-hidden
                      className="text-accent transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-10 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            <strong className="font-medium text-foreground">Hinweis zur Transparenz:</strong>{" "}
            Metriken werden erst veröffentlicht, sobald die jeweilige Praxis
            der Freigabe der konkreten Zahlen zugestimmt hat. Wir publizieren
            keine geschätzten oder erfundenen Uplifts.
          </p>
        </div>
      </section>

      <CTA />
    </main>
  )
}
