import { useState } from 'react'
import { supabase } from './supabase'

const BRAND_COLOR = '#db2777' // matches Amara's Collection pink/magenta branding

const styles = {
  wrapper: {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    zIndex: 1000,
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  panel: {
    position: 'absolute',
    bottom: '76px',
    right: '0',
    width: '300px',
    background: '#f7f7fb',
    borderRadius: '16px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.18)',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  closeBtn: {
    position: 'absolute',
    top: '14px',
    right: '14px',
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    border: 'none',
    background: '#fff',
    boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
    cursor: 'pointer',
    fontSize: '14px',
    color: '#333',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  greetingBubble: {
    marginTop: '30px',
    background: '#fff',
    borderRadius: '14px',
    padding: '14px 16px',
    fontSize: '1rem',
    fontWeight: '600',
    color: '#111827',
    boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
    alignSelf: 'flex-start',
  },
  chatBtn: {
    background: '#fff',
    border: `1.5px solid ${BRAND_COLOR}`,
    color: BRAND_COLOR,
    borderRadius: '12px',
    padding: '12px 16px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    alignSelf: 'flex-start',
  },
  bubbleBtn: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    background: BRAND_COLOR,
    border: 'none',
    boxShadow: '0 6px 20px rgba(219,39,119,0.4)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formGroup: { display: 'flex', flexDirection: 'column', gap: '4px' },
  label: { fontSize: '0.8rem', fontWeight: '500', color: '#374151' },
  input: {
    width: '100%',
    padding: '0.55rem 0.75rem',
    borderRadius: '8px',
    border: '1.5px solid #e5e7eb',
    fontSize: '0.9rem',
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
  },
  textarea: {
    width: '100%',
    padding: '0.55rem 0.75rem',
    borderRadius: '8px',
    border: '1.5px solid #e5e7eb',
    fontSize: '0.9rem',
    outline: 'none',
    boxSizing: 'border-box',
    resize: 'vertical',
    minHeight: '80px',
    fontFamily: 'inherit',
  },
  errorText: { fontSize: '0.75rem', color: '#ef4444', margin: 0 },
  sendBtn: {
    background: BRAND_COLOR,
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    padding: '0.65rem',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
  },
  backLink: {
    background: 'none',
    border: 'none',
    color: '#6b7280',
    fontSize: '0.8rem',
    cursor: 'pointer',
    padding: 0,
    textAlign: 'left',
  },
  successBox: { textAlign: 'center', padding: '10px 0' },
}

function ChatIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3C7.03 3 3 6.58 3 11c0 2.39 1.19 4.53 3.08 6.02-.1.99-.5 2.36-1.5 3.7 0 0 2.29-.24 4.24-1.72.99.32 2.06.5 3.18.5 4.97 0 9-3.58 9-8s-4.03-8-9-8Z"
        fill="white"
      />
    </svg>
  )
}

function FloatingChatWidget() {
  // stages: 'closed' | 'menu' | 'form' | 'sent'
  const [stage, setStage] = useState('closed')
  const [fields, setFields] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState('')

  function handleChange(e) {
    const { name, value } = e.target
    setFields(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  function validate() {
    const errs = {}
    if (!fields.name.trim()) errs.name = 'Name is required.'
    if (!fields.email.trim()) errs.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) errs.email = 'Enter a valid email.'
    if (!fields.message.trim()) errs.message = 'Message is required.'
    return errs
  }

  async function handleSend() {
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }

    setSubmitError('')
    setLoading(true)

    const { error } = await supabase.from('messages').insert([
      {
        name: fields.name.trim(),
        email: fields.email.trim(),
        subject: 'Live chat',
        message: fields.message.trim(),
      },
    ])

    setLoading(false)

    if (error) {
      console.error('Supabase insert error:', error)
      setSubmitError(`Error: ${error.message || 'Something went wrong. Please try again.'}`)
      return
    }

    setStage('sent')
  }

  function resetAndClose() {
    setFields({ name: '', email: '', message: '' })
    setErrors({})
    setSubmitError('')
    setStage('closed')
  }

  return (
    <div style={styles.wrapper}>
      {stage === 'menu' && (
        <div style={styles.panel}>
          <button style={styles.closeBtn} onClick={() => setStage('closed')} aria-label="Close">✕</button>
          <div style={styles.greetingBubble}>How can I help?</div>
          <button style={styles.chatBtn} onClick={() => setStage('form')}>Chat with us</button>
        </div>
      )}

      {stage === 'form' && (
        <div style={styles.panel}>
          <button style={styles.closeBtn} onClick={() => setStage('closed')} aria-label="Close">✕</button>
          <button style={{ ...styles.backLink, marginTop: '20px' }} onClick={() => setStage('menu')}>← Back</button>

          <div style={styles.formGroup}>
            <label style={styles.label}>Name</label>
            <input
              name="name"
              value={fields.name}
              onChange={handleChange}
              placeholder="Your name"
              style={{ ...styles.input, ...(errors.name ? { borderColor: '#ef4444' } : {}) }}
            />
            {errors.name && <p style={styles.errorText}>{errors.name}</p>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              name="email"
              type="email"
              value={fields.email}
              onChange={handleChange}
              placeholder="you@example.com"
              style={{ ...styles.input, ...(errors.email ? { borderColor: '#ef4444' } : {}) }}
            />
            {errors.email && <p style={styles.errorText}>{errors.email}</p>}
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Message</label>
            <textarea
              name="message"
              value={fields.message}
              onChange={handleChange}
              placeholder="How can we help?"
              style={{ ...styles.textarea, ...(errors.message ? { borderColor: '#ef4444' } : {}) }}
            />
            {errors.message && <p style={styles.errorText}>{errors.message}</p>}
          </div>

          {submitError && <p style={styles.errorText}>{submitError}</p>}

          <button style={{ ...styles.sendBtn, opacity: loading ? 0.7 : 1 }} onClick={handleSend} disabled={loading}>
            {loading ? 'Sending…' : 'Send message'}
          </button>
        </div>
      )}

      {stage === 'sent' && (
        <div style={styles.panel}>
          <button style={styles.closeBtn} onClick={resetAndClose} aria-label="Close">✕</button>
          <div style={styles.successBox}>
            <div style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>✅</div>
            <div style={{ fontWeight: '700', marginBottom: '0.3rem' }}>Message sent!</div>
            <p style={{ color: '#6b7280', fontSize: '0.9rem', margin: 0 }}>We'll get back to you soon.</p>
          </div>
        </div>
      )}

      <button
        style={styles.bubbleBtn}
        onClick={() => setStage(stage === 'closed' ? 'menu' : 'closed')}
        aria-label="Open chat"
      >
        <ChatIcon />
      </button>
    </div>
  )
}

export default FloatingChatWidget