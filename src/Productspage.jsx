import { useState } from 'react'
import { getProducts, saveProducts } from './store.js'

const CATEGORIES = ['All', 'Women', 'Men', 'Kids', 'Streetwear']
const STATUS_OPTS = ['Active', 'Draft', 'Out of stock']

const s = {
  toolbar: { display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap', alignItems: 'center' },
  input: { padding: '0.45rem 0.75rem', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '0.85rem', color: '#1a1a2e', outline: 'none', background: '#fff' },
  btn: { padding: '0.45rem 1rem', borderRadius: '8px', border: '1px solid #e5e7eb', background: '#fff', color: '#374151', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 },
  btnPrimary: { padding: '0.45rem 1rem', borderRadius: '8px', border: 'none', background: '#be185d', color: '#fff', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 700 },
  btnDanger: { padding: '0.3rem 0.6rem', borderRadius: '6px', border: 'none', background: '#fee2e2', color: '#991b1b', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 },
  btnEdit: { padding: '0.3rem 0.6rem', borderRadius: '6px', border: '1px solid #e5e7eb', background: '#fff', color: '#374151', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 },
  tabs: { display: 'flex', gap: 0, borderBottom: '1px solid #e5e7eb', marginBottom: '1rem' },
  tab: (active) => ({ padding: '0.5rem 1rem', fontSize: '0.85rem', cursor: 'pointer', border: 'none', background: 'none', borderBottom: active ? '2px solid #be185d' : '2px solid transparent', color: active ? '#be185d' : '#6b7280', fontWeight: active ? 700 : 400 }),
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '1rem' },
  productCard: { background: '#fff', border: '1px solid #f0f0f0', borderRadius: '12px', overflow: 'hidden' },
  cardImg: { width: '100%', height: '130px', objectFit: 'cover', display: 'block', background: '#f9fafb' },
  cardBody: { padding: '0.75rem' },
  cardName: { fontSize: '0.82rem', fontWeight: 700, color: '#1a1a2e', marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
  cardPrice: { fontSize: '0.9rem', color: '#be185d', fontWeight: 800 },
  cardActions: { display: 'flex', gap: '0.4rem', marginTop: '0.5rem' },
  table: { width: '100%', borderCollapse: 'collapse', fontSize: '0.83rem', background: '#fff', borderRadius: '12px', overflow: 'hidden', border: '1px solid #f0f0f0' },
  th: { padding: '0.65rem 1rem', textAlign: 'left', fontSize: '0.7rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid #f0f0f0', background: '#fafafa' },
  td: { padding: '0.65rem 1rem', borderBottom: '1px solid #f9f9f9', color: '#374151', verticalAlign: 'middle' },
  overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 },
  modal: { background: '#fff', borderRadius: '16px', width: '460px', maxWidth: '95vw', maxHeight: '90vh', overflowY: 'auto' },
  modalHead: { padding: '1rem 1.25rem', borderBottom: '1px solid #f0f0f0', fontWeight: 800, fontSize: '1rem', color: '#1a1a2e', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  modalBody: { padding: '1.25rem' },
  modalFoot: { padding: '0.85rem 1.25rem', borderTop: '1px solid #f0f0f0', display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' },
  formGroup: { marginBottom: '0.9rem' },
  formLabel: { fontSize: '0.78rem', color: '#6b7280', fontWeight: 600, display: 'block', marginBottom: '4px' },
  formInput: { width: '100%', padding: '0.5rem 0.75rem', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '0.85rem', color: '#1a1a2e', outline: 'none', boxSizing: 'border-box' },
  formRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' },
}

const tagBadge = (tag) => {
  if (!tag) return null
  return <span style={{ position: 'absolute', top: '8px', left: '8px', background: tag === 'Sale' ? '#ef4444' : '#10b981', color: '#fff', fontSize: '0.65rem', fontWeight: 700, padding: '2px 8px', borderRadius: '100px' }}>{tag}</span>
}

const statusBadge = (status) => {
  const map = { Active: ['#d1fae5','#065f46'], Draft: ['#fef3c7','#92400e'], 'Out of stock': ['#fee2e2','#991b1b'] }
  const [bg, color] = map[status] || ['#f3f4f6','#374151']
  return <span style={{ background: bg, color, padding: '2px 8px', borderRadius: '100px', fontSize: '0.7rem', fontWeight: 700 }}>{status}</span>
}

function EditModal({ product, onSave, onClose }) {
  const [form, setForm] = useState({ ...product })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  return (
    <div style={s.overlay} onClick={onClose}>
      <div style={s.modal} onClick={e => e.stopPropagation()}>
        <div style={s.modalHead}>Edit product <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer', color: '#6b7280' }}>×</button></div>
        <div style={s.modalBody}>
          <div style={s.formGroup}><label style={s.formLabel}>Product name</label><input style={s.formInput} value={form.name} onChange={e => set('name', e.target.value)} /></div>
          <div style={s.formRow}>
            <div style={s.formGroup}><label style={s.formLabel}>Price (₱)</label><input style={s.formInput} type="number" value={form.price} onChange={e => set('price', +e.target.value)} /></div>
            <div style={s.formGroup}><label style={s.formLabel}>Original price (₱)</label><input style={s.formInput} type="number" value={form.old} onChange={e => set('old', +e.target.value)} /></div>
          </div>
          <div style={s.formRow}>
            <div style={s.formGroup}><label style={s.formLabel}>Category</label>
              <select style={s.formInput} value={form.cat} onChange={e => set('cat', e.target.value)}>
                {['Women','Men','Kids','Streetwear'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div style={s.formGroup}><label style={s.formLabel}>Tag</label>
              <select style={s.formInput} value={form.tag} onChange={e => set('tag', e.target.value)}>
                <option value="New">New</option><option value="Sale">Sale</option><option value="">None</option>
              </select>
            </div>
          </div>
          <div style={s.formRow}>
            <div style={s.formGroup}><label style={s.formLabel}>Stock qty</label><input style={s.formInput} type="number" value={form.stock} onChange={e => set('stock', +e.target.value)} /></div>
            <div style={s.formGroup}><label style={s.formLabel}>Status</label>
              <select style={s.formInput} value={form.status} onChange={e => set('status', e.target.value)}>
                {STATUS_OPTS.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          </div>
          <div style={s.formGroup}><label style={s.formLabel}>Image URL</label><input style={s.formInput} value={form.img} onChange={e => set('img', e.target.value)} /></div>
        </div>
        <div style={s.modalFoot}>
          <button style={s.btn} onClick={onClose}>Cancel</button>
          <button style={s.btnPrimary} onClick={() => onSave(form)}>Save changes</button>
        </div>
      </div>
    </div>
  )
}

export default function ProductsPage() {
  const [products, setProducts] = useState(getProducts())
  const [search, setSearch] = useState('')
  const [catFilter, setCatFilter] = useState('All')
  const [view, setView] = useState('grid')
  const [editProduct, setEditProduct] = useState(null)
  const [toast, setToast] = useState('')

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 2500) }

  const filtered = products.filter(p =>
    (catFilter === 'All' || p.cat === catFilter) &&
    (!search || p.name.toLowerCase().includes(search.toLowerCase()))
  )

  const handleDelete = (id) => {
    if (!confirm('Delete this product?')) return
    const updated = products.filter(p => p.id !== id)
    setProducts(updated); saveProducts(updated); showToast('Product deleted.')
  }

  const handleSave = (form) => {
    const updated = products.map(p => p.id === form.id ? form : p)
    setProducts(updated); saveProducts(updated); setEditProduct(null); showToast('Product updated.')
  }

  return (
    <div>
      <div style={s.toolbar}>
        <input style={s.input} placeholder="Search products…" value={search} onChange={e => setSearch(e.target.value)} />
        <select style={s.input} value={catFilter} onChange={e => setCatFilter(e.target.value)}>
          {CATEGORIES.map(c => <option key={c}>{c}</option>)}
        </select>
        <span style={{ marginLeft: 'auto', fontSize: '0.82rem', color: '#6b7280' }}>{filtered.length} products</span>
      </div>

      <div style={s.tabs}>
        <button style={s.tab(view === 'grid')} onClick={() => setView('grid')}>Grid view</button>
        <button style={s.tab(view === 'table')} onClick={() => setView('table')}>Table view</button>
      </div>

      {view === 'grid' ? (
        <div style={s.grid}>
          {filtered.map(p => (
            <div key={p.id} style={s.productCard}>
              <div style={{ position: 'relative' }}>
                <img src={p.img} alt={p.name} style={s.cardImg} onError={e => e.target.style.display = 'none'} />
                {tagBadge(p.tag)}
              </div>
              <div style={s.cardBody}>
                <div style={s.cardName}>{p.name}</div>
                <div style={{ fontSize: '0.72rem', color: '#9ca3af', marginBottom: '2px' }}>{p.cat}</div>
                <div style={s.cardPrice}>₱{p.price.toLocaleString()}</div>
                <div style={s.cardActions}>
                  <button style={{ ...s.btnEdit, flex: 1 }} onClick={() => setEditProduct(p)}>✏️ Edit</button>
                  <button style={s.btnDanger} onClick={() => handleDelete(p.id)}>🗑️</button>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '3rem', color: '#9ca3af' }}>No products found.</div>}
        </div>
      ) : (
        <table style={s.table}>
          <thead>
            <tr>
              <th style={s.th}>Product</th>
              <th style={s.th}>Category</th>
              <th style={s.th}>Price</th>
              <th style={s.th}>Stock</th>
              <th style={s.th}>Status</th>
              <th style={s.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id}>
                <td style={s.td}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <img src={p.img} alt={p.name} style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: '8px' }} onError={e => e.target.style.display = 'none'} />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.83rem' }}>{p.name}</div>
                      {p.tag && <span style={{ fontSize: '0.68rem', fontWeight: 700, color: p.tag === 'Sale' ? '#ef4444' : '#10b981' }}>{p.tag}</span>}
                    </div>
                  </div>
                </td>
                <td style={s.td}><span style={{ background: '#fce7f3', color: '#be185d', padding: '2px 8px', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 700 }}>{p.cat}</span></td>
                <td style={{ ...s.td, fontWeight: 700, color: '#be185d' }}>₱{p.price.toLocaleString()}</td>
                <td style={s.td}>{p.stock}</td>
                <td style={s.td}>{statusBadge(p.status)}</td>
                <td style={s.td}>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <button style={s.btnEdit} onClick={() => setEditProduct(p)}>✏️ Edit</button>
                    <button style={s.btnDanger} onClick={() => handleDelete(p.id)}>🗑️ Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {editProduct && <EditModal product={editProduct} onSave={handleSave} onClose={() => setEditProduct(null)} />}

      {toast && (
        <div style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', background: '#1a1a2e', color: '#fff', padding: '0.6rem 1.2rem', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 600, zIndex: 200 }}>
          ✅ {toast}
        </div>
      )}
    </div>
  )
}