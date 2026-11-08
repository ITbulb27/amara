import { useNavigate, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { API_URL } from './api'
import { useCart } from './CartContext'
import { formatPrice } from './utils'
import { useIsMobile } from './useIsMobile'

const CATEGORIES = [
  { id: 'toddler', label: 'TODDLER', sub: '1–3 Years', keywords: ['toddler', 'baby', 'infant', '1-3', '1–3'], bg: '#7c3aed', img: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=400&q=80' },
  { id: 'kids', label: 'KIDS', sub: '4–10 Years', keywords: ['kids', 'kid', 'children', 'child', '4-10', '4–10'], bg: '#be185d', img: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400&q=80' },
  { id: 'teen', label: 'TEEN', sub: '11–17 Years', keywords: ['teen', '11-17', '11–17'], bg: '#1a1a2e', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
]

function ProductCard({ product, isMobile }) {
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)

  function handleAdd() {
    addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1000)
  }

  return (
    <div style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e5e7eb', transition: 'all 0.2s', cursor: 'pointer' }}
      onMouseOver={e => e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'}
      onMouseOut={e => e.currentTarget.style.boxShadow = 'none'}>
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <img src={product.image} alt={product.name}
          style={{ width: '100%', height: isMobile ? '150px' : '220px', objectFit: 'cover', display: 'block', transition: 'transform 0.3s' }}
          onMouseOver={e => e.target.style.transform = 'scale(1.05)'}
          onMouseOut={e => e.target.style.transform = 'scale(1)'} />
        {product.tag && (
          <span style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', background: product.tag === 'Sale' ? '#ef4444' : '#10b981', color: '#fff', fontSize: '0.7rem', fontWeight: '700', padding: '0.2rem 0.6rem', borderRadius: '100px' }}>{product.tag}</span>
        )}
      </div>
      <div style={{ padding: isMobile ? '0.75rem' : '1rem' }}>
        <p style={{ fontSize: isMobile ? '0.78rem' : '0.85rem', color: '#6b7280', margin: '0 0 0.25rem', lineHeight: '1.4' }}>{product.name}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <span style={{ fontWeight: '800', color: '#7c3aed', fontSize: '1rem' }}>{formatPrice(product.price)}</span>
          <span style={{ fontSize: '0.8rem', color: '#9ca3af', textDecoration: 'line-through' }}>{product.old_price ? formatPrice(product.old_price) : null}</span>
        </div>
        <button onClick={handleAdd} style={{ width: '100%', background: added ? '#10b981' : '#1a1a2e', color: '#fff', border: 'none', borderRadius: '8px', padding: isMobile ? '0.5rem 0.25rem' : '0.55rem', fontSize: isMobile ? '0.72rem' : '0.85rem', fontWeight: '600', cursor: 'pointer', transition: 'background 0.2s' }}>
          {added ? '✓ Added!' : '+ Add to cart'}
        </button>
      </div>
    </div>
  )
}

export default function KidsPage() {
  const navigate = useNavigate()
  const isMobile = useIsMobile()
  const [searchParams, setSearchParams] = useSearchParams()
  const { totalItems } = useCart()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(`${API_URL}/products.php?category=kids`)
        const json = await res.json()
        setProducts(json.data || [])
      } catch (err) {
        console.error(err)
      }
      setLoading(false)
    }
    fetchProducts()
  }, [])

  const selectedCategory = CATEGORIES.find(category => category.id === searchParams.get('type'))
  const visibleProducts = selectedCategory
    ? products.filter(product => selectedCategory.keywords.some(keyword => product.name?.toLowerCase().includes(keyword)))
    : products

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", minHeight: '100vh', background: '#f9fafb' }}>
      <div style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', padding: isMobile ? '0.75rem 1rem' : '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '0.5rem' : '1rem', minWidth: 0 }}>
          <button onClick={() => navigate('/')} style={{ background: '#ede9fe', border: 'none', borderRadius: '8px', padding: isMobile ? '0.5rem 0.65rem' : '0.5rem 1rem', cursor: 'pointer', color: '#7c3aed', fontWeight: '600', fontSize: isMobile ? '0.78rem' : '0.9rem', whiteSpace: 'nowrap' }}>← Back</button>
          <span style={{ fontWeight: '900', fontSize: isMobile ? '0.88rem' : '1.3rem', color: '#be185d', whiteSpace: 'nowrap' }}>Amara's Collection</span>
        </div>
        <button onClick={() => navigate('/checkout')} style={{ background: '#7c3aed', color: '#fff', border: 'none', borderRadius: '8px', padding: isMobile ? '0.5rem 0.65rem' : '0.5rem 1rem', fontWeight: '600', fontSize: isMobile ? '0.75rem' : '0.85rem', cursor: 'pointer', whiteSpace: 'nowrap' }}>
          🛒 {totalItems}
        </button>
      </div>

      <div style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #be185d 100%)', padding: isMobile ? '2rem 1rem' : '3rem 2rem', textAlign: 'center', color: '#fff' }}>
        <p style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#ddd6fe', marginBottom: '0.5rem' }}>Amara's Collections</p>
        <h1 style={{ fontSize: isMobile ? '2rem' : '2.5rem', fontWeight: '900', margin: '0 0 0.75rem', letterSpacing: '-1px' }}>Kids' Clothing 🧒</h1>
        <p style={{ color: '#ddd6fe', fontSize: isMobile ? '0.9rem' : '1rem', margin: 0 }}>Cute, durable, at comfy — para sa mga bata!</p>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: isMobile ? '1rem' : '2rem' }}>
        <button type="button" aria-pressed={!selectedCategory} onClick={() => setSearchParams({})}
          style={{ marginBottom: '1rem', padding: '0.55rem 1rem', background: selectedCategory ? '#fff' : '#7c3aed', color: selectedCategory ? '#7c3aed' : '#fff', border: '1px solid #7c3aed', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}>
          All kids' products
        </button>
        <div style={{ display: isMobile ? 'flex' : 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: isMobile ? '0.75rem' : '1.25rem', marginBottom: '1.5rem', overflowX: isMobile ? 'auto' : 'visible', paddingBottom: isMobile ? '0.5rem' : 0, scrollSnapType: isMobile ? 'x mandatory' : 'none' }}>
          {CATEGORIES.map(cat => (
            <button key={cat.id} type="button" aria-pressed={selectedCategory?.id === cat.id}
              onClick={() => setSearchParams({ type: cat.id })}
              style={{ borderRadius: '12px', overflow: 'hidden', position: 'relative', cursor: 'pointer', height: isMobile ? '130px' : '160px', width: '100%', flex: isMobile ? '0 0 82%' : 'initial', scrollSnapAlign: 'start', padding: 0, border: selectedCategory?.id === cat.id ? '3px solid #7c3aed' : 'none', textAlign: 'left', fontFamily: 'inherit', background: '#fff' }}>
              <img src={cat.img} alt={cat.label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <div style={{ position: 'absolute', inset: 0, background: `${cat.bg}cc`, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', padding: isMobile ? '1rem' : '1.5rem' }}>
                <div style={{ fontSize: isMobile ? '1.1rem' : '1.3rem', fontWeight: '900', color: '#fff' }}>{cat.label}</div>
                <div style={{ fontSize: isMobile ? '0.9rem' : '1rem', fontWeight: '700', color: '#ddd6fe' }}>{cat.sub}</div>
                <span style={{ marginTop: '0.5rem', background: 'transparent', border: '1.5px solid #fff', color: '#fff', borderRadius: '6px', padding: '0.3rem 0.8rem', fontSize: '0.75rem', fontWeight: '600' }}>Shop now</span>
              </div>
            </button>
          ))}
        </div>
        <div aria-live="polite">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280', fontSize: '1.1rem' }}>⏳ Loading products...</div>
          ) : visibleProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
              <p>No {selectedCategory?.label.toLowerCase() || "kids'"} products found yet.</p>
            </div>
          ) : (
            <>
              <h2 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#1a1a2e', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{selectedCategory?.label || "Kids' Clothing"}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, minmax(0, 1fr))' : 'repeat(auto-fill, minmax(230px, 1fr))', gap: isMobile ? '0.75rem' : '1.25rem' }}>
                {visibleProducts.map(product => <ProductCard key={product.id} product={product} isMobile={isMobile} />)}
              </div>
            </>
          )}
        </div>
      </div>
      <footer style={{ background: '#1a1a2e', color: '#94a3b8', textAlign: 'center', padding: '2rem', fontSize: '0.85rem', marginTop: '3rem' }}>
        © 2025 Amara's Collection. Clothing For Your Little Sunshine. 🌈 🇵🇭
      </footer>
    </div>
  )
}