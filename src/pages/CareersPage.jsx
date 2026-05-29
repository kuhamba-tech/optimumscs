import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  Route, ShoppingCart, Workflow, ChartNoAxesCombined,
  Upload, FileText, Award, User, Briefcase, Clock,
  CheckCircle2, Info, ArrowRight, Shield, Globe,
  MapPin, Calendar, Zap, Building2, Star, Database, Mail
} from 'lucide-react'
import './CareersPage.css'

/* ── Current open opportunity ─────────────── */
const OPEN_ROLES = [
  'Senior Data Engineering Lead',
  'Data Engineering Lead',
  'Data Engineers (Mid & Junior)',
  'Power BI Lead',
  'Power BI Developers (Senior & Mid)',
  'DevOps Engineer',
  'Testing Lead',
]

const KEY_SKILLS = [
  'Strong experience with Microsoft Fabric / Data Fabric',
  'Data Engineering (ETL/ELT, pipelines, lakehouse architecture)',
  'Power BI (data modelling, dashboards, reporting)',
  'Azure ecosystem (Data Factory, Synapse, etc.)',
  'DevOps & CI/CD for data platforms',
  'Strong understanding of analytics and reporting solutions',
]

/* ── Static data ─────────────────────────── */

const BENEFITS = [
  'Project-based consulting opportunities',
  'Contract and freelance assignments',
  'Long-term deployment engagements',
  'Africa-wide project coverage',
  'Exposure to enterprise transformation projects',
]

const MINI_CARDS = [
  { icon: Globe,     color: '',  title: 'Africa-wide Network',      desc: 'Projects spanning South Africa, Zimbabwe, Uganda and beyond.' },
  { icon: Zap,       color: 'g', title: 'Fast Engagement',          desc: 'Matched to opportunities as soon as they arise.' },
  { icon: Building2, color: 'p', title: 'Enterprise Clients',       desc: 'Work with large corporates, governments and NGOs.' },
  { icon: Star,      color: 'o', title: 'Specialised Roles',        desc: 'Niche roles matched to your specific skill set.' },
]

const EXPERTISE = [
  {
    icon: Route, iconCls: 'exp-tms', tagCls: 'tag-t', label: 'TMS Implementation',
    desc: 'Support transportation management system implementation, logistics optimisation, routing solutions, transport planning and distribution operations.',
  },
  {
    icon: ShoppingCart, iconCls: 'exp-proc', tagCls: 'tag-p', label: 'Procurement Services',
    desc: 'Support sourcing, supplier management, procurement transformation, spend analysis and procurement process improvement.',
  },
  {
    icon: Workflow, iconCls: 'exp-erp', tagCls: 'tag-e', label: 'ERP Transformation',
    desc: 'Support ERP implementation, business process transformation, Microsoft Dynamics 365 projects, requirements analysis, testing and deployment.',
  },
  {
    icon: ChartNoAxesCombined, iconCls: 'exp-data', tagCls: 'tag-d', label: 'Data Analytics & Reporting',
    desc: 'Support business intelligence initiatives, Power BI dashboards, Microsoft Fabric solutions, reporting automation and data-driven decision making.',
  },
]

const HOW_IT_WORKS = [
  { num: '01', title: 'Submit Your Profile',                desc: 'Complete the registration form with your skills, experience and availability.' },
  { num: '02', title: 'Profile Added to Network',          desc: 'Your profile is reviewed and added to the OptimumSCS Talent Network database.' },
  { num: '03', title: 'Skills Matched to Projects',        desc: 'When a client project arises, we match requirements against network profiles.' },
  { num: '04', title: 'You Are Contacted',                 desc: 'Qualified professionals matching the project are contacted directly.' },
]

const SKILLS = {
  tms: {
    label: 'TMS Implementation', color: 'sel', accent: 'blue',
    items: ['Transport Planning','Route Optimisation','Logistics Operations','Distribution Management','TMS Configuration','TMS Testing'],
  },
  procurement: {
    label: 'Procurement Services', color: 'sel-g', accent: 'green',
    items: ['Strategic Sourcing','Supplier Management','Spend Analysis','Procurement Operations','Contract Management'],
  },
  erp: {
    label: 'ERP Transformation', color: 'sel-p', accent: 'purple',
    items: ['ERP Functional Consulting','ERP Implementation','Business Process Mapping','User Training','Change Management','System Testing'],
  },
  analytics: {
    label: 'Data Analytics & Reporting', color: 'sel-o', accent: 'orange',
    items: ['Power BI','Microsoft Fabric','Dashboard Development','Data Modelling','ETL Development','Reporting Automation'],
  },
}

const CERT_SUGGESTIONS = ['PMP','Prince2','APICS CPIM','CIPS','AZ-900','PL-300 Power BI','MB-330 Dynamics 365','MCSE','TOGAF','COBIT','ITIL']

