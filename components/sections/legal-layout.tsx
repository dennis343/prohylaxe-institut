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
      <section className="bg-background pb-24 md:pb-32">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <article className="border-t border-border pt-12 text-[15px] leading-relaxed text-muted-foreground [&_a]:text-accent [&_a]:underline-offset-4 hover:[&_a]:underline [&_h2]:mt-14 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:font-light [&_h2]:tracking-tight [&_h2]:text-foreground md:[&_h2]:text-3xl [&_h3]:mt-10 [&_h3]:font-serif [&_h3]:text-xl [&_h3]:font-light [&_h3]:tracking-tight [&_h3]:text-foreground [&_p]:mt-5 [&_ul]:mt-5 [&_ul]:list-none [&_ul]:space-y-2 [&_ul]:pl-0 [&_li]:relative [&_li]:pl-6 [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[0.7em] [&_li]:before:h-px [&_li]:before:w-3 [&_li]:before:bg-accent [&_strong]:font-medium [&_strong]:text-foreground">
            {children}
          </article>
        </div>
      </section>
    </main>
  )
}
