import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './AskOptimum.css'

const WHATSAPP_URL =
  'https://wa.me/27739370249?text=Hello%20OptimumSCS%2C%20I%20would%20like%20to%20discuss%20a%20supply%20chain%20solution.'

// ─── Knowledge Base ────────────────────────────────────────────────────────────

const KB = [
  {
    id: 'transport',
    keywords: ['transport', 'tms', 'route', 'delivery', 'fleet', 'logistics', 'shipping', 'dispatch', 'high delivery cost', 'delivery cost', 'high transport', 'late delivery'],
    diagnosis: 'High transport costs are typically caused by inefficient routing, low fleet utilisation, manual dispatch planning, or poor delivery visibility.',
    solution: 'TMS Implementation using Opsi TMS, BlueYonder TMS, or Ignition TMS — covering route optimisation, real-time tracking, fleet management, and ePOD.',
    impact: 'Typical results: 6–12% reduction in transport costs, improved delivery performance, and stronger fleet efficiency. Value Logistics achieved a 45% improvement in delivery performance after OptimumSCS TMS implementation.',
    next: 'Request a transport optimisation assessment — share your monthly delivery volumes, transport spend, and main delivery regions.',
    path: '/solutions/tms-implementation',
  },
  {
    id: 'erp',
    keywords: ['erp', 'system', 'finance', 'operations', 'integration', 'manual process', 'spreadsheet', 'disconnected', 'dynamics', 'd365', 'sap', 'microsoft'],
    diagnosis: 'Disconnected systems, manual processes, and duplicate data are limiting your operational control and real-time visibility across teams.',
    solution: 'ERP Transformation using Microsoft Dynamics 365 — integrating finance, procurement, inventory, logistics, and operations into one digital platform.',
    impact: 'Typical results: improved process control, fewer manual errors, faster reporting cycles, and better end-to-end visibility. CCBA (Coca-Cola) achieved a 20% cost reduction with 100+ staff trained after D365 deployment.',
    next: 'Request an ERP readiness assessment — share your current systems, main pain points, and affected teams.',
    path: '/solutions/erp-transformation',
  },
  {
    id: 'procurement',
    keywords: ['procurement', 'supplier', 'sourcing', 'purchase', 'buying', 'spend', 'vendor', 'purchasing', 'stockout', 'inventory', 'stock'],
    diagnosis: 'Uncontrolled spend, weak supplier management, limited approval control, or manual buying processes are increasing cost and supply risk.',
    solution: 'Procurement Services — covering supplier management, sourcing workflows, purchasing controls, spend visibility, and procurement process improvement.',
    impact: 'Typical results: improved cost control, stronger supplier performance, reduced manual effort, and better spend governance.',
    next: 'Request a procurement assessment — share your spend categories, supplier base, and approval workflow challenges.',
    path: '/solutions/procurement-services',
  },
  {
    id: 'analytics',
    keywords: ['analytics', 'data', 'dashboard', 'report', 'reporting', 'visibility', 'kpi', 'forecast', 'slow reporting', 'power bi', 'tableau', 'insight'],
    diagnosis: 'Slow reporting and limited KPI visibility are delaying decisions and hiding supply chain exceptions.',
    solution: 'Data Analytics & Reporting using Power BI dashboards, operational KPI reporting, and exception management.',
    impact: 'Typical results: 15–25% faster reporting cycles, improved decision speed, and real-time visibility across cost, service, inventory, and delivery performance.',
    next: 'Request a data visibility assessment — share the KPIs, source systems, and reporting frequency you need.',
    path: '/solutions/data-analytics-reporting',
  },
  {
    id: 'consulting',
    keywords: ['consulting', 'consult', 'assess', 'strategy', 'improve', 'optimise', 'optimize', 'transformation', 'roadmap', 'help', 'advice', 'not sure'],
    diagnosis: 'Your supply chain challenge may need structured diagnosis before choosing between transport, procurement, ERP, analytics, or operating model changes.',
    solution: 'Consulting Services — assessing the current state, quantifying the performance gap, designing the improvement roadmap, and supporting execution.',
    impact: 'Typical results: clearer priorities, a measurable improvement roadmap, reduced execution risk, and better alignment between operations, systems, and cost targets.',
    next: 'Request a consulting discovery session — share the business area, monthly volume, cost pressure, and target outcomes.',
    path: '/solutions/consulting-services',
  },
  {
    id: 'warehouse',
    keywords: ['warehouse', 'wms', 'picking', 'packing', 'putaway', 'storage', 'accuracy', 'fulfilment', 'fulfillment'],
    diagnosis: 'Warehouse inefficiency, picking errors, or poor inventory accuracy are increasing cost and reducing service levels.',
    solution: 'Warehouse Management (WMS) implementation and operational optimisation to improve accuracy, throughput, and inventory control.',
    impact: 'Typical results: improved pick accuracy, faster fulfilment, and better stock visibility. OPSI Systems achieved a 30% efficiency improvement after TMS + WMS integration.',
    next: 'Request a warehouse assessment — share your SKU count, daily order lines, and main accuracy or throughput challenges.',
    path: '/solutions/consulting-services',
  },
]

