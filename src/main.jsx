import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import MensPage from './MensPage.jsx'
import KidsPage from './KidsPage.jsx'
import WomenPage from './WomenPage.jsx'
import Streetwear from './StreetwearPage.jsx'
import CheckoutPage from './CheckoutPage.jsx'
import LoginPage from './LoginPage.jsx'
import RegisterPage from './RegisterPage.jsx'
import ProfilePage from './ProfilePage.jsx'
import AdminLayout from './AdminLayout.jsx'
import AdminDashboard from './AdminDashboard.jsx'
import AdminProducts from './AdminProducts.jsx'
import AdminSales from './AdminSales.jsx'
import AdminUsers from './AdminUsers.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import { CartProvider } from './CartContext.jsx'
import { AuthProvider } from './AuthContext.jsx'
import ShopPage from './ShopPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/mens" element={<MensPage />} />
            <Route path="/kids" element={<KidsPage />} />
            <Route path="/women" element={<WomenPage />} />
            <Route path="/streetwear" element={<Streetwear />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/checkout" element={<CheckoutPage />} /> 
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
            <Route path="/admin" element={<ProtectedRoute adminOnly><AdminLayout /></ProtectedRoute>}>
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="sales" element={<AdminSales />} />
              <Route path="users" element={<AdminUsers />} />
            </Route>
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)