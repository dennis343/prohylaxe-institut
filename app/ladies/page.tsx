import type { Metadata } from "next"
import Link from "next/link"
import { PageHero } from "@/components/sections/page-hero"
import { LadiesApplicationForm } from "@/components/ladies-application-form"

export const metadata: Metadata = {
  title: "All the Single Ladies — April-Spezial",
  description:
    "Eine augenzwinkernde Liebeserklärung an die ZFAs, ZMPs und DHs, die Tag für Tag Patienten strahlen lassen — und selbst viel zu oft allein nach Hause gehen. Ein April-Scherz vom Prophylaxe-Institut.",
  alternates: { canonical: "/ladies" },
  robots: {
    index: true,
    follow: true,
  },
}

const reasons = [
  {
    title: "Arbeitstage bis in den Abend.",
    text: "Prophylaxe endet selten pünktlich. Wer bis 19 Uhr Mundhygiene coacht, schafft es kaum noch auf ein zweites Date.",
  },
  {
    title: "Radius zehn Kilometer.",
    text: "Weg von der Praxis, zurück nach Hause. Der Aktionsradius für zufällige Begegnungen ist … überschaubar.",
  },
  {
    title: "Praxis als Familie.",
    text: "Der Zahnarzt ist vergeben, das Team weiblich, der Patient in Behandlung — romantisch gesehen: Sackgasse.",
  },
  {
    title: "Zu hohe Standards.",
    text: "Wer täglich perfekten Biofilm-Abtrag sieht, erkennt Beläge aus zehn Metern. Das Gegenüber wird streng mustergeprüft.",
  },
  {
    title: "Keine Zeit für Apps.",
    text: "Zwischen Recall, Tagesabschluss und Feierabendyoga bleibt für Tinder maximal ein müdes Rechts-Swipen.",
  },
  {
    title: "Zu gut, um verfügbar zu sein.",
    text: "Strukturiert, empathisch, humorvoll — Männer vermuten einfach, jemand so Großartiges sei längst vergeben.",
  },
]

export default function LadiesPage() {
  return (
    <main>
      <PageHero
        eyebrow="April-Spezial · mit Augenzwinkern"
        title={`All the Single Ladies — ein Liebes­brief an unsere Prophylaxe-Profis.`}
        description="Sie sind charmant, kompetent und der Grund, warum ganze Praxen funktionieren — und trotzdem zu oft allein. Zeit, das einmal liebevoll zu korrigieren."
        breadcrumbs={[{ href: "/ladies", label: "All the Single Ladies" }]}
      />

      <section className="bg-background pb-8 md:pb-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-5 md:px-8">
          <div className="rounded-md border border-accent/40 bg-accent/5 px-5 py-4 text-[13px] leading-relaxed text-foreground sm:px-6 sm:py-5 sm:text-sm">
            <strong className="font-semibold">April-Scherz:</strong> Diese
            Seite ist eine augenzwinkernde Kampagne zum 1. April. Wir
            vermitteln niemanden, speichern keine Angaben und leiten nichts
            weiter. Wer eine seriöse Anfrage hat —{" "}
            <Link
              href="/kontakt"
              className="text-accent underline-offset-4 hover:underline"
            >
              hier entlang
            </Link>
            .
          </div>
        </div>
      </section>

      <section className="bg-background py-16 sm:py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-5 md:px-8">
          <div className="max-w-3xl">
            <div className="eyebrow">Warum eigentlich?</div>
            <h2 className="serif-display mt-6 text-[28px] leading-[1.1] text-foreground sm:text-3xl md:text-5xl">
              Sechs Gründe, warum viele ZFAs{" "}
              <em className="italic text-accent">zu Unrecht</em> Single sind.
            </h2>
            <p className="lead mt-6 max-w-2xl">
              Alles liebevoll überzeichnet — basierend auf ehrlichen
              Beobachtungen aus über 150 begleiteten Praxen.
            </p>
          </div>

          <ol className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-2">
            {reasons.map((r, i) => (
              <li
                key={r.title}
                className="flex flex-col gap-3 bg-background p-6 sm:p-8"
              >
                <span className="font-serif text-xs italic text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-serif text-lg font-normal tracking-tight text-foreground sm:text-xl md:text-2xl">
                  {r.title}
                </h3>
                <p className="text-[15px] leading-relaxed text-muted-foreground">
                  {r.text}
                </p>
              </li>
            ))}
          </ol>

          <figure className="mt-16 max-w-3xl border-l-2 border-accent pl-5 sm:pl-6 md:pl-8">
            <blockquote className="font-serif text-xl font-normal italic leading-snug text-foreground sm:text-2xl md:text-3xl">
              „Die schönsten Frauen der Welt sitzen in Zahnarztpraxen — und
              bleiben abends allein, weil sie schon den ganzen Tag Männer
              angelächelt haben, die den Mund nicht zubekommen haben."
            </blockquote>
            <figcaption className="mt-5 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Minka</span> —
              augenzwinkernd
            </figcaption>
          </figure>
        </div>
      </section>

      <section
        id="bewerbung"
        className="scroll-mt-24 bg-secondary/40 py-16 sm:py-20 md:py-28"
      >
        <div className="mx-auto max-w-3xl px-4 sm:px-5 md:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Die Bewerbung</div>
            <h2 className="serif-display mt-6 text-[28px] leading-[1.1] text-foreground sm:text-3xl md:text-5xl">
              Beschreiben Sie sich —{" "}
              <em className="italic text-accent">oder Ihre Kollegin</em>.
            </h2>
            <p className="lead mt-5">
              Bewerben Sie sich (oder die schönste Kollegin Ihrer Praxis) auf
              männliche Begleitung. Mit Augenzwinkern. Ohne Konsequenzen. Rein
              literarisch.
            </p>
          </div>

          <div className="mt-12 rounded-lg border border-border bg-background p-6 sm:p-10 md:p-12">
            <LadiesApplicationForm />
          </div>

          <p className="mt-10 text-center text-[12px] uppercase tracking-[0.22em] text-muted-foreground">
            Keine Datenspeicherung · Keine Vermittlung · 100 % April
          </p>
        </div>
      </section>

      <section className="bg-background py-16 sm:py-20 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-5 md:px-8">
          <div className="rounded-lg border border-border bg-card p-6 sm:p-10 md:p-12">
            <div className="eyebrow">PS — aus dem Ernst gemeinten Teil</div>
            <h3 className="serif-display mt-5 text-2xl leading-[1.15] text-foreground sm:text-3xl md:text-4xl">
              Wir meinen es ernst —{" "}
              <em className="italic text-accent">mit der Wertschätzung.</em>
            </h3>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              ZFAs, ZMPs und DHs sind das Rückgrat jeder erfolgreichen
              Zahnarztpraxis. Wir unterstützen Praxen dabei, diese Fachkräfte
              zu binden, weiterzuentwickeln und sichtbar wertzuschätzen — mit
              strukturiertem Prophylaxe-Mentoring, das Arbeit leichter und
              Teams stärker macht.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/programme"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold tracking-wide text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Zum Programm für Praxen
              </Link>
              <Link
                href="/mentor"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-foreground/15 px-6 py-3 text-sm font-medium tracking-wide text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                Mentorin kennenlernen
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
