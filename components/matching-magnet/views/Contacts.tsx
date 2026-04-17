'use client'

import { useState } from 'react'
import { useStore, nextTxId, nextContactId, calcFees } from '../store'
import { INDUSTRIES, SEGMENTS } from '../seed'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Progress } from '@/components/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Plus, Upload, Filter } from 'lucide-react'
import type { Contact, ContactType } from '../types'

function lcg(seed: number) {
  let s = seed >>> 0
  return () => {
    s = Math.imul(s, 1664525) + 1013904223
    return (s >>> 0) / 0xffffffff
  }
}
function weightedPick<T>(items: [T, number][], r: number): T {
  const total = items.reduce((a, [, w]) => a + w, 0)
  let c = r * total
  for (const [item, w] of items) { c -= w; if (c <= 0) return item }
  return items[items.length - 1][0]
}

export function Contacts() {
  const { state, dispatch, currentUser } = useStore()

  const [filterIndustry, setFilterIndustry] = useState('alle')
  const [filterType, setFilterType] = useState('alle')
  const [filterShared, setFilterShared] = useState('alle')
  const [addOpen, setAddOpen] = useState(false)

  // Add contacts form
  const [addCount, setAddCount] = useState(10)
  const [addIndustry, setAddIndustry] = useState(INDUSTRIES[0])
  const [addSegment, setAddSegment] = useState(SEGMENTS[1])
  const [addType, setAddType] = useState<ContactType>('B2B')
  const [addShared, setAddShared] = useState(true)

  const myContacts = state.contacts.filter(c => c.ownerId === currentUser.id)

  const filtered = myContacts.filter(c => {
    if (filterIndustry !== 'alle' && c.industry !== filterIndustry) return false
    if (filterType !== 'alle' && c.type !== filterType) return false
    if (filterShared === 'freigegeben' && !c.isShared) return false
    if (filterShared === 'privat' && c.isShared) return false
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
            description: `Kontakt ${contact.code} freigegeben`,
            createdAt: new Date().toISOString(),
            relatedCampaignId: null,
          }
        : null,
    })
  }

  function handleAddContacts() {
    const seed = Date.now() % 99999
    const rand = lcg(seed)
    const contacts: Contact[] = Array.from({ length: addCount }, (_, i) => ({
      id: nextContactId(currentUser.id),
      ownerId: currentUser.id,
      code: `KT-${String(seed * 10 + i).padStart(5, '0').slice(0, 5)}`,
      industry: addIndustry,
      segment: addSegment,
      type: addType,
      completeness: Math.min(100, Math.max(30, Math.round(70 + (rand() - 0.5) * 40))),
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
        description: `${addCount} Kontakte hinzugefügt${addShared ? ` und freigegeben (+${earned} Token)` : ''}`,
        createdAt: new Date().toISOString(),
        relatedCampaignId: null,
      },
    })
    setAddOpen(false)
  }

  const sharedCount = myContacts.filter(c => c.isShared).length
  const b2bCount = myContacts.filter(c => c.type === 'B2B').length
  const avgComp = myContacts.length > 0
    ? Math.round(myContacts.reduce((s, c) => s + c.completeness, 0) / myContacts.length)
    : 0

  return (
    <div className="space-y-5">
      {/* Stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Gesamt', value: myContacts.length },
          { label: 'Freigegeben', value: sharedCount },
          { label: 'B2B / B2C', value: `${b2bCount} / ${myContacts.length - b2bCount}` },
          { label: 'Ø Vollständigkeit', value: `${avgComp}%` },
        ].map(s => (
          <Card key={s.label} className="text-center py-3">
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </Card>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select value={filterIndustry} onValueChange={setFilterIndustry}>
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Branche" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="alle">Alle Branchen</SelectItem>
              {INDUSTRIES.map(i => <SelectItem key={i} value={i}>{i}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="alle">B2B & B2C</SelectItem>
            <SelectItem value="B2B">Nur B2B</SelectItem>
            <SelectItem value="B2C">Nur B2C</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterShared} onValueChange={setFilterShared}>
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="alle">Alle</SelectItem>
            <SelectItem value="freigegeben">Freigegeben</SelectItem>
            <SelectItem value="privat">Nicht freigegeben</SelectItem>
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
                <TableHead>Vollständigkeit</TableHead>
                <TableHead>Freigegeben</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    Keine Kontakte gefunden
                  </TableCell>
                </TableRow>
              )}
              {filtered.slice(0, 100).map(contact => (
                <TableRow key={contact.id}>
                  <TableCell className="font-mono text-xs">{contact.code}</TableCell>
                  <TableCell className="text-sm">{contact.industry}</TableCell>
                  <TableCell className="text-sm">{contact.segment}</TableCell>
                  <TableCell>
                    <Badge variant={contact.type === 'B2B' ? 'default' : 'secondary'} className="text-xs">
                      {contact.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={contact.completeness} className="h-1.5 w-16" />
                      <span className="text-xs text-muted-foreground">{contact.completeness}%</span>
                    </div>
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

      {/* Add contacts dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Kontakte hinzufügen</DialogTitle>
            <DialogDescription>
              Kontakte werden als Batch importiert und klassifiziert. Für jeden freigegebenen Kontakt erhältst du 1 Token.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Anzahl Kontakte</Label>
              <Input
                type="number" min={1} max={500}
                value={addCount}
                onChange={e => setAddCount(Math.max(1, Math.min(500, Number(e.target.value))))}
              />
            </div>
            <div className="space-y-2">
              <Label>Branche</Label>
              <Select value={addIndustry} onValueChange={setAddIndustry}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {INDUSTRIES.map(i => <SelectItem key={i} value={i}>{i}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Segment</Label>
              <Select value={addSegment} onValueChange={setAddSegment}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {SEGMENTS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Typ</Label>
              <Select value={addType} onValueChange={v => setAddType(v as ContactType)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="B2B">B2B</SelectItem>
                  <SelectItem value="B2C">B2C</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={addShared} onCheckedChange={setAddShared} />
              <Label>Sofort freigeben (+{addShared ? addCount : 0} Token)</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)}>Abbrechen</Button>
            <Button onClick={handleAddContacts}>
              <Upload className="h-4 w-4 mr-1" />
              {addCount} Kontakte importieren
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
