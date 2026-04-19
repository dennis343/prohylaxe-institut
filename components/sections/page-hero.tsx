import type { ReactNode } from "react"
import Link from "next/link"

type Crumb = { href: string; label: string }

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  actions,
}: {
  eyebrow?: string
  title: string
  description?: string
  breadcrumbs?: Crumb[]
  actions?: ReactNode
}) {
  return (
    <section className="relative overflow-hidden bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-[-20%] h-[440px] w-[440px] rounded-full bg-[radial-gradient(closest-side,var(--accent),transparent_70%)] opacity-[0.08] blur-3xl"
      />
      <div className="relative mx-auto max-w-5xl px-5 pb-20 pt-16 md:px-8 md:pb-28 md:pt-24">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <>
            <nav
              aria-label="Breadcrumb"
              className="mb-10 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground"
            >
              <Link href="/" className="transition-colors hover:text-accent">
                Start
              </Link>
              {breadcrumbs.map((crumb, i) => (
                <span key={crumb.href} className="flex items-center gap-2">
                  <span aria-hidden className="text-accent/60">
                    /
                  </span>
                  {i === breadcrumbs.length - 1 ? (
                    <span className="text-foreground">{crumb.label}</span>
                  ) : (
                    <Link
                      href={crumb.href}
                      className="transition-colors hover:text-accent"
                    >
                      {crumb.label}
                    </Link>
                  )}
                </span>
              ))}
            </nav>
            <script
              type="application/ld+json"
              suppressHydrationWarning
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "BreadcrumbList",
                  itemListElement: [
                    {
                      "@type": "ListItem",
                      position: 1,
                      name: "Start",
                      item: "https://prophylaxe-institut.de/",
                    },
                    ...breadcrumbs.map((c, idx) => ({
                      "@type": "ListItem",
                      position: idx + 2,
                      name: c.label,
                      item: `https://prophylaxe-institut.de${c.href}`,
                    })),
                  ],
                }),
              }}
            />
          </>
        )}

        <div className="max-w-3xl">
          {eyebrow && <div className="eyebrow">{eyebrow}</div>}
          <h1 className="serif-display mt-6 text-balance text-4xl leading-[1.05] text-foreground md:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mt-8 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              {description}
            </p>
          )}
          {actions && (
            <div className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-6">
              {actions}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
