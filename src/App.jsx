import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import AskOptimumSCS from './components/AskOptimum'

const HomePage = lazy(() => import('./pages/HomePage'))
const SolutionsPage = lazy(() => import('./pages/SolutionsPage'))
const IndustriesPage = lazy(() => import('./pages/IndustriesPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const CaseStudiesPage = lazy(() => import('./pages/CaseStudiesPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))
const FeeQuotePage = lazy(() => import('./pages/FeeQuotePage'))
const BookConsultationPage = lazy(() => import('./pages/BookConsultationPage'))
const ERPTransformationPage = lazy(() => import('./pages/solutions/ERPTransformationPage'))
const TMSImplementationPage = lazy(() => import('./pages/solutions/TMSImplementationPage'))
const ProcurementServicesPage = lazy(() => import('./pages/solutions/ProcurementServicesPage'))
const DataAnalyticsReportingPage = lazy(() => import('./pages/solutions/DataAnalyticsReportingPage'))
const ConsultingServicesPage = lazy(() => import('./pages/solutions/ConsultingServicesPage'))

const PageShell = <div style={{ minHeight: '100vh', background: '#061326' }} />

export default function App() {
  return (
    <>
      <Suspense fallback={PageShell}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/solutions" element={<SolutionsPage />} />
            <Route path="/industries" element={<IndustriesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/case-studies" element={<CaseStudiesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/fee-quote" element={<FeeQuotePage />} />
            <Route path="/book-consultation" element={<BookConsultationPage />} />
            <Route path="/solutions/erp-transformation" element={<ERPTransformationPage />} />
            <Route path="/solutions/tms-implementation" element={<TMSImplementationPage />} />
            <Route path="/solutions/procurement-services" element={<ProcurementServicesPage />} />
            <Route path="/solutions/warehouse-management" element={<ProcurementServicesPage />} />
            <Route path="/solutions/data-analytics-reporting" element={<DataAnalyticsReportingPage />} />
            <Route path="/solutions/consulting-services" element={<ConsultingServicesPage />} />
          </Route>
        </Routes>
      </Suspense>

      <AskOptimumSCS />
    </>
  )
}
