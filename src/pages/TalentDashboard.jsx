import { useState, useMemo } from 'react'
import {
  Search, Users, MapPin, Clock, Briefcase, Download,
  Mail, Filter, ChartNoAxesCombined, Route, ShoppingCart,
  Workflow, CheckCircle2, SlidersHorizontal, UserCheck
} from 'lucide-react'
import './TalentDashboard.css'

/*
 * ══════════════════════════════════════════════════════
 * INTERNAL TALENT DASHBOARD — OptimumSCS
 *
 * This page is NOT linked in the public navigation.
 * Access via direct URL: /talent-dashboard
 *
 * In production this should be protected by authentication.
 * Connect to your backend API / database to load real profiles.
 *
 * DATABASE SCHEMA (recommended):
 * ─────────────────────────────
 * Table: talent_profiles
 *   id            UUID        PRIMARY KEY
 *   full_name     TEXT        NOT NULL
 *   email         TEXT        UNIQUE NOT NULL
 *   mobile        TEXT
 *   country       TEXT
 *   city          TEXT
 *   linkedin_url  TEXT
 *   position      TEXT
 *   employer      TEXT
 *   years_exp     TEXT
 *   industry      TEXT
 *   availability  TEXT        (enum: immediate|30days|60days|unavailable)
 *   engagement    TEXT[]      (array: consulting|contract|full-time|part-time)
 *   skills        TEXT[]      (array of skill strings)
 *   certifications TEXT[]
 *   cv_url        TEXT        (S3 / Blob Storage path)
 *   certs_doc_url TEXT
 *   created_at    TIMESTAMPTZ DEFAULT NOW()
 *   updated_at    TIMESTAMPTZ DEFAULT NOW()
 *
 * RECOMMENDED API ENDPOINTS:
 * ─────────────────────────────
 * GET    /api/talent?search=&country=&skill=&availability=&page=
 * GET    /api/talent/:id
 * POST   /api/talent          (public registration endpoint)
 * PATCH  /api/talent/:id      (admin update)
 * DELETE /api/talent/:id      (admin delete)
 * GET    /api/talent/:id/cv   (download CV)
 *
 * CV UPLOAD WORKFLOW:
 * ─────────────────────────────
 * 1. Client POSTs multipart/form-data to /api/talent
 * 2. Server validates file (type, size ≤ 10 MB)
 * 3. Server uploads to S3/Azure Blob with private ACL
 * 4. Server stores signed URL in talent_profiles.cv_url
 * 5. Admin requests CV via GET /api/talent/:id/cv
 *    → server generates short-lived presigned URL and redirects
 * ══════════════════════════════════════════════════════
 */

/* ── Demo seed data (replace with real API call) ── */
const DEMO_PROFILES = [
  {
    id: '1', fullName: 'Sipho Dlamini', initials: 'SD', position: 'TMS Consultant', employer: 'Freight Solutions Africa',
    country: 'South Africa', city: 'Johannesburg', yearsExp: '6–10 years', industry: 'Logistics & Transport',
    availability: 'Available Immediately', engagement: ['Consulting','Contract'],
    skills: ['Transport Planning','Route Optimisation','TMS Configuration','TMS Testing'],
    certifications: ['PMP','APICS CPIM'], hasCv: true,
  },
  {
    id: '2', fullName: 'Tendai Moyo', initials: 'TM', position: 'ERP Functional Analyst', employer: 'TechBridge Zimbabwe',
    country: 'Zimbabwe', city: 'Harare', yearsExp: '3–5 years', industry: 'Supply Chain Technology',
    availability: 'Available Within 30 Days', engagement: ['Consulting','Full-Time'],
    skills: ['ERP Implementation','Business Process Mapping','MB-330 Dynamics 365','System Testing'],
    certifications: ['MB-330','AZ-900'], hasCv: true,
  },
  {
    id: '3', fullName: 'Nkosi Banda', initials: 'NB', position: 'Power BI Developer', employer: 'DataVision SA',
    country: 'South Africa', city: 'Cape Town', yearsExp: '3–5 years', industry: 'Financial Services',
    availability: 'Available Immediately', engagement: ['Contract','Part-Time'],
    skills: ['Power BI','Dashboard Development','Data Modelling','Microsoft Fabric'],
    certifications: ['PL-300 Power BI'], hasCv: false,
  },
  {
    id: '4', fullName: 'Rutendo Chikwanda', initials: 'RC', position: 'Procurement Manager', employer: 'Mining Corp Zambia',
    country: 'Zambia', city: 'Lusaka', yearsExp: '11–15 years', industry: 'Mining & Resources',
    availability: 'Available Within 60 Days', engagement: ['Consulting'],
    skills: ['Strategic Sourcing','Supplier Management','Spend Analysis','Contract Management'],
    certifications: ['CIPS','Prince2'], hasCv: true,
  },
  {
    id: '5', fullName: 'Moses Khumalo', initials: 'MK', position: 'Senior ERP Consultant', employer: 'SAP Africa',
    country: 'South Africa', city: 'Sandton', yearsExp: '15+ years', industry: 'FMCG / Beverage',
    availability: 'Not Currently Available', engagement: ['Consulting'],
    skills: ['ERP Functional Consulting','Change Management','User Training','Business Process Mapping'],
    certifications: ['PMP','TOGAF','SAP Certified'], hasCv: true,
  },
  {
    id: '6', fullName: 'Aisha Mutombo', initials: 'AM', position: 'Data Engineer', employer: 'Freelance',
    country: 'South Africa', city: 'Pretoria', yearsExp: '6–10 years', industry: 'Healthcare & Medical',
    availability: 'Available Immediately', engagement: ['Contract','Consulting'],
    skills: ['ETL Development','Reporting Automation','Microsoft Fabric','Power BI'],
    certifications: ['AZ-900','PL-300 Power BI'], hasCv: true,
  },
]

