import { Link } from 'react-router-dom'
import { LinkedinMini, XMini, MailMini } from './Icons'
import cscLogo from '../assets/csc-logo-transparent.png'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-shell">
        <div className="footer-top">
          <div className="brand footer-brand">
            <img
  src={cscLogo}
  alt="CSC Logo"
  className="footer-logo"
/>
          </div>
          <div className="footer-links">
            <Link to="/solutions">Solutions</Link>
            <Link to="/industries">Industries</Link>
            <Link to="/case-studies">Case Studies</Link>
            <Link to="/fee-quote">Fee Quote</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <div className="social-links">
            <a href="https://www.linkedin.com/company/optimum-supply-chain-consulting/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-icon-linkedin"><LinkedinMini /></a>
            <a href="/book-consultation" aria-label="Book Consultation" className="social-icon-mail"><MailMini /></a>
            <a href="https://x.com/optimumscs" target="_blank" rel="noopener noreferrer" aria-label="X" className="social-icon-twitter"><XMini /></a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Optimum SCS. All rights reserved.</span>
          <span>Designed by Stellar Aspirations</span>
        </div>
      </div>
    </footer>
  )
}
