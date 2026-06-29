import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ContactForm from './ContactForm'
import clothing1 from './assets/clothing1.webp'
import amaraLogo from './assets/amara.jpg'
import clothing4 from './assets/clothing4.webp'
import clothing2 from './assets/clothing2.webp'
import clothing3 from './assets/clothing3.webp'

const NAV_LINKS = ['Collections', 'About', 'Why Us', 'Contact']

const COLLECTIONS = [
  {
    icon: '👔', title: "Men's Wear",
    img: clothing1,
    desc: 'Polos, chinos, barongs, and everyday essentials for the modern Filipino man.',
    details: ['🔵 Polo shirts — ₱299 to ₱599', '👖 Chino pants — ₱499 to ₱899', '🤵 Barong Tagalog — ₱799 to ₱1,499', '👟 Casual tees — ₱199 to ₱399'],
    note: 'Sizes: XS to 3XL available',
    link: '/mens',
  },
  {
    icon: '👗', title: "Women's Wear",
    img: clothing2,
    desc: 'Dresses, blouses, and co-ords perfect for work, casual, and special occasions.',
    details: ['👗 Casual dresses — ₱399 to ₱799', '👚 Blouses — ₱299 to ₱599', '👘 Co-ord sets — ₱599 to ₱1,199', '🩱 Tops & tanks — ₱199 to ₱449'],
    note: 'Sizes: XS to 3XL available',
    link: '/women',
  },
  {
    icon: '👕', title: 'Streetwear',
    img: clothing3,
    desc: 'Trendy tees, hoodies, and joggers for the youth who want to stand out.',
    details: ['👕 Graphic tees — ₱249 to ₱499', '🧥 Hoodies — ₱599 to ₱999', '🩳 Jogger pants — ₱399 to ₱699', '🧢 Caps & accessories — ₱149 to ₱349'],
    note: 'Limited drops every Friday!',
    link: '/streetwear',
  },
  {
    icon: '🧒', title: "Kids' Clothing",
    link: '/kids',
    img: clothing4,
    desc: 'Cute, durable, and comfy outfits for toddlers up to teens.',
    details: ['👶 Toddler sets (1–3 yrs) — ₱199 to ₱399', '🧒 Kids tops & bottoms (4–10 yrs) — ₱249 to ₱499', '👦 Teen wear (11–17 yrs) — ₱299 to ₱599', '🎒 School uniforms — ₱399 to ₱699'],
    note: 'Sizes: 1T to 16 available',
  },
]

const STATS = [
  { value: '5,000+', label: 'Happy customers' },
  { value: '200+', label: 'Styles available' },
  { value: '4.9★', label: 'Average rating' },
  { value: '3 days', label: 'Nationwide delivery' },
]

const WHY_US = [
  { icon: '💰', title: 'Great value for money', desc: 'Quality clothing thats not expensive — you can still save.' },
  { icon: '🚚', title: 'Fast delivery', desc: 'Luzon, Visayas, Mindanao — we reach every corner of the Philippines.' },
  { icon: '🔄', title: 'Easy exchanges', desc: 'Wrong size? No problem. 7-day hassle-free exchange.' },
  { icon: '✅', title: 'Legit and trusted', desc: 'COD accepted. Thousands trust us since 2018.' },
]

