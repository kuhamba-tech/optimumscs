export const WHATSAPP_PHONE = '27739370249'

export const KB = [
  {
    id: 'transport',
    label: 'Transport & TMS',
    service: 'TMS Implementation',
    keywords: [
      'transport', 'tms', 'route', 'delivery', 'fleet', 'logistics', 'shipping', 'dispatch',
      'high delivery cost', 'delivery cost', 'high transport', 'late delivery',
    ],
    diagnosis:
      'High transport costs are typically caused by inefficient routing, low fleet utilisation, manual dispatch planning, or poor delivery visibility.',
    solution:
      'TMS Implementation using Opsi TMS, BlueYonder TMS, or Ignition TMS — covering route optimisation, real-time tracking, fleet management, and ePOD.',
    impact:
      'Typical results: 6–12% reduction in transport costs, improved delivery performance, and stronger fleet efficiency. Value Logistics achieved a 45% improvement in delivery performance after OptimumSCS TMS implementation.',
    next:
      'Request a transport optimisation assessment — share your monthly delivery volumes, transport spend, and main delivery regions.',
    path: '/solutions/tms-implementation',
    caseStudy: '/case-studies',
  },
  {
    id: 'erp',
    label: 'ERP & systems',
    service: 'ERP Transformation',
    keywords: [
      'erp', 'system', 'finance', 'operations', 'integration', 'manual process', 'spreadsheet',
      'disconnected', 'dynamics', 'd365', 'sap', 'microsoft',
    ],
    diagnosis:
      'Disconnected systems, manual processes, and duplicate data are limiting your operational control and real-time visibility across teams.',
    solution:
      'ERP Transformation using Microsoft Dynamics 365 — integrating finance, procurement, inventory, logistics, and operations into one digital platform.',
    impact:
      'Typical results: improved process control, fewer manual errors, faster reporting cycles, and better end-to-end visibility. CCBA (Coca-Cola) achieved a 20% cost reduction with 100+ staff trained after D365 deployment.',
    next:
      'Request an ERP readiness assessment — share your current systems, main pain points, and affected teams.',
    path: '/solutions/erp-transformation',
    caseStudy: '/case-studies',
  },
  {
    id: 'procurement',
    label: 'Procurement',
    service: 'Procurement Services',
    keywords: [
      'procurement', 'supplier', 'sourcing', 'purchase', 'buying', 'spend', 'vendor',
      'purchasing', 'stockout', 'inventory', 'stock',
    ],
    diagnosis:
      'Uncontrolled spend, weak supplier management, limited approval control, or manual buying processes are increasing cost and supply risk.',
    solution:
      'Procurement Services — covering supplier management, sourcing workflows, purchasing controls, spend visibility, and procurement process improvement.',
    impact:
      'Typical results: improved cost control, stronger supplier performance, reduced manual effort, and better spend governance.',
    next:
      'Request a procurement assessment — share your spend categories, supplier base, and approval workflow challenges.',
    path: '/solutions/procurement-services',
    caseStudy: '/case-studies',
  },
  {
    id: 'analytics',
    label: 'Analytics & reporting',
    service: 'Data Analytics & Reporting',
    keywords: [
      'analytics', 'data', 'dashboard', 'report', 'reporting', 'visibility', 'kpi', 'forecast',
      'slow reporting', 'power bi', 'tableau', 'insight',
    ],
    diagnosis:
      'Slow reporting and limited KPI visibility are delaying decisions and hiding supply chain exceptions.',
    solution:
      'Data Analytics & Reporting using Power BI dashboards, operational KPI reporting, and exception management.',
    impact:
      'Typical results: 15–25% faster reporting cycles, improved decision speed, and real-time visibility across cost, service, inventory, and delivery performance.',
    next:
      'Request a data visibility assessment — share the KPIs, source systems, and reporting frequency you need.',
    path: '/solutions/data-analytics-reporting',
    caseStudy: '/case-studies',
  },
  {
    id: 'consulting',
    label: 'Consulting & strategy',
    service: 'Consulting Services',
    keywords: [
      'consulting', 'consult', 'assess', 'strategy', 'improve', 'optimise', 'optimize',
      'transformation', 'roadmap', 'help', 'advice', 'not sure',
    ],
    diagnosis:
      'Your supply chain challenge may need structured diagnosis before choosing between transport, procurement, ERP, analytics, or operating model changes.',
    solution:
      'Consulting Services — assessing the current state, quantifying the performance gap, designing the improvement roadmap, and supporting execution.',
    impact:
      'Typical results: clearer priorities, a measurable improvement roadmap, reduced execution risk, and better alignment between operations, systems, and cost targets.',
    next:
      'Request a consulting discovery session — share the business area, monthly volume, cost pressure, and target outcomes.',
    path: '/solutions/consulting-services',
    caseStudy: '/case-studies',
  },
]

