'use client'

import { createContext, useContext, useReducer, type ReactNode } from 'react'
import type { AppState, AppAction, Contact, Campaign, Transaction } from './types'
import { SEED_USERS, SEED_CONTACTS, SEED_CAMPAIGNS, SEED_TRANSACTIONS } from './seed'

const PLATFORM_FEE_RATE = 0.06

export function calcFees(tokens: number) {
  const fee = Math.max(1, Math.round(tokens * PLATFORM_FEE_RATE))
  return { platformFee: fee, ownerReceives: tokens - fee }
}

const initialState: AppState = {
  currentUserId: 'anna',
  users: SEED_USERS,
  contacts: SEED_CONTACTS,
  campaigns: SEED_CAMPAIGNS,
  transactions: SEED_TRANSACTIONS,
}

function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SWITCH_USER':
      return { ...state, currentUserId: action.userId }

    case 'UPDATE_PROFILE':
      return {
        ...state,
        users: state.users.map(u =>
          u.id === action.userId ? { ...u, ...action.patch } : u,
        ),
      }

    case 'ADD_CONTACTS':
      return {
        ...state,
        contacts: [...state.contacts, ...action.contacts],
        transactions: [...state.transactions, action.transaction],
        users: state.users.map(u =>
          u.id === action.transaction.userId
            ? { ...u, tokens: u.tokens + action.transaction.amount }
            : u,
        ),
      }

    case 'TOGGLE_SHARE': {
      const contact = state.contacts.find(c => c.id === action.contactId)
      if (!contact) return state
      const nowShared = !contact.isShared
      return {
        ...state,
        contacts: state.contacts.map(c =>
          c.id === action.contactId ? { ...c, isShared: nowShared } : c,
        ),
        transactions: action.transaction
          ? [...state.transactions, action.transaction]
          : state.transactions,
        users:
          action.transaction
            ? state.users.map(u =>
                u.id === action.transaction!.userId
                  ? { ...u, tokens: u.tokens + action.transaction!.amount }
                  : u,
              )
            : state.users,
      }
    }

    case 'CREATE_CAMPAIGN': {
      const creator = state.users.find(u => u.id === action.campaign.creatorId)!
      return {
        ...state,
        campaigns: [...state.campaigns, action.campaign],
        transactions: [...state.transactions, action.spendTx],
        users: state.users.map(u =>
          u.id === creator.id
            ? { ...u, tokens: u.tokens + action.spendTx.amount }
            : u,
        ),
      }
    }

    case 'RESPOND_CAMPAIGN': {
      const camp = state.campaigns.find(c => c.id === action.campaignId)!
      const newStatus: Campaign['status'] = action.accept ? 'aktiv' : 'abgelehnt'

      let users = state.users
      if (action.accept) {
        action.transactions.forEach(tx => {
          users = users.map(u =>
            u.id === tx.userId ? { ...u, tokens: u.tokens + tx.amount } : u,
          )
        })
      } else {
        // Refund creator
        users = users.map(u =>
          u.id === camp.creatorId
            ? { ...u, tokens: u.tokens + camp.tokensTotal }
            : u,
        )
      }

      return {
        ...state,
        campaigns: state.campaigns.map(c =>
          c.id === action.campaignId ? { ...c, status: newStatus } : c,
        ),
        transactions: [...state.transactions, ...action.transactions],
        users,
      }
    }

    case 'COMPLETE_CAMPAIGN':
      return {
        ...state,
        campaigns: state.campaigns.map(c =>
          c.id === action.campaignId
            ? { ...c, status: 'abgeschlossen', completedAt: new Date().toISOString() }
            : c,
        ),
      }

    case 'BUY_TOKENS':
      return {
        ...state,
        transactions: [...state.transactions, action.transaction],
        users: state.users.map(u =>
          u.id === action.userId
            ? { ...u, tokens: u.tokens + action.amount }
            : u,
        ),
      }

    default:
      return state
  }
}

interface StoreCtx {
  state: AppState
  dispatch: React.Dispatch<AppAction>
  currentUser: AppState['users'][0]
}

const StoreContext = createContext<StoreCtx | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const currentUser = state.users.find(u => u.id === state.currentUserId)!
  return (
    <StoreContext.Provider value={{ state, dispatch, currentUser }}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}

let txCounter = 1000
export function nextTxId() {
  return `tx-${++txCounter}`
}
let campCounter = 100
export function nextCampId() {
  return `camp-${++campCounter}`
}
let contactCounter = 10000
export function nextContactId(ownerId: string) {
  return `c-${ownerId}-gen-${++contactCounter}`
}
