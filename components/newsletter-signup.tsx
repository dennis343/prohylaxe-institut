"use client"

import { useState } from "react"
import Link from "next/link"

type Status = "idle" | "sending" | "success" | "error"

export function NewsletterSignup({
  source = "footer",
  variant = "footer",
}: {
  source?: string
  variant?: "footer" | "inline"
}) {
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const payload = {
      email: String(data.get("email") ?? "").trim(),
      source,
      consent: data.get("consent") ? ("on" as const) : "",
      honey: String(data.get("website") ?? ""),
    }

    if (!payload.email || !payload.consent) {
      setError("Bitte E-Mail und Einwilligung ausfüllen.")
      setStatus("error")
      return
    }

    setStatus("sending")
    setError(null)
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const json = await res.json().catch(() => ({ error: "Fehler" }))
        setError(json.error ?? "Versand fehlgeschlagen.")
        setStatus("error")
        return
      }
      setStatus("success")
      form.reset()
    } catch {
      setError("Netzwerk-Fehler. Bitte erneut versuchen.")
      setStatus("error")
    }
  }

  const isFooter = variant === "footer"

  if (status === "success") {
    return (
      <p className={isFooter ? "text-sm text-foreground" : "text-base text-foreground"}>
        Geschafft — wir senden Ihnen eine Bestätigungs-E-Mail. Bitte darin den
        Link klicken (Double-Opt-In).
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={isFooter ? "space-y-3" : "space-y-4"}>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        defaultValue=""
      />

      <div className={isFooter ? "flex flex-col gap-2 sm:flex-row" : "flex flex-col gap-3 sm:flex-row"}>
        <label htmlFor={`nl-email-${source}`} className="sr-only">
          E-Mail
        </label>
        <input
          id={`nl-email-${source}`}
          name="email"
          type="email"
          placeholder="ihre@praxis.de"
          autoComplete="email"
          required
          maxLength={160}
          className="flex-1 rounded-full border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold tracking-wide text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-60"
        >
          {status === "sending" ? "…" : "Anmelden"}
        </button>
      </div>

      <label className="flex items-start gap-3 text-[11px] leading-relaxed text-muted-foreground">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-0.5 h-3.5 w-3.5 rounded border-border text-accent focus:ring-accent"
        />
        <span>
          Ich möchte den Newsletter erhalten (Double-Opt-In) und habe die{" "}
          <Link href="/datenschutz" className="text-accent underline-offset-4 hover:underline">
            Datenschutzhinweise
          </Link>{" "}
          zur Kenntnis genommen.
        </span>
      </label>

      {error && <p className="text-xs text-destructive">{error}</p>}
    </form>
  )
}
