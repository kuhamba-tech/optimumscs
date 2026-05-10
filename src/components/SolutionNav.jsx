import { useNavigate } from 'react-router-dom'
import './SolutionNav.css'

export default function SolutionNav({ prev, next }) {
  const navigate = useNavigate()

  return (
    <nav className="sol-nav">
      <button
        className="sol-nav-btn sol-nav-prev"
        onClick={() => navigate(prev.path)}
        aria-label={`Go to ${prev.label}`}
      >
        <span className="sol-nav-arrow">←</span>
        <span className="sol-nav-text">
          <small>Previous</small>
          <strong>{prev.label}</strong>
        </span>
      </button>

      <button
        className="sol-nav-btn sol-nav-back"
        onClick={() => navigate('/solutions')}
        aria-label="All Solutions"
      >
        All Solutions
      </button>

      <button
        className="sol-nav-btn sol-nav-next"
        onClick={() => navigate(next.path)}
        aria-label={`Go to ${next.label}`}
      >
        <span className="sol-nav-text">
          <small>Next</small>
          <strong>{next.label}</strong>
        </span>
        <span className="sol-nav-arrow">→</span>
      </button>
    </nav>
  )
}
