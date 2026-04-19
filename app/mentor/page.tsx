import type { Metadata } from "next"
import Link from "next/link"
import { PageHero } from "@/components/sections/page-hero"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Check, Quote, Users, Calendar, Award, Heart } from "lucide-react"
import { CTA } from "@/components/sections/cta"

export const metadata: Metadata = {
  title: "Minka – Ihre Mentorin",
  description:
    "Minka begleitet seit über 150 Praxen nachhaltiges Wachstum. Persönliches Mentoring mit Fokus auf Prophylaxe, Team und Patientenkommunikation.",
  alternates: { canonical: "/mentor" },
}

const stats = [
  { icon: Users, value: "150+", label: "Praxen begleitet" },
  { icon: Calendar, value: "15+ J.", label: "Praxiserfahrung" },
  { icon: Award, value: "Dozentin", label: "WissensReich Academy" },
  { icon: Heart, value: "Mentoring", label: "mit System" },
]

const principles = [
  {
    title: "Kontinuität statt Einmal-Impulse",
    text: "Nachhaltiger Erfolg entsteht durch regelmäßige Begleitung – genauso wie Prophylaxe nur dann wirkt, wenn sie kontinuierlich stattfindet.",
  },
  {
    title: "Umsetzung statt Theorie",
    text: "Wir sprechen nicht nur über Strategien – wir setzen sie gemeinsam in Ihrer Praxis um, Schritt für Schritt, messbar und mit klaren Meilensteinen.",
  },
  {
    title: "Team als Erfolgsfaktor",
    text: "Ein starkes, mitdenkendes Team ist die Grundlage jeder erfolgreichen Praxis. Wir entwickeln Ihr Team zu echten Leistungsträgern.",
  },
  {
    title: "Prophylaxe mit Seele",
    text: "Beratung statt Waschanlage – Mundhygiene wird zu echtem Coaching und persönlichem Dialog. Das spüren Patienten und bleiben.",
  },
]

const credentials = [
  "Gründerin Prophylaxe Institut",
  "Dozentin bei WissensReich Academy",
  "Umsetzungserfahrung in über 150 Praxen",
  "Mehrfach erprobte Erfolgsprinzipien",
  "Persönliche Begleitung statt Massenware",
  "Prophylaxe mit System – Beratung, die begeistert",
]

export default function MentorPage() {
  return (
    <main>
      <PageHero
        eyebrow="Ihre Mentorin"
        title="Minka – persönlich, praxisnah, kompromisslos umsetzungsstark"
        description="Mehr als 150 Praxen habe ich auf dem Weg zu nachhaltigem Wachstum begleitet. Ich zeige Ihnen nicht nur, wie es geht – ich setze mit Ihnen gemeinsam um."
        breadcrumbs={[{ href: "/mentor", label: "Mentorin" }]}
        actions={
          <>
            <Button size="lg" asChild>
              <Link href="/kontakt">Erstgespräch mit Minka</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/programme">Programme ansehen</Link>
            </Button>
          </>
        }
      />

      <section className="bg-background py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div className="relative mx-auto w-full max-w-md">
                <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 ring-1 ring-border">
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center">
                      <div className="mx-auto mb-4 flex h-28 w-28 items-center justify-center rounded-full bg-primary/10">
                        <span className="text-5xl font-bold text-primary">M</span>
                      </div>
                      <p className="text-xl font-semibold text-foreground">Minka</p>
                      <p className="text-sm text-muted-foreground">Ihre Mentorin</p>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-2xl bg-primary/10" />
                <div className="absolute -left-4 -top-4 h-16 w-16 rounded-xl bg-primary/5" />
              </div>

              <div>
                <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  Meine Überzeugung
                </h2>
                <div className="mt-6 space-y-4 text-muted-foreground">
                  <p>
                    Ich weiß genau, wie es sich anfühlt, wenn die Praxis stagniert und man das Gefühl hat, alles selbst machen zu müssen. Aber ich habe auch gesehen, wie Praxen mit dem richtigen Mentoring und bewährten Prinzipien aufblühen.
                  </p>
                  <p>
                    Prophylaxe ist mehr als eine Leistung – sie ist das Herz einer wirtschaftlich gesunden Praxis und das stärkste Bindungsinstrument zum Patienten. Wenn wir Prophylaxe ernst nehmen, verändert sich alles: Umsatz, Team, Patientenerlebnis und nicht zuletzt Ihre persönliche Freiheit.
                  </p>
                  <p>
                    Mit dem Prophylaxe Institut begleite ich Sie dauerhaft – nicht mit Einmal-Impulsen, sondern mit einem System, das Ihre Praxis Stück für Stück auf ein neues Niveau hebt.
                  </p>
                </div>

                <ul className="mt-8 space-y-3">
                  {credentials.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                      <span className="font-medium text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="flex flex-col items-center rounded-2xl bg-card p-6 text-center shadow-sm ring-1 ring-border"
                >
                  <s.icon className="mb-2 h-6 w-6 text-primary" />
                  <span className="text-2xl font-bold text-foreground md:text-3xl">{s.value}</span>
                  <span className="mt-1 text-sm text-muted-foreground">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-secondary/50 py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">Haltung</p>
            <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Wie ich arbeite
            </h2>
          </div>

          <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
            {principles.map((p) => (
              <Card key={p.title} className="border-0 bg-card shadow-sm">
                <CardContent className="p-8">
                  <h3 className="text-lg font-semibold text-foreground">{p.title}</h3>
                  <p className="mt-3 text-muted-foreground">{p.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mx-auto mt-16 max-w-3xl">
            <blockquote className="relative rounded-2xl bg-card p-8 shadow-sm ring-1 ring-border md:p-10">
              <Quote className="absolute -top-4 left-8 h-8 w-8 text-primary" />
              <p className="text-lg italic text-foreground md:text-xl">
                &ldquo;Genau so wie Prophylaxe nur wirkt, wenn sie regelmäßig durchgeführt wird, entfalten auch unternehmerische Erfolgsprinzipien nur dann ihre Wirkung, wenn man kontinuierlich dranbleibt.&rdquo;
              </p>
              <footer className="mt-4 text-right font-semibold text-primary">
                – Minka, Ihre Mentorin
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      <CTA />
    </main>
  )
}
