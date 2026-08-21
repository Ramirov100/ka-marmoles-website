import { Link } from 'react-router-dom'
import MarbleSwatch from './MarbleSwatch'
import { CATEGORIAS, type Producto } from '../data/productos'

// Correspondencia tipo de mármol → material del catálogo (solo equivalencias razonables;
// los tipos sin piedra correspondiente se muestran como texto plano).
const MATERIAL_DE_TIPO: Record<string, string> = {
  'Calacatta': 'calacatta-gold',
  'Calacatta Oro': 'calacatta-gold',
  'Calacatta Supreme': 'calacatta-supreme',
  'Negro Marquina': 'negro-marquina-brillado',
  'Negro Monterrey': 'negro-marquina-brillado',
  'Verde Tikal': 'royal-green',
  'Blanco Carrara': 'statuario',
  'Travertino Fiorito': 'travertino-veracruz-fiorito',
}

export default function ProductCard({ producto }: { producto: Producto }) {
  const cat = CATEGORIAS.find(c => c.id === producto.categoria)?.nombre
  const rutaProducto = `/coleccion/${producto.slug}`
  const slugMaterial = MATERIAL_DE_TIPO[producto.tipo_marmol]

  return (
    <article className="tarjeta">
      <Link to={rutaProducto} className="tarjeta-visual" aria-label={producto.nombre} tabIndex={-1}>
        {producto.imagenes.length > 0
          ? <img src={producto.imagenes[0]} alt={producto.nombre} loading="lazy" />
          : <MarbleSwatch tono={producto.tono} seed={Number(producto.id) * 11} titulo={producto.tipo_marmol} />}
      </Link>
      <div className="tarjeta-info">
        {slugMaterial
          ? <Link to={`/materiales/${slugMaterial}`} className="marmol marmol-enlace">{producto.tipo_marmol}</Link>
          : <span className="marmol">{producto.tipo_marmol}</span>}
        <h3><Link to={rutaProducto}>{producto.nombre}</Link></h3>
        <span className="cat">{cat}</span>
      </div>
    </article>
  )
}
