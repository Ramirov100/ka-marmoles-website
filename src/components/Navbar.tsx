import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const ENLACES = [
  { a: '/coleccion', t: 'Colección' },
  { a: '/materiales', t: 'Materiales' },
  { a: '/simulador', t: 'Simulador' },
  { a: '/nosotros', t: 'Nosotros' },
  { a: '/contacto', t: 'Contacto' },
  { a: '/cotizar', t: 'Cotizar' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const [abierto, setAbierto] = useState(false)
  const [cerrando, setCerrando] = useState(false)
  const [solida, setSolida] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const enfocarTriggerAlCerrar = useRef(false)
  const timerCierre = useRef(0)

  useEffect(() => {
    const alScroll = () => setSolida(window.scrollY > 80)
    alScroll()
    window.addEventListener('scroll', alScroll, { passive: true })
    return () => window.removeEventListener('scroll', alScroll)
  }, [])

  const cerrar = () => {
    enfocarTriggerAlCerrar.current = true
    const reducir = matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducir) { setAbierto(false); return }
    setCerrando(true)
    timerCierre.current = window.setTimeout(() => {
      setAbierto(false)
      setCerrando(false)
    }, 280)
  }

  useEffect(() => () => clearTimeout(timerCierre.current), [])

  // Devuelve el foco al disparador cuando el overlay se desmonta.
  useEffect(() => {
    if (!abierto && enfocarTriggerAlCerrar.current) {
      enfocarTriggerAlCerrar.current = false
      triggerRef.current?.focus()
    }
  }, [abierto])

  // Overlay abierto: bloquea el scroll del body, atrapa el foco y cierra con Escape.
  useEffect(() => {
    if (!abierto) return
    const overlay = overlayRef.current
    if (!overlay) return
    document.body.style.overflow = 'hidden'
    overlay.querySelector<HTMLElement>('.menu-enlaces a')?.focus()

    const focusables = () => [...overlay.querySelectorAll<HTMLElement>('a, button')]
    const alTeclear = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { cerrar(); return }
      if (e.key !== 'Tab') return
      const f = focusables()
      if (f.length === 0) return
      const primero = f[0]
      const ultimo = f[f.length - 1]
      if (e.shiftKey && document.activeElement === primero) { e.preventDefault(); ultimo.focus() }
      else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primero.focus() }
    }
    document.addEventListener('keydown', alTeclear)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', alTeclear)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [abierto])

  return (
    <>
      <header className={`nav ${solida ? 'nav-solida' : ''}`}>
        <div className="nav-inner">
          <Link to="/" className="nav-logo" aria-label="K+A Mármoles — inicio" onClick={(e: MouseEvent) => {
            // En la portada la ruta no cambia: subimos suavemente al inicio.
            if (pathname === '/') {
              e.preventDefault()
              const reducir = matchMedia('(prefers-reduced-motion: reduce)').matches
              window.scrollTo({ top: 0, behavior: reducir ? 'auto' : 'smooth' })
            }
          }}>
            <img src="/logo-ka-claro.png" alt="" width="196" height="60" />
          </Link>
          <button ref={triggerRef} className="menu-trigger" onClick={() => setAbierto(true)}
            aria-expanded={abierto} aria-controls="menu-overlay" aria-label="Abrir menú">
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M0 1h20M0 7h20M0 13h20" />
            </svg>
            <span>Menú</span>
          </button>
        </div>
      </header>

      {abierto && (
        <div ref={overlayRef} id="menu-overlay" role="dialog" aria-modal="true" aria-label="Menú"
          className={`menu-overlay ${cerrando ? 'cerrando' : ''}`}>
          <button className="menu-cerrar" onClick={cerrar} aria-label="Cerrar menú">
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M2 2l12 12M14 2L2 14" />
            </svg>
          </button>
          <nav className="menu-enlaces" aria-label="Navegación principal">
            {ENLACES.map(e => (
              <NavLink key={e.a} to={e.a} onClick={cerrar}
                className={({ isActive }) => (isActive ? 'activo' : '')}>
                {e.t}
              </NavLink>
            ))}
          </nav>
          <div className="menu-contacto">
            <span>Carretera Río Hondo KM 14, Huixquilucan, Estado de México, C.P. 55770</span>
            <span>
              <a href="tel:+525558116245">(52) 55 5811 6245</a>
              {' · '}
              <a href="tel:+525558116863">(52) 55 5811 6863</a>
            </span>
          </div>
        </div>
      )}
    </>
  )
}
