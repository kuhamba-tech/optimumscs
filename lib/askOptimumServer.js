const SYSTEM_PROMPT = `You are AskOptimumSCS, a professional AI supply chain consultant for Optimum Supply Chain Solutions (OptimumSCS).

## About OptimumSCS
- Founded: 2021 | Randburg, Johannesburg, South Africa
- Team: 8 core employees + specialist subcontractors | Level 1 B-BBEE
- Contact: moses@optimumscs.com | +27 739370249 | www.optimumscs.com

## Services
ERP Transformation (D365), TMS (Opsi, BlueYonder, Ignition), Procurement, Power BI analytics, Consulting.

## Response format
Always reply with exactly these headings:
Diagnosis:
Recommended Solution:
Expected Impact:
Next Step:

Be concise (under 250 words). Mention case studies at /case-studies when relevant.`

const MAX_HISTORY = 6
const MAX_MSG_CHARS = 1000

export async function handleAskOptimumRequest(reqBody) {
  const apiKey = process.env.ANTHROPIC_API_KEY || process.env.VITE_ANTHROPIC_API_KEY
  if (!apiKey || apiKey === 'your_api_key_here') {
    return { status: 503, body: { error: 'no-key' } }
  }

  const raw = Array.isArray(reqBody?.messages) ? reqBody.messages : []
  // Guard against huge arrays before any processing
  if (raw.length > MAX_HISTORY * 3) {
    return { status: 400, body: { error: 'too-many-messages' } }
  }

  const messages = raw
    .slice(-MAX_HISTORY)
    .filter(m => m && typeof m === 'object' && (m.role === 'user' || m.role === 'assistant'))
    .map(m => ({ role: m.role, content: String(m.content ?? '').slice(0, MAX_MSG_CHARS) }))

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
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 500,
      system: SYSTEM_PROMPT, // never accept system prompt from client — prevents prompt injection
      messages,
    }),
  })

  if (!res.ok) {
    return { status: res.status, body: { error: `api-${res.status}` } }
  }

  const data = await res.json()
  const text = data.content?.[0]?.text ?? ''
  return { status: 200, body: { text } }
}

export async function readJsonBody(req) {
  const chunks = []
  for await (const chunk of req) chunks.push(chunk)
  const raw = Buffer.concat(chunks).toString('utf8')
  if (!raw) return {}
  try {
    return JSON.parse(raw)
  } catch {
    return {}
  }
}

export async function parseRequestBody(req) {
  if (req.body !== undefined && req.body !== null) {
    if (typeof req.body === 'string') {
      try {
        return JSON.parse(req.body)
      } catch {
        return {}
      }
    }
    if (typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
      return req.body
    }
  }
  if (req && typeof req.on === 'function' && typeof req[Symbol.asyncIterator] === 'function') {
    return readJsonBody(req)
  }
  return {}
}