const SERVICE_AREAS = ['All Areas','TMS Implementation','Procurement Services','ERP Transformation','Data Analytics & Reporting']
const COUNTRIES_F   = ['All Countries','South Africa','Zimbabwe','Zambia','Botswana','Kenya','Nigeria','Other']
const AVAILABILITY_F= ['All Availability','Available Immediately','Available Within 30 Days','Available Within 60 Days','Not Currently Available']
const YEARS_F       = ['All Experience','0–2 years','3–5 years','6–10 years','11–15 years','15+ years']

const SERVICE_SKILL_MAP = {
  'TMS Implementation':         ['Transport Planning','Route Optimisation','Logistics Operations','Distribution Management','TMS Configuration','TMS Testing'],
  'Procurement Services':       ['Strategic Sourcing','Supplier Management','Spend Analysis','Procurement Operations','Contract Management'],
  'ERP Transformation':         ['ERP Functional Consulting','ERP Implementation','Business Process Mapping','User Training','Change Management','System Testing'],
  'Data Analytics & Reporting': ['Power BI','Microsoft Fabric','Dashboard Development','Data Modelling','ETL Development','Reporting Automation'],
}

function availBadge(a) {
  if (a === 'Available Immediately') return 'avail-now'
  if (a === 'Available Within 30 Days') return 'avail-soon'
  if (a === 'Available Within 60 Days') return 'avail-later'
  return 'avail-no'
}

function skillColor(s, idx) {
  const colors = ['','g','p','o']
  return colors[idx % 4]
}

