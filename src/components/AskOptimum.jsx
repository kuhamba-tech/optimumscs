import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './AskOptimum.css'
import {
  KB,
  INDUSTRIES,
  SCALE_OPTIONS,
  PROBLEM_CHIPS,
  QUICK_CHIPS,
  SYSTEM_PROMPT,
  SESSION_KEY,
  buildActions,
  buildGuidedSummary,
  buildWhatsAppUrl,
  getBuiltInReply,
  matchKnowledgeArea,
  parseStructuredReply,
  saveQuotePrefill,
  trackAskEvent,
} from '../lib/askOptimumKnowledge'

const starterMessages = [
  {
    type: 'bot',
    text: "Hello! I'm your OptimumSCS AI supply chain consultant.\n\nStart with a quick assessment or describe your challenge below.",
  },
]

function BotStructured({ structured }) {
  return (
    <div className="ask-structured">
      {structured.diagnosis && (
        <p><strong>Diagnosis:</strong> {structured.diagnosis}</p>
      )}
      {structured.solution && (
        <p><strong>Recommended Solution:</strong> {structured.solution}</p>
      )}
      {structured.impact && (
        <p><strong>Expected Impact:</strong> {structured.impact}</p>
      )}
      {structured.nextStep && (
        <p><strong>Next Step:</strong> {structured.nextStep}</p>
      )}
    </div>
  )
}

function botMessageFromReply(replyText, userText, { offline = false } = {}) {
  const parsed = parseStructuredReply(replyText)
  const area = matchKnowledgeArea(userText)
  if (parsed) {
    const structured = { ...parsed, path: parsed.path || area?.path }
    return {
      type: 'bot',
      structured,
      actions: buildActions(structured, userText),
      offline,
    }
  }
  const fallback = getBuiltInReply(userText)
  return {
    type: 'bot',
    text: replyText,
    structured: offline ? fallback.structured : null,
    actions: buildActions(fallback.structured, userText),
    offline,
  }
}

async function callAssistant(history) {
  const res = await fetch('/api/ask-optimum', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: history, system: SYSTEM_PROMPT }),
  })

  if (res.status === 503) throw new Error('no-key')
  if (!res.ok) throw new Error(`api-${res.status}`)
  const data = await res.json()
  return data.text
}

