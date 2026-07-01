import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from './AuthContext'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { signUp } = useAuth()
  const [form, setForm] = useState({ fullName: '', email: '', password: '', confirm: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit() {
    setError('')
    if (!form.fullName || !form.email || !form.password) { setError('Kompletuha ang tanan fields.'); return }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return }
    if (form.password !== form.confirm) { setError('Dili magtugma ang password.'); return }

    setLoading(true)
    const { error } = await signUp(form.email, form.password, form.fullName)
    setLoading(false)
    if (error) { setError(error.message); return }
    navigate('/profile')
  }

  const inputStyle = { width: '100%', padding: '0.65rem 0.9rem', borderRadius: '8px', border: '1.5px solid #e5e7eb', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }
  const labelStyle = { display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#374151', marginBottom: '0.35rem' }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #fce7f3 0%, #faf5ff 100%)', padding: '2rem', fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <div style={{ background: '#fff', borderRadius: '16px', padding: '2.5rem', width: '100%', maxWidth: '440px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#1a1a2e', margin: '0 0 0.25rem' }}>Create account</h1>
        <p style={{ fontSize: '0.9rem', color: '#6b7280', margin: '0 0 2rem' }}>Mag-join sa Amara's Collection.</p>

        <div style={{ marginBottom: '1.1rem' }}>
          <label style={labelStyle}>Full name</label>
          <input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Juan dela Cruz" style={inputStyle} />
        </div>
        <div style={{ marginBottom: '1.1rem' }}>
          <label style={labelStyle}>Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" style={inputStyle} />
        </div>
        <div style={{ marginBottom: '1.1rem' }}>
          <label style={labelStyle}>Password</label>
          <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="At least 6 characters" style={inputStyle} />
        </div>
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={labelStyle}>Confirm password</label>
          <input name="confirm" type="password" value={form.confirm} onChange={handleChange} placeholder="••••••••" style={inputStyle} />
        </div>

        {error && <p style={{ fontSize: '0.85rem', color: '#ef4444', marginBottom: '1rem' }}>{error}</p>}

        <button onClick={handleSubmit} disabled={loading} style={{ width: '100%', padding: '0.8rem', background: '#be185d', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '700', cursor: loading ? 'wait' : 'pointer' }}>
          {loading ? 'Creating account…' : 'Create account'}
        </button>

        <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#6b7280', marginTop: '1.5rem' }}>
          Naa nay account? <Link to="/login" style={{ color: '#be185d', fontWeight: '700', textDecoration: 'none' }}>Log in</Link>
        </p>
      </div>
    </div>
  )
}