import { Hero } from "@/components/sections/hero"
import { Challenges } from "@/components/sections/challenges"
import { Approach } from "@/components/sections/approach"
import { Transformation } from "@/components/sections/transformation"
import { Results } from "@/components/sections/results"
import { Mentor } from "@/components/sections/mentor"
import { CaseStudiesTeaser } from "@/components/sections/case-studies-teaser"
import { Process } from "@/components/sections/process"
import { Programs } from "@/components/sections/programs"
import { Funding } from "@/components/sections/funding"
import { CTA } from "@/components/sections/cta"
import { HomeJsonLd } from "@/components/seo/home-json-ld"

export default function Home() {
  return (
    <main>
      <HomeJsonLd />
      <Hero />
      <section id="realitaet" aria-label="Kapitel I – Die Realität">
        <Challenges />
        <Approach />
      </section>
      <section id="transformation" aria-label="Kapitel II – Was sich verändert">
        <Transformation />
        <Results />
      </section>
      <section id="mentorin" aria-label="Kapitel III – Ihre Mentorin">
        <Mentor />
        <CaseStudiesTeaser />
      </section>
      <section id="weg" aria-label="Kapitel IV – Der Weg">
        <Process />
        <section id="programme">
          <Programs />
        </section>
      </section>
      <section id="foerderung" aria-label="Kapitel V – Das Safety-Net">
        <Funding />
      </section>
      <CTA />
    </main>
  )
}
