import { NextResponse } from "next/server"
import { z } from "zod"
import { sendMail, escapeHtml } from "@/lib/mail"
import { rateLimit, getClientIp } from "@/lib/rate-limit"

export const runtime = "nodejs"

const schema = z.object({
  email: z.string().email().max(160),
  source: z.string().max(80).optional(),
  consent: z.union([z.literal("on"), z.literal(true), z.literal("true")]),
  honey: z.string().max(0).optional().or(z.literal("")),
})

export async function POST(req: Request) {
  const ip = getClientIp(req.headers)
  const limit = rateLimit({ key: `newsletter:${ip}`, limit: 5, windowMs: 60_000 })
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
    return NextResponse.json({ error: "Bitte E-Mail prüfen." }, { status: 400 })
  }
  const { email, source = "footer", honey } = parsed.data

  if (honey && honey.length > 0) {
    return NextResponse.json({ ok: true })
  }

  const to = process.env.CONTACT_TO_EMAIL ?? "info@prophylaxe-institut.de"
  const subject = `[Newsletter] Neue Anmeldung: ${email}`
  const text = `Neue Newsletter-Anmeldung\n\nE-Mail: ${email}\nQuelle: ${source}\nIP: ${ip}\n\nBitte Double-Opt-In auslösen.`
  const html = `
    <h2>Neue Newsletter-Anmeldung</h2>
    <p><strong>E-Mail:</strong> ${escapeHtml(email)}</p>
    <p><strong>Quelle:</strong> ${escapeHtml(source)}</p>
    <hr><p style="color:#888;font-size:12px">IP: ${escapeHtml(ip)} · Bitte Double-Opt-In manuell auslösen, bis Provider-Integration steht.</p>
  `

  const result = await sendMail({ to, subject, text, html, replyTo: email })
  if (!result.ok) {
    return NextResponse.json({ error: "Versand fehlgeschlagen." }, { status: 502 })
  }
  return NextResponse.json({ ok: true })
}
