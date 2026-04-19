type Bucket = { count: number; resetAt: number }

const buckets = new Map<string, Bucket>()

export function rateLimit({
  key,
  limit,
  windowMs,
}: {
  key: string
  limit: number
  windowMs: number
}): { ok: boolean; remaining: number; resetAt: number } {
  const now = Date.now()
  const existing = buckets.get(key)

  if (!existing || existing.resetAt < now) {
    const fresh = { count: 1, resetAt: now + windowMs }
    buckets.set(key, fresh)
    return { ok: true, remaining: limit - 1, resetAt: fresh.resetAt }
  }
  if (existing.count >= limit) {
    return { ok: false, remaining: 0, resetAt: existing.resetAt }
  }
  existing.count += 1
  return { ok: true, remaining: limit - existing.count, resetAt: existing.resetAt }
}

export function getClientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for")
  if (forwarded) return forwarded.split(",")[0].trim()
  return headers.get("x-real-ip") ?? "anonymous"
}
