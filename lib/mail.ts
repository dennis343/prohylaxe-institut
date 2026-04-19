type SendArgs = {
  to: string
  subject: string
  text: string
  html?: string
  replyTo?: string
  from?: string
}

const RESEND_ENDPOINT = "https://api.resend.com/emails"

export async function sendMail(args: SendArgs): Promise<{ ok: boolean; reason?: string }> {
  const apiKey = process.env.RESEND_API_KEY
  const defaultFrom = process.env.MAIL_FROM ?? "Prophylaxe-Institut <noreply@prophylaxe-institut.de>"

  if (!apiKey) {
    console.warn("[mail] RESEND_API_KEY not set — falling back to console log")
    console.info("[mail] would send:", {
      to: args.to,
      subject: args.subject,
      replyTo: args.replyTo,
      text: args.text,
    })
    return { ok: true, reason: "logged-only" }
  }

  const res = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: args.from ?? defaultFrom,
      to: [args.to],
      subject: args.subject,
      text: args.text,
      html: args.html,
      reply_to: args.replyTo,
    }),
  })

  if (!res.ok) {
    const reason = await res.text().catch(() => `HTTP ${res.status}`)
    console.error("[mail] Resend error:", res.status, reason)
    return { ok: false, reason }
  }
  return { ok: true }
}

export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
}
