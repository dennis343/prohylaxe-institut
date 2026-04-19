import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Eye, Gift } from "lucide-react"

const benefits = [
  {
    icon: Calendar,
    title: "Bevorzugte Starttermine",
    description: "Als Wartelisten-Teilnehmer erhalten Sie bevorzugten Zugang und können Ihren Starttermin flexibel abstimmen.",
  },
  {
    icon: Eye,
    title: "Frühzeitige Informationen",
    description: "Exklusive Einblicke und detaillierte Informationen zu den Programminhalten, bevor diese öffentlich zugänglich sind.",
  },
  {
    icon: Gift,
    title: "Exklusiver Pionierbonus",
    description: "Als Dankeschön für frühes Vertrauen erhalten Sie einen besonderen Pionierbonus, der nur für Wartelisten-Teilnehmer verfügbar ist.",
  },
]

export function Waitlist() {
  return (
    <section className="bg-gradient-to-b from-primary/5 to-background py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Jetzt vormerken
            </p>
            <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Sichern Sie sich Ihren Vorsprung: Die Warteliste
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Die Warteliste ist kostenlos und unverbindlich. Es gilt: First come, first served.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {benefits.map((benefit, index) => (
              <Card key={benefit.title} className="relative border-0 bg-card shadow-sm">
                <CardHeader className="pb-2">
                  <span className="absolute right-4 top-4 text-5xl font-bold text-primary/10">
                    {index + 1}
                  </span>
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg text-foreground">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button size="lg" className="px-8 py-6 text-lg" asChild>
              <a href="/kontakt#warteliste">Jetzt unverbindlich vormerken lassen</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
