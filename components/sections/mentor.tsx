import { Check } from "lucide-react"

const highlights = [
  "Mehrfach erprobte Erfolgsprinzipien",
  "Umsetzung in über 150 unterschiedlichen Praxen",
  "Langfristige Begleitung statt einmaliger Impulse",
  "Prophylaxe mit System – Beratung, die begeistert",
]

export function Mentor() {
  return (
    <section className="bg-background py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 md:grid-cols-2">
            {/* Image Placeholder */}
            <div className="relative mx-auto w-full max-w-md">
              <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 to-primary/5 ring-1 ring-border">
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
                      <span className="text-4xl font-bold text-primary">M</span>
                    </div>
                    <p className="text-lg font-semibold text-foreground">Minka</p>
                    <p className="text-sm text-muted-foreground">Ihre Mentorin</p>
                  </div>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-2xl bg-primary/10" />
              <div className="absolute -left-4 -top-4 h-16 w-16 rounded-xl bg-primary/5" />
            </div>

            {/* Content */}
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                Ihre Mentorin
              </p>
              <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                Minka
              </h2>
              <p className="mt-2 text-lg font-medium text-muted-foreground">
                Gründerin Prophylaxe Institut – Dozentin bei WissensReich Academy
              </p>

              <div className="mt-6 space-y-4 text-muted-foreground">
                <p>
                  Ich habe bereits über 150 Praxen zu nachhaltigem Wachstum verholfen – und ich kann Ihnen nicht nur zeigen, wie es geht, sondern ich setze mit Ihnen gemeinsam um.
                </p>
                <p>
                  Ich weiß genau, wie es sich anfühlt, wenn die Praxis stagniert und man das Gefühl hat, alles selbst machen zu müssen. Aber ich habe auch gesehen, wie Praxen mit dem richtigen Mentoring und bewährten Prinzipien aufblühen.
                </p>
              </div>

              <ul className="mt-8 space-y-3">
                {highlights.map((item) => (
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
        </div>
      </div>
    </section>
  )
}
