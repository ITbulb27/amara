import { useNavigate } from 'react-router-dom'

const CATEGORIES = [
  { label: 'HOODIES', sub: '& SWEATSHIRTS', bg: '#111827', img: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400&q=80' },
  { label: 'GRAPHIC', sub: 'TEES', bg: '#374151', img: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&q=80' },
  { label: 'JOGGERS', sub: '& BOTTOMS', bg: '#1a1a2e', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80' },
]

const NEW_PRODUCTS = [
  { id: 1, name: 'Black Oversized Hoodie', price: '₱599', old: '₱799', img: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400&q=80', tag: 'New' },
  { id: 2, name: 'Graphic Print Tee', price: '₱249', old: '₱349', img: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&q=80', tag: 'New' },
  { id: 3, name: 'Cargo Jogger Pants', price: '₱499', old: '₱699', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80', tag: 'New' },
  { id: 4, name: 'Streetwear Cap', price: '₱199', old: '₱299', img: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&q=80', tag: 'New' },
]

const SPECIAL_PRODUCTS = [
  { id: 5, name: 'Zip-Up Hoodie', price: '₱699', old: '₱999', img: 'https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=400&q=80', tag: 'Sale' },
  { id: 6, name: 'Baggy Cargo Shorts', price: '₱349', old: '₱499', img: 'https://images.unsplash.com/photo-1591195853828-11db59a44f43?w=400&q=80', tag: 'Sale' },
  { id: 7, name: 'Retro Graphic Tee', price: '₱299', old: '₱399', img: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&q=80', tag: 'Sale' },
  { id: 8, name: 'Snapback Cap', price: '₱149', old: '₱249', img: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=400&q=80', tag: 'Sale' },
]

function ProductCard({ product, navigate }) {
  return (
    <div
      style={{
        background: '#fff', borderRadius: '12px', overflow: 'hidden',
        border: '1px solid #e5e7eb', transition: 'all 0.2s', cursor: 'pointer',
      }}
      onMouseOver={e => e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)'}
      onMouseOut={e => e.currentTarget.style.boxShadow = 'none'}
    >
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <img
          src={product.img} alt={product.name}
          style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block', transition: 'transform 0.3s' }}
          onMouseOver={e => e.target.style.transform = 'scale(1.05)'}
          onMouseOut={e => e.target.style.transform = 'scale(1)'}
        />
        {product.tag && (
          <span style={{
            position: 'absolute', top: '0.75rem', left: '0.75rem',
            background: product.tag === 'Sale' ? '#ef4444' : '#10b981',
            color: '#fff', fontSize: '0.7rem', fontWeight: '700',
            padding: '0.2rem 0.6rem', borderRadius: '100px',
          }}>{product.tag}</span>
        )}
      </div>
      <div style={{ padding: '1rem' }}>
        <p style={{ fontSize: '0.85rem', color: '#6b7280', margin: '0 0 0.25rem' }}>{product.name}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <span style={{ fontWeight: '800', color: '#111827', fontSize: '1rem' }}>{product.price}</span>
          <span style={{ fontSize: '0.8rem', color: '#9ca3af', textDecoration: 'line-through' }}>{product.old}</span>
        </div>
        <button
          onClick={() => navigate('/checkout', { state: { product } })}
          style={{
            width: '100%', background: '#111827', color: '#fff', border: 'none',
            borderRadius: '8px', padding: '0.55rem', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer',
          }}
          onMouseOver={e => e.target.style.background = '#374151'}
          onMouseOut={e => e.target.style.background = '#111827'}
        >+ Add to cart</button>
      </div>
    </div>
  )
}

export default function StreetwearPage() {
  const navigate = useNavigate()

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", minHeight: '100vh', background: '#f9fafb' }}>

      {/* HEADER */}
      <div style={{
        background: '#111827', borderBottom: '1px solid #374151',
        padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button onClick={() => navigate('/')} style={{
            background: '#374151', border: 'none', borderRadius: '8px',
            padding: '0.5rem 1rem', cursor: 'pointer', color: '#fff', fontWeight: '600', fontSize: '0.9rem',
          }}>← Back</button>
          <span style={{ fontWeight: '900', fontSize: '1.3rem', color: '#fff' }}>Amara's<span style={{ color: '#9ca3af' }}> Collection</span></span>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.9rem', color: '#9ca3af' }}>Streetwear</span>
          <button
            onClick={() => navigate('/checkout')}
            style={{
              background: '#fff', color: '#111827', border: 'none', borderRadius: '8px',
              padding: '0.5rem 1rem', fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer',
            }}>🛒 Cart (0)</button>
        </div>
      </div>

      {/* HERO BANNER */}
      <div style={{
        background: 'linear-gradient(135deg, #111827 0%, #374151 100%)',
        padding: '3rem 2rem', textAlign: 'center', color: '#fff',
      }}>
        <p style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '0.5rem' }}>Amara's Collection</p>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '900', margin: '0 0 0.75rem', letterSpacing: '-1px' }}>Streetwear 👕</h1>
        <p style={{ color: '#9ca3af', fontSize: '1rem', margin: 0 }}>Trendy tees, hoodies, joggers — para sa youth na gustong mag-stand out!</p>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem' }}>

        {/* NEW PRODUCTS */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#1a1a2e', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            New products
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '1.25rem' }}>
            {NEW_PRODUCTS.map(p => <ProductCard key={p.id} product={p} navigate={navigate} />)}
          </div>
        </div>

        {/* SPECIAL PRODUCTS */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#1a1a2e', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Special products
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '1.25rem' }}>
            {SPECIAL_PRODUCTS.map(p => <ProductCard key={p.id} product={p} navigate={navigate} />)}
          </div>
        </div>

        {/* CATEGORY BANNERS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.25rem' }}>
          {CATEGORIES.map(cat => (
            <div key={cat.label} style={{ borderRadius: '12px', overflow: 'hidden', position: 'relative', cursor: 'pointer', height: '160px' }}>
              <img src={cat.img} alt={cat.label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <div style={{
                position: 'absolute', inset: 0, background: `${cat.bg}dd`,
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                justifyContent: 'center', padding: '1.5rem',
              }}>
                <div style={{ fontSize: '1.3rem', fontWeight: '900', color: '#fff', lineHeight: '1' }}>{cat.label}</div>
                <div style={{ fontSize: '1rem', fontWeight: '700', color: '#9ca3af' }}>{cat.sub}</div>
                <button style={{
                  marginTop: '0.75rem', background: 'transparent', border: '1.5px solid #fff',
                  color: '#fff', borderRadius: '6px', padding: '0.3rem 0.8rem',
                  fontSize: '0.75rem', fontWeight: '600', cursor: 'pointer',
                }}>Shop now</button>
              </div>
            </div>
          ))}
        </div>

      </div>

      <footer style={{ background: '#111827', color: '#6b7280', textAlign: 'center', padding: '2rem', fontSize: '0.85rem', marginTop: '3rem' }}>
        © 2025 Amara's Collection. Clothing For Your Little Sunshine. 🌈
      </footer>

    </div>
  )
}