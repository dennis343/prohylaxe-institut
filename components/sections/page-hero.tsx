import type { ReactNode } from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

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
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      <div className="container relative mx-auto px-4 pb-16 pt-12 md:pb-24 md:pt-20">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center gap-1 text-sm text-muted-foreground"
          >
            <Link href="/" className="hover:text-foreground">
              Start
            </Link>
            {breadcrumbs.map((crumb, i) => (
              <span key={crumb.href} className="flex items-center gap-1">
                <ChevronRight className="h-4 w-4" />
                {i === breadcrumbs.length - 1 ? (
                  <span className="text-foreground">{crumb.label}</span>
                ) : (
                  <Link href={crumb.href} className="hover:text-foreground">
                    {crumb.label}
                  </Link>
                )}
              </span>
            ))}
          </nav>
        )}

        <div className="mx-auto max-w-3xl text-center">
          {eyebrow && (
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              {eyebrow}
            </p>
          )}
          <h1 className="mt-3 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
              {description}
            </p>
          )}
          {actions && (
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              {actions}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
