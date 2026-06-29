import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const product = location.state?.product || null

  const [fields, setFields] = useState({ name: '', phone: '', address: '', payment: 'COD' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  function validate() {
    const errs = {}
    if (!fields.name.trim()) errs.name = 'Name is required.'
    if (!fields.phone.trim()) errs.phone = 'Phone number is required.'
    else if (!/^(09|\+639)\d{9}$/.test(fields.phone.replace(/\s/g, ''))) errs.phone = 'Enter a valid PH number (e.g. 09123456789).'
    if (!fields.address.trim()) errs.address = 'Delivery address is required.'
    return errs
  }

  function handleChange(e) {
    const { name, value } = e.target
    setFields(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  function handleOrder() {
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setSubmitted(true)
  }

  // SUCCESS PAGE
  if (submitted) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(135deg, #fce7f3 0%, #ede9fe 100%)',
        fontFamily: "'Segoe UI', system-ui, sans-serif", padding: '2rem',
      }}>
        <div style={{
          background: '#fff', borderRadius: '20px', padding: '3rem 2.5rem',
          maxWidth: '440px', width: '100%', textAlign: 'center',
          boxShadow: '0 8px 32px rgba(190,24,93,0.12)',
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: '900', color: '#1a1a2e', margin: '0 0 0.5rem' }}>Order Placed!</h2>
          <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
            Salamat, <strong>{fields.name}</strong>! Ang imong order ay natanggap na. 🌈
          </p>

          {product && (
            <div style={{
              background: '#fce7f3', borderRadius: '12px', padding: '1rem',
              display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem', textAlign: 'left',
            }}>
              <img src={product.img} alt={product.name} style={{ width: '60px', height: '60px', borderRadius: '8px', objectFit: 'cover' }} />
              <div>
                <p style={{ fontWeight: '700', color: '#1a1a2e', margin: 0, fontSize: '0.9rem' }}>{product.name}</p>
                <p style={{ color: '#be185d', fontWeight: '800', margin: 0 }}>{product.price}</p>
              </div>
            </div>
          )}

          <div style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '2rem', lineHeight: '1.8' }}>
            <p>📦 Payment: <strong>{fields.payment}</strong></p>
            <p>📍 Delivery to: <strong>{fields.address}</strong></p>
            <p>⏰ Estimated delivery: <strong>2–3 days</strong></p>
          </div>

          <button
            onClick={() => navigate('/')}
            style={{
              background: '#be185d', color: '#fff', border: 'none', borderRadius: '10px',
              padding: '0.85rem 2rem', fontWeight: '700', fontSize: '1rem', cursor: 'pointer', width: '100%',
            }}
          >← Back to Home</button>
        </div>
      </div>
    )
  }

  // CHECKOUT PAGE
  return (
    <div style={{
      minHeight: '100vh', background: '#f9fafb',
      fontFamily: "'Segoe UI', system-ui, sans-serif",
    }}>

      {/* HEADER */}
      <div style={{
        background: '#fff', borderBottom: '1px solid #fce7f3',
        padding: '1rem 2rem', display: 'flex', alignItems: 'center', gap: '1rem',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <button onClick={() => navigate(-1)} style={{
          background: '#fce7f3', border: 'none', borderRadius: '8px',
          padding: '0.5rem 1rem', cursor: 'pointer', color: '#be185d', fontWeight: '600', fontSize: '0.9rem',
        }}>← Back</button>
        <span style={{ fontWeight: '900', fontSize: '1.3rem', color: '#be185d' }}>Amara's Collection</span>
      </div>

      <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>

        {/* ORDER SUMMARY */}
        <div>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#1a1a2e', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Order Summary
          </h2>

          {product ? (
            <div style={{
              background: '#fff', borderRadius: '14px', padding: '1.25rem',
              border: '1px solid #fce7f3', boxShadow: '0 2px 12px rgba(190,24,93,0.06)',
            }}>
              <img
                src={product.img} alt={product.name}
                style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px', marginBottom: '1rem' }}
              />
              <h3 style={{ fontWeight: '800', color: '#1a1a2e', margin: '0 0 0.25rem', fontSize: '1rem' }}>{product.name}</h3>
              {product.tag && (
                <span style={{
                  display: 'inline-block',
                  background: product.tag === 'Sale' ? '#ef4444' : '#10b981',
                  color: '#fff', fontSize: '0.7rem', fontWeight: '700',
                  padding: '0.15rem 0.5rem', borderRadius: '100px', marginBottom: '0.5rem',
                }}>{product.tag}</span>
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem' }}>
                <span style={{ fontSize: '1.4rem', fontWeight: '900', color: '#be185d' }}>{product.price}</span>
                <span style={{ fontSize: '0.9rem', color: '#9ca3af', textDecoration: 'line-through' }}>{product.old}</span>
              </div>
              <div style={{ borderTop: '1px solid #fce7f3', marginTop: '1rem', paddingTop: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#6b7280', marginBottom: '0.4rem' }}>
                  <span>Subtotal</span><span>{product.price}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#6b7280', marginBottom: '0.4rem' }}>
                  <span>Shipping</span><span style={{ color: '#10b981', fontWeight: '600' }}>FREE</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem', fontWeight: '800', color: '#1a1a2e', marginTop: '0.75rem', borderTop: '1px solid #e5e7eb', paddingTop: '0.75rem' }}>
                  <span>Total</span><span style={{ color: '#be185d' }}>{product.price}</span>
                </div>
              </div>
            </div>
          ) : (
            <div style={{
              background: '#fff', borderRadius: '14px', padding: '2rem',
              border: '1px solid #fce7f3', textAlign: 'center', color: '#9ca3af',
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🛒</div>
              <p>Walay product nga napili.</p>
              <button onClick={() => navigate('/')} style={{
                marginTop: '0.5rem', background: '#be185d', color: '#fff', border: 'none',
                borderRadius: '8px', padding: '0.6rem 1.25rem', fontWeight: '600', cursor: 'pointer',
              }}>Browse collections</button>
            </div>
          )}
        </div>

        {/* DELIVERY FORM */}
        <div>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#1a1a2e', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Delivery Details
          </h2>
          <div style={{
            background: '#fff', borderRadius: '14px', padding: '1.5rem',
            border: '1px solid #fce7f3', boxShadow: '0 2px 12px rgba(190,24,93,0.06)',
          }}>

            {/* Name */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#374151', marginBottom: '0.4rem' }}>Full Name</label>
              <input
                name="name" placeholder="Name" value={fields.name} onChange={handleChange}
                style={{
                  width: '100%', padding: '0.65rem 0.9rem', borderRadius: '8px',
                  border: `1.5px solid ${errors.name ? '#ef4444' : '#e5e7eb'}`,
                  fontSize: '0.95rem', color: '#111827', outline: 'none', boxSizing: 'border-box',
                }}
              />
              {errors.name && <p style={{ fontSize: '0.8rem', color: '#ef4444', margin: '0.3rem 0 0' }}>{errors.name}</p>}
            </div>

            {/* Phone */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#374151', marginBottom: '0.4rem' }}>Phone Number</label>
              <input
                name="phone" placeholder="09123456789" value={fields.phone} onChange={handleChange}
                style={{
                  width: '100%', padding: '0.65rem 0.9rem', borderRadius: '8px',
                  border: `1.5px solid ${errors.phone ? '#ef4444' : '#e5e7eb'}`,
                  fontSize: '0.95rem', color: '#111827', outline: 'none', boxSizing: 'border-box',
                }}
              />
              {errors.phone && <p style={{ fontSize: '0.8rem', color: '#ef4444', margin: '0.3rem 0 0' }}>{errors.phone}</p>}
            </div>

            {/* Address */}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#374151', marginBottom: '0.4rem' }}>Delivery Address</label>
              <textarea
                name="address" placeholder="Blk 1 Lot 2, Sitio Sampaguita, Barangay Maliwanag, Cagayan de Oro City" value={fields.address} onChange={handleChange}
                style={{
                  width: '100%', padding: '0.65rem 0.9rem', borderRadius: '8px',
                  border: `1.5px solid ${errors.address ? '#ef4444' : '#e5e7eb'}`,
                  fontSize: '0.95rem', color: '#111827', outline: 'none', boxSizing: 'border-box',
                  resize: 'vertical', minHeight: '90px', fontFamily: 'inherit',
                }}
              />
              {errors.address && <p style={{ fontSize: '0.8rem', color: '#ef4444', margin: '0.3rem 0 0' }}>{errors.address}</p>}
            </div>

            {/* Payment */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#374151', marginBottom: '0.6rem' }}>Payment Method</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {['COD', 'GCash', 'Maya'].map(method => (
                  <label key={method} style={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                    padding: '0.75rem 1rem', borderRadius: '10px', cursor: 'pointer',
                    border: `2px solid ${fields.payment === method ? '#be185d' : '#e5e7eb'}`,
                    background: fields.payment === method ? '#fce7f3' : '#fff',
                    transition: 'all 0.15s',
                  }}>
                    <input
                      type="radio" name="payment" value={method}
                      checked={fields.payment === method}
                      onChange={handleChange}
                      style={{ accentColor: '#be185d' }}
                    />
                    <span style={{ fontWeight: '600', color: '#1a1a2e', fontSize: '0.9rem' }}>
                      {method === 'COD' ? '💵 Cash on Delivery' : method === 'GCash' ? '📱 GCash' : '📲 Maya'}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={handleOrder}
              style={{
                width: '100%', background: '#be185d', color: '#fff', border: 'none',
                borderRadius: '10px', padding: '0.9rem', fontWeight: '800',
                fontSize: '1rem', cursor: 'pointer', letterSpacing: '0.02em',
              }}
              onMouseOver={e => e.target.style.background = '#9d174d'}
              onMouseOut={e => e.target.style.background = '#be185d'}
            >
              Place Order 🛒
            </button>

          </div>
        </div>

      </div>

      <footer style={{ background: '#1a1a2e', color: '#94a3b8', textAlign: 'center', padding: '2rem', fontSize: '0.85rem', marginTop: '3rem' }}>
        © 2025 Amara's Collection. Clothing For Your Little Sunshine. 🌈
      </footer>

    </div>
  )
}