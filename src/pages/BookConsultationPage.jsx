import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {
  BriefMini,
  CalendarMini,
  ClockMini,
  LockMini,
  MailMini,
  PhoneMini,
  PlaneMini,
  RouteIcon,
  UserIcon,
} from '../components/Icons'

const consultationIntro = {
  title: 'Book a Consultation',
  description:
    'Schedule a consultation with OptimumSCS to discuss your supply chain, ERP, TMS, procurement services, analytics, or optimisation needs.',
}

const expectationItems = [
  {
    title: 'Discovery Session',
    description: 'We understand your current challenges, systems, and business priorities.',
    icon: CalendarMini,
  },
  {
    title: '30-45 Minutes',
    description: 'A focused discussion to identify improvement opportunities.',
    icon: ClockMini,
  },
  {
    title: 'Practical Guidance',
    description: 'You receive clear next steps based on your operational needs.',
    icon: BriefMini,
  },
  {
    title: 'Results-Focused',
    description: 'Our goal is to help you optimise operations, reduce costs, and drive measurable value.',
    icon: RouteIcon,
  },
]

const interestOptions = [
  'TMS Implementation',
  'ERP Transformation',
  'Procurement Services',
  'Data Analytics & Reporting',
  'Consulting Services ',
  'Other ',
]

function formatDate(date) {
  if (!date) return ''
  return date.toLocaleDateString('en-ZA', { year: 'numeric', month: 'long', day: 'numeric' })
}

function formatTime(date) {
  if (!date) return ''
  return date.toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit', hour12: true })
}

