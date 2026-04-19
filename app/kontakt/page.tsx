import type { Metadata } from "next"
import { PageHero } from "@/components/sections/page-hero"
import { ContactForm } from "@/components/contact-form"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, Clock, ShieldCheck } from "lucide-react"

export const metadata: Metadata = {
  title: "Kontakt & Warteliste",
  description:
    "Fordern Sie jetzt Ihr unverbindliches Erstgespräch an oder lassen Sie sich auf die Warteliste des Prophylaxe Instituts by Minka setzen.",
  alternates: { canonical: "/kontakt" },
}

const info = [
  {
    icon: Mail,
    title: "E-Mail",
    value: "kontakt@prophylaxe-institut.de",
    href: "mailto:kontakt@prophylaxe-institut.de",
  },
  {
    icon: Phone,
    title: "Telefon",
    value: "Rückruf anfragen",
    href: "tel:+49",
  },
  {
    icon: Clock,
    title: "Antwortzeit",
    value: "in der Regel 1–2 Werktage",
  },
  {
    icon: ShieldCheck,
    title: "100 % unverbindlich",
    value: "Kein Automatismus, kein Druck",
  },
]

export default function KontaktPage() {
  return (
    <main>
      <PageHero
        eyebrow="Kontakt"
        title="Sprechen wir über Ihre Praxis"
        description="Ob Erstgespräch oder Warteliste – wir nehmen uns Zeit für Ihre Situation. Ihre Anfrage wird persönlich von Minka oder einem Mitglied des Teams beantwortet."
        breadcrumbs={[{ href: "/kontakt", label: "Kontakt" }]}
      />

      <section className="bg-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <Card id="warteliste" className="scroll-mt-24 border-0 bg-card shadow-sm">
                <CardContent className="p-8 md:p-10">
                  <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                    Warteliste &amp; Erstgespräch
                  </p>
                  <h2 className="mt-2 text-balance text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                    Jetzt unverbindlich vormerken lassen
                  </h2>
                  <p className="mt-3 text-muted-foreground">
                    Tragen Sie sich in wenigen Sekunden ein. Wir melden uns persönlich – ohne Massen-Funnel, ohne automatisierte Nachfass-Kaskade.
                  </p>
                  <div className="mt-8">
                    <ContactForm variant="waitlist" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <aside className="space-y-4">
              {info.map((i) => (
                <Card key={i.title} className="border-0 bg-card shadow-sm">
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                      <i.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{i.title}</p>
                      {i.href ? (
                        <a
                          href={i.href}
                          className="text-sm text-muted-foreground hover:text-foreground"
                        >
                          {i.value}
                        </a>
                      ) : (
                        <p className="text-sm text-muted-foreground">{i.value}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card className="border-0 bg-gradient-to-br from-primary/10 to-primary/5 shadow-sm ring-1 ring-primary/20">
                <CardContent className="p-6">
                  <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                    Pionierbonus
                  </p>
                  <p className="mt-2 text-foreground">
                    Wartelisten-Teilnehmer erhalten bevorzugte Starttermine, frühzeitige Informationen und einen exklusiven Pionierbonus.
                  </p>
                </CardContent>
              </Card>
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}
