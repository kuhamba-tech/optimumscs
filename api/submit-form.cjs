const SUBJECTS = {
  quote: 'Fee Quote Request – OptimumSCS',
  consultation: 'Consultation Request – OptimumSCS',
  contact: 'Website Inquiry – OptimumSCS',
}

function getWeb3FormsKey() {
  return (
    process.env.WEB3FORMS_ACCESS_KEY ||
    process.env.VITE_WEB3FORMS_KEY ||
    process.env.WEB3FORMS_KEY
  )
}

function parseBody(req) {
  if (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body)) {
    return Promise.resolve(req.body)
  }
  if (typeof req.body === 'string' && req.body.trim()) {
    return Promise.resolve(JSON.parse(req.body))
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

async function submitToWeb3Forms({ type, fields }) {
  const accessKey = getWeb3FormsKey()
  if (!accessKey || accessKey === 'REPLACE_ME') {
    return { status: 503, body: { error: 'no-key' } }
  }

  if (!type || !fields || typeof fields !== 'object') {
    return { status: 400, body: { error: 'invalid-payload' } }
  }

  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: accessKey,
      subject: SUBJECTS[type] || `OptimumSCS Form – ${type}`,
      ...fields,
    }),
  })

  let data
  try {
    data = await res.json()
  } catch {
    return { status: 502, body: { error: 'web3forms-invalid-response' } }
  }

  if (!res.ok || !data.success) {
    return { status: res.status || 400, body: { error: 'web3forms-failed' } }
  }

  return { status: 200, body: { success: true } }
}

module.exports = async function handler(req, res) {
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
    const { status, body: payload } = await submitToWeb3Forms(body)
    res.statusCode = status
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(payload))
  } catch (err) {
    console.error('submit-form:', err?.message || err)
    res.statusCode = 500
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: 'server-error' }))
  }
}
