import SEO from '../components/SEO'
import { urlWhatsApp } from '../components/WhatsAppButton'

export default function Contacto() {
  return (
    <section className="seccion" style={{ paddingTop: 140 }}>
      <SEO titulo="Contacto" descripcion="Cotiza tu pieza de mobiliario en mármol con K+A Mármoles. Atención por WhatsApp y correo. Huixquilucan, Estado de México." />
      <div className="container">
        <span className="eyebrow">Contacto</span>
        <h2 style={{ fontSize: 'clamp(36px, 5vw, 60px)', margin: '14px 0 48px', maxWidth: '16ch' }}>
          Cotiza tu pieza.
        </h2>
        <div style={{ maxWidth: 560 }}>
          <div className="dato-contacto">
            <span className="etiqueta">WhatsApp</span>
            <a href={urlWhatsApp('Hola K+A Mármoles, quiero cotizar una pieza.')} target="_blank" rel="noopener noreferrer">
              Escríbenos por WhatsApp →
            </a>
          </div>
          <div className="dato-contacto">
            <span className="etiqueta">Teléfonos</span>
            <a href="tel:+525558116245">(52) 55 5811 6245</a>
            <a href="tel:+525558116863">(52) 55 5811 6863</a>
          </div>
          <div className="dato-contacto">
            <span className="etiqueta">Correo</span>
            {/* El cliente mencionó k+a@marmoles.com, pendiente de confirmar; mientras, se mantiene este. */}
            <a href="mailto:contacto@kamarmoles.com">contacto@kamarmoles.com</a>
          </div>
          <div className="dato-contacto">
            <span className="etiqueta">Ubicación</span>
            <span>Carretera Río Hondo KM 14, Huixquilucan, Estado de México, C.P. 55770</span>
          </div>
        </div>
      </div>
    </section>
  )
}
