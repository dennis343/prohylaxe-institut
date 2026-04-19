"use client"

import { useEffect, useState } from "react"
import { readConsent, writeConsent, onConsentChange } from "@/lib/consent"

type Props = {
  id: string
  title: string
}

export function YouTubeConsentEmbed({ id, title }: Props) {
  const [allowed, setAllowed] = useState(false)
  const [overrideOnce, setOverrideOnce] = useState(false)

  useEffect(() => {
    const c = readConsent()
    setAllowed(!!c?.marketing)
    return onConsentChange((next) => setAllowed(!!next?.marketing))
  }, [])

  const show = allowed || overrideOnce

  if (show) {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1`}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        className="absolute inset-0 h-full w-full border-0"
      />
    )
  }

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-primary p-6 text-center text-primary-foreground">
      <span
        aria-hidden
        className="flex h-14 w-14 items-center justify-center rounded-full border border-primary-foreground/30 text-primary-foreground"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
      <p className="max-w-xs font-serif text-base italic leading-snug text-primary-foreground/90 md:text-lg">
        Video-Einbettung (YouTube) ist deaktiviert.
      </p>
      <p className="max-w-xs text-xs text-primary-foreground/70">
        Aktivieren Sie „Video &amp; Einbettungen" in den Cookie-Einstellungen
        — oder laden Sie nur dieses Video einmalig.
      </p>
      <div className="flex flex-col gap-2 pt-2 sm:flex-row">
        <button
          type="button"
          onClick={() => setOverrideOnce(true)}
          className="rounded-full bg-accent px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent-foreground"
        >
          Nur dieses Video laden
        </button>
        <button
          type="button"
          onClick={() => writeConsent({ analytics: !!readConsent()?.analytics, marketing: true })}
          className="rounded-full border border-primary-foreground/30 px-5 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground hover:bg-primary-foreground/10"
        >
          Videos immer laden
        </button>
      </div>
    </div>
  )
}
