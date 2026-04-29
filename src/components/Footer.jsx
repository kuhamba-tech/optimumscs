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
            <a href="#" aria-label="LinkedIn"><LinkedinMini /></a>
            <a href="#" aria-label="Email"><MailMini /></a>
            <a href="#" aria-label="X"><XMini /></a>
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
