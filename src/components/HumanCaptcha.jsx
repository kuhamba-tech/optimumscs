import { useMemo, useState } from 'react'

function makeChallenge() {
  const a = Math.floor(Math.random() * 8) + 2
  const b = Math.floor(Math.random() * 8) + 2
  return { a, b, generatedAt: Date.now() }
}

export function useHumanCaptcha() {
  const [challenge, setChallenge] = useState(makeChallenge)
  const [answer, setAnswer] = useState('')
  const [trap, setTrap] = useState('')
  const [error, setError] = useState('')

  const expected = useMemo(() => challenge.a + challenge.b, [challenge])

  const validate = () => {
    if (trap) {
      setError('Please refresh the page and try again.')
      return false
    }
    if (Number(answer) !== expected) {
      setError('Please answer the security question before submitting.')
      return false
    }
    setError('')
    return true
  }

  const reset = () => {
    setChallenge(makeChallenge())
    setAnswer('')
    setTrap('')
    setError('')
  }

  return {
    answer,
    challenge,
    error,
    payload: { ...challenge, answer, trap },
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
        <div className="human-captcha-row">
          <strong>{captcha.challenge.a} + {captcha.challenge.b} =</strong>
          <input
            type="number"
            inputMode="numeric"
            value={captcha.answer}
            onChange={(event) => captcha.setAnswer(event.target.value)}
            placeholder="Answer"
            required
          />
        </div>
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
