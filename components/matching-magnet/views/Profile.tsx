'use client'

import { useState } from 'react'
import { useStore } from '../store'
import { INDUSTRIES } from '../seed'
import { qualityTier, TIER_COLOR, TIER_LABEL, computeBreakdown } from '../quality'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Checkbox } from '@/components/ui/checkbox'
import { Star, Mail, Phone, MapPin, Clock } from 'lucide-react'
import type { BusinessType } from '../types'

function QualityBar({ score, label }: { score: number; label: string }) {
  const tier = qualityTier(score)
  const barColor = {
    platin: 'bg-violet-500', gold: 'bg-amber-400', silber: 'bg-slate-400',
    bronze: 'bg-orange-400', basis: 'bg-red-400',
  }[tier]
  return (
    <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">{score}/100 · <span className={`text-xs ${TIER_COLOR[tier].split(' ')[1]}`}>{TIER_LABEL[tier]}</span></span>
      </div>
      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all ${barColor}`} style={{ width: `${score}%` }} />
      </div>
    </div>
  )
}

export function Profile() {
  const { state, dispatch, currentUser } = useStore()

  const [role, setRole] = useState(currentUser.role)
  const [businessType, setBusinessType] = useState<BusinessType>(currentUser.businessType)
  const [industries, setIndustries] = useState<string[]>(currentUser.industries)
  const [b2bPct, setB2bPct] = useState(currentUser.b2bPercentage)
  const [description, setDescription] = useState(currentUser.description)
  const [saved, setSaved] = useState(false)

  function toggleIndustry(ind: string) {
    setIndustries(prev => prev.includes(ind) ? prev.filter(i => i !== ind) : [...prev, ind])
  }

  function handleSave() {
    dispatch({ type: 'UPDATE_PROFILE', userId: currentUser.id, patch: { role, businessType, industries, b2bPercentage: b2bPct, description } })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const myContacts = state.contacts.filter(c => c.ownerId === currentUser.id)
  const sharedContacts = myContacts.filter(c => c.isShared)
  const avgScore = myContacts.length > 0
    ? Math.round(myContacts.reduce((s, c) => s + c.qualityScore, 0) / myContacts.length)
    : 0

  // Aggregate quality breakdown
  const totalBD = myContacts.reduce(
    (acc, c) => {
      const bd = computeBreakdown(c)
      return { kontaktdaten: acc.kontaktdaten + bd.kontaktdaten, klassifizierung: acc.klassifizierung + bd.klassifizierung, aktualitaet: acc.aktualitaet + bd.aktualitaet }
    },
    { kontaktdaten: 0, klassifizierung: 0, aktualitaet: 0 },
  )
  const cnt = myContacts.length || 1
  const avgBD = {
    kontaktdaten: Math.round(totalBD.kontaktdaten / cnt),
    klassifizierung: Math.round(totalBD.klassifizierung / cnt),
    aktualitaet: Math.round(totalBD.aktualitaet / cnt),
  }

  // Contact field coverage
  const emailPct = myContacts.length > 0 ? Math.round(myContacts.filter(c => c.hasEmail).length / myContacts.length * 100) : 0
  const phonePct = myContacts.length > 0 ? Math.round(myContacts.filter(c => c.hasPhone).length / myContacts.length * 100) : 0
  const addrPct = myContacts.length > 0 ? Math.round(myContacts.filter(c => c.hasAddress).length / myContacts.length * 100) : 0
  const freshPct = myContacts.length > 0 ? Math.round(
    myContacts.filter(c => {
      const months = (Date.now() - new Date(c.lastUpdated).getTime()) / (1000 * 60 * 60 * 24 * 30)
      return months < 12
    }).length / myContacts.length * 100
  ) : 0

  // Tier counts
  const tierCounts: Record<string, number> = { platin: 0, gold: 0, silber: 0, bronze: 0, basis: 0 }
  myContacts.forEach(c => { tierCounts[qualityTier(c.qualityScore)]++ })

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {/* Edit form */}
      <div className="md:col-span-2 space-y-5">
        <Card>
          <CardHeader>
            <CardTitle>Business-Profil</CardTitle>
            <CardDescription>
              Diese Informationen sind für andere Nutzer sichtbar und helfen, passende Kooperationspartner zu finden.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label>Berufsbezeichnung / Rolle</Label>
              <Input value={role} onChange={e => setRole(e.target.value)} placeholder="z.B. Finanzmaklerin" />
            </div>

            <div className="space-y-2">
              <Label>Geschäftstyp</Label>
              <Select value={businessType} onValueChange={v => setBusinessType(v as BusinessType)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="B2B">B2B – überwiegend Geschäftskunden</SelectItem>
                  <SelectItem value="B2C">B2C – überwiegend Privatkunden</SelectItem>
                  <SelectItem value="Gemischt">Gemischt – beides</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {businessType === 'Gemischt' && (
              <div className="space-y-2">
                <Label>B2B-Anteil: {b2bPct} % · B2C-Anteil: {100 - b2bPct} %</Label>
                <Slider min={10} max={90} step={5} value={[b2bPct]} onValueChange={([v]) => setB2bPct(v)} />
              </div>
            )}

            <div className="space-y-3">
              <Label>Branchen meiner Kontakte</Label>
              <div className="grid grid-cols-2 gap-2">
                {INDUSTRIES.map(ind => (
                  <div key={ind} className="flex items-center gap-2">
                    <Checkbox id={`ind-${ind}`} checked={industries.includes(ind)} onCheckedChange={() => toggleIndustry(ind)} />
                    <label htmlFor={`ind-${ind}`} className="text-sm cursor-pointer">{ind}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Kurzbeschreibung</Label>
              <Textarea value={description} onChange={e => setDescription(e.target.value)} rows={4}
                placeholder="Beschreibe dein Geschäft, deine Zielgruppe und deinen Mehrwert..." />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSave} className={saved ? 'bg-green-600 hover:bg-green-600' : ''}>
              {saved ? '✓ Gespeichert' : 'Profil speichern'}
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="space-y-4">
        {/* Summary */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Profil-Übersicht</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {[
              { label: 'Name', value: currentUser.name },
              { label: 'Typ', value: currentUser.businessType },
              { label: 'Token', value: `${currentUser.tokens} T` },
              { label: 'Kontakte gesamt', value: myContacts.length },
              { label: 'Freigegeben', value: sharedContacts.length },
            ].map(r => (
              <div key={r.label} className="flex justify-between">
                <span className="text-muted-foreground">{r.label}</span>
                <span className="font-medium">{r.value}</span>
              </div>
            ))}
            <div>
              <span className="text-muted-foreground text-xs block mb-1">Branchen</span>
              <div className="flex flex-wrap gap-1">
                {industries.map(i => <Badge key={i} variant="secondary" className="text-xs">{i}</Badge>)}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quality overview */}
        <Card className="border-amber-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-1.5">
              <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
              Listenqualität
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <QualityBar score={avgScore} label="Ø Gesamtscore" />
            <div className="space-y-2">
              <p className="text-xs font-medium text-muted-foreground">Aufschlüsselung (Durchschnitt)</p>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Kontaktdaten (max 50)</span>
                  <span className="font-medium">{avgBD.kontaktdaten}</span>
                </div>
                <Progress value={(avgBD.kontaktdaten / 50) * 100} className="h-1.5" />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Klassifizierung (max 35)</span>
                  <span className="font-medium">{avgBD.klassifizierung}</span>
                </div>
                <Progress value={(avgBD.klassifizierung / 35) * 100} className="h-1.5" />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Aktualität (max 15)</span>
                  <span className="font-medium">{avgBD.aktualitaet}</span>
                </div>
                <Progress value={(avgBD.aktualitaet / 15) * 100} className="h-1.5" />
              </div>
            </div>

            <div className="space-y-1.5 text-xs border-t pt-3">
              <p className="font-medium text-muted-foreground mb-2">Datenabdeckung</p>
              {[
                { icon: <Mail className="h-3 w-3" />, label: 'E-Mail', pct: emailPct },
                { icon: <Phone className="h-3 w-3" />, label: 'Telefon', pct: phonePct },
                { icon: <MapPin className="h-3 w-3" />, label: 'Adresse', pct: addrPct },
                { icon: <Clock className="h-3 w-3" />, label: 'Aktuell (< 12 Mo)', pct: freshPct },
              ].map(row => (
                <div key={row.label}>
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="flex items-center gap-1 text-muted-foreground">{row.icon}{row.label}</span>
                    <span className="font-medium">{row.pct}%</span>
                  </div>
                  <Progress value={row.pct} className="h-1" />
                </div>
              ))}
            </div>

            <div className="border-t pt-3">
              <p className="text-xs font-medium text-muted-foreground mb-2">Tier-Verteilung</p>
              <div className="space-y-1">
                {(Object.entries(tierCounts) as [string, number][]).map(([tier, cnt]) => cnt > 0 && (
                  <div key={tier} className="flex items-center justify-between text-xs">
                    <Badge className={`${TIER_COLOR[tier as keyof typeof TIER_COLOR]} text-xs`}>{TIER_LABEL[tier as keyof typeof TIER_LABEL]}</Badge>
                    <span className="font-medium">{cnt}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
