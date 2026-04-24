import { useNavigate } from "react-router-dom";
import { Target, Briefcase, Lightbulb, ShieldCheck } from "lucide-react";
import mosesImg from "../assets/about-moses-quote.png";
import "./AboutPage.css";

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <main className="about-page-clean">
      <section className="about-top">
        <div className="about-container-clean about-hero-grid">
          <div className="about-hero-text">
            <h1>About Optimum SCS</h1>
            <p>
              Specialists in fast-moving consumer goods supply chains, where
              scale, speed, and visibility matter most.
            </p>
          </div>

          <div className="about-hero-image">
            <img src={mosesImg} alt="Moses Dowart quote" />
          </div>
        </div>
      </section>

      <section className="about-container-clean">
        <div className="mission-card">
          <div className="mission-icon">
            <Target size={22} />
          </div>

          <div>
            <h2>Our Mission</h2>
            <p>
              To deliver world-class digital supply chain solutions that unlock
              efficiency, strengthen competitiveness, and enable sustainable
              growth through innovation, integration, and excellence in execution.
            </p>
          </div>
        </div>

        <h2 className="about-section-title">Why Choose Us</h2>

        <div className="why-grid">
          <WhyCard
            icon={<Briefcase size={22} />}
            title="Proven Expertise"
            text="Delivered FMCG and supply chain solutions across South Africa, Mozambique, Zimbabwe, Namibia, Uganda, and Kenya."
            button="View Solution"
          />

          <WhyCard
            icon={<Lightbulb size={22} />}
            title="Cost & Efficiency Optimization"
            text="Improving service delivery, enhancing operational efficiency, and reducing costs through data-driven supply chain solutions."
            button="View Solution"
          />

          <WhyCard
            icon={<ShieldCheck size={22} />}
            title="Consulting Expertise"
            text="Delivering consulting expertise across ERP, TMS, procurement, and FMCG supply chains to drive operational efficiency, cost reduction, and improved service performance."
            button="View Solution"
          />
        </div>

        <h2 className="about-section-title">Our Journey</h2>

        <div className="journey-line-wrap">
          <div className="journey-grid">
            <JourneyItem
              year="2021"
              title="Founded"
              text="Founded in Johannesburg, South Africa, OptimumSCS delivers advanced supply chain consulting and technology-driven solutions."
            />
            <JourneyItem
              year="2022"
              title="Service Portfolio Expansion"
              text="Expanded service offerings across TMS implementation, procurement, ERP transformation, warehouse management, lean materials management, and data analytics."
            />
            <JourneyItem
              year="2024"
              title="Regional Delivery"
              text="Successfully delivered projects across multiple African markets including Mozambique, Zimbabwe, Namibia, Uganda, and Kenya."
            />
            <JourneyItem
              year="2026"
              title="Strategic Expansion"
              text="Scaling operations into new African markets while strengthening capabilities in digital transformation and advanced supply chain technologies."
            />
          </div>

          <div className="journey-line">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <div className="about-cta-clean">
          <h2>Ready to Optimize Your Supply Chain?</h2>
          <button onClick={() => navigate("/contact")}>Get in Touch</button>
        </div>
      </section>
    </main>
  );
}

function WhyCard({ icon, title, text, button }) {
  return (
    <div className="why-card">
      <div className="why-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
      <button>{button}</button>
    </div>
  );
}

function JourneyItem({ year, title, text }) {
  return (
    <div className="journey-item-clean">
      <h3>{year}</h3>
      <h4>{title}</h4>
      <p>{text}</p>
    </div>
  );
}