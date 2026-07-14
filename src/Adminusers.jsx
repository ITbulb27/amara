import { useEffect, useState } from 'react'

const API_URL = 'http://localhost/amara-api'

export default function AdminUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')

  useEffect(() => { loadUsers() }, [])

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
    } catch (err) {
      alert('❌ Network error while updating role.')
    }
  }

  const filtered = users.filter(u =>
    !search ||
    (u.email || '').toLowerCase().includes(search.toLowerCase()) ||
    (u.full_name || '').toLowerCase().includes(search.toLowerCase())
  )

  const th = { padding: '0.65rem 1rem', textAlign: 'left', fontSize: '0.7rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', borderBottom: '1px solid #f0f0f0', background: '#fafafa' }
  const td = { padding: '0.65rem 1rem', borderBottom: '1px solid #f9f9f9' }

  return (
    <div>
      <h1 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1a1a2e', marginBottom: '1.25rem' }}>Users</h1>

      {error && (
        <div style={{ background: '#fef3c7', color: '#92400e', padding: '0.75rem 1rem', borderRadius: '10px', fontSize: '0.85rem', marginBottom: '1rem' }}>
          {error}
        </div>
      )}

      <input placeholder="Search users…" value={search} onChange={e => setSearch(e.target.value)}
        style={{ padding: '0.5rem 0.75rem', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '0.85rem', marginBottom: '1rem', width: '280px', maxWidth: '100%' }} />

      {loading ? <p style={{ color: '#9ca3af' }}>Loading…</p> : (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.83rem', background: '#fff', borderRadius: '12px', overflow: 'hidden', border: '1px solid #f0f0f0' }}>
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
      )}
    </div>
  )
}