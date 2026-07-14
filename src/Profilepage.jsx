import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext'
import { useCart } from './CartContext'

const API_URL = 'http://localhost/amara-api'

export default function ProfilePage() {
  const { user, profile, signOut } = useAuth()
  const { cart, totalItems, totalPrice } = useCart()
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 768 : false)

  useEffect(() => {
    function handleResize() { setIsMobile(window.innerWidth <= 768) }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    async function load() {
      if (!user) return
      try {
        const res = await fetch(`${API_URL}/orders.php?email=${encodeURIComponent(user.email)}`, { credentials: 'include' })
        const json = await res.json()
        setOrders(json.data || [])
      } catch (err) {
        console.error('Failed to load orders:', err)
      }
      setLoading(false)
    }
    load()
  }, [user])

  async function handleLogout() {
    await signOut()
    navigate('/')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <div style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', padding: isMobile ? '1rem' : '1rem 2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button onClick={() => navigate('/')} style={{ background: '#fce7f3', border: 'none', borderRadius: '8px', padding: '0.5rem 1rem', cursor: 'pointer', color: '#be185d', fontWeight: '600' }}>← Back</button>
        <span style={{ fontWeight: '900', fontSize: '1.3rem', color: '#be185d' }}>My Profile</span>
      </div>

      <div style={{
        maxWidth: '900px', margin: isMobile ? '1rem auto' : '2rem auto',
        padding: isMobile ? '0 1rem' : '0 2rem',
        display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '300px 1fr',
        gap: isMobile ? '1rem' : '2rem',
      }}>
        <div>
          <div style={{ background: '#fff', borderRadius: '12px', padding: '1.5rem', border: '1px solid #e5e7eb', textAlign: 'center' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#be185d', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: '800', margin: '0 auto 1rem' }}>
              {(profile?.full_name || user?.email || '?')[0].toUpperCase()}
            </div>
            <div style={{ fontWeight: '800', color: '#1a1a2e' }}>{profile?.full_name || 'No name set'}</div>
            <div style={{ fontSize: '0.85rem', color: '#6b7280', marginBottom: '1rem' }}>{user?.email}</div>
            {profile?.role === 'admin' && (
              <button onClick={() => navigate('/admin')} style={{ width: '100%', background: '#1a1a2e', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.6rem', fontWeight: '700', cursor: 'pointer', marginBottom: '0.5rem' }}>⚙️ Admin Panel</button>
            )}
            <button onClick={handleLogout} style={{ width: '100%', background: '#fee2e2', color: '#991b1b', border: 'none', borderRadius: '8px', padding: '0.6rem', fontWeight: '700', cursor: 'pointer' }}>Log out</button>
          </div>

          <div style={{ background: '#fff', borderRadius: '12px', padding: '1.5rem', border: '1px solid #e5e7eb', marginTop: '1rem' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#1a1a2e', marginBottom: '0.5rem' }}>🛒 Current Cart</div>
            <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.75rem' }}>{totalItems} items · ₱{totalPrice.toLocaleString()}</div>
            <button onClick={() => navigate('/checkout')} disabled={cart.length === 0} style={{ width: '100%', background: cart.length === 0 ? '#e5e7eb' : '#be185d', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.6rem', fontWeight: '700', cursor: cart.length === 0 ? 'not-allowed' : 'pointer' }}>
              Go to Checkout
            </button>
          </div>
        </div>

        <div>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#1a1a2e', marginBottom: '1rem' }}>Order History</h2>
          {loading ? <p style={{ color: '#9ca3af' }}>Loading…</p> : orders.length === 0 ? (
            <div style={{ background: '#fff', borderRadius: '12px', padding: '2.5rem', textAlign: 'center', color: '#9ca3af', border: '1px solid #e5e7eb' }}>You don't have any orders yet.</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {orders.map(o => (
                <div key={o.id} style={{
                  background: '#fff', borderRadius: '10px', padding: '1rem', border: '1px solid #e5e7eb',
                  display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem',
                }}>
                  <div>
                    <div style={{ fontWeight: '700', color: '#1a1a2e' }}>Order #{String(o.id).slice(0, 8)}</div>
                    <div style={{ fontSize: '0.8rem', color: '#6b7280' }}>{new Date(o.created_at).toLocaleDateString()}</div>
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', padding: '3px 10px', borderRadius: '100px', background: '#fef3c7', color: '#92400e' }}>{o.status}</span>
                  <div style={{ fontWeight: '800', color: '#be185d' }}>{o.total}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}