import { useEffect, useState, type CSSProperties } from 'react'

export interface ImagenHero {
  src: string
  /** Encuadre en móvil (object-position); center por omisión. */
  posMovil?: string
}

const DURACION_MS = 6000

// Fondo rotatorio del hero con barra de progreso segmentada (estilo Antolini).
// El fin de la animación del segmento activo ES el temporizador del carrusel:
// barra y fundido no pueden desincronizarse, pausar la animación (pestaña oculta)
// pausa también la rotación, y bajo prefers-reduced-motion la animación no corre,
// así que no hay rotación automática: queda la primera imagen estática.
export default function HeroCarrusel({ imagenes }: { imagenes: ImagenHero[] }) {
  const [indice, setIndice] = useState(0)
  const [gen, setGen] = useState(0) // fuerza el reinicio del relleno al saltar al mismo índice
  const [conSrc, setConSrc] = useState(Math.min(2, imagenes.length))
  const [pausado, setPausado] = useState(false)

  useEffect(() => {
    const alCambiarVisibilidad = () => setPausado(document.hidden)
    alCambiarVisibilidad()
    document.addEventListener('visibilitychange', alCambiarVisibilidad)
    return () => document.removeEventListener('visibilitychange', alCambiarVisibilidad)
  }, [])

  // La siguiente imagen recibe src un ciclo completo antes de mostrarse.
  const precargarDesde = (i: number) =>
    setConSrc(n => Math.max(n, Math.min(imagenes.length, i + 2)))

  const avanzar = () => {
    setIndice(i => {
      const sig = (i + 1) % imagenes.length
      precargarDesde(sig)
      return sig
    })
  }

  const saltar = (i: number) => {
    precargarDesde(i)
    setIndice(i)
    setGen(g => g + 1)
  }

  return (
    <>
      {imagenes.length > 1 && (
        <div className={`carrusel-progreso ${pausado ? 'pausado' : ''}`} role="group" aria-label="Imágenes de portada">
          {imagenes.map((im, i) => (
            <button key={im.src} type="button" className="progreso-segmento" onClick={() => saltar(i)}
              aria-label={`Ir a la imagen ${i + 1} de ${imagenes.length}`}
              aria-current={i === indice ? 'true' : undefined}>
              {i === indice
                ? <span key={gen} className="progreso-relleno activo" onAnimationEnd={avanzar}
                    style={{ animationDuration: `${DURACION_MS}ms` }} />
                : <span className={`progreso-relleno ${i < indice ? 'lleno' : ''}`} />}
            </button>
          ))}
        </div>
      )}
      <div className="hero-fondo" aria-hidden="true">
        {imagenes.map((im, i) => (
          <img key={im.src}
            src={i < conSrc ? im.src : undefined}
            className={i === indice ? 'activa' : ''}
            style={im.posMovil ? ({ '--pos-movil': im.posMovil } as CSSProperties) : undefined}
            alt="" loading={i === 0 ? 'eager' : 'lazy'} decoding="async"
            {...(i === 0 ? ({ fetchpriority: 'high' } as object) : {})}
          />
        ))}
      </div>
    </>
  )
}
