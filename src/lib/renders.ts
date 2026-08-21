import { useEffect, useState } from 'react'

/*
 * Renders reales por material y escena: public/simulador/renders/[slug]-[escena].jpg
 *
 * La única fuente de verdad es el archivo en disco. Se sondea la URL con una
 * petición HEAD (sin descargar la imagen) y se cachea el resultado por URL,
 * de modo que agregar o reemplazar un archivo con el mismo nombre funciona
 * sin tocar código. Se exige content-type de imagen para que un fallback
 * HTML del servidor (SPA) no cuente como render existente.
 */

export type EscenaRender = 'cocina' | 'bano' | 'sala'
export const ESCENAS_RENDER: EscenaRender[] = ['cocina', 'bano', 'sala']
export const NOMBRE_ESCENA: Record<EscenaRender, string> = { cocina: 'Cocina', bano: 'Baño', sala: 'Sala' }

export const urlRender = (slug: string, escena: EscenaRender) =>
  `/simulador/renders/${slug}-${escena}.jpg`

const sondas = new Map<string, Promise<boolean>>()

/** ¿Existe el render de este material en esta escena? Una sola sonda por URL. */
export function existeRender(slug: string, escena: EscenaRender): Promise<boolean> {
  const url = urlRender(slug, escena)
  let sonda = sondas.get(url)
  if (!sonda) {
    sonda = fetch(url, { method: 'HEAD' })
      .then(r => r.ok && (r.headers.get('content-type') ?? '').startsWith('image/'))
      .catch(() => false)
    sondas.set(url, sonda)
  }
  return sonda
}

/** true/false cuando la sonda responde; null mientras tanto. */
export function useRender(slug: string | undefined, escena: EscenaRender): boolean | null {
  const [ok, setOk] = useState<boolean | null>(null)
  useEffect(() => {
    if (!slug) { setOk(false); return }
    let vivo = true
    setOk(null)
    existeRender(slug, escena).then(v => { if (vivo) setOk(v) })
    return () => { vivo = false }
  }, [slug, escena])
  return ok
}

/** Disponibilidad de las tres escenas de un material; null mientras se sondea. */
export function useRenders(slug: string | undefined): Record<EscenaRender, boolean> | null {
  const [estado, setEstado] = useState<Record<EscenaRender, boolean> | null>(null)
  useEffect(() => {
    if (!slug) { setEstado(null); return }
    let vivo = true
    setEstado(null)
    Promise.all(ESCENAS_RENDER.map(e => existeRender(slug, e))).then(([cocina, bano, sala]) => {
      if (vivo) setEstado({ cocina, bano, sala })
    })
    return () => { vivo = false }
  }, [slug])
  return estado
}
