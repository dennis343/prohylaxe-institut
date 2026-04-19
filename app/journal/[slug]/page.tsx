import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { PageHero } from "@/components/sections/page-hero"
import { Button } from "@/components/ui/button"
import { CTA } from "@/components/sections/cta"
import { NewsletterSignup } from "@/components/newsletter-signup"
import { journalPosts, getJournalPost, listPublishedPosts } from "@/lib/journal"

const siteUrl = "https://prophylaxe-institut.de"

export function generateStaticParams() {
  return journalPosts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params
  const post = getJournalPost(slug)
  if (!post) return {}
  return {
    title: `${post.title} — Journal`,
    description: post.excerpt,
    alternates: { canonical: `/journal/${post.slug}` },
  }
}

export default async function JournalPostPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params
  const post = getJournalPost(slug)
  if (!post) notFound()

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.dateIso,
    author: { "@id": `${siteUrl}#minka` },
    publisher: { "@id": `${siteUrl}#organization` },
    mainEntityOfPage: `${siteUrl}/journal/${post.slug}`,
    image: post.heroImage ? `${siteUrl}${post.heroImage}` : undefined,
    articleSection: post.category,
  }

  const others = listPublishedPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2)

  return (
    <main>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <PageHero
        eyebrow={`${post.category} · ${post.date} · ${post.readingTime}`}
        title={post.title}
        description={post.excerpt}
        breadcrumbs={[
          { href: "/journal", label: "Journal" },
          { href: `/journal/${post.slug}`, label: post.category },
        ]}
      />

      <article className="bg-background pb-16 sm:pb-20 md:pb-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-5 md:px-8">
          {post.heroImage && (
            <div className="relative mb-12 aspect-[16/9] w-full overflow-hidden rounded-lg bg-secondary">
              <Image
                src={post.heroImage}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 768px"
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="prose-journal">{post.body}</div>

          <aside className="mt-14 rounded-lg border border-accent/25 bg-accent/5 p-6 sm:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
              Newsletter
            </p>
            <p className="mt-3 font-serif text-lg italic text-foreground sm:text-xl">
              Folgeartikel direkt in den Posteingang — alle 2–3 Wochen.
            </p>
            <div className="mt-5">
              <NewsletterSignup source={`journal-${post.slug}`} variant="inline" />
            </div>
          </aside>

          <div className="mt-16 flex flex-col items-start gap-4 border-t border-border pt-10 sm:flex-row sm:items-center sm:justify-between">
            <Link
              href="/journal"
              className="text-sm font-medium text-foreground"
            >
              <span className="border-b border-accent/60 pb-0.5">
                ← Zurück zum Journal
              </span>
            </Link>
            <Button
              asChild
              size="lg"
              className="rounded-full px-7 text-sm font-semibold tracking-wide"
            >
              <Link href="/gespraech">Mit Minka sprechen</Link>
            </Button>
          </div>
        </div>
      </article>

      {others.length > 0 && (
        <section className="bg-secondary/40 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-5 md:px-8">
            <h2 className="font-serif text-xl italic text-foreground sm:text-2xl">
              Weiterlesen
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/journal/${o.slug}`}
                  className="group flex flex-col rounded-lg border border-border bg-background p-6 transition-colors hover:border-accent/60"
                >
                  <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                    {o.category}
                  </div>
                  <h3 className="mt-3 font-serif text-lg leading-snug text-foreground sm:text-xl">
                    {o.title}
                  </h3>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-foreground">
                    <span className="border-b border-accent/60 pb-0.5">
                      Artikel öffnen
                    </span>
                    <span
                      aria-hidden
                      className="text-accent transition-transform group-hover:translate-x-1"
                    >
                      →
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTA />
    </main>
  )
}
