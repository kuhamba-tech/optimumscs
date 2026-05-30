const SYSTEM_PROMPT = `You are AskOptimumSCS, a professional AI supply chain consultant for Optimum Supply Chain Solutions (OptimumSCS).
Contact: moses@optimumscs.com | +27 739370249
Reply with headings: Diagnosis:, Recommended Solution:, Expected Impact:, Next Step:`

function parseBody(req) {
  try {
    if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
      return req.body
    }
    if (typeof req.body === 'string' && req.body.trim()) {
      return JSON.parse(req.body)
    }
  } catch {
    return {}
  }
  return {}
}

async function askClaude(reqBody) {
  const apiKey = process.env.ANTHROPIC_API_KEY || process.env.VITE_ANTHROPIC_API_KEY
  if (!apiKey || apiKey === 'your_api_key_here') {
    return { status: 503, body: { error: 'no-key' } }
  }

  const messages = Array.isArray(reqBody?.messages) ? reqBody.messages.slice(-12) : []
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
      model: 'claude-sonnet-4-6',
      max_tokens: 500,
      system: reqBody.system || SYSTEM_PROMPT,
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
  res.setHeader('Access-Control-Allow-Origin', '*')

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
