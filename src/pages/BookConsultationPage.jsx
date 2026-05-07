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
    description:
      'We understand your current challenges, systems, and business priorities.',
    icon: CalendarMini,
  },
  {
    title: '30-45 Minutes',
    description:
      'A focused discussion to identify improvement opportunities.',
    icon: ClockMini,
  },
  {
    title: 'Practical Guidance',
    description:
      'You receive clear next steps based on your operational needs.',
    icon: BriefMini,
  },
  {
    title: 'Results-Focused',
    description:
      'Our goal is to help you optimise operations, reduce costs, and drive measurable value.',
    icon: RouteIcon,
  },
]

const interestOptions = [
  'Transport Optimization',
  'TMS Implementation',
  'ERP Transformation',
  'Procurement Services',
  'Procurement Systems',
  'Data Analytics & Reporting',
  'Power BI Dashboards',
  'General Supply Chain Consulting',
]

export default function BookConsultationPage() {
  const handleConsultationSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const fields = [
      'Full Name',
      'Company',
      'Email',
      'Phone',
      'Preferred Date',
      'Preferred Time',
      'Areas of Interest',
      'Brief Description',
    ]

    const messageBody = fields
      .map((field) => `${field}: ${formData.get(field) || ''}`)
      .join('\n')

    window.location.href = `mailto:info@optimumscs.com?subject=${encodeURIComponent(
      'Consultation Request',
    )}&body=${encodeURIComponent(messageBody)}`
  }

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
                    <div className="consultation-expect-icon">
                      <Icon />
                    </div>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </article>

          <form
            className="glass-card consultation-form-card"
            onSubmit={handleConsultationSubmit}
          >
            <div className="section-heading left compact-heading">
              <h2>Consultation Request</h2>
            </div>

            <div className="form-grid enterprise-form-grid consultation-form-grid">
              <label>
                <span>Full Name</span>
                <div className="input-with-icon">
                  <UserIcon />
                  <input name="Full Name" type="text" placeholder="Your full name" />
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
                  <input name="Email" type="email" placeholder="name@company.com" />
                </div>
              </label>
              <label>
                <span>Phone</span>
                <div className="input-with-icon">
                  <PhoneMini />
                  <input name="Phone" type="text" placeholder="+27" />
                </div>
              </label>
              <label>
                <span>Preferred Date</span>
                <div className="input-with-icon">
                  <CalendarMini />
                  <input name="Preferred Date" type="date" aria-label="Preferred date" />
                </div>
              </label>
              <label>
                <span>Preferred Time</span>
                <div className="input-with-icon">
                  <ClockMini />
                  <input name="Preferred Time" type="time" aria-label="Preferred time" />
                </div>
              </label>
              <label className="full">
                <span>Areas of Interest</span>
                <div className="input-with-icon textarea-with-icon">
                  <BriefMini />
                  <textarea
                    name="Areas of Interest"
                    rows="3"
                    placeholder={`Add one or more areas of interest, e.g. ${interestOptions.join(', ')}`}
                  />
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
              <button type="submit" className="btn btn-primary submit-wide-btn">
                <PlaneMini />
                <span>Submit Consultation Request</span>
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
