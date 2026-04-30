import { useNavigate } from "react-router-dom";
import { Target, Briefcase, Lightbulb, ShieldCheck } from "lucide-react";
import mosesImg from "../assets/about-moses-quote.jpg";
import ceoImg from "../assets/about-ceo-quote.jpg";
import "./AboutPage.css";

const whyChooseUs = [
  {
    icon: <Briefcase size={22} />,
    title: "Proven Expertise",
    text: "Delivered FMCG and supply chain solutions across South Africa, Mozambique, Zimbabwe, Namibia, and Uganda.",
  },
  {
    icon: <Lightbulb size={22} />,
    title: "Cost & Efficiency Optimization",
    text: "Improving service delivery, enhancing operational efficiency, and reducing costs through data-driven supply chain solutions.",
  },
  {
    icon: <ShieldCheck size={22} />,
    title: "Consulting Expertise",
    text: "Delivering consulting expertise across ERP, TMS, procurement, and FMCG supply chains to drive operational efficiency, cost reduction, and improved service performance.",
  },
];

const journeyItems = [
  {
    year: "2021",
    title: "Founded",
    text: "Founded in Johannesburg, South Africa, OptimumSCS delivers advanced supply chain consulting and technology-driven solutions.",
  },
  {
    year: "2022",
    title: "Service Portfolio Expansion",
    text: "Expanded service offerings across TMS implementation, procurement, ERP transformation, warehouse management, lean materials management, and data analytics.",
  },
  {
    year: "2024",
    title: "Regional Delivery",
    text: "Successfully delivered projects across multiple African markets including Mozambique, Zimbabwe, Namibia, and Uganda.",
  },
  {
    year: "2026",
    title: "Strategic Expansion",
    text: "Scaling operations into new African markets while strengthening capabilities in digital transformation and advanced supply chain technologies.",
  },
];

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <main className="about-page-clean">
      <section className="about-top">
        <div className="about-container-clean about-hero-grid">
          <div className="about-hero-text">
            <h1 className="about-title">
              <span className="about-title-top">About</span>
              <span className="about-title-bottom">OptimumSCS</span>
            </h1>

            <p>
              Specialists in fast-moving consumer goods supply chains, where
              scale, speed, and visibility matter most.
            </p>
          </div>

          <div className="about-hero-image">
            <img className="about-slide slide-one" src={mosesImg} alt="Moses Dowart quote" />
            <img className="about-slide slide-two" src={ceoImg} alt="CEO quote" />
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
          {whyChooseUs.map((item) => (
            <WhyCard key={item.title} {...item} />
          ))}
        </div>

        <h2 className="about-section-title">Our Journey</h2>

        <div className="journey-line-wrap">
          <div className="journey-grid">
            {journeyItems.map((item) => (
              <JourneyItem key={item.year} {...item} />
            ))}
          </div>

          <div className="journey-line">
            {journeyItems.map((item) => (
              <span key={item.year}></span>
            ))}
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

function WhyCard({ icon, title, text }) {
  return (
    <div className="why-card">
      <div className="why-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
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
