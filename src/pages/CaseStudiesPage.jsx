import './CaseStudiesPage.css'
import caseStudiesImg from '../assets/case-studies.png'
import { trustedResultCards } from '../components/data'
import { ResultCard } from '../components/Common'

export default function CaseStudiesPage() {
  return (
    <>
      <section className="case-hero-clean">
        <div className="case-hero-grid">
          <div className="case-hero-text">
            <h1>Case Studies</h1>
            <p>
             Explore how our solutions have transformed businesses for some of our clients, showcasing real results.
            </p>
          </div>

          <div className="case-hero-image">
            <img src={caseStudiesImg} alt="Case Studies" />
          </div>
        </div>
      </section>

      <section className="case-content-clean">
        <div className="case-container-clean">
          <div className="result-grid">
            {trustedResultCards.map((card) => (
              <ResultCard key={card.title} {...card} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}