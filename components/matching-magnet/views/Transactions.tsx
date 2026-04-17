'use client'

import { useState } from 'react'
import { useStore, nextTxId } from '../store'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Coins, ArrowDownCircle, ArrowUpCircle, ShieldCheck, Gift } from 'lucide-react'
import type { TxType } from '../types'

const TX_LABELS: Record<TxType, string> = {
  freigabe: 'Freigabe-Vergütung',
  kampagne_ausgabe: 'Kampagne (Ausgabe)',
  kampagne_einnahme: 'Kampagne (Einnahme)',
  plattform_gebuehr: 'Plattformgebühr',
  token_kauf: 'Token-Kauf',
}

const TX_ICON: Record<TxType, React.ReactNode> = {
  freigabe: <Gift className="h-4 w-4 text-green-600" />,
  kampagne_ausgabe: <ArrowUpCircle className="h-4 w-4 text-red-500" />,
  kampagne_einnahme: <ArrowDownCircle className="h-4 w-4 text-green-600" />,
  plattform_gebuehr: <ShieldCheck className="h-4 w-4 text-emerald-600" />,
  token_kauf: <Coins className="h-4 w-4 text-blue-600" />,
}

const BUY_PACKAGES = [
  { tokens: 50, price: '5,00 €' },
  { tokens: 100, price: '10,00 €' },
  { tokens: 250, price: '22,50 €' },
  { tokens: 500, price: '40,00 €' },
  { tokens: 1000, price: '70,00 €' },
]

export function Transactions() {
  const { state, dispatch, currentUser } = useStore()
  const [buyOpen, setBuyOpen] = useState(false)
  const [selectedPkg, setSelectedPkg] = useState(BUY_PACKAGES[1])
  const [filterType, setFilterType] = useState<'alle' | TxType>('alle')

  const myTx = [...state.transactions]
    .filter(t => t.userId === currentUser.id)
    .filter(t => filterType === 'alle' || t.type === filterType)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  const totalEarned = state.transactions
    .filter(t => t.userId === currentUser.id && t.amount > 0)
    .reduce((s, t) => s + t.amount, 0)

  const totalSpent = state.transactions
    .filter(t => t.userId === currentUser.id && t.amount < 0)
    .reduce((s, t) => s + t.amount, 0)

  function handleBuy() {
    dispatch({
      type: 'BUY_TOKENS',
      userId: currentUser.id,
      amount: selectedPkg.tokens,
      transaction: {
        id: nextTxId(),
        userId: currentUser.id,
        type: 'token_kauf',
        amount: selectedPkg.tokens,
        description: `${selectedPkg.tokens} Token gekauft (${selectedPkg.price})`,
        createdAt: new Date().toISOString(),
        relatedCampaignId: null,
      },
    })
    setBuyOpen(false)
  }

  function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('de-DE', {
      day: '2-digit', month: '2-digit', year: 'numeric',
    })
  }

  return (
    <div className="space-y-5">
      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="text-center py-4">
          <p className="text-3xl font-bold text-primary">{currentUser.tokens}</p>
          <p className="text-xs text-muted-foreground mt-1">Aktuelles Guthaben</p>
        </Card>
        <Card className="text-center py-4">
          <p className="text-3xl font-bold text-green-600">+{totalEarned}</p>
          <p className="text-xs text-muted-foreground mt-1">Gesamt verdient</p>
        </Card>
        <Card className="text-center py-4">
          <p className="text-3xl font-bold text-red-500">{totalSpent}</p>
          <p className="text-xs text-muted-foreground mt-1">Gesamt ausgegeben</p>
        </Card>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Label className="text-sm shrink-0">Typ:</Label>
          <Select value={filterType} onValueChange={v => setFilterType(v as 'alle' | TxType)}>
            <SelectTrigger className="w-52">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="alle">Alle Transaktionen</SelectItem>
              {(Object.entries(TX_LABELS) as [TxType, string][]).map(([k, v]) => (
                <SelectItem key={k} value={k}>{v}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => setBuyOpen(true)}>
          <Coins className="h-4 w-4 mr-2" />
          Token kaufen
        </Button>
      </div>

      {/* Transaction list */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Transaktionshistorie</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 p-0">
          {myTx.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-8">Keine Transaktionen gefunden</p>
          )}
          {myTx.map((tx, i) => (
            <div
              key={tx.id}
              className={`flex items-center gap-3 px-4 py-3 ${i % 2 === 0 ? 'bg-muted/30' : ''}`}
            >
              <div className="shrink-0">{TX_ICON[tx.type]}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{tx.description}</p>
                <p className="text-xs text-muted-foreground">{TX_LABELS[tx.type]} · {formatDate(tx.createdAt)}</p>
              </div>
              <div className={`text-sm font-bold shrink-0 ${tx.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {tx.amount >= 0 ? '+' : ''}{tx.amount} T
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Buy tokens dialog */}
      <Dialog open={buyOpen} onOpenChange={setBuyOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Token kaufen</DialogTitle>
            <DialogDescription>
              Wähle ein Paket. Token können für Kampagnen genutzt oder durch Kontakt-Freigaben verdient werden.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-2 py-2">
            {BUY_PACKAGES.map(pkg => (
              <button
                key={pkg.tokens}
                className={`flex items-center justify-between rounded-lg border px-4 py-3 text-sm transition-colors cursor-pointer ${selectedPkg.tokens === pkg.tokens ? 'border-primary bg-primary/10 font-semibold' : 'hover:bg-muted'}`}
                onClick={() => setSelectedPkg(pkg)}
              >
                <span className="flex items-center gap-2">
                  <Coins className="h-4 w-4 text-primary" />
                  {pkg.tokens} Token
                </span>
                <span className="text-muted-foreground">{pkg.price}</span>
              </button>
            ))}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBuyOpen(false)}>Abbrechen</Button>
            <Button onClick={handleBuy}>
              <Coins className="h-4 w-4 mr-1" />
              {selectedPkg.tokens} Token kaufen ({selectedPkg.price})
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
