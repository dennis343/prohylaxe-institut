export type QualityTier = 'platin' | 'gold' | 'silber' | 'bronze' | 'basis'

export interface QualityBreakdown {
  total: number
  kontaktdaten: number  // max 50: email 25, phone 15, address 10
  klassifizierung: number  // max 35: industry 15, segment 10, employeeRange 10
  aktualitaet: number  // max 15
}

type ScoreInput = {
  hasEmail: boolean
  hasPhone: boolean
  hasAddress: boolean
  industry: string
  segment: string
  employeeRange: string | null
  lastUpdated: string
}

export function computeBreakdown(c: ScoreInput): QualityBreakdown {
  let kontaktdaten = 0
  if (c.hasEmail) kontaktdaten += 25
  if (c.hasPhone) kontaktdaten += 15
  if (c.hasAddress) kontaktdaten += 10

  let klassifizierung = 0
  if (c.industry) klassifizierung += 15
  if (c.segment) klassifizierung += 10
  if (c.employeeRange) klassifizierung += 10

  const months =
    (Date.now() - new Date(c.lastUpdated).getTime()) / (1000 * 60 * 60 * 24 * 30)
  const aktualitaet = months < 3 ? 15 : months < 12 ? 8 : 3

  return {
    total: kontaktdaten + klassifizierung + aktualitaet,
    kontaktdaten,
    klassifizierung,
    aktualitaet,
  }
}

export function computeQualityScore(c: ScoreInput): number {
  return computeBreakdown(c).total
}

export function qualityTier(score: number): QualityTier {
  if (score >= 85) return 'platin'
  if (score >= 70) return 'gold'
  if (score >= 50) return 'silber'
  if (score >= 30) return 'bronze'
  return 'basis'
}

export const TIER_LABEL: Record<QualityTier, string> = {
  platin: 'Platin',
  gold: 'Gold',
  silber: 'Silber',
  bronze: 'Bronze',
  basis: 'Basis',
}

export const TIER_COLOR: Record<QualityTier, string> = {
  platin: 'bg-violet-100 text-violet-800 border-violet-200',
  gold: 'bg-amber-100 text-amber-800 border-amber-200',
  silber: 'bg-slate-100 text-slate-600 border-slate-200',
  bronze: 'bg-orange-100 text-orange-700 border-orange-200',
  basis: 'bg-red-50 text-red-700 border-red-200',
}

export const TIER_STARS: Record<QualityTier, number> = {
  platin: 5,
  gold: 4,
  silber: 3,
  bronze: 2,
  basis: 1,
}
