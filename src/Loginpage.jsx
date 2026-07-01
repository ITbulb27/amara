import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from './AuthContext'

export default function LoginPage() {
  const navigate = useNavigate()
  const { signIn } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit() {
    setError('')
    if (!form.email || !form.password) { setError('Fill in both fields.'); return }
    setLoading(true)
    const { error } = await signIn(form.email, form.password)
    setLoading(false)
    if (error) { setError(error.message); return }
    navigate('/profile')
  }

  const inputStyle = { width: '100%', padding: '0.65rem 0.9rem', borderRadius: '8px', border: '1.5px solid #e5e7eb', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box' }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #fce7f3 0%, #faf5ff 100%)', padding: '2rem', fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <div style={{ background: '#fff', borderRadius: '16px', padding: '2.5rem', width: '100%', maxWidth: '420px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: '#1a1a2e', margin: '0 0 0.25rem' }}>Welcome back</h1>
        <p style={{ fontSize: '0.9rem', color: '#6b7280', margin: '0 0 2rem' }}>Log in sa imong Amara's Collection account.</p>

        <div style={{ marginBottom: '1.1rem' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#374151', marginBottom: '0.35rem' }}>Email</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="you@example.com" style={inputStyle} />
        </div>
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#374151', marginBottom: '0.35rem' }}>Password</label>
          <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="••••••••" style={inputStyle} />
        </div>

        {error && <p style={{ fontSize: '0.85rem', color: '#ef4444', marginBottom: '1rem' }}>{error}</p>}

        <button onClick={handleSubmit} disabled={loading} style={{ width: '100%', padding: '0.8rem', background: '#be185d', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '700', cursor: loading ? 'wait' : 'pointer' }}>
          {loading ? 'Logging in…' : 'Log in'}
        </button>

        <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#6b7280', marginTop: '1.5rem' }}>
          Wala pa kay account? <Link to="/register" style={{ color: '#be185d', fontWeight: '700', textDecoration: 'none' }}>Register here</Link>
        </p>
      </div>
    </div>
  )
}