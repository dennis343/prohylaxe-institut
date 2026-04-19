import type { MetadataRoute } from "next"
import { caseStudies } from "@/lib/case-studies"
import { listPublishedPosts } from "@/lib/journal"

const baseUrl = "https://prophylaxe-institut.de"

const staticRoutes = [
  { url: "", priority: 1.0 },
  { url: "/programme", priority: 0.9 },
  { url: "/mentor", priority: 0.8 },
  { url: "/gespraech", priority: 0.9 },
  { url: "/erfolgsgeschichten", priority: 0.8 },
  { url: "/journal", priority: 0.7 },
  { url: "/prophylaxe-intensivtag", priority: 0.7 },
  { url: "/foerder-check", priority: 0.8 },
  { url: "/ressourcen/prophylaxe-checkliste", priority: 0.6 },
  { url: "/kontakt", priority: 0.9 },
  { url: "/ladies", priority: 0.4 },
  { url: "/impressum", priority: 0.3 },
  { url: "/datenschutz", priority: 0.3 },
  { url: "/agb", priority: 0.3 },
  { url: "/widerruf", priority: 0.3 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  const staticEntries = staticRoutes.map((r) => ({
    url: `${baseUrl}${r.url}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: r.priority,
  }))

  const caseEntries = caseStudies.map((c) => ({
    url: `${baseUrl}/erfolgsgeschichten/${c.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  const journalEntries = listPublishedPosts().map((p) => ({
    url: `${baseUrl}/journal/${p.slug}`,
    lastModified: new Date(p.dateIso),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }))

  return [...staticEntries, ...caseEntries, ...journalEntries]
}
