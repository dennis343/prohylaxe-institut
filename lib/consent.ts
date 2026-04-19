"use client"

export type ConsentState = {
  essential: true
  analytics: boolean
  marketing: boolean
  decidedAt: string
}

const KEY = "pi-consent-v1"
const EVENT = "pi-consent-change"

export function readConsent(): ConsentState | null {
  if (typeof window === "undefined") return null
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as ConsentState
    if (parsed && typeof parsed === "object" && parsed.essential === true) {
      return parsed
    }
    return null
  } catch {
    return null
  }
}

export function writeConsent(
  patch: Partial<Omit<ConsentState, "essential" | "decidedAt">>,
): ConsentState {
  const next: ConsentState = {
    essential: true,
    analytics: !!patch.analytics,
    marketing: !!patch.marketing,
    decidedAt: new Date().toISOString(),
  }
  if (typeof window !== "undefined") {
    window.localStorage.setItem(KEY, JSON.stringify(next))
    window.dispatchEvent(new CustomEvent(EVENT, { detail: next }))
  }
  return next
}

export function clearConsent() {
  if (typeof window === "undefined") return
  window.localStorage.removeItem(KEY)
  window.dispatchEvent(new CustomEvent(EVENT, { detail: null }))
}

export function onConsentChange(handler: (c: ConsentState | null) => void) {
  if (typeof window === "undefined") return () => {}
  const listener = (e: Event) => {
    const ce = e as CustomEvent<ConsentState | null>
    handler(ce.detail ?? readConsent())
  }
  window.addEventListener(EVENT, listener)
  const storageListener = (e: StorageEvent) => {
    if (e.key === KEY) handler(readConsent())
  }
  window.addEventListener("storage", storageListener)
  return () => {
    window.removeEventListener(EVENT, listener)
    window.removeEventListener("storage", storageListener)
  }
}

export const CONSENT_KEY = KEY
export const CONSENT_EVENT = EVENT
