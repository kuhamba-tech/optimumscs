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

export default function ContactPage() {
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
                      <div className="contact-detail-icon">
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
                      <a
                        className="contact-detail-row"
                        key={detail.label}
                        href={detail.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {content}
                      </a>
                    )
                  }

                  return (
                    <div className="contact-detail-row" key={detail.label}>
                      {content}
                    </div>
                  )
                })}
              </div>
            </article>

            <article className="glass-card office-hours-card contact-block-card">
              <div className="office-hours-head">
                <div className="section-heading left compact-heading">
                  <h2>Office Hours</h2>
                </div>
                <div className="mini-round blue subtle-outline">
                  <ClockMini />
                </div>
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
            <form id="contact-form" className="glass-card contact-form-enterprise contact-block-card">
              <div className="section-heading left compact-heading">
                <h2>Send Us a Message</h2>
              </div>

              <div className="form-grid enterprise-form-grid">
                <label>
                  <span>Your full name</span>
                  <input type="text" placeholder="Your full name" />
                </label>
                <label>
                  <span>Company</span>
                  <input type="text" placeholder="Company name" />
                </label>
                <label>
                  <span>Email</span>
                  <input type="email" placeholder="name@company.com" />
                </label>
                <label>
                  <span>Phone</span>
                  <input type="text" placeholder="+27" />
                </label>
                <label className="full select-field">
                  <span>Service Required</span>
                  <div className="select-shell">
                    <input
                      type="text"
                      placeholder="Optimization, visibility, analytics, ERP, TMS..."
                      readOnly
                    />
                    <ChevronDownMini />
                  </div>
                </label>
                <label className="full">
                  <span>Project Brief</span>
                  <textarea rows="6" placeholder="Describe the challenge you want to solve" />
                </label>
              </div>

              <div className="contact-form-footer">
                <button type="button" className="btn btn-primary submit-wide-btn">
                  <PlaneMini />
                  <span>Send Inquiry</span>
                </button>
                <div className="privacy-note">
                  <LockMini />
                  <span>Your information is secure and will never be shared with third parties.</span>
                </div>
              </div>
            </form>

            {/* ✅ REAL MAP SECTION */}
            <article className="glass-card location-card contact-block-card">
              <div className="location-head-row">
                <div className="location-title-wrap">
                  <h2>
                    <PinMini />
                    <span>Our Location</span>
                  </h2>
                  <p>104 A Rabie Street Randburg, Gauteng,South Africa</p>
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
