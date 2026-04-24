export default function FeeQuotePage() {
  return (
    <section className="section first-section">
      <div className="container two-col-split">
        <div className="glass-card quote-card">
          <div className="section-heading left">
            <h1>Request a Fee Quote</h1>
            <p>  Receive a tailored estimate for your route optimisation, TMS implementation,
  procurement, warehouse management, data analytics, and supply chain consulting services.</p>
          </div>
          <ul className="quote-list">
                
  <li>TMS Implementation</li>
  <li>Procurement Services</li>
  <li>Lean Materials Management</li>
  <li>Warehouse Management</li>
    <li>ERP Transformation</li>
  <li>Data Analytics & Reporting</li>
  <li>Consulting Services</li>
          </ul>
        </div>
        <form className="glass-card contact-form-card">
          <div className="form-grid">
            <label><span>Name</span><input type="text" placeholder="Your full name" /></label>
            <label><span>Company</span><input type="text" placeholder="Company name" /></label>
            <label><span>Email</span><input type="email" placeholder="name@company.com" /></label>
            <label><span>Industry</span><input type="text" placeholder="FMCG, Logistics, Healthcare..." /></label>
            <label className="full"><span>Scope of Work</span><textarea rows="6" placeholder="Outline the scale, systems, and outcomes required" /></label>
          </div>
          <button type="button" className="btn btn-primary">Request Quote</button>
        </form>
      </div>
    </section>
  )
}
