import { useNavigate } from 'react-router-dom'

const CATEGORIES = [
  { label: 'TODDLER', sub: '1–3 Years', bg: '#7c3aed', img: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=400&q=80' },
  { label: 'KIDS', sub: '4–10 Years', bg: '#be185d', img: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400&q=80' },
  { label: 'TEEN', sub: '11–17 Years', bg: '#1a1a2e', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
]

const NEW_PRODUCTS = [
  { id: 1, name: 'Cute Toddler Set', price: '₱199', old: '₱299', img: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=400&q=80', tag: 'New' },
  { id: 2, name: 'Kids Graphic Tee', price: '₱249', old: '₱349', img: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400&q=80', tag: 'New' },
  { id: 3, name: 'Girls Floral Dress', price: '₱299', old: '₱399', img: 'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=400&q=80', tag: 'New' },
  { id: 4, name: 'Boys Polo Set', price: '₱279', old: '₱379', img: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=400&q=80', tag: 'New' },
]

const SPECIAL_PRODUCTS = [
  { id: 5, name: 'School Uniform Set', price: '₱399', old: '₱549', img: 'https://images.unsplash.com/photo-1555009393-f20bdb245c4d?w=400&q=80', tag: 'Sale' },
  { id: 6, name: 'Teen Jogger Set', price: '₱349', old: '₱499', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80', tag: 'Sale' },
  { id: 7, name: 'Baby Onesie Pack', price: '₱249', old: '₱349', img: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?w=400&q=80', tag: 'Sale' },
  { id: 8, name: 'Kids Hoodie', price: '₱399', old: '₱549', img: 'https://images.unsplash.com/photo-1567016526105-22da7c13161a?w=400&q=80', tag: 'Sale' },
]

function ProductCard({ product }) {
  return (
    <div style={{
      background: '#fff', borderRadius: '12px', overflow: 'hidden',
      border: '1px solid #e5e7eb', transition: 'all 0.2s', cursor: 'pointer',
    }}
      onMouseOver={e => e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.1)'}
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
        <p style={{ fontSize: '0.85rem', color: '#6b7280', margin: '0 0 0.25rem', lineHeight: '1.4' }}>{product.name}</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <span style={{ fontWeight: '800', color: '#7c3aed', fontSize: '1rem' }}>{product.price}</span>
          <span style={{ fontSize: '0.8rem', color: '#9ca3af', textDecoration: 'line-through' }}>{product.old}</span>
        </div>
        <button style={{
          width: '100%', background: '#1a1a2e', color: '#fff', border: 'none',
          borderRadius: '8px', padding: '0.55rem', fontSize: '0.85rem', fontWeight: '600', cursor: 'pointer',
        }}
          onMouseOver={e => e.target.style.background = '#7c3aed'}
          onMouseOut={e => e.target.style.background = '#1a1a2e'}
        onClick={() => navigate('/checkout')}>+ Add to cart</button>
      </div>
    </div>
  )
}

export default function KidsPage() {
  const navigate = useNavigate()

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", minHeight: '100vh', background: '#f9fafb' }}>

      {/* HEADER */}
      <div style={{
        background: '#fff', borderBottom: '1px solid #e5e7eb',
        padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button onClick={() => navigate('/')} style={{
            background: '#ede9fe', border: 'none', borderRadius: '8px',
            padding: '0.5rem 1rem', cursor: 'pointer', color: '#7c3aed', fontWeight: '600', fontSize: '0.9rem',
          }}>← Back</button>
          <span style={{ fontWeight: '900', fontSize: '1.3rem', color: '#be185d' }}>Amara's<span style={{ color: '#be185d' }}>Collection</span></span>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>Kids' Clothing</span>
          <button style={{
            background: '#7c3aed', color: '#fff', border: 'none', borderRadius: '8px',
            padding: '0.5rem 1rem', fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer',
          }}>🛒 Cart (0)</button>
        </div>
      </div>

      {/* HERO BANNER */}
      <div style={{
        background: 'linear-gradient(135deg, #7c3aed 0%, #be185d 100%)',
        padding: '3rem 2rem', textAlign: 'center', color: '#fff',
      }}>
        <p style={{ fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#ddd6fe', marginBottom: '0.5rem' }}>Amara's Collections</p>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '900', margin: '0 0 0.75rem', letterSpacing: '-1px' }}>Kids' Clothing 🧒</h1>
        <p style={{ color: '#ddd6fe', fontSize: '1rem', margin: 0 }}>Cute, durable, at comfy — para sa mga bata!</p>
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
                <div style={{ fontSize: '1rem', fontWeight: '700', color: '#ddd6fe' }}>{cat.sub}</div>
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
        © 2025 Amara's Clothing Boutique For Your Little Sunshine. 🌈. 🇵🇭
      </footer>

    </div>
  )
}