export default function BookConsultationPage() {
  const [status, setStatus] = useState('idle')
  const [preferredDate, setPreferredDate] = useState(null)
  const [preferredTime, setPreferredTime] = useState(null)

  const handleConsultationSubmit = async (event) => {
    event.preventDefault()
    setStatus('loading')

    const formData = new FormData(event.currentTarget)
    formData.set('Preferred Date', formatDate(preferredDate))
    formData.set('Preferred Time', formatTime(preferredTime))

    const id = import.meta.env.VITE_FORMSPREE_CONSULT_ID

    if (id && id !== 'REPLACE_ME') {
      try {
        const res = await fetch(`https://formspree.io/f/${id}`, {
          method: 'POST',
          body: formData,
          headers: { Accept: 'application/json' },
        })
        if (res.ok) {
          setStatus('success')
          event.target.reset()
          setPreferredDate(null)
          setPreferredTime(null)
        } else {
          setStatus('error')
        }
      } catch {
        setStatus('error')
      }
    } else {
      const fields = {
        'Full Name': formData.get('Full Name'),
        'Company': formData.get('Company'),
        'Email': formData.get('Email'),
        'Phone': formData.get('Phone'),
        'Preferred Date': formatDate(preferredDate),
        'Preferred Time': formatTime(preferredTime),
        'Areas of Interest': formData.get('Areas of Interest'),
        'Brief Description': formData.get('Brief Description'),
      }
      const body = Object.entries(fields).map(([k, v]) => `${k}: ${v || ''}`).join('\n')
      window.location.href = `mailto:info@optimumscs.com?subject=${encodeURIComponent('Consultation Request – OptimumSCS')}&body=${encodeURIComponent(body)}`
      setStatus('idle')
    }
  }

  // Only allow future weekdays
  const isWeekday = (date) => {
    const day = date.getDay()
    return day !== 0 && day !== 6
  }

  const minDate = new Date()
  minDate.setDate(minDate.getDate() + 1)

  // Business hours: 8:00 AM – 4:30 PM
  const minTime = new Date(); minTime.setHours(8, 0, 0)
  const maxTime = new Date(); maxTime.setHours(16, 30, 0)

  return (
    <section className="section first-section consultation-page">
      <div className="container consultation-shell">
        <div className="consultation-hero-copy">
          <h1>{consultationIntro.title}</h1>
          <p>{consultationIntro.description}</p>
        </div>

        <div className="consultation-grid">
          <article className="glass-card consultation-expect-card">
            <div className="section-heading left compact-heading">
              <h2>What to Expect</h2>
            </div>
            <div className="consultation-expect-list">
              {expectationItems.map((item) => {
                const Icon = item.icon
                return (
                  <div className="consultation-expect-row" key={item.title}>
                    <div className="consultation-expect-icon"><Icon /></div>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </article>

          <form className="glass-card consultation-form-card" onSubmit={handleConsultationSubmit}>
            <div className="section-heading left compact-heading">
              <h2>Consultation Request</h2>
            </div>

            {status === 'success' && (
              <div className="form-success-msg">
                ✓ Request sent! We will be in touch within 24 hours to confirm your consultation.
              </div>
            )}
            {status === 'error' && (
              <div className="form-error-msg">
                Something went wrong. Please email us directly at info@optimumscs.com
              </div>
            )}

            <div className="form-grid enterprise-form-grid consultation-form-grid">
              <label>
                <span>Full Name</span>
                <div className="input-with-icon">
                  <UserIcon />
                  <input name="Full Name" type="text" placeholder="Your full name" required />
                </div>
              </label>
              <label>
                <span>Company</span>
                <div className="input-with-icon">
                  <BriefMini />
                  <input name="Company" type="text" placeholder="Company name" />
                </div>
              </label>
              <label>
                <span>Email</span>
                <div className="input-with-icon">
                  <MailMini />
                  <input name="Email" type="email" placeholder="name@company.com" required />
                </div>
              </label>
              <label>
                <span>Phone</span>
                <div className="input-with-icon">
                  <PhoneMini />
                  <input name="Phone" type="tel" placeholder="+27" />
                </div>
              </label>

              {/* ── Date Picker ── */}
              <label>
                <span>Preferred Date</span>
                <div className="input-with-icon datepicker-wrap">
                  <CalendarMini />
                  <DatePicker
                    selected={preferredDate}
                    onChange={setPreferredDate}
                    filterDate={isWeekday}
                    minDate={minDate}
                    placeholderText="Select a date"
                    dateFormat="dd MMMM yyyy"
                    className="datepicker-input"
                    calendarClassName="dp-calendar"
                    popperPlacement="bottom-start"
                    showPopperArrow={false}
                  />
                </div>
              </label>

              {/* ── Time Picker ── */}
              <label>
                <span>Preferred Time</span>
                <div className="input-with-icon datepicker-wrap">
                  <ClockMini />
                  <DatePicker
                    selected={preferredTime}
                    onChange={setPreferredTime}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={30}
                    minTime={minTime}
                    maxTime={maxTime}
                    placeholderText="Select a time"
                    dateFormat="h:mm aa"
                    timeFormat="h:mm aa"
                    className="datepicker-input"
                    calendarClassName="dp-calendar dp-time-only"
                    popperPlacement="bottom-start"
                    showPopperArrow={false}
                  />
                </div>
              </label>

              <label className="full">
                <span>Areas of Interest</span>
                <div className="input-with-icon">
                  <BriefMini />
                  <select name="Areas of Interest" defaultValue="" className="consult-interest-select">
                    <option value="" disabled>Select area of interest...</option>
                    {interestOptions.map(o => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </div>
              </label>

              <label className="full">
                <span>Brief Description</span>
                <div className="input-with-icon textarea-with-icon">
                  <PlaneMini />
                  <textarea name="Brief Description" rows="5" placeholder="Tell us what you would like to discuss" />
                </div>
              </label>
            </div>

            <div className="consultation-form-footer">
              <button type="submit" className="btn btn-primary submit-wide-btn" disabled={status === 'loading'}>
                <PlaneMini />
                <span>{status === 'loading' ? 'Sending…' : 'Submit Consultation Request'}</span>
              </button>
              <div className="privacy-note">
                <LockMini />
                <span>Your information is secure and will never be shared with third parties.</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
