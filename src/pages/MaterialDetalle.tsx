import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import SEO from '../components/SEO'
import MarbleSwatch from '../components/MarbleSwatch'
import { MATERIALES, nombreCategoria } from '../data/materiales'
import { ESCENAS_RENDER, NOMBRE_ESCENA, useRenders, type EscenaRender } from '../lib/renders'

export default function MaterialDetalle() {
  const { slug } = useParams()
  const material = MATERIALES.find(m => m.slug === slug)
  const [visorAbierto, setVisorAbierto] = useState(false)
  const [ambiente, setAmbiente] = useState<EscenaRender | null>(null)
  const renders = useRenders(material?.slug)

  // Los visores a pantalla completa cierran con Escape y bloquean el scroll del fondo.
  const visorActivo = visorAbierto || ambiente !== null
  useEffect(() => {
    if (!visorActivo) return
    document.body.style.overflow = 'hidden'
    const alTeclear = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setVisorAbierto(false); setAmbiente(null) }
    }
    document.addEventListener('keydown', alTeclear)
    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', alTeclear)
    }
  }, [visorActivo])

  if (!material) {
    return (
      <section className="seccion" style={{ paddingTop: 160 }}>
        <SEO titulo="Material no encontrado" />
        <div className="container">
          <h2>Material no encontrado</h2>
          <p style={{ color: 'var(--veta)', margin: '16px 0 32px' }}>Es posible que el enlace haya cambiado.</p>
          <Link to="/materiales" className="btn">Volver a materiales</Link>
        </div>
      </section>
    )
  }

  const categoria = nombreCategoria(material.categoria)
  const primeraFrase = material.descripcion.split('.')[0] + '.'
  const relacionados = MATERIALES
    .filter(m => m.categoria === material.categoria && m.slug !== material.slug)
    .slice(0, 3)

  return (
    <>
      <SEO titulo={material.nombre} descripcion={primeraFrase} />

      <section className="material-hero">
        {material.imagen
          ? <img src={material.imagen} alt={`Piedra ${material.nombre}`} loading="eager" />
          : <MarbleSwatch tono="gris" seed={material.slug.length * 7} titulo={material.nombre} />}
        <div className="material-hero-velo" aria-hidden="true" />
        <div className="container material-hero-titulo">
          <h1>{material.nombre}</h1>
        </div>
      </section>

      <nav className="migas container" aria-label="Ruta de navegación">
        <Link to="/materiales">Materiales</Link>
        <span aria-hidden="true">/</span>
        <Link to="/materiales">{categoria}</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{material.nombre}</span>
      </nav>

      <section className="seccion" style={{ paddingTop: 56 }}>
        <div className="container">
          <span className="eyebrow">{categoria}</span>
          <h2 style={{ fontSize: 'clamp(32px, 4.5vw, 54px)', margin: '14px 0 6px' }}>{material.nombre}</h2>
          <p className="material-subtitulo">Piedra natural en lámina y parquet</p>
          <p className="prosa material-descripcion">{material.descripcion}</p>
        </div>
      </section>

      <section className="seccion" style={{ paddingTop: 0 }}>
        <div className="container">
          <span className="eyebrow">Closeup</span>
          <h2 style={{ fontSize: 'clamp(24px, 3vw, 34px)', margin: '14px 0 28px' }}>La piedra, de cerca.</h2>
          {material.imagen ? (
            <button className="material-closeup" onClick={() => setVisorAbierto(true)}
              aria-label={`Ver ${material.nombre} a pantalla completa`}>
              <img src={material.imagen} alt={`Textura de ${material.nombre}`} loading="lazy" />
              <span className="material-closeup-nota" aria-hidden="true">Ampliar +</span>
            </button>
          ) : (
            <div className="material-closeup">
              <MarbleSwatch tono="gris" seed={material.slug.length * 7} titulo={material.nombre} />
            </div>
          )}
        </div>
      </section>

      {renders && ESCENAS_RENDER.some(e => renders[e]) && (
        <section className="seccion" style={{ paddingTop: 0 }}>
          <div className="container">
            <span className="eyebrow">Ambientes</span>
            <h2 style={{ fontSize: 'clamp(24px, 3vw, 34px)', margin: '14px 0 28px' }}>La piedra en el espacio.</h2>
            <div className="ambientes">
              {ESCENAS_RENDER.filter(e => renders[e]).map(e => (
                <button key={e} className="ambiente" onClick={() => setAmbiente(e)}
                  aria-label={`Ver ${material.nombre} en ${NOMBRE_ESCENA[e]} a pantalla completa`}>
                  <img src={renders[e]!} alt={`${material.nombre} aplicado en ${NOMBRE_ESCENA[e]}`}
                    loading="lazy" />
                  <span className="ambiente-nombre" aria-hidden="true">{NOMBRE_ESCENA[e]}</span>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="seccion" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="seccion-cabecera">
            <div>
              <span className="eyebrow">{categoria}</span>
              <h2 style={{ fontSize: 'clamp(24px, 3vw, 34px)', marginTop: 14 }}>Piedras de la misma familia</h2>
            </div>
            <Link to="/materiales" className="ver-todo">Volver a materiales</Link>
          </div>
          <ul className="materiales grid-relacionados">
            {relacionados.map(m => (
              <li key={m.slug} className="material">
                <Link to={`/materiales/${m.slug}`} aria-label={`Ver ${m.nombre}`}>
                  <div className="material-swatch">
                    {m.imagen
                      ? <img src={m.imagen} alt={`Piedra ${m.nombre}`} loading="lazy" />
                      : <MarbleSwatch tono="gris" seed={m.slug.length * 7} titulo={m.nombre} />}
                  </div>
                  <span className="material-nombre">{m.nombre}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {visorAbierto && material.imagen && (
        <div className="visor-piedra" role="dialog" aria-modal="true" aria-label={`${material.nombre} a pantalla completa`}
          onClick={() => setVisorAbierto(false)}>
          <button className="visor-cerrar" onClick={() => setVisorAbierto(false)} aria-label="Cerrar visor" autoFocus>
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M2 2l12 12M14 2L2 14" />
            </svg>
          </button>
          <img src={material.imagen} alt={`Textura de ${material.nombre} ampliada`}
            onClick={e => e.stopPropagation()} />
        </div>
      )}

      {ambiente && (
        <div className="visor-piedra" role="dialog" aria-modal="true"
          aria-label={`${material.nombre} en ${NOMBRE_ESCENA[ambiente]} a pantalla completa`}
          onClick={() => setAmbiente(null)}>
          <button className="visor-cerrar" onClick={() => setAmbiente(null)} aria-label="Cerrar visor" autoFocus>
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M2 2l12 12M14 2L2 14" />
            </svg>
          </button>
          <img src={renders?.[ambiente] ?? undefined} alt={`${material.nombre} aplicado en ${NOMBRE_ESCENA[ambiente]}`}
            onClick={e => e.stopPropagation()} />
        </div>
      )}
    </>
  )
}
