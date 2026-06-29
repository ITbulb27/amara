import { getOrders } from './store.js'

const MONTHLY = [
  { month: 'Jan', revenue: 28000 }, { month: 'Feb', revenue: 31000 },
  { month: 'Mar', revenue: 35000 }, { month: 'Apr', revenue: 39000 },
  { month: 'May', revenue: 44000 }, { month: 'Jun', revenue: 48200 },
]
const BY_CAT = [
  { cat: "Women's Wear", orders: 55, revenue: 19800 },
  { cat: "Men's Wear", orders: 38, revenue: 13680 },
  { cat: 'Streetwear', orders: 29, revenue: 8700 },
  { cat: "Kids' Clothing", orders: 12, revenue: 4800 },
]

const s = {
  statGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem', marginBottom: '1.5rem' },
  stat: { background: '#fff', border: '1px solid #f0f0f0', borderRadius: '12px', padding: '1rem 1.25rem' },
  statLabel: { fontSize: '0.75rem', color: '#6b7280', marginBottom: '4px' },
  statVal: { fontSize: '1.5rem', fontWeight: 800, color: '#1a1a2e' },
  statSub: { fontSize: '0.72rem', color: '#9ca3af', marginTop: '2px' },
  card: { background: '#fff', border: '1px solid #f0f0f0', borderRadius: '12px', overflow: 'hidden', marginBottom: '1rem' },
  cardHead: { padding: '0.85rem 1rem', borderBottom: '1px solid #f0f0f0', fontWeight: 700, fontSize: '0.88rem', color: '#1a1a2e', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  cardBody: { padding: '1rem' },
  chartWrap: { display: 'flex', alignItems: 'flex-end', gap: '0.6rem', height: '130px', marginBottom: '0.6rem' },
  barWrap: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', flex: 1 },
  barLabel: { fontSize: '0.7rem', color: '#9ca3af' },
  twoCol: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' },
  th: { padding: '0.6rem 1rem', textAlign: 'left', fontSize: '0.7rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', borderBottom: '1px solid #f0f0f0' },
  td: { padding: '0.65rem 1rem', borderBottom: '1px solid #f9f9f9', color: '#374151' },
}

const maxRev = Math.max(...MONTHLY.map(m => m.revenue))

export default function SalesPage() {
  const orders = getOrders()
  const total = orders.filter(o => o.status !== 'Refunded').reduce((s, o) => s + o.total, 0)
  const refunds = orders.filter(o => o.status === 'Refunded').reduce((s, o) => s + o.total, 0)

  return (
    <div>
      <div style={s.statGrid}>
        <div style={s.stat}><div style={s.statLabel}>Total revenue</div><div style={s.statVal}>₱{total.toLocaleString()}</div><div style={s.statSub}>June 2025</div></div>
        <div style={s.stat}><div style={s.statLabel}>Orders completed</div><div style={s.statVal}>{orders.filter(o => o.status === 'Delivered').length}</div><div style={{ ...s.statSub, color: '#10b981' }}>of {orders.length} total</div></div>
        <div style={s.stat}><div style={s.statLabel}>Avg order value</div><div style={s.statVal}>₱{Math.round(total / orders.length).toLocaleString()}</div><div style={s.statSub}>per order</div></div>
        <div style={s.stat}><div style={s.statLabel}>Refunds</div><div style={{ ...s.statVal, color: '#ef4444' }}>₱{refunds.toLocaleString()}</div><div style={s.statSub}>{orders.filter(o => o.status === 'Refunded').length} orders</div></div>
      </div>

      <div style={s.card}>
        <div style={s.cardHead}>Monthly revenue <span style={{ fontSize: '0.78rem', color: '#9ca3af', fontWeight: 400 }}>Jan – Jun 2025</span></div>
        <div style={s.cardBody}>
          <div style={s.chartWrap}>
            {MONTHLY.map(m => (
              <div key={m.month} style={s.barWrap}>
                <div style={{ flex: 1, width: '100%', display: 'flex', alignItems: 'flex-end' }}>
                  <div style={{ background: '#be185d', borderRadius: '4px 4px 0 0', width: '100%', height: `${Math.round(m.revenue / maxRev * 100)}%`, minHeight: '6px', transition: 'height 0.3s' }} title={`₱${(m.revenue/1000).toFixed(0)}k`} />
                </div>
                <div style={s.barLabel}>{m.month}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '1rem', fontSize: '0.78rem', color: '#9ca3af', flexWrap: 'wrap' }}>
            {MONTHLY.map(m => <span key={m.month}>{m.month} ₱{(m.revenue / 1000).toFixed(0)}k</span>)}
          </div>
        </div>
      </div>

      <div style={s.twoCol}>
        <div style={s.card}>
          <div style={s.cardHead}>Sales by category</div>
          <table style={s.table}>
            <thead><tr><th style={s.th}>Category</th><th style={s.th}>Orders</th><th style={s.th}>Revenue</th></tr></thead>
            <tbody>
              {BY_CAT.map(c => (
                <tr key={c.cat}>
                  <td style={s.td}>{c.cat}</td>
                  <td style={s.td}>{c.orders}</td>
                  <td style={{ ...s.td, fontWeight: 700, color: '#be185d' }}>₱{c.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={s.card}>
          <div style={s.cardHead}>Recent transactions</div>
          <table style={s.table}>
            <thead><tr><th style={s.th}>Order</th><th style={s.th}>Customer</th><th style={s.th}>Amount</th></tr></thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id}>
                  <td style={s.td}>#{o.id}</td>
                  <td style={s.td}>{o.user}</td>
                  <td style={{ ...s.td, fontWeight: 700, color: o.status === 'Refunded' ? '#ef4444' : '#10b981' }}>
                    {o.status === 'Refunded' ? '-' : '+'}₱{o.total.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}