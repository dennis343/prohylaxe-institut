import type { MetadataRoute } from "next"

const baseUrl = "https://prophylaxe-institut.de"

const routes = [
  { url: "", priority: 1.0 },
  { url: "/programme", priority: 0.9 },
  { url: "/mentor", priority: 0.8 },
  { url: "/kontakt", priority: 0.9 },
  { url: "/impressum", priority: 0.3 },
  { url: "/datenschutz", priority: 0.3 },
  { url: "/agb", priority: 0.3 },
  { url: "/widerruf", priority: 0.3 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  return routes.map((r) => ({
    url: `${baseUrl}${r.url}`,
    lastModified,
    changeFrequency: "monthly",
    priority: r.priority,
  }))
}
