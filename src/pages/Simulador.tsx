import { useEffect, useState, type CSSProperties, type PointerEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import SEO from '../components/SEO'
import { MATERIALES, CATEGORIAS_MATERIAL, nombreCategoria, type Material } from '../data/materiales'
import { ESCENAS, clipDePoligono, poligonosDe, mascaraPoligonos, mascaraAgujeros, type Escena } from '../data/escenas'
import { useRender, type EscenaRender } from '../lib/renders'

// Precarga silenciosa de una textura (al pasar el cursor por un swatch).
const precargar = (src: string | null) => { if (src) new Image().src = src }

const CON_FOTO = MATERIALES.filter(m => m.imagen)

const alfa = (mascara: string) => ({
  WebkitMaskImage: mascara, maskImage: mascara,
  WebkitMaskSize: '100% 100%', maskSize: '100% 100%',
} as CSSProperties)

/** Grupo de superficies texturizadas de un material (una capa por polígono). */
function CapaTextura({ escena, textura, entrante }: { escena: Escena; textura: string; entrante?: boolean }) {
  return (
    <div className={`sim-capa ${entrante ? 'entrante' : ''}`}>
      {poligonosDe(escena.superficies).map(({ superficie, poligono }, i) => {
        // El aplastado (scaleY) va en un hijo sobredimensionado: si se aplicara al
        // elemento recortado, deformaría también la forma del clip-path.
        const extra = superficie.aplanar ? (100 / superficie.aplanar - 100) / 2 : 0
        return (
          <div key={`${superficie.nombre}-${i}`} className="sim-superficie"
            style={{ clipPath: clipDePoligono(poligono) }}>
            <div className="sim-tex" style={{
              top: `-${extra}%`, bottom: `-${extra}%`,
              backgroundImage: `url(${textura})`,
              backgroundSize: `${superficie.escala * 100}% auto`,
              transform: superficie.aplanar ? `scaleY(${superficie.aplanar})` : undefined,
            }} />
          </div>
        )
      })}
    </div>
  )
}

const centroide = (poligono: [number, number][]) => {
  const n = poligono.length
  return [poligono.reduce((a, p) => a + p[0], 0) / n, poligono.reduce((a, p) => a + p[1], 0) / n]
}

/** Visor fotorrealista: textura → foto con agujeros → velo multiply de la propia foto. */
function VisorFoto({ escena, material, anterior, debug }: {
  escena: Escena; material: Material; anterior: string | null; debug: boolean
}) {
  // Lectura de coordenadas para calibrar (?debug=1): posición del cursor y último clic, en %.
  const [cursor, setCursor] = useState<[number, number] | null>(null)
  const [clic, setClic] = useState<[number, number] | null>(null)

  const coordsDe = (e: PointerEvent<HTMLDivElement>): [number, number] => {
    const r = e.currentTarget.getBoundingClientRect()
    return [
      Math.round(((e.clientX - r.left) / r.width) * 1000) / 10,
      Math.round(((e.clientY - r.top) / r.height) * 1000) / 10,
    ]
  }

  return (
    <div className="sim-escena" role="img"
      style={{ aspectRatio: escena.proporcion }}
      aria-label={`${escena.nombre} con ${material.nombre} aplicado en las superficies de piedra`}
      onPointerMove={debug ? e => setCursor(coordsDe(e)) : undefined}
      onPointerLeave={debug ? () => setCursor(null) : undefined}
      onPointerDown={debug ? e => setClic(coordsDe(e)) : undefined}>
      {anterior && <CapaTextura escena={escena} textura={anterior} />}
      <CapaTextura escena={escena} textura={material.imagen!} entrante />
      {/* Foto del espacio con las superficies de piedra caladas */}
      <img className="sim-foto" src={escena.foto} alt="" style={alfa(mascaraAgujeros(escena.superficies))} />
      {/* La misma foto, solo en las superficies, multiplicada: luz, sombras y reflejos reales */}
      <img className="sim-foto sim-foto-luz" src={escena.foto} alt="" aria-hidden="true"
        style={alfa(mascaraPoligonos(escena.superficies))} />
      {debug && (
        <>
          <svg className="sim-debug" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {poligonosDe(escena.superficies).map(({ superficie, poligono }, i) => {
              const [cx, cy] = centroide(poligono)
              return (
                <g key={i}>
                  <polygon points={poligono.map(p => p.join(',')).join(' ')} />
                  <text x={poligono[0][0] + 1} y={poligono[0][1] + 3}>{superficie.nombre} ×{superficie.escala}</text>
                  <text className="sim-debug-indice" x={cx} y={cy + 2} textAnchor="middle">{i + 1}</text>
                </g>
              )
            })}
          </svg>
          <div className="sim-lectura" aria-hidden="true">
            <span>cursor {cursor ? `${cursor[0]} , ${cursor[1]}` : '—'}</span>
            <span>clic {clic ? `${clic[0]} , ${clic[1]}` : '—'}</span>
          </div>
        </>
      )}
    </div>
  )
}

/** Visor de render real: el material ya construido en la escena, sin máscaras. */
function VisorRender({ escena, material, url }: { escena: Escena; material: Material; url: string }) {
  const [cargado, setCargado] = useState(false)
  useEffect(() => { setCargado(false) }, [url])
  return (
    <div className="sim-escena" role="img"
      style={{ aspectRatio: escena.proporcion }}
      aria-label={`Render de ${escena.nombre} construida en ${material.nombre}`}>
      <img key={url} className="sim-foto" src={url} alt="" onLoad={() => setCargado(true)}
        style={{ opacity: cargado ? 1 : 0, transition: 'opacity 0.35s ease-out' }} />
      <span className="sim-render-badge" aria-hidden="true">Render</span>
    </div>
  )
}

/** Visor estilizado (fallback mientras no existan las fotos en /public/simulador). */
function VisorSVG({ escena, material, anterior }: { escena: Escena; material: Material; anterior: string | null }) {
  return (
    <div className="sim-escena" role="img"
      aria-label={`${escena.nombre} con ${material.nombre} aplicado en las superficies de piedra`}>
      <div className="sim-piedra" style={alfa(escena.mascara)}>
        {anterior && <img key={`ant-${anterior}`} src={anterior} alt="" className="sim-textura" />}
        <img key={material.slug} src={material.imagen!} alt="" className="sim-textura entrante" loading="lazy" />
        <div className="sim-luz" aria-hidden="true" />
      </div>
      <escena.Sala />
    </div>
  )
}

export default function Simulador() {
  const [params] = useSearchParams()
  const debug = params.get('debug') === '1'
  const [escena, setEscena] = useState(ESCENAS[0])
  const [material, setMaterial] = useState(CON_FOTO[0])
  const [anterior, setAnterior] = useState<string | null>(null)
  const [filtro, setFiltro] = useState<Material['categoria'] | 'todos'>('todos')
  // Fotos disponibles por escena; si faltan, cada visor cae a la escena SVG.
  const [fotosOk, setFotosOk] = useState<Record<string, boolean>>({})

  useEffect(() => {
    ESCENAS.forEach(e => {
      const im = new Image()
      im.onload = () => setFotosOk(p => ({ ...p, [e.id]: true }))
      im.src = e.foto
    })
  }, [])

  const visibles = filtro === 'todos' ? CON_FOTO : CON_FOTO.filter(m => m.categoria === filtro)

  const elegir = (m: Material) => {
    if (m.slug === material.slug) return
    setAnterior(material.imagen)
    setMaterial(m)
    // La capa anterior se retira tras el fundido de 350ms.
    window.setTimeout(() => setAnterior(null), 400)
  }

  const conFoto = !!fotosOk[escena.id]
  // Si existe el render real [slug]-[escena] se muestra tal cual (webp o jpg,
  // lo que resuelva la sonda); si no, el sistema de máscaras funciona como siempre.
  const renderUrl = useRender(material.slug, escena.id as EscenaRender)

  return (
    <>
      <SEO titulo="Simulador" descripcion="Visualiza nuestros mármoles, granitos, canteras y basaltos aplicados en una cocina, un baño o una sala antes de decidir tu proyecto." />
      <section className="seccion" style={{ paddingTop: 140, paddingBottom: 90 }}>
        <div className="container">
          <span className="eyebrow">Simulador</span>
          <h2 style={{ fontSize: 'clamp(36px, 5vw, 60px)', margin: '14px 0 18px', maxWidth: '16ch' }}>
            Visualiza tu espacio.
          </h2>
          <p className="prosa" style={{ color: 'var(--veta)', maxWidth: '56ch', margin: 0 }}>
            Elige un espacio y una piedra del catálogo: la textura se aplica
            a las superficies para que imagines el resultado antes de cotizar.
          </p>
        </div>
      </section>

      <section className="seccion" style={{ paddingTop: 0 }}>
        <div className="container sim-layout">
          {/* Visor */}
          <div className="sim-visor">
            {renderUrl
              ? <VisorRender escena={escena} material={material} url={renderUrl} />
              : conFoto
                ? <VisorFoto escena={escena} material={material} anterior={anterior} debug={debug} />
                : <VisorSVG escena={escena} material={material} anterior={anterior} />}
            <div className="sim-info">
              <div>
                <span className="eyebrow">{nombreCategoria(material.categoria)}</span>
                <h3>{material.nombre}</h3>
              </div>
              <div className="sim-acciones">
                <Link className="btn" to={`/materiales/${material.slug}`}>Ver material</Link>
                <Link className="btn oro" to={`/cotizar?proyecto=losas&interes=${encodeURIComponent(material.nombre)}`}>
                  Cotizar este material
                </Link>
              </div>
            </div>
          </div>

          {/* Controles */}
          <div className="sim-controles">
            <span className="eyebrow">Espacios</span>
            <div className="sim-espacios" role="group" aria-label="Elegir espacio">
              {ESCENAS.map(e => (
                <button key={e.id} className={`sim-espacio ${e.id === escena.id ? 'activo' : ''}`}
                  onClick={() => setEscena(e)} aria-pressed={e.id === escena.id}>
                  <span className="sim-espacio-mini" aria-hidden="true">
                    {fotosOk[e.id]
                      ? <img src={e.foto} alt="" loading="lazy" />
                      : (
                        <>
                          <span className="sim-piedra" style={alfa(e.mascara)}>
                            <img src={material.imagen!} alt="" className="sim-textura" loading="lazy" />
                          </span>
                          <e.Sala />
                        </>
                      )}
                  </span>
                  <span className="sim-espacio-nombre">{e.nombre}</span>
                </button>
              ))}
            </div>

            <span className="eyebrow" style={{ display: 'block', marginTop: 36 }}>Materiales</span>
            <div className="filtros sim-filtros" role="tablist" aria-label="Filtrar materiales">
              <button className={`filtro ${filtro === 'todos' ? 'activo' : ''}`} onClick={() => setFiltro('todos')}>
                Todos
              </button>
              {CATEGORIAS_MATERIAL.map(c => (
                <button key={c.id} className={`filtro ${filtro === c.id ? 'activo' : ''}`} onClick={() => setFiltro(c.id)}>
                  {c.nombre}
                </button>
              ))}
            </div>
            <div className="sim-swatches" role="listbox" aria-label="Elegir material" aria-activedescendant={`sw-${material.slug}`}>
              {visibles.map(m => (
                <button key={m.slug} id={`sw-${m.slug}`} role="option"
                  className={`sim-swatch ${m.slug === material.slug ? 'activo' : ''}`}
                  aria-selected={m.slug === material.slug} title={m.nombre} aria-label={m.nombre}
                  onClick={() => elegir(m)}
                  onMouseEnter={() => precargar(m.imagen)} onFocus={() => precargar(m.imagen)}>
                  <img src={m.imagen!} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
