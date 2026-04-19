import { NextResponse } from "next/server"
import { z } from "zod"
import { sendMail, escapeHtml } from "@/lib/mail"
import { rateLimit, getClientIp } from "@/lib/rate-limit"

export const runtime = "nodejs"

const schema = z.object({
  employees: z.enum(["1", "2-9", "10-49", "50-249", "250+"]),
  postalCode: z.string().regex(/^\d{5}$/),
  region: z.enum(["west", "ost", "unsure"]),
  practiceAge: z.enum(["<2", "2-5", ">5"]),
  startWish: z.enum(["asap", "1-3m", "3-6m", "later"]),
  website: z.string().max(240).optional().or(z.literal("")),
  practice: z.string().min(1).max(160),
  firstName: z.string().min(1).max(80),
  lastName: z.string().min(1).max(80),
  email: z.string().email().max(160),
  phone: z.string().max(40).optional().or(z.literal("")),
  consent: z.union([z.literal("on"), z.literal(true), z.literal("true")]),
  honey: z.string().max(0).optional().or(z.literal("")),
})

type Input = z.infer<typeof schema>

const EAST_PREFIXES = ["01", "02", "03", "04", "06", "07", "08", "09", "10", "12", "13", "14", "15", "16", "17", "18", "19", "39", "98", "99"]

function regionFromPostalCode(pc: string, declared: Input["region"]): "west" | "ost" {
  if (declared === "west" || declared === "ost") return declared
  const prefix = pc.slice(0, 2)
  return EAST_PREFIXES.includes(prefix) ? "ost" : "west"
}

function evaluate(data: Input): { eligible: boolean; quote: number; reasons: string[] } {
  const reasons: string[] = []
  const kmu = data.employees !== "250+"
  if (!kmu) reasons.push("Über 249 Mitarbeitende — außerhalb der KMU-Definition.")
  const region = regionFromPostalCode(data.postalCode, data.region)
  const baseRate = region === "ost" ? 80 : 50
  reasons.push(
    region === "ost"
      ? "Ostdeutschland / Berlin: bis zu 80 % Zuschuss."
      : "Westdeutschland: bis zu 50 % Zuschuss.",
  )
  if (data.practiceAge === "<2") {
    reasons.push("Jungunternehmen (< 2 Jahre): eigene Förderkulisse prüfbar.")
  }
  return { eligible: kmu, quote: kmu ? baseRate : 0, reasons }
}

