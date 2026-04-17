'use client'

import { useState } from 'react'
import { useStore } from '../store'
import { INDUSTRIES } from '../seed'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import type { BusinessType } from '../types'

export function Profile() {
  const { state, dispatch, currentUser } = useStore()

  const [role, setRole] = useState(currentUser.role)
  const [businessType, setBusinessType] = useState<BusinessType>(currentUser.businessType)
  const [industries, setIndustries] = useState<string[]>(currentUser.industries)
  const [b2bPct, setB2bPct] = useState(currentUser.b2bPercentage)
  const [description, setDescription] = useState(currentUser.description)
  const [saved, setSaved] = useState(false)

  function toggleIndustry(ind: string) {
    setIndustries(prev =>
      prev.includes(ind) ? prev.filter(i => i !== ind) : [...prev, ind],
    )
  }

  function handleSave() {
    dispatch({
      type: 'UPDATE_PROFILE',
      userId: currentUser.id,
      patch: { role, businessType, industries, b2bPercentage: b2bPct, description },
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const myContacts = state.contacts.filter(c => c.ownerId === currentUser.id)
  const sharedContacts = myContacts.filter(c => c.isShared)

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {/* Profile card */}
      <div className="md:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Business-Profil</CardTitle>
            <CardDescription>
              Diese Informationen sind für andere Nutzer sichtbar und helfen bei der Auswahl passender Kampagnenpartner.
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
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="B2B">B2B – überwiegend Geschäftskunden</SelectItem>
                  <SelectItem value="B2C">B2C – überwiegend Privatkunden</SelectItem>
                  <SelectItem value="Gemischt">Gemischt – beides</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(businessType === 'Gemischt') && (
              <div className="space-y-2">
                <Label>B2B-Anteil: {b2bPct} % (B2C: {100 - b2bPct} %)</Label>
                <Slider
                  min={10} max={90} step={5}
                  value={[b2bPct]}
                  onValueChange={([v]) => setB2bPct(v)}
                  className="mt-2"
                />
              </div>
            )}

            <div className="space-y-3">
              <Label>Branchen meiner Kontakte (Mehrfachauswahl)</Label>
              <div className="grid grid-cols-2 gap-2">
                {INDUSTRIES.map(ind => (
                  <div key={ind} className="flex items-center gap-2">
                    <Checkbox
                      id={`ind-${ind}`}
                      checked={industries.includes(ind)}
                      onCheckedChange={() => toggleIndustry(ind)}
                    />
                    <label htmlFor={`ind-${ind}`} className="text-sm cursor-pointer">
                      {ind}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Kurzbeschreibung (für andere Nutzer sichtbar)</Label>
              <Textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                rows={4}
                placeholder="Beschreibe dein Geschäft, deine Zielgruppe und deinen Mehrwert..."
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleSave} className={saved ? 'bg-green-600 hover:bg-green-600' : ''}>
              {saved ? '✓ Gespeichert' : 'Profil speichern'}
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Summary sidebar */}
      <div className="space-y-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Profilübersicht</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div>
              <span className="text-muted-foreground">Name</span>
              <p className="font-medium">{currentUser.name}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Typ</span>
              <p className="font-medium">{currentUser.businessType}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Branchen</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {industries.map(i => <Badge key={i} variant="secondary" className="text-xs">{i}</Badge>)}
              </div>
            </div>
            <div>
              <span className="text-muted-foreground">Kontakte gesamt</span>
              <p className="font-medium">{myContacts.length}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Freigegeben</span>
              <p className="font-medium">{sharedContacts.length}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Token-Guthaben</span>
              <p className="font-bold text-primary">{currentUser.tokens} T</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Lead-Listen Qualität</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {[
              { label: 'B2B-Kontakte', count: myContacts.filter(c => c.type === 'B2B').length },
              { label: 'B2C-Kontakte', count: myContacts.filter(c => c.type === 'B2C').length },
              { label: 'Ø Vollständigkeit', count: `${myContacts.length > 0 ? Math.round(myContacts.reduce((s, c) => s + c.completeness, 0) / myContacts.length) : 0}%` },
              { label: 'Freigegeben', count: sharedContacts.length },
            ].map(row => (
              <div key={row.label} className="flex justify-between">
                <span className="text-muted-foreground">{row.label}</span>
                <span className="font-medium">{row.count}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
