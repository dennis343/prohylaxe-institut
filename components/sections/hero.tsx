"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Calendar, Stethoscope, Sparkles } from "lucide-react"

const stats = [
  { value: "150+", label: "Praxen begleitet", icon: Users },
  { value: "3–18 Mon.", label: "Mentoring", icon: Calendar },
  { value: "Zahnärzte", label: "Für", icon: Stethoscope },
  { value: "möglich", label: "Förderung", icon: Sparkles },
]

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      <div className="container relative mx-auto px-4 py-20 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium">
            Prophylaxe Institut by Minka
          </Badge>
          
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Nachhaltiger Praxiserfolg mit System
          </h1>
          
          <p className="mt-4 text-lg font-medium text-primary md:text-xl">
            Kontinuität statt einmaliger Impulse
          </p>
          
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
            Entdecken Sie, wie Sie mit Deutschlands führendem Prophylaxe-System und persönlichem Mentoring von Minka wachsen – und echte Freiheit statt Chaos gewinnen.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="w-full px-8 py-6 text-lg sm:w-auto" asChild>
              <a href="/kontakt#warteliste">Auf die Warteliste</a>
            </Button>
            <Button size="lg" variant="outline" className="w-full px-8 py-6 text-lg sm:w-auto" asChild>
              <a href="/kontakt">Erstgespräch anfragen</a>
            </Button>
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center rounded-2xl bg-card p-6 shadow-sm ring-1 ring-border"
            >
              <stat.icon className="mb-2 h-6 w-6 text-primary" />
              <span className="text-2xl font-bold text-foreground md:text-3xl">{stat.value}</span>
              <span className="mt-1 text-sm text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
