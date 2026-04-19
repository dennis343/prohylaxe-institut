"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react"

type Variant = "waitlist" | "consultation"

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
      // honeypot
      setStatus("success")
      return
    }

    setStatus("submitting")
    // No backend yet – simulate submission success.
    await new Promise((r) => setTimeout(r, 700))
    setStatus("success")
    form.reset()
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
        <h3 className="mt-4 text-xl font-semibold text-foreground">
          Vielen Dank für Ihre Anfrage!
        </h3>
        <p className="mt-2 text-muted-foreground">
          Wir melden uns in der Regel innerhalb von 1–2 Werktagen persönlich bei Ihnen.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="space-y-5" noValidate>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">Vorname *</Label>
          <Input id="firstName" name="firstName" autoComplete="given-name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Nachname *</Label>
          <Input id="lastName" name="lastName" autoComplete="family-name" required />
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email">E-Mail *</Label>
          <Input id="email" name="email" type="email" autoComplete="email" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Telefon</Label>
          <Input id="phone" name="phone" type="tel" autoComplete="tel" />
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="practice">Praxisname</Label>
          <Input id="practice" name="practice" autoComplete="organization" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="role">Rolle in der Praxis</Label>
          <Input id="role" name="role" placeholder="z. B. Inhaber:in, Praxismanager:in" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">
          {variant === "waitlist"
            ? "Was erhoffen Sie sich vom Mentoring?"
            : "Ihre Nachricht"}
        </Label>
        <Textarea
          id="message"
          name="message"
          rows={5}
          placeholder={
            variant === "waitlist"
              ? "Worauf möchten Sie vorbereitet sein? Was ist Ihr dringendstes Thema?"
              : "Schildern Sie uns kurz Ihre Situation und Ziele."
          }
        />
      </div>

      <div className="flex items-start gap-3 rounded-lg bg-secondary/60 p-4">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          className="mt-1 h-4 w-4 shrink-0 rounded border-border accent-[var(--primary)]"
          required
        />
        <label htmlFor="consent" className="text-sm text-muted-foreground">
          Ich bin damit einverstanden, dass meine Angaben zur Bearbeitung meiner Anfrage verarbeitet
          werden. Details sind in der{" "}
          <a href="/datenschutz" className="text-primary underline-offset-2 hover:underline">
            Datenschutzerklärung
          </a>{" "}
          nachzulesen. Meine Einwilligung kann ich jederzeit widerrufen.
        </label>
      </div>

      {error && (
        <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={status === "submitting"}>
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

      <p className="text-center text-xs text-muted-foreground">
        Antwort innerhalb von 1–2 Werktagen · 100 % unverbindlich
      </p>
    </form>
  )
}
