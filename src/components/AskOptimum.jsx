import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './AskOptimum.css'

const starterMessages = [
  {
    type: 'bot',
    text: 'What is your biggest supply chain challenge?',
  },
]

const challengeOptions = [
  'High delivery costs',
  'Poor visibility',
  'Stockouts or overstock',
  'Manual processes',
  'Slow reporting',
  'ERP/TMS issues',
]

const solutionAreas = [
  {
    name: 'Transport',
    path: '/solutions/tms-implementation',
    keywords: ['transport', 'tms', 'route', 'routes', 'delivery', 'deliveries', 'fleet', 'logistics', 'shipping', 'dispatch'],
    diagnosis: 'Transport cost, route planning, or delivery performance is likely constraining service reliability.',
    recommendation: 'Run a TMS and route optimisation assessment focused on cost-to-serve, delivery performance, fleet utilisation, and dispatch visibility.',
    impact: 'Typical impact: 8-18% lower transport cost, 10-25% better delivery reliability, and stronger daily visibility.',
    questions: [
      'Monthly deliveries or trips?',
      'Current transport cost as % of sales or spend per month?',
      'Main issue: cost, late deliveries, poor visibility, or route planning?',
    ],
  },
  {
    name: 'Warehouse',
    path: '/solutions/warehouse-management',
    keywords: ['warehouse', 'wms', 'inventory', 'stock', 'picking', 'packing', 'putaway', 'storage', 'accuracy'],
    diagnosis: 'Warehouse flow, stock accuracy, or picking productivity is likely creating service and cost leakage.',
    recommendation: 'Assess warehouse layout, picking process, inventory accuracy, labour productivity, and WMS readiness.',
    impact: 'Typical impact: 15-30% productivity improvement, 20-40% fewer picking errors, and higher stock accuracy.',
    questions: [
      'Number of SKUs and monthly order lines?',
      'Current picking accuracy or stock accuracy?',
      'Main issue: space, labour productivity, errors, or inventory visibility?',
    ],
  },
  {
    name: 'ERP',
    path: '/solutions/erp-transformation',
    keywords: ['erp', 'system', 'systems', 'finance', 'operations', 'integration', 'manual', 'spreadsheet', 'process'],
    diagnosis: 'Disconnected systems or manual processes are likely limiting control, speed, and management visibility.',
    recommendation: 'Map current finance, procurement, inventory, and operational workflows, then define an ERP transformation roadmap.',
    impact: 'Typical impact: 20-35% faster reporting cycles, fewer manual errors, and better end-to-end control.',
    questions: [
      'Which ERP or accounting system do you use now?',
      'Which teams are disconnected: finance, procurement, warehouse, transport, or sales?',
      'What reports or decisions are currently delayed?',
    ],
  },
  {
    name: 'Procurement',
    path: '/solutions/procurement-services',
    keywords: ['procurement', 'supplier', 'suppliers', 'purchase', 'buying', 'spend', 'sourcing', 'vendor'],
    diagnosis: 'Supplier performance, unmanaged spend, or weak procurement controls may be increasing cost and supply risk.',
    recommendation: 'Review spend categories, supplier performance, purchase controls, and sourcing opportunities.',
    impact: 'Typical impact: 5-15% addressable spend savings, better supplier reliability, and improved purchase visibility.',
    questions: [
      'Monthly or annual procurement spend?',
      'Top spend categories?',
      'Main issue: price, supplier reliability, stockouts, or approval control?',
    ],
  },
  {
    name: 'Analytics',
    path: '/solutions/data-analytics-reporting',
    keywords: ['analytics', 'data', 'dashboard', 'report', 'reporting', 'visibility', 'kpi', 'forecast', 'forecasting'],
    diagnosis: 'Limited data visibility is likely slowing decisions and hiding cost, stock, or service exceptions.',
    recommendation: 'Build a reporting and analytics layer around operational KPIs, exception dashboards, and decision-ready insights.',
    impact: 'Typical impact: 30-60% faster reporting, clearer performance visibility, and faster exception management.',
    questions: [
      'Which KPIs do you need daily or weekly?',
      'Where is the data stored now?',
      'Main issue: manual reports, poor accuracy, delayed decisions, or no dashboard?',
    ],
  },
]

function hasBusinessContext(text) {
  return (
    /\d/.test(text) ||
    ['cost', 'late', 'delay', 'manual', 'visibility', 'accuracy', 'stockout', 'error', 'saving', 'spend', 'slow', 'service'].some((word) =>
      text.includes(word)
    )
  )
}

function findSolutionArea(text) {
  return solutionAreas.find((area) =>
    area.keywords.some((keyword) => text.includes(keyword))
  )
}