export default function AskOptimumSCS() {
  const navigate = useNavigate()
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [mode, setMode] = useState('menu')
  const [guidedStep, setGuidedStep] = useState(0)
  const [guidedContext, setGuidedContext] = useState({})
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState(starterMessages)
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState([])
  const [userMessageCount, setUserMessageCount] = useState(0)
  const [offlineMode, setOfflineMode] = useState(false)
  const [errorHint, setErrorHint] = useState('')
  const bodyRef = useRef(null)
  const panelRef = useRef(null)
  const launcherRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('ask') === '1' || params.get('ask') === 'open' || window.location.hash === '#ask') {
      setOpen(true)
      setMode('menu')
    }
  }, [])

  const persistSession = useCallback((next) => {
    try {
      sessionStorage.setItem(
        SESSION_KEY,
        JSON.stringify({
          messages: next.messages,
          history: next.history,
          userMessageCount: next.userMessageCount,
          guidedContext: next.guidedContext,
          mode: next.mode === 'menu' ? 'ai' : next.mode,
        }),
      )
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY)
      if (!raw) return
      const saved = JSON.parse(raw)
      if (saved.messages?.length) {
        setMessages(saved.messages)
        setHistory(saved.history || [])
        setUserMessageCount(saved.userMessageCount || 0)
        if (saved.guidedContext) setGuidedContext(saved.guidedContext)
      }
    } catch {
      /* ignore */
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') closeChat(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [messages, loading])

  useEffect(() => {
    if (open && mode === 'ai') {
      inputRef.current?.focus()
    }
  }, [open, mode])

  const pageContext = useCallback(() => {
    const path = location.pathname
    if (path.includes('tms')) return 'User is viewing TMS solutions.'
    if (path.includes('erp')) return 'User is viewing ERP transformation.'
    if (path.includes('procurement')) return 'User is viewing procurement services.'
    if (path.includes('analytics') || path.includes('data-analytics')) {
      return 'User is viewing data analytics & reporting.'
    }
    if (path.includes('case-studies')) return 'User is viewing case studies.'
    if (path.includes('industries')) return 'User is browsing industries.'
    return ''
  }, [location.pathname])

  const resetConversation = () => {
    setMessages(starterMessages)
    setHistory([])
    setUserMessageCount(0)
    setGuidedContext({})
    setOfflineMode(false)
    setErrorHint('')
    try {
      sessionStorage.removeItem(SESSION_KEY)
    } catch {
      /* ignore */
    }
  }

  const closeChat = (trackClose = true) => {
    if (trackClose) trackAskEvent('widget_close')
    setOpen(false)
    setMode('menu')
    setGuidedStep(0)
    setInput('')
    launcherRef.current?.focus()
  }

  const goToQuote = (scopeExtra = '') => {
    const area = KB.find((a) => a.id === guidedContext.areaId)
    const scope = [
      scopeExtra,
      guidedContext.industry && `Industry: ${guidedContext.industry}`,
      area?.service && `Service interest: ${area.service}`,
      guidedContext.problem && `Challenge: ${guidedContext.problem}`,
      guidedContext.scale && `Scale: ${guidedContext.scale}`,
    ]
      .filter(Boolean)
      .join('\n')

    saveQuotePrefill({
      industry: guidedContext.industry || '',
      scope: scope || 'Supply chain assessment requested via AskOptimumSCS.',
    })
    trackAskEvent('cta_quote')
    closeChat(false)
    navigate('/fee-quote')
  }

  const runAssistant = async (userText, contextPrefix = '') => {
    const fullUserText = contextPrefix ? `${contextPrefix}\n\n${userText}` : userText
    const newHistory = [...history, { role: 'user', content: fullUserText }]
    setLoading(true)
    setErrorHint('')

    try {
      const reply = await callAssistant(newHistory)
      setOfflineMode(false)
      const botMsg = botMessageFromReply(reply, userText)
      const nextHistory = [...newHistory, { role: 'assistant', content: reply }]
      setHistory(nextHistory)
      setMessages((prev) => {
        const next = [...prev, botMsg]
        persistSession({
          messages: next,
          history: nextHistory,
          userMessageCount: userMessageCount + 1,
          guidedContext,
          mode: 'ai',
        })
        return next
      })
      trackAskEvent('ai_reply', { offline: false })
    } catch (err) {
      setOfflineMode(true)
      const code = err.message || 'error'
      if (code === 'no-key') {
        setErrorHint(
          'Live AI needs a valid Anthropic API key in .env (ANTHROPIC_API_KEY). Showing guided recommendations until it is configured.',
        )
      } else if (code.startsWith('api-429')) {
        setErrorHint('High demand — please retry in a moment or use WhatsApp.')
      } else {
        setErrorHint('Connection issue — showing guided recommendations.')
      }

      const fallback = getBuiltInReply(userText)
      const botMsg = {
        type: 'bot',
        structured: fallback.structured,
        actions: buildActions(fallback.structured, userText),
        offline: true,
      }
      const replyText = [
        fallback.structured.diagnosis && `Diagnosis: ${fallback.structured.diagnosis}`,
        fallback.structured.solution && `Recommended Solution: ${fallback.structured.solution}`,
        fallback.structured.impact && `Expected Impact: ${fallback.structured.impact}`,
        fallback.structured.nextStep && `Next Step: ${fallback.structured.nextStep}`,
      ]
        .filter(Boolean)
        .join('\n\n')

      const nextHistory = [...newHistory, { role: 'assistant', content: replyText }]
      setHistory(nextHistory)
      setMessages((prev) => [...prev, botMsg])
      trackAskEvent('ai_reply', { offline: true })
    } finally {
      setLoading(false)
    }
  }

  const sendMessage = async (text = input) => {
    const cleanText = text.trim()
    if (!cleanText || loading) return

    setMessages((prev) => [...prev, { type: 'user', text: cleanText }])
    setInput('')
    setUserMessageCount((c) => c + 1)
    trackAskEvent('message_sent')

    const ctx = pageContext()
    await runAssistant(cleanText, ctx)
  }

  const completeGuidedFlow = async (ctx) => {
    const summary = buildGuidedSummary(ctx)
    setGuidedContext(ctx)
    setMode('ai')
    setMessages((prev) => [
      ...prev,
      { type: 'user', text: summary },
    ])
    setUserMessageCount(1)
    trackAskEvent('guided_complete', { area: ctx.areaId })
    await runAssistant(summary, pageContext())
  }

  const handleAction = (action, lastUserText = '') => {
    if (action.kind === 'quote') {
      goToQuote(lastUserText)
      return
    }
    if (action.label === 'WhatsApp' || action.kind === 'whatsapp') {
      trackAskEvent('cta_whatsapp')
      return
    }
    trackAskEvent('cta_navigate', { path: action.path })
    closeChat(false)
    navigate(action.path)
  }

  const startGuided = () => {
    resetConversation()
    setMode('guided')
    setGuidedStep(0)
    trackAskEvent('guided_start')
  }

  const startFreeChat = () => {
    setMode('ai')
    trackAskEvent('mode_ai')
  }

  const whatsappBase = buildWhatsAppUrl(
    messages.filter((m) => m.type === 'user').map((m) => m.text).slice(-2).join(' | '),
  )

  const showChips = userMessageCount === 0 && !loading

  return (
    <div className="ask-optimum">
      {open && (
        <div
          className="ask-panel"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="ask-optimum-title"
        >
          <div className="ask-header">
            <div>
              <strong id="ask-optimum-title">AskOptimumSCS</strong>
              <span>Supply Chain Consultant</span>
            </div>
            <button type="button" className="ask-close" onClick={() => closeChat()} aria-label="Close">
              ×
            </button>
          </div>

          {mode === 'menu' && (
            <div className="ask-body ask-menu-body">
              <p className="ask-menu-intro">How can we help optimise your supply chain today?</p>

              <div className="ask-menu-options">
                <button type="button" className="ask-menu-option ask-option-ai" onClick={startGuided}>
                  <span className="ask-menu-icon ask-icon-ai">AI</span>
                  <span className="ask-menu-copy">
                    <span className="ask-menu-title">
                      Quick assessment (recommended)
                      <em className="ask-menu-badge">4 questions</em>
                    </span>
                    <small>Industry, focus area, challenge, and scale — then instant recommendation</small>
                  </span>
                </button>

                <button type="button" className="ask-menu-option ask-option-ai-secondary" onClick={startFreeChat}>
                  <span className="ask-menu-icon ask-icon-chat">Chat</span>
                  <span className="ask-menu-copy">
                    <span className="ask-menu-title">Free-form AI chat</span>
                    <small>Describe your challenge in your own words</small>
                  </span>
                </button>

                <a
                  className="ask-menu-option ask-option-wa"
                  href={whatsappBase}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackAskEvent('cta_whatsapp')}
                >
                  <span className="ask-menu-icon ask-icon-wa">WA</span>
                  <span className="ask-menu-copy">
                    <span className="ask-menu-title">Talk to an OptimumSCS Expert</span>
                    <small>Chat directly with our team on WhatsApp</small>
                  </span>
                </a>

                <button type="button" className="ask-menu-option ask-option-quote" onClick={() => goToQuote()}>
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

          {mode === 'guided' && (
            <>
              <div className="ask-ai-toolbar">
                <button type="button" onClick={() => { setMode('menu'); setGuidedStep(0) }}>
                  ← Back
                </button>
                <span>Quick assessment · Step {guidedStep + 1} of 4</span>
              </div>
              <div className="ask-body ask-guided-body">
                {guidedStep === 0 && (
                  <>
                    <p className="ask-guided-prompt">Which industry best describes your business?</p>
                    <div className="ask-guided-grid">
                      {INDUSTRIES.map((ind) => (
                        <button
                          key={ind}
                          type="button"
                          className="ask-guided-btn"
                          onClick={() => {
                            setGuidedContext((c) => ({ ...c, industry: ind }))
                            setGuidedStep(1)
                          }}
                        >
                          {ind}
                        </button>
                      ))}
                    </div>
                  </>
                )}
                {guidedStep === 1 && (
                  <>
                    <p className="ask-guided-prompt">Which area needs the most attention?</p>
                    <div className="ask-guided-grid">
                      {KB.map((area) => (
                        <button
                          key={area.id}
                          type="button"
                          className="ask-guided-btn"
                          onClick={() => {
                            setGuidedContext((c) => ({ ...c, areaId: area.id }))
                            setGuidedStep(2)
                          }}
                        >
                          {area.label}
                        </button>
                      ))}
                    </div>
                  </>
                )}
                {guidedStep === 2 && (
                  <>
                    <p className="ask-guided-prompt">What is the main challenge?</p>
                    <div className="ask-guided-grid">
                      {PROBLEM_CHIPS.map((p) => (
                        <button
                          key={p}
                          type="button"
                          className="ask-guided-btn"
                          onClick={() => {
                            setGuidedContext((c) => ({ ...c, problem: p }))
                            setGuidedStep(3)
                          }}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  </>
                )}
                {guidedStep === 3 && (
                  <>
                    <p className="ask-guided-prompt">Approximate monthly supply chain spend?</p>
                    <div className="ask-guided-grid">
                      {SCALE_OPTIONS.map((s) => (
                        <button
                          key={s}
                          type="button"
                          className="ask-guided-btn"
                          onClick={() => completeGuidedFlow({ ...guidedContext, scale: s })}
                          disabled={loading}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </>
          )}

          {mode === 'ai' && (
            <>
              <div className="ask-ai-toolbar">
                <button type="button" onClick={() => setMode('menu')}>← Back</button>
                <span>
                  AI Consultant
                  {offlineMode && <em className="ask-offline-badge">Guided mode</em>}
                </span>
                <button type="button" className="ask-clear-chat" onClick={resetConversation}>
                  Clear
                </button>
              </div>

              {errorHint && <p className="ask-error-hint" role="status">{errorHint}</p>}

              <div className="ask-body" ref={bodyRef} aria-live="polite">
                {messages.map((msg, i) => (
                  <div key={i} className={`ask-message ${msg.type}`}>
                    {msg.structured ? (
                      <BotStructured structured={msg.structured} />
                    ) : (
                      <div>{msg.text}</div>
                    )}
                    {msg.offline && <span className="ask-offline-note">Guided recommendation</span>}
                    {msg.actions?.length > 0 && (
                      <div className="ask-actions">
                        {msg.actions.map((a) => (
                          <button
                            key={`${a.label}-${a.path}`}
                            type="button"
                            onClick={() => handleAction(a, messages.filter((m) => m.type === 'user').at(-1)?.text)}
                          >
                            {a.label}
                          </button>
                        ))}
                        <a
                          className="ask-action-wa"
                          href={buildWhatsAppUrl(
                            messages.filter((m) => m.type === 'user').map((m) => m.text).slice(-1)[0],
                          )}
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => trackAskEvent('cta_whatsapp')}
                        >
                          WhatsApp
                        </a>
                      </div>
                    )}
                  </div>
                ))}

                {loading && (
                  <div className="ask-message bot">
                    <div className="ask-typing"><span /><span /><span /></div>
                  </div>
                )}

                {showChips && (
                  <div className="ask-chips">
                    {QUICK_CHIPS.map((chip) => (
                      <button key={chip} type="button" onClick={() => sendMessage(chip)} disabled={loading}>
                        {chip}
                      </button>
                    ))}
                    <button type="button" className="ask-chip-quote" onClick={() => goToQuote()} disabled={loading}>
                      Request a Quote
                    </button>
                  </div>
                )}
              </div>

              <p className="ask-disclaimer">
                AI guidance only — final scope and pricing are confirmed by OptimumSCS.
              </p>

              <div className="ask-input-row">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      sendMessage()
                    }
                  }}
                  placeholder="Describe your supply chain challenge..."
                  disabled={loading}
                  aria-label="Your message"
                />
                <button type="button" onClick={() => sendMessage()} disabled={loading || !input.trim()}>
                  {loading ? '…' : 'Send'}
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {!open && (
        <button
          ref={launcherRef}
          type="button"
          className="ask-launcher"
          onClick={() => {
            setOpen(true)
            trackAskEvent('widget_open')
          }}
          aria-expanded={open}
          aria-haspopup="dialog"
        >
          <span>AskOptimumSCS</span>
          <strong>AI</strong>
        </button>
      )}
    </div>
  )
}
