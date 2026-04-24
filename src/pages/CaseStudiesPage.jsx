import { trustedResultCards } from '../components/data'
import { ResultCard, SectionHeading } from '../components/Common'

export default function CaseStudiesPage() {
  return (
    <section className="section first-section">
      <div className="container glass-panel large-panel">
        <SectionHeading title="Case Studies" subtitle="Selected case studies showcasing results delivered for our clients." />
        <div className="result-grid">
          {trustedResultCards.map((card) => <ResultCard key={card.title} {...card} />)}
        </div>
      </div>
    </section>
  )
}
