const crypto = require('crypto')

const CAPTCHA_TTL_MS = 10 * 60 * 1000
const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

function getSecret() {
  const secret = process.env.CAPTCHA_SECRET
  if (!secret || secret.length < 32) {
    // Crash loudly rather than silently use a guessable fallback — a weak secret
    // lets attackers forge valid CAPTCHA tokens and spam without restriction.
    throw new Error('CAPTCHA_SECRET env var must be set to a random string of 32+ characters')
  }
  return secret
}

function sign(value) {
  return crypto.createHmac('sha256', getSecret()).update(value).digest('base64url')
}

function randomCode(length = 6) {
  let code = ''
  for (let i = 0; i < length; i += 1) {
    code += ALPHABET[crypto.randomInt(0, ALPHABET.length)]
  }
  return code
}

function makeToken(code) {
  const nonce = crypto.randomBytes(12).toString('base64url')
  const expires = Date.now() + CAPTCHA_TTL_MS
  const normalized = code.toUpperCase()
  const answerHash = sign(`${nonce}.${expires}.${normalized}`)
  const signature = sign(`${nonce}.${expires}.${answerHash}`)
  return `${nonce}.${expires}.${answerHash}.${signature}`
}

function verifyToken(token, answer) {
  if (!token || !answer || typeof token !== 'string') return false
  const parts = token.split('.')
  if (parts.length !== 4) return false

  const [nonce, expiresRaw, answerHash, signature] = parts
  const expires = Number(expiresRaw)
  if (!nonce || !Number.isFinite(expires) || Date.now() > expires) return false

  const expectedSignature = sign(`${nonce}.${expiresRaw}.${answerHash}`)
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) return false

  const normalized = String(answer).replace(/\s+/g, '').toUpperCase()
  const expectedAnswerHash = sign(`${nonce}.${expiresRaw}.${normalized}`)
  return crypto.timingSafeEqual(Buffer.from(answerHash), Buffer.from(expectedAnswerHash))
}

function renderCaptchaSvg(code) {
  const chars = code.split('')
  const noiseLines = Array.from({ length: 8 }, (_, i) => {
    const y1 = 18 + crypto.randomInt(0, 45)
    const y2 = 18 + crypto.randomInt(0, 45)
    const color = i % 2 ? '#85d7ff' : '#9ed66b'
    return `<path d="M${crypto.randomInt(0, 30)} ${y1} C ${50 + crypto.randomInt(0, 30)} ${crypto.randomInt(0, 70)}, ${120 + crypto.randomInt(0, 40)} ${crypto.randomInt(0, 70)}, ${190 + crypto.randomInt(0, 45)} ${y2}" stroke="${color}" stroke-width="${1 + crypto.randomInt(1, 3)}" opacity=".45" fill="none"/>`
  }).join('')

  const text = chars.map((char, index) => {
    const x = 22 + index * 32 + crypto.randomInt(-4, 5)
    const y = 48 + crypto.randomInt(-7, 8)
    const rotate = crypto.randomInt(-20, 21)
    const colors = ['#111827', '#284b63', '#5b214d', '#244c30']
    const color = colors[crypto.randomInt(0, colors.length)]
    return `<text x="${x}" y="${y}" transform="rotate(${rotate} ${x} ${y})" fill="${color}" font-size="${30 + crypto.randomInt(0, 8)}" font-family="Verdana, Arial, sans-serif" font-weight="800">${char}</text>`
  }).join('')

  const dots = Array.from({ length: 70 }, () => (
    `<circle cx="${crypto.randomInt(0, 240)}" cy="${crypto.randomInt(0, 72)}" r="${crypto.randomInt(1, 3)}" fill="#334155" opacity=".18"/>`
  )).join('')

  return `<svg xmlns="http://www.w3.org/2000/svg" width="240" height="72" viewBox="0 0 240 72" role="img" aria-label="Security code">
    <defs>
      <filter id="softWarp">
        <feTurbulence type="fractalNoise" baseFrequency=".028" numOctaves="2" seed="${crypto.randomInt(1, 9999)}"/>
        <feDisplacementMap in="SourceGraphic" scale="2.8"/>
      </filter>
      <linearGradient id="bg" x1="0" x2="1">
        <stop offset="0" stop-color="#eef2f7"/>
        <stop offset=".5" stop-color="#d8edf6"/>
        <stop offset="1" stop-color="#f5f7fb"/>
      </linearGradient>
    </defs>
    <rect width="240" height="72" rx="8" fill="url(#bg)"/>
    <rect x="0" y="0" width="240" height="72" fill="#ffffff" opacity=".24"/>
    ${dots}
    <g filter="url(#softWarp)">${text}</g>
    ${noiseLines}
  </svg>`
}

function createCaptcha() {
  const code = randomCode()
  return {
    token: makeToken(code),
    svg: renderCaptchaSvg(code),
  }
}

module.exports = {
  createCaptcha,
  verifyToken,
}
