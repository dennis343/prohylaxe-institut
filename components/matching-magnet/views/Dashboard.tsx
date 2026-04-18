'use client'

import { useStore } from '../store'
import { qualityTier, TIER_COLOR, TIER_LABEL } from '../quality'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Coins, Users, Megaphone, Star, ShieldCheck, Clock } from 'lucide-react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from 'recharts'
import { INDUSTRIES } from '../seed'

const STATUS_COLOR: Record<string, string> = {
  offen: 'bg-yellow-100 text-yellow-800',
  aktiv: 'bg-blue-100 text-blue-800',
  abgeschlossen: 'bg-green-100 text-green-800',
  abgelehnt: 'bg-red-100 text-red-800',
}
const STATUS_LABEL: Record<string, string> = {
  offen: 'Offen', aktiv: 'Aktiv', abgeschlossen: 'Abgeschlossen', abgelehnt: 'Abgelehnt',
}

export function Dashboard() {
  const { state, currentUser } = useStore()

  const myContacts = state.contacts.filter(c => c.ownerId === currentUser.id)
  const sharedCount = myContacts.filter(c => c.isShared).length
  const avgScore = myContacts.length > 0
    ? Math.round(myContacts.reduce((s, c) => s + c.qualityScore, 0) / myContacts.length)
    : 0

  const myCampaignsCreated = state.campaigns.filter(c => c.creatorId === currentUser.id)
  const myCampaignsReceived = state.campaigns.filter(c => c.targetOwnerId === currentUser.id)
  const pendingReceived = myCampaignsReceived.filter(c => c.status === 'offen')

  const recentTx = [...state.transactions]
    .filter(t => t.userId === currentUser.id)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5)

  const industryData = INDUSTRIES.map(ind => ({
    name: ind.split(' ')[0],
    value: myContacts.filter(c => c.industry === ind && c.isShared).length,
  })).filter(d => d.value > 0)

  const pieData = [
    { name: 'B2B', value: myContacts.filter(c => c.type === 'B2B').length },
    { name: 'B2C', value: myContacts.filter(c => c.type === 'B2C').length },
  ]
  const PIE_COLORS = ['#2563eb', '#f59e0b']

  // Quality tier distribution
  const tierDist: Record<string, number> = { platin: 0, gold: 0, silber: 0, bronze: 0, basis: 0 }
  myContacts.forEach(c => { tierDist[qualityTier(c.qualityScore)]++ })
  const tierData = [
    { name: 'Platin', value: tierDist.platin, fill: '#8b5cf6' },
    { name: 'Gold',   value: tierDist.gold,   fill: '#f59e0b' },
    { name: 'Silber', value: tierDist.silber,  fill: '#94a3b8' },
    { name: 'Bronze', value: tierDist.bronze,  fill: '#f97316' },
    { name: 'Basis',  value: tierDist.basis,   fill: '#ef4444' },
  ].filter(d => d.value > 0)

  const platformFees = state.transactions
    .filter(t => t.type === 'plattform_gebuehr' && t.userId === 'miriam')
    .reduce((s, t) => s + t.amount, 0)

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="col-span-2 md:col-span-1 border-primary/30 bg-primary/5">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-1">
              <Coins className="h-4 w-4" /> Token-Guthaben
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">{currentUser.tokens.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground mt-1">1 Token = 1 freigegebener Kontakt</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-1">
              <Users className="h-4 w-4" /> Kontakte
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{myContacts.length}</p>
            <p className="text-xs text-muted-foreground mt-1">{sharedCount} freigegeben</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-1">
              <Megaphone className="h-4 w-4" /> Kampagnen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{myCampaignsCreated.length}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {myCampaignsCreated.filter(c => c.status === 'aktiv').length} aktiv
            </p>
          </CardContent>
        </Card>

        <Card className="border-amber-200 bg-amber-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-amber-700 flex items-center gap-1">
              <Star className="h-4 w-4 text-amber-500 fill-amber-400" /> Ø Qualität
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-amber-600">{avgScore}</p>
            <p className="text-xs text-amber-600 mt-1">
              {avgScore > 0 ? TIER_LABEL[qualityTier(avgScore)] : '–'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Pending campaigns alert */}
      {pendingReceived.length > 0 && (
        <Card className="border-yellow-300 bg-yellow-50">
          <CardContent className="pt-4 flex items-start gap-3">
            <Clock className="h-5 w-5 text-yellow-600 mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold text-yellow-800">
                {pendingReceived.length} offene Kampagnenanfrage{pendingReceived.length > 1 ? 'n' : ''}
              </p>
              <p className="text-sm text-yellow-700 mt-0.5">
                Jemand möchte deine Kontakte für eine Kampagne nutzen. Gehe zu „Kampagnen" um zu antworten.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {/* B2B/B2C Pie */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">B2B / B2C Verteilung</CardTitle>
            <CardDescription>Alle eigenen Kontakte</CardDescription>
          </CardHeader>
          <CardContent>
            {pieData.some(d => d.value > 0) ? (
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false}>
                    {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-muted-foreground text-sm py-8 text-center">Noch keine Kontakte</p>
            )}
          </CardContent>
        </Card>

        {/* Quality tier distribution */}
        <Card className="border-amber-100">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-1.5">
              <Star className="h-4 w-4 text-amber-400 fill-amber-400" /> Qualitäts-Tiers
            </CardTitle>
            <CardDescription>Verteilung deiner Kontakte</CardDescription>
          </CardHeader>
          <CardContent>
            {tierData.length > 0 ? (
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={tierData} layout="vertical" margin={{ left: 0, right: 20 }}>
                  <XAxis type="number" tick={{ fontSize: 10 }} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={45} />
                  <Tooltip />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {tierData.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-muted-foreground text-sm py-8 text-center">Noch keine Kontakte</p>
            )}
          </CardContent>
        </Card>

        {/* Industry bar */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Branchen (freigegeben)</CardTitle>
          </CardHeader>
          <CardContent>
            {industryData.length > 0 ? (
              <ResponsiveContainer width="100%" height={160}>
                <BarChart data={industryData} layout="vertical" margin={{ left: 0, right: 16 }}>
                  <XAxis type="number" tick={{ fontSize: 10 }} />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 10 }} width={60} />
                  <Tooltip />
                  <Bar dataKey="value" fill="var(--color-primary)" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-muted-foreground text-sm py-8 text-center">Keine freigegebenen Kontakte</p>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent transactions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Letzte Transaktionen</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {recentTx.length === 0 && <p className="text-sm text-muted-foreground">Noch keine Transaktionen</p>}
            {recentTx.map(tx => (
              <div key={tx.id} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground truncate max-w-[65%]">{tx.description}</span>
                <span className={tx.amount >= 0 ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'}>
                  {tx.amount >= 0 ? '+' : ''}{tx.amount} T
                </span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Received campaigns */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Kampagnen auf meine Kontakte</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {myCampaignsReceived.length === 0 && (
              <p className="text-sm text-muted-foreground">Noch keine Anfragen erhalten</p>
            )}
            {myCampaignsReceived.map(c => {
              const creator = state.users.find(u => u.id === c.creatorId)
              return (
                <div key={c.id} className="flex items-center justify-between text-sm">
                  <div className="truncate max-w-[65%]">
                    <span className="font-medium">{creator?.name}</span>
                    <span className="text-muted-foreground ml-1 text-xs">· {c.contactCount} Kontakte</span>
                  </div>
                  <Badge className={STATUS_COLOR[c.status]}>{STATUS_LABEL[c.status]}</Badge>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>

      {/* Admin platform stats */}
      {currentUser.isAdmin && (
        <Card className="border-emerald-300 bg-emerald-50">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-emerald-600" />
              Plattform-Übersicht (Admin)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {[
                { val: state.users.length, label: 'Nutzer' },
                { val: state.contacts.filter(c => c.isShared).length, label: 'Freigegebene Kontakte' },
                { val: state.campaigns.length, label: 'Kampagnen gesamt' },
                { val: platformFees, label: 'Gebühren-Token' },
              ].map(s => (
                <div key={s.label}>
                  <p className="text-2xl font-bold text-emerald-700">{s.val}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