/* ═══════════════════════════════════════════ */
export default function TalentDashboard() {
  const [query,        setQuery]        = useState('')
  const [serviceArea,  setServiceArea]  = useState('All Areas')
  const [country,      setCountry]      = useState('All Countries')
  const [availability, setAvailability] = useState('All Availability')
  const [yearsExp,     setYearsExp]     = useState('All Experience')
  const [showFilters,  setShowFilters]  = useState(false)

  /* derive filter from service area → expand to skills */
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    const areaSkills = serviceArea !== 'All Areas' ? SERVICE_SKILL_MAP[serviceArea] || [] : null

    return DEMO_PROFILES.filter(p => {
      if (q) {
        const haystack = [p.fullName, p.position, p.employer, p.country, p.city,
          ...p.skills, ...p.certifications].join(' ').toLowerCase()
        if (!haystack.includes(q)) return false
      }
      if (areaSkills && !p.skills.some(s => areaSkills.includes(s))) return false
      if (country !== 'All Countries' && p.country !== country) return false
      if (availability !== 'All Availability' && p.availability !== availability) return false
      if (yearsExp !== 'All Experience' && p.yearsExp !== yearsExp) return false
      return true
    })
  }, [query, serviceArea, country, availability, yearsExp])

  /* stat counters */
  const stats = useMemo(() => ({
    total:     DEMO_PROFILES.length,
    available: DEMO_PROFILES.filter(p => p.availability === 'Available Immediately').length,
    countries: [...new Set(DEMO_PROFILES.map(p => p.country))].length,
    withCv:    DEMO_PROFILES.filter(p => p.hasCv).length,
  }), [])

  const Chevron = () => (
    <svg className="td-filter-chev" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 6 8 10 12 6" />
    </svg>
  )

  return (
    <div className="td-page">
      <section className="section first-section">
        <div className="container">

          {/* Header */}
          <div className="td-header">
            <div>
              <h1>Talent Network Dashboard</h1>
              <p>Internal view — search and match professionals from the OptimumSCS talent database</p>
            </div>
            <div className="td-header-actions">
              <a href="/careers" className="btn btn-ghost" style={{ minWidth: 0, fontSize: 15, minHeight: 46 }}>
                Public Page
              </a>
              <button className="btn btn-primary" style={{ minWidth: 0, fontSize: 15, minHeight: 46 }}
                onClick={() => window.print()}>
                <Download size={16} /> Export
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="td-stats-row">
            {[
              { label: 'Total Profiles',       val: stats.total,     Icon: Users,     cls: 'b' },
              { label: 'Available Immediately', val: stats.available, Icon: UserCheck, cls: 'g' },
              { label: 'Countries Represented', val: stats.countries, Icon: MapPin,    cls: 'p' },
              { label: 'Profiles with CV',      val: stats.withCv,   Icon: Briefcase, cls: 'o' },
            ].map(({ label, val, Icon, cls }) => (
              <div key={label} className="glass-card td-stat-card">
                <span className={`td-stat-icon ${cls}`}><Icon size={22} /></span>
                <div>
                  <div className="td-stat-val">{val}</div>
                  <div className="td-stat-label">{label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Search bar */}
          <div className="td-search-bar">
            <div className="td-search-inner">
              <Search size={18} />
              <input
                type="text"
                placeholder='Search by name, skill, certification, city… e.g. "Power BI South Africa"'
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
            </div>
            <button
              className={`td-filter-pill ${showFilters ? 'active' : ''}`}
              onClick={() => setShowFilters(v => !v)}
              style={{ display: 'flex', alignItems: 'center', gap: 8, height: 48 }}
            >
              <SlidersHorizontal size={15} /> Filters
            </button>
          </div>

          {/* Service area quick filters */}
          <div className="td-filter-pills" style={{ marginBottom: 16 }}>
            {SERVICE_AREAS.map(a => (
              <button key={a} className={`td-filter-pill ${serviceArea === a ? 'active' : ''}`}
                onClick={() => setServiceArea(a)}>
                {a}
              </button>
            ))}
          </div>

          {/* Advanced filters */}
          {showFilters && (
            <div className="glass-card" style={{ padding: '20px', marginBottom: 20 }}>
              <div className="td-filters-panel">
                {[
                  { label: 'Country', value: country, setter: setCountry, opts: COUNTRIES_F },
                  { label: 'Availability', value: availability, setter: setAvailability, opts: AVAILABILITY_F },
                  { label: 'Years of Experience', value: yearsExp, setter: setYearsExp, opts: YEARS_F },
                ].map(({ label, value, setter, opts }) => (
                  <div key={label} className="td-filter-group">
                    <label>{label}</label>
                    <div className="td-filter-sel-wrap">
                      <select className="td-filter-sel" value={value} onChange={e => setter(e.target.value)}>
                        {opts.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                      <Chevron />
                    </div>
                  </div>
                ))}
                <div className="td-filter-group" style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                  <button className="td-filter-pill" style={{ height: 42 }}
                    onClick={() => { setCountry('All Countries'); setAvailability('All Availability'); setYearsExp('All Experience'); setQuery(''); setServiceArea('All Areas') }}>
                    Clear All
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Results count */}
          <div style={{ marginBottom: 16, fontSize: 14, color: 'var(--muted)' }}>
            Showing <strong style={{ color: '#fff' }}>{filtered.length}</strong> of {DEMO_PROFILES.length} profiles
            {query && <> matching <em style={{ color: '#58e5ff' }}>"{query}"</em></>}
          </div>

          {/* Candidate cards */}
          <div className="td-candidates-grid">
            {filtered.length === 0 && (
              <div className="td-empty">
                <Search size={48} />
                <p>No profiles match your current search and filters.</p>
              </div>
            )}
            {filtered.map(p => {
              const visibleSkills = p.skills.slice(0, 4)
              const extraSkills   = p.skills.length - visibleSkills.length
              return (
                <div key={p.id} className="glass-card td-candidate-card">
                  {/* Header */}
                  <div className="td-cand-header">
                    <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                      <div className="td-cand-avatar">{p.initials}</div>
                      <div className="td-cand-info">
                        <h3>{p.fullName}</h3>
                        <p>{p.position}</p>
                        {p.employer && <p style={{ marginTop: 2, fontSize: 12 }}>{p.employer}</p>}
                      </div>
                    </div>
                    <span className={`td-avail-badge ${availBadge(p.availability)}`}>
                      {p.availability === 'Available Immediately' ? 'Available Now'
                        : p.availability === 'Available Within 30 Days' ? '30 Days'
                        : p.availability === 'Available Within 60 Days' ? '60 Days'
                        : 'Unavailable'}
                    </span>
                  </div>

                  {/* Meta */}
                  <div className="td-cand-meta">
                    <span className="td-meta-chip"><MapPin size={12} />{p.city}, {p.country}</span>
                    <span className="td-meta-chip"><Clock size={12} />{p.yearsExp}</span>
                    <span className="td-meta-chip"><Briefcase size={12} />{p.industry}</span>
                    {p.hasCv && <span className="td-meta-chip" style={{ color: '#7af7d8', borderColor: 'rgba(122,247,216,.2)' }}><CheckCircle2 size={12} />CV</span>}
                  </div>

                  {/* Skills */}
                  <div className="td-skills-preview">
                    {visibleSkills.map((s, i) => (
                      <span key={s} className={`td-skill-tag ${skillColor(s, i)}`}>{s}</span>
                    ))}
                    {extraSkills > 0 && <span className="td-skill-more">+{extraSkills} more</span>}
                  </div>

                  {/* Certifications */}
                  {p.certifications.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {p.certifications.map(c => (
                        <span key={c} style={{ padding: '3px 9px', borderRadius: 999, fontSize: 11, fontWeight: 600, background: 'rgba(251,191,36,.08)', border: '1px solid rgba(251,191,36,.2)', color: '#fbbf24' }}>
                          {c}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Footer */}
                  <div className="td-cand-footer">
                    <div className="td-cand-engagement">
                      {p.engagement.map(e => (
                        <span key={e} className="td-eng-tag">{e}</span>
                      ))}
                    </div>
                    <button className="td-contact-btn"
                      onClick={() => window.location.href = `mailto:${p.fullName.toLowerCase().replace(' ','.')}@example.com?subject=OptimumSCS Project Opportunity`}>
                      <Mail size={13} /> Contact
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Schema / API docs note */}
          <div className="glass-card" style={{ marginTop: 40, padding: 28 }}>
            <h3 style={{ margin: '0 0 12px', fontSize: 18, fontWeight: 700, color: '#58e5ff' }}>
              Integration Notes
            </h3>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.75, color: 'var(--text-soft)' }}>
              This dashboard currently uses demo seed data. To connect to a live database:
              <br />• Set <code style={{ background: 'rgba(88,229,255,.08)', padding: '1px 6px', borderRadius: 4, color: '#58e5ff' }}>VITE_TALENT_API_BASE</code> in your .env file
              <br />• Set <code style={{ background: 'rgba(88,229,255,.08)', padding: '1px 6px', borderRadius: 4, color: '#58e5ff' }}>VITE_FORMSPREE_TALENT_ID</code> for form submissions
              <br />• Replace <code style={{ background: 'rgba(88,229,255,.08)', padding: '1px 6px', borderRadius: 4, color: '#58e5ff' }}>DEMO_PROFILES</code> array with a <code style={{ background: 'rgba(88,229,255,.08)', padding: '1px 6px', borderRadius: 4, color: '#58e5ff' }}>useEffect</code> fetch from your API
              <br />• Protect this route with your authentication layer (session / JWT)
              <br />• See schema and API design comments at the top of <code style={{ background: 'rgba(88,229,255,.08)', padding: '1px 6px', borderRadius: 4, color: '#58e5ff' }}>TalentDashboard.jsx</code>
            </p>
          </div>

        </div>
      </section>
    </div>
  )
}
