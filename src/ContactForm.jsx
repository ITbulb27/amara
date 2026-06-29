import { useState } from 'react'

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #f0f4ff 0%, #faf5ff 100%)',
    padding: '2rem',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  card: {
    background: '#ffffff',
    borderRadius: '16px',
    padding: '2.5rem',
    width: '100%',
    maxWidth: '480px',
    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
  },
  heading: { fontSize: '1.75rem', fontWeight: '700', color: '#1a1a2e', margin: '0 0 0.25rem' },
  subheading: { fontSize: '0.95rem', color: '#6b7280', margin: '0 0 2rem' },
  group: { marginBottom: '1.25rem' },
  label: { display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.4rem' },
  input: { width: '100%', padding: '0.65rem 0.9rem', borderRadius: '8px', border: '1.5px solid #e5e7eb', fontSize: '0.95rem', color: '#111827', outline: 'none', boxSizing: 'border-box' },
  textarea: { width: '100%', padding: '0.65rem 0.9rem', borderRadius: '8px', border: '1.5px solid #e5e7eb', fontSize: '0.95rem', color: '#111827', outline: 'none', boxSizing: 'border-box', resize: 'vertical', minHeight: '110px', fontFamily: 'inherit' },
  errorMsg: { fontSize: '0.8rem', color: '#ef4444', marginTop: '0.3rem' },
  button: { width: '100%', padding: '0.8rem', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: '600', cursor: 'pointer', marginTop: '0.5rem' },
  successBox: { textAlign: 'center', padding: '1.5rem 0' },
  resetBtn: { marginTop: '1.5rem', background: 'none', border: '1.5px solid #e5e7eb', borderRadius: '8px', padding: '0.6rem 1.5rem', cursor: 'pointer', color: '#4f46e5', fontWeight: '500' },
}

function validate(fields) {
  const errors = {}
  if (!fields.name.trim()) errors.name = 'Name is required.'
  if (!fields.email.trim()) errors.email = 'Email is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errors.email = 'Enter a valid email.'
  if (!fields.subject.trim()) errors.subject = 'Subject is required.'
  if (!fields.message.trim()) errors.message = 'Message is required.'
  return errors
}

function ContactForm() {
  const [fields, setFields] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setFields(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  function handleSubmit() {
    const errs = validate(fields)
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <div style={styles.successBox}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
            <div style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '0.5rem' }}>Message sent!</div>
            <p style={{ color: '#6b7280' }}>Thanks, <strong>{fields.name}</strong>! We'll get back to you soon.</p>
            <button style={styles.resetBtn} onClick={() => { setFields({ name: '', email: '', subject: '', message: '' }); setSubmitted(false) }}>Send another</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Contact us</h1>
        <p style={styles.subheading}>We'll reply within 24 hours.</p>
        {[['name','Full name','Juan dela Cruz','text'],['email','Email','juan@example.com','email'],['subject','Subject','What is this about?','text']].map(([id, label, placeholder, type]) => (
          <div key={id} style={styles.group}>
            <label style={styles.label}>{label}</label>
            <input name={id} type={type} placeholder={placeholder} value={fields[id]} onChange={handleChange} style={{ ...styles.input, ...(errors[id] ? { borderColor: '#ef4444' } : {}) }} />
            {errors[id] && <p style={styles.errorMsg}>{errors[id]}</p>}
          </div>
        ))}
        <div style={styles.group}>
          <label style={styles.label}>Message</label>
          <textarea name="message" placeholder="Write your message here…" value={fields.message} onChange={handleChange} style={{ ...styles.textarea, ...(errors.message ? { borderColor: '#ef4444' } : {}) }} />
          {errors.message && <p style={styles.errorMsg}>{errors.message}</p>}
        </div>
        <button style={styles.button} onClick={handleSubmit}>Send message →</button>
      </div>
    </div>
  )
}

export default ContactForm