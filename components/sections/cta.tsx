import { Button } from "@/components/ui/button"

export function CTA() {
  return (
    <section id="kontakt" className="bg-primary py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl">
            Investieren Sie in eine Zukunft, in der Ihre Praxis floriert
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-primary-foreground/80">
            Wirtschaftlich gesund wachsen, Prophylaxe als strategischen Umsatztreiber nutzen, ein motiviertes Team aufbauen – und dabei mehr Freiheit gewinnen.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button 
              size="lg" 
              variant="secondary" 
              className="w-full px-8 py-6 text-lg font-semibold sm:w-auto"
              asChild
            >
              <a href="#kontakt">Auf die Warteliste</a>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="w-full border-primary-foreground/30 bg-transparent px-8 py-6 text-lg font-semibold text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground sm:w-auto"
              asChild
            >
              <a href="#kontakt">Erstgespräch anfragen</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
