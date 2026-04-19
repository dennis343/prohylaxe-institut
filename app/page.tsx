import { Hero } from "@/components/sections/hero"
import { Challenges } from "@/components/sections/challenges"
import { Approach } from "@/components/sections/approach"
import { Transformation } from "@/components/sections/transformation"
import { PracticeVisuals } from "@/components/sections/practice-visuals"
import { Mentor } from "@/components/sections/mentor"
import { Process } from "@/components/sections/process"
import { Programs } from "@/components/sections/programs"
import { Waitlist } from "@/components/sections/waitlist"
import { Funding } from "@/components/sections/funding"
import { Testimonials } from "@/components/sections/testimonials"
import { LadiesTeaser } from "@/components/sections/ladies-teaser"
import { CTA } from "@/components/sections/cta"
import { HomeJsonLd } from "@/components/seo/home-json-ld"

export default function Home() {
  return (
    <main>
      <HomeJsonLd />
      <Hero />
      <section id="herausforderungen">
        <Challenges />
      </section>
      <section id="ansatz">
        <Approach />
      </section>
      <Transformation />
      <PracticeVisuals />
      <section id="mentorin">
        <Mentor />
      </section>
      <Process />
      <section id="programme">
        <Programs />
      </section>
      <section id="warteliste">
        <Waitlist />
      </section>
      <section id="foerderung">
        <Funding />
      </section>
      <section id="stimmen">
        <Testimonials />
      </section>
      <LadiesTeaser />
      <CTA />
    </main>
  )
}
