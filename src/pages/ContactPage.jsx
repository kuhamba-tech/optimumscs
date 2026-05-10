import { useState } from 'react'
import { Link } from 'react-router-dom'
import { contactDetails } from '../components/data'
import {
  CalendarMini,
  ChevronDownMini,
  ClockMini,
  LockMini,
  PlaneMini,
  PinMini,
} from '../components/Icons'

const officeHours = [
  { day: 'Monday – Friday', hours: '8:00 AM – 4:30 PM' },
  { day: 'Saturday', hours: 'Closed' },
  { day: 'Sunday', hours: 'Closed' },
]

const serviceOptions = [
  'ERP Transformation',
  'TMS Implementation',
  'Procurement Services',
  'Data Analytics & Reporting',
  'Consulting Services',
  'Warehouse Management',
  'General Inquiry',
]

async function submitToFormspree(formData, id) {
  const res = await fetch(`https://formspree.io/f/${id}`, {
    method: 'POST',
    body: formData,
    headers: { Accept: 'application/json' },
  })
  return res.ok
}

function buildMailto(formData) {
  const fields = {
    'Full Name': formData.get('Full Name'),
    'Company': formData.get('Company'),
    'Email': formData.get('Email'),
    'Phone': formData.get('Phone'),
    'Service Required': formData.get('Service Required'),
    'Project Brief': formData.get('Project Brief'),
  }
  const body = Object.entries(fields).map(([k, v]) => `${k}: ${v || ''}`).join('\n')
  return `mailto:info@optimumscs.com?subject=${encodeURIComponent('Website Inquiry – OptimumSCS')}&body=${encodeURIComponent(body)}`
}

export default function ContactPage() {
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    const formData = new FormData(e.target)
    const id = import.meta.env.VITE_FORMSPREE_CONTACT_ID

    if (id && id !== 'REPLACE_ME') {
      const ok = await submitToFormspree(formData, id).catch(() => false)
      if (ok) { setStatus('success'); e.target.reset() }
      else setStatus('error')
    } else {
      window.location.href = buildMailto(formData)
      setStatus('idle')
    }
  }

  return (
    <section className="section first-section contact-page-enterprise">
      <div className="container contact-enterprise-shell">
        <div className="contact-hero-row">
          <div className="contact-hero-copy">
            <h1>
              Contact <span>Optimum SCS</span>
            </h1>
            <p>
              Let&apos;s talk about how we can optimize your transport, streamline
              operations, and transform your supply chain with data &amp; technology.
            </p>
          </div>

          <div className="glass-card contact-hero-actions">
            <Link to="/book-consultation" className="btn btn-primary contact-top-btn">
              <CalendarMini />
              <span>Book a Consultation</span>
            </Link>
            <Link to="/fee-quote" className="btn btn-primary contact-top-btn">
              <PlaneMini />
              <span>Request Quote</span>
            </Link>
          </div>
        </div>

        <div className="contact-layout-grid">
          <div className="contact-left-column">
            <article className="glass-card contact-info-card contact-block-card">
              <div className="section-heading left compact-heading">
                <h2>Get in Touch</h2>
                <p>We&apos;re here to help you build a smarter, more agile supply chain.</p>
              </div>

              <div className="contact-detail-list">
                {contactDetails.map((detail) => {
                  const Icon = detail.icon
                  const content = (
                    <>
                      <div className={`contact-detail-icon ${detail.brand ? `contact-icon-${detail.brand}` : ''}`}>
                        <Icon />
                      </div>
                      <div className="contact-detail-copy">
                        <span>{detail.label}</span>
                        <strong>{detail.value}</strong>
                      </div>
                    </>
                  )
                  if (detail.url) {
                    return (
                      <a className="contact-detail-row" key={detail.label} href={detail.url} target="_blank" rel="noreferrer">
                        {content}
                      </a>
                    )
                  }
                  return <div className="contact-detail-row" key={detail.label}>{content}</div>
                })}
              </div>
            </article>

            <article className="glass-card office-hours-card contact-block-card">
              <div className="office-hours-head">
                <div className="section-heading left compact-heading">
                  <h2>Office Hours</h2>
                </div>
                <div className="mini-round blue subtle-outline"><ClockMini /></div>
              </div>
              <div className="office-hours-list">
                {officeHours.map((item) => (
                  <div className="office-hours-row" key={item.day}>
                    <span>{item.day}</span>
                    <strong>{item.hours}</strong>
                  </div>
                ))}
              </div>
              <div className="response-note">
                <ClockMini />
                <span>We typically respond within 24 hours on business days.</span>
              </div>
            </article>
          </div>

          <div className="contact-right-column">
            <form
              id="contact-form"
              className="glass-card contact-form-enterprise contact-block-card"
              onSubmit={handleSubmit}
            >
              <div className="section-heading left compact-heading">
                <h2>Send Us a Message</h2>
              </div>

              {status === 'success' && (
                <div className="form-success-msg">
                  ✓ Message sent! We will get back to you within 24 hours.
                </div>
              )}
              {status === 'error' && (
                <div className="form-error-msg">
                  Something went wrong. Please email us directly at info@optimumscs.com
                </div>
              )}

              <div className="form-grid enterprise-form-grid">
                <label>
                  <span>Your full name</span>
                  <input name="Full Name" type="text" placeholder="Your full name" required />
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
                  <span>Phone</span>
                  <input name="Phone" type="tel" placeholder="+27" />
                </label>
                <label className="full select-field">
                  <span>Service Required</span>
                  <div className="select-shell">
                    <select name="Service Required" defaultValue="">
                      <option value="" disabled>Select a service...</option>
                      {serviceOptions.map(o => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                    <ChevronDownMini />
                  </div>
                </label>
                <label className="full">
                  <span>Project Brief</span>
                  <textarea name="Project Brief" rows="6" placeholder="Describe the challenge you want to solve" required />
                </label>
              </div>

              <div className="contact-form-footer">
                <button
                  type="submit"
                  className="btn btn-primary submit-wide-btn"
                  disabled={status === 'loading'}
                >
                  <PlaneMini />
                  <span>{status === 'loading' ? 'Sending…' : 'Send Inquiry'}</span>
                </button>
                <div className="privacy-note">
                  <LockMini />
                  <span>Your information is secure and will never be shared with third parties.</span>
                </div>
              </div>
            </form>

            <article className="glass-card location-card contact-block-card">
              <div className="location-head-row">
                <div className="location-title-wrap">
                  <h2>
                    <PinMini />
                    <span>Our Location</span>
                  </h2>
                  <p>104 A Rabie Street Randburg, Gauteng, South Africa</p>
                </div>
                <a
                  className="directions-link"
                  href="https://www.google.com/maps/search/?api=1&query=104+A+Rabie+Street+Randburg+Gauteng+South+Africa"
                  target="_blank"
                  rel="noreferrer"
                >
                  Get Directions
                </a>
              </div>
              <div className="real-map-wrap">
                <iframe
                  title="Optimum location map"
                  src="https://www.google.com/maps?q=104%20A%20Rabie%20Street%20Randburg%20Gauteng%20South%20Africa&z=15&output=embed"
                  className="real-map-frame"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  )
}
