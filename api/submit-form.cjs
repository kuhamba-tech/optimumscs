const nodemailer = require('nodemailer')

const SUBJECTS = {
  quote: 'Fee Quote Request – OptimumSCS',
  consultation: 'Consultation Request – OptimumSCS',
  contact: 'Website Inquiry – OptimumSCS',
}

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'mail.optimumscs.com',
    port: parseInt(process.env.SMTP_PORT || '465'),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: { rejectUnauthorized: false },
  })
}

function buildEmailBody(type, fields) {
  const lines = Object.entries(fields)
    .map(([k, v]) => `<tr><td style="padding:6px 12px;font-weight:bold;white-space:nowrap">${k}</td><td style="padding:6px 12px">${v}</td></tr>`)
    .join('')
  return `
    <h2 style="color:#1a3c5e">${SUBJECTS[type] || type}</h2>
    <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
      ${lines}
    </table>
  `
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
    req.on('data', c => chunks.push(c))
    req.on('end', () => {
      try { resolve(Buffer.concat(chunks).toString('utf8') ? JSON.parse(Buffer.concat(chunks).toString('utf8')) : {}) }
      catch (e) { reject(e) }
    })
    req.on('error', reject)
  })
}

async function sendMail({ type, fields }) {
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  if (!user || !pass) return { status: 503, body: { error: 'no-smtp-config' } }
  if (!type || !fields || typeof fields !== 'object') {
    return { status: 400, body: { error: 'invalid-payload' } }
  }

  const to = process.env.SMTP_TO || user
  const transporter = createTransporter()

  try {
    await transporter.sendMail({
      from: `"OptimumSCS Website" <${user}>`,
      to,
      subject: SUBJECTS[type] || `OptimumSCS Form – ${type}`,
      html: buildEmailBody(type, fields),
    })
    return { status: 200, body: { success: true } }
  } catch (err) {
    console.error('SMTP error:', err.message)
    return { status: 502, body: { error: 'smtp-failed', detail: err.message } }
  }
}

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') { res.statusCode = 204; res.end(); return }
  if (req.method !== 'POST') {
    res.statusCode = 405
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: 'method-not-allowed' }))
    return
  }

  try {
    const body = await parseBody(req)
    const { status, body: payload } = await sendMail(body)
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