function getBusinessTypeReply(message) {
  const text = message.toLowerCase()

  if (text === 'fmcg') {
    return 'FMCG selected.\n\nDiscovery required:\n1. What is the main pressure: transport cost, warehouse accuracy, procurement spend, ERP control, or KPI visibility?\n2. Monthly order volume or delivery volume?\n3. Which outcome matters most: lower cost, faster fulfilment, or better visibility?'
  }

  if (text === 'logistics & transport' || text === 'logistics' || text === 'transport') {
    return 'Logistics & Transport selected.\n\nDiscovery required:\n1. Monthly trips or deliveries?\n2. Main issue: route cost, late delivery, fleet utilisation, or tracking visibility?\n3. Current transport cost or target saving?'
  }

  if (text === 'retail') {
    return 'Retail selected.\n\nDiscovery required:\n1. Number of stores, SKUs, or monthly orders?\n2. Main issue: stockouts, replenishment, warehouse picking, or reporting visibility?\n3. Which metric needs improvement: availability, cost, speed, or accuracy?'
  }

  if (text === 'agriculture') {
    return 'Agriculture selected.\n\nDiscovery required:\n1. What do you move or store: inputs, produce, cold chain, or finished goods?\n2. Main issue: supplier reliability, transport cost, inventory visibility, or demand planning?\n3. Monthly volume or seasonal peak volume?'
  }

  if (text === 'healthcare') {
    return 'Healthcare selected.\n\nDiscovery required:\n1. What products are managed: medical supplies, pharmaceuticals, equipment, or consumables?\n2. Main issue: stock availability, traceability, procurement cost, or warehouse accuracy?\n3. Current service-level or stockout rate?'
  }

  if (text === 'other') {
    return 'Other selected.\n\nDiscovery required:\n1. What industry are you in?\n2. Which supply chain area is affected: transport, warehouse, ERP, procurement, or analytics?\n3. What measurable issue are you seeing: cost, delays, errors, stockouts, or poor visibility?'
  }

  return null
}

function getChallengeReply(message) {
  const text = message.toLowerCase()

  if (text === 'high delivery costs') {
    return {
      answer: 'Diagnosis: Transport cost-to-serve is likely being driven by route inefficiency, low vehicle utilisation, or weak dispatch control.\n\nRecommendation: Transport solution with TMS and route optimisation assessment.\n\nImpact: 8-18% lower delivery cost and 10-25% better delivery reliability.\n\nNext step: share monthly deliveries, transport spend, and delivery regions.',
      actions: [
        { label: 'View Transport', path: '/solutions/tms-implementation' },
        { label: 'Request Assessment', path: '/fee-quote' },
      ],
    }
  }

  if (text === 'poor visibility') {
    return {
      answer: 'Diagnosis: Management visibility is likely limited by disconnected data, manual tracking, or missing operational dashboards.\n\nRecommendation: Analytics solution for KPI dashboards, exception reporting, and supply chain visibility.\n\nImpact: 30-60% faster reporting and quicker exception management.\n\nNext step: share the KPIs you need daily and where the data sits now.',
      actions: [
        { label: 'View Analytics', path: '/solutions/data-analytics-reporting' },
        { label: 'Request Assessment', path: '/fee-quote' },
      ],
    }
  }

  if (text === 'stockouts or overstock') {
    return {
      answer: 'Diagnosis: Inventory imbalance is likely caused by poor forecasting, weak replenishment rules, or inaccurate stock records.\n\nRecommendation: Warehouse and Analytics assessment focused on stock accuracy, replenishment, and demand visibility.\n\nImpact: 15-30% better stock productivity and fewer service failures from stockouts.\n\nNext step: share SKU count, stockout rate, and inventory value.',
      actions: [
        { label: 'View Warehouse', path: '/solutions/warehouse-management' },
        { label: 'View Analytics', path: '/solutions/data-analytics-reporting' },
      ],
    }
  }

  if (text === 'manual processes') {
    return {
      answer: 'Diagnosis: Manual workflows are likely creating delays, errors, and weak process control.\n\nRecommendation: ERP transformation assessment to map workflows and automate finance, procurement, inventory, and operations handoffs.\n\nImpact: 20-35% faster reporting cycles and fewer manual errors.\n\nNext step: share which processes are manual and which systems are used today.',
      actions: [
        { label: 'View ERP', path: '/solutions/erp-transformation' },
        { label: 'Request Assessment', path: '/fee-quote' },
      ],
    }
  }

  if (text === 'slow reporting') {
    return {
      answer: 'Diagnosis: Slow reporting is likely caused by manual data consolidation or fragmented source systems.\n\nRecommendation: Analytics solution for automated dashboards, KPI packs, and exception reporting.\n\nImpact: 30-60% faster reporting and better visibility into cost, service, and inventory performance.\n\nNext step: share reporting frequency, key KPIs, and data sources.',
      actions: [
        { label: 'View Analytics', path: '/solutions/data-analytics-reporting' },
        { label: 'Request Assessment', path: '/fee-quote' },
      ],
    }
  }

  if (text === 'erp/tms issues') {
    return {
      answer: 'Diagnosis: ERP/TMS issues may be limiting process control, integration, transport planning, or operational visibility.\n\nRecommendation: ERP/TMS diagnostic to assess system fit, data quality, integrations, and process adoption.\n\nImpact: 10-25% better operational efficiency and stronger end-to-end visibility.\n\nNext step: share current ERP/TMS, pain points, users affected, and failed processes.',
      actions: [
        { label: 'View ERP', path: '/solutions/erp-transformation' },
        { label: 'View TMS', path: '/solutions/tms-implementation' },
      ],
    }
  }

  return null
}

