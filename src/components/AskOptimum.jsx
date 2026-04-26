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

const companyProfile = {
  name: 'Optimum Supply Chain Solutions (OptimumSCS)',
  founded: '2021',
  hq: 'Johannesburg, South Africa',
  positioning:
    'A future-driven supply chain consulting and technology company specialising in ERP, TMS, warehouse optimisation, procurement systems, analytics platforms, and full digital transformation.',
  coreStrength:
    'Combines deep operational expertise with advanced technology implementation to deliver measurable supply chain performance improvements.',
  technologyStack: [
    'Microsoft Dynamics 365',
    'SAP S/4HANA',
    'Oracle NetSuite',
    'Infor CloudSuite',
    'Opsi TMS',
    'BlueYonder TMS',
    'Ignition TMS',
    'Power BI',
    'Tableau',
  ],
  differentiation: [
    'End-to-end supply chain integration across ERP, TMS, and Analytics',
    'Strong FMCG and logistics expertise',
    'Execution-focused consulting',
    'Pan-African implementation capability',
    'Data-driven decision-making approach',
  ],
  industries: [
    'FMCG',
    'Logistics & Transport',
    'Retail & E-commerce',
    'Manufacturing',
    'Agriculture & Agro-logistics',
    'Healthcare & Pharmaceutical supply chains',
    'Public sector',
    'Mining & Energy',
  ],
}

const solutionAreas = [
  {
    id: 'transport_optimization',
    name: 'Transport Optimization',
    path: '/solutions/tms-implementation',
    keywords: ['transport', 'tms', 'route', 'routes', 'delivery', 'deliveries', 'fleet', 'logistics', 'shipping', 'dispatch', 'high delivery costs', 'route inefficiency', 'delivery delays'],
    tools: ['Opsi TMS', 'BlueYonder', 'Ignition TMS'],
    diagnosis: 'High transport cost, inefficient routing, low fleet utilisation, delivery delays, or manual planning may be reducing service performance.',
    recommendation: 'Optimise route planning, delivery scheduling, fleet utilisation, and transport operations using TMS and geospatial intelligence.',
    impact: 'Expected impact: 10-25% reduction in transport costs, improved delivery performance, and increased fleet efficiency.',
    experience: 'Relevant experience: Value Logistics TMS implementation; Transport Consortium TMS optimisation; Ramco Systems multi-company TMS deployment. FMCG client achieved about 18% cost improvement through route optimisation.',
    nextStep: 'Request a transport optimization assessment.',
    questions: [
      'Monthly deliveries or trips?',
      'Current transport cost as % of sales or spend per month?',
      'Main issue: cost, late deliveries, poor visibility, or route planning?',
    ],
  },
  {
    id: 'warehouse_optimization',
    name: 'Warehouse Optimization',
    path: '/solutions/warehouse-management',
    keywords: ['warehouse', 'wms', 'inventory', 'stock', 'stockouts', 'overstock', 'stock issues', 'picking', 'packing', 'putaway', 'storage', 'accuracy', 'warehouse inefficiency'],
    tools: ['WMS implementation', 'Inventory accuracy review', 'Warehouse workflow optimisation'],
    diagnosis: 'Stock inaccuracies, slow picking, warehouse inefficiencies, overstocking, or stockouts may be creating cost and service leakage.',
    recommendation: 'Improve warehouse layout, picking efficiency, inventory accuracy, and workflow performance.',
    impact: 'Expected impact: improved fulfilment speed, inventory control, and warehouse efficiency.',
    experience: 'Relevant experience: Delta Beverages Zimbabwe WMS implementation.',
    nextStep: 'Request a warehouse efficiency review.',
    questions: [
      'Number of SKUs and monthly order lines?',
      'Current picking accuracy or stock accuracy?',
      'Main issue: space, labour productivity, errors, or inventory visibility?',
    ],
  },
  {
    id: 'erp_transformation',
    name: 'ERP Transformation',
    path: '/solutions/erp-transformation',
    keywords: ['erp', 'system', 'systems', 'finance', 'operations', 'integration', 'manual', 'manual processes', 'spreadsheet', 'process', 'disconnected systems', 'duplicate data', 'erp/tms issues'],
    tools: ['Microsoft Dynamics 365', 'SAP', 'Oracle NetSuite'],
    diagnosis: 'Disconnected systems, manual processes, duplicate data, poor visibility, or inefficient reporting may be limiting operational control.',
    recommendation: 'Implement and integrate ERP systems to unify finance, logistics, procurement, inventory, and operations into one digital platform.',
    impact: 'Expected impact: improved operational control, real-time visibility, and end-to-end process efficiency.',
    experience: 'Relevant experience: CCBA D365 deployment; Dimension Data ERP implementation; Accenture ERP + Power BI integration.',
    nextStep: 'Request an ERP readiness assessment.',
    questions: [
      'Which ERP or accounting system do you use now?',
      'Which teams are disconnected: finance, procurement, warehouse, transport, or sales?',
      'What reports or decisions are currently delayed?',
    ],
  },
  {
    id: 'procurement_systems',
    name: 'Procurement & Sourcing Optimization',
    path: '/solutions/procurement-services',
    keywords: ['procurement', 'manual procurement', 'supplier', 'supplier issues', 'suppliers', 'purchase', 'buying', 'spend', 'sourcing', 'vendor'],
    tools: ['Supplier management', 'Purchasing workflow design', 'Spend visibility'],
    diagnosis: 'Uncontrolled spend, weak supplier management, or manual procurement processes may be increasing cost and supply risk.',
    recommendation: 'Improve supplier management, purchasing workflows, cost control, and procurement visibility.',
    impact: 'Expected impact: improved cost control, supplier performance, and procurement efficiency.',
    experience: 'Relevant experience: execution-focused procurement and sourcing optimisation across supply chain transformation programmes.',
    nextStep: 'Request a procurement assessment.',
    questions: [
      'Monthly or annual procurement spend?',
      'Top spend categories?',
      'Main issue: price, supplier reliability, stockouts, or approval control?',
    ],
  },
  {
    id: 'data_analytics',
    name: 'Data Analytics & Reporting',
    path: '/solutions/data-analytics-reporting',
    keywords: ['analytics', 'data', 'dashboard', 'report', 'reporting', 'slow reporting', 'visibility', 'poor visibility', 'kpi', 'forecast', 'forecasting', 'disconnected data'],
    tools: ['Power BI', 'Tableau'],
    diagnosis: 'Lack of visibility, manual reporting, slow decision-making, or disconnected data may be hiding operational performance issues.',
    recommendation: 'Transform operational data into dashboards, insights, predictive models, and decision-support tools.',
    impact: 'Expected impact: faster decision-making, improved reporting accuracy, and real-time operational visibility.',
    experience: 'Relevant experience: Accenture Power BI dashboards; CCBA analytics support.',
    nextStep: 'Request a data visibility assessment.',
    questions: [
      'Which KPIs do you need daily or weekly?',
      'Where is the data stored now?',
      'Main issue: manual reports, poor accuracy, delayed decisions, or no dashboard?',
    ],
  },
]

