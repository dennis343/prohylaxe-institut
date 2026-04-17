'use client'

import { useState } from 'react'
import { StoreProvider, useStore } from './store'
import { Dashboard } from './views/Dashboard'
import { Profile } from './views/Profile'
import { Contacts } from './views/Contacts'
import { Marketplace } from './views/Marketplace'
import { Campaigns } from './views/Campaigns'
import { Transactions } from './views/Transactions'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Coins, Magnet } from 'lucide-react'

type Tab = 'dashboard' | 'profil' | 'kontakte' | 'marktplatz' | 'kampagnen' | 'transaktionen'

const TABS: { id: Tab; label: string }[] = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'profil', label: 'Mein Profil' },
  { id: 'kontakte', label: 'Kontakte' },
  { id: 'marktplatz', label: 'Marktplatz' },
  { id: 'kampagnen', label: 'Kampagnen' },
  { id: 'transaktionen', label: 'Transaktionen' },
]

function AppInner() {
  const { state, dispatch, currentUser } = useStore()
  const [activeTab, setActiveTab] = useState<Tab>('dashboard')
  const [campaignTargetId, setCampaignTargetId] = useState<string | undefined>()

  const pendingCampaigns = state.campaigns.filter(
    c => c.targetOwnerId === currentUser.id && c.status === 'offen',
  ).length

  function handleStartCampaign(targetOwnerId: string) {
    setCampaignTargetId(targetOwnerId)
    setActiveTab('kampagnen')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b bg-card shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Magnet className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-bold leading-none">Matching Magnet</p>
                <p className="text-xs text-muted-foreground leading-none mt-0.5">by Miriam König</p>
              </div>
            </div>

            {/* Nav tabs – desktop */}
            <nav className="hidden md:flex items-center gap-1">
              {TABS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-3 py-1.5 rounded-md text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary text-primary-foreground font-medium'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {tab.label}
                  {tab.id === 'kampagnen' && pendingCampaigns > 0 && (
                    <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {pendingCampaigns}
                    </span>
                  )}
                </button>
              ))}
            </nav>

            {/* Right: token balance + user switcher */}
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5">
                <Coins className="h-3.5 w-3.5 text-primary" />
                <span className="text-sm font-bold text-primary">{currentUser.tokens}</span>
                <span className="text-xs text-muted-foreground hidden sm:inline">Token</span>
              </div>

              <div className="flex items-center gap-2">
                <Avatar className="h-7 w-7">
                  <AvatarFallback className={`${currentUser.color} text-white text-xs`}>
                    {currentUser.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:block">
                  <Select
                    value={currentUser.id}
                    onValueChange={id => dispatch({ type: 'SWITCH_USER', userId: id })}
                  >
                    <SelectTrigger className="h-8 text-xs border-0 bg-transparent p-0 pr-6 font-medium focus:ring-0">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {state.users.map(u => (
                        <SelectItem key={u.id} value={u.id}>
                          <span className="flex items-center gap-2">
                            <span className={`inline-flex h-5 w-5 items-center justify-center rounded-full ${u.color} text-white text-xs`}>
                              {u.initials}
                            </span>
                            {u.name}
                            {u.isAdmin && <Badge variant="outline" className="text-xs py-0 px-1">Admin</Badge>}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground -mt-0.5">{currentUser.role}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile nav */}
          <div className="flex md:hidden gap-1 pb-2 overflow-x-auto">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-3 py-1 rounded text-xs whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground font-medium'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                {tab.label}
                {tab.id === 'kampagnen' && pendingCampaigns > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-yellow-500 text-white text-xs rounded-full w-3.5 h-3.5 flex items-center justify-center text-[10px]">
                    {pendingCampaigns}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Simulation banner */}
      <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-center">
        <p className="text-xs text-amber-700">
          <strong>Simulation:</strong> Wechsle oben rechts den Nutzer, um die Plattform aus verschiedenen Perspektiven zu erleben. Alle Daten sind Demo-Daten.
        </p>
      </div>

      {/* Main content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'profil' && <Profile />}
        {activeTab === 'kontakte' && <Contacts />}
        {activeTab === 'marktplatz' && (
          <Marketplace onStartCampaign={handleStartCampaign} />
        )}
        {activeTab === 'kampagnen' && (
          <Campaigns
            prefillTargetId={campaignTargetId}
            onClearPrefill={() => setCampaignTargetId(undefined)}
          />
        )}
        {activeTab === 'transaktionen' && <Transactions />}
      </main>

      {/* Footer */}
      <footer className="border-t bg-muted/40 py-6 mt-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">Matching Magnet</strong> – Token-basierte Lead-Kooperationsplattform
            </p>
            <div className="flex items-center gap-4 text-xs">
              <span>Plattformgebühr: 6 % je Kampagne</span>
              <span>1 Token = 1 freigegebener Kontakt</span>
              <span>Betrieben von Miriam König</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export function MatchingMagnetApp() {
  return (
    <StoreProvider>
      <AppInner />
    </StoreProvider>
  )
}
