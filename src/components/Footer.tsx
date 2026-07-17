import { Link } from 'react-router-dom'
import { urlWhatsApp } from './WhatsAppButton'
import { abrirBannerCookies } from './CookieBanner'

const CORREO = 'contacto@kamarmoles.com'

export default function Footer() {
  const anio = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Col 1 — Marca */}
          <div className="footer-col footer-marca">
            <Link to="/" className="footer-logo">
              <span className="mono">K+A</span>
              <span>K+A Mármoles</span>
            </Link>
            <address className="footer-datos">
              <span>Huixquilucan, Estado de México</span>
              <a href="tel:+525500000000">+52 55 0000 0000</a>
            </address>
            <span className="footer-copy">© {anio} K+A Design</span>
          </div>

          {/* Col 2 — Navegación */}
          <nav className="footer-col" aria-label="Navegación">
            <h4>Navegación</h4>
            <ul>
              <li><Link to="/coleccion">Colección</Link></li>
              <li><Link to="/nosotros">Nosotros</Link></li>
              <li><Link to="/contacto">Contacto</Link></li>
            </ul>
          </nav>

          {/* Col 3 — Atención */}
          <nav className="footer-col" aria-label="Atención">
            <h4>Atención</h4>
            <ul>
              <li>
                <a href={urlWhatsApp('Hola K+A Mármoles, me interesa cotizar una pieza.')}
                  target="_blank" rel="noopener noreferrer">WhatsApp</a>
              </li>
              <li><a href={`mailto:${CORREO}`}>{CORREO}</a></li>
              <li><Link to="/contacto">Cotizaciones</Link></li>
            </ul>
          </nav>

          {/* Col 4 — Legal */}
          <nav className="footer-col" aria-label="Legal">
            <h4>Legal</h4>
            <ul>
              <li><Link to="/aviso-de-privacidad">Aviso de Privacidad</Link></li>
              <li><Link to="/terminos-y-condiciones">Términos y Condiciones</Link></li>
              <li><Link to="/politica-de-cookies">Política de Cookies</Link></li>
              <li>
                <button className="footer-link-btn" onClick={abrirBannerCookies}>
                  Cookies
                </button>
              </li>
            </ul>
          </nav>
        </div>

        <div className="footer-bottom">
          <span className="footer-copy">© {anio} K+A Design · Todos los derechos reservados</span>
          <ul className="footer-social" aria-label="Redes sociales">
            <li>
              <a href="#" aria-label="Instagram de K+A Mármoles" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
            </li>
            <li>
              <a href="#" aria-label="Facebook de K+A Mármoles" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M14 8.5V7c0-.7.3-1 1-1h1.5V3H14c-2.2 0-3.5 1.4-3.5 3.7V8.5H8.5v3h2V21h3.5v-9.5H17l.5-3H14Z" />
                </svg>
              </a>
            </li>
            <li>
              <a href="#" aria-label="Pinterest de K+A Mármoles" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2a10 10 0 0 0-3.6 19.3c-.09-.8-.17-2.04.03-2.92.19-.8 1.2-5.13 1.2-5.13s-.31-.62-.31-1.53c0-1.43.83-2.5 1.86-2.5.88 0 1.3.66 1.3 1.45 0 .88-.56 2.2-.85 3.43-.24 1.02.51 1.85 1.52 1.85 1.83 0 3.23-1.93 3.23-4.7 0-2.46-1.77-4.18-4.29-4.18-2.92 0-4.64 2.19-4.64 4.46 0 .88.34 1.83.76 2.34a.3.3 0 0 1 .07.29c-.08.32-.25 1.01-.28 1.15-.05.19-.15.23-.35.14-1.3-.6-2.11-2.5-2.11-4.02 0-3.28 2.38-6.29 6.87-6.29 3.6 0 6.41 2.57 6.41 6 0 3.58-2.26 6.47-5.39 6.47-1.05 0-2.04-.55-2.38-1.19l-.65 2.47c-.23.9-.86 2.03-1.29 2.72A10 10 0 1 0 12 2Z" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
