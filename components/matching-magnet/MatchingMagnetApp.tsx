'use client'

import { useState } from 'react'
import { StoreProvider, useStore } from './store'
import { Dashboard } from './views/Dashboard'
import { Profile } from './views/Profile'
import { Contacts } from './views/Contacts'
import { Marketplace } from './views/Marketplace'
import { Campaigns } from './views/Campaigns'
import { Transactions } from './views/Transactions'
import { DisclaimerModal } from './DisclaimerModal'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Coins, Star, Info } from 'lucide-react'

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
  const [disclaimerOpen, setDisclaimerOpen] = useState(false)

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
            {/* Logo + slogan */}
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-primary text-white shadow-sm">
                <Star className="h-4.5 w-4.5 fill-white" />
              </div>
              <div>
                <p className="text-sm font-bold leading-tight">Matching Magnet</p>
                <p className="text-xs leading-tight font-medium text-amber-500">
                  Die Sterne stehen günstig ✦
                </p>
              </div>
            </div>

            {/* Nav – desktop */}
            <nav className="hidden md:flex items-center gap-0.5">
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
                    <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {pendingCampaigns}
                    </span>
                  )}
                </button>
              ))}
            </nav>

            {/* Right: token + user switcher + info */}
            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="ghost"
                size="sm"
                className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
                onClick={() => setDisclaimerOpen(true)}
              >
                <Info className="h-3.5 w-3.5" />
                Wie funktioniert&apos;s?
              </Button>

              <div className="flex items-center gap-1.5 rounded-full bg-amber-50 border border-amber-200 px-3 py-1.5">
                <Coins className="h-3.5 w-3.5 text-amber-500" />
                <span className="text-sm font-bold text-amber-600">{currentUser.tokens}</span>
                <span className="text-xs text-amber-500 hidden sm:inline">Token</span>
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
                  <span className="absolute -top-0.5 -right-0.5 bg-amber-500 text-white text-xs rounded-full w-3.5 h-3.5 flex items-center justify-center text-[10px]">
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
          <strong>Simulation:</strong> Wechsle oben rechts den Nutzer, um die Plattform aus verschiedenen Perspektiven zu erleben. ·{' '}
          <button className="underline hover:no-underline" onClick={() => setDisclaimerOpen(true)}>
            DSGVO &amp; Kooperationsmodell verstehen →
          </button>
        </p>
      </div>

      {/* Main content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'profil' && <Profile />}
        {activeTab === 'kontakte' && <Contacts />}
        {activeTab === 'marktplatz' && <Marketplace onStartCampaign={handleStartCampaign} />}
        {activeTab === 'kampagnen' && (
          <Campaigns
            prefillTargetId={campaignTargetId}
            onClearPrefill={() => setCampaignTargetId(undefined)}
          />
        )}
        {activeTab === 'transaktionen' && <Transactions />}
      </main>

      {/* Footer */}
      <footer className="border-t bg-gradient-to-r from-amber-50/50 to-background py-6 mt-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
              <span className="font-semibold">Matching Magnet</span>
              <span className="text-amber-500 text-xs font-medium">Die Sterne stehen günstig ✦</span>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <span>Plattformgebühr: 6 %</span>
              <span>1 Token = 1 Kontakt</span>
              <button className="underline hover:no-underline text-amber-600" onClick={() => setDisclaimerOpen(true)}>
                DSGVO &amp; Kooperationsmodell
              </button>
              <span>Betrieben von Miriam König</span>
            </div>
          </div>
        </div>
      </footer>

      <DisclaimerModal open={disclaimerOpen} onClose={() => setDisclaimerOpen(false)} />
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
