import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingDown, Target, Cog, Clock, Users, Compass } from "lucide-react"

const challenges = [
  {
    icon: TrendingDown,
    title: "Wirtschaftliche Unsicherheit",
    description: "Sie wissen nicht, wie Sie Ihre Praxis wirtschaftlich gesund weiterentwickeln können.",
  },
  {
    icon: Target,
    title: "Mangelnde Prophylaxe-Nutzung",
    description: "Prophylaxe wird nicht strategisch als Umsatz- und Bindungsfaktor genutzt.",
  },
  {
    icon: Cog,
    title: "Komplizierte Abläufe",
    description: "Abläufe sind ineffizient und erzielen keine höheren Deckungsbeiträge.",
  },
  {
    icon: Clock,
    title: "Abhängigkeit von Behandlungszeit",
    description: "Sie können nur wachsen, wenn Sie selbst mehr Behandlungszeit aufbringen.",
  },
  {
    icon: Users,
    title: "Team-Herausforderungen",
    description: "Es fehlt ein starkes, mitdenkendes Team, das Sie entlastet.",
  },
  {
    icon: Compass,
    title: "Fehlende Langzeitstrategie",
    description: "Sie suchen nach einer langfristigen Begleitung, die über kurzfristige Lösungen hinausgeht.",
  },
]

export function Challenges() {
  return (
    <section className="bg-secondary/50 py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Die Realität in vielen Praxen
          </p>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Kämpfen Sie mit diesen Herausforderungen?
          </h2>
          <p className="mt-4 text-pretty text-lg text-muted-foreground">
            Viele Zahnärzte und Praxisinhaber fühlen sich allein gelassen. Einzelmaßnahmen oder einmalige Coachings reichen nicht aus, um nachhaltigen Erfolg zu sichern.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {challenges.map((challenge) => (
            <Card key={challenge.title} className="border-0 bg-card shadow-sm transition-shadow hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <challenge.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg text-foreground">{challenge.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{challenge.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="mt-12 text-center text-lg font-semibold text-foreground">
          Es ist Zeit für einen echten Wandel – mit System statt Zufall.
        </p>
      </div>
    </section>
  )
}
