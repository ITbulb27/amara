import { useEffect, useState } from 'react'
import { supabase } from './supabase'
import { formatPrice } from './utils'

const STATUS_OPTS = ['pending', 'processing', 'shipped', 'completed', 'cancelled']
const statusColor = { pending: ['#fef3c7', '#92400e'], processing: ['#dbeafe', '#1e40af'], shipped: ['#ede9fe', '#5b21b6'], completed: ['#d1fae5', '#065f46'], cancelled: ['#fee2e2', '#991b1b'] }

export default function AdminSales() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('All')

  useEffect(() => { loadOrders() }, [])

  async function loadOrders() {
    setLoading(true)
    const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false })
    if (!error) setOrders(data)
    setLoading(false)
  }

  async function updateStatus(id, status) {
    await supabase.from('orders').update({ status }).eq('id', id)
    setOrders(orders.map(o => o.id === id ? { ...o, status } : o))
  }

  const filtered = statusFilter === 'All' ? orders : orders.filter(o => o.status === statusFilter)
  const revenue = orders.reduce((sum, o) => sum + (parseFloat(String(o.total).replace(/[₱,]/g, '')) || 0), 0)

  const th = { padding: '0.65rem 1rem', textAlign: 'left', fontSize: '0.7rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', borderBottom: '1px solid #f0f0f0', background: '#fafafa' }
  const td = { padding: '0.65rem 1rem', borderBottom: '1px solid #f9f9f9' }

  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1a1a2e', marginBottom: '1.25rem' }}>Sales</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ background: '#fff', borderRadius: '12px', padding: '1.1rem', border: '1px solid #e5e7eb' }}>
          <div style={{ fontSize: '0.78rem', color: '#6b7280', fontWeight: 600 }}>Total Orders</div>
          <div style={{ fontSize: '1.4rem', fontWeight: '900', color: '#7c3aed' }}>{orders.length}</div>
        </div>
        <div style={{ background: '#fff', borderRadius: '12px', padding: '1.1rem', border: '1px solid #e5e7eb' }}>
          <div style={{ fontSize: '0.78rem', color: '#6b7280', fontWeight: 600 }}>Total Revenue</div>
          <div style={{ fontSize: '1.4rem', fontWeight: '900', color: '#065f46' }}>{formatPrice(revenue)}</div>
        </div>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ padding: '0.5rem 0.75rem', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '0.85rem' }}>
          <option>All</option>
          {STATUS_OPTS.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>

      {loading ? <p style={{ color: '#9ca3af' }}>Loading…</p> : (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.83rem', background: '#fff', borderRadius: '12px', overflow: 'hidden', border: '1px solid #f0f0f0' }}>
          <thead>
            <tr>
              {['Customer', 'Contact', 'Address', 'Total', 'Status', ''].map(h => <th key={h} style={th}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {filtered.map(o => {
              const [bg, color] = statusColor[o.status] || ['#f3f4f6', '#374151']
              return (
                <tr key={o.id}>
                  <td style={{ ...td, fontWeight: 700 }}>{o.customer_name}</td>
                  <td style={{ ...td, color: '#6b7280' }}>{o.email}<br />{o.phone}</td>
                  <td style={{ ...td, color: '#6b7280', maxWidth: '200px' }}>{o.address}</td>
                  <td style={{ ...td, fontWeight: 700, color: '#be185d' }}>{o.total}</td>
                  <td style={td}><span style={{ background: bg, color, padding: '2px 8px', borderRadius: '100px', fontSize: '0.7rem', fontWeight: 700 }}>{o.status}</span></td>
                  <td style={td}>
                    <select value={o.status} onChange={e => updateStatus(o.id, e.target.value)} style={{ padding: '0.3rem 0.5rem', borderRadius: '6px', border: '1px solid #e5e7eb', fontSize: '0.78rem' }}>
                      {STATUS_OPTS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </td>
                </tr>
              )
            })}
            {filtered.length === 0 && <tr><td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: '#9ca3af' }}>No orders found.</td></tr>}
          </tbody>
        </table>
      )}
    </div>
  )
}