export const INDUSTRIES = [
  'FMCG',
  'Logistics & Transport',
  'Retail & E-commerce',
  'Manufacturing',
  'Agriculture',
  'Healthcare',
  'Public Sector',
  'Mining & Energy',
  'Other',
]

export const SCALE_OPTIONS = [
  'Under R500k monthly spend',
  'R500k – R2m monthly spend',
  'R2m+ monthly spend',
  'Prefer not to say',
]

export const PROBLEM_CHIPS = [
  'High costs',
  'Late deliveries',
  'Manual processes',
  'Poor visibility / reporting',
  'Stockouts or supply risk',
]

export const QUICK_CHIPS = KB.map((a) => a.label).concat(['Tell me about OptimumSCS'])

export const COMPANY_ANSWER = `OptimumSCS (Optimum Supply Chain Solutions) is a supply chain consulting and technology company founded in 2021, based in Randburg, Johannesburg, South Africa.

We are Level 1 B-BBEE certified (100% Black-owned, 51% Black Women-owned) with a core team of 8 specialists and a network of subcontractors.

Our services:
• ERP Transformation (Microsoft Dynamics 365)
• TMS Implementation (Opsi, BlueYonder, Ignition)
• Procurement Services
• Data Analytics & Reporting (Power BI)
• Consulting Services

Clients include Value Logistics, Nebula Logistics Africa, CCBA (Coca-Cola), OPSI Systems, Barloworld Logistics, and Ramco Systems.

Contact: moses@optimumscs.com | +27 739370249 | www.optimumscs.com`

export const SYSTEM_PROMPT = `You are AskOptimumSCS, a professional AI supply chain consultant for Optimum Supply Chain Solutions (OptimumSCS).

## About OptimumSCS
- Founded: 2021 | Randburg, Johannesburg, South Africa
- Team: 8 core employees + specialist subcontractors | Level 1 B-BBEE (100% Black-owned, 51% Black Women-owned)
- Contact: moses@optimumscs.com | +27 739370249 | www.optimumscs.com

## Services
1. ERP Transformation — Microsoft Dynamics 365
2. TMS Implementation — Opsi TMS, BlueYonder TMS, Ignition TMS
3. Procurement Services
4. Data Analytics & Reporting — Power BI
5. Consulting Services

## Proven Results
- Value Logistics: TMS → 45% delivery performance improvement
- CCBA (Coca-Cola): D365 ERP → 20% cost reduction, 100+ staff trained
- OPSI Systems: TMS + WMS → 30% efficiency improvement
- Nebula Logistics Africa: TMS + ePOD deployment

## Industries
FMCG, Logistics & Transport, Retail, Manufacturing, Agriculture, Healthcare, Public Sector, Mining & Energy

## Response format
Always reply with exactly these headings on separate lines:
Diagnosis:
Recommended Solution:
Expected Impact:
Next Step:

Be concise (under 250 words). Mention relevant case studies at www.optimumscs.com/case-studies when appropriate. End Next Step with a clear call to action (email or phone).`

export const SESSION_KEY = 'ask-optimum-session'
export const QUOTE_PREFILL_KEY = 'ask-optimum-quote-prefill'

export function matchKnowledgeArea(text) {
  const t = text.toLowerCase()
  return KB.find((a) => a.keywords.some((k) => t.includes(k)))
}

export function structuredFromArea(area) {
  return {
    diagnosis: area.diagnosis,
    solution: area.solution,
    impact: area.impact,
    nextStep: area.next,
    path: area.path,
    caseStudy: area.caseStudy,
    service: area.service,
  }
}

