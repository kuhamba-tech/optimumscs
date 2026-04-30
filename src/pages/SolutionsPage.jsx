import { Link } from 'react-router-dom'
import './SolutionsPage.css'
import ourSolutionsImg from '../assets/our-solutions.jpg'

const solutions = [
  {
    title: 'ERP Transformation',
    slug: '/solutions/erp-transformation',
    subtitle: 'Integrate finance, operations and supply chain into a unified system.',
    outcome: 'Better cross-functional visibility',
  },
  {
    title: 'TMS Implementation',
    slug: '/solutions/tms-implementation',
    subtitle: 'Deploy and optimise transport management systems.',
    outcome: 'Streamlined transport operations',
  },
  {
    title: 'Procurement Services',
    slug: '/solutions/procurement-services',
    subtitle: 'Strengthen sourcing, supplier visibility and cost control.',
    outcome: 'Smarter sourcing decisions',
  },
  {
    title: 'Lean Materials Management',
    slug: '/solutions/lean-materials-management',
    subtitle: 'Reduce waste and improve material flow across operations.',
    outcome: 'Better material control',
  },
  {
    title: 'Warehouse Management',
    slug: '/solutions/warehouse-management',
    subtitle: 'Improve stock accuracy, warehouse flow and inventory control.',
    outcome: 'Higher warehouse efficiency',
  },
  {
    title: 'Data Analytics & Reporting',
    slug: '/solutions/data-analytics-reporting',
    subtitle: 'Turn operational data into insights, dashboards and reports.',
    outcome: 'Better business decisions',
  },
  {
    title: 'Consulting Services',
    slug: '/solutions/consulting-services',
    subtitle: 'Support supply chain improvement with practical expert guidance.',
    outcome: 'Improved operational strategy',
  },
]

export default function SolutionsPage() {
  return (
    <>
      <section className="solutions-hero-clean">
        <div className="solutions-container-clean">
          <div className="solutions-hero-grid">
            <div className="solutions-hero-text">
              <h1>Our Solutions</h1>
              <p>
                OptimumSCS delivers a comprehensive suite of solutions designed to
                optimise supply chains, enhance operational efficiency, and drive
                measurable business performance across industries.
              </p>
            </div>

            <div className="solutions-hero-image">
              <img src={ourSolutionsImg} alt="Our Solutions" />
            </div>
          </div>
        </div>
      </section>

      <section className="solutions-content-clean">
        <div className="solutions-container-clean">
          <div className="solutions-two-col-grid">
            {solutions.map((item) => (
              <article className="solution-panel" key={item.title}>
                <div className="solution-inner-card">
                  <div className="solution-inner-top">
                    <div className="solution-copy">
                      <h4>{item.title}</h4>
                      <p>{item.subtitle}</p>
                    </div>
                  </div>

                  <div className="solution-inner-bottom">
                    <p>
                      Outcome: <strong>{item.outcome}</strong>
                    </p>

                    <Link to={item.slug} className="btn btn-primary">
                      View Solution
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
