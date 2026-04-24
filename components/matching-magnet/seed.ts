import type { User, Contact, Campaign, Transaction, ContactType, EmployeeRange } from './types'
import { computeQualityScore } from './quality'

export const INDUSTRIES = [
  'Finanzen',
  'IT & Software',
  'Marketing & Werbung',
  'Versicherungen',
  'Immobilien',
  'Gesundheit & Medizin',
  'Handel & Retail',
  'Produktion & Industrie',
  'Bildung & Coaching',
  'Consulting & Beratung',
]

export const SEGMENTS = [
  'Startup',
  'KMU',
  'Mittelstand',
  'Konzern',
  'Freelancer',
  'Endkunde',
]

export const EMPLOYEE_RANGES: EmployeeRange[] = ['1-9', '10-49', '50-249', '250-999', '1000+']

const EMPLOYEE_BY_SEGMENT: Record<string, [EmployeeRange, number][]> = {
  Startup:     [['1-9', 6], ['10-49', 3], ['50-249', 1]],
  KMU:         [['10-49', 6], ['1-9', 2], ['50-249', 2]],
  Mittelstand: [['50-249', 6], ['10-49', 3], ['250-999', 1]],
  Konzern:     [['1000+', 5], ['250-999', 4], ['50-249', 1]],
  Freelancer:  [['1-9', 10]],
  Endkunde:    [['1-9', 10]],
}

function lcg(seed: number) {
  let s = seed >>> 0
  return () => {
    s = Math.imul(s, 1664525) + 1013904223
    return (s >>> 0) / 0xffffffff
  }
}

function weightedPick<T>(items: [T, number][], rng: number): T {
  const total = items.reduce((a, [, w]) => a + w, 0)
  let cursor = rng * total
  for (const [item, w] of items) {
    cursor -= w
    if (cursor <= 0) return item
  }
  return items[items.length - 1][0]
}

function daysAgo(n: number) {
  return new Date(Date.now() - n * 86_400_000).toISOString()
}

interface ContactDist {
  industryWeights: [string, number][]
  segmentWeights: [string, number][]
  b2bRatio: number
  emailRate: number
  phoneRate: number
  addressRate: number
  freshRate: number   // probability of lastUpdated < 3 months
  recentRate: number  // probability of lastUpdated < 12 months
}

function generateContacts(
  ownerId: string,
  total: number,
  sharedCount: number,
  dist: ContactDist,
  seedBase: number,
): Contact[] {
  const rand = lcg(seedBase)
  return Array.from({ length: total }, (_, i) => {
    const industry = weightedPick(dist.industryWeights, rand())
    const segment = weightedPick(dist.segmentWeights, rand())
    const type: ContactType = rand() < dist.b2bRatio ? 'B2B' : 'B2C'

    const empWeights = EMPLOYEE_BY_SEGMENT[segment] ?? EMPLOYEE_BY_SEGMENT.KMU
    const employeeRange: EmployeeRange | null =
      type === 'B2C' && segment === 'Endkunde' ? null : weightedPick(empWeights, rand())

    const hasEmail = rand() < dist.emailRate
    const hasPhone = rand() < dist.phoneRate
    const hasAddress = rand() < dist.addressRate

    const r = rand()
    const lastUpdated =
      r < dist.freshRate
        ? daysAgo(Math.floor(rand() * 89 + 1))
        : r < dist.recentRate
        ? daysAgo(Math.floor(rand() * 270 + 90))
        : daysAgo(Math.floor(rand() * 365 + 365))

    const qualityScore = computeQualityScore({
      hasEmail, hasPhone, hasAddress, industry, segment, employeeRange, lastUpdated,
    })

    return {
      id: `c-${ownerId}-${i}`,
      ownerId,
      code: `KT-${String(seedBase * 100 + i).padStart(5, '0')}`,
      industry,
      segment,
      type,
      employeeRange,
      hasEmail,
      hasPhone,
      hasAddress,
      lastUpdated,
      qualityScore,
      isShared: i < sharedCount,
      addedAt: daysAgo(Math.floor(rand() * 180 + 10)),
    }
  })
}

// ── Users ───────────────────────────────────────────────────────────────────

