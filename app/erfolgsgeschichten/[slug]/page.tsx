import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { PageHero } from "@/components/sections/page-hero"
import { Button } from "@/components/ui/button"
import { CTA } from "@/components/sections/cta"
import { caseStudies, getCaseStudy } from "@/lib/case-studies"

const siteUrl = "https://prophylaxe-institut.de"

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study) return {}
  return {
    title: `${study.title} — Erfolgsgeschichte`,
    description: study.summary,
    alternates: { canonical: `/erfolgsgeschichten/${study.slug}` },
  }
}

export default async function CaseStudyPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study) notFound()

  const reviewJsonLd = {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}#organization`,
    },
    reviewBody: study.quote,
    author: { "@type": "Person", name: study.quoteAuthor },
    publisher: { "@id": `${siteUrl}#organization` },
    name: study.title,
    url: `${siteUrl}/erfolgsgeschichten/${study.slug}`,
  }

  return (
    <main>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewJsonLd) }}
      />
      <PageHero
        eyebrow={`Case · ${study.region}`}
        title={study.title}
        description={study.summary}
        breadcrumbs={[
          { href: "/erfolgsgeschichten", label: "Erfolgsgeschichten" },
          { href: `/erfolgsgeschichten/${study.slug}`, label: study.practice },
        ]}
        actions={
          <Button
            asChild
            size="lg"
            className="rounded-full px-8 text-base font-semibold tracking-wide"
          >
            <Link href="/gespraech">Ähnliche Situation? 15-Min-Kennenlernen</Link>
          </Button>
        }
      />

      <section className="bg-background py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-5 md:px-8">
          <dl className="grid gap-6 border-y border-border py-8 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Praxis
              </dt>
              <dd className="mt-2 font-serif text-base italic text-foreground">
                {study.practice}
              </dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Größe
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-foreground">
                {study.size}
              </dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Programm
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-foreground">
                {study.program}
              </dd>
            </div>
            <div>
              <dt className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                Dauer
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-foreground">
                {study.duration}
              </dd>
            </div>
          </dl>

          {study.image && (
            <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-lg bg-secondary">
              <Image
                src={study.image}
                alt={study.practice}
                fill
                sizes="(max-width: 1024px) 100vw, 960px"
                className="object-cover"
              />
            </div>
          )}

          <div className="mt-14 grid gap-12 md:grid-cols-[5fr_7fr] md:gap-16">
            <aside>
              <div className="eyebrow">Ausgangslage</div>
              <p className="mt-5 text-base leading-relaxed text-foreground/85">
                {study.situation}
              </p>
            </aside>
            <div>
              <div className="eyebrow">Unser Ansatz</div>
              <ul className="mt-5 space-y-4">
                {study.approach.map((step) => (
                  <li
                    key={step}
                    className="flex items-start gap-4 text-base leading-relaxed text-foreground"
                  >
                    <span
                      aria-hidden
                      className="mt-3 inline-block h-px w-5 shrink-0 bg-accent"
                    />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-14 border-t border-border pt-10">
            <div className="eyebrow">Ergebnis</div>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-foreground md:text-xl">
              {study.result}
            </p>
          </div>

          <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3">
            {study.metrics.map((m) => (
              <div
                key={m.label}
                className="flex flex-col gap-2 bg-background p-6 sm:p-7"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  {m.label}
                </p>
                <p className="font-serif text-2xl italic text-foreground sm:text-3xl">
                  {m.value}
                </p>
                {m.hint && (
                  <p className="text-xs text-muted-foreground">{m.hint}</p>
                )}
              </div>
            ))}
          </div>

          {study.placeholder && (
            <p className="mt-6 rounded-md border border-accent/30 bg-accent/5 px-5 py-4 text-sm leading-relaxed text-foreground/85">
              <strong className="font-semibold text-accent">In Arbeit:</strong>{" "}
              Die konkreten Zahlen dieser Praxis veröffentlichen wir, sobald die
              Inhaberin / der Inhaber der Freigabe zustimmt. Wir publizieren
              keine geschätzten Uplifts.
            </p>
          )}

          <figure className="mt-16 max-w-3xl border-l-2 border-accent pl-6 md:pl-8">
            <blockquote className="font-serif text-2xl font-normal italic leading-snug text-foreground md:text-3xl">
              „{study.quote}"
            </blockquote>
            <figcaption className="mt-5 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">
                {study.quoteAuthor}
              </span>{" "}
              — {study.practice}
            </figcaption>
          </figure>

          <div className="mt-16 flex flex-col items-start gap-4 border-t border-border pt-10 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/erfolgsgeschichten"
              className="text-sm font-medium text-foreground"
            >
              <span className="border-b border-accent/60 pb-0.5">
                ← Alle Erfolgsgeschichten
              </span>
            </Link>
            <Button
              asChild
              size="lg"
              className="rounded-full px-7 text-sm font-semibold tracking-wide"
            >
              <Link href="/gespraech">Situation besprechen</Link>
            </Button>
          </div>
        </div>
      </section>

      <CTA />
    </main>
  )
}
