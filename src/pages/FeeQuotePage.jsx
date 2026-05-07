const quotePageContent = {
  title: "Request a Fee Quote",
  description:
    "Receive a tailored estimate for your route optimisation, TMS implementation, procurement services, data analytics, and supply chain consulting services.",
  services: [
    "TMS Implementation",
    "Procurement Services",
    "ERP Transformation",
    "Data Analytics & Reporting",
    "Consulting Services",
  ],
  recipientEmail: "info@optimumscs.com",
  buttonText: "Send Quote",
};

export default function FeeQuotePage() {
  return (
    <section className="section first-section">
      <div className="container two-col-split">
        <div className="glass-card quote-card">
          <div className="section-heading left">
            <h1>{quotePageContent.title}</h1>
            <p>{quotePageContent.description}</p>
          </div>

          <ul className="quote-list">
            {quotePageContent.services.map((service) => (
              <li key={service}>{service}</li>
            ))}
          </ul>
        </div>

        <form
          className="glass-card contact-form-card"
          action={`mailto:${quotePageContent.recipientEmail}`}
          method="post"
          encType="text/plain"
        >
          <div className="form-grid">
            <label>
              <span>Name</span>
              <input
                name="Name"
                type="text"
                placeholder="Your full name"
                required
              />
            </label>

            <label>
              <span>Company</span>
              <input
                name="Company"
                type="text"
                placeholder="Company name"
              />
            </label>

            <label>
              <span>Email</span>
              <input
                name="Email"
                type="email"
                placeholder="name@company.com"
                required
              />
            </label>

            <label>
              <span>Industry</span>
              <input
                name="Industry"
                type="text"
                placeholder="FMCG, Logistics, Healthcare..."
              />
            </label>

            <label className="full">
              <span>Scope of Work</span>
              <textarea
                name="Scope of Work"
                rows="6"
                placeholder="Outline the scale, systems, and outcomes required"
                required
              />
            </label>
          </div>

          <button type="submit" className="btn btn-primary">
            {quotePageContent.buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}