export const SEED_USERS: User[] = [
  {
    id: 'miriam',
    name: 'Miriam König',
    role: 'Finanzcoach & Plattformbetreiberin',
    businessType: 'Gemischt',
    industries: ['Finanzen', 'Bildung & Coaching'],
    b2bPercentage: 60,
    description:
      'Ich begleite Selbstständige und KMU auf dem Weg zu finanzieller Klarheit. Als Betreiberin dieser Plattform verdiene ich 6 % Transaktionsgebühr auf jede Kampagne.',
    tokens: 156,
    isAdmin: true,
    initials: 'MK',
    color: 'bg-emerald-600',
  },
  {
    id: 'anna',
    name: 'Anna Bauer',
    role: 'Finanzmaklerin',
    businessType: 'Gemischt',
    industries: ['Finanzen', 'Versicherungen', 'Immobilien'],
    b2bPercentage: 70,
    description:
      'Ich vermittle maßgeschneiderte Finanz- und Versicherungslösungen für Privatkunden und Unternehmen. Mein Netzwerk umfasst vor allem KMU und Freiberufler.',
    tokens: 450,
    isAdmin: false,
    initials: 'AB',
    color: 'bg-blue-600',
  },
  {
    id: 'ben',
    name: 'Ben Hartmann',
    role: 'IT-Berater',
    businessType: 'B2B',
    industries: ['IT & Software', 'Consulting & Beratung'],
    b2bPercentage: 92,
    description:
      'Digitalisierungsberatung für mittelständische Unternehmen. Spezialisiert auf ERP-Einführungen, Cloud-Migration und IT-Sicherheit.',
    tokens: 280,
    isAdmin: false,
    initials: 'BH',
    color: 'bg-violet-600',
  },
  {
    id: 'clara',
    name: 'Clara Wendt',
    role: 'Marketing-Agentur',
    businessType: 'B2B',
    industries: ['Marketing & Werbung', 'Handel & Retail', 'Bildung & Coaching'],
    b2bPercentage: 78,
    description:
      'Full-Service-Agentur für digitales Marketing: Social Media, Performance Ads und Content-Strategie für KMU und Online-Händler.',
    tokens: 320,
    isAdmin: false,
    initials: 'CW',
    color: 'bg-orange-500',
  },
  {
    id: 'david',
    name: 'David Krause',
    role: 'Versicherungsmakler',
    businessType: 'Gemischt',
    industries: ['Versicherungen', 'Immobilien', 'Gesundheit & Medizin'],
    b2bPercentage: 50,
    description:
      'Unabhängiger Versicherungsmakler mit Fokus auf Gewerbe- und Privatversicherungen. Langjährige Kundenbeziehungen in der Region.',
    tokens: 95,
    isAdmin: false,
    initials: 'DK',
    color: 'bg-rose-600',
  },
]

// ── Contacts ─────────────────────────────────────────────────────────────────

