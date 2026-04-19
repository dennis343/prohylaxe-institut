import type { Metadata } from "next"
import { PageHero } from "@/components/sections/page-hero"
import { ContactForm } from "@/components/contact-form"

export const metadata: Metadata = {
  title: "Kontakt & Warteliste",
  description:
    "Fordern Sie jetzt Ihr unverbindliches Erstgespräch an oder lassen Sie sich auf die Warteliste des Prophylaxe-Instituts setzen.",
  alternates: { canonical: "/kontakt" },
}

const info = [
  {
    label: "E-Mail",
    value: "info@prophylaxe-institut.de",
    href: "mailto:info@prophylaxe-institut.de",
  },
  {
    label: "Antwortzeit",
    value: "in der Regel 1–2 Werktage",
  },
  {
    label: "Anschrift",
    value: "Grenzstraße 144 · 47441 Moers",
  },
  {
    label: "Vorgehen",
    value: "100 % unverbindlich · kein automatischer Funnel",
  },
]

export default function KontaktPage() {
  return (
    <main>
      <PageHero
        eyebrow="Kontakt"
        title="Sprechen wir über Ihre Praxis."
        description="Ob Erstgespräch oder Warteliste — wir nehmen uns Zeit für Ihre Situation. Ihre Anfrage wird persönlich von Minka oder einem Mitglied des Teams beantwortet."
        breadcrumbs={[{ href: "/kontakt", label: "Kontakt" }]}
      />

      <section className="bg-background pb-24 md:pb-32">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="grid gap-16 lg:grid-cols-[7fr_5fr] lg:gap-20">
            <div id="warteliste" className="scroll-mt-24">
              <div className="border-t border-border pt-12">
                <div className="eyebrow">Warteliste &amp; Erstgespräch</div>
                <h2 className="serif-display mt-6 text-3xl leading-[1.1] text-foreground md:text-4xl">
                  Jetzt unverbindlich vormerken lassen.
                </h2>
                <p className="lead mt-6 max-w-xl">
                  Tragen Sie sich in wenigen Sekunden ein. Wir melden uns
                  persönlich — ohne Massen-Funnel, ohne automatisierte
                  Nachfass-Kaskade.
                </p>
              </div>

              <div className="mt-12">
                <ContactForm variant="waitlist" />
              </div>
            </div>

            <aside className="border-t border-border pt-12 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                Direktkontakt
              </p>
              <ul className="mt-6 space-y-6">
                {info.map((i) => (
                  <li key={i.label}>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                      {i.label}
                    </p>
                    {i.href ? (
                      <a
                        href={i.href}
                        className="mt-2 block font-serif text-lg text-foreground hover:text-accent md:text-xl"
                      >
                        {i.value}
                      </a>
                    ) : (
                      <p className="mt-2 font-serif text-lg text-foreground md:text-xl">
                        {i.value}
                      </p>
                    )}
                  </li>
                ))}
              </ul>

              <div className="mt-12 border-l-2 border-accent bg-secondary/40 px-6 py-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  Pionierbonus
                </p>
                <p className="mt-3 text-base leading-relaxed text-foreground">
                  Wartelisten-Teilnehmer erhalten bevorzugte Starttermine,
                  frühzeitige Informationen und einen exklusiven
                  Pionier­bonus.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}
