import { useMemo, useState } from 'react'

const whatsappUrl =
  'https://wa.me/27739370249?text=Hello%20OptimumSCS%2C%20I%20would%20like%20to%20discuss%20a%20supply%20chain%20solution.'

const quoteUrl = '/fee-quote'

const promptResponses = {
  'I have high delivery costs': {
    diagnosis:
      'Delivery cost is likely being driven by route inefficiency, low fleet utilisation, manual dispatch planning, or poor transport visibility.',
    solution:
      'Transport Optimization and TMS Implementation using tools such as Opsi TMS, BlueYonder TMS, or Ignition TMS.',
    impact:
      'Typical impact: 6-12% reduction in transport costs, improved delivery performance, and better fleet efficiency.',
    nextStep:
      'Request a transport optimization assessment with monthly delivery volumes, transport spend, and delivery regions.',
  },
  'I need TMS implementation': {
    diagnosis:
      'Transport planning may be limited by manual dispatch, weak route control, poor delivery tracking, or disconnected transport data.',
    solution:
      'TMS Implementation using platforms such as Opsi TMS, BlueYonder TMS, or Ignition TMS, integrated with operational workflows and reporting.',
    impact:
      'Typical impact: 6-12% transport cost improvement, stronger delivery visibility, better route compliance, and improved fleet utilisation.',
    nextStep:
      'Request a TMS readiness assessment with current transport process, delivery volumes, fleet profile, and system landscape.',
  },
  'I need procurement services': {
    diagnosis:
      'Procurement performance may be constrained by uncontrolled spend, weak supplier management, limited approval control, or manual buying processes.',
    solution:
      'Procurement Services focused on supplier management, sourcing workflows, purchasing controls, spend visibility, and procurement process improvement.',
    impact:
      'Typical impact: improved cost control, stronger supplier performance, reduced manual effort, and better spend governance.',
    nextStep:
      'Request a procurement assessment and share spend categories, supplier base, and approval workflow issues.',
  },
  'I need procurement services support': {
    diagnosis:
      'Procurement performance may be limited by weak supplier controls, manual approvals, spend leakage, or poor purchasing visibility.',
    solution:
      'Procurement Services improvement covering sourcing, supplier management, purchasing controls, spend visibility, and process governance.',
    impact:
      'Typical impact: stronger supplier performance, improved cost control, fewer manual delays, and better procurement efficiency.',
    nextStep:
      'Request a procurement services review with spend categories, supplier base, approval workflows, and cost-control priorities.',
  },
  'I need ERP transformation': {
    diagnosis:
      'Disconnected systems, duplicate data, and manual workflows may be limiting operational control and real-time visibility.',
    solution:
      'ERP Transformation using platforms such as Microsoft Dynamics 365, with integration across finance, procurement, inventory, logistics, and operations.',
    impact:
      'Typical impact: stronger process control, fewer manual errors, faster reporting cycles, and improved end-to-end visibility.',
    nextStep:
      'Request an ERP readiness assessment and share your current ERP, key pain points, and affected teams.',
  },
  'I need data analytics and reporting': {
    diagnosis:
      'Slow reporting and limited KPI visibility may be delaying decisions and hiding supply chain exceptions.',
    solution:
      'Data Analytics & Reporting using Power BI dashboards, operational KPI reporting, and exception management.',
    impact:
      'Typical impact: 15-25% faster reporting, improved decision speed, and clearer visibility into cost, service, inventory, and delivery performance.',
    nextStep:
      'Request a data visibility assessment and share the KPIs, source systems, and reporting frequency required.',
  },
  'I need consulting services': {
    diagnosis:
      'Your supply chain challenge may require structured diagnosis before choosing between transport, procurement services, ERP, analytics, or operating model changes.',
    solution:
      'Consulting Services to assess the current state, quantify the performance gap, design the improvement roadmap, and support execution.',
    impact:
      'Typical impact: clearer priorities, measurable improvement roadmap, reduced execution risk, and better alignment between operations, systems, and cost targets.',
    nextStep:
      'Request a consulting discovery session and share the business area, monthly volume, cost pressure, and target outcomes.',
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
              <span>Supply Chain Consultant</span>
            </div>
            <button type="button" onClick={closePanel} aria-label="Close assistant" title="Close">x</button>
          </div>

          {mode === 'menu' && (
            <div className="optimum-widget-content">
              <p className="optimum-widget-intro">
                How can we help optimise your supply chain today?
              </p>
              <p className="optimum-widget-personal-note">
                Based on your interest in logistics, we recommend starting with AI.
              </p>
              <div className="optimum-widget-options">
                <button type="button" className="primary-option" onClick={() => setMode('ai')}>
                  <span className="option-icon" aria-hidden="true">AI</span>
                  <span className="option-copy">
                    <span className="option-title-row">
                      <span>Get Instant AI Consultant Recommendation</span>
                      <em>Recommended</em>
                    </span>
                    <small>Answer a few questions and get the best-fit solution in seconds</small>
                  </span>
                </button>
                <a className="secondary-option" href={whatsappUrl} target="_blank" rel="noreferrer">
                  <span className="option-icon" aria-hidden="true">WA</span>
                  <span className="option-copy">
                    <span>Talk to an OptimumSCS Expert</span>
                    <small>Chat directly with our team for tailored advice</small>
                  </span>
                </a>
                <a className="quote-option" href={quoteUrl}>
                  <span className="option-icon" aria-hidden="true">Q</span>
                  <span className="option-copy">
                    <span>Request a Quote</span>
                    <small>Share your scope and receive a tailored estimate</small>
                  </span>
                </a>
              </div>
              <p className="optimum-widget-trust">
                Trusted by FMCG, Logistics & Manufacturing companies.
              </p>
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
        title="Get instant supply chain advice"
      >
        <span>AskOptimumSCS</span>
        <strong>AI</strong>
      </button>
    </div>
  )
}
