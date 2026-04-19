import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { PageHero } from "@/components/sections/page-hero"
import { CTA } from "@/components/sections/cta"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { listPublishedPosts } from "@/lib/journal"

export const metadata: Metadata = {
  title: "Journal — Impulse für strategische Prophylaxe",
  description:
    "Redaktionelle Impulse aus 150+ Praxisbegleitungen: Prophylaxe als Profitcenter, BAFA-Förderung, Team-Entwicklung. Keine Listicle, kein Hype.",
  alternates: { canonical: "/journal" },
}

const siteUrl = "https://prophylaxe-institut.de"

export default function JournalIndexPage() {
  const posts = listPublishedPosts()

  const blogJsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${siteUrl}/journal`,
    name: "Prophylaxe-Institut · Journal",
    url: `${siteUrl}/journal`,
    publisher: { "@id": `${siteUrl}#organization` },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      description: p.excerpt,
      datePublished: p.dateIso,
      url: `${siteUrl}/journal/${p.slug}`,
    })),
  }

  return (
    <main>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <PageHero
        eyebrow="Journal"
        title="Impulse aus 150+ Praxisbegleitungen."
        description="Strategie, Förderung, Team — redaktionelle Beiträge, an denen wir kontinuierlich schreiben. Jeder Artikel entsteht aus konkreten Beobachtungen der Arbeit mit Praxen."
        breadcrumbs={[{ href: "/journal", label: "Journal" }]}
      />

      <section className="bg-background py-14 sm:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-5 md:px-8">
          <div className="divide-y divide-border border-y border-border">
            {posts.map((p) => (
              <article
                key={p.slug}
                className="grid gap-6 py-10 sm:py-12 md:grid-cols-[4fr_8fr] md:gap-10"
              >
                {p.heroImage && (
                  <Link
                    href={`/journal/${p.slug}`}
                    className="group relative block aspect-[4/3] w-full overflow-hidden rounded-md bg-secondary"
                  >
                    <Image
                      src={p.heroImage}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </Link>
                )}
                <div className="flex flex-col">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                    <span className="text-accent">{p.category}</span>
                    <span aria-hidden className="text-accent/60">·</span>
                    <span>{p.date}</span>
                    <span aria-hidden className="text-accent/60">·</span>
                    <span>{p.readingTime}</span>
                  </div>
                  <h2 className="mt-4 font-serif text-2xl leading-snug text-foreground sm:text-3xl">
                    <Link
                      href={`/journal/${p.slug}`}
                      className="transition-colors hover:text-accent"
                    >
                      {p.title}
                    </Link>
                  </h2>
                  <p className="mt-4 flex-1 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
                    {p.excerpt}
                  </p>
                  <Link
                    href={`/journal/${p.slug}`}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground"
                  >
                    <span className="border-b border-accent/60 pb-0.5">
                      Weiterlesen
                    </span>
                    <span aria-hidden className="text-accent">
                      →
                    </span>
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {posts.length === 0 && (
            <p className="py-10 text-base leading-relaxed text-muted-foreground">
              Unser Journal-Archiv wird gerade aufgebaut. Die ersten Artikel
              erscheinen in Kürze.
            </p>
          )}

          <aside className="mt-16 rounded-lg border border-border bg-secondary/40 p-6 sm:p-8">
            <div className="grid gap-6 md:grid-cols-[7fr_5fr] md:items-center md:gap-10">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                  Newsletter
                </p>
                <p className="mt-3 font-serif text-lg italic text-foreground sm:text-xl">
                  Neue Journal-Beiträge direkt in Ihren Posteingang — alle 2–3
                  Wochen, keine Verkaufsmails.
                </p>
              </div>
              <NewsletterSignup source="journal-index" variant="inline" />
            </div>
          </aside>
        </div>
      </section>

      <CTA />
    </main>
  )
}
