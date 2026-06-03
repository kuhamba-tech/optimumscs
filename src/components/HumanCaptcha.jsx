import { useEffect, useState } from 'react'

export function useHumanCaptcha() {
  const [challenge, setChallenge] = useState({ token: '', svg: '' })
  const [answer, setAnswer] = useState('')
  const [trap, setTrap] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const loadChallenge = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`/api/captcha?t=${Date.now()}`, {
        headers: { Accept: 'application/json' },
      })
      const data = await res.json()
      if (!res.ok || !data.token || !data.svg) throw new Error('captcha-load-failed')
      setChallenge({ token: data.token, svg: data.svg })
      setAnswer('')
      setTrap('')
    } catch {
      setError('Security code could not load. Please refresh it and try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadChallenge()
  }, [])

  const validate = () => {
    if (trap) {
      setError('Please refresh the page and try again.')
      return false
    }
    if (!challenge.token || !answer.trim()) {
      setError('Please enter the security code before submitting.')
      return false
    }
    setError('')
    return true
  }

  const reset = () => {
    loadChallenge()
  }

  return {
    answer,
    challenge,
    error,
    loading,
    payload: { token: challenge.token, answer, trap },
    reset,
    setAnswer,
    setTrap,
    validate,
  }
}

export default function HumanCaptcha({ captcha }) {
  return (
    <div className="human-captcha">
      <label className="human-captcha-field">
        <span>Security Check</span>
        <div className="human-captcha-image-row">
          <div
            className={`human-captcha-image ${captcha.loading ? 'is-loading' : ''}`}
            aria-label="Security code image"
            dangerouslySetInnerHTML={{ __html: captcha.challenge.svg || '' }}
          />
          <button
            type="button"
            className="human-captcha-refresh"
            onClick={captcha.reset}
            disabled={captcha.loading}
          >
            Refresh
          </button>
        </div>
        <input
          className="human-captcha-input"
          type="text"
          inputMode="text"
          autoComplete="off"
          value={captcha.answer}
          onChange={(event) => captcha.setAnswer(event.target.value)}
          placeholder="Enter the code shown"
          required
        />
      </label>
      <label className="human-captcha-trap" aria-hidden="true">
        <span>Leave this field empty</span>
        <input
          tabIndex="-1"
          autoComplete="off"
          value={captcha.payload.trap}
          onChange={(event) => captcha.setTrap(event.target.value)}
        />
      </label>
      {captcha.error && <div className="human-captcha-error">{captcha.error}</div>}
    </div>
  )
}
