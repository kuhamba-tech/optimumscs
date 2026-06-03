function vcardEscape(value) {
  return String(value || '')
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;')
}

function buildMosesVCard() {
  const fullName = 'Moses Dowart'
  const organization = 'Optimum Supply Chain Solutions'
  const title = 'Principal Consultant'
  const phone = '+27739370249'
  const displayPhone = '+27 73 937 0249'
  const email = 'info@optimumscs.com'
  const website = 'https://www.optimumscs.com'
  const address = 'South Africa'
  const note = 'Transforming supply chains with data, technology and intelligence. Call or WhatsApp: +27 73 937 0249.'

  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${vcardEscape('Dowart')};${vcardEscape('Moses')};;;`,
    `FN:${vcardEscape(fullName)}`,
    `ORG:${vcardEscape(organization)}`,
    `TITLE:${vcardEscape(title)}`,
    `TEL;TYPE=CELL,VOICE:${phone}`,
    `TEL;TYPE=WORK,VOICE:${phone}`,
    `EMAIL;TYPE=WORK:${vcardEscape(email)}`,
    `URL;TYPE=WORK:${vcardEscape(website)}`,
    `ADR;TYPE=WORK:;;;;${vcardEscape(address)};;;`,
    `NOTE:${vcardEscape(note)}`,
    `X-SOCIALPROFILE;TYPE=WhatsApp:${vcardEscape(`https://wa.me/${phone.replace('+', '')}`)}`,
    `X-ABLabel:${vcardEscape(displayPhone)}`,
    'END:VCARD',
    '',
  ].join('\r\n')
}

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    res.statusCode = 405
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: 'method-not-allowed' }))
    return
  }

  res.statusCode = 200
  res.setHeader('Content-Type', 'text/vcard; charset=utf-8')
  res.setHeader('Content-Disposition', 'attachment; filename="moses-dowart-optimumscs.vcf"')
  res.setHeader('Cache-Control', 'public, max-age=3600')
  res.end(buildMosesVCard())
}
