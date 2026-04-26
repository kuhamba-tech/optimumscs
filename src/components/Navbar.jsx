import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { navItems } from './data'
import cscLogo from '../assets/csc-logo.png'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="container nav-shell">
        <Link to="/" className="brand" onClick={() => setIsOpen(false)}>
          <img
            src={cscLogo}
            alt="CSC Logo"
            className="navbar-logo"
          />
        </Link>

        <button
          className={`nav-toggle ${isOpen ? 'is-open' : ''}`}
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`nav-links ${isOpen ? 'is-open' : ''}`}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
