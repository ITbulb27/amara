import { getProducts, getUsers, getOrders } from './store.js'

const s = {
  statGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '1.5rem' },
  stat: { background: '#fff', border: '1px solid #f0f0f0', borderRadius: '12px', padding: '1rem 1.25rem' },
  statLabel: { fontSize: '0.75rem', color: '#6b7280', marginBottom: '4px' },
  statVal: { fontSize: '1.6rem', fontWeight: 800, color: '#1a1a2e' },
  statSub: { fontSize: '0.72rem', color: '#10b981', marginTop: '2px' },
  twoCol: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' },
  card: { background: '#fff', border: '1px solid #f0f0f0', borderRadius: '12px', overflow: 'hidden' },
  cardHead: { padding: '0.85rem 1rem', borderBottom: '1px solid #f0f0f0', fontWeight: 700, fontSize: '0.85rem', color: '#1a1a2e', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' },
  th: { padding: '0.6rem 1rem', textAlign: 'left', fontSize: '0.7rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #f0f0f0' },
  td: { padding: '0.65rem 1rem', borderBottom: '1px solid #f9f9f9', color: '#374151' },
}

const badge = (status) => {
  const map = { Delivered: ['#d1fae5','#065f46'], Pending: ['#fef3c7','#92400e'], Shipped: ['#dbeafe','#1e40af'], Refunded: ['#fee2e2','#991b1b'] }
  const [bg, color] = map[status] || ['#f3f4f6','#374151']
  return <span style={{ background: bg, color, padding: '2px 10px', borderRadius: '100px', fontSize: '0.7rem', fontWeight: 700 }}>{status}</span>
}

export default function DashboardPage({ onNavigate }) {
  const products = getProducts()
  const users = getUsers()
  const orders = getOrders()
  const revenue = orders.filter(o => o.status !== 'Refunded').reduce((s, o) => s + o.total, 0)

  return (
    <div>
      <div style={s.statGrid}>
        <div style={s.stat}><div style={s.statLabel}>Total revenue</div><div style={s.statVal}>₱{revenue.toLocaleString()}</div><div style={s.statSub}>↑ +12% this month</div></div>
        <div style={s.stat}><div style={s.statLabel}>Orders</div><div style={s.statVal}>{orders.length}</div><div style={{ ...s.statSub, color: '#be185d' }}>{orders.filter(o => o.status === 'Pending').length} pending</div></div>
        <div style={s.stat}><div style={s.statLabel}>Products</div><div style={s.statVal}>{products.length}</div><div style={{ ...s.statSub, color: '#6b7280' }}>Active in store</div></div>
        <div style={s.stat}><div style={s.statLabel}>Users</div><div style={s.statVal}>{users.length}</div><div style={{ ...s.statSub, color: '#6b7280' }}>Registered</div></div>
      </div>

      <div style={s.twoCol}>
        <div style={s.card}>
          <div style={s.cardHead}>Recent orders <button onClick={() => onNavigate('orders')} style={{ fontSize: '0.75rem', color: '#be185d', background: 'none', border: 'none', cursor: 'pointer' }}>View all →</button></div>
          <table style={s.table}>
            <thead><tr><th style={s.th}>Order</th><th style={s.th}>Customer</th><th style={s.th}>Total</th><th style={s.th}>Status</th></tr></thead>
            <tbody>
              {orders.slice(0, 5).map(o => (
                <tr key={o.id}>
                  <td style={s.td}>#{o.id}</td>
                  <td style={s.td}>{o.user}</td>
                  <td style={{ ...s.td, fontWeight: 700, color: '#be185d' }}>₱{o.total.toLocaleString()}</td>
                  <td style={s.td}>{badge(o.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={s.card}>
          <div style={s.cardHead}>Top products <button onClick={() => onNavigate('products')} style={{ fontSize: '0.75rem', color: '#be185d', background: 'none', border: 'none', cursor: 'pointer' }}>View all →</button></div>
          <table style={s.table}>
            <thead><tr><th style={s.th}>Name</th><th style={s.th}>Category</th><th style={s.th}>Stock</th></tr></thead>
            <tbody>
              {products.slice(0, 5).map(p => (
                <tr key={p.id}>
                  <td style={s.td}>{p.name}</td>
                  <td style={s.td}><span style={{ background: '#fce7f3', color: '#be185d', padding: '2px 8px', borderRadius: '100px', fontSize: '0.7rem', fontWeight: 600 }}>{p.cat}</span></td>
                  <td style={s.td}>{p.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}