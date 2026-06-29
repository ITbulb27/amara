import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import MensPage from './MensPage.jsx'
import KidsPage from './KidsPage.jsx'
import WomenPage from './WomenPage.jsx'
import Streetwear from './StreetwearPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/mens" element={<MensPage />} />
        <Route path="/kids" element={<KidsPage />} />
        <Route path="/women" element={<WomenPage />} />
        <Route path="/streetwear" element={<Streetwear />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)