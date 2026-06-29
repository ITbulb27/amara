import { useNavigate } from 'react-router-dom'

const CATEGORIES = [
  { label: 'DRESSES', sub: '& CO-ORDS', bg: '#be185d', img: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&q=80' },
  { label: 'TOPS', sub: '& BLOUSES', bg: '#9d174d', img: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=400&q=80' },
  { label: 'FORMAL', sub: '& WORK WEAR', bg: '#1a1a2e', img: 'https://images.unsplash.com/photo-1551803091-e20673f15770?w=400&q=80' },
]

const NEW_PRODUCTS = [
  { id: 1, name: 'Floral Summer Dress', price: '₱399', old: '₱549', img: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&q=80', tag: 'New' },
  { id: 2, name: 'Linen Co-ord Set', price: '₱599', old: '₱799', img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&q=80', tag: 'New' },
  { id: 3, name: 'Casual Blouse', price: '₱299', old: '₱399', img: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=400&q=80', tag: 'New' },
  { id: 4, name: 'Flowy Midi Skirt', price: '₱449', old: '₱599', img: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&q=80', tag: 'New' },
]

const SPECIAL_PRODUCTS = [
  { id: 5, name: 'Work Blazer Set', price: '₱799', old: '₱1,099', img: 'https://images.unsplash.com/photo-1551803091-e20673f15770?w=400&q=80', tag: 'Sale' },
  { id: 6, name: 'Evening Dress', price: '₱699', old: '₱999', img: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&q=80', tag: 'Sale' },
  { id: 7, name: 'Casual Tank Top', price: '₱199', old: '₱299', img: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&q=80', tag: 'Sale' },
  { id: 8, name: 'Printed Wrap Dress', price: '₱499', old: '₱699', img: 'https://images.unsplash.com/photo-1572804013427-4d7ca7268217?w=400&q=80', tag: 'Sale' },
]

function ProductCard({ product }) {
  return (
    <div style={{
      background: '#fff', borderRadius: '12px', overflow: 'hidden',
      border: '1px solid #fce7f3', transition: 'all 0.2s', cursor: 'pointer',
    }}
      onMouseOver={e => e.currentTarget.style.boxShadow = '0 8px 24px rgba(190,24,93,0.12)'}
      onMouseOut={e => e.currentTarget.style.boxShadow = 'none'}
    >
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <img src={product.img} alt={product.name}
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
          <span style={{ fontWeight: '800', color: '#be185d', fontSize: '1rem' }}>{product.price}</span>
          <span style={{ fontSize: '0.8rem', color: '#9ca3af', textDecoration: 'line-through' }}>{product.old}</span>
        </div>
        <button style={{
          width: '100%', background: '#1a1a2e', color: '#fff', border: 'none',
          borderRadius: '8px', padding: '0.55rem', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer',
        }}
          onMouseOver={e => e.target.style.background = '#be185d'}
          onMouseOut={e => e.target.style.background = '#1a1a2e'}
        onClick={() => navigate('/checkout')}>+ Add to cart</button>
      </div>
    </div>
  )
}

export default function WomenPage() {
  const navigate = useNavigate()

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", minHeight: '100vh', background: '#f9fafb' }}>

      {/* HEADER */}
      <div style={{
        background: '#fff', borderBottom: '1px solid #fce7f3',
        padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button onClick={() => navigate('/')} style={{
            background: '#fce7f3', border: 'none', borderRadius: '8px',
            padding: '0.5rem 1rem', cursor: 'pointer', color: '#be185d', fontWeight: '600', fontSize: '0.9rem',
          }}>← Back</button>
          <span style={{ fontWeight: '900', fontSize: '1.3rem', color: '#be185d' }}>Amara's<span style={{ color: '#be185d' }}> Collection</span></span>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>Women's Wear</span>
          <button style={{
            background: '#be185d', color: '#fff', border: 'none', borderRadius: '8px',
            padding: '0.5rem 1rem', fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer',
          }}>🛒 Cart (0)</button>
        </div>
      </div>

      {/* HERO BANNER */}
      <div style={{
        background: 'linear-gradient(135deg, #9d174d 0%, #be185d 50%, #f9a8d4 100%)',
        padding: '3rem 2rem', textAlign: 'center', color: '#fff',
      }}>
        <p style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#fce7f3', marginBottom: '0.5rem' }}>Amara's Collection</p>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '900', margin: '0 0 0.75rem', letterSpacing: '-1px' }}>Women's Wear 👗</h1>
        <p style={{ color: '#fce7f3', fontSize: '1rem', margin: 0 }}>Dresses, blouses, co-ords — para sa modernang Pilipina!</p>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem' }}>

        {/* NEW PRODUCTS */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#1a1a2e', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            New products
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '1.25rem' }}>
            {NEW_PRODUCTS.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>

        {/* SPECIAL PRODUCTS */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '800', color: '#1a1a2e', marginBottom: '1.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Special products
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '1.25rem' }}>
            {SPECIAL_PRODUCTS.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>

        {/* CATEGORY BANNERS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.25rem' }}>
          {CATEGORIES.map(cat => (
            <div key={cat.label} style={{ borderRadius: '12px', overflow: 'hidden', position: 'relative', cursor: 'pointer', height: '160px' }}>
              <img src={cat.img} alt={cat.label} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              <div style={{
                position: 'absolute', inset: 0, background: `${cat.bg}cc`,
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                justifyContent: 'center', padding: '1.5rem',
              }}>
                <div style={{ fontSize: '1.3rem', fontWeight: '900', color: '#fff', lineHeight: '1' }}>{cat.label}</div>
                <div style={{ fontSize: '1rem', fontWeight: '700', color: '#fce7f3' }}>{cat.sub}</div>
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

      <footer style={{ background: '#1a1a2e', color: '#94a3b8', textAlign: 'center', padding: '2rem', fontSize: '0.85rem', marginTop: '3rem' }}>
        © 2025 Amara's Collection. Clothing For Your Little Sunshine. 🌈
      </footer>

    </div>
  )
}