export const SEED_CONTACTS: Contact[] = [
  ...generateContacts('anna', 200, 150, {
    industryWeights: [['Finanzen', 4], ['Versicherungen', 3], ['Immobilien', 2], ['Consulting & Beratung', 1]],
    segmentWeights: [['KMU', 4], ['Mittelstand', 3], ['Freelancer', 2], ['Endkunde', 1]],
    b2bRatio: 0.70,
    emailRate: 0.87,
    phoneRate: 0.63,
    addressRate: 0.72,
    freshRate: 0.55,
    recentRate: 0.80,
  }, 11),

  ...generateContacts('ben', 120, 100, {
    industryWeights: [['IT & Software', 6], ['Consulting & Beratung', 2], ['Produktion & Industrie', 2]],
    segmentWeights: [['Startup', 3], ['KMU', 4], ['Mittelstand', 2], ['Konzern', 1]],
    b2bRatio: 0.92,
    emailRate: 0.94,
    phoneRate: 0.78,
    addressRate: 0.52,
    freshRate: 0.72,
    recentRate: 0.90,
  }, 22),

  ...generateContacts('clara', 180, 130, {
    industryWeights: [['Marketing & Werbung', 5], ['Handel & Retail', 3], ['Bildung & Coaching', 2]],
    segmentWeights: [['KMU', 5], ['Mittelstand', 3], ['Freelancer', 2]],
    b2bRatio: 0.78,
    emailRate: 0.82,
    phoneRate: 0.58,
    addressRate: 0.61,
    freshRate: 0.48,
    recentRate: 0.75,
  }, 33),

  ...generateContacts('david', 80, 60, {
    industryWeights: [['Versicherungen', 5], ['Immobilien', 3], ['Gesundheit & Medizin', 2]],
    segmentWeights: [['KMU', 4], ['Endkunde', 4], ['Freelancer', 2]],
    b2bRatio: 0.50,
    emailRate: 0.91,
    phoneRate: 0.86,
    addressRate: 0.82,
    freshRate: 0.38,
    recentRate: 0.65,
  }, 44),

  ...generateContacts('miriam', 40, 30, {
    industryWeights: [['Finanzen', 6], ['Bildung & Coaching', 4]],
    segmentWeights: [['KMU', 4], ['Freelancer', 4], ['Endkunde', 2]],
    b2bRatio: 0.60,
    emailRate: 0.78,
    phoneRate: 0.62,
    addressRate: 0.65,
    freshRate: 0.55,
    recentRate: 0.78,
  }, 55),
]

// ── Campaigns ────────────────────────────────────────────────────────────────

export const SEED_CAMPAIGNS: Campaign[] = [
  {
    id: 'camp-1',
    creatorId: 'clara',
    targetOwnerId: 'anna',
    subject: 'Webinar-Einladung: Finanzplanung für KMU',
    message:
      'Sehr geehrte Damen und Herren,\n\nim Auftrag von Anna Bauer, Ihrer vertrauten Finanzmaklerin, lade ich Sie herzlich zu unserem kostenlosen Webinar „Smarte Finanzplanung für KMU" ein.\n\nDiese Einladung erreicht Sie, weil Anna Bauer glaubt, dass unser Angebot einen echten Mehrwert für Ihr Unternehmen bietet.\n\nAnmeldung: webinar.beispiel.de',
    filterIndustry: 'Finanzen',
    filterSegment: 'KMU',
    filterType: 'B2B',
    contactCount: 58,
    tokensTotal: 58,
    platformFee: 4,
    ownerReceives: 54,
    status: 'abgeschlossen',
    createdAt: daysAgo(90),
    completedAt: daysAgo(60),
  },
  {
    id: 'camp-2',
    creatorId: 'ben',
    targetOwnerId: 'clara',
    subject: 'IT-Sicherheits-Audit für Marketing-Agenturen',
    message:
      'Guten Tag,\n\nin Kooperation mit Clara Wendt erhalten Sie heute ein exklusives Angebot: Als IT-Berater mit Spezialisierung auf DSGVO-konforme Systeme biete ich Marketing-Agenturen einen günstigen Sicherheits-Audit an.\n\nClara hat dieses Angebot persönlich geprüft und empfiehlt es ihren Geschäftskontakten.',
    filterIndustry: 'Marketing & Werbung',
    filterSegment: null,
    filterType: 'B2B',
    contactCount: 75,
    tokensTotal: 75,
    platformFee: 5,
    ownerReceives: 70,
    status: 'aktiv',
    createdAt: daysAgo(30),
    completedAt: null,
  },
  {
    id: 'camp-3',
    creatorId: 'david',
    targetOwnerId: 'anna',
    subject: 'BU-Versicherung – exklusive Konditionen für Freiberufler',
    message:
      'Liebe Freiberuflerin, lieber Freiberufler,\n\nAnna Bauer, die ich als kompetente Netzwerkpartnerin sehr schätze, hat mir erlaubt, Sie über folgendes Angebot zu informieren:\n\nAls unabhängiger Versicherungsmakler habe ich exklusive BU-Konditionen ohne Gesundheitsfragebogen ausgehandelt – gültig bis Monatsende.',
    filterIndustry: null,
    filterSegment: 'Freelancer',
    filterType: 'B2C',
    contactCount: 32,
    tokensTotal: 32,
    platformFee: 2,
    ownerReceives: 30,
    status: 'offen',
    createdAt: daysAgo(7),
    completedAt: null,
  },
]

