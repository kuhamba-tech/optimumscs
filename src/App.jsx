import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import SolutionsPage from './pages/SolutionsPage'
import IndustriesPage from './pages/IndustriesPage'
import AboutPage from './pages/AboutPage'
import CaseStudiesPage from './pages/CaseStudiesPage'
import ContactPage from './pages/ContactPage'
import FeeQuotePage from './pages/FeeQuotePage'
import ERPTransformationPage from './pages/solutions/ERPTransformationPage'
import TMSImplementationPage from './pages/solutions/TMSImplementationPage'
import ProcurementServicesPage from './pages/solutions/ProcurementServicesPage'
import LeanMaterialsManagementPage from './pages/solutions/LeanMaterialsManagementPage'
import WarehouseManagementPage from './pages/solutions/WarehouseManagementPage'
import DataAnalyticsReportingPage from './pages/solutions/DataAnalyticsReportingPage'
import ConsultingServicesPage from './pages/solutions/ConsultingServicesPage'
import AskOptimum from './components/AskOptimum'

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/industries" element={<IndustriesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/fee-quote" element={<FeeQuotePage />} />
          <Route path="/solutions/erp-transformation" element={<ERPTransformationPage />} />
          <Route path="/solutions/tms-implementation" element={<TMSImplementationPage />} />
          <Route path="/solutions/procurement-services" element={<ProcurementServicesPage />} />
          <Route path="/solutions/lean-materials-management" element={<LeanMaterialsManagementPage />} />
          <Route path="/solutions/warehouse-management" element={<WarehouseManagementPage />} />
          <Route path="/solutions/data-analytics-reporting" element={<DataAnalyticsReportingPage />} />
          <Route path="/solutions/consulting-services" element={<ConsultingServicesPage />} />
        </Route>
      </Routes>

      <AskOptimum />
    </>
  )
}