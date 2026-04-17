'use client'

import { useState } from 'react'
import { useStore } from '../store'
import { INDUSTRIES, SEGMENTS } from '../seed'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Filter, Megaphone, Users, Star } from 'lucide-react'
import type { ContactType } from '../types'

interface Props {
  onStartCampaign: (targetOwnerId: string) => void
}

export function Marketplace({ onStartCampaign }: Props) {
  const { state, currentUser } = useStore()

  const [filterIndustry, setFilterIndustry] = useState('alle')
  const [filterType, setFilterType] = useState<'alle' | ContactType>('alle')
  const [filterSegment, setFilterSegment] = useState('alle')

  // Other users with shared contacts
  const otherUsers = state.users.filter(
    u => u.id !== currentUser.id && state.contacts.some(c => c.ownerId === u.id && c.isShared),
  )

  function getSharedContacts(userId: string) {
    return state.contacts.filter(c => c.ownerId === userId && c.isShared)
  }

  function matchingCount(userId: string) {
    let contacts = getSharedContacts(userId)
    if (filterIndustry !== 'alle') contacts = contacts.filter(c => c.industry === filterIndustry)
    if (filterType !== 'alle') contacts = contacts.filter(c => c.type === filterType)
    if (filterSegment !== 'alle') contacts = contacts.filter(c => c.segment === filterSegment)
    return contacts.length
  }

  const filtered = otherUsers.filter(u => matchingCount(u.id) > 0)

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-3 items-center">
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
        <Select value={filterType} onValueChange={v => setFilterType(v as 'alle' | ContactType)}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="alle">B2B & B2C</SelectItem>
            <SelectItem value="B2B">Nur B2B</SelectItem>
            <SelectItem value="B2C">Nur B2C</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterSegment} onValueChange={setFilterSegment}>
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="alle">Alle Segmente</SelectItem>
            {SEGMENTS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <Users className="h-10 w-10 mx-auto mb-3 opacity-40" />
          <p>Keine passenden Lead-Listen gefunden.</p>
          <p className="text-sm mt-1">Ändere die Filter oder warte auf neue Freigaben.</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map(user => {
          const shared = getSharedContacts(user.id)
          const matching = matchingCount(user.id)
          const b2bCount = shared.filter(c => c.type === 'B2B').length
          const b2cCount = shared.filter(c => c.type === 'B2C').length
          const avgComp = Math.round(shared.reduce((s, c) => s + c.completeness, 0) / shared.length)

          // Top industries
          const industryMap: Record<string, number> = {}
          shared.forEach(c => { industryMap[c.industry] = (industryMap[c.industry] || 0) + 1 })
          const topIndustries = Object.entries(industryMap)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)

          // Segment distribution
          const segMap: Record<string, number> = {}
          shared.forEach(c => { segMap[c.segment] = (segMap[c.segment] || 0) + 1 })
          const topSegments = Object.entries(segMap).sort((a, b) => b[1] - a[1]).slice(0, 3)

          const canAfford = currentUser.tokens >= matching

          return (
            <Card key={user.id} className="flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className={`${user.color} text-white text-sm`}>
                        {user.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">{user.name}</CardTitle>
                      <CardDescription>{user.role}</CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline" className="shrink-0">
                    {user.businessType}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 flex-1">
                <p className="text-sm text-muted-foreground line-clamp-2">{user.description}</p>

                {/* Stats grid */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-muted rounded-lg p-2">
                    <p className="text-lg font-bold">{shared.length}</p>
                    <p className="text-xs text-muted-foreground">Kontakte</p>
                  </div>
                  <div className="bg-muted rounded-lg p-2">
                    <p className="text-lg font-bold">{b2bCount}/{b2cCount}</p>
                    <p className="text-xs text-muted-foreground">B2B/B2C</p>
                  </div>
                  <div className="bg-muted rounded-lg p-2">
                    <p className="text-lg font-bold">{avgComp}%</p>
                    <p className="text-xs text-muted-foreground">Vollst.</p>
                  </div>
                </div>

                {/* Top industries */}
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Top-Branchen</p>
                  <div className="flex flex-wrap gap-1">
                    {topIndustries.map(([ind, cnt]) => (
                      <Badge key={ind} variant="secondary" className="text-xs">
                        {ind} ({cnt})
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Top segments */}
                <div>
                  <p className="text-xs font-medium text-muted-foreground mb-1">Segmente</p>
                  <div className="flex flex-wrap gap-1">
                    {topSegments.map(([seg, cnt]) => (
                      <Badge key={seg} variant="outline" className="text-xs">
                        {seg} ({cnt})
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Avg completeness bar */}
                <div>
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>Ø Datenvollständigkeit</span>
                    <span>{avgComp}%</span>
                  </div>
                  <Progress value={avgComp} className="h-1.5" />
                </div>

                {/* Matching filter result */}
                {(filterIndustry !== 'alle' || filterType !== 'alle' || filterSegment !== 'alle') && (
                  <div className="rounded-lg bg-primary/10 px-3 py-2 text-sm flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" />
                    <span>
                      <strong>{matching}</strong> Kontakte passen zu deinen Filtern
                      {' · '}<strong>{matching} Token</strong> Kosten
                    </span>
                  </div>
                )}
              </CardContent>

              <div className="p-4 pt-0">
                <Button
                  className="w-full"
                  disabled={!canAfford}
                  onClick={() => onStartCampaign(user.id)}
                >
                  <Megaphone className="h-4 w-4 mr-2" />
                  Kampagne erstellen
                  {!canAfford && (
                    <span className="ml-1 text-xs opacity-75">(zu wenig Token)</span>
                  )}
                </Button>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
