import type { ReactNode } from "react"

export type JournalPost = {
  slug: string
  title: string
  excerpt: string
  date: string
  dateIso: string
  readingTime: string
  category: string
  heroImage?: string
  draft?: boolean
  body: ReactNode
}

/**
 * Journal-Beiträge werden als statische TSX-Module verwaltet. Jeder Eintrag
 * hat ein eigenes Modul unter `content/journal/<slug>.tsx`, das einen `post`
 * exportiert. Draft-Artikel (`draft: true`) erscheinen weder im Index noch
 * in Sitemap, bleiben aber direkt unter ihrer URL erreichbar — so können wir
 * Text-Gerüste vorbauen, bevor Minka den finalen Feinschliff liefert.
 */
import { post as prophylaxeProfitcenter } from "@/content/journal/prophylaxe-als-profitcenter"
import { post as bafaFoerderung } from "@/content/journal/bafa-foerderung-schritt-fuer-schritt"
import { post as zmpTeam } from "@/content/journal/zmp-team-entwickeln-und-halten"

export const journalPosts: JournalPost[] = [
  prophylaxeProfitcenter,
  bafaFoerderung,
  zmpTeam,
]

export function getJournalPost(slug: string): JournalPost | undefined {
  return journalPosts.find((p) => p.slug === slug)
}

export function listPublishedPosts(): JournalPost[] {
  return journalPosts
    .filter((p) => !p.draft)
    .sort((a, b) => (a.dateIso < b.dateIso ? 1 : -1))
}
