'use client'

import { useState } from 'react'
import { useStore, nextTxId, nextContactId } from '../store'
import { INDUSTRIES, SEGMENTS, EMPLOYEE_RANGES } from '../seed'
import { computeQualityScore, qualityTier, TIER_LABEL, TIER_COLOR } from '../quality'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Progress } from '@/components/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Plus, Filter, Star, Mail, Phone, MapPin, Info } from 'lucide-react'
import type { Contact, ContactType, EmployeeRange } from '../types'

function QualityStars({ score }: { score: number }) {
  const tier = qualityTier(score)
  const stars = { platin: 5, gold: 4, silber: 3, bronze: 2, basis: 1 }[tier]
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-3 w-3 ${i < stars ? 'text-amber-400 fill-amber-400' : 'text-slate-200 fill-slate-200'}`}
        />
      ))}
      <span className="text-xs text-muted-foreground ml-1">{score}</span>
    </div>
  )
}

function DataFlags({ contact }: { contact: Contact }) {
  return (
    <div className="flex items-center gap-1">
      <span className={`inline-flex items-center gap-0.5 text-xs ${contact.hasEmail ? 'text-green-600' : 'text-slate-300'}`}>
        <Mail className="h-3 w-3" />
      </span>
      <span className={`inline-flex items-center gap-0.5 text-xs ${contact.hasPhone ? 'text-green-600' : 'text-slate-300'}`}>
        <Phone className="h-3 w-3" />
      </span>
      <span className={`inline-flex items-center gap-0.5 text-xs ${contact.hasAddress ? 'text-green-600' : 'text-slate-300'}`}>
        <MapPin className="h-3 w-3" />
      </span>
    </div>
  )
}

export function Contacts() {
  const { state, dispatch, currentUser } = useStore()

  const [filterIndustry, setFilterIndustry] = useState('alle')
  const [filterType, setFilterType] = useState('alle')
  const [filterShared, setFilterShared] = useState('alle')
  const [filterTier, setFilterTier] = useState('alle')
  const [addOpen, setAddOpen] = useState(false)

  // Import form state
  const [addCount, setAddCount] = useState(10)
  const [addIndustry, setAddIndustry] = useState(INDUSTRIES[0])
  const [addSegment, setAddSegment] = useState(SEGMENTS[1])
  const [addType, setAddType] = useState<ContactType>('B2B')
  const [addEmployeeRange, setAddEmployeeRange] = useState<EmployeeRange>('10-49')
  const [addHasEmail, setAddHasEmail] = useState(true)
  const [addHasPhone, setAddHasPhone] = useState(false)
  const [addHasAddress, setAddHasAddress] = useState(false)
  const [addShared, setAddShared] = useState(true)

  const myContacts = state.contacts.filter(c => c.ownerId === currentUser.id)

  const filtered = myContacts.filter(c => {
    if (filterIndustry !== 'alle' && c.industry !== filterIndustry) return false
    if (filterType !== 'alle' && c.type !== filterType) return false
    if (filterShared === 'freigegeben' && !c.isShared) return false
    if (filterShared === 'privat' && c.isShared) return false
    if (filterTier !== 'alle' && qualityTier(c.qualityScore) !== filterTier) return false
    return true
  })

  function handleToggleShare(contact: Contact) {
    const nowShared = !contact.isShared
    dispatch({
      type: 'TOGGLE_SHARE',
      contactId: contact.id,
      transaction: nowShared
        ? {
            id: nextTxId(),
            userId: currentUser.id,
            type: 'freigabe',
            amount: 1,
            description: `Kontakt ${contact.code} freigegeben (+1 Token)`,
            createdAt: new Date().toISOString(),
            relatedCampaignId: null,
          }
        : null,
    })
  }

  // Preview quality score for import dialog
  const previewScore = computeQualityScore({
    hasEmail: addHasEmail,
    hasPhone: addHasPhone,
    hasAddress: addHasAddress,
    industry: addIndustry,
    segment: addSegment,
    employeeRange: addEmployeeRange,
    lastUpdated: new Date().toISOString(),
  })

  function handleAddContacts() {
    const seed = Date.now() % 99999
    const contacts: Contact[] = Array.from({ length: addCount }, (_, i) => ({
      id: nextContactId(currentUser.id),
      ownerId: currentUser.id,
      code: `KT-${String(seed * 10 + i).padStart(5, '0').slice(0, 5)}`,
      industry: addIndustry,
      segment: addSegment,
      type: addType,
      employeeRange: addType === 'B2C' && addSegment === 'Endkunde' ? null : addEmployeeRange,
      hasEmail: addHasEmail,
      hasPhone: addHasPhone,
      hasAddress: addHasAddress,
      lastUpdated: new Date().toISOString(),
      qualityScore: previewScore,
      isShared: addShared,
      addedAt: new Date().toISOString(),
    }))
    const earned = addShared ? addCount : 0
    dispatch({
      type: 'ADD_CONTACTS',
      contacts,
      transaction: {
        id: nextTxId(),
        userId: currentUser.id,
        type: 'freigabe',
        amount: earned,
        description: `${addCount} Kontakte importiert${addShared ? ` & freigegeben (+${earned} Token)` : ''}`,
        createdAt: new Date().toISOString(),
        relatedCampaignId: null,
      },
    })
    setAddOpen(false)
  }

  const sharedCount = myContacts.filter(c => c.isShared).length
  const avgScore = myContacts.length > 0
    ? Math.round(myContacts.reduce((s, c) => s + c.qualityScore, 0) / myContacts.length)
    : 0
  const goldPlusCount = myContacts.filter(c => c.qualityScore >= 70).length

  // Quality breakdown
  const tierCounts = { platin: 0, gold: 0, silber: 0, bronze: 0, basis: 0 }
  myContacts.forEach(c => { tierCounts[qualityTier(c.qualityScore)]++ })

  return (
    <div className="space-y-5">
      {/* Quality overview row */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <Card className="text-center py-3">
          <p className="text-2xl font-bold">{myContacts.length}</p>
          <p className="text-xs text-muted-foreground">Gesamt</p>
        </Card>
        <Card className="text-center py-3">
          <p className="text-2xl font-bold">{sharedCount}</p>
          <p className="text-xs text-muted-foreground">Freigegeben</p>
        </Card>
        <Card className="text-center py-3">
          <p className="text-2xl font-bold text-amber-500">{avgScore}</p>
          <p className="text-xs text-muted-foreground">Ø Qualitätsscore</p>
        </Card>
        <Card className="text-center py-3">
          <p className="text-2xl font-bold text-amber-500">{goldPlusCount}</p>
          <p className="text-xs text-muted-foreground">Gold / Platin</p>
        </Card>
        <Card className="text-center py-3 col-span-2 md:col-span-1">
          <div className="flex justify-center gap-1 mb-1">
            {(Object.entries(tierCounts) as [string, number][]).map(([tier, cnt]) => (
              cnt > 0 && (
                <Badge key={tier} className={`text-xs ${TIER_COLOR[tier as keyof typeof TIER_COLOR]}`}>
                  {cnt}
                </Badge>
              )
            ))}
          </div>
          <p className="text-xs text-muted-foreground">Tier-Verteilung</p>
        </Card>
      </div>

      {/* Quality score legend */}
      <Card className="bg-amber-50 border-amber-200">
        <CardContent className="pt-3 pb-3">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
            <div className="flex items-center gap-1 font-medium text-amber-700">
              <Info className="h-3.5 w-3.5" />
              Qualitätsscore (0–100):
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="flex items-center gap-1">
                <span className="text-amber-400">★★★★★</span>
                <span className="font-medium">Platin</span> ≥ 85
              </span>
              <span className="flex items-center gap-1">
                <span className="text-amber-400">★★★★</span>
                <span className="font-medium">Gold</span> ≥ 70
              </span>
              <span className="flex items-center gap-1">
                <span className="text-slate-400">★★★</span>
                <span className="font-medium">Silber</span> ≥ 50
              </span>
              <span className="flex items-center gap-1">
                <span className="text-orange-400">★★</span>
                <span className="font-medium">Bronze</span> ≥ 30
              </span>
              <span className="flex items-center gap-1">
                <span className="text-red-400">★</span>
                <span className="font-medium">Basis</span> &lt; 30
              </span>
            </div>
            <span className="text-muted-foreground ml-auto hidden md:inline">
              E-Mail +25 · Telefon +15 · Adresse +10 · Branche +15 · Segment +10 · Mitarb. +10 · Aktualität max +15
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Toolbar */}
      <div className="flex flex-wrap gap-2 items-center">
        <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
        <Select value={filterIndustry} onValueChange={setFilterIndustry}>
          <SelectTrigger className="w-40"><SelectValue placeholder="Branche" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="alle">Alle Branchen</SelectItem>
            {INDUSTRIES.map(i => <SelectItem key={i} value={i}>{i}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-28"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="alle">B2B & B2C</SelectItem>
            <SelectItem value="B2B">Nur B2B</SelectItem>
            <SelectItem value="B2C">Nur B2C</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterShared} onValueChange={setFilterShared}>
          <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="alle">Alle</SelectItem>
            <SelectItem value="freigegeben">Freigegeben</SelectItem>
            <SelectItem value="privat">Nicht freigegeben</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterTier} onValueChange={setFilterTier}>
          <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="alle">Alle Tiers</SelectItem>
            {(['platin', 'gold', 'silber', 'bronze', 'basis'] as const).map(t => (
              <SelectItem key={t} value={t}>{TIER_LABEL[t]}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="ml-auto">
          <Button onClick={() => setAddOpen(true)} size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Kontakte hinzufügen
          </Button>
        </div>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Branche</TableHead>
                <TableHead>Segment</TableHead>
                <TableHead>Typ</TableHead>
                <TableHead>Mitarb.</TableHead>
                <TableHead>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger className="flex items-center gap-1">
                        Qualität <Info className="h-3 w-3" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="text-xs">E-Mail / Telefon / Adresse · Score 0–100</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableHead>
                <TableHead>Daten</TableHead>
                <TableHead>Freigabe</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                    Keine Kontakte gefunden
                  </TableCell>
                </TableRow>
              )}
              {filtered.slice(0, 100).map(contact => (
                <TableRow key={contact.id}>
                  <TableCell className="font-mono text-xs">{contact.code}</TableCell>
                  <TableCell className="text-xs">{contact.industry}</TableCell>
                  <TableCell className="text-xs">{contact.segment}</TableCell>
                  <TableCell>
                    <Badge variant={contact.type === 'B2B' ? 'default' : 'secondary'} className="text-xs">
                      {contact.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {contact.employeeRange ?? '–'}
                  </TableCell>
                  <TableCell>
                    <QualityStars score={contact.qualityScore} />
                  </TableCell>
                  <TableCell>
                    <DataFlags contact={contact} />
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={contact.isShared}
                      onCheckedChange={() => handleToggleShare(contact)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filtered.length > 100 && (
            <p className="text-xs text-muted-foreground text-center py-2">
              Zeige 100 von {filtered.length} Kontakten
            </p>
          )}
        </CardContent>
      </Card>

      {/* Import dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Kontakte importieren & klassifizieren</DialogTitle>
            <DialogDescription>
              Vollständige Klassifizierung erhöht den Qualitätsscore und macht deine Liste attraktiver für Kampagnen.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-1">
            {/* Score preview */}
            <div className={`rounded-lg border p-3 ${TIER_COLOR[qualityTier(previewScore)]}`}>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold">Vorschau Qualitätsscore</span>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className={`h-3.5 w-3.5 ${i < { platin: 5, gold: 4, silber: 3, bronze: 2, basis: 1 }[qualityTier(previewScore)] ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'}`} />
                  ))}
                  <span className="font-bold ml-1">{previewScore} / 100</span>
                </div>
              </div>
              <div className="flex gap-3 mt-2 text-xs">
                <span>E-Mail: <strong>{addHasEmail ? '+25' : '+0'}</strong></span>
                <span>Tel.: <strong>{addHasPhone ? '+15' : '+0'}</strong></span>
                <span>Adresse: <strong>{addHasAddress ? '+10' : '+0'}</strong></span>
                <span>Klassifiz.: <strong>+35</strong></span>
                <span>Aktualität: <strong>+15</strong></span>
              </div>
              <Progress value={previewScore} className="mt-2 h-1.5" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">Anzahl Kontakte</Label>
                <Input type="number" min={1} max={500} value={addCount} onChange={e => setAddCount(Math.max(1, Math.min(500, Number(e.target.value))))} />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Typ</Label>
                <Select value={addType} onValueChange={v => setAddType(v as ContactType)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="B2B">B2B</SelectItem>
                    <SelectItem value="B2C">B2C</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">Branche (+15 Pkt.)</Label>
                <Select value={addIndustry} onValueChange={setAddIndustry}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {INDUSTRIES.map(i => <SelectItem key={i} value={i}>{i}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Segment (+10 Pkt.)</Label>
                <Select value={addSegment} onValueChange={setAddSegment}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {SEGMENTS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-1">
              <Label className="text-xs">Mitarbeiteranzahl (+10 Pkt.)</Label>
              <Select value={addEmployeeRange} onValueChange={v => setAddEmployeeRange(v as EmployeeRange)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {EMPLOYEE_RANGES.map(r => <SelectItem key={r} value={r}>{r} Mitarbeiter</SelectItem>)}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-xs">Vorhandene Kontaktdaten</Label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'E-Mail (+25)', val: addHasEmail, set: setAddHasEmail },
                  { label: 'Telefon (+15)', val: addHasPhone, set: setAddHasPhone },
                  { label: 'Adresse (+10)', val: addHasAddress, set: setAddHasAddress },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-2 rounded border p-2">
                    <Switch checked={item.val} onCheckedChange={item.set} />
                    <Label className="text-xs cursor-pointer">{item.label}</Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 rounded border p-2">
              <Switch checked={addShared} onCheckedChange={setAddShared} />
              <Label className="cursor-pointer">Sofort freigeben (+{addShared ? addCount : 0} Token)</Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)}>Abbrechen</Button>
            <Button onClick={handleAddContacts}>
              {addCount} Kontakte importieren
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
