const nodemailer = require('nodemailer')
const { verifyToken } = require('../lib/captchaServer.cjs')
const { check, getIp } = require('../lib/rateLimit.cjs')

// Strict whitelist — prevents email header injection via unknown type values
const SUBJECTS = {
  quote: 'Fee Quote Request - OptimumSCS',
  consultation: 'Consultation Request - OptimumSCS',
  contact: 'Website Inquiry - OptimumSCS',
  career: 'Talent Network Registration - OptimumSCS',
  application: 'Job Application - OptimumSCS',
}

// Max lengths per field type to prevent payload flooding
const FIELD_MAX = {
  default: 200,
  message: 2000,
  description: 2000,
  brief: 2000,
  scope: 2000,
  email: 254,
  phone: 30,
  name: 100,
  company: 150,
}

function fieldMax(key) {
  const k = key.toLowerCase()
  if (k.includes('email')) return FIELD_MAX.email
  if (k.includes('phone') || k.includes('tel')) return FIELD_MAX.phone
  if (k.includes('name')) return FIELD_MAX.name
  if (k.includes('company') || k.includes('organisation') || k.includes('organization')) return FIELD_MAX.company
  if (k.includes('message') || k.includes('description') || k.includes('brief') || k.includes('scope')) return FIELD_MAX.message
  return FIELD_MAX.default
}

function createTransporter() {
  const port = parseInt(process.env.SMTP_PORT || '465', 10)
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'mail.optimumscs.com',
    port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: { rejectUnauthorized: true },
    requireTLS: true, // enforce TLS on every port — credentials never travel in plaintext
  })
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function sanitizeFields(fields) {
  const out = {}
  for (const [k, v] of Object.entries(fields)) {
    const key = String(k).slice(0, 60).replace(/[\r\n]/g, '')
    const max = fieldMax(key)
    out[key] = String(v ?? '').slice(0, max).replace(/[\r\n]{3,}/g, '\n\n')
  }
  return out
}

function buildEmailBody(type, fields) {
  const lines = Object.entries(fields)
    .map(([k, v]) => `<tr><td style="padding:6px 12px;font-weight:bold;white-space:nowrap">${escapeHtml(k)}</td><td style="padding:6px 12px">${escapeHtml(v)}</td></tr>`)
    .join('')
  return `
    <h2 style="color:#1a3c5e">${escapeHtml(SUBJECTS[type])}</h2>
    <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
      ${lines}
    </table>
  `
}

function validateCaptcha(captcha) {
  if (process.env.CAPTCHA_DISABLED === 'true') return true
  if (!captcha || typeof captcha !== 'object') return false
  if (captcha.trap) return false
  return verifyToken(captcha.token, captcha.answer)
}

function parseBody(req) {
  if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
    return Promise.resolve(req.body)
  }
  if (typeof req.body === 'string' && req.body.trim()) {
    try { return Promise.resolve(JSON.parse(req.body)) } catch { return Promise.resolve({}) }
  }
  return new Promise((resolve, reject) => {
    const chunks = []
    let size = 0
    req.on('data', c => {
      size += c.length
      if (size > 51200) { reject(new Error('payload-too-large')); return } // 50 KB limit
      chunks.push(c)
    })
    req.on('end', () => {
      const raw = Buffer.concat(chunks).toString('utf8')
      try { resolve(raw ? JSON.parse(raw) : {}) } catch (e) { reject(e) }
    })
    req.on('error', reject)
  })
}

async function sendMail({ type, fields, captcha }) {
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  if (!user || !pass) return { status: 503, body: { error: 'no-smtp-config' } }

  // Strict type whitelist — rejects anything not in SUBJECTS to prevent header injection
  if (!type || !SUBJECTS[type]) {
    return { status: 400, body: { error: 'invalid-type' } }
  }
  if (!fields || typeof fields !== 'object' || Array.isArray(fields)) {
    return { status: 400, body: { error: 'invalid-payload' } }
  }
  if (!validateCaptcha(captcha)) {
    return { status: 400, body: { error: 'invalid-captcha' } }
  }

  const cleaned = sanitizeFields(fields)
  // Case-insensitive email lookup prevents internal SMTP address leakage when field casing varies
  const emailKey = Object.keys(cleaned).find(k => k.toLowerCase() === 'email')
  const replyTo = (emailKey ? cleaned[emailKey] : null) || user
  const safeReplyTo = replyTo.replace(/[\r\n<>]/g, '').slice(0, 254)

  const to = process.env.SMTP_TO || user
  const transporter = createTransporter()

  try {
    await transporter.sendMail({
      from: `"OptimumSCS Website" <${user}>`,
      to,
      replyTo: safeReplyTo,
      subject: SUBJECTS[type],
      html: buildEmailBody(type, cleaned),
    })
    return { status: 200, body: { success: true } }
  } catch (err) {
    console.error('SMTP error:', err.message)
    return { status: 502, body: { error: 'smtp-failed' } }
  }
}

module.exports = async function handler(req, res) {
  const origin = req.headers.origin || ''
  const allowed = process.env.ALLOWED_ORIGIN || 'https://optimumscs.com'
  res.setHeader('Access-Control-Allow-Origin', allowed)
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Vary', 'Origin')

  if (req.method === 'OPTIONS') { res.statusCode = 204; res.end(); return }
  if (req.method !== 'POST') {
    res.statusCode = 405
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: 'method-not-allowed' }))
    return
  }

  const ct = req.headers['content-type'] || ''
  if (!ct.includes('application/json')) {
    res.statusCode = 415
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: 'unsupported-media-type' }))
    return
  }

  // Rate limit: 8 form submissions per IP per 10 minutes
  const ip = getIp(req)
  const rl = check(ip, 'submit-form', 8, 10 * 60 * 1000)
  if (!rl.allowed) {
    res.statusCode = 429
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Retry-After', String(rl.retryAfter))
    res.end(JSON.stringify({ error: 'too-many-requests', retryAfter: rl.retryAfter }))
    return
  }

  try {
    const body = await parseBody(req)
    const { status, body: payload } = await sendMail(body)
    res.statusCode = status
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(payload))
  } catch (err) {
    const msg = err?.message || ''
    if (msg === 'payload-too-large') {
      res.statusCode = 413
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ error: 'payload-too-large' }))
      return
    }
    console.error('submit-form:', msg)
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: 'server-error' }))
  }
}
