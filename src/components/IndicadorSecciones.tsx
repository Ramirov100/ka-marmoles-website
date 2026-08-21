import { useEffect, useState } from 'react'

// Indicador vertical de secciones (solo Home). Sin scroll-jacking: escucha el
// scroll nativo y marca la sección cuyo inicio ya cruzó el centro del viewport.
export interface Seccion { id: string; nombre: string }

export default function IndicadorSecciones({ secciones }: { secciones: Seccion[] }) {
  const [activo, setActivo] = useState(secciones[0]?.id)

  useEffect(() => {
    // Solo lecturas de layout (sin escrituras): es barato llamarlo por evento,
    // y evita depender de requestAnimationFrame (que se pausa en pestañas de fondo).
    const medir = () => {
      const umbral = window.innerHeight * 0.5
      let actual = secciones[0]?.id
      for (const s of secciones) {
        const el = document.getElementById(s.id)
        if (el && el.getBoundingClientRect().top <= umbral) actual = s.id
      }
      setActivo(actual)
    }
    medir() // estado correcto también al llegar con la página ya desplazada
    window.addEventListener('scroll', medir, { passive: true })
    window.addEventListener('resize', medir)
    return () => {
      window.removeEventListener('scroll', medir)
      window.removeEventListener('resize', medir)
    }
  }, [secciones])

  // scrollIntoView sin behavior explícito hereda scroll-behavior del CSS,
  // que ya cambia a instantáneo bajo prefers-reduced-motion.
  const ir = (id: string) => document.getElementById(id)?.scrollIntoView()

  return (
    <nav className="indicador-secciones" aria-label="Secciones">
      {secciones.map(s => (
        <button key={s.id} className={activo === s.id ? 'activo' : ''}
          aria-label={s.nombre} aria-current={activo === s.id ? 'true' : undefined}
          onClick={() => ir(s.id)} />
      ))}
    </nav>
  )
}
