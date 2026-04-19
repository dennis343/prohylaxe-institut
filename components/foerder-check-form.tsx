"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { CheckCircle2, Loader2 } from "lucide-react"

type Employees = "1" | "2-9" | "10-49" | "50-249" | "250+"
type Region = "west" | "ost" | "unsure"
type PracticeAge = "<2" | "2-5" | ">5"
type StartWish = "asap" | "1-3m" | "3-6m" | "later"

type FormState = {
  employees: Employees | ""
  postalCode: string
  region: Region | ""
  practiceAge: PracticeAge | ""
  startWish: StartWish | ""
  website: string
  practice: string
  firstName: string
  lastName: string
  email: string
  phone: string
  consent: boolean
}

type Result = {
  eligible: boolean
  quote: number
  reasons: string[]
}

const EAST_PREFIXES = ["01", "02", "03", "04", "06", "07", "08", "09", "10", "12", "13", "14", "15", "16", "17", "18", "19", "39", "98", "99"]

const EMPLOYEE_OPTIONS: { value: Employees; label: string; note: string }[] = [
  { value: "1", label: "Nur ich / Einzelpraxis", note: "KMU-konform" },
  { value: "2-9", label: "2–9 Mitarbeitende", note: "KMU-konform" },
  { value: "10-49", label: "10–49 Mitarbeitende", note: "KMU-konform" },
  { value: "50-249", label: "50–249 Mitarbeitende", note: "Mittleres Unternehmen — KMU-konform" },
  { value: "250+", label: "250 oder mehr", note: "Über KMU-Grenze — BAFA nicht mehr einschlägig" },
]

const REGION_OPTIONS: { value: Region; label: string; note: string }[] = [
  { value: "west", label: "Westdeutschland", note: "Fördersatz bis 50 %" },
  { value: "ost", label: "Ostdeutschland / Berlin", note: "Fördersatz bis 80 %" },
  { value: "unsure", label: "Nicht sicher — anhand PLZ prüfen", note: "Wir leiten das aus Ihrer Postleitzahl ab" },
]

const PRACTICE_AGE_OPTIONS: { value: PracticeAge; label: string; note: string }[] = [
  { value: "<2", label: "Weniger als 2 Jahre", note: "Jungunternehmen — eigene Förderkulisse möglich" },
  { value: "2-5", label: "2 – 5 Jahre", note: "Bestandsunternehmen" },
  { value: ">5", label: "Mehr als 5 Jahre", note: "Bestandsunternehmen" },
]

const START_OPTIONS: { value: StartWish; label: string; note: string }[] = [
  { value: "asap", label: "So schnell wie möglich", note: "Wir halten Ihnen einen der nächsten Slots frei" },
  { value: "1-3m", label: "In 1–3 Monaten", note: "Genug Vorlauf für Antrag & Vorbereitung" },
  { value: "3-6m", label: "In 3–6 Monaten", note: "Komfortabler Planungshorizont" },
  { value: "later", label: "Später / erst einmal orientieren", note: "Wir melden uns unverbindlich" },
]

const TOTAL_STEPS = 5

function regionFromPostalCode(pc: string, declared: Region | ""): "west" | "ost" | null {
  if (declared === "west" || declared === "ost") return declared
  if (!/^\d{5}$/.test(pc)) return null
  const prefix = pc.slice(0, 2)
  return EAST_PREFIXES.includes(prefix) ? "ost" : "west"
}

