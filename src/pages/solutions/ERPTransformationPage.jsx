import { useNavigate } from "react-router-dom";
import SolutionNav from "../../components/SolutionNav";
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
} from "lucide-react";

import erpImage from "../../assets/erp-transformation.png";
import "./ERPTransformationPage.css";

export default function ERPTransformationPage() {
  const navigate = useNavigate();

  return (
    <main className="erp-page">
      <div className="erp-container">
        <section className="erp-hero">
          <div className="erp-hero-text">
            <h1>ERP Transformation</h1>

            <h2>
              Integrate finance, operations and supply chain
              <br />
              into a unified, intelligent enterprise.
            </h2>

            <p>
              Our ERP Transformation solution helps organisations unify their
              core business processes, improve data visibility, and drive
              operational excellence through integrated enterprise systems.
            </p>

            <button
              className="erp-btn primary"
              onClick={() => navigate("/book-consultation")}
            >
              Book Consultation <ArrowRight size={15} />
            </button>
          </div>

          <div className="erp-hero-image">
            <img src={erpImage} alt="ERP Transformation" fetchPriority="high" decoding="async" />
          </div>
        </section>

        <section className="erp-panel">
          <h3>Business Challenges We Solve</h3>

          <div className="erp-card-grid four">
            <ChallengeCard
              icon={<Share2 />}
              title="Disconnected Systems"
              text="Siloed applications lead to duplicate data and limited visibility."
            />
            <ChallengeCard
              icon={<Clock />}
              title="Inefficient Processes"
              text="Manual and outdated processes increase errors and operational costs."
            />
            <ChallengeCard
              icon={<BarChart3 />}
              title="Poor Visibility"
              text="Lack of real-time insights impacts decision-making and agility."
            />
            <ChallengeCard
              icon={<Shield />}
              title="Limited Scalability"
              text="Legacy systems struggle to support growth and change."
            />
          </div>
        </section>

        <section className="erp-panel">
          <h3>Our ERP Transformation Solution</h3>
          <p className="erp-section-subtitle">
            We deliver end-to-end ERP transformation services tailored to your
            business needs.
          </p>

          <div className="erp-card-grid six">
            <SolutionCard
              icon={<Workflow />}
              title="Strategy & Planning"
              text="Assess, roadmap and define the right ERP strategy for your organisation."
            />
            <SolutionCard
              icon={<Settings />}
              title="System Selection"
              text="Help you choose the best-fit ERP platform aligned with your business goals."
            />
            <SolutionCard
              icon={<Puzzle />}
              title="Implementation"
              text="End-to-end implementation with proven methodologies and best practices."
            />
            <SolutionCard
              icon={<ArrowLeftRight />}
              title="Integration"
              text="Seamlessly integrate ERP with your existing systems and applications."
            />
            <SolutionCard
              icon={<Users />}
              title="Training & Adoption"
              text="Ensure user adoption through training, change management and support."
            />
            <SolutionCard
              icon={<Headphones />}
              title="Support & Optimisation"
              text="Ongoing support and continuous optimisation for long-term success."
            />
          </div>
        </section>

        <section className="erp-panel">
          <h3>Business Impact</h3>

          <div className="erp-impact-grid">
            <Impact value="+8-12%" label="Improvement in Operational Efficiency" />
            <Impact value="+10-15%" label="Faster Financial Close" />
            <Impact value="+12-18%" label="Better Data Accuracy & Visibility" />
            <Impact value="-6-10%" label="Reduction in Operational Costs" />
          </div>
        </section>

        <section className="erp-panel tech-panel">
          <h3>Technologies We Work With</h3>

          <div className="erp-tech-logos">
            <span>SAP</span>
            <span>
              Microsoft
              <br />
              Dynamics 365
            </span>
            <span>
              ORACLE
              <br />
              NETSUITE
            </span>
            <span>infor</span>
            <span>sage</span>
          </div>
        </section>

        <SolutionNav
          prev={{ label: 'Consulting Services', path: '/solutions/consulting-services' }}
          next={{ label: 'TMS Implementation', path: '/solutions/tms-implementation' }}
        />
      </div>
    </main>
  );
}

function ChallengeCard({ icon, title, text }) {
  return (
    <div className="erp-card">
      <div className="erp-icon">{icon}</div>
      <h4>{title}</h4>
      <p>{text}</p>
    </div>
  );
}

function SolutionCard({ icon, title, text }) {
  return (
    <div className="erp-solution-card">
      <div className="erp-icon circle">{icon}</div>
      <h4>{title}</h4>
      <p>{text}</p>
    </div>
  );
}

function Impact({ value, label }) {
  return (
    <div className="erp-impact-card">
      <strong>{value}</strong>
      <p>{label}</p>
    </div>
  );
}
