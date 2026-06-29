import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import amaraLogo from './assets/amara.jpg'

const ORDER_ITEMS = [
  { id: 1, name: 'Black Polo Shirt', price: 299, qty: 1, img: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=100&q=80' },
  { id: 2, name: 'Slim Fit Chinos', price: 499, qty: 1, img: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=100&q=80' },
]

const PAYMENT_METHODS = [
  { id: 'cod', label: 'Cash on Delivery', icon: '💵', desc: 'Bayad pag natanggap na ang order' },
  { id: 'gcash', label: 'GCash', icon: '📱', desc: 'I-send sa 09XX-XXX-XXXX' },
  { id: 'bdo', label: 'Bank Transfer (BDO)', icon: '🏦', desc: 'Account: 1234-5678-9012' },
]

export default function CheckoutPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1) // 1=delivery, 2=payment, 3=success
  const [payment, setPayment] = useState('cod')
  const [form, setForm] = useState({
    firstName: '', lastName: '', phone: '', email: '',
    address: '', city: '', province: '', zip: '', notes: '',
  })
  const [errors, setErrors] = useState({})

  const subtotal = ORDER_ITEMS.reduce((sum, i) => sum + i.price * i.qty, 0)
  const shipping = subtotal >= 999 ? 0 : 99
  const total = subtotal + shipping

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const validate = () => {
    const errs = {}
    if (!form.firstName.trim()) errs.firstName = 'Required'
    if (!form.lastName.trim()) errs.lastName = 'Required'
    if (!form.phone.trim()) errs.phone = 'Required'
    if (!form.email.trim()) errs.email = 'Required'
    if (!form.address.trim()) errs.address = 'Required'
    if (!form.city.trim()) errs.city = 'Required'
    if (!form.province.trim()) errs.province = 'Required'
    return errs
  }

  const handleNext = () => {
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    setStep(2)
    window.scrollTo(0, 0)
  }

  const handlePlaceOrder = () => {
    setStep(3)
    window.scrollTo(0, 0)
  }

  const inputStyle = (field) => ({
    width: '100%', padding: '0.65rem 0.9rem', borderRadius: '8px',
    border: `1.5px solid ${errors[field] ? '#ef4444' : '#e5e7eb'}`,
    fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit',
  })

  const labelStyle = {
    display: 'block', fontSize: '0.8rem', fontWeight: '600',
    color: '#374151', marginBottom: '0.35rem',
  }

  // SUCCESS SCREEN
  if (step === 3) {
    return (
      <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", minHeight: '100vh', background: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ background: '#fff', borderRadius: '16px', padding: '3rem 2rem', maxWidth: '480px', width: '100%', textAlign: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: '900', color: '#1a1a2e', margin: '0 0 0.75rem' }}>Order Placed!</h1>
          <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
            Salamat, <strong>{form.firstName}!</strong> Ang iyong order ay natanggap na namin. Makakakuha ka ng confirmation sa <strong>{form.email}</strong>.
          </p>
          <div style={{ background: '#f0fdf4', borderRadius: '10px', padding: '1rem', marginBottom: '1.5rem', border: '1px solid #bbf7d0' }}>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#166534', fontWeight: '600' }}>
              📦 Estimated delivery: 2–3 business days<br />
              💳 Payment: {PAYMENT_METHODS.find(p => p.id === payment)?.label}<br />
              💰 Total: ₱{total.toLocaleString()}
            </p>
          </div>
          <button onClick={() => navigate('/')} style={{
            width: '100%', background: '#be185d', color: '#fff', border: 'none',
            borderRadius: '10px', padding: '0.85rem', fontWeight: '700', fontSize: '1rem', cursor: 'pointer',
          }}>Bumalik sa Home</button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", minHeight: '100vh', background: '#f9fafb' }}>

      {/* HEADER */}
      <div style={{
        background: '#fff', borderBottom: '1px solid #fce7f3',
        padding: '1rem 2rem', display: 'flex', alignItems: 'center', gap: '1rem',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <button onClick={() => step === 1 ? navigate(-1) : setStep(1)} style={{
          background: '#fce7f3', border: 'none', borderRadius: '8px',
          padding: '0.5rem 1rem', cursor: 'pointer', color: '#be185d', fontWeight: '600', fontSize: '0.9rem',
        }}>← Balik</button>
        <img src={amaraLogo} alt="Amara's" style={{ height: '36px', width: '36px', borderRadius: '50%', objectFit: 'cover' }} />
        <span style={{ fontWeight: '900', fontSize: '1.1rem', color: '#be185d' }}>Checkout</span>

        {/* Step indicator */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {['Delivery', 'Payment'].map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{
                width: '28px', height: '28px', borderRadius: '50%',
                background: step > i + 1 ? '#10b981' : step === i + 1 ? '#be185d' : '#e5e7eb',
                color: step >= i + 1 ? '#fff' : '#9ca3af',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.75rem', fontWeight: '700',
              }}>{step > i + 1 ? '✓' : i + 1}</div>
              <span style={{ fontSize: '0.8rem', color: step === i + 1 ? '#be185d' : '#9ca3af', fontWeight: step === i + 1 ? '600' : '400' }}>{s}</span>
              {i < 1 && <span style={{ color: '#d1d5db' }}>→</span>}
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem', display: 'grid', gridTemplateColumns: '1fr 340px', gap: '2rem' }}>

        {/* LEFT — Form */}
        <div>

          {/* STEP 1 — DELIVERY */}
          {step === 1 && (
            <div style={{ background: '#fff', borderRadius: '14px', padding: '2rem', border: '1px solid #fce7f3' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1a1a2e', margin: '0 0 1.5rem' }}>📦 Delivery Details</h2>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={labelStyle}>First Name *</label>
                  <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="" style={inputStyle('firstName')} />
                  {errors.firstName && <p style={{ fontSize: '0.75rem', color: '#ef4444', margin: '0.25rem 0 0' }}>Required</p>}
                </div>
                <div>
                  <label style={labelStyle}>Last Name *</label>
                  <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="" style={inputStyle('lastName')} />
                  {errors.lastName && <p style={{ fontSize: '0.75rem', color: '#ef4444', margin: '0.25rem 0 0' }}>Required</p>}
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={labelStyle}>Phone Number *</label>
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="09XX-XXX-XXXX" style={inputStyle('phone')} />
                  {errors.phone && <p style={{ fontSize: '0.75rem', color: '#ef4444', margin: '0.25rem 0 0' }}>Required</p>}
                </div>
                <div>
                  <label style={labelStyle}>Email *</label>
                  <input name="email" value={form.email} onChange={handleChange} placeholder="you@email.com" style={inputStyle('email')} />
                  {errors.email && <p style={{ fontSize: '0.75rem', color: '#ef4444', margin: '0.25rem 0 0' }}>Required</p>}
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={labelStyle}>Street Address *</label>
                <input name="address" value={form.address} onChange={handleChange} placeholder="Address" style={inputStyle('address')} />
                {errors.address && <p style={{ fontSize: '0.75rem', color: '#ef4444', margin: '0.25rem 0 0' }}>Required</p>}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 120px', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={labelStyle}>City/Municipality *</label>
                  <input name="city" value={form.city} onChange={handleChange} placeholder=" City" style={inputStyle('city')} />
                  {errors.city && <p style={{ fontSize: '0.75rem', color: '#ef4444', margin: '0.25rem 0 0' }}>Required</p>}
                </div>
                <div>
                  <label style={labelStyle}>Province *</label>
                  <input name="province" value={form.province} onChange={handleChange} placeholder=" Province" style={inputStyle('province')} />
                  {errors.province && <p style={{ fontSize: '0.75rem', color: '#ef4444', margin: '0.25rem 0 0' }}>Required</p>}
                </div>
                <div>
                  <label style={labelStyle}>ZIP Code</label>
                  <input name="zip" value={form.zip} onChange={handleChange} placeholder="8000" style={inputStyle('zip')} />
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={labelStyle}>Order Notes (optional)</label>
                <textarea name="notes" value={form.notes} onChange={handleChange}
                  placeholder="Special instructions, landmark, etc."
                  style={{ ...inputStyle('notes'), minHeight: '80px', resize: 'vertical' }} />
              </div>

              <button onClick={handleNext} style={{
                width: '100%', background: '#be185d', color: '#fff', border: 'none',
                borderRadius: '10px', padding: '0.85rem', fontWeight: '700', fontSize: '1rem', cursor: 'pointer',
              }}>Continue to Payment →</button>
            </div>
          )}

          {/* STEP 2 — PAYMENT */}
          {step === 2 && (
            <div style={{ background: '#fff', borderRadius: '14px', padding: '2rem', border: '1px solid #fce7f3' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#1a1a2e', margin: '0 0 1.5rem' }}>💳 Payment Method</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                {PAYMENT_METHODS.map(method => (
                  <div key={method.id} onClick={() => setPayment(method.id)} style={{
                    border: `2px solid ${payment === method.id ? '#be185d' : '#e5e7eb'}`,
                    borderRadius: '12px', padding: '1.25rem',
                    cursor: 'pointer', background: payment === method.id ? '#fff0f6' : '#fff',
                    display: 'flex', alignItems: 'center', gap: '1rem',
                  }}>
                    <div style={{ fontSize: '2rem' }}>{method.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '700', color: '#1a1a2e', fontSize: '0.95rem' }}>{method.label}</div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{method.desc}</div>
                    </div>
                    <div style={{
                      width: '20px', height: '20px', borderRadius: '50%',
                      border: `2px solid ${payment === method.id ? '#be185d' : '#d1d5db'}`,
                      background: payment === method.id ? '#be185d' : '#fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {payment === method.id && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#fff' }} />}
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery summary */}
              <div style={{ background: '#f9fafb', borderRadius: '10px', padding: '1rem', marginBottom: '1.5rem', fontSize: '0.85rem', color: '#374151' }}>
                <p style={{ fontWeight: '700', margin: '0 0 0.5rem', color: '#1a1a2e' }}>📍 Delivering to:</p>
                <p style={{ margin: 0 }}>{form.firstName} {form.lastName} · {form.phone}</p>
                <p style={{ margin: 0 }}>{form.address}, {form.city}, {form.province} {form.zip}</p>
              </div>

              <button onClick={handlePlaceOrder} style={{
                width: '100%', background: '#be185d', color: '#fff', border: 'none',
                borderRadius: '10px', padding: '0.85rem', fontWeight: '700', fontSize: '1rem', cursor: 'pointer',
              }}>🛒 Place Order — ₱{total.toLocaleString()}</button>
            </div>
          )}
        </div>

        {/* RIGHT — Order Summary */}
        <div>
          <div style={{ background: '#fff', borderRadius: '14px', padding: '1.5rem', border: '1px solid #fce7f3', position: 'sticky', top: '80px' }}>
            <h3 style={{ fontWeight: '800', fontSize: '1rem', color: '#1a1a2e', margin: '0 0 1.25rem' }}>🛍️ Order Summary</h3>

            {ORDER_ITEMS.map(item => (
              <div key={item.id} style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', alignItems: 'center' }}>
                <img src={item.img} alt={item.name} style={{ width: '56px', height: '56px', borderRadius: '8px', objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '0.85rem', fontWeight: '600', color: '#1a1a2e', margin: '0 0 0.2rem' }}>{item.name}</p>
                  <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0 }}>Qty: {item.qty}</p>
                </div>
                <span style={{ fontWeight: '700', color: '#be185d', fontSize: '0.9rem' }}>₱{(item.price * item.qty).toLocaleString()}</span>
              </div>
            ))}

            <div style={{ borderTop: '1px solid #fce7f3', paddingTop: '1rem', marginTop: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#64748b', marginBottom: '0.5rem' }}>
                <span>Subtotal</span>
                <span>₱{subtotal.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#64748b', marginBottom: '0.75rem' }}>
                <span>Shipping</span>
                <span style={{ color: shipping === 0 ? '#10b981' : '#374151' }}>{shipping === 0 ? 'FREE' : `₱${shipping}`}</span>
              </div>
              {shipping === 0 && (
                <p style={{ fontSize: '0.75rem', color: '#10b981', margin: '0 0 0.75rem', fontWeight: '600' }}>🎉 Free shipping applied!</p>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '800', fontSize: '1.05rem', color: '#1a1a2e', borderTop: '1px solid #fce7f3', paddingTop: '0.75rem' }}>
                <span>Total</span>
                <span style={{ color: '#be185d' }}>₱{total.toLocaleString()}</span>
              </div>
            </div>

            <div style={{ marginTop: '1rem', background: '#f0fdf4', borderRadius: '8px', padding: '0.75rem', fontSize: '0.8rem', color: '#166534' }}>
              🔒 Secure checkout · COD available · Free returns
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}