export default function App() {
  const [modal, setModal] = useState(null)
  const navigate = useNavigate()

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleCardClick = (item) => {
    if (item.link) {
      navigate(item.link)
    } else {
      setModal(item)
    }
  }

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", color: '#1a1a2e', overflowX: 'hidden' }}>

      {/* MODAL */}
      {modal && (
        <div onClick={() => setModal(null)} style={{
          position: 'fixed', inset: 0, zIndex: 200,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: '#fff', borderRadius: '16px', padding: '2rem',
            maxWidth: '420px', width: '100%', position: 'relative',
          }}>
            <button onClick={() => setModal(null)} style={{
              position: 'absolute', top: '1rem', right: '1rem',
              background: '#f3f4f6', border: 'none', borderRadius: '50%',
              width: '32px', height: '32px', cursor: 'pointer', fontSize: '1rem',
            }}>✕</button>
            {modal.img && <img src={modal.img} alt={modal.title} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '10px', marginBottom: '1rem' }} />}
            <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{modal.icon}</div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: '800', margin: '0 0 0.5rem', color: '#1a1a2e' }}>{modal.title}</h2>
            <p style={{ fontSize: '0.9rem', color: '#64748b', marginBottom: '1.25rem' }}>{modal.desc}</p>
            <div style={{ borderTop: '1px solid #fce7f3', paddingTop: '1rem', marginBottom: '1rem' }}>
              {modal.details.map(d => <p key={d} style={{ fontSize: '0.9rem', color: '#374151', margin: '0.4rem 0' }}>{d}</p>)}
            </div>
            <p style={{ fontSize: '0.8rem', color: '#be185d', fontWeight: '600', margin: '0 0 1.25rem' }}>📏 {modal.note}</p>
            <button onClick={() => { setModal(null); scrollTo('contact') }} style={{
              width: '100%', background: '#be185d', color: '#fff', border: 'none',
              borderRadius: '10px', padding: '0.8rem', fontWeight: '700', fontSize: '1rem', cursor: 'pointer',
            }}>Order now →</button>
          </div>
        </div>
      )}

      {/* NAVBAR */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(8px)',
        borderBottom: '1px solid #fce7f3',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 2rem', height: '64px',
      }}>
        <img src={amaraLogo} alt="Amara's Collection"
        style={{ height: '55px', width: '55px', borderRadius: '100%', objectFit: 'cover' }} />
        <span style={{ fontSize: '1rem', fontWeight: '1000', color: '#9d174d', letterSpacing: '0.05em' }}>
         Amara's Collection
        </span>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {NAV_LINKS.map(link => (
            <button key={link} onClick={() => scrollTo(link.toLowerCase().replace(' ', ''))}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '500', color: '#374151' }}>
              {link}
            </button>
          ))}
        </div>
        <button onClick={() => scrollTo('contact')} style={{
          background: '#be185d', color: '#fff', border: 'none', borderRadius: '8px',
          padding: '0.5rem 1.25rem', fontWeight: '700', fontSize: '0.9rem', cursor: 'pointer',
        }}>Shop now</button>
      </nav>

      {/* HERO — blurred logo background */}
      <section style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        position: 'relative', overflow: 'hidden', padding: '7rem 2rem 4rem',
      }}>
        {/* Blurred background logo */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${amaraLogo})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(18px) brightness(0.92)',
          transform: 'scale(1.1)',
          zIndex: 0,
        }} />
        {/* White overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(255,255,255,0.6)',
          zIndex: 1,
        }} />

        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          {/* Logo circle */}
          <img src={amaraLogo} alt="Amara's logo" style={{
            width: '120px', height: '120px', borderRadius: '50%',
            objectFit: 'cover', marginBottom: '1.5rem',
            boxShadow: '0 8px 32px rgba(190,24,93,0.18)',
            border: '4px solid #fff',
          }} />
          <div style={{
            display: 'inline-block', background: '#fce7f3', color: '#be185d',
            fontSize: '0.8rem', fontWeight: '700', letterSpacing: '0.1em',
            textTransform: 'uppercase', padding: '0.35rem 1rem', borderRadius: '100px', marginBottom: '1.5rem',
          }}>🌈 Clothing For Your Little Sunshine</div>
          <h1 style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', fontWeight: '900', lineHeight: '1.1', letterSpacing: '-1.5px', margin: '0 0 1.5rem', color: '#1a1a2e' }}>
            Amara's Clothing<br /><span style={{ color: '#be185d' }}>Boutique.</span>
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#64748b', lineHeight: '1.8', maxWidth: '500px', margin: '0 auto 2.5rem' }}>
           
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button onClick={() => scrollTo('collections')} style={{
              background: '#be185d', color: '#fff', border: 'none', borderRadius: '10px',
              padding: '0.85rem 2rem', fontWeight: '700', fontSize: '1rem', cursor: 'pointer',
            }}>View the collection</button>
            <button onClick={() => scrollTo('contact')} style={{
              background: 'transparent', color: '#be185d', border: '2px solid #be185d',
              borderRadius: '10px', padding: '0.85rem 2rem', fontWeight: '700', fontSize: '1rem', cursor: 'pointer',
            }}>Order now</button>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: '#be185d', padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2rem', textAlign: 'center' }}>
          {STATS.map(({ value, label }) => (
            <div key={label}>
              <div style={{ fontSize: '2.2rem', fontWeight: '900', color: '#fce7f3', lineHeight: '1' }}>{value}</div>
              <div style={{ fontSize: '0.9rem', color: '#fbcfe8', marginTop: '0.5rem' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* COLLECTIONS */}
      <section id="collections" style={{ padding: '6rem 2rem', background: '#fff' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <p style={{ color: '#be185d', fontWeight: '700', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Our product</p>
          <h2 style={{ fontSize: '2.25rem', fontWeight: '900', letterSpacing: '-0.5px', margin: '0 0 3rem', color: '#1a1a2e' }}>Collection for everyone</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {COLLECTIONS.map((item) => (
              <div key={item.title} onClick={() => handleCardClick(item)} style={{
                background: '#fff', borderRadius: '14px', padding: '2rem',
                border: '1px solid #fce7f3', cursor: 'pointer', transition: 'all 0.2s',
              }}
                onMouseOver={e => { e.currentTarget.style.boxShadow = '0 8px 30px rgba(190,24,93,0.12)'; e.currentTarget.style.transform = 'translateY(-4px)' }}
                onMouseOut={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'translateY(0)' }}
              >
                {item.img && <img src={item.img} alt={item.title} style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1rem' }} />}
                <div style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>{item.icon}</div>
                <h3 style={{ fontWeight: '700', fontSize: '1.05rem', marginBottom: '0.6rem', color: '#1a1a2e' }}>{item.title}</h3>
                <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: '1.6', margin: '0 0 1rem' }}>{item.desc}</p>
                <span style={{ fontSize: '0.8rem', color: '#be185d', fontWeight: '600' }}>
                  {item.link ? 'See all →' : 'Tingnan ang presyo →'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section id="whyus" style={{ padding: '6rem 2rem', background: '#fff0f6' }}>
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <p style={{ color: '#be185d', fontWeight: '700', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
Why us</p>
          <h2 style={{ fontSize: '2.25rem', fontWeight: '900', letterSpacing: '-0.5px', margin: '0 0 3rem', color: '#1a1a2e' }}>The Amara difference</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
            {WHY_US.map(({ icon, title, desc }) => (
              <div key={title} style={{ background: '#fff', borderRadius: '14px', padding: '2rem', border: '1px solid #fce7f3' }}>
                <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>{icon}</div>
                <h3 style={{ fontWeight: '700', fontSize: '1rem', marginBottom: '0.5rem', color: '#1a1a2e' }}>{title}</h3>
                <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: '1.6', margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: '6rem 2rem', background: '#fff' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <img src={amaraLogo} alt="Amara's" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', marginBottom: '1.5rem', border: '3px solid #fce7f3' }} />
          <p style={{ color: '#be185d', fontWeight: '700', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>Amara Clothing Boutique</p>
          <h3 style={{ fontSize: '2rem', fontWeight: '900', letterSpacing: '-0.5px', margin: '0 0 1.5rem', color: '#1a1a2e' }}></h3>
          <p style={{ fontSize: '1.05rem', color: '#64748b', lineHeight: '1.8' }}>
           About Amara Clothing Boutique

Welcome to Amara Clothing Boutique, where fashion meets confidence. We are passionate about offering stylish, high-quality, and affordable clothing that helps every customer express their unique personality.

At Amara Clothing Boutique, we carefully select trendy and timeless pieces for every occasion—from casual everyday wear to elegant outfits for special events. Our goal is to make fashion accessible while providing excellent customer service and a fun shopping experience.

Whether you shop with us in-store or online, we are committed to helping you find outfits that make you look and feel your best.

Our Mission
To provide fashionable, high-quality, and affordable clothing that inspires confidence and allows every customer to express their personal style.

Our Vision
To become a trusted fashion boutique known for quality products, exceptional service, and helping customers feel confident in every outfit they wear.
          </p>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ background: '#fff0f6', padding: '4rem 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
          <p style={{ color: '#be185d', fontWeight: '700', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Contact
</p>
          <h2 style={{ fontSize: '2rem', fontWeight: '900', color: '#1a1a2e', margin: '0.5rem 0 0' }}>Let's order! 🌈</h2>
        </div>
        <ContactForm />
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#1a1a2e', color: '#94a3b8', textAlign: 'center', padding: '2rem', fontSize: '0.85rem' }}>
        © 2025 Amara's Clothing Boutique. Clothing For Your Little Sunshine. 🌈
      </footer>

    </div>
  )
}