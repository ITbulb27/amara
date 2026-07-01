import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from './supabase'
import { formatPrice } from './utils'
import { useCart } from './CartContext'

const CATEGORIES = [
  { key: 'All', label: 'All' },
  { key: 'mens', label: "Men's" },
  { key: 'women', label: "Women's" },
  { key: 'kids', label: "Kids'" },
  { key: 'streetwear', label: 'Streetwear' },
]

export default function ShopPage() {
  const navigate = useNavigate()
  const { addToCart } = useCart() || {}
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [toast, setToast] = useState('')

  useEffect(() => { loadProducts() }, [])

  async function loadProducts() {
    setLoading(true)
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('status', 'Active')
      .order('created_at', { ascending: false })
    if (!error) setProducts(data || [])
    setLoading(false)
  }

  const filtered = products.filter(p =>
    (category === 'All' || p.category === category) &&
    (!search || p.name.toLowerCase().includes(search.toLowerCase()))
  )

  function showToast(msg) {
    setToast(msg)
    setTimeout(() => setToast(''), 2000)
  }

  function handleAddToCart(product) {
    if (typeof addToCart === 'function') {
      addToCart(product)
      showToast(`✅ ${product.name} added to cart`)
    } else {
      showToast('⚠️ Cart not available')
    }
  }

  const s = {
    page: { fontFamily: "'Segoe UI', system-ui, sans-serif", minHeight: '100vh', background: '#fff' },
    header: {
      background: 'linear-gradient(135deg, #fce7f3 0%, #faf5ff 100%)',
      padding: '4.5rem 2rem 3rem', textAlign: 'center',
    },
    backBtn: {
      position: 'absolute', top: '1.25rem', left: '1.5rem',
      background: '#fff', border: '1.5px solid #fce7f3', borderRadius: '8px',
      padding: '0.5rem 1rem', fontSize: '0.85rem', fontWeight: 600,
      color: '#be185d', cursor: 'pointer',
    },
    title: { fontSize: 'clamp(1.8rem, 5vw, 2.75rem)', fontWeight: 900, color: '#1a1a2e', margin: '0 0 0.5rem', letterSpacing: '-1px' },
    subtitle: { fontSize: '1rem', color: '#64748b', margin: 0 },
    toolbar: {
      maxWidth: '1100px', margin: '-1.75rem auto 0', background: '#fff', borderRadius: '16px',
      boxShadow: '0 4px 24px rgba(0,0,0,0.08)', padding: '1.25rem', display: 'flex',
      gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center', position: 'relative', zIndex: 2,
    },
    search: {
      flex: '1 1 220px', padding: '0.65rem 1rem', borderRadius: '10px',
      border: '1.5px solid #e5e7eb', fontSize: '0.9rem', outline: 'none',
    },
    tabs: { display: 'flex', gap: '0.5rem', flexWrap: 'wrap' },
    tab: (active) => ({
      padding: '0.55rem 1rem', borderRadius: '10px', border: '1.5px solid ' + (active ? '#be185d' : '#e5e7eb'),
      background: active ? '#be185d' : '#fff', color: active ? '#fff' : '#374151',
      fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap',
    }),
    grid: {
      maxWidth: '1100px', margin: '2.5rem auto', padding: '0 1.5rem',
      display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem',
    },
    card: {
      background: '#fff', borderRadius: '14px', border: '1px solid #f0f0f0',
      overflow: 'hidden', display: 'flex', flexDirection: 'column',
      boxShadow: '0 1px 3px rgba(0,0,0,0.04)', transition: 'transform 0.2s, box-shadow 0.2s',
    },
    imgWrap: { position: 'relative', width: '100%', paddingTop: '100%', background: '#f9fafb', overflow: 'hidden' },
    img: { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' },
    tag: (kind) => ({
      position: 'absolute', top: '0.6rem', left: '0.6rem',
      background: kind === 'Sale' ? '#ef4444' : '#10b981', color: '#fff',
      fontSize: '0.68rem', fontWeight: 800, padding: '3px 9px', borderRadius: '100px',
    }),
    cardBody: { padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', flex: 1 },
    catLabel: { fontSize: '0.68rem', fontWeight: 700, color: '#be185d', textTransform: 'uppercase', letterSpacing: '0.05em' },
    name: { fontSize: '0.95rem', fontWeight: 700, color: '#1a1a2e', margin: 0, lineHeight: 1.3 },
    priceRow: { display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginTop: '0.25rem' },
    price: { fontSize: '1.05rem', fontWeight: 900, color: '#be185d' },
    oldPrice: { fontSize: '0.85rem', color: '#9ca3af', textDecoration: 'line-through' },
    stockRow: { fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.1rem' },
    addBtn: {
      marginTop: '0.6rem', width: '100%', padding: '0.6rem', border: 'none', borderRadius: '9px',
      background: '#1a1a2e', color: '#fff', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer',
    },
    addBtnDisabled: { background: '#e5e7eb', color: '#9ca3af', cursor: 'not-allowed' },
    empty: { textAlign: 'center', padding: '4rem 1rem', color: '#9ca3af', gridColumn: '1 / -1' },
    toast: {
      position: 'fixed', bottom: '1.5rem', right: '1.5rem', background: '#1a1a2e', color: '#fff',
      padding: '0.65rem 1.25rem', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 600, zIndex: 300,
    },
  }

  return (
    <div style={s.page}>
      <div style={{ position: 'relative', ...s.header }}>
        <button style={s.backBtn} onClick={() => navigate('/')}>← Back</button>
        <h1 style={s.title}>Shop the Collection</h1>
        <p style={s.subtitle}>Clothing for your whole little sunshine family 🌈</p>
      </div>

      <div style={s.toolbar}>
        <input
          style={s.search}
          placeholder="Search products…"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <div style={s.tabs}>
          {CATEGORIES.map(c => (
            <button key={c.key} style={s.tab(category === c.key)} onClick={() => setCategory(c.key)}>
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div style={s.grid}>
        {loading ? (
          <div style={s.empty}>Loading products…</div>
        ) : filtered.length === 0 ? (
          <div style={s.empty}>No products found. Try a different search or category.</div>
        ) : (
          filtered.map(p => {
            const outOfStock = p.status === 'Out of stock' || Number(p.stock) <= 0
            return (
              <div key={p.id} style={s.card}>
                <div style={s.imgWrap}>
                  {p.tag && <span style={s.tag(p.tag)}>{p.tag}</span>}
                  <img
                    src={p.image}
                    alt={p.name}
                    style={s.img}
                    onError={e => { e.target.style.visibility = 'hidden' }}
                  />
                </div>
                <div style={s.cardBody}>
                  <span style={s.catLabel}>{p.category}</span>
                  <h3 style={s.name}>{p.name}</h3>
                  <div style={s.priceRow}>
                    <span style={s.price}>{formatPrice(p.price)}</span>
                    {p.old_price && <span style={s.oldPrice}>{formatPrice(p.old_price)}</span>}
                  </div>
                  {outOfStock && <span style={s.stockRow}>Out of stock</span>}
                  <button
                    style={{ ...s.addBtn, ...(outOfStock ? s.addBtnDisabled : {}) }}
                    disabled={outOfStock}
                    onClick={() => handleAddToCart(p)}
                  >
                    {outOfStock ? 'Unavailable' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            )
          })
        )}
      </div>

      {toast && <div style={s.toast}>{toast}</div>}
    </div>
  )
}