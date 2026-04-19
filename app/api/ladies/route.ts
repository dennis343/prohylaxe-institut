import { NextResponse } from "next/server"
import { z } from "zod"
import { sendMail, escapeHtml } from "@/lib/mail"
import { rateLimit, getClientIp } from "@/lib/rate-limit"

export const runtime = "nodejs"

const schema = z.object({
  role: z.enum(["self", "colleague"]).default("self"),
  candidate: z.string().min(1).max(120),
  city: z.string().max(120).optional().or(z.literal("")),
  profession: z.string().max(120).optional().or(z.literal("")),
  age: z.string().max(10).optional().or(z.literal("")),
  description: z.string().min(1).max(2000),
  wishlist: z.string().max(2000).optional().or(z.literal("")),
  contact: z.string().min(1).max(160),
  consent: z.union([z.literal("on"), z.literal(true), z.literal("true")]),
  honey: z.string().max(0).optional().or(z.literal("")),
})

export async function POST(req: Request) {
  const ip = getClientIp(req.headers)
  const limit = rateLimit({ key: `ladies:${ip}`, limit: 3, windowMs: 60_000 })
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
    return NextResponse.json({ error: "Bitte prüfen Sie die Eingaben." }, { status: 400 })
  }
  const data = parsed.data

  if (data.honey && data.honey.length > 0) {
    return NextResponse.json({ ok: true })
  }

  const to = process.env.CONTACT_TO_EMAIL ?? "info@prophylaxe-institut.de"
  const subject = `[April-Spezial] Bewerbung von ${data.candidate} (${data.role === "self" ? "selbst" : "Kollegin"})`

  const text = [
    `Rolle: ${data.role}`,
    `Kandidatin: ${data.candidate}`,
    data.city ? `Stadt: ${data.city}` : null,
    data.profession ? `Beruf: ${data.profession}` : null,
    data.age ? `Alter: ${data.age}` : null,
    `Kontakt: ${data.contact}`,
    "",
    "Beschreibung:",
    data.description,
    "",
    data.wishlist ? `Wunschbegleitung:\n${data.wishlist}` : "",
    "",
    `IP: ${ip}`,
  ]
    .filter(Boolean)
    .join("\n")

  const html = `
    <h2>${escapeHtml(subject)}</h2>
    <p><strong>Rolle:</strong> ${escapeHtml(data.role)}</p>
    <p><strong>Kandidatin:</strong> ${escapeHtml(data.candidate)}</p>
    ${data.city ? `<p><strong>Stadt:</strong> ${escapeHtml(data.city)}</p>` : ""}
    ${data.profession ? `<p><strong>Beruf:</strong> ${escapeHtml(data.profession)}</p>` : ""}
    ${data.age ? `<p><strong>Alter:</strong> ${escapeHtml(data.age)}</p>` : ""}
    <p><strong>Kontakt:</strong> ${escapeHtml(data.contact)}</p>
    <p><strong>Beschreibung:</strong></p>
    <pre style="white-space:pre-wrap;font-family:inherit">${escapeHtml(data.description)}</pre>
    ${data.wishlist ? `<p><strong>Wunschbegleitung:</strong></p><pre style="white-space:pre-wrap;font-family:inherit">${escapeHtml(data.wishlist)}</pre>` : ""}
    <hr><p style="color:#888;font-size:12px">April-Spezial · IP: ${escapeHtml(ip)}</p>
  `

  const result = await sendMail({ to, subject, text, html })
  if (!result.ok) {
    return NextResponse.json({ error: "Versand fehlgeschlagen." }, { status: 502 })
  }
  return NextResponse.json({ ok: true })
}
