import { useState, useEffect } from 'react'
import { Hero, FeatureCard, StepBar, IndustryCard, SectionHeading } from '../components/Common'
import { homeFeatureCards, approachSteps, industrySummaryCards } from '../components/data'

import transportImg from '../assets/transport.png'
import analyticsImg from '../assets/data.png'
import warehouseImg from '../assets/warehouse.png'
import procurementImg from '../assets/procurement.png'
import erpImg from '../assets/erp.png'
import homepageOptimumLogo from '../assets/homepage-optimum-logo.png'

export default function HomePage() {
  const solutionSlides = [
    { title: 'Transport Optimization', image: transportImg },
    { title: 'Data Analytics', image: analyticsImg },
    { title: 'Warehouse Optimization', image: warehouseImg },
    { title: 'Procurement Systems', image: procurementImg },
    { title: 'ERP Transformation', image: erpImg },
  ]

  const [activeSlide, setActiveSlide] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)

      setTimeout(() => {
        setActiveSlide((prev) => (prev + 1) % solutionSlides.length)
        setIsVisible(true)
      }, 500)
    }, 8000)

    return () => clearInterval(interval)
  }, [solutionSlides.length])

  return (
    <>
      <Hero
        title={'Transforming Supply Chains<br />with Data, Technology & Intelligence'}
        subtitle={'Specialists in fast-moving consumer goods supply chains, where scale, speed, and visibility matter most.'}
        primary={'Request Quote'}
        secondary={'View Solutions'}
        image={homepageOptimumLogo}
        blendImage
      />

      <section className="section home-top-pad">
        <div className="container">
          <div className="feature-grid four-col overlap-top">
            {homeFeatureCards.map((card) => (
              <FeatureCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-tight">
        <div className="container">
          <SectionHeading title="Our Approach" />
          <StepBar items={approachSteps} />
        </div>
      </section>

      <section className="section">
        <div className="container glass-panel large-panel panel-flush industries-serve-panel">
          <SectionHeading
            title="Industries We Serve"
            subtitle="Delivering measurable supply chain impact through data-driven, execution-focused and locally embedded solutions."
          />
          <div className="industry-grid">
            {industrySummaryCards.map((card) => (
              <IndustryCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-topless">
        <div className="container two-col-split proven-results-grid">
          <div className="glass-card image-panel">
            <h2>Proven Results</h2>

            <div className={`solution-image-box ${isVisible ? 'fade-in' : 'fade-out'}`}>
              <img
                src={solutionSlides[activeSlide].image}
                alt={solutionSlides[activeSlide].title}
                className="solution-image"
              />
            </div>
          </div>

          <div className="glass-card case-highlight">
            <div className="case-top">
              <h3>Client: FMCG Company</h3>
              <div className="tag-pill">South Africa</div>
            </div>

            <p><strong>Problem:</strong> High delivery costs</p>
            <p><strong>Solution:</strong> Route optimization</p>

            <div className="hero-result-box">
              <div className="result-word">Result:</div>
              <div className="result-figure green-box">
                <strong>↑18%</strong>
                <span></span>
              </div>
            </div>

            <a href="/case-studies" className="btn btn-secondary block-btn">
              View More Case Studies
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
