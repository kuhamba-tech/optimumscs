const SUBJECTS = {
  quote: 'Fee Quote Request - OptimumSCS',
  consultation: 'Consultation Request - OptimumSCS',
  contact: 'Website Inquiry - OptimumSCS',
  career: 'Talent Network Registration - OptimumSCS',
  application: 'Job Application - OptimumSCS',
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
        subject: SUBJECTS[type] || `OptimumSCS Form - ${type}`,
        ...fields,
      }),
    })
    const data = await res.json()
    return data.success ? 'success' : 'error'
  } catch {
    return 'error'
  }
}

/** Submit site forms via serverless API. */
export async function submitForm(type, fields, captcha) {
  try {
    const res = await fetch('/api/submit-form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ type, fields, captcha }),
    })

    let data = {}
    try {
      data = await res.json()
    } catch {
      /* fall through */
    }

    if (res.ok && data.success) return 'success'
    if (res.status === 400 && data.error === 'invalid-captcha') return 'captcha'
    if (res.status === 503 && (data.error === 'no-key' || data.error === 'no-smtp-config')) return 'no-key'
  } catch {
    /* fall through */
  }

  return submitViaBrowserWeb3Forms(type, fields)
}
