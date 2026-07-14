import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useCart } from './CartContext'
import { formatPrice } from './utils'

const API_URL = 'http://localhost/amara-api'

const FILTERS = [
  { label: 'All', value: 'all' },
  { label: "Men's", value: 'mens' },
  { label: "Women's", value: 'women' },
  { label: "Kids'", value: 'kids' },
  { label: 'Streetwear', value: 'streetwear' },
]

function ProductCard({ product }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  function handleAdd() {
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1000)
  }

  return (
    <div style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e5e7eb', transition: 'all 0.2s', cursor: 'pointer' }}
      onMouseOver={e => e.currentTarget.style.boxShadow = '0 8px 24px rgb(255, 0, 200)'}
      onMouseOut={e => e.currentTarget.style.boxShadow = 'none'}>
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <img src={product.image} alt={product.name}
          style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block', transition: 'transform 0.3s' }}
          onMouseOver={e => e.target.style.transform = 'scale(1.05)'}
          onMouseOut={e => e.target.style.transform = 'scale(1)'} />
        {product.tag && (
          <span style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', background: product.tag === 'Sale' ? '#ef4444' : '#10b981', color: '#fff', fontSize: '0.7rem', fontWeight: '700', padding: '0.2rem 0.6rem', borderRadius: '100px' }}>{product.tag}</span>
        )}
      </div>
      <div style={{ padding: '1rem' }}>
        <p style={{ fontSize: '0.85rem', color: '#6b7280', margin: '0 0 0.25rem' }}>{product.name}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <span style={{ fontWeight: '800', color: '#111827', fontSize: '1rem' }}>{formatPrice(product.price)}</span>
          <span style={{ fontSize: '0.8rem', color: '#9ca3af', textDecoration: 'line-through' }}>{product.old_price ? formatPrice(product.old_price) : null}</span>
        </div>
        <button onClick={handleAdd} style={{ width: '100%', background: added ? '#10b981' : '#111827', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.55rem', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer', transition: 'background 0.2s' }}>
          {added ? '✓ Added!' : '+ Add to cart'}
        </button>
      </div>
    </div>
  )
}

export default function ShopPage() {
  const navigate = useNavigate()
  const { totalItems } = useCart()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(`${API_URL}/products.php`)
        const json = await res.json()
        setProducts(json.data || [])
      } catch (err) {
        console.error(err)
      }
      setLoading(false)
    }
    fetchProducts()
  }, [])

  const filteredProducts = products.filter(p => {
    const matchesFilter = activeFilter === 'all' || p.category === activeFilter
    const matchesSearch = p.name?.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", minHeight: '100vh', background: '#f9fafb' }}>
      <div style={{ background: '#111827', borderBottom: '1px solid #374151', padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontWeight: '900', fontSize: '1.3rem', color: '#fff' }}>Amara's<span style={{ color: '#9ca3af' }}> Collection</span></span>
        </div>
        <button onClick={() => navigate('/checkout')} style={{ background: '#fff', color: '#111827', border: 'none', borderRadius: '8px', padding: '0.5rem 1rem', fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer' }}>
          🛒 Cart ({totalItems})
        </button>
      </div>

      <div style={{ background: 'linear-gradient(135deg, #fce7f3 0%, #f3e8ff 100%)', padding: '2.5rem 2rem 5rem', textAlign: 'center', position: 'relative' }}>
        <button onClick={() => navigate('/')} style={{ position: 'absolute', top: '1.5rem', left: '2rem', background: '#fff', border: 'none', borderRadius: '8px', padding: '0.5rem 1rem', cursor: 'pointer', color: '#be185d', fontWeight: '700', fontSize: '0.85rem' }}>← Back</button>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '900', margin: '2.5rem 0 0.75rem', letterSpacing: '-1px', color: '#1a1a2e' }}>Shop the Collection</h1>
        <p style={{ color: '#64748b', fontSize: '1rem', margin: 0 }}>Clothing for your whole little sunshine family 🌈</p>
      </div>

      <div style={{ maxWidth: '1100px', margin: '-2.5rem auto 0', padding: '0 2rem', position: 'relative', zIndex: 10 }}>
        <div style={{ background: '#fff', borderRadius: '16px', padding: '1rem', boxShadow: '0 8px 30px rgba(0,0,0,0.08)', display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex: '1 1 220px', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '0.65rem 1rem', fontSize: '0.9rem', outline: 'none' }}
          />
          {FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              style={{
                background: activeFilter === f.value ? '#be185d' : '#fff',
                color: activeFilter === f.value ? '#fff' : '#be185d',
                border: activeFilter === f.value ? 'none' : '1px solid #e5e7eb',
                borderRadius: '10px', padding: '0.6rem 1.1rem', fontSize: '0.85rem', fontWeight: '700', cursor: 'pointer', whiteSpace: 'nowrap',
              }}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2.5rem 2rem' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280', fontSize: '1.1rem' }}>⏳ Loading products...</div>
        ) : filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280', fontSize: '1rem' }}>No products found.</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '1.25rem' }}>
            {filteredProducts.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>

      <footer style={{ background: '#111827', color: '#6b7280', textAlign: 'center', padding: '2rem', fontSize: '0.85rem', marginTop: '3rem' }}>
        © 2025 Amara's Collection. Clothing For Your Little Sunshine. 🌈
      </footer>
    </div>
  )
}