export function getBuiltInReply(text) {
  const t = text.toLowerCase()
  const area = matchKnowledgeArea(text)

  if (area) {
    return { structured: structuredFromArea(area), usedFallback: true }
  }

  if (
    ['who are you', 'about optimum', 'about your company', 'tell me about optimumscs', 'your services', 'what services'].some(
      (k) => t.includes(k),
    )
  ) {
    return {
      structured: {
        diagnosis: 'You asked about OptimumSCS.',
        solution: COMPANY_ANSWER,
        impact: 'Trusted across FMCG, logistics, manufacturing, and public sector clients in Africa.',
        nextStep: 'Explore our About page or contact moses@optimumscs.com for a discovery call.',
        path: '/about',
      },
      usedFallback: true,
    }
  }

  return {
    structured: {
      diagnosis: 'We need a bit more context to recommend the right service line.',
      solution:
        'OptimumSCS covers transport (TMS), procurement, ERP transformation, analytics, and consulting — often combined for end-to-end improvement.',
      impact: 'Clients typically see 6–25% improvement in cost, service, or reporting speed depending on the initiative.',
      nextStep:
        'Share which area is under pressure (transport, procurement, ERP, analytics), the measurable problem, and approximate monthly volume or spend.',
      path: '/solutions',
    },
    usedFallback: true,
  }
}

export function parseStructuredReply(text) {
  const fields = {}
  const patterns = [
    ['diagnosis', /Diagnosis:\s*([\s\S]*?)(?=\n(?:Recommended Solution|Expected Impact|Next Step):|$)/i],
    ['solution', /Recommended Solution:\s*([\s\S]*?)(?=\n(?:Expected Impact|Next Step):|$)/i],
    ['impact', /Expected Impact:\s*([\s\S]*?)(?=\nNext Step:|$)/i],
    ['nextStep', /Next Step:\s*([\s\S]*?)$/i],
  ]
  for (const [key, re] of patterns) {
    const m = text.match(re)
    if (m?.[1]?.trim()) fields[key] = m[1].trim()
  }
  if (fields.diagnosis || fields.solution) {
    return { ...fields, path: matchKnowledgeArea(text)?.path }
  }
  return null
}

export function buildActions(structured, userText = '') {
  const area = structured?.path ? null : matchKnowledgeArea(userText)
  const path = structured?.path || area?.path
  const caseStudy = structured?.caseStudy || area?.caseStudy || '/case-studies'
  const actions = []
  if (path) actions.push({ label: 'View Solution', path, kind: 'navigate' })
  actions.push({ label: 'Request Assessment', path: '/fee-quote', kind: 'quote' })
  actions.push({ label: 'Case Studies', path: caseStudy, kind: 'navigate' })
  return actions
}

export function buildWhatsAppUrl(summary) {
  const text = summary
    ? `Hello OptimumSCS, I'd like to discuss: ${summary.slice(0, 400)}`
    : 'Hello OptimumSCS, I would like to discuss a supply chain solution.'
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`
}

export function buildGuidedSummary(ctx) {
  const area = KB.find((a) => a.id === ctx.areaId)
  return [
    `Industry: ${ctx.industry}`,
    `Focus area: ${area?.label || ctx.areaId}`,
    `Main challenge: ${ctx.problem}`,
    `Scale: ${ctx.scale}`,
  ].join('\n')
}

export function saveQuotePrefill({ industry, scope }) {
  try {
    sessionStorage.setItem(
      QUOTE_PREFILL_KEY,
      JSON.stringify({ industry, scope, at: Date.now() }),
    )
  } catch {
    /* ignore */
  }
}

export function loadQuotePrefill() {
  try {
    const raw = sessionStorage.getItem(QUOTE_PREFILL_KEY)
    if (!raw) return null
    const data = JSON.parse(raw)
    if (Date.now() - data.at > 7 * 24 * 60 * 60 * 1000) {
      sessionStorage.removeItem(QUOTE_PREFILL_KEY)
      return null
    }
    return data
  } catch {
    return null
  }
}

export function clearQuotePrefill() {
  try {
    sessionStorage.removeItem(QUOTE_PREFILL_KEY)
  } catch {
    /* ignore */
  }
}

export function trackAskEvent(name, detail = {}) {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent('ask-optimum', { detail: { name, ...detail } }))
  if (typeof window.gtag === 'function') {
    window.gtag('event', name, { event_category: 'AskOptimumSCS', ...detail })
  }
}
