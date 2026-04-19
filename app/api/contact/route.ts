import { NextResponse } from "next/server"
import { z } from "zod"
import { sendMail, escapeHtml } from "@/lib/mail"
import { rateLimit, getClientIp } from "@/lib/rate-limit"

export const runtime = "nodejs"

const schema = z.object({
  variant: z.enum(["consultation", "waitlist"]).default("consultation"),
  firstName: z.string().min(1).max(80),
  lastName: z.string().min(1).max(80),
  email: z.string().email().max(160),
  phone: z.string().max(40).optional().or(z.literal("")),
  practice: z.string().max(160).optional().or(z.literal("")),
  role: z.string().max(120).optional().or(z.literal("")),
  message: z.string().max(4000).optional().or(z.literal("")),
  consent: z.union([z.literal("on"), z.literal(true), z.literal("true")]),
  website: z.string().max(0).optional().or(z.literal("")),
})

export async function POST(req: Request) {
  const ip = getClientIp(req.headers)
  const limit = rateLimit({ key: `contact:${ip}`, limit: 5, windowMs: 60_000 })
  if (!limit.ok) {
    return NextResponse.json({ error: "Zu viele Anfragen, bitte später erneut." }, { status: 429 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Ungültiges Format." }, { status: 400 })
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "Bitte prüfen Sie die Eingaben." }, { status: 400 })
  }
  const data = parsed.data

  if (data.website && data.website.length > 0) {
    return NextResponse.json({ ok: true })
  }

  const to = process.env.CONTACT_TO_EMAIL ?? "info@prophylaxe-institut.de"
  const subject =
    data.variant === "waitlist"
      ? `Warteliste: ${data.firstName} ${data.lastName}`
      : `Erstgespräch-Anfrage: ${data.firstName} ${data.lastName}`

  const lines = [
    `Name: ${data.firstName} ${data.lastName}`,
    `E-Mail: ${data.email}`,
    data.phone ? `Telefon: ${data.phone}` : null,
    data.practice ? `Praxis: ${data.practice}` : null,
    data.role ? `Rolle: ${data.role}` : null,
    "",
    "Nachricht:",
    data.message || "(keine)",
    "",
    `Quelle: ${data.variant}`,
    `IP: ${ip}`,
  ].filter(Boolean) as string[]

  const html = `
    <h2>${escapeHtml(subject)}</h2>
    <p><strong>Name:</strong> ${escapeHtml(`${data.firstName} ${data.lastName}`)}</p>
    <p><strong>E-Mail:</strong> <a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></p>
    ${data.phone ? `<p><strong>Telefon:</strong> ${escapeHtml(data.phone)}</p>` : ""}
    ${data.practice ? `<p><strong>Praxis:</strong> ${escapeHtml(data.practice)}</p>` : ""}
    ${data.role ? `<p><strong>Rolle:</strong> ${escapeHtml(data.role)}</p>` : ""}
    <p><strong>Nachricht:</strong></p>
    <pre style="white-space:pre-wrap;font-family:inherit">${escapeHtml(data.message || "(keine)")}</pre>
    <hr>
    <p style="color:#888;font-size:12px">Quelle: ${data.variant} · IP: ${escapeHtml(ip)}</p>
  `

  const result = await sendMail({
    to,
    subject,
    text: lines.join("\n"),
    html,
    replyTo: data.email,
  })

  if (!result.ok) {
    return NextResponse.json({ error: "Versand fehlgeschlagen." }, { status: 502 })
  }
  return NextResponse.json({ ok: true })
}
