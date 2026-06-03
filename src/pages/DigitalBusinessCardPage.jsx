import { useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Bot,
  BriefcaseBusiness,
  ContactRound,
  ExternalLink,
  Globe2,
  Mail,
  MapPin,
  Phone,
  QrCode,
  Share2,
  Users,
} from 'lucide-react'
import logo from '../assets/homepage-optimum-logo.png'
import { CARD_SERVICES, getDigitalCardProfile } from '../data/digitalBusinessCards'
import './DigitalBusinessCardPage.css'

const SITE_URL = 'https://optimumscs.com'
const TAGLINE = 'Transforming Supply Chains with Data, Technology & Intelligence'

function normalizePhone(phone) {
  return String(phone || '').replace(/[^\d+]/g, '')
}

function phoneDigits(phone) {
  return normalizePhone(phone).replace(/^\+/, '')
}

function profileInitials(name) {
  return String(name || 'OS')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

function vcardEscape(value) {
  return String(value || '')
    .replace(/\\/g, '\\\\')
    .replace(/\n/g, '\\n')
    .replace(/,/g, '\\,')
    .replace(/;/g, '\\;')
}

function buildVCard(profile) {
  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${vcardEscape(profile.full_name)}`,
    'ORG:Optimum Supply Chain Solutions',
    `TITLE:${vcardEscape(profile.position)}`,
    `TEL:${normalizePhone(profile.phone)}`,
    `EMAIL:${vcardEscape(profile.email)}`,
    `URL:${SITE_URL}`,
    profile.linkedin ? `X-SOCIALPROFILE;TYPE=LinkedIn:${vcardEscape(profile.linkedin)}` : '',
    'END:VCARD',
    '',
  ].filter(Boolean).join('\r\n')
}

function downloadVCard(profile) {
  const blob = new Blob([buildVCard(profile)], { type: 'text/vcard;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${profile.id}-optimumscs.vcf`
  document.body.appendChild(link)
  link.click()
  link.remove()
  window.setTimeout(() => URL.revokeObjectURL(url), 500)
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

function CardAvatar({ profile }) {
  if (profile.profile_photo) {
    return <img src={profile.profile_photo} alt={profile.full_name} className="dbc-avatar" />
  }

  return (
    <div className="dbc-avatar dbc-avatar-fallback" aria-label={profile.full_name}>
      {profileInitials(profile.full_name)}
    </div>
  )
}

function CardNotFound() {
  return (
    <main className="digital-card-page">
      <section className="digital-card-shell dbc-not-found" aria-label="Card not found">
        <img src={logo} alt="Optimum Supply Chain Solutions" className="dbc-logo" />
        <h1>Card not found</h1>
        <p>This OptimumSCS digital business card is not available.</p>
        <a className="dbc-button dbc-save" href={SITE_URL}>
          <Globe2 size={20} />
          <span>Visit Website</span>
        </a>
      </section>
    </main>
  )
}

export default function DigitalBusinessCardPage({ profileId }) {
  const params = useParams()
  const resolvedId = profileId || params.profileId || 'moses-dowart'
  const profile = getDigitalCardProfile(resolvedId)
  const [shared, setShared] = useState(false)
  const [activeTab, setActiveTab] = useState('about')

  const cardUrl = `${SITE_URL}/card/${resolvedId}`
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=12&data=${encodeURIComponent(cardUrl)}`

  const links = useMemo(() => {
    if (!profile) return null
    return {
      phone: `tel:${normalizePhone(profile.phone)}`,
      whatsapp: `https://wa.me/${phoneDigits(profile.whatsapp || profile.phone)}`,
      email: `mailto:${profile.email}`,
      website: SITE_URL,
      location: 'https://www.google.com/maps/search/?api=1&query=South%20Africa',
      ask: `${SITE_URL}/?ask=1`,
    }
  }, [profile])

  if (!profile || !links) {
    return <CardNotFound />
  }

  const displayPosition = profile.position || 'OptimumSCS Team'

  const shareCard = async () => {
    const shareData = {
      title: `${profile.full_name} - OptimumSCS`,
      text: `Digital business card for ${profile.full_name}`,
      url: cardUrl,
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(cardUrl)
        setShared(true)
        window.setTimeout(() => setShared(false), 1800)
      }
    } catch {
      setShared(false)
    }
  }

  return (
    <main className="digital-card-page">
      <section className="digital-card-shell" aria-label={`${profile.full_name} digital business card`}>
        <div className="digital-card-glow" />
        <div className="digital-card-top">
          <img src={logo} alt="Optimum Supply Chain Solutions" className="dbc-logo" />
          <div className="dbc-avatar-wrap">
            <CardAvatar profile={profile} />
          </div>
          <h1>{profile.full_name}</h1>
          <p className="dbc-title">{displayPosition}</p>
          <p className="dbc-tagline">{TAGLINE}</p>
        </div>

        <div className="dbc-tab-panel">
          {activeTab === 'about' && (
            <>
              <div className="dbc-actions">
                <ActionRow icon={Phone} label={profile.phone} detail="Call" href={links.phone} />
                <ActionRow icon={Phone} label="WhatsApp" detail="Message Consultant" href={links.whatsapp} />
                <ActionRow icon={Mail} label={profile.email} detail="Email" href={links.email} />
                <ActionRow icon={Globe2} label="optimumscs.com" detail="Website" href={links.website} />
                {profile.linkedin && <ActionRow icon={Globe2} label="LinkedIn" detail={profile.full_name} href={profile.linkedin} />}
                <ActionRow icon={MapPin} label="South Africa" detail="Serving Clients Across Africa" href={links.location} />
              </div>

              <div className="dbc-primary-actions">
                <button className="dbc-button dbc-save" type="button" onClick={() => downloadVCard(profile)}>
                  <ContactRound size={22} />
                  <span>Save Contact</span>
                </button>
                <a className="dbc-button dbc-whatsapp" href={links.whatsapp} target="_blank" rel="noreferrer">
                  <Phone size={21} />
                  <span>WhatsApp Consultant</span>
                </a>
              </div>
            </>
          )}

          {activeTab === 'services' && (
            <div className="dbc-services">
              {CARD_SERVICES.map((service) => (
                <a key={service} href={`${SITE_URL}/solutions`} className="dbc-service-row">
                  <BriefcaseBusiness size={20} />
                  <span>{service}</span>
                  <ExternalLink size={16} />
                </a>
              ))}
            </div>
          )}

          {activeTab === 'connect' && (
            <div className="dbc-connect">
              <div className="dbc-qr-card">
                <img src={qrUrl} alt={`${profile.full_name} digital card QR code`} />
                <span>{profile.full_name}</span>
              </div>
              <button className="dbc-button dbc-save" type="button" onClick={shareCard}>
                <Share2 size={20} />
                <span>{shared ? 'Link Copied' : 'Share My Card'}</span>
              </button>
              <a className="dbc-button dbc-outline" href={links.website} target="_blank" rel="noreferrer">
                <Globe2 size={20} />
                <span>Visit Website</span>
              </a>
              <a className="dbc-button dbc-outline" href={links.email}>
                <Mail size={20} />
                <span>Email</span>
              </a>
            </div>
          )}
        </div>

        <div className="dbc-secondary-actions">
          <a href={links.website} target="_blank" rel="noreferrer">
            <Globe2 size={20} />
            <span>Visit Website</span>
          </a>
          <a href={links.ask}>
            <Bot size={20} />
            <span>AskOptimumSCS</span>
            <em>AI</em>
          </a>
        </div>

        <button className="dbc-share" type="button" onClick={shareCard}>
          <Share2 size={20} />
          <span>{shared ? 'Link Copied' : 'Share My Card'}</span>
        </button>

        <div className="dbc-bottom-nav" role="tablist" aria-label="Digital card sections">
          <button type="button" className={activeTab === 'about' ? 'is-active' : ''} onClick={() => setActiveTab('about')}>
            <Users size={20} />About
          </button>
          <button type="button" className={activeTab === 'services' ? 'is-active' : ''} onClick={() => setActiveTab('services')}>
            <BriefcaseBusiness size={20} />Services
          </button>
          <button type="button" className={activeTab === 'connect' ? 'is-active' : ''} onClick={() => setActiveTab('connect')}>
            <QrCode size={20} />Connect
          </button>
        </div>
      </section>
    </main>
  )
}
