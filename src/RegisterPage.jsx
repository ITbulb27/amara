import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from './AuthContext'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { signUp, signInWithProvider } = useAuth()
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

  async function handleSocialSignIn(provider) {
    setError('')
    const { error } = await signInWithProvider(provider)
    if (error) setError(error.message)
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', margin: '1.25rem 0' }}>
          <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }} />
          <span style={{ fontSize: '0.8rem', color: '#9ca3af' }}>o</span>
          <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }} />
        </div>

        <div style={{ display: 'flex', gap: '0.6rem' }}>
          <button onClick={() => handleSocialSignIn('google')} style={{
            flex: 1, padding: '0.65rem', borderRadius: '10px',
            border: '1.5px solid #e5e7eb', background: '#fff', fontWeight: 600, fontSize: '0.88rem',
            color: '#374151', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
          }}>
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
                c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
                c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039
                l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
                c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
                c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24
                C44,22.659,43.862,21.35,43.611,20.083z"/>
            </svg>
            Google
          </button>

          <button onClick={() => handleSocialSignIn('facebook')} style={{
            flex: 1, padding: '0.65rem', borderRadius: '10px',
            border: '1.5px solid #e5e7eb', background: '#fff', fontWeight: 600, fontSize: '0.88rem',
            color: '#374151', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
          }}>
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#1877F2" d="M24,4C12.954,4,4,12.954,4,24c0,10.019,7.373,18.323,17,19.795V29.5h-5.19v-5.5H21v-4.194
                c0-5.126,3.055-7.956,7.727-7.956c2.238,0,4.581,0.4,4.581,0.4v5.036H30.68c-2.541,0-3.334,1.578-3.334,3.197V24h5.674
                l-0.907,5.5H27.346v14.295C36.973,42.323,44,34.019,44,24C44,12.954,35.046,4,24,4z"/>
            </svg>
            Facebook
          </button>
        </div>
        

        <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#6b7280', marginTop: '1.5rem' }}>
          Already have an account? <Link to="/login" style={{ color: '#be185d', fontWeight: '700', textDecoration: 'none' }}>Log in</Link>
        </p>
      </div>
    </div>
  )
}