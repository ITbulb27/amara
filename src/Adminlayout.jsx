import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

const LINKS = [
  { to: '/admin', label: '📊 Dashboard', end: true },
  { to: '/admin/products', label: '🛍️ Products' },
  { to: '/admin/sales', label: '💰 Sales' },
  { to: '/admin/users', label: '👥 Users' },
]

export default function AdminLayout() {
  const { profile, signOut } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await signOut()
    navigate('/')
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: "'Segoe UI', system-ui, sans-serif", background: '#f9fafb' }}>
      <aside style={{ width: '220px', background: '#1a1a2e', color: '#fff', display: 'flex', flexDirection: 'column', padding: '1.5rem 0', flexShrink: 0 }}>
        <div style={{ padding: '0 1.5rem', marginBottom: '2rem' }}>
          <div style={{ fontWeight: '900', fontSize: '1.1rem', color: '#fff' }}>Amara's</div>
          <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>Admin Panel</div>
        </div>
        <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.25rem', padding: '0 0.75rem' }}>
          {LINKS.map(link => (
            <NavLink key={link.to} to={link.to} end={link.end}
              style={({ isActive }) => ({
                padding: '0.65rem 1rem', borderRadius: '8px', textDecoration: 'none',
                color: isActive ? '#fff' : '#9ca3af', background: isActive ? '#be185d' : 'transparent',
                fontSize: '0.9rem', fontWeight: '600',
              })}>
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div style={{ padding: '0 1.5rem', borderTop: '1px solid #374151', paddingTop: '1rem' }}>
          <div style={{ fontSize: '0.8rem', color: '#9ca3af', marginBottom: '0.75rem', wordBreak: 'break-all' }}>{profile?.email}</div>
          <button onClick={() => navigate('/')} style={{ width: '100%', background: '#374151', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.5rem', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer', marginBottom: '0.5rem' }}>← Back to Site</button>
          <button onClick={handleLogout} style={{ width: '100%', background: '#be185d', color: '#fff', border: 'none', borderRadius: '8px', padding: '0.5rem', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer' }}>Log out</button>
        </div>
      </aside>
      <main style={{ flex: 1, padding: '2rem', overflowX: 'auto' }}>
        <Outlet />
      </main>
    </div>
  )
}