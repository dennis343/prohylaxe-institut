"use client"

import { useEffect, useRef } from "react"

const SCRIPT_SRC = "https://asset-tidycal.b-cdn.net/js/embed.js"
const SCRIPT_ID = "tidycal-embed-script"

export function TidyCalEmbed({ path }: { path: string }) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    const ensureScript = (): Promise<void> =>
      new Promise((resolve) => {
        if (document.getElementById(SCRIPT_ID)) {
          resolve()
          return
        }
        const s = document.createElement("script")
        s.id = SCRIPT_ID
        s.src = SCRIPT_SRC
        s.async = true
        s.onload = () => resolve()
        document.body.appendChild(s)
      })

    let cancelled = false
    ensureScript().then(() => {
      if (cancelled) return
      const w = window as unknown as { TidyCal?: { init?: () => void } }
      w.TidyCal?.init?.()
    })

    return () => {
      cancelled = true
    }
  }, [path])

  return (
    <div
      ref={ref}
      className="tidycal-embed"
      data-path={path}
    />
  )
}
