import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, X, ArrowRight } from "lucide-react"

const beforeItems = [
  "Moderate Deckungsbeiträge",
  "Hohe Mitarbeiterfluktuation",
  "Wenig Zeit für Patienten und Familie",
]

const afterItems = [
  "Deutlich höhere Umsätze und wiederkehrende Patienten",
  "Stabiles, engagiertes Team, das mitdenkt",
  "Mehr eigene Freiheit und Lebensqualität",
]

export function Transformation() {
  return (
    <section className="bg-secondary/50 py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Die Transformation
          </h2>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-2">
          {/* Before Card */}
          <Card className="relative overflow-hidden border-0 bg-card shadow-sm">
            <div className="absolute left-0 top-0 h-full w-1.5 bg-muted-foreground/30" />
            <CardHeader>
              <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Vorher
              </p>
              <CardTitle className="text-2xl text-foreground">Es geht irgendwie</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6 text-muted-foreground">
                Chaos in den Abläufen, ungenutzte Potenziale in der Prophylaxe, überlastete Praxisinhaber und ein Team, das nicht voll ausgeschöpft wird.
              </p>
              <ul className="space-y-3">
                {beforeItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <X className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* After Card */}
          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-primary/10 to-primary/5 shadow-sm ring-2 ring-primary/20">
            <div className="absolute left-0 top-0 h-full w-1.5 bg-primary" />
            <CardHeader>
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                Nachher
              </p>
              <CardTitle className="text-2xl text-foreground">Praxis auf Autopilot</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-6 text-muted-foreground">
                Strukturierte Prozesse, maximal genutzte Prophylaxe-Potenziale, entlastete Praxisinhaber und ein hochmotiviertes, eigenverantwortliches Team.
              </p>
              <ul className="space-y-3">
                {afterItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Arrow indicator for mobile */}
        <div className="mt-6 flex justify-center md:hidden">
          <ArrowRight className="h-8 w-8 rotate-90 text-primary" />
        </div>
      </div>
    </section>
  )
}
