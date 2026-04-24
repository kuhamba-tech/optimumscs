import React from 'react'
import { ArrowRight } from './Icons'
import optimumLogo from '../assets/optimum-logo.png'

export function Button({ children, variant = 'primary', to = '#', className = '' }) {
  const Comp = to.startsWith('/') ? 'a' : 'a'
  return (
    <Comp href={to} className={`btn btn-${variant} ${className}`.trim()}>
      {children}
    </Comp>
  )
}

export function Hero({ title, subtitle, primary, secondary, visual = 'globe', compact = false }) {
  return (
    <section className={`hero-section ${compact ? 'hero-compact' : ''}`}>
      <div className="container hero-grid">
        <div className="hero-copy">
          <h1 dangerouslySetInnerHTML={{ __html: title }} />
          <p>{subtitle}</p>
          {(primary || secondary) && (
            <div className="hero-actions">
              {primary && <Button to="/fee-quote" variant="primary">{primary}</Button>}
        {secondary && <Button to="/solutions" variant="primary">{secondary}</Button>}
            </div>
          )}
        </div>
        <div className="hero-visual-box">
  <img
    src={optimumLogo}
    alt="Optimum Supply Chain Solutions"
    className="hero-logo-image"
  />
</div>
      </div>
    </section>
  )
}

export function FeatureCard({ title, description, icon: Icon, accent = 'blue' }) {
  return (
    <article className="glass-card feature-card">
      <div className={`round-icon ${accent}`}><Icon /></div>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </article>
  )
}

export function StepBar({ items }) {
  return (
    <div className="glass-card process-bar">
      {items.map((item, index) => {
        const Icon = item.icon
        return (
          <React.Fragment key={item.label}>
            <div className="process-step">
              <div className={`mini-round ${item.accent}`}><Icon /></div>
              <span>{item.label}</span>
            </div>
            {index < items.length - 1 && <ArrowRight />}
          </React.Fragment>
        )
      })}
    </div>
  )
}

export function IndustryCard({ title, metric, statLabel, points, accent, icon: Icon }) {
  return (
    <article className={`industry-card accent-${accent}`}>
      <div className="industry-card-head"><h3>{title}</h3></div>
      <div className="industry-card-body">
        <div className="industry-icon-wrap"><Icon /></div>
        <div className="industry-metric">{metric}</div>
        <div className="industry-stat">{statLabel}</div>
        <ul>
          {points.map((point) => <li key={point}>{point}</li>)}
        </ul>
      </div>
    </article>
  )
}

export function ResultCard({ title, problem, solution, result, resultLabel, accent, icon: Icon }) {
  return (
    <article className="glass-card result-card">
      <div className="result-icon"><Icon /></div>
      <h3>{title}</h3>
      <div className={`case-copy accent-text-${accent}`}>
        <strong>Problem:</strong>
        <p>{problem}</p>
      </div>
      <div className={`case-copy accent-text-${accent}`}>
        <strong>Solution:</strong>
        <p>{solution}</p>
      </div>
      <div className={`result-pill accent-bg-${accent}`}>
        <span>Result:</span>
        <strong>{result}</strong>
        <small>{resultLabel}</small>
      </div>
    </article>
  )
}

export function SectionHeading({ title, subtitle, center = true }) {
  return (
    <div className={`section-heading ${center ? 'center' : ''}`}>
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  )
}
