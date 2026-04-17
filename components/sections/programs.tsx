import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const programs = [
  {
    number: "01",
    title: "Reinschnuppern",
    duration: "3 Monate",
    description: "Für erste Potenziale und strukturierten Start. Sie lernen das System kennen und identifizieren die größten Hebel in Ihrer Praxis.",
  },
  {
    number: "02",
    title: "Umsetzer-Programm",
    duration: "6 Monate",
    description: "Systematischer Aufbau von Prophylaxe, Team und Abläufen. Hier entsteht die Struktur, die Ihre Praxis nachhaltig verändert.",
  },
  {
    number: "03",
    title: "Elite-Training",
    duration: "18 Monate",
    description: "Langfristige Etablierung als echte Renditequelle auf Autopilot und strategische Teamentwicklung. Ihr Praxiserfolg wird selbsttragend.",
  },
]

export function Programs() {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Ihr Weg zum Erfolg
          </p>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Unsere Mentoring-Stufen: Passend für jede Praxisphase
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Wir bieten ein Wachstumsmentoring für ausgewählte Dentalpraxen in drei aufeinander aufbauenden Stufen an.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-6xl gap-8 md:grid-cols-3">
          {programs.map((program, index) => (
            <Card 
              key={program.number} 
              className={`relative overflow-hidden border-0 shadow-sm transition-all hover:shadow-lg ${
                index === 2 ? "bg-gradient-to-b from-primary/10 to-transparent ring-2 ring-primary/20" : "bg-card"
              }`}
            >
              <div className="absolute right-4 top-4 text-6xl font-bold text-primary/10">
                {program.number}
              </div>
              <CardHeader className="relative pb-2">
                <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {program.duration}
                </span>
                <CardTitle className="mt-4 text-xl text-foreground">{program.title}</CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <p className="text-muted-foreground">{program.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="mt-10 text-center text-muted-foreground">
          Individuelles Angebot – Konditionsgestaltung gemäß Ihren Zielen.
        </p>
      </div>
    </section>
  )
}
