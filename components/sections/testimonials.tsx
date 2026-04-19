import { Card, CardContent } from "@/components/ui/card"
import { Quote, Star } from "lucide-react"

const testimonials = [
  {
    quote:
      "Das Prophylaxe-System hat unsere Praxis grundlegend verändert. Mein Team arbeitet eigenständig, die Patienten sind begeistert – und die Auswertungen sprechen für sich.",
    name: "Dr. Anna Schmidt",
    role: "Zahnärztin aus München",
    initials: "AS",
  },
  {
    quote:
      "Endlich ein Mentoring, das nicht bei der Theorie stehen bleibt. Minka kommt regelmäßig in die Umsetzung – und genau das macht den Unterschied.",
    name: "Dr. Markus Becker",
    role: "Praxisinhaber, Stuttgart",
    initials: "MB",
  },
  {
    quote:
      "Wir haben in 12 Monaten unsere Prophylaxe-Umsätze verdoppelt – ohne dass ich selbst mehr Behandlungszeit aufbringen musste. Das war der eigentliche Wendepunkt.",
    name: "Dr. Lena Wagner",
    role: "Praxisinhaberin, Hamburg",
    initials: "LW",
  },
]

export function Testimonials() {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Stimmen aus der Praxis
          </p>
          <h2 className="mt-3 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Was unsere Mentees berichten
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Echte Erfahrungen von Praxen, die mit uns ihren Weg zu nachhaltigem Erfolg gegangen sind.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <Card key={t.name} className="border-0 bg-card shadow-sm transition-shadow hover:shadow-md">
              <CardContent className="flex h-full flex-col p-8">
                <Quote className="h-8 w-8 text-primary/30" />
                <div className="mt-3 flex gap-0.5 text-primary">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-pretty text-foreground">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
