import { Hero } from "@/components/sections/hero"
import { Challenges } from "@/components/sections/challenges"
import { Approach } from "@/components/sections/approach"
import { Transformation } from "@/components/sections/transformation"
import { Mentor } from "@/components/sections/mentor"
import { Process } from "@/components/sections/process"
import { Programs } from "@/components/sections/programs"
import { Waitlist } from "@/components/sections/waitlist"
import { Funding } from "@/components/sections/funding"
import { CTA } from "@/components/sections/cta"
import { Footer } from "@/components/sections/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Challenges />
      <Approach />
      <Transformation />
      <Mentor />
      <Process />
      <Programs />
      <Waitlist />
      <Funding />
      <CTA />
      <Footer />
    </main>
  )
}
