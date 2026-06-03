const { createCaptcha } = require('../lib/captchaServer.cjs')
const { check, getIp } = require('../lib/rateLimit.cjs')

module.exports = async function handler(req, res) {
  const allowed = process.env.ALLOWED_ORIGIN || 'https://optimumscs.com'
  res.setHeader('Access-Control-Allow-Origin', allowed)
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Vary', 'Origin')

  if (req.method === 'OPTIONS') { res.statusCode = 204; res.end(); return }
  if (req.method !== 'GET') {
    res.statusCode = 405
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: 'method-not-allowed' }))
    return
  }

  // Rate limit: 30 captcha fetches per IP per 10 minutes (allows normal multi-form use)
  const ip = getIp(req)
  const rl = check(ip, 'captcha', 30, 10 * 60 * 1000)
  if (!rl.allowed) {
    res.statusCode = 429
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Retry-After', String(rl.retryAfter))
    res.end(JSON.stringify({ error: 'too-many-requests', retryAfter: rl.retryAfter }))
    return
  }

  const captcha = createCaptcha()
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Cache-Control', 'no-store')
  res.end(JSON.stringify(captcha))
}
