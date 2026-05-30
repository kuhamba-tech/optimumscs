const SYSTEM_PROMPT = `You are AskOptimumSCS, a professional AI supply chain consultant for Optimum Supply Chain Solutions (OptimumSCS).

## About OptimumSCS
- Founded: 2021 | Randburg, Johannesburg, South Africa
- Contact: moses@optimumscs.com | +27 739370249 | www.optimumscs.com

## Services
ERP Transformation (D365), TMS (Opsi, BlueYonder, Ignition), Procurement, Power BI analytics, Consulting.

## Response format
Diagnosis:
Recommended Solution:
Expected Impact:
Next Step:

Be concise (under 250 words).`

const MAX_HISTORY = 12

async function handleAskOptimumRequest(reqBody) {
  const apiKey = process.env.ANTHROPIC_API_KEY || process.env.VITE_ANTHROPIC_API_KEY
  if (!apiKey || apiKey === 'your_api_key_here') {
    return { status: 503, body: { error: 'no-key' } }
  }

  const messages = Array.isArray(reqBody?.messages) ? reqBody.messages.slice(-MAX_HISTORY) : []
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

/** Vercel serverless — POST /api/ask-optimum */
export default async function handler(req) {
  const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: cors })
  }

  if (req.method !== 'POST') {
    return Response.json({ error: 'method-not-allowed' }, { status: 405, headers: cors })
  }

  try {
    const body = await req.json()
    const { status, body: payload } = await handleAskOptimumRequest(body)
    return Response.json(payload, { status, headers: cors })
  } catch (err) {
    console.error('ask-optimum:', err?.message || err)
    return Response.json({ error: 'server-error' }, { status: 500, headers: cors })
  }
}