export function FoerderCheckForm() {
  const [step, setStep] = useState(1)
  const [state, setState] = useState<FormState>({
    employees: "",
    postalCode: "",
    region: "",
    practiceAge: "",
    startWish: "",
    website: "",
    practice: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    consent: false,
  })
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<Result | null>(null)

  const derivedRegion = useMemo(
    () => regionFromPostalCode(state.postalCode, state.region),
    [state.postalCode, state.region],
  )

  const previewQuote = useMemo(() => {
    if (state.employees === "250+") return 0
    if (derivedRegion === "ost") return 80
    if (derivedRegion === "west") return 50
    return null
  }, [state.employees, derivedRegion])

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setState((s) => ({ ...s, [key]: value }))
  }

  function canAdvance(): boolean {
    switch (step) {
      case 1:
        return state.employees !== ""
      case 2:
        return /^\d{5}$/.test(state.postalCode) && state.region !== ""
      case 3:
        return state.practiceAge !== "" && state.startWish !== ""
      case 4:
        return state.practice.trim().length > 0
      case 5:
        return (
          state.firstName.trim().length > 0 &&
          state.lastName.trim().length > 0 &&
          /.+@.+\..+/.test(state.email) &&
          state.consent
        )
      default:
        return false
    }
  }

  async function handleSubmit() {
    if (!canAdvance()) return
    setStatus("submitting")
    setError(null)
    try {
      const res = await fetch("/api/foerder-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          employees: state.employees,
          postalCode: state.postalCode,
          region: state.region,
          practiceAge: state.practiceAge,
          startWish: state.startWish,
          website: state.website,
          practice: state.practice,
          firstName: state.firstName,
          lastName: state.lastName,
          email: state.email,
          phone: state.phone,
          consent: "on",
          honey: "",
        }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body?.error ?? "Übermittlung fehlgeschlagen.")
      }
      const body = await res.json()
      setResult(body.result)
      setStatus("success")
    } catch (e) {
      setStatus("error")
      setError(e instanceof Error ? e.message : "Übermittlung fehlgeschlagen.")
    }
  }

  if (status === "success" && result) {
    return (
      <div className="rounded-lg border border-border bg-card p-8 md:p-12">
        <div className="flex items-center gap-3 text-accent">
          <CheckCircle2 className="h-6 w-6" />
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em]">Erste Einschätzung</p>
        </div>
        <h2 className="mt-6 font-serif text-3xl italic leading-tight text-foreground md:text-4xl">
          {result.eligible ? (
            <>
              Ihre Praxis ist voraussichtlich{" "}
              <em className="not-italic text-accent">zu {result.quote} % förderfähig.</em>
            </>
          ) : (
            <>Aktuell kein klarer BAFA-Pfad — aber das ist nicht das Ende.</>
          )}
        </h2>
        <ul className="mt-8 space-y-3 border-t border-border pt-6 text-[15px] leading-relaxed text-foreground">
          {result.reasons.map((r) => (
            <li key={r} className="flex gap-3">
              <span aria-hidden className="mt-[0.55em] inline-block h-px w-4 shrink-0 bg-accent" />
              <span>{r}</span>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
          Das ist eine automatische Orientierung auf Basis Ihrer Angaben — kein rechtsverbindlicher Bescheid. Für die
          finale Eignung prüfen wir mit Ihnen Jahresumsatz, Bilanz und den konkreten Beratungs­gegenstand, bevor der
          Antrag gestellt wird.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/gespraech"
            className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-semibold tracking-wide text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            15-Min-Kennenlernen buchen →
          </Link>
          <Link
            href="/programme"
            className="inline-flex items-center justify-center rounded-full border border-foreground/15 px-7 py-3 text-sm font-medium tracking-wide text-foreground transition-colors hover:bg-secondary"
          >
            Programme ansehen
          </Link>
        </div>
      </div>
    )
  }

  const progressPct = Math.round(((step - 1) / TOTAL_STEPS) * 100)

  return (
    <div className="rounded-lg border border-border bg-card p-6 sm:p-8 md:p-10">
      <div className="flex items-center justify-between gap-4 border-b border-border pb-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          Schritt {step} von {TOTAL_STEPS}
        </p>
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
          ≈ 90 Sekunden
        </p>
      </div>
      <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full bg-accent transition-all duration-500"
          style={{ width: `${Math.max(progressPct, 4)}%` }}
        />
      </div>

      <div className="mt-8">
        {step === 1 && (
          <StepBlock
            eyebrow="Größe der Praxis"
            title="Wie viele Mitarbeitende sind in Ihrer Praxis?"
            help="BAFA-Beratungs­förderung ist für KMU vorgesehen (< 250 Mitarbeitende, Jahresumsatz ≤ 50 Mio. €)."
          >
            <RadioGroup
              name="employees"
              value={state.employees}
              onChange={(v) => update("employees", v as Employees)}
              options={EMPLOYEE_OPTIONS}
            />
          </StepBlock>
        )}

        {step === 2 && (
          <StepBlock
            eyebrow="Standort"
            title="Wo liegt Ihre Praxis?"
            help="Der Fördersatz hängt vom Bundesland ab. Die PLZ gibt uns den ersten Anhaltspunkt."
          >
            <div className="grid gap-5 md:grid-cols-[1fr_2fr]">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  Postleitzahl
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={5}
                  value={state.postalCode}
                  onChange={(e) => update("postalCode", e.target.value.replace(/\D/g, "").slice(0, 5))}
                  className="mt-2 w-full rounded-md border border-border bg-background px-4 py-3 text-base text-foreground focus:border-accent focus:outline-none"
                  placeholder="z. B. 47441"
                />
                {/^\d{5}$/.test(state.postalCode) && derivedRegion && (
                  <p className="mt-3 text-[13px] leading-relaxed text-accent">
                    ✓ PLZ eingeordnet — {derivedRegion === "ost" ? "Ostdeutschland / Berlin" : "Westdeutschland"}.
                  </p>
                )}
              </div>
              <div>
                <p className="block text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  Region (optional bestätigen)
                </p>
                <div className="mt-2">
                  <RadioGroup
                    name="region"
                    value={state.region}
                    onChange={(v) => update("region", v as Region)}
                    options={REGION_OPTIONS}
                  />
                </div>
              </div>
            </div>
          </StepBlock>
        )}

        {step === 3 && (
          <StepBlock
            eyebrow="Zeitrahmen"
            title="Wie lange gibt es Ihre Praxis — und wann möchten Sie starten?"
            help="Jungunternehmen (< 2 Jahre) haben eigene Förderkulissen. Der Startwunsch hilft uns bei der Terminplanung."
          >
            <div className="space-y-8">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  Praxisalter
                </p>
                <div className="mt-2">
                  <RadioGroup
                    name="practiceAge"
                    value={state.practiceAge}
                    onChange={(v) => update("practiceAge", v as PracticeAge)}
                    options={PRACTICE_AGE_OPTIONS}
                  />
                </div>
              </div>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                  Frühester Startwunsch
                </p>
                <div className="mt-2">
                  <RadioGroup
                    name="startWish"
                    value={state.startWish}
                    onChange={(v) => update("startWish", v as StartWish)}
                    options={START_OPTIONS}
                  />
                </div>
              </div>
            </div>
          </StepBlock>
        )}

        {step === 4 && (
          <StepBlock
            eyebrow="Ihre Praxis"
            title="Wie dürfen wir Ihre Praxis nennen?"
            help="Damit wir im Erstgespräch konkret werden können — und nicht bei Nullpunkt anfangen."
          >
            <div className="grid gap-5">
              <TextField
                label="Praxisname *"
                name="practice"
                value={state.practice}
                onChange={(v) => update("practice", v)}
                placeholder="z. B. Zahnarztpraxis Mustermann"
                autoComplete="organization"
              />
              <TextField
                label="Website / Domain (optional)"
                name="website"
                value={state.website}
                onChange={(v) => update("website", v)}
                placeholder="www.ihre-praxis.de"
                autoComplete="url"
              />
            </div>
            {previewQuote !== null && previewQuote > 0 && (
              <div className="mt-6 rounded-md border border-accent/30 bg-accent/5 px-4 py-3 text-[13px] leading-relaxed text-foreground">
                ✓ Bisher sieht alles gut aus. Voraussichtliche Quote:{" "}
                <strong className="text-accent">{previewQuote} %</strong>
              </div>
            )}
          </StepBlock>
        )}

        {step === 5 && (
          <StepBlock
            eyebrow="Ergebnis erhalten"
            title="Wohin dürfen wir die Einschätzung senden?"
            help="Sie bekommen sofort eine Bestätigungsmail. Minka meldet sich innerhalb von 1–2 Werktagen persönlich."
          >
            <div className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <TextField
                  label="Vorname *"
                  name="firstName"
                  value={state.firstName}
                  onChange={(v) => update("firstName", v)}
                  autoComplete="given-name"
                />
                <TextField
                  label="Nachname *"
                  name="lastName"
                  value={state.lastName}
                  onChange={(v) => update("lastName", v)}
                  autoComplete="family-name"
                />
              </div>
              <TextField
                label="E-Mail *"
                name="email"
                type="email"
                value={state.email}
                onChange={(v) => update("email", v)}
                autoComplete="email"
              />
              <TextField
                label="Telefon (optional)"
                name="phone"
                type="tel"
                value={state.phone}
                onChange={(v) => update("phone", v)}
                autoComplete="tel"
              />
              <label className="flex items-start gap-3 pt-2 text-[13px] leading-relaxed text-muted-foreground">
                <input
                  type="checkbox"
                  checked={state.consent}
                  onChange={(e) => update("consent", e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-border accent-[var(--accent)]"
                />
                <span>
                  Ich willige ein, dass meine Angaben zur Förderberatung verarbeitet werden. Details zur{" "}
                  <Link href="/datenschutz" className="text-accent underline-offset-4 hover:underline">
                    Datenverarbeitung
                  </Link>
                  .
                </span>
              </label>
            </div>
          </StepBlock>
        )}
      </div>

      {error && (
        <p className="mt-6 rounded-md border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="mt-10 flex flex-col-reverse items-stretch gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(1, s - 1))}
          disabled={step === 1 || status === "submitting"}
          className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40"
        >
          ← Zurück
        </button>
        {step < TOTAL_STEPS ? (
          <button
            type="button"
            onClick={() => {
              if (canAdvance()) setStep((s) => s + 1)
            }}
            disabled={!canAdvance()}
            className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-semibold tracking-wide text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-50"
          >
            Weiter →
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canAdvance() || status === "submitting"}
            className="inline-flex items-center justify-center rounded-full bg-primary px-7 py-3 text-sm font-semibold tracking-wide text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status === "submitting" ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Wird ausgewertet …
              </>
            ) : (
              "Einschätzung anfordern →"
            )}
          </button>
        )}
      </div>
    </div>
  )
}

