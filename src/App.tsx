import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Newsletter from './components/Newsletter'
import CookieBanner from './components/CookieBanner'
import Home from './pages/Home'
import Coleccion from './pages/Coleccion'
import ProductoDetalle from './pages/ProductoDetalle'
import Materiales from './pages/Materiales'
import MaterialDetalle from './pages/MaterialDetalle'
import Simulador from './pages/Simulador'
import Cotizar from './pages/Cotizar'
import Nosotros from './pages/Nosotros'
import Contacto from './pages/Contacto'
import AvisoPrivacidad from './pages/AvisoPrivacidad'
import TerminosCondiciones from './pages/TerminosCondiciones'
import PoliticaCookies from './pages/PoliticaCookies'

function ScrollArriba() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollArriba />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coleccion" element={<Coleccion />} />
          <Route path="/coleccion/:slug" element={<ProductoDetalle />} />
          <Route path="/materiales" element={<Materiales />} />
          <Route path="/materiales/:slug" element={<MaterialDetalle />} />
          <Route path="/simulador" element={<Simulador />} />
          <Route path="/cotizar" element={<Cotizar />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/aviso-de-privacidad" element={<AvisoPrivacidad />} />
          <Route path="/terminos-y-condiciones" element={<TerminosCondiciones />} />
          <Route path="/politica-de-cookies" element={<PoliticaCookies />} />
        </Routes>
      </main>
      <Footer />
      <Newsletter />
      <CookieBanner />
    </BrowserRouter>
  )
}
