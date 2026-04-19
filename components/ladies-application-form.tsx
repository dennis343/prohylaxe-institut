"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, Loader2, Sparkles } from "lucide-react"

const fieldClass =
  "h-12 rounded-none border-0 border-b border-border bg-transparent px-0 text-base shadow-none focus-visible:border-accent focus-visible:ring-0 md:text-[15px]"

const textareaClass =
  "rounded-none border-0 border-b border-border bg-transparent px-0 text-base shadow-none focus-visible:border-accent focus-visible:ring-0 md:text-[15px]"

const labelClass =
  "text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground"

type Role = "self" | "colleague"

export function LadiesApplicationForm() {
  const [role, setRole] = useState<Role>("self")
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [error, setError] = useState<string | null>(null)

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    const data = new FormData(e.currentTarget)

    if (!data.get("consent")) {
      setError("Bitte bestätigen Sie den Humor-Disclaimer.")
      return
    }
    if (data.get("honey")) {
      setStatus("success")
      return
    }

    const payload = {
      role,
      candidate: String(data.get("candidate") ?? ""),
      city: String(data.get("city") ?? ""),
      profession: String(data.get("profession") ?? ""),
      age: String(data.get("age") ?? ""),
      description: String(data.get("description") ?? ""),
      wishlist: String(data.get("wishlist") ?? ""),
      contact: String(data.get("contact") ?? ""),
      consent: "on" as const,
      honey: String(data.get("honey") ?? ""),
    }

    setStatus("submitting")
    try {
      const res = await fetch("/api/ladies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body?.error ?? "Übermittlung fehlgeschlagen.")
      }
      setStatus("success")
    } catch (err) {
      setStatus("idle")
      setError(err instanceof Error ? err.message : "Übermittlung fehlgeschlagen.")
    }
  }

  if (status === "success") {
    return (
      <div className="relative overflow-hidden rounded-lg border border-accent/40 bg-card p-8 text-center sm:p-12">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-10 h-64 w-64 rounded-full bg-[radial-gradient(closest-side,var(--accent),transparent_70%)] opacity-20 blur-3xl"
        />
        <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-accent/40 font-serif text-2xl italic text-accent">
          ♥
        </div>
        <h3 className="serif-display relative mt-6 text-2xl text-foreground sm:text-3xl md:text-4xl">
          Bewerbung eingegangen —{" "}
          <em className="italic text-accent">vielleicht.</em>
        </h3>
        <p className="relative mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-muted-foreground">
          Keine Sorge: Das war ein{" "}
          <span className="font-semibold text-foreground">April-Scherz</span>.
          Wir verkuppeln niemanden — aber wir freuen uns über Ihren Humor.
          Wenn Sie stattdessen echte Praxis-Liebe suchen: Unser Mentoring
          wartet nicht bis zum Valentinstag.
        </p>
        <div className="relative mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Button
            asChild
            size="lg"
            className="w-full rounded-full px-8 text-sm font-semibold tracking-wide sm:w-auto"
          >
            <a href="/programme">Programme ansehen</a>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="w-full rounded-full border-foreground/15 px-7 text-sm font-medium tracking-wide sm:w-auto"
          >
            <a href="/gespraech">Erstgespräch anfragen</a>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="space-y-10" noValidate>
      <input
        type="text"
        name="honey"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <fieldset className="space-y-4">
        <legend className={labelClass}>Ich bewerbe …</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {(
            [
              { value: "self", title: "mich selbst", hint: "Ehrlich, charmant, chronisch single." },
              { value: "colleague", title: "meine Kollegin", hint: "Sie ist zu bescheiden — also schreibe ich." },
            ] as const
          ).map((opt) => {
            const active = role === opt.value
            return (
              <label
                key={opt.value}
                className={
                  "flex cursor-pointer flex-col gap-1 rounded-md border p-4 transition-colors " +
                  (active
                    ? "border-accent bg-accent/5"
                    : "border-border hover:border-accent/60")
                }
              >
                <input
                  type="radio"
                  name="role"
                  value={opt.value}
                  checked={active}
                  onChange={() => setRole(opt.value)}
                  className="sr-only"
                />
                <span className="font-serif text-lg italic text-foreground">
                  {opt.title}
                </span>
                <span className="text-[13px] text-muted-foreground">
                  {opt.hint}
                </span>
              </label>
            )
          })}
        </div>
      </fieldset>

      <div className="grid gap-8 md:grid-cols-2 md:gap-10">
        <div className="space-y-2">
          <Label htmlFor="candidate" className={labelClass}>
            {role === "self" ? "Mein Vorname" : "Vorname der Kollegin"} *
          </Label>
          <Input
            id="candidate"
            name="candidate"
            required
            className={fieldClass}
            placeholder={role === "self" ? "z. B. Jana" : "z. B. Lisa"}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="city" className={labelClass}>
            Stadt / Region
          </Label>
          <Input
            id="city"
            name="city"
            className={fieldClass}
            placeholder="z. B. Moers, Rhein-Ruhr"
          />
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 md:gap-10">
        <div className="space-y-2">
          <Label htmlFor="profession" className={labelClass}>
            Beruf in der Praxis
          </Label>
          <Input
            id="profession"
            name="profession"
            className={fieldClass}
            placeholder="ZFA, ZMP, DH, Praxismanagerin …"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="age" className={labelClass}>
            Alter (ungefähr)
          </Label>
          <Input
            id="age"
            name="age"
            inputMode="numeric"
            className={fieldClass}
            placeholder="27"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description" className={labelClass}>
          {role === "self"
            ? "In drei Sätzen: Wer sind Sie?"
            : "In drei Sätzen: Wer ist sie?"}{" "}
          *
        </Label>
        <Textarea
          id="description"
          name="description"
          rows={4}
          required
          className={textareaClass}
          placeholder={
            role === "self"
              ? "Charmant, humorvoll, arbeitet bis in den Abend mit Leidenschaft für gesunde Zähne …"
              : "Sie lacht herzlich, riecht nach Zimt und Fluorid und zitiert Curaden-Broschüren auswendig …"
          }
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="wishlist" className={labelClass}>
          Wunschbegleitung — wer darf sich melden?
        </Label>
        <Textarea
          id="wishlist"
          name="wishlist"
          rows={3}
          className={textareaClass}
          placeholder="Pünktlich, mit Humor, kennt den Unterschied zwischen Parodontitis und Paradontose. Bonus: Kann schweigen, während die Patientin im Mund nuschelt."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact" className={labelClass}>
          Rückmeldung an — E-Mail oder Telefon *
        </Label>
        <Input
          id="contact"
          name="contact"
          required
          className={fieldClass}
          placeholder="post@praxis.de oder +49 …"
        />
      </div>

      <div className="flex items-start gap-3 border-t border-border pt-8">
        <input
          id="consent"
          name="consent"
          type="checkbox"
          required
          className="mt-1 h-4 w-4 shrink-0 rounded-sm border-border accent-[var(--accent)]"
        />
        <label
          htmlFor="consent"
          className="text-[13px] leading-relaxed text-muted-foreground"
        >
          Mir ist bewusst, dass dies ein{" "}
          <strong className="text-foreground">April-Scherz</strong> ist. Es
          findet keine echte Vermittlung statt, die Angaben werden nicht
          gespeichert und nicht weitergegeben. Ich nehme diese Kampagne mit
          Humor.
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
          className="w-full rounded-full px-8 text-sm font-semibold tracking-wide sm:w-auto"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Wird verkuppelt …
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Bewerbung absenden
            </>
          )}
        </Button>
        <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          Mit Augenzwinkern · 100 % fiktional
        </p>
      </div>
    </form>
  )
}