const challengeToSolutionId = {
  'high delivery costs': 'transport_optimization',
  'route inefficiency': 'transport_optimization',
  'delivery delays': 'transport_optimization',
  'poor visibility': 'data_analytics',
  'slow reporting': 'data_analytics',
  'stockouts or overstock': 'warehouse_optimization',
  'stock issues': 'warehouse_optimization',
  'warehouse inefficiency': 'warehouse_optimization',
  'manual procurement': 'procurement_systems',
  'supplier issues': 'procurement_systems',
  'disconnected systems': 'erp_transformation',
  'manual processes': 'erp_transformation',
  'erp/tms issues': 'erp_transformation',
}

function hasBusinessContext(text) {
  return (
    /\d/.test(text) ||
    ['cost', 'late', 'delay', 'manual', 'visibility', 'accuracy', 'stockout', 'error', 'saving', 'spend', 'slow', 'service'].some((word) =>
      text.includes(word)
    )
  )
}

function findSolutionArea(text) {
  const mappedId = Object.entries(challengeToSolutionId).find(([challenge]) =>
    text.includes(challenge)
  )?.[1]

  if (mappedId) {
    return solutionAreas.find((area) => area.id === mappedId)
  }

  return solutionAreas.find((area) =>
    area.keywords.some((keyword) => text.includes(keyword))
  )
}

function formatSolutionReply(area) {
  return `Diagnosis: ${area.diagnosis}\n\nRecommended Solution: ${area.name}. ${area.recommendation}\n\nExpected Impact: ${area.impact}\n\nRelevant Experience: ${area.experience}\n\nNext Step: ${area.nextStep}`
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
  const mappedAreaId = challengeToSolutionId[text]
  const mappedArea = solutionAreas.find((area) => area.id === mappedAreaId)

  if (mappedArea) {
    return {
      answer: formatSolutionReply(mappedArea),
      actions: [
        { label: 'View Solution', path: mappedArea.path },
        { label: 'Request Assessment', path: '/fee-quote' },
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

  if (
    text.includes('company') ||
    text.includes('optimum') ||
    text.includes('who are you') ||
    text.includes('about')
  ) {
    return {
      answer: `Diagnosis: You need to understand whether OptimumSCS fits your supply chain transformation need.\n\nRecommended Solution: ${companyProfile.name} is ${companyProfile.positioning}\n\nExpected Impact: ${companyProfile.coreStrength}\n\nRelevant Experience: Differentiators include ${companyProfile.differentiation.join('; ')}.\n\nNext Step: Share your challenge so I can map it to Transport, Warehouse, ERP, Procurement, or Analytics.`,
      actions: [
        { label: 'View Solutions', path: '/solutions' },
        { label: 'Request Assessment', path: '/fee-quote' },
      ],
    }
  }

  if (text.includes('industry') || text.includes('industries')) {
    return {
      answer: `Diagnosis: Industry context is needed to size the right supply chain intervention.\n\nRecommended Solution: OptimumSCS supports ${companyProfile.industries.join(', ')}.\n\nExpected Impact: Better alignment between operating model, technology, and measurable outcomes such as cost, efficiency, and visibility.\n\nRelevant Experience: Strong FMCG, logistics, and Pan-African implementation capability.\n\nNext Step: Select your biggest challenge or share your industry and monthly volume.`,
      actions: [
        { label: 'View Industries', path: '/industries' },
        { label: 'Request Assessment', path: '/fee-quote' },
      ],
    }
  }

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
      answer: formatSolutionReply(matchedArea),
      actions: [
        { label: 'View Solution', path: matchedArea.path },
        { label: 'Request Quote', path: '/fee-quote' },
      ],
    }
  }

  return {
    answer: `Discovery required before recommendation.\n\n1. What supply chain area is affected: transport, warehouse, ERP, procurement, or analytics?\n2. What is the measurable problem: cost, efficiency, visibility, service level, or accuracy?\n3. What monthly volume, spend, SKUs, orders, or deliveries are involved?\n\nContext: ${companyProfile.name} supports ${companyProfile.industries.slice(0, 5).join(', ')} and related supply chains from ${companyProfile.hq}.`,
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
