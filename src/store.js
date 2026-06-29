// Shared store using localStorage for persistence across pages

const PRODUCTS_KEY = 'amara_products'
const USERS_KEY = 'amara_users'
const ORDERS_KEY = 'amara_orders'
const CART_KEY = 'amara_cart'

const DEFAULT_PRODUCTS = [
  { id: 1, name: 'Floral Summer Dress', price: 399, old: 549, cat: 'Women', tag: 'New', stock: 22, status: 'Active', img: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&q=80' },
  { id: 2, name: 'Classic Polo Shirt', price: 299, old: 399, cat: 'Men', tag: 'New', stock: 15, status: 'Active', img: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&q=80' },
  { id: 3, name: 'Kids Graphic Tee', price: 249, old: 349, cat: 'Kids', tag: 'New', stock: 30, status: 'Active', img: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400&q=80' },
  { id: 4, name: 'Black Oversized Hoodie', price: 599, old: 799, cat: 'Streetwear', tag: 'New', stock: 18, status: 'Active', img: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400&q=80' },
  { id: 5, name: 'Work Blazer Set', price: 799, old: 1099, cat: 'Women', tag: 'Sale', stock: 8, status: 'Active', img: 'https://images.unsplash.com/photo-1551803091-e20673f15770?w=400&q=80' },
  { id: 6, name: 'Slim Chino Pants', price: 499, old: 699, cat: 'Men', tag: 'Sale', stock: 12, status: 'Active', img: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80' },
  { id: 7, name: 'Linen Co-ord Set', price: 599, old: 799, cat: 'Women', tag: 'New', stock: 10, status: 'Active', img: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&q=80' },
  { id: 8, name: 'Cargo Jogger Pants', price: 499, old: 699, cat: 'Streetwear', tag: 'New', stock: 14, status: 'Active', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80' },
]

const DEFAULT_USERS = [
  { id: 1, name: 'Maria Santos', email: 'maria@example.com', phone: '09171234567', address: 'Makati, Metro Manila', role: 'Customer', orders: 7, spent: 2497, status: 'Active', joined: 'Jan 2025' },
  { id: 2, name: 'Juan dela Cruz', email: 'juan@example.com', phone: '09281234567', address: 'Quezon City, Metro Manila', role: 'Customer', orders: 3, spent: 1298, status: 'Active', joined: 'Feb 2025' },
  { id: 3, name: 'Ana Reyes', email: 'ana@example.com', phone: '09321234567', address: 'Cebu City', role: 'Customer', orders: 5, spent: 1950, status: 'Active', joined: 'Mar 2025' },
  { id: 4, name: 'Ben Lim', email: 'ben@example.com', phone: '09451234567', address: 'Davao City', role: 'Customer', orders: 2, spent: 798, status: 'Inactive', joined: 'Apr 2025' },
]

const DEFAULT_ORDERS = [
  { id: 1042, user: 'Maria Santos', email: 'maria@example.com', items: 2, total: 799, date: 'Jun 29, 2025', status: 'Delivered' },
  { id: 1041, user: 'Juan dela Cruz', email: 'juan@example.com', items: 3, total: 1299, date: 'Jun 28, 2025', status: 'Pending' },
  { id: 1040, user: 'Ana Reyes', email: 'ana@example.com', items: 1, total: 499, date: 'Jun 28, 2025', status: 'Shipped' },
  { id: 1039, user: 'Ben Lim', email: 'ben@example.com', items: 2, total: 399, date: 'Jun 27, 2025', status: 'Delivered' },
  { id: 1038, user: 'Maria Santos', email: 'maria@example.com', items: 1, total: 399, date: 'Jun 26, 2025', status: 'Refunded' },
]

function load(key, defaults) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : defaults
  } catch { return defaults }
}

function save(key, data) {
  try { localStorage.setItem(key, JSON.stringify(data)) } catch {}
}

export function getProducts() { return load(PRODUCTS_KEY, DEFAULT_PRODUCTS) }
export function saveProducts(data) { save(PRODUCTS_KEY, data) }

export function getUsers() { return load(USERS_KEY, DEFAULT_USERS) }
export function saveUsers(data) { save(USERS_KEY, data) }

export function getOrders() { return load(ORDERS_KEY, DEFAULT_ORDERS) }
export function saveOrders(data) { save(ORDERS_KEY, data) }

export function getCart() { return load(CART_KEY, []) }
export function saveCart(data) { save(CART_KEY, data) }

export function addToCart(product, qty = 1) {
  const cart = getCart()
  const existing = cart.find(i => i.id === product.id)
  if (existing) existing.qty += qty
  else cart.push({ ...product, qty })
  saveCart(cart)
}

export function removeFromCart(productId) {
  const cart = getCart().filter(i => i.id !== productId)
  saveCart(cart)
}

export function clearCart() { saveCart([]) }

export function nextProductId() {
  const products = getProducts()
  return products.length ? Math.max(...products.map(p => p.id)) + 1 : 1
}

export function nextUserId() {
  const users = getUsers()
  return users.length ? Math.max(...users.map(u => u.id)) + 1 : 1
}