const ENGAGEMENT_OPTIONS = [
  { label: 'Consulting',  Icon: Briefcase },
  { label: 'Contract',    Icon: FileText  },
  { label: 'Full-Time',   Icon: Building2 },
  { label: 'Part-Time',   Icon: Clock     },
]

const AVAILABILITY_OPTIONS = [
  'Available Immediately',
  'Available Within 30 Days',
  'Available Within 60 Days',
  'Not Currently Available',
]

const COUNTRIES = [
  'South Africa','Zimbabwe','Zambia','Botswana','Namibia','Mozambique',
  'Kenya','Nigeria','Ghana','Tanzania','Uganda','Other',
]

/* ── Form section IDs for sidebar nav ──── */
const FORM_SECTIONS = [
  { id: 'personal',    label: 'Personal Information',     Icon: User      },
  { id: 'experience',  label: 'Professional Experience',  Icon: Briefcase },
  { id: 'availability',label: 'Availability',             Icon: Calendar  },
  { id: 'skills',      label: 'Skills',                   Icon: Zap       },
  { id: 'certs',       label: 'Certifications',           Icon: Award     },
  { id: 'docs',        label: 'Documents',                Icon: Upload    },
]

/* ── Helpers ─────────────────────────────── */
function buildMailtoBody(fields) {
  return Object.entries(fields).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : (v || '')}`).join('\n')
}

/* ═══════════════════════════════════════════
   Page Component
   ═══════════════════════════════════════════ */
export default function CareersPage() {
  /* form field state */
  const [fields, setFields] = useState({
    fullName: '', email: '', mobile: '', country: '', city: '', linkedin: '',
    position: '', employer: '', yearsExp: '', industry: '',
    availability: '', otherInfo: '',
  })
  const [engagement, setEngagement] = useState([])
  const [skills, setSkills] = useState({})        // { 'Power BI': true, ... }
  const [certs, setCerts] = useState([])
  const [certInput, setCertInput] = useState('')
  const [cvFile, setCvFile] = useState(null)
  const [certsFile, setCertsFile] = useState(null)
  const [activeSection, setActiveSection] = useState('personal')
  const [status, setStatus] = useState('idle')

  /* quick-apply modal */
  const [applyOpen,   setApplyOpen]   = useState(false)
  const [applyStatus, setApplyStatus] = useState('idle')
  const [applyFields, setApplyFields] = useState({
    name: '', email: '', phone: '', role: '', message: '',
  })
  const [applyCV,     setApplyCV]     = useState(null)
  const [applyCerts,  setApplyCerts]  = useState(null)
  const [applyOther,  setApplyOther]  = useState(null)
  const setApply = (k, v) => setApplyFields(p => ({ ...p, [k]: v }))

  const handleApplySubmit = async e => {
    e.preventDefault()
    setApplyStatus('loading')
    const { name, email, phone, role, message } = applyFields
    const key = import.meta.env.VITE_WEB3FORMS_RECRUIT_KEY

    const openMailto = () => {
      const body = [
        `Full Name: ${name}`, `Email: ${email}`, `Phone: ${phone || ''}`,
        `Role Applied For: ${role}`, '', `Message:`, message || '',
        '', `CV: ${applyCV?.name || 'Not attached'}`,
        `Certifications: ${applyCerts?.name || 'Not attached'}`,
        `Other Documents: ${applyOther?.name || 'Not attached'}`,
      ].join('\n')
      window.location.href = `mailto:recruitment@optimumscs.com?subject=${encodeURIComponent(`Job Application – ${role} – OptimumSCS`)}&body=${encodeURIComponent(body)}`
    }

    if (!key || key === 'REPLACE_ME') {
      openMailto()
      setApplyStatus('idle')
      setApplyOpen(false)
      return
    }

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: key,
          subject: `Job Application – ${role} – OptimumSCS`,
          'Full Name': name, 'Email': email, 'Phone': phone || '',
          'Role Applied For': role, 'Message': message || '',
          'CV': applyCV?.name || 'Not attached',
          'Certifications': applyCerts?.name || 'Not attached',
          'Supporting Documents': applyOther?.name || 'Not attached',
        }),
      })
      const data = await res.json()
      if (data.success) {
        setApplyStatus('success')
        setApplyFields({ name: '', email: '', phone: '', role: '', message: '' })
        setApplyCV(null); setApplyCerts(null); setApplyOther(null)
      } else {
        openMailto()
        setApplyStatus('idle')
        setApplyOpen(false)
      }
    } catch {
      openMailto()
      setApplyStatus('idle')
      setApplyOpen(false)
    }
  }

  const sectionRefs = useRef({})

  /* ── Field update ─────────────────────── */
  const setField = (k, v) => setFields(prev => ({ ...prev, [k]: v }))

  /* ── Skill toggle ─────────────────────── */
  const toggleSkill = s => setSkills(prev => ({ ...prev, [s]: !prev[s] }))

  /* ── Engagement toggle ────────────────── */
  const toggleEngagement = v =>
    setEngagement(prev => prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v])

  /* ── Cert helpers ─────────────────────── */
  const addCert = cert => {
    const v = cert.trim()
    if (v && !certs.includes(v)) { setCerts(prev => [...prev, v]); setCertInput('') }
  }
  const removeCert = c => setCerts(prev => prev.filter(x => x !== c))

  /* ── Submit profile ──────────────────── */
  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('loading')

    const selectedSkills = Object.entries(skills).filter(([, v]) => v).map(([k]) => k)
    const key = import.meta.env.VITE_WEB3FORMS_RECRUIT_KEY

    const payload = {
      'Full Name':             fields.fullName,
      'Email':                 fields.email,
      'Mobile':                fields.mobile,
      'Country':               fields.country,
      'City':                  fields.city,
      'LinkedIn':              fields.linkedin,
      'Current Position':      fields.position,
      'Current Employer':      fields.employer,
      'Years of Experience':   fields.yearsExp,
      'Industry':              fields.industry,
      'Availability':          fields.availability,
      'Engagement Preference': engagement.join(', '),
      'Skills':                selectedSkills.join(', '),
      'Certifications':        certs.join(', '),
      'CV':                    cvFile?.name    || 'Not attached',
      'Certifications Doc':    certsFile?.name || 'Not attached',
    }

    const resetForm = () => {
      e.target.reset()
      setCerts([]); setSkills({}); setEngagement([])
      setCvFile(null); setCertsFile(null)
      setFields({ fullName:'', email:'', mobile:'', country:'', city:'', linkedin:'',
                  position:'', employer:'', yearsExp:'', industry:'', availability:'', otherInfo:'' })
    }

    const openMailto = () => {
      const body = Object.entries(payload).map(([k, v]) => `${k}: ${v || '–'}`).join('\n')
      window.open(`mailto:recruitment@optimumscs.com?subject=${encodeURIComponent('Talent Network Registration – OptimumSCS')}&body=${encodeURIComponent(body)}`, '_blank')
    }

    if (!key || key === 'REPLACE_ME') {
      openMailto()
      setStatus('success')
      resetForm()
      return
    }

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: key, subject: `Talent Network Registration – ${fields.fullName} – OptimumSCS`, ...payload }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        resetForm()
      } else {
        openMailto()
        setStatus('success')
        resetForm()
      }
    } catch {
      openMailto()
      setStatus('success')
      resetForm()
    }
  }

  /* ── Chevron SVG ──────────────────────── */
  const Chevron = () => (
    <svg className="cfld-sel-chev" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 6 8 10 12 6" />
    </svg>
  )

  /* ══════════════════════════════════════ */
  return (
    <div className="careers-page">

      {/* ── HERO ──────────────────────────────── */}
      <section className="careers-hero section first-section">
        <div className="container">
          <div className="careers-hero-grid">
            <div className="careers-hero-copy">
              <h1>
                Join the <span className="grad">OptimumSCS</span><br />Talent Network
              </h1>
              <p>
                Register your skills and experience to be considered for future consulting,
                implementation and transformation projects across Africa.
              </p>
              <div className="careers-hero-actions">
                <a href="#registration-form" className="btn btn-primary">
                  <User size={18} />
                  <span>Submit Your Profile</span>
                </a>
                <a href="#how-it-works" className="btn btn-secondary">
                  <ArrowRight size={18} />
                  <span>How It Works</span>
                </a>
              </div>
            </div>

            <div className="careers-hero-visual">
              <div className="careers-net-grid" />

              {/* SVG connecting lines */}
              <svg className="careers-net-svg" viewBox="0 0 400 460" preserveAspectRatio="none">
                <g stroke="rgba(88,229,255,0.18)" strokeWidth="1.2" fill="none">
                  <line x1="112" y1="83"  x2="240" y2="147" />
                  <line x1="240" y1="147" x2="136" y2="267" />
                  <line x1="136" y1="267" x2="256" y2="322" />
                  <line x1="256" y1="322" x2="312" y2="202" />
                  <line x1="312" y1="202" x2="288" y2="101" />
                  <line x1="240" y1="147" x2="312" y2="202" />
                  <line x1="80"  y1="230" x2="136" y2="267" />
                  <line x1="184" y1="368" x2="256" y2="322" />
                </g>
              </svg>

              {/* Nodes */}
              {['cn1','cn2','cn3','cn4','cn5','cn6','cn7','cn8'].map(c => (
                <span key={c} className={`careers-net-node ${c}`} />
              ))}

              {/* Floating badge */}
              <div className="careers-badge">
                <span className="careers-badge-dot" />
                Network Active
              </div>

              {/* Stat pills */}
              <div className="careers-hero-stat-bar">
                <div className="careers-stat-pill">
                  <strong>4</strong> Service Areas
                </div>
                <div className="careers-stat-pill">
                  <strong>Africa-wide</strong> Projects
                </div>
                <div className="careers-stat-pill">
                  <Globe size={13} />
                  <strong>Open</strong> to All Levels
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY JOIN ──────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="careers-why-grid">
            <div className="glass-card careers-why-copy">
              <h2>Build Your Future<br /><span className="accent">with OptimumSCS</span></h2>
              <p>
                OptimumSCS regularly supports clients with business transformation initiatives
                across transportation, procurement, enterprise systems, and analytics. As new
                projects arise, we engage qualified professionals from our talent network based
                on project requirements and specialist skills.
              </p>
              <div className="careers-benefits">
                {BENEFITS.map(b => (
                  <div key={b} className="careers-benefit-row">
                    <span className="careers-check">✓</span>
                    {b}
                  </div>
                ))}
              </div>
            </div>

            <div className="careers-why-right">
              {MINI_CARDS.map(({ icon: Icon, color, title, desc }) => (
                <div key={title} className="glass-card careers-mini-card">
                  <div className={`careers-mini-icon ${color}`}><Icon size={20} /></div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPERTISE AREAS ───────────────────── */}
      <section className="section">
        <div className="container">
          <div className="section-heading center">
            <h2>Areas of Expertise</h2>
            <p>Register your experience in one or more of our core service areas</p>
          </div>
          <div className="careers-expertise-grid">
            {EXPERTISE.map(({ icon: Icon, iconCls, tagCls, label, desc }) => (
              <div key={label} className={`glass-card careers-exp-card`}>
                <div className={`careers-exp-icon ${iconCls}`}>
                  <Icon size={26} />
                </div>
                <h3>{label}</h3>
                <p>{desc}</p>
                <span className={`exp-tag ${tagCls}`}>
                  <CheckCircle2 size={12} /> Open to Registrations
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CURRENT OPPORTUNITIES ─────────────────── */}
      <section className="section">
        <div className="container">
          <div className="careers-opps-badge">
            <span className="careers-opps-badge-dot" />
            Now Hiring
          </div>

          <div className="glass-card careers-opp-card">
            {/* Header */}
            <div className="careers-opp-header">
              <div className="careers-opp-title-block">
                <p className="careers-opp-eyebrow">Active Project Opportunity</p>
                <h2 className="careers-opp-title">
                  Data &amp; Analytics Experts —{' '}
                  <span>Microsoft Fabric Project</span>
                </h2>
                <div className="careers-opp-meta">
                  <span className="careers-opp-meta-chip">
                    <MapPin size={14} /> Johannesburg, South Africa
                  </span>
                  <span className="careers-opp-meta-chip">
                    <Clock size={14} /> Start: ASAP
                  </span>
                  <span className="careers-opp-meta-chip">
                    <Database size={14} /> Microsoft Fabric
                  </span>
                </div>
              </div>
              <div className="careers-opp-now-badge">
                🚀 Actively Recruiting
                <small>Multiple Roles Open</small>
              </div>
            </div>

            {/* Body — Roles + Skills */}
            <div className="careers-opp-body">
              <div>
                <p className="careers-opp-col-label">Open Roles</p>
                <div className="careers-roles-list">
                  {OPEN_ROLES.map(role => (
                    <div key={role} className="careers-role-row">
                      <span className="careers-role-dot" />
                      {role}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="careers-opp-col-label">Key Skills Required</p>
                <div className="careers-skills-list">
                  {KEY_SKILLS.map(skill => (
                    <div key={skill} className="careers-skill-row">
                      <span className="careers-skill-check">✓</span>
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="careers-opp-footer">
              <p className="careers-opp-footer-note">
                <Info size={15} />
                Interested or know someone? Send your CV directly to{' '}
                <strong>recruitment@optimumscs.com</strong>
              </p>
              <div className="careers-opp-actions">
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ minWidth: 0, fontSize: 16, minHeight: 50 }}
                  onClick={() => { setApplyOpen(true); setApplyStatus('idle') }}
                >
                  <Mail size={16} />
                  <span>Apply Now</span>
                </button>
                <a href="#registration-form" className="btn btn-ghost"
                  style={{ minWidth: 0, fontSize: 16, minHeight: 50 }}>
                  <User size={16} />
                  <span>Join Talent Network</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────── */}
      <section id="how-it-works" className="section">
        <div className="container">
          <div className="section-heading center">
            <h2>How It Works</h2>
            <p>From registration to project engagement — a simple four-step process</p>
          </div>
          <div className="careers-steps-wrap">
            <div className="careers-steps-connector" />
            <div className="careers-steps-grid">
              {HOW_IT_WORKS.map(({ num, title, desc }) => (
                <div key={num} className="glass-card careers-step-card">
                  <div className="careers-step-num">{num}</div>
                  <h3>{title}</h3>
                  <p>{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── REGISTRATION FORM ─────────────────── */}
      <section id="registration-form" className="section">
        <div className="container">
          <div className="section-heading center">
            <h2>Register Your Professional Profile</h2>
            <p>Complete all sections to ensure your profile can be accurately matched to project requirements</p>
          </div>

          <div className="careers-form-shell">
            {/* Sidebar nav */}
            <div className="glass-card careers-form-sidebar">
              <h3>Form Sections</h3>
              <nav className="careers-form-nav">
                {FORM_SECTIONS.map(({ id, label, Icon }) => (
                  <button
                    key={id}
                    type="button"
                    className={`cfn-item ${activeSection === id ? 'active' : ''}`}
                    onClick={() => {
                      setActiveSection(id)
                      document.getElementById(`section-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                    }}
                  >
                    <span className="cfn-dot" />
                    <Icon size={14} />
                    {label}
                  </button>
                ))}
              </nav>

              <div style={{ marginTop: 28, padding: '16px', borderRadius: 12, background: 'rgba(122,247,216,.06)', border: '1px solid rgba(122,247,216,.15)' }}>
                <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: 'var(--text-soft)' }}>
                  <strong style={{ color: '#7af7d8', display: 'block', marginBottom: 6 }}>Privacy Note</strong>
                  Your information is stored securely and only used for talent matching purposes. It will never be shared with third parties.
                </p>
              </div>
            </div>

            {/* Main form */}
            <form id="talent-form" className="glass-card careers-form-main" onSubmit={handleSubmit}>

              {status === 'success' && (
                <div className="form-success-msg" style={{ marginBottom: 24, fontSize: 16, lineHeight: 1.6 }}>
                  ✓ Profile submitted successfully! Your profile has been sent to the OptimumSCS Talent Network.
                  We will review your details and be in touch when a matching project opportunity arises.
                  <br /><strong style={{ display: 'block', marginTop: 8 }}>Thank you for registering.</strong>
                </div>
              )}
              {status === 'error' && (
                <div className="form-error-msg" style={{ marginBottom: 24 }}>
                  Submission failed. Please email your CV and profile directly to{' '}
                  <a href="mailto:recruitment@optimumscs.com" style={{ color: '#f87171', textDecoration: 'underline' }}>
                    recruitment@optimumscs.com
                  </a>
                </div>
              )}

              {/* ── PERSONAL INFORMATION ─── */}
              <div id="section-personal" className="careers-form-section" onClick={() => setActiveSection('personal')}>
                <div className="cfs-title">
                  <span className="cfs-icon"><User size={18} /></span>
                  <h3>Personal Information</h3>
                </div>
                <div className="cfld-grid">
                  <div className="cfld">
                    <span>Full Name <span className="req">*</span></span>
                    <input type="text" placeholder="Your full name" required
                      value={fields.fullName} onChange={e => setField('fullName', e.target.value)} />
                  </div>
                  <div className="cfld">
                    <span>Email Address <span className="req">*</span></span>
                    <input type="email" placeholder="name@email.com" required
                      value={fields.email} onChange={e => setField('email', e.target.value)} />
                  </div>
                  <div className="cfld">
                    <span>Mobile Number <span className="req">*</span></span>
                    <input type="tel" placeholder="+27 or country code"
                      value={fields.mobile} onChange={e => setField('mobile', e.target.value)} />
                  </div>
                  <div className="cfld">
                    <span>Country <span className="req">*</span></span>
                    <div className="cfld-sel-wrap">
                      <select className="cfld-sel" required
                        value={fields.country} onChange={e => setField('country', e.target.value)}>
                        <option value="" disabled>Select country…</option>
                        {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <Chevron />
                    </div>
                  </div>
                  <div className="cfld">
                    <span>City / Province</span>
                    <input type="text" placeholder="e.g. Johannesburg, Gauteng"
                      value={fields.city} onChange={e => setField('city', e.target.value)} />
                  </div>
                  <div className="cfld">
                    <span>LinkedIn Profile</span>
                    <input type="url" placeholder="linkedin.com/in/yourprofile"
                      value={fields.linkedin} onChange={e => setField('linkedin', e.target.value)} />
                  </div>
                </div>
              </div>

              {/* ── PROFESSIONAL EXPERIENCE ─ */}
              <div id="section-experience" className="careers-form-section" onClick={() => setActiveSection('experience')}>
                <div className="cfs-title">
                  <span className="cfs-icon g"><Briefcase size={18} /></span>
                  <h3>Professional Experience</h3>
                </div>
                <div className="cfld-grid">
                  <div className="cfld">
                    <span>Current / Most Recent Position</span>
                    <input type="text" placeholder="e.g. Supply Chain Consultant"
                      value={fields.position} onChange={e => setField('position', e.target.value)} />
                  </div>
                  <div className="cfld">
                    <span>Current / Most Recent Employer</span>
                    <input type="text" placeholder="Company name"
                      value={fields.employer} onChange={e => setField('employer', e.target.value)} />
                  </div>
                  <div className="cfld">
                    <span>Years of Experience <span className="req">*</span></span>
                    <div className="cfld-sel-wrap">
                      <select className="cfld-sel" required
                        value={fields.yearsExp} onChange={e => setField('yearsExp', e.target.value)}>
                        <option value="" disabled>Select range…</option>
                        {['0–2 years','3–5 years','6–10 years','11–15 years','15+ years'].map(o => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                      <Chevron />
                    </div>
                  </div>
                  <div className="cfld">
                    <span>Industry Background</span>
                    <div className="cfld-sel-wrap">
                      <select className="cfld-sel"
                        value={fields.industry} onChange={e => setField('industry', e.target.value)}>
                        <option value="" disabled>Select industry…</option>
                        {['FMCG / Beverage','Logistics & Transport','Supply Chain Technology','Healthcare & Medical','Retail','Mining & Resources','Government','Financial Services','Other'].map(o => (
                          <option key={o} value={o}>{o}</option>
                        ))}
                      </select>
                      <Chevron />
                    </div>
                  </div>
                </div>
              </div>

              {/* ── AVAILABILITY ────────────── */}
              <div id="section-availability" className="careers-form-section" onClick={() => setActiveSection('availability')}>
                <div className="cfs-title">
                  <span className="cfs-icon p"><Calendar size={18} /></span>
                  <h3>Availability &amp; Engagement Preference</h3>
                </div>
                <div className="cfld-grid">
                  <div className="cfld">
                    <span>Availability <span className="req">*</span></span>
                    <div className="cfld-sel-wrap">
                      <select className="cfld-sel" required
                        value={fields.availability} onChange={e => setField('availability', e.target.value)}>
                        <option value="" disabled>Select availability…</option>
                        {AVAILABILITY_OPTIONS.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                      <Chevron />
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: 20 }}>
                  <span className="cfld" style={{ display: 'block', marginBottom: 12 }}>
                    <span>Engagement Preference <small style={{ color: 'var(--muted)', fontSize: 12, marginLeft: 8 }}>(select all that apply)</small></span>
                  </span>
                  <div className="eng-grid">
                    {ENGAGEMENT_OPTIONS.map(({ label, Icon }) => (
                      <label key={label} className={`eng-opt ${engagement.includes(label) ? 'sel' : ''}`}>
                        <input type="checkbox" checked={engagement.includes(label)}
                          onChange={() => toggleEngagement(label)} />
                        <span className="eng-icon"><Icon size={16} /></span>
                        {label}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── SKILLS ──────────────────── */}
              <div id="section-skills" className="careers-form-section" onClick={() => setActiveSection('skills')}>
                <div className="cfs-title">
                  <span className="cfs-icon o"><Zap size={18} /></span>
                  <h3>Skills</h3>
                </div>
                <p style={{ margin: '0 0 20px', fontSize: 14, color: 'var(--text-soft)' }}>
                  Select all skills that apply to your experience. You may select across multiple service areas.
                </p>
                <div className="skills-group">
                  {Object.entries(SKILLS).map(([key, { label, color, items }]) => (
                    <div key={key} className="skills-cat">
                      <span className="skills-cat-label">{label}</span>
                      <div className="skills-chips">
                        {items.map(skill => (
                          <label key={skill} className={`skill-chip ${skills[skill] ? color : ''}`}>
                            <input type="checkbox" checked={!!skills[skill]}
                              onChange={() => toggleSkill(skill)} />
                            {skills[skill] && <CheckCircle2 size={12} />}
                            {skill}
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── CERTIFICATIONS ──────────── */}
              <div id="section-certs" className="careers-form-section" onClick={() => setActiveSection('certs')}>
                <div className="cfs-title">
                  <span className="cfs-icon y"><Award size={18} /></span>
                  <h3>Certifications</h3>
                </div>
                <p style={{ margin: '0 0 16px', fontSize: 14, color: 'var(--text-soft)' }}>
                  Add your professional certifications. Click suggestions below or type a custom entry.
                </p>

                <div className="cert-tags">
                  {certs.map(c => (
                    <span key={c} className="cert-tag">
                      <Award size={12} /> {c}
                      <button type="button" onClick={() => removeCert(c)}>×</button>
                    </span>
                  ))}
                </div>

                <div className="cert-input-row">
                  <div className="cfld" style={{ flex: 1 }}>
                    <input type="text" placeholder="Type a certification and press Add…"
                      value={certInput} onChange={e => setCertInput(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addCert(certInput) } }} />
                  </div>
                  <button type="button" className="cert-add-btn" onClick={() => addCert(certInput)}>
                    + Add
                  </button>
                </div>

                <div className="cert-suggestions">
                  {CERT_SUGGESTIONS.filter(s => !certs.includes(s)).map(s => (
                    <button type="button" key={s} className="cert-sugg" onClick={() => addCert(s)}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* ── DOCUMENTS ───────────────── */}
              <div id="section-docs" className="careers-form-section" onClick={() => setActiveSection('docs')}>
                <div className="cfs-title">
                  <span className="cfs-icon"><Upload size={18} /></span>
                  <h3>Document Uploads</h3>
                </div>
                <p style={{ margin: '0 0 18px', fontSize: 14, color: 'var(--text-soft)' }}>
                  Upload your CV and any supporting certification documents. Accepted formats: PDF, DOC, DOCX (max 10 MB each).
                </p>
                <div className="upload-grid">
                  <label className={`upload-zone ${cvFile ? 'has-file' : ''}`}>
                    <input type="file" accept=".pdf,.doc,.docx"
                      onChange={e => setCvFile(e.target.files?.[0] || null)} />
                    <span className="upload-icon"><FileText size={22} /></span>
                    <span className="upload-title">{cvFile ? 'CV Uploaded' : 'Upload CV'}</span>
                    {cvFile
                      ? <span className="upload-fname">{cvFile.name}</span>
                      : <span className="upload-sub">PDF, DOC, DOCX — max 10 MB</span>
                    }
                  </label>
                  <label className={`upload-zone ${certsFile ? 'has-file' : ''}`}>
                    <input type="file" accept=".pdf,.doc,.docx,.jpg,.png"
                      onChange={e => setCertsFile(e.target.files?.[0] || null)} />
                    <span className="upload-icon"><Award size={22} /></span>
                    <span className="upload-title">{certsFile ? 'Document Uploaded' : 'Upload Certifications'}</span>
                    {certsFile
                      ? <span className="upload-fname">{certsFile.name}</span>
                      : <span className="upload-sub">PDF, DOC, JPG, PNG — max 10 MB</span>
                    }
                  </label>
                </div>
              </div>

              {/* ── SUBMIT ──────────────────── */}
              <div className="careers-form-footer">
                <div className="careers-form-privacy">
                  <Shield size={16} />
                  Your information is secure and used only for talent matching within OptimumSCS.
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={status === 'loading'}
                  style={{ minWidth: 220 }}
                >
                  <User size={18} />
                  <span>{status === 'loading' ? 'Submitting…' : 'Submit My Profile'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ── IMPORTANT NOTICE ──────────────────── */}
      <section className="section section-tight">
        <div className="container">
          <div className="glass-card careers-notice">
            <span className="notice-icon"><Info size={22} /></span>
            <div>
              <h3>Important Notice</h3>
              <p>
                Registration in the OptimumSCS Talent Network does not constitute an offer of employment
                or a guarantee of engagement. Profiles are maintained within our network database and may
                be reviewed when project opportunities arise that match candidate qualifications and
                experience. OptimumSCS will contact relevant professionals when suitable opportunities
                become available.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="glass-card careers-cta-card">
            <h2>
              Become Part of the<br />
              <span className="grad">OptimumSCS Talent Network</span>
            </h2>
            <p>
              Register today and position yourself for future opportunities in TMS Implementation,
              Procurement Services, ERP Transformation, and Data Analytics &amp; Reporting projects
              across Africa.
            </p>
            <div className="careers-cta-actions">
              <a href="#registration-form" className="btn btn-primary">
                <User size={18} />
                <span>Submit Your Profile</span>
              </a>
              <Link to="/contact" className="btn btn-ghost">
                <ArrowRight size={18} />
                <span>Contact Us</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── QUICK APPLY MODAL ─────────────────────── */}
      {applyOpen && (
        <div className="qa-overlay" onClick={e => { if (e.target === e.currentTarget) { setApplyOpen(false); setApplyStatus('idle') } }}>
          <div className="glass-card qa-modal">
            <button className="qa-close" type="button" onClick={() => { setApplyOpen(false); setApplyStatus('idle') }}>×</button>

            <p className="qa-eyebrow">Microsoft Fabric Project</p>
            <h2>Apply Now</h2>
            <p>Complete the form below and your application will be sent directly to our recruitment team.</p>

            {applyStatus === 'success' && (
              <div className="form-success-msg" style={{ marginBottom: 20 }}>
                ✓ Application sent! We will review your profile and be in touch shortly.
              </div>
            )}
            {applyStatus === 'error' && (
              <div className="form-error-msg" style={{ marginBottom: 20 }}>
                Submission failed — please email us directly at recruitment@optimumscs.com
              </div>
            )}

            {applyStatus !== 'success' && (
              <form onSubmit={handleApplySubmit}>
                <div className="qa-grid">
                  <div className="qa-field">
                    <span>Full Name <span className="req">*</span></span>
                    <input type="text" placeholder="Your full name" required
                      value={applyFields.name} onChange={e => setApply('name', e.target.value)} />
                  </div>
                  <div className="qa-field">
                    <span>Email Address <span className="req">*</span></span>
                    <input type="email" placeholder="name@email.com" required
                      value={applyFields.email} onChange={e => setApply('email', e.target.value)} />
                  </div>
                  <div className="qa-field">
                    <span>Phone Number</span>
                    <input type="tel" placeholder="+27 or country code"
                      value={applyFields.phone} onChange={e => setApply('phone', e.target.value)} />
                  </div>
                  <div className="qa-field">
                    <span>Role Applied For <span className="req">*</span></span>
                    <div className="qa-sel-wrap">
                      <select className="qa-sel" required
                        value={applyFields.role} onChange={e => setApply('role', e.target.value)}>
                        <option value="" disabled>Select a role…</option>
                        {OPEN_ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                      </select>
                      <svg className="qa-chev" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="4 6 8 10 12 6" />
                      </svg>
                    </div>
                  </div>
                  <div className="qa-field full">
                    <span>Cover Note / Message</span>
                    <textarea placeholder="Briefly describe your experience and why you are a great fit…"
                      value={applyFields.message} onChange={e => setApply('message', e.target.value)} />
                  </div>
                </div>

                {/* Document uploads */}
                <p style={{ margin: '4px 0 12px', fontSize: 13, fontWeight: 700, color: '#b0c4de', letterSpacing: '.2px' }}>
                  Attach Documents <span style={{ color: 'var(--muted)', fontWeight: 400 }}>(PDF, DOC, DOCX — max 10 MB each)</span>
                </p>
                <div className="upload-grid" style={{ marginBottom: 20 }}>
                  <label className={`upload-zone ${applyCV ? 'has-file' : ''}`}>
                    <input type="file" accept=".pdf,.doc,.docx"
                      onChange={e => setApplyCV(e.target.files?.[0] || null)} />
                    <span className="upload-icon"><FileText size={20} /></span>
                    <span className="upload-title">{applyCV ? 'CV Attached' : 'Upload CV / Resume'}</span>
                    {applyCV
                      ? <span className="upload-fname">{applyCV.name}</span>
                      : <span className="upload-sub">PDF, DOC, DOCX</span>}
                  </label>

                  <label className={`upload-zone ${applyCerts ? 'has-file' : ''}`}>
                    <input type="file" accept=".pdf,.doc,.docx,.jpg,.png"
                      onChange={e => setApplyCerts(e.target.files?.[0] || null)} />
                    <span className="upload-icon"><Award size={20} /></span>
                    <span className="upload-title">{applyCerts ? 'Certifications Attached' : 'Upload Certifications'}</span>
                    {applyCerts
                      ? <span className="upload-fname">{applyCerts.name}</span>
                      : <span className="upload-sub">PDF, DOC, JPG, PNG</span>}
                  </label>

                  <label className={`upload-zone ${applyOther ? 'has-file' : ''}`} style={{ gridColumn: '1 / -1' }}>
                    <input type="file" accept=".pdf,.doc,.docx,.jpg,.png,.zip"
                      onChange={e => setApplyOther(e.target.files?.[0] || null)} />
                    <span className="upload-icon"><Upload size={20} /></span>
                    <span className="upload-title">{applyOther ? 'Document Attached' : 'Other Relevant Documents'}</span>
                    {applyOther
                      ? <span className="upload-fname">{applyOther.name}</span>
                      : <span className="upload-sub">References, portfolio, ID — PDF, DOC, JPG, ZIP</span>}
                  </label>
                </div>

                <div className="qa-footer">
                  <span className="qa-note">
                    <Shield size={14} />
                    Sent to recruitment@optimumscs.com
                  </span>
                  <button type="submit" className="btn btn-primary"
                    disabled={applyStatus === 'loading'}
                    style={{ minWidth: 0, fontSize: 16, minHeight: 50 }}>
                    <Mail size={16} />
                    <span>{applyStatus === 'loading' ? 'Sending…' : 'Send Application'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  )
}
