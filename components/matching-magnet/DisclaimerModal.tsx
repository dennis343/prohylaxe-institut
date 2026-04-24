'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ShieldCheck, Users, Megaphone, CheckCircle, Mail, Star, Lock, Eye, Handshake, AlertCircle } from 'lucide-react'

interface Props {
  open: boolean
  onClose: () => void
}

const STEPS = [
  {
    icon: <Users className="h-5 w-5 text-blue-600" />,
    bg: 'bg-blue-50 border-blue-200',
    label: 'Schritt 1',
    title: 'Du pflegst deine Kontakte',
    who: 'Listinhaberin (z. B. Anna)',
    body: 'Du hast über die Jahre ein wertvolles Netzwerk aufgebaut und rechtmäßig – mit Einwilligung – erfasst. Diese Kontakte verwaltest du in deinem CRM oder deiner E-Mail-Liste.',
    note: '🔒 Deine Kontaktdaten verlassen zu keinem Zeitpunkt dein System.',
  },
  {
    icon: <Megaphone className="h-5 w-5 text-violet-600" />,
    bg: 'bg-violet-50 border-violet-200',
    label: 'Schritt 2',
    title: 'Eine andere Person stellt ihr Angebot vor',
    who: 'Kampagnenersteller (z. B. Ben)',
    body: 'Ben möchte seine IT-Security-Dienste genau den KMU vorstellen, die Anna in ihrem Netzwerk hat. Er erstellt eine Kampagnenanfrage auf der Plattform und hinterlegt Botschaft und Budget.',
    note: 'Ben sieht ausschließlich anonymisierte Kennzahlen – niemals Namen oder Kontaktdaten.',
  },
  {
    icon: <CheckCircle className="h-5 w-5 text-amber-600" />,
    bg: 'bg-amber-50 border-amber-200',
    label: 'Schritt 3',
    title: 'Du prüfst und entscheidest',
    who: 'Listinhaberin (z. B. Anna)',
    body: 'Du siehst Bens Anfrage, liest seine Botschaft und bewertest: Passt das wirklich zu meiner Community? Ist das Angebot seriös? Würde ich das selbst empfehlen? Du hast die volle Entscheidungshoheit.',
    checks: ['Inhalt relevant für meine Kontakte?', 'Anbieter vertrauenswürdig?', 'Ich stehe hinter diesem Angebot'],
  },
  {
    icon: <Mail className="h-5 w-5 text-emerald-600" />,
    bg: 'bg-emerald-50 border-emerald-200',
    label: 'Schritt 4',
    title: 'Du kommunizierst – in deinem Namen',
    who: 'Listinhaberin handelt im Auftrag',
    body: 'Du verschickst die Nachricht an deine Kontakte – über deinen eigenen Kanal, in deiner eigenen Sprache. Du bist der Absender. Die Kontaktdaten bleiben bei dir.',
    note: '✍️ Die Nachricht kommt von DIR – nicht von Ben, nicht von der Plattform.',
  },
  {
    icon: <Handshake className="h-5 w-5 text-rose-600" />,
    bg: 'bg-rose-50 border-rose-200',
    label: 'Schritt 5',
    title: 'Dein Kontakt versteht den Kontext',
    who: 'Empfänger der Botschaft',
    body: 'Dein Kontakt erhält eine transparente Nachricht. Er weiß, dass die Empfehlung von dir kommt und du das Angebot geprüft hast. Diese Transparenz schützt deine Beziehung.',
    template: true,
  },
]

const GDPR = [
  { icon: <Lock className="h-4 w-4 text-emerald-600" />, text: 'Kontaktdaten verlassen NIEMALS dein System – die Plattform sieht nur anonymisierte Klassifizierungen.' },
  { icon: <ShieldCheck className="h-4 w-4 text-emerald-600" />, text: 'Du bleibst verantwortliche Person gem. Art. 4 DSGVO. Die Rechtsgrundlage für deine Kommunikation liegt bei dir.' },
  { icon: <Eye className="h-4 w-4 text-emerald-600" />, text: 'Andere Nutzer sehen nur aggregierte Statistiken (Branche, Segment, Anzahl) – keine personenbezogenen Daten.' },
  { icon: <AlertCircle className="h-4 w-4 text-emerald-600" />, text: 'Transparenz für Empfänger: Mache in jeder Kommunikation klar, dass es sich um eine empfohlene Kooperation handelt.' },
]

