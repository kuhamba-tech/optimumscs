import { useMemo, useState } from 'react'
import {
  Bot,
  BriefcaseBusiness,
  ContactRound,
  ExternalLink,
  Globe2,
  Mail,
  MapPin,
  Phone,
  Share2,
  Sparkles,
  Users,
} from 'lucide-react'
import logo from '../assets/optimum-logo.png'
import mosesImage from '../assets/about-moses-quote.jpg'
import './DigitalBusinessCardPage.css'

const CARD = {
  name: 'Moses Dowart',
  title: 'Principal Consultant',
  company: 'Optimum Supply Chain Solutions',
  phoneDisplay: '+27 73 937 0249',
  phoneHref: 'tel:+27739370249',
  whatsapp: 'https://wa.me/27739370249?text=Hello%20Moses%2C%20I%20would%20like%20to%20discuss%20a%20supply%20chain%20consulting%20opportunity.',
  email: 'info@optimumscs.com',
  emailHref: 'mailto:info@optimumscs.com?subject=Supply%20Chain%20Consultation%20Request',
  website: 'https://www.optimumscs.com',
  location: 'South Africa',
  vcard: '/moses-dowart.vcf',
}

function ActionRow({ icon: Icon, label, detail, href }) {
  return (
    <a className="dbc-action-row" href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
      <span className="dbc-action-icon"><Icon size={21} /></span>
      <span className="dbc-action-copy">
        <strong>{label}</strong>
        <small>{detail}</small>
      </span>
      <ExternalLink size={17} className="dbc-action-arrow" />
    </a>
  )
}

export default function DigitalBusinessCardPage() {
  const [shared, setShared] = useState(false)
  const pageUrl = useMemo(() => {
    if (typeof window === 'undefined') return CARD.website
    return window.location.href
  }, [])

  const shareCard = async () => {
    const shareData = {
      title: `${CARD.name} - ${CARD.company}`,
      text: `${CARD.name}, ${CARD.title} at ${CARD.company}`,
      url: pageUrl,
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(pageUrl)
        setShared(true)
        window.setTimeout(() => setShared(false), 1800)
      }
    } catch {
      setShared(false)
    }
  }

  return (
    <main className="digital-card-page">
      <section className="digital-card-shell" aria-label="Digital business card">
        <div className="digital-card-glow" />
        <div className="digital-card-top">
          <img src={logo} alt="Optimum Supply Chain Solutions" className="dbc-logo" />
          <div className="dbc-avatar-wrap">
            <img src={mosesImage} alt="Moses Dowart" className="dbc-avatar" />
          </div>
          <h1>{CARD.name}</h1>
          <p className="dbc-title">{CARD.title}</p>
          <p className="dbc-tagline">Transforming Supply Chains with Data, Technology &amp; Intelligence</p>
        </div>

        <div className="dbc-actions">
          <ActionRow icon={Phone} label={CARD.phoneDisplay} detail="Call or WhatsApp" href={CARD.phoneHref} />
          <ActionRow icon={Mail} label={CARD.email} detail="Email" href={CARD.emailHref} />
          <ActionRow icon={Globe2} label="www.optimumscs.com" detail="Website" href={CARD.website} />
          <ActionRow icon={MapPin} label={CARD.location} detail="Serving Clients Across Africa" href={`${CARD.website}/contact`} />
        </div>

        <div className="dbc-primary-actions">
          <a className="dbc-button dbc-save" href={CARD.vcard} download="moses-dowart-optimumscs.vcf">
            <ContactRound size={22} />
            <span>Save Contact</span>
          </a>
          <a className="dbc-button dbc-whatsapp" href={CARD.whatsapp} target="_blank" rel="noreferrer">
            <Phone size={21} />
            <span>WhatsApp Consultant</span>
          </a>
        </div>

        <div className="dbc-secondary-actions">
          <a href={CARD.website} target="_blank" rel="noreferrer">
            <Globe2 size={20} />
            <span>Visit Website</span>
          </a>
          <a href={`${CARD.website}/book-consultation`}>
            <Bot size={20} />
            <span>AskOptimumSCS</span>
            <em>AI</em>
          </a>
        </div>

        <button className="dbc-share" type="button" onClick={shareCard}>
          <Share2 size={20} />
          <span>{shared ? 'Link Copied' : 'Share My Card'}</span>
        </button>

        <div className="dbc-bottom-nav" aria-hidden="true">
          <span><Users size={20} />About</span>
          <span><BriefcaseBusiness size={20} />Services</span>
          <span><Sparkles size={20} />Connect</span>
        </div>
      </section>
    </main>
  )
}
