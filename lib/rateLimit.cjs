// In-memory rate limiter — sufficient for Vercel serverless (per warm instance).
// Catches burst abuse from simple bots; edge-level CDN rules should be added for
// distributed attacks.

const buckets = new Map()

// Clean entries older than windowMs to avoid unbounded memory growth
function evict(now, windowMs) {
  for (const [key, entry] of buckets) {
    if (now - entry.start > windowMs * 2) buckets.delete(key)
  }
}

/**
 * @param {string} ip
 * @param {string} endpoint  - unique key per endpoint
 * @param {number} limit     - max requests per window
 * @param {number} windowMs  - rolling window in ms
 * @returns {{ allowed: boolean, retryAfter: number }}
 */
function check(ip, endpoint, limit, windowMs) {
  const key = `${endpoint}:${ip}`
  const now = Date.now()
  evict(now, windowMs)

  const entry = buckets.get(key)
  if (!entry || now - entry.start > windowMs) {
    buckets.set(key, { start: now, count: 1 })
    return { allowed: true, retryAfter: 0 }
  }

  entry.count += 1
  if (entry.count > limit) {
    const retryAfter = Math.ceil((windowMs - (now - entry.start)) / 1000)
    return { allowed: false, retryAfter }
  }

  return { allowed: true, retryAfter: 0 }
}

function getIp(req) {
  // x-vercel-forwarded-for is injected by Vercel's edge and cannot be spoofed by clients.
  // Fall back to x-real-ip, then the rightmost x-forwarded-for entry (added by proxy, not client),
  // then the socket address. Never trust the leftmost x-forwarded-for value — it is user-supplied.
  const vercel = req.headers['x-vercel-forwarded-for']
  if (vercel) return vercel.split(',')[0].trim()

  const real = req.headers['x-real-ip']
  if (real) return real.trim()

  const forwarded = req.headers['x-forwarded-for']
  if (forwarded) {
    const ips = forwarded.split(',').map(s => s.trim()).filter(Boolean)
    return ips[ips.length - 1] // rightmost = proxy-appended, not client-controlled
  }

  return req.socket?.remoteAddress || 'unknown'
}

module.exports = { check, getIp }
