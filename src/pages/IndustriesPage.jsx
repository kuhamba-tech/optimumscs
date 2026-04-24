import { Hero, IndustryCard, ResultCard, SectionHeading } from '../components/Common'
import { industrySummaryCards, trustedResultCards } from '../components/data'

export default function IndustriesPage() {
  return (
    <>
      <Hero
        title={'Industries Overview'}
        subtitle={'Delivering tailored solutions to maximize efficiency and reduce costs across your supply chain'}
        primary={'Request Quote'}
        compact
      />

      <section className="section industries-section">
        <div className="container glass-panel large-panel panel-flush industries-serve-panel">
          <SectionHeading
            title="Industries We Serve"
            subtitle="Delivering measurable supply chain impact through data-driven, execution-focused and locally embedded solutions."
          />
          <div className="industry-grid">
            {industrySummaryCards.map((card) => <IndustryCard key={card.title} {...card} />)}
          </div>

          <div className="trusted-block">
            <SectionHeading title="Trusted by Industry Leaders" subtitle="Real results from real partnerships." />
            <div className="result-grid">
              {trustedResultCards.map((card) => <ResultCard key={card.title} {...card} />)}
            </div>
            <div className="logo-row">
              <span>CCBA</span>
              <span>Nebula Logistics
</span>
              <span>Opsi Systems
</span>
              <span>SANBS
</span>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
