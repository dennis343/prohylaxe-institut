import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, Clock, Quote } from "lucide-react"

const approaches = [
  {
    icon: TrendingUp,
    title: "Prophylaxe als Renditetreiber",
    description: "Wir etablieren Prophylaxe und Dentalhygiene als dauerhaftes und lukratives Angebot in Ihrer Praxis.",
  },
  {
    icon: Users,
    title: "Team-Entwicklung",
    description: "Ihr Team – insbesondere ZFA und DH-Personal – wird zu tragenden Leistungsträgern entwickelt.",
  },
  {
    icon: Clock,
    title: "Zeitliche Entlastung",
    description: "Praxisinhaber werden zeitlich entlastet und können sich auf das Wesentliche konzentrieren.",
  },
]

export function Approach() {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Unser einzigartiger Ansatz
          </p>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Persönliches Mentoring für nachhaltigen Praxiserfolg
          </h2>
          <p className="mt-4 text-lg font-medium text-muted-foreground">
            Kein Blabla. Vorhersehbarer Erfolg. System statt Chaos.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-3">
          {approaches.map((approach) => (
            <Card key={approach.title} className="border-0 bg-gradient-to-b from-primary/5 to-transparent shadow-sm">
              <CardHeader className="pb-2">
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                  <approach.icon className="h-7 w-7" />
                </div>
                <CardTitle className="text-xl text-foreground">{approach.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{approach.description}</p>
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
  )
}