function StepBlock({
  eyebrow,
  title,
  help,
  children,
}: {
  eyebrow: string
  title: string
  help: string
  children: React.ReactNode
}) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">{eyebrow}</p>
      <h3 className="mt-3 font-serif text-2xl leading-snug text-foreground sm:text-3xl">{title}</h3>
      <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-muted-foreground">{help}</p>
      <div className="mt-7">{children}</div>
    </div>
  )
}

function RadioGroup<T extends string>({
  name,
  value,
  onChange,
  options,
}: {
  name: string
  value: T | ""
  onChange: (v: T) => void
  options: { value: T; label: string; note: string }[]
}) {
  return (
    <div className="grid gap-3">
      {options.map((opt) => {
        const checked = value === opt.value
        return (
          <label
            key={opt.value}
            className={`flex cursor-pointer items-start gap-4 rounded-md border px-4 py-4 transition-colors ${
              checked
                ? "border-accent bg-accent/5"
                : "border-border bg-background hover:border-foreground/30"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={checked}
              onChange={() => onChange(opt.value)}
              className="mt-1 h-4 w-4 shrink-0 accent-[var(--accent)]"
            />
            <div className="flex flex-col gap-1">
              <span className="text-[15px] font-medium leading-snug text-foreground">{opt.label}</span>
              <span className="text-[13px] leading-relaxed text-muted-foreground">{opt.note}</span>
            </div>
          </label>
        )
      })}
    </div>
  )
}

function TextField({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  autoComplete,
}: {
  label: string
  name: string
  value: string
  onChange: (v: string) => void
  type?: string
  placeholder?: string
  autoComplete?: string
}) {
  return (
    <div>
      <label
        htmlFor={`fc-${name}`}
        className="block text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground"
      >
        {label}
      </label>
      <input
        id={`fc-${name}`}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="mt-2 w-full rounded-md border border-border bg-background px-4 py-3 text-base text-foreground focus:border-accent focus:outline-none"
      />
    </div>
  )
}
