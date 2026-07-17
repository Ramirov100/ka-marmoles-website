import { useParams, Link } from 'react-router-dom'
import SEO from '../components/SEO'
import MarbleSwatch from '../components/MarbleSwatch'
import { CATEGORIAS } from '../data/productos'
import { useProductos } from '../lib/useProductos'
import { urlWhatsApp } from '../components/WhatsAppButton'

export default function ProductoDetalle() {
  const { slug } = useParams()
  const { productos } = useProductos()
  const producto = productos.find(p => p.slug === slug)

  if (!producto) {
    return (
      <section className="seccion" style={{ paddingTop: 160 }}>
        <div className="container">
          <h2>Pieza no encontrada</h2>
          <p style={{ color: 'var(--veta)', margin: '16px 0 32px' }}>Es posible que el enlace haya cambiado.</p>
          <Link to="/coleccion" className="btn">Volver a la colección</Link>
        </div>
      </section>
    )
  }

  const cat = CATEGORIAS.find(c => c.id === producto.categoria)?.nombre

  return (
    <div className="container detalle">
      <SEO titulo={producto.nombre} descripcion={producto.descripcion} />
      <div>
        <div className="detalle-visual">
          {producto.imagenes.length > 0
            ? <img src={producto.imagenes[0]} alt={producto.nombre} />
            : <MarbleSwatch tono={producto.tono} seed={Number(producto.id) * 11} titulo={producto.tipo_marmol} />}
        </div>
        {producto.imagenes.length === 0 && (
          <p className="nota-imagen">Textura ilustrativa del mármol {producto.tipo_marmol}. Fotografía de la pieza próximamente.</p>
        )}
      </div>
      <div>
        <span className="eyebrow">{cat}</span>
        <h1>{producto.nombre}</h1>
        <p className="descripcion">{producto.descripcion}</p>
        <dl className="specs">
          <div className="spec"><dt>Mármol</dt><dd>{producto.tipo_marmol}</dd></div>
          <div className="spec"><dt>Dimensiones</dt><dd>{producto.dimensiones}</dd></div>
          <div className="spec"><dt>Fabricación</dt><dd>A la medida, sobre pedido</dd></div>
          <div className="spec"><dt>Origen</dt><dd>Hecho en México</dd></div>
        </dl>
        <a className="btn oro" href={urlWhatsApp(`Hola K+A Mármoles, me interesa la pieza "${producto.nombre}". ¿Me pueden cotizar?`)} target="_blank" rel="noopener noreferrer">
          Cotizar esta pieza
        </a>
      </div>
    </div>
  )
}
