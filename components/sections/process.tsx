import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MessageCircle, Heart, Sparkles, UserCheck } from "lucide-react"

const processSteps = [
  {
    icon: MessageCircle,
    badge: "Patientenverständnis",
    title: "Klare Kommunikation von Leistungen",
    description: "Patienten verstehen, warum Prophylaxe sinnvoll ist – nicht nur, was gemacht wird.",
  },
  {
    icon: Heart,
    badge: "Vertrauensaufbau",
    title: "Wirkungsvolle Patientenkommunikation",
    description: "Die richtige Sprache schafft Vertrauen, Sicherheit und Bereitschaft zur Mitarbeit.",
  },
  {
    icon: Sparkles,
    badge: "Kommunikation",
    title: "Charmantes Anbieten sinnvoller Zusatzleistungen",
    description: "Zusatzleistungen werden beraten, nicht verkauft – ehrlich, wertschätzend und passend.",
  },
  {
    icon: UserCheck,
    badge: "Individuelle Betreuung",
    title: "Beratung statt Waschanlage",
    description: "Mundhygiene wird zum Coaching und persönlichen Dialog.",
  },
]

export function Process() {
  return (
    <section className="bg-secondary/50 py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Für Zahnärztinnen, Zahnärzte, Praxisinhaber und motivierte Teams
          </p>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Prophylaxe wird zum Kommunikations- und Serviceprozess
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Ein Prozess, der Patienten begeistert und Praxiserfolg steigert.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-2">
          {processSteps.map((step, index) => (
            <Card key={step.title} className="group border-0 bg-card shadow-sm transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <step.icon className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                    {step.badge}
                  </span>
                </div>
                <CardTitle className="text-lg text-foreground">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
