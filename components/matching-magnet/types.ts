export type BusinessType = 'B2B' | 'B2C' | 'Gemischt'
export type ContactType = 'B2B' | 'B2C'
export type EmployeeRange = '1-9' | '10-49' | '50-249' | '250-999' | '1000+'
export type CampaignStatus = 'offen' | 'aktiv' | 'abgeschlossen' | 'abgelehnt'
export type TxType =
  | 'freigabe'
  | 'kampagne_ausgabe'
  | 'kampagne_einnahme'
  | 'plattform_gebuehr'
  | 'token_kauf'

export interface UserPermissions {
  canShareContacts: boolean
  canCreateCampaigns: boolean
  canAcceptCampaigns: boolean
  canSeeMarketplace: boolean
  canSeeTransactions: boolean
}

export interface User {
  id: string
  name: string
  role: string
  email: string
  businessType: BusinessType
  industries: string[]
  b2bPercentage: number
  description: string
  specialty: string
  tokens: number
  isAdmin: boolean
  isActive: boolean
  permissions: UserPermissions
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
  employeeRange: EmployeeRange | null
  hasEmail: boolean
  hasPhone: boolean
  hasAddress: boolean
  lastUpdated: string
  qualityScore: number
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
  | { type: 'ADMIN_UPDATE_PERMISSIONS'; userId: string; permissions: Partial<UserPermissions> }
  | { type: 'ADMIN_SET_ACTIVE'; userId: string; isActive: boolean }
  | { type: 'ADMIN_SET_ADMIN'; userId: string; isAdmin: boolean }
  | { type: 'ADMIN_CREATE_USER'; user: User; contacts: Contact[] }
