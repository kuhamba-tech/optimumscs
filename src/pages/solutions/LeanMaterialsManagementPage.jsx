import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  PackageCheck,
  Clock,
  BarChart3,
  Recycle,
  Workflow,
  Settings,
  Puzzle,
  ArrowLeftRight,
  Users,
  Headphones,
  Boxes,
} from "lucide-react";

import leanImage from "../../assets/lean-materialmanagement.png";
import "./LeanMaterialsManagementPage.css";

export default function LeanMaterialsManagementPage() {
  const navigate = useNavigate();

  return (
    <main className="lean-page">
      <div className="lean-container">
        <section className="lean-hero">
          <div className="lean-hero-text">
            <h1>Lean Materials Management</h1>

            <h2>
              Improve material flow, reduce waste
              <br />
              and optimise inventory management.
            </h2>

            <p>
              Our Lean Materials Management solution helps organisations improve
              inventory accuracy, reduce waste, streamline material flow, and
              ensure the right materials are available at the right time.
            </p>

            <button
              className="lean-btn primary"
              onClick={() => navigate("/request-quote")}
            >
              Request a Quote <ArrowRight size={15} />
            </button>
          </div>

          <div className="lean-hero-image">
            <img src={leanImage} alt="Lean Materials Management" />
          </div>
        </section>

        <section className="lean-panel">
          <h3>Business Challenges We Solve</h3>

          <div className="lean-card-grid four">
            <ChallengeCard
              icon={<Boxes />}
              title="Excess Inventory"
              text="High stock levels increase holding costs and reduce working capital."
            />
            <ChallengeCard
              icon={<Workflow />}
              title="Poor Material Flow"
              text="Inefficient flow creates bottlenecks, delays, and operational waste."
            />
            <ChallengeCard
              icon={<BarChart3 />}
              title="Weak Demand Planning"
              text="Poor forecasting leads to stock shortages, overstocking, and poor service."
            />
            <ChallengeCard
              icon={<Recycle />}
              title="Operational Waste"
              text="Unnecessary movement, waiting time, and rework reduce efficiency."
            />
          </div>
        </section>

        <section className="lean-panel">
          <h3>Our Lean Materials Management Solution</h3>
          <p className="lean-section-subtitle">
            We apply lean principles to improve inventory, flow, planning, and
            process performance.
          </p>

          <div className="lean-card-grid six">
            <SolutionCard
              icon={<PackageCheck />}
              title="Inventory Optimisation"
              text="Improve stock levels, reduce excess inventory, and strengthen control."
            />
            <SolutionCard
              icon={<ArrowLeftRight />}
              title="Material Flow Redesign"
              text="Analyse and redesign movement of materials across operations."
            />
            <SolutionCard
              icon={<BarChart3 />}
              title="Demand Planning"
              text="Support forecasting, planning, and stock visibility improvements."
            />
            <SolutionCard
              icon={<Recycle />}
              title="Waste Reduction"
              text="Identify waste and improve processes using lean methods."
            />
            <SolutionCard
              icon={<Users />}
              title="Team Adoption"
              text="Train teams to apply lean material management practices."
            />
            <SolutionCard
              icon={<Headphones />}
              title="Continuous Support"
              text="Provide ongoing improvement, monitoring, and optimisation support."
            />
          </div>
        </section>

        <section className="lean-panel">
          <h3>Business Impact</h3>

          <div className="lean-impact-grid">
            <Impact value="-25%" label="Reduced Inventory Waste" />
            <Impact value="+30%" label="Improved Material Flow" />
            <Impact value="+20%" label="Better Stock Visibility" />
            <Impact value="-18%" label="Lower Holding Costs" />
          </div>
        </section>

        <section className="lean-panel tech-panel">
          <h3>Lean Areas We Support</h3>

          <div className="lean-tech-logos">
            <span>Inventory</span>
            <span>Flow</span>
            <span>Forecasting</span>
            <span>Waste</span>
            <span>Continuous Improvement</span>
          </div>
        </section>
      </div>
    </main>
  );
}

function ChallengeCard({ icon, title, text }) {
  return (
    <div className="lean-card">
      <div className="lean-icon">{icon}</div>
      <h4>{title}</h4>
      <p>{text}</p>
    </div>
  );
}

function SolutionCard({ icon, title, text }) {
  return (
    <div className="lean-solution-card">
      <div className="lean-icon circle">{icon}</div>
      <h4>{title}</h4>
      <p>{text}</p>
    </div>
  );
}

function Impact({ value, label }) {
  return (
    <div className="lean-impact-card">
      <strong>{value}</strong>
      <p>{label}</p>
    </div>
  );
}