import { Link } from 'react-router-dom'

const solutions = [
  {
    title: 'ERP Transformation',
    slug: '/solutions/erp-transformation',
    subtitle: 'Integrate finance, operations and supply chain into a unified system.',
    metric: '+20%',
    metricLabel: 'Control',
    outcome: 'Better cross-functional visibility',
  },
  {
    title: 'TMS Implementation',
    slug: '/solutions/tms-implementation',
    subtitle: 'Deploy and optimise transport management systems.',
    metric: '+20%',
    metricLabel: 'Efficiency',
    outcome: 'Streamlined transport operations',
  },
  {
    title: 'Procurement Services',
    slug: '/solutions/procurement-services',
    subtitle: 'Strengthen sourcing, supplier visibility and cost control.',
    metric: '+16%',
    metricLabel: 'Efficiency',
    outcome: 'Smarter sourcing decisions',
  },
  {
    title: 'Lean Materials Management',
    slug: '/solutions/lean-materials-management',
    subtitle: 'Reduce waste and improve material flow across operations.',
    metric: '+19%',
    metricLabel: 'Efficiency',
    outcome: 'Better material control',
  },
  {
    title: 'Warehouse Management',
    slug: '/solutions/warehouse-management',
    subtitle: 'Improve stock accuracy, warehouse flow and inventory control.',
    metric: '+22%',
    metricLabel: 'Efficiency',
    outcome: 'Higher warehouse efficiency',
  },
  {
    title: 'Data Analytics & Reporting',
    slug: '/solutions/data-analytics-reporting',
    subtitle: 'Turn operational data into insights, dashboards and reports.',
    metric: '+25%',
    metricLabel: 'Insights',
    outcome: 'Better business decisions',
  },
  {
    title: 'Consulting Services',
    slug: '/solutions/consulting-services',
    subtitle: 'Support supply chain improvement with practical expert guidance.',
    metric: '+21%',
    metricLabel: 'Performance',
    outcome: 'Improved operational strategy',
  },
]

export default function SolutionsPage() {
  return (
    <section className="section solutions-page first-section">
      <div className="container">
        <div className="page-title-row">
          <h1>Our Solutions</h1>
        </div>

        <p className="solutions-intro">
          OptimumSCS delivers a comprehensive suite of solutions designed to optimise supply chains,
          enhance operational efficiency, and drive measurable business performance across industries.
        </p>

        <div className="glass-card solutions-showcase-card">
          <div className="solutions-two-col-grid">
            {solutions.map((item) => (
              <article className="solution-panel" key={item.title}>
                <h3 className="solution-panel-title">{item.title}</h3>

                <div className="solution-inner-card">
                  <div className="solution-inner-top">
                    <div className="solution-copy">
                      <h4>{item.title}</h4>
                      <p>{item.subtitle}</p>
                    </div>

                    <div className="solution-metric">
                      <strong>{item.metric}</strong>
                      <span>{item.metricLabel}</span>
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
      </div>
    </section>
  )
}