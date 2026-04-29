import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Boxes,
  Clock,
  BarChart3,
  ShieldCheck,
  Workflow,
  Settings,
  Puzzle,
  ArrowLeftRight,
  Users,
  Headphones,
  Warehouse,
} from "lucide-react";

import warehouseImage from "../../assets/warehouse-management.jpg";
import "./WarehouseManagementPage.css";

export default function WarehouseManagementPage() {
  const navigate = useNavigate();

  return (
    <main className="warehouse-page">
      <div className="warehouse-container">
        <section className="warehouse-hero">
          <div className="warehouse-hero-text">
            <h1>Warehouse Management</h1>

            <h2>
              Improve inventory accuracy, warehouse flow
              <br />
              and operational control.
            </h2>

            <p>
              Our Warehouse Management solutions help organisations improve stock
              visibility, optimise warehouse processes, reduce errors, and
              strengthen fulfilment performance across the supply chain.
            </p>

            <button
              className="warehouse-btn primary"
              onClick={() => navigate("/book-consultation")}
            >
              Book Consultation <ArrowRight size={15} />
            </button>
          </div>

          <div className="warehouse-hero-image">
            <img src={warehouseImage} alt="Warehouse Management" />
          </div>
        </section>

        <section className="warehouse-panel">
          <h3>Business Challenges We Solve</h3>

          <div className="warehouse-card-grid four">
            <ChallengeCard
              icon={<Boxes />}
              title="Poor Stock Visibility"
              text="Limited inventory visibility causes stock errors and fulfilment delays."
            />
            <ChallengeCard
              icon={<Clock />}
              title="Slow Warehouse Flow"
              text="Inefficient warehouse movement reduces productivity and throughput."
            />
            <ChallengeCard
              icon={<BarChart3 />}
              title="Weak Reporting"
              text="Limited reporting makes it difficult to track warehouse performance."
            />
            <ChallengeCard
              icon={<ShieldCheck />}
              title="High Error Rates"
              text="Manual processes increase picking, packing, and inventory errors."
            />
          </div>
        </section>

        <section className="warehouse-panel">
          <h3>Our Warehouse Management Solution</h3>
          <p className="warehouse-section-subtitle">
            We help you design, implement, and optimise warehouse management
            processes and systems.
          </p>

          <div className="warehouse-card-grid six">
            <SolutionCard
              icon={<Workflow />}
              title="Warehouse Strategy"
              text="Assess current operations and define the right warehouse improvement roadmap."
            />
            <SolutionCard
              icon={<Settings />}
              title="System Configuration"
              text="Configure warehouse processes to support receiving, storage and fulfilment."
            />
            <SolutionCard
              icon={<Puzzle />}
              title="Implementation"
              text="Support system deployment, process alignment and operational readiness."
            />
            <SolutionCard
              icon={<ArrowLeftRight />}
              title="Integration"
              text="Connect warehouse systems with ERP, TMS and reporting platforms."
            />
            <SolutionCard
              icon={<Users />}
              title="Training & Adoption"
              text="Train warehouse teams for smooth usage and long-term adoption."
            />
            <SolutionCard
              icon={<Headphones />}
              title="Support"
              text="Provide continuous optimisation, support and performance improvement."
            />
          </div>
        </section>

        <section className="warehouse-panel">
          <h3>Business Impact</h3>

          <div className="warehouse-impact-grid">
            <Impact value="+10-15%" label="Improved Inventory Accuracy" />
            <Impact value="+8-14%" label="Faster Order Fulfilment" />
            <Impact value="-8-12%" label="Reduction in Picking Errors" />
            <Impact value="+8-12%" label="Warehouse Efficiency Gain" />
          </div>
        </section>

        <section className="warehouse-panel tech-panel">
          <h3>Warehouse Areas We Support</h3>

          <div className="warehouse-tech-logos">
            <span>Receiving</span>
            <span>Storage</span>
            <span>Picking</span>
            <span>Packing</span>
            <span>Dispatch</span>
          </div>
        </section>
      </div>
    </main>
  );
}

function ChallengeCard({ icon, title, text }) {
  return (
    <div className="warehouse-card">
      <div className="warehouse-icon">{icon}</div>
      <h4>{title}</h4>
      <p>{text}</p>
    </div>
  );
}

function SolutionCard({ icon, title, text }) {
  return (
    <div className="warehouse-solution-card">
      <div className="warehouse-icon circle">{icon}</div>
      <h4>{title}</h4>
      <p>{text}</p>
    </div>
  );
}

function Impact({ value, label }) {
  return (
    <div className="warehouse-impact-card">
      <strong>{value}</strong>
      <p>{label}</p>
    </div>
  );
}
