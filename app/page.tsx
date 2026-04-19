import { Hero } from "@/components/sections/hero"
import { Challenges } from "@/components/sections/challenges"
import { Approach } from "@/components/sections/approach"
import { Transformation } from "@/components/sections/transformation"
import { Mentor } from "@/components/sections/mentor"
import { Process } from "@/components/sections/process"
import { Programs } from "@/components/sections/programs"
import { Waitlist } from "@/components/sections/waitlist"
import { Funding } from "@/components/sections/funding"
import { Testimonials } from "@/components/sections/testimonials"
import { CTA } from "@/components/sections/cta"

export default function Home() {
  return (
    <main>
      <Hero />
      <section id="herausforderungen">
        <Challenges />
      </section>
      <section id="ansatz">
        <Approach />
      </section>
      <Transformation />
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
      <CTA />
    </main>
  )
}
