import { useNavigate } from "react-router-dom";
import SolutionNav from "../../components/SolutionNav";
import {
  ArrowRight,
  Search,
  FileText,
  BarChart3,
  DollarSign,
  Workflow,
  Settings,
  Puzzle,
  ArrowLeftRight,
  Users,
  Headphones,
  ShieldCheck,
} from "lucide-react";

import procurementImage from "../../assets/procurement-system.png";
import "./ProcurementServicesPage.css";

export default function ProcurementServicesPage() {
  const navigate = useNavigate();

  return (
    <main className="proc-page">
      <div className="proc-container">
        <section className="proc-hero">
          <div className="proc-hero-text">
            <h1>Procurement Services</h1>

            <h2>
              Strengthen sourcing, supplier management
              <br />
              and procurement performance.
            </h2>

            <p>
              Our Procurement Services help organisations improve sourcing,
              control spend, manage suppliers, streamline contracts, and build
              more transparent procurement processes.
            </p>

            <button
              className="proc-btn primary"
              onClick={() => navigate("/book-consultation")}
            >
              Book Consultation <ArrowRight size={15} />
            </button>
          </div>

          <div className="proc-hero-image">
            <img src={procurementImage} alt="Procurement Services" fetchPriority="high" decoding="async" />
          </div>
        </section>

        <section className="proc-panel">
          <h3>Business Challenges We Solve</h3>

          <div className="proc-card-grid four">
            <ChallengeCard
              icon={<Search />}
              title="Inefficient Sourcing"
              text="Poor sourcing processes reduce supplier quality and increase costs."
            />
            <ChallengeCard
              icon={<FileText />}
              title="Contract Gaps"
              text="Weak contract management creates compliance and performance risks."
            />
            <ChallengeCard
              icon={<DollarSign />}
              title="Uncontrolled Spend"
              text="Limited spend visibility makes cost control difficult."
            />
            <ChallengeCard
              icon={<ShieldCheck />}
              title="Supplier Risk"
              text="Unmanaged supplier performance can affect delivery and service quality."
            />
          </div>
        </section>

        <section className="proc-panel">
          <h3>Our Procurement Services Solution</h3>
          <p className="proc-section-subtitle">
            We help you create structured, transparent and value-driven
            procurement operations.
          </p>

          <div className="proc-card-grid six">
            <SolutionCard
              icon={<Workflow />}
              title="Procurement Strategy"
              text="Define sourcing priorities, procurement models and operating standards."
            />
            <SolutionCard
              icon={<Settings />}
              title="Process Design"
              text="Improve procurement workflows, approvals and governance structures."
            />
            <SolutionCard
              icon={<Puzzle />}
              title="Supplier Management"
              text="Support onboarding, evaluation and supplier performance tracking."
            />
            <SolutionCard
              icon={<ArrowLeftRight />}
              title="System Integration"
              text="Connect procurement processes with ERP, finance and reporting systems."
            />
            <SolutionCard
              icon={<Users />}
              title="Training & Adoption"
              text="Equip teams with the skills to use procurement tools effectively."
            />
            <SolutionCard
              icon={<Headphones />}
              title="Support"
              text="Provide ongoing optimisation, reporting and procurement support."
            />
          </div>
        </section>

        <section className="proc-panel">
          <h3>Business Impact</h3>

          <div className="proc-impact-grid">
            <Impact value="-5-9%" label="Reduction in Procurement Costs" />
            <Impact value="+10-16%" label="Improved Supplier Visibility" />
            <Impact value="+8-14%" label="Faster Procurement Cycle" />
            <Impact value="+12-18%" label="Better Spend Control" />
          </div>
        </section>

        <section className="proc-panel tech-panel">
          <h3>Procurement Areas We Support</h3>

          <div className="proc-tech-logos">
            <span>Sourcing</span>
            <span>Contracts</span>
            <span>Suppliers</span>
            <span>Spend</span>
            <span>Compliance</span>
          </div>
        </section>

        <SolutionNav
          prev={{ label: 'TMS Implementation', path: '/solutions/tms-implementation' }}
          next={{ label: 'Data Analytics & Reporting', path: '/solutions/data-analytics-reporting' }}
        />
      </div>
    </main>
  );
}

function ChallengeCard({ icon, title, text }) {
  return (
    <div className="proc-card">
      <div className="proc-icon">{icon}</div>
      <h4>{title}</h4>
      <p>{text}</p>
    </div>
  );
}

function SolutionCard({ icon, title, text }) {
  return (
    <div className="proc-solution-card">
      <div className="proc-icon circle">{icon}</div>
      <h4>{title}</h4>
      <p>{text}</p>
    </div>
  );
}

function Impact({ value, label }) {
  return (
    <div className="proc-impact-card">
      <strong>{value}</strong>
      <p>{label}</p>
    </div>
  );
}
