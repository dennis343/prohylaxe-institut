"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { readConsent, writeConsent, onConsentChange } from "@/lib/consent"

export function CookieConsent() {
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [marketing, setMarketing] = useState(false)

  useEffect(() => {
    setMounted(true)
    const current = readConsent()
    if (!current) setOpen(true)
    return onConsentChange((c) => {
      if (!c) setOpen(true)
      else setOpen(false)
    })
  }, [])

  if (!mounted || !open) return null

  const acceptAll = () => {
    writeConsent({ analytics: true, marketing: true })
    setOpen(false)
  }
  const declineOptional = () => {
    writeConsent({ analytics: false, marketing: false })
    setOpen(false)
  }
  const savePreferences = () => {
    writeConsent({ analytics, marketing })
    setOpen(false)
  }

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie-Einstellungen"
      className="fixed inset-x-3 bottom-3 z-[60] sm:inset-auto sm:bottom-5 sm:left-5 sm:right-5 md:left-6 md:right-6 md:bottom-6"
    >
      <div className="mx-auto max-w-3xl overflow-hidden rounded-lg border border-border bg-background/95 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.35)] backdrop-blur-xl">
        <div className="flex flex-col gap-5 p-5 md:flex-row md:items-start md:gap-8 md:p-6">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <span
                aria-hidden
                className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
              />
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                Datenschutz
              </span>
            </div>
            <p className="mt-3 font-serif text-lg leading-snug text-foreground md:text-xl">
              Wir verwenden ausschließlich datensparsame Werkzeuge — Sie
              entscheiden, was zusätzlich geladen wird.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Essenzielle Funktionen sind immer aktiv. Optional analysieren
              wir anonyme Besuchsstatistiken und laden Video-Inhalte
              (YouTube).{" "}
              <Link
                href="/datenschutz"
                className="underline decoration-accent/60 underline-offset-4 hover:text-foreground"
              >
                Datenschutz
              </Link>
              .
            </p>

            {expanded && (
              <ul className="mt-5 space-y-3 border-t border-border pt-5 text-sm text-foreground">
                <li className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium">Essenziell</p>
                    <p className="mt-1 text-muted-foreground">
                      Erforderlich für den Betrieb der Website (z.&nbsp;B.
                      Formular-Sicherheit). Immer aktiv.
                    </p>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                    An
                  </span>
                </li>
                <li className="flex items-start justify-between gap-4">
                  <label className="flex-1 cursor-pointer">
                    <p className="font-medium">Analyse</p>
                    <p className="mt-1 text-muted-foreground">
                      Anonyme Besuchsstatistik (Vercel Analytics) — hilft
                      uns, Inhalte zu verbessern. Keine Tracker.
                    </p>
                  </label>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={analytics}
                    onClick={() => setAnalytics((v) => !v)}
                    className={`relative mt-1 inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors ${
                      analytics
                        ? "border-accent bg-accent/20"
                        : "border-border bg-background"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 rounded-full transition-transform ${
                        analytics
                          ? "translate-x-6 bg-accent"
                          : "translate-x-1 bg-muted-foreground"
                      }`}
                    />
                  </button>
                </li>
                <li className="flex items-start justify-between gap-4">
                  <label className="flex-1 cursor-pointer">
                    <p className="font-medium">Video &amp; Einbettungen</p>
                    <p className="mt-1 text-muted-foreground">
                      Ermöglicht das Laden eingebetteter Videos (YouTube
                      im erweiterten Datenschutzmodus).
                    </p>
                  </label>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={marketing}
                    onClick={() => setMarketing((v) => !v)}
                    className={`relative mt-1 inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors ${
                      marketing
                        ? "border-accent bg-accent/20"
                        : "border-border bg-background"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 rounded-full transition-transform ${
                        marketing
                          ? "translate-x-6 bg-accent"
                          : "translate-x-1 bg-muted-foreground"
                      }`}
                    />
                  </button>
                </li>
              </ul>
            )}
          </div>

          <div className="flex flex-col gap-2 md:min-w-[180px]">
            <button
              type="button"
              onClick={acceptAll}
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold tracking-wide text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Alle akzeptieren
            </button>
            {expanded ? (
              <button
                type="button"
                onClick={savePreferences}
                className="rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                Auswahl speichern
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setExpanded(true)}
                className="rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                Einstellungen
              </button>
            )}
            <button
              type="button"
              onClick={declineOptional}
              className="px-2 py-2 text-xs uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-foreground"
            >
              Nur essenziell
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
