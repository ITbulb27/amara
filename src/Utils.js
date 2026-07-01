export function formatPrice(amount) {
  if (amount === null || amount === undefined || amount === '') return '₱0'
  return `₱${Number(amount).toLocaleString()}`
}