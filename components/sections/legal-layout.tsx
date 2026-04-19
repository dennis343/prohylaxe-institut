import type { ReactNode } from "react"
import { PageHero } from "@/components/sections/page-hero"

export function LegalLayout({
  eyebrow,
  title,
  description,
  breadcrumbs,
  children,
}: {
  eyebrow?: string
  title: string
  description?: string
  breadcrumbs?: { href: string; label: string }[]
  children: ReactNode
}) {
  return (
    <main>
      <PageHero
        eyebrow={eyebrow ?? "Rechtliches"}
        title={title}
        description={description}
        breadcrumbs={breadcrumbs}
      />
      <section className="bg-background py-16 md:py-20">
        <div className="container mx-auto px-4">
          <article className="prose prose-slate mx-auto max-w-3xl text-foreground [&_a]:text-primary [&_a]:underline-offset-2 hover:[&_a]:underline [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-foreground [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-foreground [&_p]:mt-4 [&_p]:text-muted-foreground [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:text-muted-foreground [&_li]:mt-1 [&_strong]:text-foreground">
            {children}
          </article>
        </div>
      </section>
    </main>
  )
}
