/** Submit site forms via serverless API (key stays on server). */
export async function submitForm(type, fields) {
  const res = await fetch('/api/submit-form', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ type, fields }),
  })

  let data = {}
  try {
    data = await res.json()
  } catch {
    return 'error'
  }

  if (res.ok && data.success) return 'success'
  if (res.status === 503 && data.error === 'no-key') return 'no-key'
  return 'error'
}
