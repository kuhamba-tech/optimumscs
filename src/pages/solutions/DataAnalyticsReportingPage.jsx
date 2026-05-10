import { useNavigate } from "react-router-dom";
import SolutionNav from "../../components/SolutionNav";
import {
  ArrowRight,
  BarChart3,
  Clock,
  Database,
  Eye,
  Shield,
  Workflow,
  Settings,
  Puzzle,
  ArrowLeftRight,
  Users,
  Headphones,
} from "lucide-react";

import dataImage from "../../assets/data-analtyics.jpg";
import "./DataAnalyticsReportingPage.css";

export default function DataAnalyticsReportingPage() {
  const navigate = useNavigate();

  return (
    <main className="data-page">
      <div className="data-container">
        <section className="data-hero">
          <div className="data-hero-text">
            <h1>Data Analytics & Reporting</h1>

            <h2>
              Turn business data into clear insights
              <br />
              for smarter decision-making.
            </h2>

            <p>
              Our Data Analytics and Reporting solutions help organisations
              transform raw data into meaningful dashboards, reports, and
              insights that improve visibility, performance tracking, and
              strategic decision-making.
            </p>

            <button
              className="data-btn primary"
              onClick={() => navigate("/book-consultation")}
            >
              Book Consultation <ArrowRight size={15} />
            </button>
          </div>

          <div className="data-hero-image">
            <img src={dataImage} alt="Data Analytics and Reporting" fetchPriority="high" decoding="async" />
          </div>
        </section>

        <section className="data-panel">
          <h3>Business Challenges We Solve</h3>

          <div className="data-card-grid four">
            <ChallengeCard
              icon={<Database />}
              title="Scattered Data"
              text="Data stored across different systems makes reporting slow and inconsistent."
            />
            <ChallengeCard
              icon={<Clock />}
              title="Manual Reporting"
              text="Manual report preparation wastes time and increases errors."
            />
            <ChallengeCard
              icon={<Eye />}
              title="Limited Visibility"
              text="Decision makers lack real-time visibility into business performance."
            />
            <ChallengeCard
              icon={<Shield />}
              title="Poor Data Quality"
              text="Unclean or unreliable data affects business confidence and decisions."
            />
          </div>
        </section>

        <section className="data-panel">
          <h3>Our Data Analytics & Reporting Solution</h3>
          <p className="data-section-subtitle">
            We design dashboards, reports, and analytics solutions tailored to
            your business needs.
          </p>

          <div className="data-card-grid six">
            <SolutionCard
              icon={<Workflow />}
              title="Data Strategy"
              text="Define reporting needs, KPIs, and business intelligence priorities."
            />
            <SolutionCard
              icon={<Settings />}
              title="Data Integration"
              text="Connect data from ERP, TMS, WMS, finance, and operational systems."
            />
            <SolutionCard
              icon={<Puzzle />}
              title="Dashboard Design"
              text="Build clear, interactive dashboards for management and operations."
            />
            <SolutionCard
              icon={<ArrowLeftRight />}
              title="Reporting Automation"
              text="Automate recurring reports and reduce manual reporting effort."
            />
            <SolutionCard
              icon={<Users />}
              title="User Training"
              text="Train teams to understand, interpret, and use dashboards effectively."
            />
            <SolutionCard
              icon={<Headphones />}
              title="Support"
              text="Provide ongoing improvements, maintenance, and reporting support."
            />
          </div>
        </section>

        <section className="data-panel">
          <h3>Business Impact</h3>

          <div className="data-impact-grid">
            <Impact value="+15-25%" label="Improved Reporting Speed" />
            <Impact value="+12-18%" label="Better Decision Visibility" />
            <Impact value="-10-18%" label="Reduced Manual Reporting" />
            <Impact value="+10-16%" label="Improved Data Accuracy" />
          </div>
        </section>

        <section className="data-panel tech-panel">
          <h3>Technologies We Work With</h3>

          <div className="data-tech-logos">
            <span>Power BI</span>
            <span>Tableau</span>
            <span>Excel</span>
            <span>SQL</span>
            <span>Python</span>
          </div>
        </section>

        <SolutionNav
          prev={{ label: 'Procurement Services', path: '/solutions/procurement-services' }}
          next={{ label: 'Consulting Services', path: '/solutions/consulting-services' }}
        />
      </div>
    </main>
  );
}

function ChallengeCard({ icon, title, text }) {
  return (
    <div className="data-card">
      <div className="data-icon">{icon}</div>
      <h4>{title}</h4>
      <p>{text}</p>
    </div>
  );
}

function SolutionCard({ icon, title, text }) {
  return (
    <div className="data-solution-card">
      <div className="data-icon circle">{icon}</div>
      <h4>{title}</h4>
      <p>{text}</p>
    </div>
  );
}

function Impact({ value, label }) {
  return (
    <div className="data-impact-card">
      <strong>{value}</strong>
      <p>{label}</p>
    </div>
  );
}
