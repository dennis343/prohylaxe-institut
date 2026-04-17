import { Card, CardContent } from "@/components/ui/card"
import { Check, Quote } from "lucide-react"

const fundingBenefits = [
  "Unterstützung bei der Beantragung von Zuschüssen",
  "Komplette organisatorische Abwicklung",
  "Wartelisten-Teilnehmer haben einen zusätzlichen Vorteil",
]

export function Funding() {
  return (
    <section className="bg-secondary/50 py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <div className="text-center">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              Förderung möglich
            </span>
            <h2 className="mt-6 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Wir kümmern uns um die gesamte Abwicklung
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Für Praxisberatung und begleitete Umsetzung sind häufig öffentliche Zuschüsse möglich. Das Beste daran: Wir übernehmen die komplette organisatorische Abwicklung für interessierte Praxen durch unser Fördermittel-Concierge-Team.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {fundingBenefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-2 rounded-full bg-card px-4 py-2 shadow-sm ring-1 ring-border"
              >
                <Check className="h-5 w-5 text-primary" />
                <span className="font-medium text-foreground">{benefit}</span>
              </div>
            ))}
          </div>

          <Card className="mt-12 border-0 bg-card shadow-sm">
            <CardContent className="p-8">
              <div className="relative">
                <Quote className="absolute -top-2 left-0 h-8 w-8 text-primary/30" />
                <blockquote className="pl-10">
                  <p className="text-lg italic text-foreground">
                    &ldquo;Die Unterstützung bei den Förderanträgen war Gold wert. Ich hätte das alleine nie geschafft!&rdquo;
                  </p>
                  <footer className="mt-4">
                    <p className="font-semibold text-foreground">Dr. Anna Schmidt</p>
                    <p className="text-sm text-muted-foreground">Zahnärztin aus München</p>
                  </footer>
                </blockquote>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
