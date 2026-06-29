import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useCart } from './CartContext'
import { supabase } from './supabase'

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { cart, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart()
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' })
  const [errors, setErrors] = useState({})
  const [placing, setPlacing] = useState(false)
  const [success, setSuccess] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  function validate() {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Required'
    if (!form.email.trim()) errs.email = 'Required'
    if (!form.phone.trim()) errs.phone = 'Required'
    if (!form.address.trim()) errs.address = 'Required'
    return errs
  }

  async function handleOrder() {
    const errs = validate()
    if (Object.keys(errs).length > 0) { setErrors(errs); return }
    if (cart.length === 0) return

    setPlacing(true)
    const { error } = await supabase.from('orders').insert([{
      customer_name: form.name,
      email: form.email,
      phone: form.phone,
      address: form.address,
      total: `₱${totalPrice.toLocaleString()}`,
      status: 'pending'
    }])
    setPlacing(false)

    if (!error) {
      clearCart()
      setSuccess(true)
    }
  }

  if (success) {
    return (
      <div style={{ minHeight: '100vh', background: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
        <div style={{ background: '#fff', borderRadius: '16px', padding: '3rem', textAlign: 'center', maxWidth: '400px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1a1a2e', marginBottom: '0.5rem' }}>Order Placed!</h2>
          <p style={{ color: '#6b7280', marginBottom: '2rem' }}>Salamat {form.name}! We'll contact you soon sa {form.phone}.</p>
          <button onClick={() => navigate('/')} style={{ background: '#be185d', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.8rem 2rem', fontWeight: '700', fontSize: '1rem', cursor: 'pointer' }}>
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  const inputStyle = (field) => ({
    width: '100%', padding: '0.65rem 0.9rem', borderRadius: '8px',
    border: `1.5px solid ${errors[field] ? '#ef4444' : '#e5e7eb'}`,
    fontSize: '0.95rem', color: '#111827', outline: 'none', boxSizing: 'border-box'
  })

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      {/* HEADER */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '1rem 2rem', display: 'flex', alignItems: 'center', gap: '1rem', position: 'sticky', top: 0, zIndex: 50 }}>
        <button onClick={() => navigate(-1)} style={{ background: '#fce7f3', border: 'none', borderRadius: '8px', padding: '0.5rem 1rem', cursor: 'pointer', color: '#be185d', fontWeight: '600' }}>← Back</button>
        <span style={{ fontWeight: '900', fontSize: '1.3rem', color: '#be185d' }}>Checkout 🛒</span>
      </div>

      <div style={{ maxWidth: '900px', margin: '2rem auto', padding: '0 2rem', display: 'grid', gridTemplateColumns: '1fr 380px', gap: '2rem' }}>

        {/* LEFT — Cart Items */}
        <div>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#1a1a2e', marginBottom: '1rem', textTransform: 'uppercase' }}>
            Your Cart ({totalItems} items)
          </h2>

          {cart.length === 0 ? (
            <div style={{ background: '#fff', borderRadius: '12px', padding: '3rem', textAlign: 'center', color: '#6b7280' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛒</div>
              <p>Wala pay items sa cart.</p>
              <button onClick={() => navigate('/')} style={{ marginTop: '1rem', background: '#be185d', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.6rem 1.5rem', fontWeight: '600', cursor: 'pointer' }}>Shop Now</button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {cart.map(item => (
                <div key={item.id} style={{ background: '#fff', borderRadius: '12px', padding: '1rem', display: 'flex', gap: '1rem', alignItems: 'center', border: '1px solid #e5e7eb' }}>
                  <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: '600', color: '#1a1a2e', margin: '0 0 0.25rem', fontSize: '0.9rem' }}>{item.name}</p>
                    <p style={{ color: '#be185d', fontWeight: '800', margin: '0 0 0.5rem' }}>{item.price}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ width: '28px', height: '28px', background: '#f3f4f6', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '700', fontSize: '1rem' }}>−</button>
                      <span style={{ fontWeight: '700', minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ width: '28px', height: '28px', background: '#f3f4f6', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '700', fontSize: '1rem' }}>+</button>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} style={{ background: '#fef2f2', border: 'none', borderRadius: '8px', padding: '0.4rem 0.7rem', cursor: 'pointer', color: '#ef4444', fontWeight: '700', fontSize: '1rem' }}>✕</button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT — Order Summary + Form */}
        <div>
          {/* Order Summary */}
          <div style={{ background: '#fff', borderRadius: '12px', padding: '1.5rem', border: '1px solid #e5e7eb', marginBottom: '1rem' }}>
            <h3 style={{ fontWeight: '800', color: '#1a1a2e', margin: '0 0 1rem', fontSize: '1rem', textTransform: 'uppercase' }}>Order Summary</h3>
            {cart.map(item => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem', color: '#6b7280' }}>
                <span>{item.name} x{item.quantity}</span>
                <span style={{ fontWeight: '600', color: '#1a1a2e' }}>
                  ₱{(parseFloat(item.price.replace('₱','').replace(',','')) * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
            <div style={{ borderTop: '1px solid #e5e7eb', marginTop: '1rem', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontWeight: '800', color: '#1a1a2e' }}>TOTAL</span>
              <span style={{ fontWeight: '900', color: '#be185d', fontSize: '1.2rem' }}>₱{totalPrice.toLocaleString()}</span>
            </div>
          </div>

          {/* Delivery Form */}
          <div style={{ background: '#fff', borderRadius: '12px', padding: '1.5rem', border: '1px solid #e5e7eb' }}>
            <h3 style={{ fontWeight: '800', color: '#1a1a2e', margin: '0 0 1rem', fontSize: '1rem', textTransform: 'uppercase' }}>Delivery Details</h3>
            {[['name','Full Name','Juan dela Cruz'],['email','Email','juan@example.com'],['phone','Phone','09XX-XXX-XXXX']].map(([field, label, placeholder]) => (
              <div key={field} style={{ marginBottom: '0.75rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#374151', marginBottom: '0.3rem' }}>{label}</label>
                <input name={field} placeholder={placeholder} value={form[field]} onChange={handleChange} style={inputStyle(field)} />
                {errors[field] && <p style={{ fontSize: '0.75rem', color: '#ef4444', margin: '0.2rem 0 0' }}>Required</p>}
              </div>
            ))}
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '600', color: '#374151', marginBottom: '0.3rem' }}>Address</label>
              <textarea name="address" placeholder="House #, Street, Barangay, City" value={form.address} onChange={handleChange}
                style={{ ...inputStyle('address'), minHeight: '80px', resize: 'vertical', fontFamily: 'inherit' }} />
              {errors.address && <p style={{ fontSize: '0.75rem', color: '#ef4444', margin: '0.2rem 0 0' }}>Required</p>}
            </div>
            <button onClick={handleOrder} disabled={placing || cart.length === 0}
              style={{ width: '100%', background: cart.length === 0 ? '#d1d5db' : '#be185d', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.9rem', fontWeight: '700', fontSize: '1rem', cursor: cart.length === 0 ? 'not-allowed' : 'pointer' }}>
              {placing ? '⏳ Placing Order...' : '✅ Place Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}