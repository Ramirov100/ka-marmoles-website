import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useFooterVisible } from '../lib/useFooterVisible'

export default function Newsletter() {
  const [abierto, setAbierto] = useState(false)
  const [correo, setCorreo] = useState('')
  const [consentimiento, setConsentimiento] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [enviado, setEnviado] = useState(false)
  const footerVisible = useFooterVisible()
  const panelRef = useRef<HTMLDivElement>(null)
  const tabRef = useRef<HTMLButtonElement>(null)
  const enfocarTabAlCerrar = useRef(false)

  const cerrar = () => {
    enfocarTabAlCerrar.current = true
    setAbierto(false)
    setError(null)
  }

  // Devuelve el foco al tab una vez que React lo vuelve a montar.
  useEffect(() => {
    if (!abierto && enfocarTabAlCerrar.current) {
      enfocarTabAlCerrar.current = false
      tabRef.current?.focus()
    }
  }, [abierto])

  useEffect(() => {
    if (!abierto) return
    const panel = panelRef.current
    if (!panel) return

    panel.querySelector<HTMLInputElement>('input[type="email"]')?.focus()

    const focusables = () =>
      [...panel.querySelectorAll<HTMLElement>('button, [href], input, [tabindex]:not([tabindex="-1"])')]
        .filter(el => !el.hasAttribute('disabled'))

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
    // Pequeño periodo de gracia: el mismo gesto que abre el panel no debe cerrarlo.
    const abiertoEn = Date.now()
    const alClicFuera = (e: MouseEvent) => {
      if (Date.now() - abiertoEn < 250) return
      if (!panel.contains(e.target as Node)) cerrar()
    }
    document.addEventListener('keydown', alTeclear)
    document.addEventListener('mousedown', alClicFuera)
    return () => {
      document.removeEventListener('keydown', alTeclear)
      document.removeEventListener('mousedown', alClicFuera)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [abierto])

  function suscribir(e: FormEvent) {
    e.preventDefault()
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.trim())) {
      setError('Necesitamos un correo válido.')
      return
    }
    if (!consentimiento) {
      setError('Necesitamos tu autorización para escribirte.')
      return
    }
    setError(null)
    // TODO: conectar la suscripción a Supabase (tabla `suscriptores`) o a un servicio de correo.
    // Por ahora solo mostramos la confirmación; el correo no se persiste.
    setEnviado(true)
  }

  if (!abierto) {
    return (
      <button ref={tabRef} className={`news-tab ${footerVisible ? 'oculto' : ''}`} onClick={() => setAbierto(true)}
        aria-expanded={false} aria-controls="panel-newsletter">
        Suscríbete al newsletter <span aria-hidden="true">→</span>
      </button>
    )
  }

  return (
    <div ref={panelRef} id="panel-newsletter" className="news-panel" role="dialog" aria-modal="true"
      aria-label="Suscripción al newsletter">
      <button className="news-cerrar" onClick={cerrar} aria-label="Cerrar">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path d="M2 2l12 12M14 2L2 14" />
        </svg>
      </button>

      <div aria-live="polite">
        {enviado ? (
          <>
            <h2>Suscríbete al newsletter</h2>
            <p className="news-gracias">Gracias, te escribiremos pronto.</p>
          </>
        ) : (
          <>
            <h2>Suscríbete al newsletter</h2>
            <form onSubmit={suscribir} noValidate>
              <div className="news-campo">
                <label htmlFor="news-correo">E-mail</label>
                <input id="news-correo" type="email" autoComplete="email" value={correo}
                  onChange={e => setCorreo(e.target.value)} aria-invalid={!!error} />
              </div>
              <label className="cookie-check news-consentimiento">
                <input type="checkbox" checked={consentimiento}
                  onChange={e => setConsentimiento(e.target.checked)} />
                <span>
                  He leído y autorizo el uso de mis{' '}
                  <Link to="/aviso-de-privacidad" onClick={cerrar}>datos personales</Link>
                </span>
              </label>
              {error && <p className="campo-error" role="alert">{error}</p>}
              <button type="submit" className="news-enviar">
                Suscribirse <span aria-hidden="true">→</span>
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
