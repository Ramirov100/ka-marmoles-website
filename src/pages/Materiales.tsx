import { useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import MarbleSwatch from '../components/MarbleSwatch'
import { MATERIALES, CATEGORIAS_MATERIAL, type Material } from '../data/materiales'

// Tono aproximado para el fallback procedural cuando un material no tiene foto.
function tonoFallback(nombre: string): 'blanco' | 'negro' | 'travertino' | 'verde' | 'gris' {
  const n = nombre.toLowerCase()
  if (/negr|black/.test(n)) return 'negro'
  if (/verde|green/.test(n)) return 'verde'
  if (/travertino|dorado|café|cafe|naranja|tabaco/.test(n)) return 'travertino'
  if (/blanc|white|bianco/.test(n)) return 'blanco'
  return 'gris'
}

export default function Materiales() {
  const [filtro, setFiltro] = useState<Material['categoria'] | 'todos'>('todos')
  const visibles = filtro === 'todos' ? MATERIALES : MATERIALES.filter(m => m.categoria === filtro)

  return (
    <>
      <SEO titulo="Materiales" descripcion="Más de 75 piedras naturales en existencia: mármoles nacionales e importados, granitos, canteras y basaltos, disponibles en láminas y parquet." />
      <section className="cabecera-pagina" style={{ '--imagen-cabecera': "url('/heroes/hero-wide-1.jpg')" } as CSSProperties}>
        <div className="container">
          <span className="eyebrow">Materiales</span>
          <h2 style={{ fontSize: 'clamp(36px, 5vw, 60px)', margin: '14px 0 24px', maxWidth: '18ch' }}>
            La piedra, en su origen.
          </h2>
          <p className="prosa" style={{ color: 'var(--veta)', maxWidth: '58ch', margin: 0 }}>
            Mármoles nacionales e importados, granitos, canteras y basaltos, disponibles
            en láminas y parquet. Más de 15 años seleccionando piedra natural nos permiten
            asesorarte pieza por pieza.
          </p>
        </div>
      </section>
      <section className="seccion">
        <div className="container">
          <div className="filtros" role="tablist" aria-label="Filtrar por tipo de piedra">
            <button className={`filtro ${filtro === 'todos' ? 'activo' : ''}`} onClick={() => setFiltro('todos')}>
              Todos
            </button>
            {CATEGORIAS_MATERIAL.map(c => (
              <button key={c.id} className={`filtro ${filtro === c.id ? 'activo' : ''}`} onClick={() => setFiltro(c.id)}>
                {c.nombre}
              </button>
            ))}
          </div>

          <ul className="grid-materiales">
            {visibles.map(m => (
              <li key={m.slug} className="material">
                <Link to={`/materiales/${m.slug}`} aria-label={`Ver ${m.nombre}`}>
                  <div className="material-swatch">
                    {m.imagen
                      ? <img src={m.imagen} alt={`Piedra ${m.nombre}`} loading="lazy" />
                      : <MarbleSwatch tono={tonoFallback(m.nombre)} seed={m.slug.length * 7} titulo={m.nombre} />}
                  </div>
                  <span className="material-nombre">{m.nombre}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="cta-banda">
        <div className="container cta-banda-inner">
          <span className="eyebrow">Láminas y parquet</span>
          <h2>Cotiza tu piedra.</h2>
          <p>Dinos qué material buscas y para qué proyecto: te confirmamos existencia, formatos y precio el mismo día.</p>
          <Link className="btn oro" to="/cotizar?proyecto=losas">
            Cotizar
          </Link>
        </div>
      </section>
    </>
  )
}
