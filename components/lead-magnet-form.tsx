"use client"

import { useState } from "react"
import Link from "next/link"

type Status = "idle" | "sending" | "success" | "error"

export function LeadMagnetForm({
  asset,
  assetLabel,
}: {
  asset: "prophylaxe-checkliste"
  assetLabel: string
}) {
  const [status, setStatus] = useState<Status>("idle")
  const [error, setError] = useState<string | null>(null)
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const payload = {
      asset,
      firstName: String(data.get("firstName") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      practice: String(data.get("practice") ?? "").trim(),
      consent: data.get("consent") ? ("on" as const) : "",
      honey: String(data.get("website") ?? ""),
    }

    if (!payload.firstName || !payload.email || !payload.consent) {
      setError("Bitte Vorname, E-Mail und Einwilligung ausfüllen.")
      setStatus("error")
      return
    }

    setStatus("sending")
    setError(null)
    try {
      const res = await fetch("/api/lead-magnet", {
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
      const json = await res.json()
      setDownloadUrl(json.downloadUrl ?? null)
      setStatus("success")
      form.reset()
    } catch {
      setError("Netzwerk-Fehler. Bitte erneut versuchen.")
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-accent/40 bg-accent/5 p-6 sm:p-8">
        <p className="font-serif text-xl italic text-foreground sm:text-2xl">
          Geschafft — die {assetLabel} ist auf dem Weg.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Prüfen Sie bitte Ihren Posteingang (ggf. auch den Spam-Ordner).
          Falls der Download direkt benötigt wird:
        </p>
        {downloadUrl && (
          <a
            href={downloadUrl}
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-accent bg-background px-5 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Checkliste jetzt öffnen →
          </a>
        )}
        <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
          Ein 15-Min-Kennenlernen ist der nächste sinnvolle Schritt, wenn die
          Checkliste Lücken bei Ihnen offenlegt.{" "}
          <Link href="/gespraech" className="text-accent underline-offset-4 hover:underline">
            Termin wählen
          </Link>
          .
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
        defaultValue=""
      />

      <div>
        <label htmlFor="lm-firstName" className="block text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          Vorname
        </label>
        <input
          id="lm-firstName"
          name="firstName"
          type="text"
          autoComplete="given-name"
          required
          maxLength={80}
          className="mt-2 w-full rounded-md border border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="lm-email" className="block text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          E-Mail
        </label>
        <input
          id="lm-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={160}
          className="mt-2 w-full rounded-md border border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="lm-practice" className="block text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          Praxis <span className="text-muted-foreground/70 normal-case tracking-normal">(optional)</span>
        </label>
        <input
          id="lm-practice"
          name="practice"
          type="text"
          autoComplete="organization"
          maxLength={160}
          className="mt-2 w-full rounded-md border border-border bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
        />
      </div>

      <label className="flex items-start gap-3 text-xs leading-relaxed text-muted-foreground">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-0.5 h-4 w-4 rounded border-border text-accent focus:ring-accent"
        />
        <span>
          Ich willige ein, dass das Prophylaxe-Institut mir die angeforderte
          Checkliste per E-Mail sendet. Die Hinweise zur{" "}
          <Link href="/datenschutz" className="text-accent underline-offset-4 hover:underline">
            Datenverarbeitung
          </Link>{" "}
          habe ich zur Kenntnis genommen.
        </span>
      </label>

      {error && (
        <p className="rounded-md border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold tracking-wide text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? "Wird gesendet …" : `${assetLabel} zusenden`}
      </button>
    </form>
  )
}
