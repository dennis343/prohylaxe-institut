"use client"

import { useEffect, useState } from "react"
import { Analytics } from "@vercel/analytics/next"
import { readConsent, onConsentChange } from "@/lib/consent"

export function AnalyticsGate() {
  const [allowed, setAllowed] = useState(false)

  useEffect(() => {
    const c = readConsent()
    setAllowed(!!c?.analytics)
    return onConsentChange((next) => setAllowed(!!next?.analytics))
  }, [])

  if (process.env.NODE_ENV !== "production") return null
  if (!allowed) return null
  return <Analytics />
}
