import { useEffect, useState } from 'react'
import { formatPrice } from './utils'

const API_URL = 'http://localhost/amara-api'
const STATUS_OPTS = ['pending', 'processing', 'shipped', 'completed', 'cancelled']
const statusColor = { pending: ['#fef3c7', '#92400e'], processing: ['#dbeafe', '#1e40af'], shipped: ['#ede9fe', '#5b21b6'], completed: ['#d1fae5', '#065f46'], cancelled: ['#fee2e2', '#991b1b'] }

export default function AdminSales() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('All')
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 768 : false)
  const [toast, setToast] = useState('')
  const [updatingId, setUpdatingId] = useState(null)

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000) }

  async function loadOrders() {
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/orders.php?admin=1`, { credentials: 'include' })
      const json = await res.json()
      setOrders(json.data || [])
    } catch (err) {
      console.error('Failed to load orders:', err)
    }
    setLoading(false)
  }

  useEffect(() => {
    function handleResize() { setIsMobile(window.innerWidth <= 768) }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { loadOrders() }, [])

  async function updateStatus(id, status) {
    const prevOrders = orders
    setUpdatingId(id)
    // Optimistic update so the dropdown reflects the change immediately
    setOrders(orders.map(o => o.id === id ? { ...o, status } : o))
    try {
      const res = await fetch(`${API_URL}/orders.php`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      })
      let data = null
      try { data = await res.json() } catch { /* no body */ }

      if (!res.ok) {
        setOrders(prevOrders) // revert since it didn't actually save
        console.error('Failed to update status:', res.status, data)
        showToast(`❌ Failed to update (HTTP ${res.status}): ${data?.error || 'Check if id field name matches your orders.php PUT handler.'}`)
        return
      }
      showToast(`✅ Order marked as ${status}.`)
    } catch (err) {
      setOrders(prevOrders)
      console.error(err)
      showToast('❌ Network error. Is Apache/MySQL running?')
    }
    setUpdatingId(null)
  }

  const filtered = statusFilter === 'All' ? orders : orders.filter(o => o.status === statusFilter)
  const revenue = orders.reduce((sum, o) => sum + (parseFloat(String(o.total).replace(/[₱,]/g, '')) || 0), 0)

  const th = { padding: isMobile ? '0.5rem 0.65rem' : '0.65rem 1rem', textAlign: 'left', fontSize: isMobile ? '0.62rem' : '0.7rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', borderBottom: '1px solid #f0f0f0', background: '#fafafa', whiteSpace: 'nowrap' }
  const td = { padding: isMobile ? '0.5rem 0.65rem' : '0.65rem 1rem', borderBottom: '1px solid #f9f9f9' }

  return (
    <div>
      <h1 style={{ fontSize: isMobile ? '1.15rem' : '1.5rem', fontWeight: '800', color: '#1a1a2e', marginBottom: isMobile ? '1rem' : '1.25rem' }}>Sales</h1>

      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(180px, 1fr))', gap: isMobile ? '0.65rem' : '1rem', marginBottom: isMobile ? '1rem' : '1.5rem' }}>
        <div style={{ background: '#fff', borderRadius: isMobile ? '10px' : '12px', padding: isMobile ? '0.85rem' : '1.1rem', border: '1px solid #e5e7eb' }}>
          <div style={{ fontSize: isMobile ? '0.7rem' : '0.78rem', color: '#6b7280', fontWeight: 600 }}>Total Orders</div>
          <div style={{ fontSize: isMobile ? '1.05rem' : '1.4rem', fontWeight: '900', color: '#7c3aed' }}>{orders.length}</div>
        </div>
        <div style={{ background: '#fff', borderRadius: isMobile ? '10px' : '12px', padding: isMobile ? '0.85rem' : '1.1rem', border: '1px solid #e5e7eb' }}>
          <div style={{ fontSize: isMobile ? '0.7rem' : '0.78rem', color: '#6b7280', fontWeight: 600 }}>Total Revenue</div>
          <div style={{ fontSize: isMobile ? '1.05rem' : '1.4rem', fontWeight: '900', color: '#065f46' }}>{formatPrice(revenue)}</div>
        </div>
      </div>

      <div style={{ marginBottom: isMobile ? '0.75rem' : '1rem' }}>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ padding: isMobile ? '0.4rem 0.6rem' : '0.5rem 0.75rem', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: isMobile ? '0.78rem' : '0.85rem' }}>
          <option>All</option>
          {STATUS_OPTS.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>

      {loading ? <p style={{ color: '#9ca3af' }}>Loading…</p> : (
        <div style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid #f0f0f0' }}>
        <table style={{ width: '100%', minWidth: isMobile ? '640px' : 'auto', borderCollapse: 'collapse', fontSize: isMobile ? '0.75rem' : '0.83rem', background: '#fff' }}>
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
                    <select value={o.status} disabled={updatingId === o.id} onChange={e => updateStatus(o.id, e.target.value)} style={{ padding: '0.3rem 0.5rem', borderRadius: '6px', border: '1px solid #e5e7eb', fontSize: '0.78rem', opacity: updatingId === o.id ? 0.6 : 1 }}>
                      {STATUS_OPTS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </td>
                </tr>
              )
            })}
            {filtered.length === 0 && <tr><td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: '#9ca3af' }}>No orders found.</td></tr>}
          </tbody>
        </table>
        </div>
      )}
      {toast && <div style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', left: isMobile ? '1rem' : 'auto', background: '#1a1a2e', color: '#fff', padding: '0.6rem 1rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600, zIndex: 200 }}>{toast}</div>}
    </div>
  )
}