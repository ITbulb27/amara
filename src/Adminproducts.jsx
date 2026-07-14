import { useEffect, useState } from 'react'
import { formatPrice } from './utils'

const API_URL = 'http://localhost/amara-api'
const CATEGORIES = ['mens', 'women', 'kids', 'streetwear']
const STATUS_OPTS = ['Active', 'Draft', 'Out of stock']
const emptyRow = () => ({ name: '', price: '', old_price: '', image: '', category: 'mens', tag: '', stock: 0, status: 'Active' })

const s = {
  toolbar: { display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap', alignItems: 'center' },
  input: { padding: '0.5rem 0.75rem', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '0.85rem', outline: 'none', background: '#fff' },
  btn: { padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid #e5e7eb', background: '#fff', color: '#374151', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 },
  btnPrimary: { padding: '0.5rem 1.1rem', borderRadius: '8px', border: 'none', background: '#be185d', color: '#fff', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 700 },
  btnDanger: { padding: '0.35rem 0.65rem', borderRadius: '6px', border: 'none', background: '#fee2e2', color: '#991b1b', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '0.83rem', background: '#fff', borderRadius: '12px', overflow: 'hidden', border: '1px solid #f0f0f0' },
  th: { padding: '0.65rem 1rem', textAlign: 'left', fontSize: '0.7rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', borderBottom: '1px solid #f0f0f0', background: '#fafafa' },
  td: { padding: '0.65rem 1rem', borderBottom: '1px solid #f9f9f9', color: '#374151', verticalAlign: 'middle' },
  overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem' },
  modal: { background: '#fff', borderRadius: '16px', width: '640px', maxWidth: '95vw', maxHeight: '90vh', overflowY: 'auto' },
  modalHead: { padding: '1rem 1.25rem', borderBottom: '1px solid #f0f0f0', fontWeight: 800, fontSize: '1rem', color: '#1a1a2e', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, background: '#fff' },
  modalBody: { padding: '1.25rem' },
  modalFoot: { padding: '0.85rem 1.25rem', borderTop: '1px solid #f0f0f0', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', position: 'sticky', bottom: 0, background: '#fff' },
  formGroup: { marginBottom: '0.85rem' },
  formLabel: { fontSize: '0.78rem', color: '#6b7280', fontWeight: 600, display: 'block', marginBottom: '4px' },
  formInput: { width: '100%', padding: '0.5rem 0.75rem', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' },
  formRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' },
  tabs: { display: 'flex', gap: 0, borderBottom: '1px solid #e5e7eb', marginBottom: '1rem' },
  tab: (active) => ({ padding: '0.5rem 1rem', fontSize: '0.85rem', cursor: 'pointer', border: 'none', background: 'none', borderBottom: active ? '2px solid #be185d' : '2px solid transparent', color: active ? '#be185d' : '#6b7280', fontWeight: active ? 700 : 500 }),
  uploadBox: { border: '1.5px dashed #e5e7eb', borderRadius: '10px', padding: '1rem', textAlign: 'center', cursor: 'pointer', background: '#fafafa' },
  previewImg: { width: '100%', maxHeight: '160px', objectFit: 'contain', borderRadius: '8px', marginBottom: '0.6rem', background: '#f3f4f6' },
}

function ProductForm({ row, onChange }) {
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')

  async function handleFileSelect(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadError('')
    setUploading(true)

    const formData = new FormData()
    formData.append('image', file)

    try {
      const res = await fetch(`${API_URL}/upload-image.php`, {
        method: 'POST',
        credentials: 'include',
        body: formData,
      })
      const data = await res.json()

      if (!res.ok) {
        setUploadError('❌ ' + (data.error || 'Upload failed.'))
        setUploading(false)
        return
      }

      onChange({ ...row, image: data.url })
    } catch (err) {
      setUploadError('❌ Network error during upload.')
    }
    setUploading(false)
  }

  return (
    <div style={{ border: '1px solid #f0f0f0', borderRadius: '10px', padding: '1rem', marginBottom: '0.75rem' }}>
      <div style={s.formGroup}><label style={s.formLabel}>Product name</label><input style={s.formInput} value={row.name} onChange={e => onChange({ ...row, name: e.target.value })} /></div>
      <div style={s.formRow}>
        <div style={s.formGroup}><label style={s.formLabel}>Price (₱)</label><input type="number" style={s.formInput} value={row.price} onChange={e => onChange({ ...row, price: e.target.value })} /></div>
        <div style={s.formGroup}><label style={s.formLabel}>Old price (₱, optional)</label><input type="number" style={s.formInput} value={row.old_price} onChange={e => onChange({ ...row, old_price: e.target.value })} /></div>
      </div>
      <div style={s.formRow}>
        <div style={s.formGroup}><label style={s.formLabel}>Category</label>
          <select style={s.formInput} value={row.category} onChange={e => onChange({ ...row, category: e.target.value })}>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div style={s.formGroup}><label style={s.formLabel}>Tag</label>
          <select style={s.formInput} value={row.tag} onChange={e => onChange({ ...row, tag: e.target.value })}>
            <option value="">None</option><option value="New">New</option><option value="Sale">Sale</option>
          </select>
        </div>
      </div>
      <div style={s.formRow}>
        <div style={s.formGroup}><label style={s.formLabel}>Stock quantity</label><input type="number" style={s.formInput} value={row.stock} onChange={e => onChange({ ...row, stock: e.target.value })} /></div>
        <div style={s.formGroup}><label style={s.formLabel}>Status</label>
          <select style={s.formInput} value={row.status} onChange={e => onChange({ ...row, status: e.target.value })}>
            {STATUS_OPTS.map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
      </div>

      <div style={s.formGroup}>
        <label style={s.formLabel}>Product Image</label>

        {row.image && (
          <img src={row.image} alt="preview" style={s.previewImg} onError={e => { e.target.style.display = 'none' }} />
        )}

        <label style={s.uploadBox}>
          <input type="file" accept="image/*" onChange={handleFileSelect} style={{ display: 'none' }} disabled={uploading} />
          <span style={{ fontSize: '0.85rem', color: '#6b7280', fontWeight: 600 }}>
            {uploading ? '⏳ Ni-uploading…' : row.image ? '📷 Change image' : '📷 Click to upload image'}
          </span>
        </label>

        {uploadError && <p style={{ fontSize: '0.75rem', color: '#ef4444', margin: '0.4rem 0 0' }}>{uploadError}</p>}

        <div style={{ marginTop: '0.6rem' }}>
          <label style={{ ...s.formLabel, fontSize: '0.72rem' }}>or paste the image URL</label>
          <input style={s.formInput} value={row.image} onChange={e => onChange({ ...row, image: e.target.value })} placeholder="https://…" />
        </div>
      </div>
    </div>
  )
}

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [catFilter, setCatFilter] = useState('All')
  const [editProduct, setEditProduct] = useState(null)
  const [addOpen, setAddOpen] = useState(false)
  const [addMode, setAddMode] = useState('single')
  const [rows, setRows] = useState([emptyRow()])
  const [toast, setToast] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => { loadProducts() }, [])

  async function loadProducts() {
    setLoading(true)
    try {
      const res = await fetch(`${API_URL}/products.php?admin=1`, { credentials: 'include' })
      const data = await res.json()
      setProducts(data.data || [])
    } catch (err) {
      console.error('Failed to load products:', err)
    }
    setLoading(false)
  }

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 2500) }

  const filtered = products.filter(p =>
    (catFilter === 'All' || p.category === catFilter) &&
    (!search || p.name.toLowerCase().includes(search.toLowerCase()))
  )

  function openAdd() {
    setRows([emptyRow()])
    setAddMode('single')
    setAddOpen(true)
  }

  async function handleSaveNew() {
    const payload = rows
      .filter(r => r.name.trim())
      .map(r => ({ ...r, price: Number(r.price) || 0, old_price: r.old_price ? Number(r.old_price) : null, stock: Number(r.stock) || 0 }))
    if (payload.length === 0) { showToast('⚠️ Butangi og name ang product.'); return }

    setSaving(true)
    try {
      for (const product of payload) {
        await fetch(`${API_URL}/products.php`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(product),
        })
      }
      setAddOpen(false)
      loadProducts()
      showToast(`✅ ${payload.length} product(s) added.`)
    } catch (err) {
      showToast('❌ Failed to save products.')
    }
    setSaving(false)
  }

  async function handleUpdate(form) {
    const { id, ...rest } = form
    const payload = { id, ...rest, price: Number(rest.price) || 0, old_price: rest.old_price ? Number(rest.old_price) : null, stock: Number(rest.stock) || 0 }
    try {
      const res = await fetch(`${API_URL}/products.php`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const data = await res.json()
        showToast('❌ ' + (data.error || 'Update failed.'))
        return
      }
      setEditProduct(null)
      loadProducts()
      showToast('✅ Product updated.')
    } catch (err) {
      showToast('❌ Network error.')
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this product?')) return
    try {
      await fetch(`${API_URL}/products.php?id=${id}`, {
        method: 'DELETE',
        credentials: 'include',
      })
      loadProducts()
      showToast('🗑️ Product deleted.')
    } catch (err) {
      showToast('❌ Failed to delete.')
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1a1a2e', margin: 0 }}>Products</h1>
        <button style={s.btnPrimary} onClick={openAdd}>+ Add Product</button>
      </div>

      <div style={s.toolbar}>
        <input style={s.input} placeholder="Search products…" value={search} onChange={e => setSearch(e.target.value)} />
        <select style={s.input} value={catFilter} onChange={e => setCatFilter(e.target.value)}>
          <option>All</option>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <span style={{ marginLeft: 'auto', fontSize: '0.82rem', color: '#6b7280' }}>{filtered.length} products</span>
      </div>

      {loading ? <p style={{ color: '#9ca3af' }}>Loading…</p> : (
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Product</th><th style={s.th}>Category</th><th style={s.th}>Price</th>
              <th style={s.th}>Stock</th><th style={s.th}>Status</th><th style={s.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id}>
                <td style={s.td}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <img src={p.image} alt={p.name} style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: '8px', background: '#f3f4f6' }} onError={e => e.target.style.visibility = 'hidden'} />
                    <div>
                      <div style={{ fontWeight: 700 }}>{p.name}</div>
                      {p.tag && <span style={{ fontSize: '0.68rem', fontWeight: 700, color: p.tag === 'Sale' ? '#ef4444' : '#10b981' }}>{p.tag}</span>}
                    </div>
                  </div>
                </td>
                <td style={s.td}><span style={{ background: '#fce7f3', color: '#be185d', padding: '2px 8px', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 700 }}>{p.category}</span></td>
                <td style={{ ...s.td, fontWeight: 700, color: '#be185d' }}>{formatPrice(p.price)}</td>
                <td style={s.td}>{p.stock}</td>
                <td style={s.td}>{p.status}</td>
                <td style={s.td}>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <button style={s.btn} onClick={() => setEditProduct(p)}>✏️ Edit</button>
                    <button style={s.btnDanger} onClick={() => handleDelete(p.id)}>🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && <tr><td colSpan={6} style={{ ...s.td, textAlign: 'center', padding: '2rem', color: '#9ca3af' }}>No products found.</td></tr>}
          </tbody>
        </table>
      )}

      {addOpen && (
        <div style={s.overlay} onClick={() => setAddOpen(false)}>
          <div style={s.modal} onClick={e => e.stopPropagation()}>
            <div style={s.modalHead}>Add product(s) <button onClick={() => setAddOpen(false)} style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}>×</button></div>
            <div style={s.modalBody}>
              <div style={s.tabs}>
                <button style={s.tab(addMode === 'single')} onClick={() => { setAddMode('single'); setRows([rows[0] || emptyRow()]) }}>Single</button>
                <button style={s.tab(addMode === 'multi')} onClick={() => setAddMode('multi')}>Multiple</button>
              </div>
              {rows.map((row, i) => (
                <div key={i}>
                  {addMode === 'multi' && <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#9ca3af', marginBottom: '0.4rem' }}>PRODUCT {i + 1}</div>}
                  <ProductForm row={row} onChange={updated => setRows(rows.map((r, idx) => idx === i ? updated : r))} />
                  {addMode === 'multi' && rows.length > 1 && (
                    <button style={{ ...s.btnDanger, marginBottom: '0.75rem' }} onClick={() => setRows(rows.filter((_, idx) => idx !== i))}>Remove row</button>
                  )}
                </div>
              ))}
              {addMode === 'multi' && (
                <button style={s.btn} onClick={() => setRows([...rows, emptyRow()])}>+ Add another row</button>
              )}
            </div>
            <div style={s.modalFoot}>
              <button style={s.btn} onClick={() => setAddOpen(false)}>Cancel</button>
              <button style={s.btnPrimary} disabled={saving} onClick={handleSaveNew}>{saving ? 'Saving…' : `Save ${addMode === 'multi' ? `(${rows.filter(r => r.name.trim()).length})` : ''}`}</button>
            </div>
          </div>
        </div>
      )}

      {editProduct && (
        <div style={s.overlay} onClick={() => setEditProduct(null)}>
          <div style={s.modal} onClick={e => e.stopPropagation()}>
            <div style={s.modalHead}>Edit product <button onClick={() => setEditProduct(null)} style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer' }}>×</button></div>
            <div style={s.modalBody}>
              <ProductForm row={editProduct} onChange={setEditProduct} />
            </div>
            <div style={s.modalFoot}>
              <button style={s.btn} onClick={() => setEditProduct(null)}>Cancel</button>
              <button style={s.btnPrimary} onClick={() => handleUpdate(editProduct)}>Save changes</button>
            </div>
          </div>
        </div>
      )}

      {toast && <div style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', background: '#1a1a2e', color: '#fff', padding: '0.6rem 1.2rem', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, zIndex: 200 }}>{toast}</div>}
    </div>
  )
}