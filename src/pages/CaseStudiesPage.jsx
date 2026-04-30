import { useState } from 'react'
import './CaseStudiesPage.css'
import caseStudiesImg from '../assets/case-studies.jpg'
import { trustedResultCards } from '../components/data'
import { ResultCard } from '../components/Common'

const clientTestimonials = [
  {
    quote:
      'OptimumSCS helped us optimise our routes and reduce transport costs significantly. Their team’s expertise and data-driven approach delivered real results.',
    role: 'Supply Chain Director',
    industry: 'Beverage Industry',
  },
  {
    quote:
      'The TMS implementation was seamless and has given us real-time visibility across our operations. Our delivery accuracy has improved remarkably.',
    role: 'Operations Manager',
    industry: 'Logistics Industry',
  },
  {
    quote:
      'Their ERP and BI integration transformed our reporting and decision-making. We now have complete control and visibility across the supply chain.',
    role: 'IT Director',
    industry: 'Technology Industry',
  },
]

const impactMetrics = [
  { value: '4', label: 'Countries', detail: 'Served with integrated solutions', accent: 'green', icon: 'globe' },
  { value: '50+', label: 'Projects Delivered', detail: 'Across multiple industries', accent: 'blue', icon: 'chart' },
  { value: '92%', label: 'Client Satisfaction', detail: 'Based on project feedback', accent: 'purple', icon: 'people' },
  { value: '8-12%', label: 'Average Cost Savings', detail: 'Typical project range achieved by clients', accent: 'orange', icon: 'saving' },
]

const metricIconPaths = {
  globe: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M4 12h16M12 4c2.4 2.2 3.6 4.9 3.6 8S14.4 17.8 12 20c-2.4-2.2-3.6-4.9-3.6-8S9.6 6.2 12 4Z" />
    </>
  ),
  chart: <path d="M5 19h14M7 15l4-4 3 3 5-7M17 7h2v2" />,
  people: (
    <>
      <path d="M8.5 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM15.5 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path d="M3.5 19a5 5 0 0 1 10 0M10.5 19a5 5 0 0 1 10 0" />
    </>
  ),
  saving: (
    <>
      <path d="M12 5v14M8.5 8.5c0-1.8 1.5-3 3.6-3 2 0 3.4 1 3.4 2.7 0 3.8-7 2-7 5.6 0 1.7 1.5 2.7 3.7 2.7 2.1 0 3.8-1.1 3.8-3" />
      <circle cx="12" cy="12" r="9" />
    </>
  ),
}

const africaFootprint = [
  {
    country: 'South Africa',
    x: 50,
    y: 84,
    industry: 'FMCG Distribution',
    solution: 'Route Optimization & ERP Visibility',
    result: '9% transport cost improvement',
  },
  {
    country: 'Zimbabwe',
    x: 56,
    y: 71,
    industry: 'Beverage & Warehouse Operations',
    solution: 'WMS and materials flow improvement',
    result: 'Improved stock accuracy and fulfilment control',
  },
  {
    country: 'Uganda',
    x: 59,
    y: 53,
    industry: 'Logistics & Regional Distribution',
    solution: 'Transport planning and delivery visibility',
    result: 'Better route control and service visibility',
  },
  {
    country: 'Namibia',
    x: 43,
    y: 76,
    industry: 'Cross-border Logistics',
    solution: 'Transport optimisation and reporting',
    result: 'Improved regional planning visibility',
  },
]

export default function CaseStudiesPage() {
  const [selectedCountry, setSelectedCountry] = useState(africaFootprint[0])

  return (
    <>
      <section className="case-hero-clean">
        <div className="case-container-clean">
          <div className="case-hero-grid">
            <div className="case-hero-text">
              <h1>Case Studies</h1>
              <p>
                Explore how our solutions have transformed businesses for some of our clients, showcasing real results.
              </p>
            </div>

            <div className="case-hero-image">
              <img src={caseStudiesImg} alt="Case Studies" />
            </div>
          </div>
        </div>
      </section>

      <section className="case-content-clean">
        <div className="case-container-clean">
          <div className="result-grid case-result-grid">
            {trustedResultCards.map((card) => (
              <ResultCard key={card.title} {...card} />
            ))}
          </div>

          <div className="case-proof-grid">
            <section className="case-proof-panel">
              <div className="case-proof-heading">
                <h2>What Our Clients Say</h2>
              </div>

              <div className="testimonial-grid">
                {clientTestimonials.map((testimonial) => (
                  <article className="testimonial-card" key={`${testimonial.role}-${testimonial.industry}`}>
                    <div className="quote-mark">“</div>
                    <p>{testimonial.quote}</p>
                    <div className="testimonial-person">
                      <div className="testimonial-avatar" aria-hidden="true">
                        <span />
                      </div>
                      <div>
                        <strong>{testimonial.role}</strong>
                        <span>{testimonial.industry}</span>
                        <em>(Name Withheld)</em>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <p className="confidentiality-note">
                For client confidentiality, specific names have been withheld.
              </p>
            </section>

            <section className="case-proof-panel">
              <div className="case-proof-heading">
                <h2>Our Impact in Numbers</h2>
              </div>

              <div className="impact-metric-grid">
                {impactMetrics.map((metric) => (
                  <article className="impact-metric-card" key={metric.label}>
                    <div className={`impact-icon ${metric.accent}`}>
                      <svg viewBox="0 0 24 24" aria-hidden="true">
                        {metricIconPaths[metric.icon]}
                      </svg>
                    </div>
                    <div>
                      <strong>{metric.value}</strong>
                      <span>{metric.label}</span>
                      <p>{metric.detail}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <section className="africa-footprint-section">
            <div className="case-proof-heading footprint-heading">
              <h2>Our Footprint in Africa</h2>
              <p>Delivering supply chain transformation across key African markets</p>
            </div>

            <div className="africa-footprint-grid">
              <div className="africa-map-card" aria-label="Interactive Africa footprint map">
                <div className="africa-google-map">
                  <iframe
                    title="Google map of Africa"
                    src="https://www.google.com/maps?q=Africa&z=3&output=embed"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />

                  <div className="africa-map-overlay" aria-label="Countries served across Africa">
                    {africaFootprint.map((point) => (
                      <button
                        key={point.country}
                        type="button"
                        className={`country-map-marker ${selectedCountry.country === point.country ? 'active' : ''}`}
                        style={{ left: `${point.x}%`, top: `${point.y}%` }}
                        aria-label={`View ${point.country} footprint result`}
                        onClick={() => setSelectedCountry(point)}
                      >
                        <span className="country-map-dot" />
                        <span className="country-map-label">{point.country}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <article className="footprint-detail-card">
                <span className="footprint-kicker">Active projects & partnerships across</span>
                <h3>{selectedCountry.country}</h3>
                <dl>
                  <div>
                    <dt>Industry Served</dt>
                    <dd>{selectedCountry.industry}</dd>
                  </div>
                  <div>
                    <dt>Solution Focus</dt>
                    <dd>{selectedCountry.solution}</dd>
                  </div>
                  <div>
                    <dt>Result</dt>
                    <dd>{selectedCountry.result}</dd>
                  </div>
                </dl>
                <p>Expanding across Africa - supporting regional supply chain transformation.</p>
              </article>
            </div>
          </section>
        </div>
      </section>
    </>
  )
}
