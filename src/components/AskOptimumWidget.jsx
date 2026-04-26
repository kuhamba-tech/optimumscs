import { useMemo, useState } from 'react'

const whatsappUrl =
  'https://wa.me/27739370249?text=Hello%20OptimumSCS%2C%20I%20would%20like%20to%20discuss%20a%20supply%20chain%20solution.'

const promptResponses = {
  'I have high delivery costs': {
    diagnosis:
      'Delivery cost is likely being driven by route inefficiency, low fleet utilisation, manual dispatch planning, or poor transport visibility.',
    solution:
      'Transport Optimization and TMS Implementation using tools such as Opsi TMS, BlueYonder TMS, or Ignition TMS.',
    impact:
      'Typical impact: 10-25% reduction in transport costs, improved delivery performance, and better fleet efficiency.',
    nextStep:
      'Request a transport optimization assessment with monthly delivery volumes, transport spend, and delivery regions.',
  },
  'I need ERP support': {
    diagnosis:
      'Disconnected systems, duplicate data, and manual workflows may be limiting operational control and real-time visibility.',
    solution:
      'ERP Transformation using platforms such as Microsoft Dynamics 365, with integration across finance, procurement, inventory, logistics, and operations.',
    impact:
      'Typical impact: stronger process control, fewer manual errors, faster reporting cycles, and improved end-to-end visibility.',
    nextStep:
      'Request an ERP readiness assessment and share your current ERP, key pain points, and affected teams.',
  },
  'I need transport optimization': {
    diagnosis:
      'Transport operations may be underperforming due to inefficient route planning, delivery delays, manual scheduling, or weak cost-to-serve visibility.',
    solution:
      'Transport Optimization with route planning, delivery scheduling, fleet utilisation analysis, and TMS implementation.',
    impact:
      'Typical impact: 10-25% lower transport cost and measurable improvement in delivery reliability.',
    nextStep:
      'Request a transport optimization assessment and provide trip volumes, fleet profile, and current delivery KPIs.',
  },
  'I need better dashboards': {
    diagnosis:
      'Slow reporting and limited KPI visibility may be delaying decisions and hiding supply chain exceptions.',
    solution:
      'Data Analytics & Reporting using Power BI dashboards, operational KPI reporting, and exception management.',
    impact:
      'Typical impact: 30-60% faster reporting, improved decision speed, and clearer visibility into cost, service, inventory, and delivery performance.',
    nextStep:
      'Request a data visibility assessment and share the KPIs, source systems, and reporting frequency required.',
  },
  'I need warehouse optimization': {
    diagnosis:
      'Warehouse inefficiency may be caused by poor layout, picking delays, inventory inaccuracies, or weak workflow control.',
    solution:
      'Warehouse Optimization covering layout, picking productivity, inventory accuracy, WMS readiness, and fulfilment workflow improvement.',
    impact:
      'Typical impact: faster fulfilment, improved inventory control, fewer picking errors, and better warehouse efficiency.',
    nextStep:
      'Request a warehouse efficiency review with SKU count, monthly order lines, and current accuracy or productivity issues.',
  },
  'I need procurement improvement': {
    diagnosis:
      'Procurement performance may be constrained by uncontrolled spend, weak supplier management, or manual purchasing processes.',
    solution:
      'Procurement Systems improvement focused on supplier management, purchasing workflows, sourcing controls, and spend visibility.',
    impact:
      'Typical impact: improved cost control, stronger supplier performance, and better procurement efficiency.',
    nextStep:
      'Request a procurement assessment and share spend categories, supplier base, and approval workflow issues.',
  },
}

const quickPrompts = Object.keys(promptResponses)

function ConsultantResponse({ response }) {
  if (!response) return null

  return (
    <div className="optimum-widget-response">
      <p><strong>Diagnosis:</strong> {response.diagnosis}</p>
      <p><strong>Recommended Solution:</strong> {response.solution}</p>
      <p><strong>Expected Impact:</strong> {response.impact}</p>
      <p><strong>Next Step:</strong> {response.nextStep}</p>
    </div>
  )
}

export default function AskOptimumWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [mode, setMode] = useState('menu')
  const [selectedPrompt, setSelectedPrompt] = useState('')

  const selectedResponse = useMemo(
    () => promptResponses[selectedPrompt],
    [selectedPrompt]
  )

  const closePanel = () => {
    setIsOpen(false)
    setMode('menu')
    setSelectedPrompt('')
  }

  const choosePrompt = (prompt) => {
    setSelectedPrompt(prompt)
    setMode('ai')
  }

  return (
    <div className="optimum-widget">
      {isOpen && (
        <div className="optimum-widget-panel" role="dialog" aria-label="AskOptimumSCS contact assistant">
          <div className="optimum-widget-header">
            <div>
              <strong>AskOptimumSCS</strong>
              <span>Supply Chain Contact Consultant</span>
            </div>
            <button type="button" onClick={closePanel} aria-label="Close assistant">x</button>
          </div>

          {mode === 'menu' && (
            <div className="optimum-widget-content">
              <p className="optimum-widget-intro">
                Choose how you would like to engage with OptimumSCS.
              </p>
              <div className="optimum-widget-options">
                <button type="button" onClick={() => setMode('ai')}>
                  <span>Ask AI Consultant</span>
                  <small>Get a guided supply chain recommendation</small>
                </button>
                <a href={whatsappUrl} target="_blank" rel="noreferrer">
                  <span>Chat on WhatsApp</span>
                  <small>Speak to OptimumSCS directly</small>
                </a>
              </div>
            </div>
          )}

          {mode === 'ai' && (
            <div className="optimum-widget-content">
              <div className="optimum-widget-toolbar">
                <button type="button" onClick={() => setMode('menu')}>Back</button>
                <span>Ask AI Consultant</span>
              </div>

              <p className="optimum-widget-intro">
                Select the closest challenge. Responses are structured for diagnosis, solution, impact, and next step.
              </p>

              <div className="optimum-widget-prompts">
                {quickPrompts.map((prompt) => (
                  <button
                    type="button"
                    key={prompt}
                    className={selectedPrompt === prompt ? 'active' : ''}
                    onClick={() => choosePrompt(prompt)}
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              <ConsultantResponse response={selectedResponse} />
            </div>
          )}
        </div>
      )}

      <button
        type="button"
        className="optimum-widget-launcher"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
      >
        <span>AskOptimumSCS</span>
        <strong>AI</strong>
      </button>
    </div>
  )
}