const RULES = [
  { num: '01', title: 'Nur Angebote, hinter denen du stehst', body: 'Kommuniziere ausschließlich Angebote, die du persönlich geprüft hast und die deiner Community echten Mehrwert bringen.' },
  { num: '02', title: 'Deine Beziehung ist das wertvollste Asset', body: 'Schütze das Vertrauen deiner Kontakte. Qualität und Relevanz haben absoluten Vorrang vor Quantität.' },
  { num: '03', title: 'Transparenz in der Kommunikation', body: 'Mache kenntlich, dass du in Kooperation mit einem Partner kommunizierst. Ehrlichkeit stärkt deine Glaubwürdigkeit.' },
  { num: '04', title: 'Seriöse Anbieter & Inhalte', body: 'Lehne Kampagnenanfragen ab, die nicht zu deinen Werten passen. Du hast jederzeit das Recht und die Pflicht, Nein zu sagen.' },
]

export function DisclaimerModal({ open, onClose }: Props) {
  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        {/* Hero */}
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 px-6 pt-6 pb-4 rounded-t-xl border-b border-amber-200">
          <div className="flex items-center gap-2 mb-1">
            <Star className="h-5 w-5 text-amber-500 fill-amber-400" />
            <Badge className="bg-amber-500 text-white border-0">Kooperationsmodell</Badge>
          </div>
          <DialogTitle className="text-xl font-bold">
            Wie Matching Magnet funktioniert
          </DialogTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Vertrauensvolle Lead-Kooperation – DSGVO-konform, transparent und fair.
          </p>
        </div>

        <div className="px-6 py-5 space-y-6">
          {/* Flow steps */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-3">
              Der Ablauf in 5 Schritten
            </h3>
            <div className="space-y-3">
              {STEPS.map((step, i) => (
                <div key={i} className={`rounded-lg border p-4 ${step.bg}`}>
                  <div className="flex items-center gap-2 mb-2">
                    {step.icon}
                    <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {step.label}
                    </span>
                    <Badge variant="outline" className="text-xs ml-auto">{step.who}</Badge>
                  </div>
                  <p className="font-semibold text-sm mb-1">{step.title}</p>
                  <p className="text-sm text-muted-foreground">{step.body}</p>

                  {step.checks && (
                    <div className="mt-2 space-y-1">
                      {step.checks.map(c => (
                        <div key={c} className="flex items-center gap-1.5 text-sm">
                          <CheckCircle className="h-3.5 w-3.5 text-amber-600 shrink-0" />
                          <span>{c}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {step.note && (
                    <p className="mt-2 text-xs font-medium text-muted-foreground bg-white/60 rounded px-2 py-1">
                      {step.note}
                    </p>
                  )}

                  {step.template && (
                    <div className="mt-2 bg-white rounded-lg border border-rose-200 p-3 text-xs">
                      <p className="font-semibold text-rose-700 mb-1.5">📧 Muster-Nachricht (Empfänger sieht):</p>
                      <p className="text-muted-foreground leading-relaxed italic">
                        „Liebe [Vorname],<br /><br />
                        du erhältst diese Nachricht, weil ich – <strong>Anna Bauer</strong>, deine
                        Finanzmaklerin – überzeugt bin, dass das folgende Angebot einen echten
                        Mehrwert für dich bereithält.<br /><br />
                        In Kooperation mit <strong>Ben Hartmann (IT-Berater)</strong> möchte ich
                        dich auf seinen IT-Sicherheits-Audit aufmerksam machen. Ich habe das
                        Angebot persönlich geprüft und empfehle es mit gutem Gewissen.<br /><br />
                        [Kampagnentext]<br /><br />
                        Herzlich,<br />Anna"
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* DSGVO */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-3 flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              DSGVO-Konformität
            </h3>
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 space-y-2.5">
              {GDPR.map((item, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="mt-0.5 shrink-0">{item.icon}</div>
                  <p className="text-sm text-emerald-900">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Community rules */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground mb-3">
              Community-Regeln
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {RULES.map(rule => (
                <div key={rule.num} className="rounded-lg border bg-card p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl font-bold text-amber-400">{rule.num}</span>
                    <span className="font-semibold text-sm">{rule.title}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{rule.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-card border-t px-6 py-3 flex justify-end rounded-b-xl">
          <Button onClick={onClose}>Verstanden – loslegen</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
