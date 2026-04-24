import { NavLink, Link } from 'react-router-dom'
import { navItems } from './data'
import { LogoMark } from './Icons'
import cscLogo from '../assets/csc-logo.png'

export default function Navbar() {
  return (
    <header className="site-header">
      <div className="container nav-shell">
        <Link to="/" className="brand">
      <img
  src={cscLogo}
  alt="CSC Logo"
  className="navbar-logo"
/>
        </Link>

        <nav className="nav-links">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

       

      </div>
    </header>
  )
}