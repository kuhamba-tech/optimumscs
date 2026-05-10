import { useState } from 'react'

const services = [
  'TMS Implementation',
  'Procurement Services',
  'ERP Transformation',
  'Data Analytics & Reporting',
  'Consulting Services',
  'Warehouse Management',
]

const industries = [
  'FMCG',
  'Logistics & Transport',
  'Retail & E-commerce',
  'Manufacturing',
  'Agriculture & Agro-logistics',
  'Healthcare & Pharmaceutical',
  'Public Sector',
  'Mining & Energy',
  'Other',
]

async function submitQuote(formData, industry) {
  const id = import.meta.env.VITE_FORMSPREE_CONTACT_ID
  formData.set('Industry', industry)

  if (id && id !== 'REPLACE_ME') {
    const res = await fetch(`https://formspree.io/f/${id}`, {
      method: 'POST',
      body: formData,
      headers: { Accept: 'application/json' },
    })
    return res.ok ? 'success' : 'error'
  }

  const fields = {
    Name: formData.get('Name'),
    Company: formData.get('Company'),
    Email: formData.get('Email'),
    Industry: industry,
    'Scope of Work': formData.get('Scope of Work'),
  }
  const body = Object.entries(fields).map(([k, v]) => `${k}: ${v || ''}`).join('\n')
  window.location.href = `mailto:info@optimumscs.com?subject=${encodeURIComponent('Fee Quote Request – OptimumSCS')}&body=${encodeURIComponent(body)}`
  return 'mailto'
}

export default function FeeQuotePage() {
  const [selectedIndustry, setSelectedIndustry] = useState('')
  const [otherIndustry, setOtherIndustry] = useState('')
  const [status, setStatus] = useState('idle')

  const isOther = selectedIndustry === 'Other'
  const industryValue = isOther ? otherIndustry : selectedIndustry

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    const formData = new FormData(e.target)
    const result = await submitQuote(formData, industryValue).catch(() => 'error')
    if (result !== 'mailto') setStatus(result)
  }

  return (
    <section className="section first-section">
      <div className="container two-col-split">
        <div className="glass-card quote-card">
          <div className="section-heading left">
            <h1>Request a Fee Quote</h1>
            <p>
              Receive a tailored estimate for your route optimisation, TMS implementation,
              procurement services, data analytics, and supply chain consulting services.
            </p>
          </div>

          <ul className="quote-list">
            {services.map((s) => <li key={s}>{s}</li>)}
          </ul>
        </div>

        <form className="glass-card contact-form-card" onSubmit={handleSubmit}>
          {status === 'success' && (
            <div className="form-success-msg">
              ✓ Quote request sent! We will respond within 24 hours.
            </div>
          )}
          {status === 'error' && (
            <div className="form-error-msg">
              Something went wrong. Please email info@optimumscs.com directly.
            </div>
          )}

          <div className="form-grid">
            <label>
              <span>Name</span>
              <input name="Name" type="text" placeholder="Your full name" required />
            </label>

            <label>
              <span>Company</span>
              <input name="Company" type="text" placeholder="Company name" />
            </label>

            <label>
              <span>Email</span>
              <input name="Email" type="email" placeholder="name@company.com" required />
            </label>

            <label>
              <span>Industry</span>
              <select
                className="quote-industry-select"
                value={selectedIndustry}
                onChange={(e) => { setSelectedIndustry(e.target.value); setOtherIndustry('') }}
                required
              >
                <option value="" disabled>Select your industry...</option>
                {industries.map((ind) => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>
              {isOther && (
                <input
                  className="quote-other-input"
                  type="text"
                  placeholder="Please specify your industry"
                  value={otherIndustry}
                  onChange={(e) => setOtherIndustry(e.target.value)}
                  required
                />
              )}
            </label>

            <label className="full">
              <span>Scope of Work</span>
              <textarea
                name="Scope of Work"
                rows="6"
                placeholder="Outline the scale, systems, and outcomes required"
                required
              />
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={status === 'loading' || (isOther && !otherIndustry.trim())}
          >
            {status === 'loading' ? 'Sending…' : 'Send Quote'}
          </button>
        </form>
      </div>
    </section>
  )
}
