import { useEffect, useState } from 'react'
import { formatPrice } from './utils'

const API_URL = 'http://localhost/amara-api'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, orders: 0, revenue: 0, users: 0 })
  const [recentOrders, setRecentOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 768 : false)

  async function load() {
    setLoading(true)
    setError('')

    let productsCount = 0
    let orders = []
    let usersCount = 0

    // Products, Orders/Revenue, and Users ALL come from the PHP/MySQL API —
    // the SAME endpoints used by AdminProducts.jsx, AdminSales.jsx, and AdminUsers.jsx.
    try {
      const [prodRes, orderRes, userRes] = await Promise.all([
        fetch(`${API_URL}/products.php?admin=1`, { credentials: 'include' }),
        fetch(`${API_URL}/orders.php?admin=1`, { credentials: 'include' }),
        fetch(`${API_URL}/users.php`, { credentials: 'include' }),
      ])
      const prodJson = await prodRes.json()
      const orderJson = await orderRes.json()
      const userJson = await userRes.json()
      productsCount = (prodJson.data || []).length
      orders = orderJson.data || []
      usersCount = (userJson.data || []).length
    } catch (err) {
      console.error('Failed to load dashboard stats:', err)
      setError('⚠️ Wala ma-load ang stats. Siguraduha nga naka-Start ang Apache + MySQL sa XAMPP ug tama ang amara-api URL.')
    }

    const revenue = orders.reduce((sum, o) => sum + (parseFloat(String(o.total).replace(/[₱,]/g, '')) || 0), 0)

    setStats({ products: productsCount, orders: orders.length, revenue, users: usersCount })
    setRecentOrders(
      [...orders]
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 5)
    )
    setLoading(false)
  }

  useEffect(() => {
    function handleResize() { setIsMobile(window.innerWidth <= 768) }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { load() }, [])

  const cards = [
    { label: 'Total Products', value: stats.products, icon: '🛍️', bg: '#fce7f3', color: '#be185d' },
    { label: 'Total Orders', value: stats.orders, icon: '📦', bg: '#ede9fe', color: '#7c3aed' },
    { label: 'Total Revenue', value: formatPrice(stats.revenue), icon: '💰', bg: '#d1fae5', color: '#065f46' },
    { label: 'Registered Users', value: stats.users, icon: '👥', bg: '#dbeafe', color: '#1e40af' },
  ]

  return (
    <div>
      <h1 style={{ fontSize: isMobile ? '1.15rem' : '1.5rem', fontWeight: '800', color: '#1a1a2e', marginBottom: isMobile ? '1rem' : '1.5rem' }}>Dashboard</h1>

      {error && (
        <div style={{ background: '#fef3c7', color: '#92400e', padding: isMobile ? '0.6rem 0.8rem' : '0.75rem 1rem', borderRadius: '10px', fontSize: isMobile ? '0.75rem' : '0.85rem', marginBottom: isMobile ? '1rem' : '1.25rem' }}>
          {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(200px, 1fr))', gap: isMobile ? '0.65rem' : '1rem', marginBottom: isMobile ? '1.25rem' : '2rem' }}>
        {cards.map(c => (
          <div key={c.label} style={{ background: '#fff', borderRadius: isMobile ? '10px' : '12px', padding: isMobile ? '0.85rem' : '1.25rem', border: '1px solid #e5e7eb' }}>
            <div style={{ width: isMobile ? '32px' : '40px', height: isMobile ? '32px' : '40px', borderRadius: isMobile ? '8px' : '10px', background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: isMobile ? '1rem' : '1.2rem', marginBottom: isMobile ? '0.5rem' : '0.75rem' }}>{c.icon}</div>
            <div style={{ fontSize: isMobile ? '1.05rem' : '1.4rem', fontWeight: '900', color: c.color }}>{loading ? '…' : c.value}</div>
            <div style={{ fontSize: isMobile ? '0.7rem' : '0.8rem', color: '#6b7280', fontWeight: '600' }}>{c.label}</div>
          </div>
        ))}
      </div>

      <div style={{ background: '#fff', borderRadius: isMobile ? '10px' : '12px', border: '1px solid #e5e7eb', padding: isMobile ? '1rem' : '1.5rem' }}>
        <h2 style={{ fontSize: isMobile ? '0.9rem' : '1rem', fontWeight: '800', color: '#1a1a2e', marginBottom: isMobile ? '0.75rem' : '1rem' }}>Recent Orders</h2>
        {loading ? <p style={{ color: '#9ca3af' }}>Loading…</p> : recentOrders.length === 0 ? <p style={{ color: '#9ca3af' }}>No order yet.</p> : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '0.5rem' : '0.75rem' }}>
            {recentOrders.map(o => (
              <div key={o.id} style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? '0.2rem' : 0, justifyContent: 'space-between', padding: isMobile ? '0.6rem' : '0.75rem', background: '#f9fafb', borderRadius: '8px', fontSize: isMobile ? '0.78rem' : '0.85rem' }}>
                <span style={{ fontWeight: '600', color: '#1a1a2e' }}>{o.customer_name}</span>
                <span style={{ color: '#6b7280' }}>{o.status}</span>
                <span style={{ fontWeight: '700', color: '#be185d' }}>{o.total}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}