function getReply(message) {
  const text = message.toLowerCase()
  const matchedArea = findSolutionArea(text)
  const businessTypeReply = getBusinessTypeReply(message.trim())
  const challengeReply = getChallengeReply(message.trim())

  if (challengeReply) {
    return challengeReply
  }

  if (businessTypeReply) {
    return {
      answer: businessTypeReply,
      actions: [
        { label: 'View Solutions', path: '/solutions' },
        { label: 'Request Assessment', path: '/fee-quote' },
      ],
    }
  }

  if (
    text.includes('not sure') ||
    text.includes("don't know") ||
    text.includes('dont know') ||
    text.includes('help me') ||
    text.length < 4
  ) {
    return {
      answer: 'Discovery required.\n\n1. Which area is under pressure: transport, warehouse, ERP, procurement, or analytics?\n2. What measurable issue are you seeing: cost, delays, errors, stockouts, or poor visibility?\n3. What is your approximate monthly volume or spend?',
      actions: [],
    }
  }

  if (matchedArea && !hasBusinessContext(text)) {
    return {
      answer: `Discovery needed before recommending ${matchedArea.name}.\n\n1. ${matchedArea.questions[0]}\n2. ${matchedArea.questions[1]}\n3. ${matchedArea.questions[2]}`,
      actions: [
        { label: 'View Solution', path: matchedArea.path },
        { label: 'Request Assessment', path: '/fee-quote' },
      ],
    }
  }

  if (matchedArea) {
    return {
      answer: `Diagnosis: ${matchedArea.diagnosis}\n\nRecommendation: ${matchedArea.name}. ${matchedArea.recommendation}\n\nImpact: ${matchedArea.impact}\n\nNext step: complete a short assessment, then request a quote based on scope and volumes.`,
      actions: [
        { label: 'View Solution', path: matchedArea.path },
        { label: 'Request Quote', path: '/fee-quote' },
      ],
    }
  }

  return {
    answer: 'Discovery required before recommendation.\n\n1. What supply chain area is affected: transport, warehouse, ERP, procurement, or analytics?\n2. What is the measurable problem: cost, efficiency, visibility, service level, or accuracy?\n3. What monthly volume, spend, SKUs, orders, or deliveries are involved?',
    actions: [
      { label: 'View Solutions', path: '/solutions' },
      { label: 'Request Assessment', path: '/fee-quote' },
    ],
  }
}

export default function AskOptimumSCS() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState(starterMessages)

  const closeChat = () => {
    setOpen(false)
    setInput('')
    setMessages(starterMessages)
  }

  const goToPage = (path) => {
    closeChat()

    const [route, sectionId] = path.split('#')
    navigate(route)

    if (sectionId) {
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      }, 150)
    }
  }

  const sendMessage = (text = input) => {
    const cleanText = text.trim()
    if (!cleanText) return

    const reply = getReply(cleanText)

    setMessages((prev) => [
      ...prev,
      { type: 'user', text: cleanText },
      {
        type: 'bot',
        text: reply.answer,
        actions: reply.actions,
      },
    ])

    setInput('')
  }

  return (
    <div className="ask-optimum">
      {open && (
        <div className="ask-panel">
          <div className="ask-header">
            <div>
              <strong>AskOptimumSCS</strong>
              <span>Supply Chain Consultant</span>
            </div>

            <button className="ask-close" onClick={closeChat} aria-label="Close AskOptimumSCS">
              x
            </button>
          </div>

          <div className="ask-body">
            {messages.map((message, index) => (
              <div key={index} className={`ask-message ${message.type}`}>
                <div>{message.text}</div>

                {message.actions?.length > 0 && (
                  <div className="ask-actions">
                    {message.actions.map((action) => (
                      <button
                        key={action.path}
                        onClick={() => goToPage(action.path)}
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="ask-chips">
              {challengeOptions.map((challenge) => (
                <button key={challenge} onClick={() => sendMessage(challenge)}>
                  {challenge}
                </button>
              ))}
            </div>
          </div>

          <div className="ask-input-row">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') sendMessage()
              }}
              placeholder="Describe the issue, volume, spend, or current system..."
            />

            <button onClick={() => sendMessage()} aria-label="Send message">Send</button>
          </div>
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
