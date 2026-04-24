'use client'

import { useState } from 'react'
import { useStore, nextTxId, nextCampId, calcFees } from '../store'
import { INDUSTRIES, SEGMENTS } from '../seed'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { CheckCircle, XCircle, Megaphone, Clock, CheckCheck, Users } from 'lucide-react'
import type { ContactType, Campaign } from '../types'

const STATUS_LABEL: Record<string, string> = {
  offen: 'Offen',
  aktiv: 'Aktiv',
  abgeschlossen: 'Abgeschlossen',
  abgelehnt: 'Abgelehnt',
}
const STATUS_COLOR: Record<string, string> = {
  offen: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  aktiv: 'bg-blue-100 text-blue-800 border-blue-200',
  abgeschlossen: 'bg-green-100 text-green-800 border-green-200',
  abgelehnt: 'bg-red-100 text-red-800 border-red-200',
}

interface Props {
  prefillTargetId?: string
  onClearPrefill?: () => void
}

export function Campaigns({ prefillTargetId, onClearPrefill }: Props) {
  const { state, dispatch, currentUser } = useStore()

  const [createOpen, setCreateOpen] = useState(!!prefillTargetId)
  const [targetId, setTargetId] = useState(prefillTargetId ?? '')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [filterIndustry, setFilterIndustry] = useState('alle')
  const [filterSegment, setFilterSegment] = useState('alle')
  const [filterType, setFilterType] = useState<'alle' | ContactType>('alle')

  const targetUser = state.users.find(u => u.id === targetId)
  const targetShared = targetUser
    ? state.contacts.filter(c => c.ownerId === targetId && c.isShared)
    : []

  const matchingContacts = targetShared.filter(c => {
    if (filterIndustry !== 'alle' && c.industry !== filterIndustry) return false
    if (filterSegment !== 'alle' && c.segment !== filterSegment) return false
    if (filterType !== 'alle' && c.type !== filterType) return false
    return true
  })

  const tokenCost = matchingContacts.length
  const { platformFee, ownerReceives } = calcFees(tokenCost)
  const canCreate = tokenCost > 0 && currentUser.tokens >= tokenCost && subject.trim() && message.trim()

  function handleCreate() {
    if (!canCreate || !targetUser) return
    const campId = nextCampId()
    dispatch({
      type: 'CREATE_CAMPAIGN',
      campaign: {
        id: campId,
        creatorId: currentUser.id,
        targetOwnerId: targetId,
        subject: subject.trim(),
        message: message.trim(),
        filterIndustry: filterIndustry === 'alle' ? null : filterIndustry,
        filterSegment: filterSegment === 'alle' ? null : filterSegment,
        filterType: filterType === 'alle' ? null : filterType,
        contactCount: tokenCost,
        tokensTotal: tokenCost,
        platformFee,
        ownerReceives,
        status: 'offen',
        createdAt: new Date().toISOString(),
        completedAt: null,
      },
      spendTx: {
        id: nextTxId(),
        userId: currentUser.id,
        type: 'kampagne_ausgabe',
        amount: -tokenCost,
        description: `Kampagne „${subject.trim()}" an ${targetUser.name} (${tokenCost} Kontakte)`,
        createdAt: new Date().toISOString(),
        relatedCampaignId: campId,
      },
    })
    setCreateOpen(false)
    setSubject('')
    setMessage('')
    setFilterIndustry('alle')
    setFilterSegment('alle')
    setFilterType('alle')
    setTargetId('')
    onClearPrefill?.()
  }

  function handleRespond(camp: Campaign, accept: boolean) {
    const creator = state.users.find(u => u.id === camp.creatorId)
    const txs = accept
      ? [
          {
            id: nextTxId(),
            userId: currentUser.id,
            type: 'kampagne_einnahme' as const,
            amount: camp.ownerReceives,
            description: `Kampagne von ${creator?.name ?? camp.creatorId} angenommen (${camp.contactCount} Kontakte)`,
            createdAt: new Date().toISOString(),
            relatedCampaignId: camp.id,
          },
          {
            id: nextTxId(),
            userId: 'miriam',
            type: 'plattform_gebuehr' as const,
            amount: camp.platformFee,
            description: `Plattformgebühr (6 %) – Kampagne ${camp.id}`,
            createdAt: new Date().toISOString(),
            relatedCampaignId: camp.id,
          },
        ]
      : []
    dispatch({ type: 'RESPOND_CAMPAIGN', campaignId: camp.id, accept, transactions: txs })
  }

  function handleComplete(campId: string) {
    dispatch({ type: 'COMPLETE_CAMPAIGN', campaignId: campId })
  }

  const myCreated = state.campaigns.filter(c => c.creatorId === currentUser.id)
  const myReceived = state.campaigns.filter(c => c.targetOwnerId === currentUser.id)
  const pendingReceived = myReceived.filter(c => c.status === 'offen')

  const eligibleTargets = state.users.filter(
    u => u.id !== currentUser.id && state.contacts.some(c => c.ownerId === u.id && c.isShared),
  )

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })
  }

  function CampaignCard({ camp, role }: { camp: Campaign; role: 'creator' | 'owner' }) {
    const partner = state.users.find(u => u.id === (role === 'creator' ? camp.targetOwnerId : camp.creatorId))
    return (
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-sm font-semibold truncate">{camp.subject}</CardTitle>
              <CardDescription className="flex items-center gap-2 mt-1">
                <Avatar className="h-5 w-5">
                  <AvatarFallback className={`${partner?.color ?? 'bg-gray-400'} text-white text-xs`}>
                    {partner?.initials ?? '?'}
                  </AvatarFallback>
                </Avatar>
                {role === 'creator' ? `An: ${partner?.name}` : `Von: ${partner?.name}`}
                <span className="text-xs">· {formatDate(camp.createdAt)}</span>
              </CardDescription>
            </div>
            <Badge className={`shrink-0 ml-2 ${STATUS_COLOR[camp.status]}`}>{STATUS_LABEL[camp.status]}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground line-clamp-3 whitespace-pre-line">{camp.message}</p>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-muted rounded p-2">
              <span className="text-muted-foreground">Kontakte</span>
              <p className="font-bold text-base">{camp.contactCount}</p>
            </div>
            <div className="bg-muted rounded p-2">
              <span className="text-muted-foreground">Token-Kosten</span>
              <p className="font-bold text-base">{camp.tokensTotal}</p>
            </div>
          </div>

          {(camp.filterIndustry || camp.filterSegment || camp.filterType) && (
            <div className="flex flex-wrap gap-1">
              {camp.filterIndustry && <Badge variant="outline" className="text-xs">Branche: {camp.filterIndustry}</Badge>}
              {camp.filterSegment && <Badge variant="outline" className="text-xs">Segment: {camp.filterSegment}</Badge>}
              {camp.filterType && <Badge variant="outline" className="text-xs">Typ: {camp.filterType}</Badge>}
            </div>
          )}

          <Separator />
          <div className="text-xs text-muted-foreground flex justify-between">
            <span>Plattformgebühr (6 %): {camp.platformFee} T</span>
            <span>Listeninhaber erhält: {camp.ownerReceives} T</span>
          </div>

          {/* Actions */}
          {role === 'owner' && camp.status === 'offen' && (
            <div className="flex gap-2 pt-1">
              <Button size="sm" className="flex-1" onClick={() => handleRespond(camp, true)}>
                <CheckCircle className="h-4 w-4 mr-1" /> Annehmen
              </Button>
              <Button size="sm" variant="outline" className="flex-1 text-red-600 border-red-200 hover:bg-red-50" onClick={() => handleRespond(camp, false)}>
                <XCircle className="h-4 w-4 mr-1" /> Ablehnen
              </Button>
            </div>
          )}
          {role === 'owner' && camp.status === 'aktiv' && (
            <Button size="sm" className="w-full" onClick={() => handleComplete(camp.id)}>
              <CheckCheck className="h-4 w-4 mr-1" /> Kampagne abschließen
            </Button>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <div>
          {pendingReceived.length > 0 && (
            <p className="text-sm text-yellow-700 font-medium flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {pendingReceived.length} offene Anfrage{pendingReceived.length > 1 ? 'n' : ''} warten auf deine Antwort
            </p>
          )}
        </div>
        <Button onClick={() => { setCreateOpen(true); onClearPrefill?.() }}>
          <Megaphone className="h-4 w-4 mr-2" />
          Neue Kampagne
        </Button>
      </div>

      <Tabs defaultValue={pendingReceived.length > 0 ? 'received' : 'created'}>
        <TabsList>
          <TabsTrigger value="created">
            Meine Kampagnen ({myCreated.length})
          </TabsTrigger>
          <TabsTrigger value="received">
            Erhaltene Anfragen ({myReceived.length})
            {pendingReceived.length > 0 && (
              <span className="ml-1.5 bg-yellow-500 text-white text-xs rounded-full px-1.5 py-0.5">
                {pendingReceived.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="created" className="mt-4">
          {myCreated.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <Megaphone className="h-10 w-10 mx-auto mb-3 opacity-40" />
              <p>Noch keine Kampagnen erstellt.</p>
              <p className="text-sm mt-1">Gehe zum Marktplatz und wähle eine Lead-Liste aus.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {myCreated.map(c => <CampaignCard key={c.id} camp={c} role="creator" />)}
            </div>
          )}
        </TabsContent>

        <TabsContent value="received" className="mt-4">
          {myReceived.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">
              <Users className="h-10 w-10 mx-auto mb-3 opacity-40" />
              <p>Noch keine Kampagnenanfragen erhalten.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {myReceived.map(c => <CampaignCard key={c.id} camp={c} role="owner" />)}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Create campaign dialog */}
      <Dialog open={createOpen} onOpenChange={open => { setCreateOpen(open); if (!open) onClearPrefill?.() }}>
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Neue Kampagne erstellen</DialogTitle>
            <DialogDescription>
              Wähle eine Lead-Liste, setze Filter und formuliere deine Botschaft. Die Listinhaberin kontaktiert dann deine Zielgruppe in deinem Auftrag.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-2">
            {/* Target user */}
            <div className="space-y-2">
              <Label>Lead-Listeninhaber*in</Label>
              <Select value={targetId} onValueChange={setTargetId}>
                <SelectTrigger>
                  <SelectValue placeholder="Person auswählen..." />
                </SelectTrigger>
                <SelectContent>
                  {eligibleTargets.map(u => (
                    <SelectItem key={u.id} value={u.id}>
                      {u.name} – {u.role} ({state.contacts.filter(c => c.ownerId === u.id && c.isShared).length} Kontakte)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Filters */}
            <div className="space-y-3">
              <Label>Zielgruppen-Filter (optional)</Label>
              <div className="grid grid-cols-3 gap-2">
                <Select value={filterIndustry} onValueChange={setFilterIndustry}>
                  <SelectTrigger className="text-xs">
                    <SelectValue placeholder="Branche" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alle">Alle Branchen</SelectItem>
                    {INDUSTRIES.map(i => <SelectItem key={i} value={i}>{i}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Select value={filterSegment} onValueChange={setFilterSegment}>
                  <SelectTrigger className="text-xs">
                    <SelectValue placeholder="Segment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alle">Alle Segmente</SelectItem>
                    {SEGMENTS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Select value={filterType} onValueChange={v => setFilterType(v as 'alle' | ContactType)}>
                  <SelectTrigger className="text-xs">
                    <SelectValue placeholder="Typ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alle">B2B & B2C</SelectItem>
                    <SelectItem value="B2B">Nur B2B</SelectItem>
                    <SelectItem value="B2C">Nur B2C</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Matching preview */}
            {targetUser && (
              <div className={`rounded-lg p-3 text-sm ${matchingContacts.length > 0 ? 'bg-primary/10' : 'bg-muted'}`}>
                <p className="font-medium">
                  {matchingContacts.length} passende Kontakte gefunden
                </p>
                <div className="flex justify-between mt-1 text-muted-foreground text-xs">
                  <span>Token-Kosten: <strong>{tokenCost} T</strong></span>
                  <span>Plattformgebühr: <strong>{platformFee} T (6 %)</strong></span>
                  <span>{targetUser.name} erhält: <strong>{ownerReceives} T</strong></span>
                </div>
                {currentUser.tokens < tokenCost && tokenCost > 0 && (
                  <p className="text-red-600 mt-1 text-xs font-medium">
                    ⚠ Nicht genug Token (verfügbar: {currentUser.tokens})
                  </p>
                )}
              </div>
            )}

            {/* Subject */}
            <div className="space-y-2">
              <Label>Betreff / Kampagnenname</Label>
              <Input
                placeholder="z.B. Einladung zum kostenlosen Webinar am 20. Mai"
                value={subject}
                onChange={e => setSubject(e.target.value)}
              />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label>Botschaft / Nachrichtentext</Label>
              <Textarea
                rows={6}
                placeholder="Formuliere hier die Nachricht, die im Auftrag von dir an die Zielgruppe gesendet werden soll..."
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Die Listinhaberin wird diese Nachricht persönlich an die passenden Kontakte weitergeben.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => { setCreateOpen(false); onClearPrefill?.() }}>
              Abbrechen
            </Button>
            <Button disabled={!canCreate} onClick={handleCreate}>
              <Megaphone className="h-4 w-4 mr-1" />
              Kampagne senden ({tokenCost} Token)
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
