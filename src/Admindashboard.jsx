import { useEffect, useState } from 'react'
import { formatPrice } from './utils'

const API_URL = 'http://localhost/amara-api'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, orders: 0, revenue: 0, users: 0 })
  const [recentOrders, setRecentOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => { load() }, [])

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

  const cards = [
    { label: 'Total Products', value: stats.products, icon: '🛍️', bg: '#fce7f3', color: '#be185d' },
    { label: 'Total Orders', value: stats.orders, icon: '📦', bg: '#ede9fe', color: '#7c3aed' },
    { label: 'Total Revenue', value: formatPrice(stats.revenue), icon: '💰', bg: '#d1fae5', color: '#065f46' },
    { label: 'Registered Users', value: stats.users, icon: '👥', bg: '#dbeafe', color: '#1e40af' },
  ]

  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1a1a2e', marginBottom: '1.5rem' }}>Dashboard</h1>

      {error && (
        <div style={{ background: '#fef3c7', color: '#92400e', padding: '0.75rem 1rem', borderRadius: '10px', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
          {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {cards.map(c => (
          <div key={c.label} style={{ background: '#fff', borderRadius: '12px', padding: '1.25rem', border: '1px solid #e5e7eb' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', marginBottom: '0.75rem' }}>{c.icon}</div>
            <div style={{ fontSize: '1.4rem', fontWeight: '900', color: c.color }}>{loading ? '…' : c.value}</div>
            <div style={{ fontSize: '0.8rem', color: '#6b7280', fontWeight: '600' }}>{c.label}</div>
          </div>
        ))}
      </div>

      <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '1.5rem' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: '800', color: '#1a1a2e', marginBottom: '1rem' }}>Recent Orders</h2>
        {loading ? <p style={{ color: '#9ca3af' }}>Loading…</p> : recentOrders.length === 0 ? <p style={{ color: '#9ca3af' }}>No order yet.</p> : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {recentOrders.map(o => (
              <div key={o.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: '#f9fafb', borderRadius: '8px', fontSize: '0.85rem' }}>
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