const COMPANY_ANSWER = `OptimumSCS (Optimum Supply Chain Solutions) is a supply chain consulting and technology company founded in 2021, based in Randburg, Johannesburg, South Africa.

We are Level 1 B-BBEE certified (100% Black-owned, 51% Black Women-owned) with a core team of 8 specialists and a network of subcontractors.

Our services:
• ERP Transformation (Microsoft Dynamics 365)
• TMS Implementation (Opsi, BlueYonder, Ignition)
• Procurement Services
• Data Analytics & Reporting (Power BI)
• Consulting Services
• Warehouse Management

Clients include Value Logistics, Nebula Logistics Africa, CCBA (Coca-Cola), OPSI Systems, Barloworld Logistics, and Ramco Systems.

Contact: moses@optimumscs.com | +27 739370249 | www.optimumscs.com`

function getBuiltInReply(text) {
  const t = text.toLowerCase()

  // Check specific service areas FIRST before any generic match
  const area = KB.find(a => a.keywords.some(k => t.includes(k)))

  if (area) {
    return {
      text: `Diagnosis: ${area.diagnosis}\n\nRecommended Solution: ${area.solution}\n\nExpected Impact: ${area.impact}\n\nNext Step: ${area.next}`,
      path: area.path,
    }
  }

  // Only show company profile if nothing specific was asked about
  if (['who are you', 'about optimum', 'about your company', 'tell me about optimumscs', 'your services', 'what services'].some(k => t.includes(k))) {
    return { text: COMPANY_ANSWER, path: '/about' }
  }

  return {
    text: `To give you the best recommendation, please share a bit more:\n\n1. Which area is under pressure — transport, procurement, ERP, analytics, or warehouse?\n2. What measurable problem are you seeing — high cost, delays, stockouts, slow reporting, or manual errors?\n3. What is your approximate monthly volume or spend?\n\nOptimumSCS supports FMCG, Logistics, Retail, Manufacturing, Agriculture, Healthcare, and Public Sector clients across Africa.`,
    path: '/solutions',
  }
}

// ─── Claude API ────────────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are AskOptimumSCS, a professional AI supply chain consultant for Optimum Supply Chain Solutions (OptimumSCS).

## About OptimumSCS
- Founded: 2021 | Randburg, Johannesburg, South Africa
- Team: 8 core employees + specialist subcontractors | Level 1 B-BBEE (100% Black-owned, 51% Black Women-owned)
- Contact: moses@optimumscs.com | +27 739370249 | www.optimumscs.com

## Services
1. ERP Transformation — Microsoft Dynamics 365 across finance, procurement, inventory, logistics, operations
2. TMS Implementation — Opsi TMS, BlueYonder TMS, Ignition TMS — route planning, fleet management, real-time tracking, ePOD
3. Procurement Services — supplier management, sourcing, purchasing workflow design, spend visibility
4. Data Analytics & Reporting — Power BI dashboards, operational KPI reporting, exception management
5. Consulting Services — supply chain assessment, operating model design, transformation roadmaps
6. Warehouse Management — WMS implementation and optimisation

## Proven Results
- Value Logistics: TMS → 45% delivery performance improvement
- CCBA (Coca-Cola): D365 ERP → 20% cost reduction, 100+ staff trained
- OPSI Systems: TMS + WMS → 30% efficiency improvement
- Nebula Logistics Africa: TMS + ePOD deployment
- Barloworld Logistics, Ramco Systems: consulting and TMS support

## Industries
FMCG, Logistics & Transport, Retail & E-commerce, Manufacturing, Agriculture, Healthcare, Public Sector, Mining & Energy

