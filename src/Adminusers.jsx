import { useEffect, useState } from 'react'

const API_URL = 'http://localhost/amara-api'

export default function AdminUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= 768 : false)

  async function loadUsers() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API_URL}/users.php`, { credentials: 'include' })
      const json = await res.json()
      if (!res.ok) {
        setError('❌ ' + (json.error || 'Failed to load users.'))
        setUsers([])
      } else {
        setUsers(json.data || [])
      }
    } catch (err) {
      console.error('Failed to load users:', err)
      setError('⚠️ Wala ma-reach ang users.php. Siguraduha nga naka-Start ang Apache/MySQL sa XAMPP.')
    }
    setLoading(false)
  }

  useEffect(() => {
    function handleResize() { setIsMobile(window.innerWidth <= 768) }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { loadUsers() }, [])

  async function toggleRole(id, currentRole) {
    const newRole = currentRole === 'admin' ? 'user' : 'admin'
    if (!confirm(`Change role to "${newRole}"?`)) return
    try {
      const res = await fetch(`${API_URL}/users.php`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, role: newRole }),
      })
      if (!res.ok) {
        const json = await res.json()
        alert('❌ ' + (json.error || 'Failed to update role.'))
        return
      }
      setUsers(users.map(u => u.id === id ? { ...u, role: newRole } : u))
    } catch {
      alert('❌ Network error while updating role.')
    }
  }

  const filtered = users.filter(u =>
    !search ||
    (u.email || '').toLowerCase().includes(search.toLowerCase()) ||
    (u.full_name || '').toLowerCase().includes(search.toLowerCase())
  )

  const th = { padding: isMobile ? '0.5rem 0.65rem' : '0.65rem 1rem', textAlign: 'left', fontSize: isMobile ? '0.62rem' : '0.7rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', borderBottom: '1px solid #f0f0f0', background: '#fafafa', whiteSpace: 'nowrap' }
  const td = { padding: isMobile ? '0.5rem 0.65rem' : '0.65rem 1rem', borderBottom: '1px solid #f9f9f9' }

  return (
    <div>
      <h1 style={{ fontSize: isMobile ? '1.15rem' : '1.5rem', fontWeight: '800', color: '#1a1a2e', marginBottom: isMobile ? '1rem' : '1.25rem' }}>Users</h1>

      {error && (
        <div style={{ background: '#fef3c7', color: '#92400e', padding: isMobile ? '0.6rem 0.8rem' : '0.75rem 1rem', borderRadius: '10px', fontSize: isMobile ? '0.75rem' : '0.85rem', marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      <input placeholder="Search users…" value={search} onChange={e => setSearch(e.target.value)}
        style={{ padding: isMobile ? '0.45rem 0.65rem' : '0.5rem 0.75rem', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: isMobile ? '0.8rem' : '0.85rem', marginBottom: '1rem', width: isMobile ? '100%' : '280px', maxWidth: '100%', boxSizing: 'border-box' }} />

      {loading ? <p style={{ color: '#9ca3af' }}>Loading…</p> : (
        <div style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid #f0f0f0' }}>
        <table style={{ width: '100%', minWidth: isMobile ? '560px' : 'auto', borderCollapse: 'collapse', fontSize: isMobile ? '0.75rem' : '0.83rem', background: '#fff' }}>
          <thead>
            <tr>{['Name', 'Email', 'Role', 'Joined', ''].map(h => <th key={h} style={th}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u.id}>
                <td style={{ ...td, fontWeight: 700 }}>{u.full_name || '—'}</td>
                <td style={{ ...td, color: '#6b7280' }}>{u.email}</td>
                <td style={td}>
                  <span style={{ background: u.role === 'admin' ? '#fce7f3' : '#f3f4f6', color: u.role === 'admin' ? '#be185d' : '#374151', padding: '2px 8px', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 700 }}>{u.role}</span>
                </td>
                <td style={{ ...td, color: '#6b7280' }}>{u.created_at ? new Date(u.created_at).toLocaleDateString() : '—'}</td>
                <td style={td}>
                  <button onClick={() => toggleRole(u.id, u.role)} style={{ padding: '0.35rem 0.7rem', borderRadius: '6px', border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 600 }}>
                    Make {u.role === 'admin' ? 'User' : 'Admin'}
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && !error && <tr><td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: '#9ca3af' }}>No users found.</td></tr>}
          </tbody>
        </table>
        </div>
      )}
    </div>
  )
}