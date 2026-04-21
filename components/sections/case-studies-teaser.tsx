import Link from "next/link"
import { ChapterContinuation } from "@/components/ui/section-label"
import { caseStudies } from "@/lib/case-studies"

export function CaseStudiesTeaser() {
  return (
    <section
      aria-labelledby="erfolgsgeschichten-title"
      className="bg-background py-16 sm:py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-5 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <ChapterContinuation numeral="iii · ii" label="Erfolgsgeschichten" />
            <h2
              id="erfolgsgeschichten-title"
              className="serif-display mt-6 text-[28px] leading-[1.1] text-foreground sm:text-4xl md:text-5xl"
            >
              Was passiert, wenn Prophylaxe ernst genommen wird.
            </h2>
          </div>
          <Link
            href="/erfolgsgeschichten"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-foreground"
          >
            <span className="border-b border-accent/60 pb-0.5">
              Alle Cases ansehen
            </span>
            <span aria-hidden className="text-accent">
              →
            </span>
          </Link>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-3">
          {caseStudies.map((c) => (
            <Link
              key={c.slug}
              href={`/erfolgsgeschichten/${c.slug}`}
              className="group flex flex-col bg-background p-6 transition-colors hover:bg-secondary/40 sm:p-8"
            >
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
              <h3 className="mt-4 font-serif text-xl leading-snug text-foreground sm:text-2xl">
                {c.title}
              </h3>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted-foreground">
                {c.summary}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground">
                <span className="border-b border-accent/60 pb-0.5">
                  {c.practice}
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
  )
}
