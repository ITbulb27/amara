import { useEffect, useState } from 'react'
import { supabase } from './supabase'
import { formatPrice } from './utils'

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, orders: 0, revenue: 0, users: 0 })
  const [recentOrders, setRecentOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const [{ count: productsCount }, { data: orders }, { count: usersCount }] = await Promise.all([
        supabase.from('products').select('*', { count: 'exact', head: true }),
        supabase.from('orders').select('*').order('created_at', { ascending: false }),
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
      ])
      const revenue = (orders || []).reduce((sum, o) => sum + (parseFloat(String(o.total).replace(/[₱,]/g, '')) || 0), 0)
      setStats({ products: productsCount || 0, orders: (orders || []).length, revenue, users: usersCount || 0 })
      setRecentOrders((orders || []).slice(0, 5))
      setLoading(false)
    }
    load()
  }, [])

  const cards = [
    { label: 'Total Products', value: stats.products, icon: '🛍️', bg: '#fce7f3', color: '#be185d' },
    { label: 'Total Orders', value: stats.orders, icon: '📦', bg: '#ede9fe', color: '#7c3aed' },
    { label: 'Total Revenue', value: formatPrice(stats.revenue), icon: '💰', bg: '#d1fae5', color: '#065f46' },
    { label: 'Registered Users', value: stats.users, icon: '👥', bg: '#dbeafe', color: '#1e40af' },
  ]

  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1a1a2e', marginBottom: '1.5rem' }}>Dashboard</h1>

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
        {loading ? <p style={{ color: '#9ca3af' }}>Loading…</p> : recentOrders.length === 0 ? <p style={{ color: '#9ca3af' }}>Wala pay orders.</p> : (
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