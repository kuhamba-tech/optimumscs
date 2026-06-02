const SUBJECTS = {
  quote: 'Fee Quote Request – OptimumSCS',
  consultation: 'Consultation Request – OptimumSCS',
  contact: 'Website Inquiry – OptimumSCS',
}

async function submitViaBrowserWeb3Forms(type, fields) {
  const key = import.meta.env.VITE_WEB3FORMS_KEY
  if (!key || key === 'REPLACE_ME') return 'no-key'

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: key,
        subject: SUBJECTS[type] || `OptimumSCS Form – ${type}`,
        ...fields,
      }),
    })
    const data = await res.json()
    return data.success ? 'success' : 'error'
  } catch {
    return 'error'
  }
}

/** Submit site forms via serverless API (key stays on server in production). */
export async function submitForm(type, fields) {
  try {
    const res = await fetch('/api/submit-form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ type, fields }),
    })

    let data = {}
    try {
      data = await res.json()
    } catch {
      /* fall through */
    }

    if (res.ok && data.success) return 'success'
    if (res.status === 503 && data.error === 'no-key') return 'no-key'
  } catch {
    /* fall through */
  }

  return 'error'
}
