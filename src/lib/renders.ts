import { useEffect, useState } from 'react'

/*
 * Renders reales por material y escena: public/simulador/renders/[slug]-[escena].jpg
 *
 * La única fuente de verdad es el archivo .jpg en disco: sin .jpg no hay render,
 * aunque exista un .webp suelto. Se sondea con HEAD (sin descargar la imagen),
 * exigiendo content-type de imagen para que un fallback HTML del servidor (SPA)
 * no cuente como render existente, y se cachea el resultado por URL.
 *
 * Si junto al .jpg hay un .webp (generado con `node scripts/generate-webp.mjs`),
 * se sirve el .webp por ser más ligero — salvo que el .jpg sea más reciente
 * (Last-Modified), señal de que alguien reemplazó el .jpg sin regenerar el
 * .webp: en ese caso gana el .jpg y nada queda obsoleto en pantalla.
 */

export type EscenaRender = 'cocina' | 'bano' | 'sala'
export const ESCENAS_RENDER: EscenaRender[] = ['cocina', 'bano', 'sala']
export const NOMBRE_ESCENA: Record<EscenaRender, string> = { cocina: 'Cocina', bano: 'Baño', sala: 'Sala' }

export const urlRender = (slug: string, escena: EscenaRender) =>
  `/simulador/renders/${slug}-${escena}.jpg`

/** HEAD a una URL: fecha Last-Modified si existe y es imagen; null si no. */
const cabecera = (url: string): Promise<{ fecha: number } | null> =>
  fetch(url, { method: 'HEAD' })
    .then(r => r.ok && (r.headers.get('content-type') ?? '').startsWith('image/')
      ? { fecha: Date.parse(r.headers.get('last-modified') ?? '') }
      : null)
    .catch(() => null)

const sondas = new Map<string, Promise<string | null>>()

/** Mejor URL del render de este material en esta escena, o null si no existe. */
export function sondaRender(slug: string, escena: EscenaRender): Promise<string | null> {
  const jpg = urlRender(slug, escena)
  let sonda = sondas.get(jpg)
  if (!sonda) {
    sonda = (async () => {
      const j = await cabecera(jpg)
      if (!j) return null
      const urlWebp = jpg.replace(/\.jpg$/, '.webp')
      const w = await cabecera(urlWebp)
      if (!w) return jpg
      // .jpg reemplazado después de generar el .webp → gana el .jpg fresco.
      if (Number.isFinite(w.fecha) && Number.isFinite(j.fecha) && w.fecha < j.fecha) return jpg
      return urlWebp
    })()
    sondas.set(jpg, sonda)
  }
  return sonda
}

/** URL del render cuando la sonda responde (null = no hay); undefined mientras tanto. */
export function useRender(slug: string | undefined, escena: EscenaRender): string | null | undefined {
  const [url, setUrl] = useState<string | null | undefined>(undefined)
  useEffect(() => {
    if (!slug) { setUrl(null); return }
    let vivo = true
    setUrl(undefined)
    sondaRender(slug, escena).then(u => { if (vivo) setUrl(u) })
    return () => { vivo = false }
  }, [slug, escena])
  return url
}

/** URLs de las tres escenas de un material (null donde no hay); null mientras se sondea. */
export function useRenders(slug: string | undefined): Record<EscenaRender, string | null> | null {
  const [estado, setEstado] = useState<Record<EscenaRender, string | null> | null>(null)
  useEffect(() => {
    if (!slug) { setEstado(null); return }
    let vivo = true
    setEstado(null)
    Promise.all(ESCENAS_RENDER.map(e => sondaRender(slug, e))).then(([cocina, bano, sala]) => {
      if (vivo) setEstado({ cocina, bano, sala })
    })
    return () => { vivo = false }
  }, [slug])
  return estado
}
