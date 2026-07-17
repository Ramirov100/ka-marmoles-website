import { Link } from 'react-router-dom'
import MarbleSwatch from './MarbleSwatch'
import { CATEGORIAS, type Producto } from '../data/productos'

export default function ProductCard({ producto }: { producto: Producto }) {
  const cat = CATEGORIAS.find(c => c.id === producto.categoria)?.nombre
  return (
    <Link to={`/coleccion/${producto.slug}`} className="tarjeta">
      <div className="tarjeta-visual">
        {producto.imagenes.length > 0
          ? <img src={producto.imagenes[0]} alt={producto.nombre} loading="lazy" />
          : <MarbleSwatch tono={producto.tono} seed={Number(producto.id) * 11} titulo={producto.tipo_marmol} />}
      </div>
      <div className="tarjeta-info">
        <span className="marmol">{producto.tipo_marmol}</span>
        <h3>{producto.nombre}</h3>
        <span className="cat">{cat}</span>
      </div>
    </Link>
  )
}
