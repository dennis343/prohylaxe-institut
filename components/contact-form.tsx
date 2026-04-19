"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, Loader2 } from "lucide-react"

type Variant = "waitlist" | "consultation"

const fieldClass =
  "h-12 rounded-none border-0 border-b border-border bg-transparent px-0 text-base shadow-none focus-visible:border-accent focus-visible:ring-0 md:text-[15px]"

const textareaClass =
  "rounded-none border-0 border-b border-border bg-transparent px-0 text-base shadow-none focus-visible:border-accent focus-visible:ring-0 md:text-[15px]"

const labelClass =
  "text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground"

export function ContactForm({ variant = "consultation" }: { variant?: Variant }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [error, setError] = useState<string | null>(null)

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    const form = e.currentTarget
    const data = new FormData(form)

    if (!data.get("consent")) {
      setError("Bitte stimmen Sie der Datenschutzerklärung zu.")
      return
    }
    if (data.get("website")) {
      setStatus("success")
      return
    }

    const payload = {
      variant,
      firstName: String(data.get("firstName") ?? ""),
      lastName: String(data.get("lastName") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      practice: String(data.get("practice") ?? ""),
      role: String(data.get("role") ?? ""),
      message: String(data.get("message") ?? ""),
      consent: "on" as const,
      website: String(data.get("website") ?? ""),
    }

    setStatus("submitting")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body?.error ?? "Übermittlung fehlgeschlagen.")
      }
      setStatus("success")
      form.reset()
    } catch (err) {
      setStatus("idle")
      setError(err instanceof Error ? err.message : "Übermittlung fehlgeschlagen.")
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-lg border border-border bg-card p-10 text-center md:p-12">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-accent/40 font-serif text-2xl italic text-accent">
          ✓
        </div>
        <h3 className="serif-display mt-6 text-2xl text-foreground md:text-3xl">
          Vielen Dank.
        </h3>
        <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground">
          Wir melden uns in der Regel innerhalb von 1–2 Werktagen persönlich
          bei Ihnen.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="space-y-10" noValidate>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid gap-8 md:grid-cols-2 md:gap-10">
        <div className="space-y-2">
          <Label htmlFor="firstName" className={labelClass}>
            Vorname *
          </Label>
          <Input
            id="firstName"
            name="firstName"
            autoComplete="given-name"
            required
            className={fieldClass}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName" className={labelClass}>
            Nachname *
          </Label>
          <Input
            id="lastName"
            name="lastName"
            autoComplete="family-name"
            required
            className={fieldClass}
          />
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 md:gap-10">
        <div className="space-y-2">
          <Label htmlFor="email" className={labelClass}>
            E-Mail *
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={fieldClass}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone" className={labelClass}>
            Telefon
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={fieldClass}
          />
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 md:gap-10">
        <div className="space-y-2">
          <Label htmlFor="practice" className={labelClass}>
            Praxisname
          </Label>
          <Input
            id="practice"
            name="practice"
            autoComplete="organization"
            className={fieldClass}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="role" className={labelClass}>
            Rolle in der Praxis
          </Label>
          <Input
            id="role"
            name="role"
            placeholder="z. B. Inhaber:in, Praxismanager:in"
            className={fieldClass}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message" className={labelClass}>
          {variant === "waitlist"
            ? "Was erhoffen Sie sich vom Mentoring?"
            : "Ihre Nachricht"}
        </Label>
        <Textarea
          id="message"
          name="message"
          rows={4}
          placeholder={
            variant === "waitlist"
              ? "Worauf möchten Sie vorbereitet sein?"
              : "Schildern Sie uns kurz Ihre Situation und Ziele."
          }
          className={textareaClass}
        />
      </div>

      <div className="flex items-start gap-3 border-t border-border pt-8">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          className="mt-1 h-4 w-4 shrink-0 rounded-sm border-border accent-[var(--accent)]"
          required
        />
        <label
          htmlFor="consent"
          className="text-[13px] leading-relaxed text-muted-foreground"
        >
          Ich bin damit einverstanden, dass meine Angaben zur Bearbeitung
          meiner Anfrage verarbeitet werden. Details in der{" "}
          <a
            href="/datenschutz"
            className="text-accent underline-offset-4 hover:underline"
          >
            Datenschutzerklärung
          </a>
          . Die Einwilligung kann jederzeit widerrufen werden.
        </label>
      </div>

      {error && (
        <div className="flex items-start gap-2 border-l-2 border-destructive bg-destructive/5 px-4 py-3 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="flex flex-col items-start gap-4 pt-2">
        <Button
          type="submit"
          size="lg"
          className="w-full rounded-full px-8 text-sm tracking-wide sm:w-auto"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Wird gesendet …
            </>
          ) : variant === "waitlist" ? (
            "Unverbindlich auf die Warteliste"
          ) : (
            "Erstgespräch anfragen"
          )}
        </Button>
        <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          Antwort in 1–2 Werktagen · 100 % unverbindlich
        </p>
      </div>
    </form>
  )
}
