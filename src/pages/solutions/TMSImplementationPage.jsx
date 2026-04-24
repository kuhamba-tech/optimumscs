import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Share2,
  Clock,
  BarChart3,
  Shield,
  Workflow,
  Settings,
  Puzzle,
  ArrowLeftRight,
  Users,
  Headphones,
  Truck,
} from "lucide-react";

import tmsImage from "../../assets/tms-implementation.png";
import "./TMSImplementationPage.css";

export default function TMSImplementationPage() {
  const navigate = useNavigate();

  return (
    <main className="tms-page">
      <div className="tms-container">
        <section className="tms-hero">
          <div className="tms-hero-text">
            <h1>TMS Implementation</h1>

            <h2>
              Optimise transport operations and logistics
              <br />
              with intelligent TMS solutions.
            </h2>

            <p>
              Our Transport Management System (TMS) implementation services help
              organisations streamline logistics, reduce costs, improve
              visibility, and enhance delivery performance across the supply
              chain.
            </p>

            <button
              className="tms-btn primary"
              onClick={() => navigate("/request-quote")}
            >
              Request a Quote <ArrowRight size={15} />
            </button>
          </div>

          <div className="tms-hero-image">
            <img src={tmsImage} alt="TMS Implementation" />
          </div>
        </section>

        {/* CHALLENGES */}
        <section className="tms-panel">
          <h3>Business Challenges We Solve</h3>

          <div className="tms-card-grid four">
            <ChallengeCard
              icon={<Truck />}
              title="Inefficient Routing"
              text="Poor route planning increases fuel costs and delays."
            />
            <ChallengeCard
              icon={<Clock />}
              title="Delivery Delays"
              text="Lack of visibility leads to missed delivery timelines."
            />
            <ChallengeCard
              icon={<BarChart3 />}
              title="Limited Visibility"
              text="No real-time tracking of shipments and performance."
            />
            <ChallengeCard
              icon={<Shield />}
              title="High Transport Costs"
              text="Inefficient logistics increases operational expenses."
            />
          </div>
        </section>

        {/* SOLUTION */}
        <section className="tms-panel">
          <h3>Our TMS Implementation Solution</h3>
          <p className="tms-section-subtitle">
            We deliver end-to-end transport optimisation solutions.
          </p>

          <div className="tms-card-grid six">
            <SolutionCard
              icon={<Workflow />}
              title="Strategy & Planning"
              text="Define transport optimisation strategy."
            />
            <SolutionCard
              icon={<Settings />}
              title="System Configuration"
              text="Configure TMS to your logistics processes."
            />
            <SolutionCard
              icon={<Puzzle />}
              title="Implementation"
              text="Deploy and integrate TMS platforms."
            />
            <SolutionCard
              icon={<ArrowLeftRight />}
              title="Integration"
              text="Connect with ERP, WMS and external systems."
            />
            <SolutionCard
              icon={<Users />}
              title="Training"
              text="Enable teams for smooth adoption."
            />
            <SolutionCard
              icon={<Headphones />}
              title="Support"
              text="Continuous optimisation and support."
            />
          </div>
        </section>

        {/* IMPACT */}
        <section className="tms-panel">
          <h3>Business Impact</h3>

          <div className="tms-impact-grid">
            <Impact value="-20%" label="Reduction in Transport Costs" />
            <Impact value="+30%" label="Improved Delivery Efficiency" />
            <Impact value="+40%" label="Real-time Visibility" />
            <Impact value="+25%" label="Operational Efficiency" />
          </div>
        </section>
      </div>
    </main>
  );
}

/* COMPONENTS */

function ChallengeCard({ icon, title, text }) {
  return (
    <div className="tms-card">
      <div className="tms-icon">{icon}</div>
      <h4>{title}</h4>
      <p>{text}</p>
    </div>
  );
}

function SolutionCard({ icon, title, text }) {
  return (
    <div className="tms-solution-card">
      <div className="tms-icon circle">{icon}</div>
      <h4>{title}</h4>
      <p>{text}</p>
    </div>
  );
}

function Impact({ value, label }) {
  return (
    <div className="tms-impact-card">
      <strong>{value}</strong>
      <p>{label}</p>
    </div>
  );
}