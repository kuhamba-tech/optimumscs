import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Target,
  BarChart3,
  Eye,
  Workflow,
  Settings,
  Puzzle,
  ArrowLeftRight,
  Users,
  Headphones,
} from "lucide-react";

import consultingImage from "../../assets/consulting-services.jpg";
import "./ConsultingServicesPage.css";

export default function ConsultingServicesPage() {
  const navigate = useNavigate();

  return (
    <main className="consult-page">
      <div className="consult-container">
        <section className="consult-hero">
          <div className="consult-hero-text">
            <h1>Consulting Services</h1>

            <h2>
              Optimise your supply chain, improve efficiency
              <br />
              and drive sustainable performance.
            </h2>

            <p>
              Our consulting services provide expert advisory support to help
              organisations identify gaps, improve operations, and implement
              high-impact, data-driven solutions.
            </p>

            <button
              className="consult-btn primary"
              onClick={() => navigate("/book-consultation")}
            >
              Book Consultation <ArrowRight size={15} />
            </button>
          </div>

          <div className="consult-hero-image">
            <img src={consultingImage} alt="Consulting Services" />
          </div>
        </section>

        {/* CHALLENGES */}
        <section className="consult-panel">
          <h3>Business Challenges We Solve</h3>

          <div className="consult-card-grid four">
            <ChallengeCard
              icon={<Target />}
              title="Lack of Strategy"
              text="No clear supply chain direction limits growth and efficiency."
            />
            <ChallengeCard
              icon={<Workflow />}
              title="Inefficient Processes"
              text="Manual and fragmented processes reduce operational performance."
            />
            <ChallengeCard
              icon={<Eye />}
              title="Limited Visibility"
              text="Poor visibility into operations affects decision-making."
            />
            <ChallengeCard
              icon={<BarChart3 />}
              title="Weak Performance Tracking"
              text="Lack of KPIs and reporting limits continuous improvement."
            />
          </div>
        </section>

        {/* SOLUTION */}
        <section className="consult-panel">
          <h3>Our Consulting Solution</h3>
          <p className="consult-section-subtitle">
            We provide structured, data-driven consulting services tailored to
            your business needs.
          </p>

          <div className="consult-card-grid six">
            <SolutionCard
              icon={<Target />}
              title="Strategy Development"
              text="Define clear supply chain and operational strategies."
            />
            <SolutionCard
              icon={<BarChart3 />}
              title="Performance Improvement"
              text="Enhance efficiency through data-driven insights."
            />
            <SolutionCard
              icon={<Workflow />}
              title="Process Optimisation"
              text="Redesign workflows to remove inefficiencies."
            />
            <SolutionCard
              icon={<ArrowLeftRight />}
              title="Transformation Planning"
              text="Plan and execute business transformation initiatives."
            />
            <SolutionCard
              icon={<Users />}
              title="Change Management"
              text="Support teams through adoption and transition."
            />
            <SolutionCard
              icon={<Headphones />}
              title="Continuous Support"
              text="Ongoing advisory and improvement support."
            />
          </div>
        </section>

        {/* IMPACT */}
        <section className="consult-panel">
          <h3>Business Impact</h3>

          <div className="consult-impact-grid">
            <Impact value="+8-12%" label="Operational Efficiency" />
            <Impact value="+10-15%" label="Better Decision Making" />
            <Impact value="+10-16%" label="Process Improvement" />
            <Impact value="+12-18%" label="Visibility & Control" />
          </div>
        </section>

        {/* AREAS */}
        <section className="consult-panel tech-panel">
          <h3>Consulting Areas</h3>

          <div className="consult-tech-logos">
            <span>Strategy</span>
            <span>Operations</span>
            <span>Processes</span>
            <span>Transformation</span>
            <span>Performance</span>
          </div>
        </section>
      </div>
    </main>
  );
}

/* COMPONENTS */

function ChallengeCard({ icon, title, text }) {
  return (
    <div className="consult-card">
      <div className="consult-icon">{icon}</div>
      <h4>{title}</h4>
      <p>{text}</p>
    </div>
  );
}

function SolutionCard({ icon, title, text }) {
  return (
    <div className="consult-solution-card">
      <div className="consult-icon circle">{icon}</div>
      <h4>{title}</h4>
      <p>{text}</p>
    </div>
  );
}

function Impact({ value, label }) {
  return (
    <div className="consult-impact-card">
      <strong>{value}</strong>
      <p>{label}</p>
    </div>
  );
}
