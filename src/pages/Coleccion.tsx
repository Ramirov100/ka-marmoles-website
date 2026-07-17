import { useState } from 'react'
import SEO from '../components/SEO'
import ProductCard from '../components/ProductCard'
import { CATEGORIAS, type Categoria } from '../data/productos'
import { useProductos } from '../lib/useProductos'

export default function Coleccion() {
  const { productos, loading } = useProductos()
  const [filtro, setFiltro] = useState<Categoria | 'todos'>('todos')
  const visibles = filtro === 'todos' ? productos : productos.filter(p => p.categoria === filtro)

  return (
    <section className="seccion" style={{ paddingTop: 140 }}>
      <SEO titulo="Colección" descripcion="Colección K+A Mármoles: mesas de comedor, mesas de centro, escritorios y estanterías en mármol, fabricadas a la medida." />
      <div className="container">
        <span className="eyebrow">Colección</span>
        <h2 style={{ fontSize: 'clamp(36px, 5vw, 60px)', margin: '14px 0 40px' }}>Mobiliario en mármol</h2>

        <div className="filtros" role="tablist" aria-label="Filtrar por categoría">
          <button className={`filtro ${filtro === 'todos' ? 'activo' : ''}`} onClick={() => setFiltro('todos')}>
            Todos
          </button>
          {CATEGORIAS.map(c => (
            <button key={c.id} className={`filtro ${filtro === c.id ? 'activo' : ''}`} onClick={() => setFiltro(c.id)}>
              {c.nombre}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid-productos">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="tarjeta"><div className="tarjeta-visual skeleton" /></div>
            ))}
          </div>
        ) : (
          <div className="grid-productos">
            {visibles.map(p => <ProductCard key={p.id} producto={p} />)}
          </div>
        )}
      </div>
    </section>
  )
}