export async function POST(req: Request) {
  const ip = getClientIp(req.headers)
  const limit = rateLimit({ key: `foerder:${ip}`, limit: 5, windowMs: 60_000 })
  if (!limit.ok) {
    return NextResponse.json({ error: "Zu viele Anfragen." }, { status: 429 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Ungültiges Format." }, { status: 400 })
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "Bitte alle Pflichtfelder prüfen." }, { status: 400 })
  }
  const data = parsed.data
  if (data.honey && data.honey.length > 0) return NextResponse.json({ ok: true })

  const result = evaluate(data)
  const to = process.env.CONTACT_TO_EMAIL ?? "info@prophylaxe-institut.de"

  const subject = `[Förder-Quickcheck] ${data.practice} · ${result.quote} % · ${data.firstName} ${data.lastName}`
  const textLines = [
    `Praxis: ${data.practice}`,
    `Name: ${data.firstName} ${data.lastName}`,
    `E-Mail: ${data.email}`,
    data.phone ? `Telefon: ${data.phone}` : null,
    data.website ? `Website: ${data.website}` : null,
    "",
    `Mitarbeitende: ${data.employees}`,
    `PLZ: ${data.postalCode} (Region: ${data.region})`,
    `Praxisalter: ${data.practiceAge}`,
    `Startwunsch: ${data.startWish}`,
    "",
    `→ Einschätzung: ${result.eligible ? "förderfähig" : "nicht KMU-förderfähig"}`,
    `→ Voraussichtliche Quote: ${result.quote} %`,
    ...result.reasons.map((r) => `· ${r}`),
    "",
    `IP: ${ip}`,
  ].filter(Boolean) as string[]

  const html = `
    <h2>Förder-Quickcheck eingegangen</h2>
    <p><strong>Praxis:</strong> ${escapeHtml(data.practice)}</p>
    <p><strong>Name:</strong> ${escapeHtml(`${data.firstName} ${data.lastName}`)}</p>
    <p><strong>E-Mail:</strong> <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>
    ${data.phone ? `<p><strong>Telefon:</strong> ${escapeHtml(data.phone)}</p>` : ""}
    ${data.website ? `<p><strong>Website:</strong> ${escapeHtml(data.website)}</p>` : ""}
    <hr>
    <p><strong>Mitarbeitende:</strong> ${escapeHtml(data.employees)}</p>
    <p><strong>PLZ:</strong> ${escapeHtml(data.postalCode)} (Region: ${escapeHtml(data.region)})</p>
    <p><strong>Praxisalter:</strong> ${escapeHtml(data.practiceAge)}</p>
    <p><strong>Startwunsch:</strong> ${escapeHtml(data.startWish)}</p>
    <hr>
    <p><strong>Einschätzung:</strong> ${result.eligible ? "förderfähig" : "nicht KMU-förderfähig"}</p>
    <p><strong>Voraussichtliche Quote:</strong> ${result.quote} %</p>
    <ul>${result.reasons.map((r) => `<li>${escapeHtml(r)}</li>`).join("")}</ul>
    <hr>
    <p style="color:#888;font-size:12px">IP: ${escapeHtml(ip)}</p>
  `

  const internal = sendMail({
    to,
    subject,
    text: textLines.join("\n"),
    html,
    replyTo: data.email,
  })

  const userConfirmation = sendMail({
    to: data.email,
    subject: "Ihr Förder-Quickcheck — erste Einschätzung",
    text: `Liebe/r ${data.firstName},\n\nvielen Dank für Ihre Angaben. Erste Einschätzung anhand Ihrer Daten:\n\n· Voraussichtliche Förderquote: ${result.quote} %\n· Region: ${data.region}\n\nWichtiger Hinweis: Dies ist eine erste Orientierung, kein rechtsverbindlicher Bescheid. Wir prüfen Ihre Eignung vor dem Antrag detailliert mit Ihnen.\n\nMinka meldet sich in 1–2 Werktagen persönlich, um die nächsten Schritte zu besprechen.\n\nHerzliche Grüße\nMinka & das Prophylaxe-Institut\n`,
    html: `
      <p>Liebe/r ${escapeHtml(data.firstName)},</p>
      <p>vielen Dank für Ihre Angaben. Erste Einschätzung anhand Ihrer Daten:</p>
      <ul>
        <li><strong>Voraussichtliche Förderquote:</strong> ${result.quote} %</li>
        <li><strong>Region:</strong> ${escapeHtml(data.region)}</li>
      </ul>
      <p><em>Wichtiger Hinweis:</em> Dies ist eine erste Orientierung, kein rechtsverbindlicher Bescheid. Wir prüfen Ihre Eignung vor dem Antrag detailliert mit Ihnen.</p>
      <p>Minka meldet sich in 1–2 Werktagen persönlich, um die nächsten Schritte zu besprechen.</p>
      <p>Herzliche Grüße<br>Minka &amp; das Prophylaxe-Institut</p>
    `,
  })

  const [i, u] = await Promise.all([internal, userConfirmation])
  if (!i.ok || !u.ok) {
    return NextResponse.json({ error: "Versand fehlgeschlagen." }, { status: 502 })
  }
  return NextResponse.json({
    ok: true,
    result: {
      eligible: result.eligible,
      quote: result.quote,
      reasons: result.reasons,
    },
  })
}
