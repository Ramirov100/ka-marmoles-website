import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useFooterVisible } from '../lib/useFooterVisible'

const NOMBRE_COOKIE = 'ka_cookies'
const DIAS_VIGENCIA = 365
const EVENTO_ABRIR = 'ka:abrir-cookies'

// Bandera en memoria: evita releer document.cookie si el componente se remonta.
let eleccionEnMemoria: string | null = null

function leerEleccion(): string | null {
  if (eleccionEnMemoria) return eleccionEnMemoria
  const par = document.cookie.split('; ').find(c => c.startsWith(`${NOMBRE_COOKIE}=`))
  eleccionEnMemoria = par ? par.split('=')[1] : null
  return eleccionEnMemoria
}

function guardarEleccion(categorias: string[]) {
  const valor = categorias.join('.')
  eleccionEnMemoria = valor
  const expira = new Date(Date.now() + DIAS_VIGENCIA * 24 * 60 * 60 * 1000).toUTCString()
  document.cookie = `${NOMBRE_COOKIE}=${valor}; expires=${expira}; path=/; SameSite=Lax`
}

/** Reabre el banner (p. ej. desde el enlace "Cookies" del footer). */
export function abrirBannerCookies() {
  window.dispatchEvent(new Event(EVENTO_ABRIR))
}

const DETALLES = [
  { nombre: 'Estrictamente necesarias', texto: 'Imprescindibles para el funcionamiento básico del sitio; no pueden desactivarse.' },
  { nombre: 'Rendimiento', texto: 'Nos permiten medir visitas y analizar el tráfico de forma anónima para mejorar el sitio.' },
  { nombre: 'Funcionalidad', texto: 'Recuerdan tus preferencias de navegación para ofrecerte una experiencia personalizada.' },
]

export default function CookieBanner() {
  const [visible, setVisible] = useState(() => !leerEleccion())
  const [rendimiento, setRendimiento] = useState(true)
  const [funcionalidad, setFuncionalidad] = useState(true)
  const [detalles, setDetalles] = useState(false)
  const footerVisible = useFooterVisible()

  const abrir = () => {
    const guardadas = leerEleccion()?.split('.')
    if (guardadas) {
      setRendimiento(guardadas.includes('ren'))
      setFuncionalidad(guardadas.includes('fun'))
    }
    setVisible(true)
  }

  useEffect(() => {
    window.addEventListener(EVENTO_ABRIR, abrir)
    return () => window.removeEventListener(EVENTO_ABRIR, abrir)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Banner cerrado: solo el botón discreto para reabrir la configuración.
  if (!visible) {
    return (
      <button className={`cookie-reabrir ${footerVisible ? 'oculto' : ''}`} onClick={abrir} aria-label="Configuración de cookies">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M21 12a9 9 0 1 1-9-9c0 2 1.5 3.5 3.5 3.5 0 2 1.5 3.5 3.5 3.5.7 0 1.4-.2 2-.6Z" />
          <circle cx="9" cy="10" r="0.6" fill="currentColor" stroke="none" />
          <circle cx="13" cy="14" r="0.6" fill="currentColor" stroke="none" />
          <circle cx="8.5" cy="15" r="0.6" fill="currentColor" stroke="none" />
          <circle cx="14" cy="9" r="0.6" fill="currentColor" stroke="none" />
        </svg>
        <span className="cookie-reabrir-texto" aria-hidden="true">Configuración de cookies</span>
      </button>
    )
  }

  const guardar = (categorias: string[]) => {
    guardarEleccion(categorias)
    setVisible(false)
  }
  const aceptar = () =>
    guardar(['nec', ...(rendimiento ? ['ren'] : []), ...(funcionalidad ? ['fun'] : [])])
  const rechazar = () => guardar(['nec'])
  const todasMarcadas = rendimiento && funcionalidad

  return (
    <section className="cookie-banner" aria-label="Preferencias de cookies">
      <div className="container cookie-inner">
        <button className="cookie-cerrar" onClick={rechazar} aria-label="Cerrar y rechazar cookies no esenciales">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M2 2l12 12M14 2L2 14" />
          </svg>
        </button>

        <div className="cookie-texto">
          <h2>Este sitio utiliza cookies</h2>
          <p>
            Utilizamos cookies propias y de terceros para personalizar el contenido, recordar tus
            preferencias y analizar el tráfico de nuestro sitio. Puedes aceptar todas las cookies,
            rechazarlas o ajustar tu selección por categoría. Consulta nuestra{' '}
            <Link to="/politica-de-cookies">Política de Cookies</Link> para más información.
          </p>

          <div className="cookie-categorias" role="group" aria-label="Categorías de cookies">
            <label className="cookie-check">
              <input type="checkbox" checked disabled aria-label="Estrictamente necesarias (siempre activas)" />
              <span>Estrictamente necesarias</span>
            </label>
            <label className="cookie-check">
              <input type="checkbox" checked={rendimiento} onChange={e => setRendimiento(e.target.checked)} />
              <span>Rendimiento</span>
            </label>
            <label className="cookie-check">
              <input type="checkbox" checked={funcionalidad} onChange={e => setFuncionalidad(e.target.checked)} />
              <span>Funcionalidad</span>
            </label>
          </div>

          <button className="cookie-detalles-toggle" onClick={() => setDetalles(!detalles)} aria-expanded={detalles}>
            {detalles ? 'Ocultar detalles' : 'Mostrar detalles'}
            <span aria-hidden="true">{detalles ? ' −' : ' +'}</span>
          </button>
          {detalles && (
            <dl className="cookie-detalles">
              {DETALLES.map(d => (
                <div key={d.nombre} className="cookie-detalle">
                  <dt>{d.nombre}</dt>
                  <dd>{d.texto}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        <div className="cookie-acciones">
          <button className="cookie-pill oro" onClick={aceptar}>
            {todasMarcadas ? 'Aceptar todas' : 'Aceptar selección'}
          </button>
          <button className="cookie-pill" onClick={rechazar}>Rechazar todas</button>
        </div>
      </div>
    </section>
  )
}
