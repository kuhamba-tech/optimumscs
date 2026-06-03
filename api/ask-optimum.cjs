const { check, getIp } = require('../lib/rateLimit.cjs')

const SYSTEM_PROMPT = `You are AskOptimumSCS, a professional AI supply chain consultant for Optimum Supply Chain Solutions (OptimumSCS).
Contact: moses@optimumscs.com | +27 739370249
Reply with headings: Diagnosis:, Recommended Solution:, Expected Impact:, Next Step:`

const MAX_MESSAGES = 6       // max conversation turns sent to Claude
const MAX_MSG_CHARS = 1000   // max chars per individual message
const MAX_TOKENS = 500       // max response tokens

function parseBody(req) {
  try {
    if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
      return req.body
    }
    if (typeof req.body === 'string' && req.body.trim()) {
      if (req.body.length > 20480) return {} // 20 KB guard
      return JSON.parse(req.body)
    }
  } catch {
    return {}
  }
  return {}
}

function sanitizeMessages(raw) {
  if (!Array.isArray(raw)) return []
  return raw
    .slice(-MAX_MESSAGES)
    .filter(m => m && typeof m === 'object' && (m.role === 'user' || m.role === 'assistant'))
    .map(m => ({
      role: m.role,
      content: String(m.content ?? '').slice(0, MAX_MSG_CHARS),
    }))
}

async function askClaude(reqBody) {
  const apiKey = process.env.ANTHROPIC_API_KEY || process.env.VITE_ANTHROPIC_API_KEY
  if (!apiKey || apiKey === 'your_api_key_here') {
    return { status: 503, body: { error: 'no-key' } }
  }

  const messages = sanitizeMessages(reqBody?.messages)
  if (!messages.length) {
    return { status: 400, body: { error: 'messages-required' } }
  }

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001', // cheaper model for public-facing chatbot
      max_tokens: MAX_TOKENS,
      system: SYSTEM_PROMPT,              // ignore client-supplied system prompt
      messages,
    }),
  })

  let data
  try {
    data = await res.json()
  } catch {
    return { status: 502, body: { error: 'api-invalid-response' } }
  }

  if (!res.ok) {
    return { status: res.status, body: { error: `api-${res.status}` } }
  }

  return { status: 200, body: { text: data.content?.[0]?.text ?? '' } }
}

const API_VERSION = '2026-05-30'

module.exports = async function handler(req, res) {
  const allowed = process.env.ALLOWED_ORIGIN || 'https://optimumscs.com'
  res.setHeader('Access-Control-Allow-Origin', allowed)
  res.setHeader('Vary', 'Origin')

  if (req.method === 'GET') {
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ status: 'ok', version: API_VERSION }))
    return
  }

  if (req.method === 'OPTIONS') {
    res.statusCode = 204
    res.end()
    return
  }

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

  // Rate limit: 15 chatbot messages per IP per minute
  const ip = getIp(req)
  const rl = check(ip, 'ask-optimum', 15, 60 * 1000)
  if (!rl.allowed) {
    res.statusCode = 429
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Retry-After', String(rl.retryAfter))
    res.end(JSON.stringify({ error: 'too-many-requests', retryAfter: rl.retryAfter }))
    return
  }

  try {
    const body = parseBody(req)
    const { status, body: payload } = await askClaude(body)
    res.statusCode = status
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(payload))
  } catch (err) {
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: 'server-error' }))
  }
}