## Response format
Always reply with: Diagnosis → Recommended Solution → Expected Impact → Next Step. Be concise (under 250 words). End with a clear call to action directing to moses@optimumscs.com or +27 739370249.`

async function callClaude(history) {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY
  if (!apiKey || apiKey === 'your_api_key_here') throw new Error('no-key')

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 500,
      system: SYSTEM_PROMPT,
      messages: history,
    }),
  })

  if (!res.ok) throw new Error(`api-${res.status}`)
  const data = await res.json()
  return data.content[0].text
}

// ─── Quick chips ───────────────────────────────────────────────────────────────

const QUICK_CHIPS = [
  'High delivery costs',
  'I need TMS implementation',
  'ERP transformation',
  'Procurement support',
  'Data analytics & reporting',
  'Tell me about OptimumSCS',
]

const starterMessages = [
  {
    type: 'bot',
    text: "Hello! I'm your OptimumSCS AI supply chain consultant.\n\nDescribe your challenge and I'll recommend the right solution for your business.",
  },
]

// ─── Component ─────────────────────────────────────────────────────────────────

export default function AskOptimumSCS() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState('menu')
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState(starterMessages)
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState([])
  const bodyRef = useRef(null)

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [messages, loading])

  const closeChat = () => {
    setOpen(false)
    setMode('menu')
    setInput('')
    setMessages(starterMessages)
    setHistory([])
  }

  const goToQuote = () => {
    closeChat()
    navigate('/fee-quote')
  }

  const sendMessage = async (text = input) => {
    const cleanText = text.trim()
    if (!cleanText || loading) return

    setMessages(prev => [...prev, { type: 'user', text: cleanText }])
    setInput('')
    setLoading(true)

    const newHistory = [...history, { role: 'user', content: cleanText }]

    try {
      const reply = await callClaude(newHistory)
      setHistory([...newHistory, { role: 'assistant', content: reply }])
      setMessages(prev => [...prev, { type: 'bot', text: reply }])
    } catch {
      // Fallback to built-in knowledge base
      const fallback = getBuiltInReply(cleanText)
      setHistory([...newHistory, { role: 'assistant', content: fallback.text }])
      setMessages(prev => [
        ...prev,
        {
          type: 'bot',
          text: fallback.text,
          actions: fallback.path ? [{ label: 'View Solution', path: fallback.path }, { label: 'Request Assessment', path: '/fee-quote' }] : [],
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="ask-optimum">
      {open && (
        <div className="ask-panel">
          {/* Header */}
          <div className="ask-header">
            <div>
              <strong>AskOptimumSCS</strong>
              <span>Supply Chain Consultant</span>
            </div>
            <button className="ask-close" onClick={closeChat} aria-label="Close">×</button>
          </div>

          {/* ── MENU MODE ── */}
          {mode === 'menu' && (
            <div className="ask-body ask-menu-body">
              <p className="ask-menu-intro">How can we help optimise your supply chain today?</p>

              <div className="ask-menu-options">
                <button type="button" className="ask-menu-option ask-option-ai" onClick={() => setMode('ai')}>
                  <span className="ask-menu-icon ask-icon-ai">AI</span>
                  <span className="ask-menu-copy">
                    <span className="ask-menu-title">
                      Get Instant AI Consultant Recommendation
                      <em className="ask-menu-badge">Recommended</em>
                    </span>
                    <small>Answer a few questions and get the best-fit solution in seconds</small>
                  </span>
                </button>

                <a className="ask-menu-option ask-option-wa" href={WHATSAPP_URL} target="_blank" rel="noreferrer">
                  <span className="ask-menu-icon ask-icon-wa">WA</span>
                  <span className="ask-menu-copy">
                    <span className="ask-menu-title">Talk to an OptimumSCS Expert</span>
                    <small>Chat directly with our team for tailored advice</small>
                  </span>
                </a>

                <button type="button" className="ask-menu-option ask-option-quote" onClick={goToQuote}>
                  <span className="ask-menu-icon ask-icon-quote">Q</span>
                  <span className="ask-menu-copy">
                    <span className="ask-menu-title">Request a Quote</span>
                    <small>Share your scope and receive a tailored estimate</small>
                  </span>
                </button>
              </div>

              <p className="ask-menu-trust">Trusted by FMCG, Logistics &amp; Manufacturing companies.</p>
            </div>
          )}

          {/* ── AI CHAT MODE ── */}
          {mode === 'ai' && (
            <>
              <div className="ask-ai-toolbar">
                <button type="button" onClick={() => setMode('menu')}>← Back</button>
                <span>AI Supply Chain Consultant</span>
              </div>

              <div className="ask-body" ref={bodyRef}>
                {messages.map((msg, i) => (
                  <div key={i} className={`ask-message ${msg.type}`}>
                    <div>{msg.text}</div>
                    {msg.actions?.length > 0 && (
                      <div className="ask-actions">
                        {msg.actions.map(a => (
                          <button key={a.path} onClick={() => { closeChat(); navigate(a.path) }}>
                            {a.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                {loading && (
                  <div className="ask-message bot">
                    <div className="ask-typing"><span /><span /><span /></div>
                  </div>
                )}

                <div className="ask-chips">
                  {QUICK_CHIPS.map(chip => (
                    <button key={chip} onClick={() => sendMessage(chip)} disabled={loading}>{chip}</button>
                  ))}
                  <button className="ask-chip-quote" onClick={goToQuote} disabled={loading}>
                    Request a Quote
                  </button>
                </div>
              </div>

              <div className="ask-input-row">
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage() } }}
                  placeholder="Describe your supply chain challenge..."
                  disabled={loading}
                />
                <button onClick={() => sendMessage()} disabled={loading || !input.trim()}>
                  {loading ? '…' : 'Send'}
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {!open && (
        <button className="ask-launcher" onClick={() => setOpen(true)}>
          <span>AskOptimumSCS</span>
          <strong>AI</strong>
        </button>
      )}
    </div>
  )
}
