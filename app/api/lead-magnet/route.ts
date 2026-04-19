import { NextResponse } from "next/server"
import { z } from "zod"
import { sendMail, escapeHtml } from "@/lib/mail"
import { rateLimit, getClientIp } from "@/lib/rate-limit"

export const runtime = "nodejs"

const schema = z.object({
  email: z.string().email().max(160),
  firstName: z.string().min(1).max(80),
  practice: z.string().max(160).optional().or(z.literal("")),
  asset: z.enum(["prophylaxe-checkliste"]),
  consent: z.union([z.literal("on"), z.literal(true), z.literal("true")]),
  honey: z.string().max(0).optional().or(z.literal("")),
})

const ASSET_PATHS: Record<string, { url: string; title: string }> = {
  "prophylaxe-checkliste": {
    url: "/ressourcen/prophylaxe-potenzial-checkliste.pdf",
    title: "Prophylaxe-Potenzial-Checkliste",
  },
}

export async function POST(req: Request) {
  const ip = getClientIp(req.headers)
  const limit = rateLimit({ key: `lead:${ip}`, limit: 5, windowMs: 60_000 })
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
    return NextResponse.json({ error: "Bitte Eingaben prüfen." }, { status: 400 })
  }
  const { email, firstName, practice, asset, honey } = parsed.data
  if (honey && honey.length > 0) return NextResponse.json({ ok: true })

  const meta = ASSET_PATHS[asset]
  const downloadUrl = `https://prophylaxe-institut.de${meta.url}`

  const userMail = sendMail({
    to: email,
    subject: `Ihre ${meta.title}`,
    text: `Liebe/r ${firstName},\n\nvielen Dank für Ihr Interesse. Hier ist Ihre Checkliste:\n${downloadUrl}\n\nHerzliche Grüße\nMinka & das Prophylaxe-Institut\n`,
    html: `
      <p>Liebe/r ${escapeHtml(firstName)},</p>
      <p>vielen Dank für Ihr Interesse. Hier ist Ihre <strong>${escapeHtml(meta.title)}</strong>:</p>
      <p><a href="${downloadUrl}" style="background:#14203a;color:#f5ecd6;padding:10px 18px;border-radius:999px;text-decoration:none">Checkliste herunterladen</a></p>
      <p>Wenn Sie möchten, vereinbaren wir ein kurzes Kennenlern­gespräch — <a href="https://prophylaxe-institut.de/gespraech">15 Minuten reichen</a>.</p>
      <p>Herzliche Grüße<br>Minka &amp; das Prophylaxe-Institut</p>
    `,
  })

  const internalMail = sendMail({
    to: process.env.CONTACT_TO_EMAIL ?? "info@prophylaxe-institut.de",
    subject: `[Lead-Magnet] ${meta.title} angefordert von ${firstName}`,
    text: `Asset: ${meta.title}\nName: ${firstName}\nE-Mail: ${email}\nPraxis: ${practice || "(keine Angabe)"}\nIP: ${ip}`,
    html: `
      <h2>Neuer Lead-Magnet-Download</h2>
      <p><strong>Asset:</strong> ${escapeHtml(meta.title)}</p>
      <p><strong>Name:</strong> ${escapeHtml(firstName)}</p>
      <p><strong>E-Mail:</strong> ${escapeHtml(email)}</p>
      ${practice ? `<p><strong>Praxis:</strong> ${escapeHtml(practice)}</p>` : ""}
      <hr><p style="color:#888;font-size:12px">IP: ${escapeHtml(ip)}</p>
    `,
    replyTo: email,
  })

  const [u, i] = await Promise.all([userMail, internalMail])
  if (!u.ok || !i.ok) {
    return NextResponse.json({ error: "Versand fehlgeschlagen." }, { status: 502 })
  }
  return NextResponse.json({ ok: true, downloadUrl: meta.url })
}
