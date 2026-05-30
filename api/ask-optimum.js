const SYSTEM_PROMPT = `You are AskOptimumSCS, a professional AI supply chain consultant for Optimum Supply Chain Solutions (OptimumSCS).
Contact: moses@optimumscs.com | +27 739370249
Reply with headings: Diagnosis:, Recommended Solution:, Expected Impact:, Next Step:`

async function parseBody(req) {
  if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
    return req.body
  }
  if (typeof req.body === 'string' && req.body.trim()) {
    return JSON.parse(req.body)
  }
  return new Promise((resolve, reject) => {
    const chunks = []
    req.on('data', (chunk) => chunks.push(chunk))
    req.on('end', () => {
      try {
        const raw = Buffer.concat(chunks).toString('utf8')
        resolve(raw ? JSON.parse(raw) : {})
      } catch (e) {
        reject(e)
      }
    })
    req.on('error', reject)
  })
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

  if (!res.ok) {
    return { status: res.status, body: { error: `api-${res.status}` } }
  }

  const data = await res.json()
  return { status: 200, body: { text: data.content?.[0]?.text ?? '' } }
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

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
    const body = await parseBody(req)
    const { status, body: payload } = await askClaude(body)
    res.statusCode = status
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(payload))
  } catch (err) {
    console.error('ask-optimum:', err?.message || err)
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: 'server-error' }))
  }
}