// ── Transactions ──────────────────────────────────────────────────────────────

export const SEED_TRANSACTIONS: Transaction[] = [
  { id: 'tx-0a', userId: 'anna',   type: 'freigabe',           amount:  150, description: '150 Kontakte freigegeben (Erstbefüllung)',            createdAt: daysAgo(100), relatedCampaignId: null },
  { id: 'tx-0b', userId: 'anna',   type: 'freigabe',           amount:   50, description: '50 weitere Kontakte freigegeben',                     createdAt: daysAgo(45),  relatedCampaignId: null },
  { id: 'tx-0c', userId: 'ben',    type: 'freigabe',           amount:  100, description: '100 Kontakte freigegeben (Erstbefüllung)',             createdAt: daysAgo(95),  relatedCampaignId: null },
  { id: 'tx-0d', userId: 'ben',    type: 'token_kauf',         amount:  100, description: '100 Token gekauft (10,00 €)',                          createdAt: daysAgo(50),  relatedCampaignId: null },
  { id: 'tx-0e', userId: 'clara',  type: 'freigabe',           amount:  130, description: '130 Kontakte freigegeben (Erstbefüllung)',             createdAt: daysAgo(120), relatedCampaignId: null },
  { id: 'tx-0f', userId: 'clara',  type: 'token_kauf',         amount:  100, description: '100 Token gekauft (10,00 €)',                          createdAt: daysAgo(35),  relatedCampaignId: null },
  { id: 'tx-0g', userId: 'david',  type: 'freigabe',           amount:   60, description: '60 Kontakte freigegeben (Erstbefüllung)',              createdAt: daysAgo(80),  relatedCampaignId: null },
  { id: 'tx-0h', userId: 'david',  type: 'token_kauf',         amount:   67, description: '67 Token gekauft (6,70 €)',                            createdAt: daysAgo(20),  relatedCampaignId: null },
  { id: 'tx-0i', userId: 'miriam', type: 'freigabe',           amount:   30, description: '30 Kontakte freigegeben',                             createdAt: daysAgo(110), relatedCampaignId: null },
  // Campaign 1 (abgeschlossen)
  { id: 'tx-1a', userId: 'clara',  type: 'kampagne_ausgabe',   amount:  -58, description: 'Kampagne „Webinar-Einladung" gestartet (58 Kontakte)', createdAt: daysAgo(90),  relatedCampaignId: 'camp-1' },
  { id: 'tx-1b', userId: 'anna',   type: 'kampagne_einnahme',  amount:   54, description: 'Kampagne von Clara Wendt abgeschlossen',               createdAt: daysAgo(60),  relatedCampaignId: 'camp-1' },
  { id: 'tx-1c', userId: 'miriam', type: 'plattform_gebuehr',  amount:    4, description: 'Plattformgebühr (6 %) – Kampagne camp-1',              createdAt: daysAgo(60),  relatedCampaignId: 'camp-1' },
  // Campaign 2 (aktiv)
  { id: 'tx-2a', userId: 'ben',    type: 'kampagne_ausgabe',   amount:  -75, description: 'Kampagne „IT-Sicherheits-Audit" gestartet (75 K.)',    createdAt: daysAgo(30),  relatedCampaignId: 'camp-2' },
  { id: 'tx-2b', userId: 'clara',  type: 'kampagne_einnahme',  amount:   70, description: 'Kampagne von Ben Hartmann angenommen',                 createdAt: daysAgo(28),  relatedCampaignId: 'camp-2' },
  { id: 'tx-2c', userId: 'miriam', type: 'plattform_gebuehr',  amount:    5, description: 'Plattformgebühr (6 %) – Kampagne camp-2',              createdAt: daysAgo(28),  relatedCampaignId: 'camp-2' },
  // Campaign 3 (offen – tokens on hold)
  { id: 'tx-3a', userId: 'david',  type: 'kampagne_ausgabe',   amount:  -32, description: 'Kampagne „BU-Versicherung Freiberufler" gesendet',     createdAt: daysAgo(7),   relatedCampaignId: 'camp-3' },
]
