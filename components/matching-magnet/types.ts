export type BusinessType = 'B2B' | 'B2C' | 'Gemischt'
export type ContactType = 'B2B' | 'B2C'
export type CampaignStatus = 'offen' | 'aktiv' | 'abgeschlossen' | 'abgelehnt'
export type TxType =
  | 'freigabe'
  | 'kampagne_ausgabe'
  | 'kampagne_einnahme'
  | 'plattform_gebuehr'
  | 'token_kauf'

export interface User {
  id: string
  name: string
  role: string
  businessType: BusinessType
  industries: string[]
  b2bPercentage: number
  description: string
  tokens: number
  isAdmin: boolean
  initials: string
  color: string
}

export interface Contact {
  id: string
  ownerId: string
  code: string
  industry: string
  segment: string
  type: ContactType
  completeness: number
  isShared: boolean
  addedAt: string
}

export interface Campaign {
  id: string
  creatorId: string
  targetOwnerId: string
  subject: string
  message: string
  filterIndustry: string | null
  filterSegment: string | null
  filterType: ContactType | null
  contactCount: number
  tokensTotal: number
  platformFee: number
  ownerReceives: number
  status: CampaignStatus
  createdAt: string
  completedAt: string | null
}

export interface Transaction {
  id: string
  userId: string
  type: TxType
  amount: number
  description: string
  createdAt: string
  relatedCampaignId: string | null
}

export interface AppState {
  currentUserId: string
  users: User[]
  contacts: Contact[]
  campaigns: Campaign[]
  transactions: Transaction[]
}

export type AppAction =
  | { type: 'SWITCH_USER'; userId: string }
  | { type: 'UPDATE_PROFILE'; userId: string; patch: Partial<Pick<User, 'role' | 'businessType' | 'industries' | 'b2bPercentage' | 'description'>> }
  | { type: 'ADD_CONTACTS'; contacts: Contact[]; transaction: Transaction }
  | { type: 'TOGGLE_SHARE'; contactId: string; transaction: Transaction | null }
  | { type: 'CREATE_CAMPAIGN'; campaign: Campaign; spendTx: Transaction }
  | { type: 'RESPOND_CAMPAIGN'; campaignId: string; accept: boolean; transactions: Transaction[] }
  | { type: 'COMPLETE_CAMPAIGN'; campaignId: string }
  | { type: 'BUY_TOKENS'; userId: string; amount: number; transaction: Transaction }
