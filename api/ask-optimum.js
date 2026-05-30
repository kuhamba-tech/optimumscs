import { handleAskOptimumRequest, parseRequestBody } from '../lib/askOptimumServer.js'

function sendJson(res, status, payload) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(payload))
}

/** Vercel Node serverless — POST /api/ask-optimum */
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
    sendJson(res, 405, { error: 'method-not-allowed' })
    return
  }

  try {
    const body = await parseRequestBody(req)
    const { status, body: payload } = await handleAskOptimumRequest(body)
    sendJson(res, status, payload)
  } catch (err) {
    console.error('ask-optimum:', err?.message || err)
    sendJson(res, 500, { error: 'server-error' })
  }
}
