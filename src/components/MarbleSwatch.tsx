// Textura de mármol procedural (SVG) — placeholder premium hasta tener fotos reales.
// Cada tono genera una veta distinta con feTurbulence, sin cargar imágenes externas.
// `escala` reduce la frecuencia del ruido para que la veta siga siendo visible
// cuando el swatch se muestra pequeño (p. ej. 0.35 en la franja de materiales).
interface Props { tono: 'blanco' | 'negro' | 'travertino' | 'verde' | 'gris'; seed?: number; titulo?: string; escala?: number }

const PALETAS: Record<Props['tono'], { base: string; veta: string; profundidad: string }> = {
  blanco:     { base: '#EDEAE3', veta: '#9C948A', profundidad: '#C9C3B8' },
  negro:      { base: '#141414', veta: '#6E665C', profundidad: '#2A2A28' },
  travertino: { base: '#D8C9B0', veta: '#A6906F', profundidad: '#C2B092' },
  verde:      { base: '#1E3B32', veta: '#7FA893', profundidad: '#2C544A' },
  gris:       { base: '#B9B7B2', veta: '#6F6D69', profundidad: '#96948F' },
}

export default function MarbleSwatch({ tono, seed = 7, titulo, escala = 1 }: Props) {
  const p = PALETAS[tono]
  const id = `veta-${tono}-${seed}-${escala}`
  return (
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" role="img" aria-label={titulo ?? `Mármol ${tono}`}>
      <defs>
        <filter id={id}>
          <feTurbulence type="fractalNoise" baseFrequency={`${0.012 * escala} ${0.028 * escala}`} numOctaves={4} seed={seed} result="ruido" />
          {/* umbral alto: solo las crestas del ruido se vuelven veta (cobertura ~15%) */}
          <feColorMatrix in="ruido" type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  5 5 5 0 -10.5" result="vetas" />
          <feFlood floodColor={p.veta} result="colorVeta" />
          <feComposite in="colorVeta" in2="vetas" operator="in" result="vetasColor" />
          <feTurbulence type="fractalNoise" baseFrequency={`${0.05 * escala} ${0.09 * escala}`} numOctaves={3} seed={seed + 3} result="grano" />
          {/* grano tenue: alfa variable en vez de cubrir toda la base */}
          <feColorMatrix in="grano" type="matrix"
            values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1.2 1.2 1.2 0 -1.4" result="granoAlpha" />
          <feFlood floodColor={p.profundidad} result="colorGrano" />
          <feComposite in="colorGrano" in2="granoAlpha" operator="in" result="granoColor" />
          <feMerge>
            <feMergeNode in="granoColor" />
            <feMergeNode in="vetasColor" />
          </feMerge>
        </filter>
      </defs>
      <rect width="800" height="600" fill={p.base} />
      <rect width="800" height="600" filter={`url(#${id})`} />
    </svg>
  )
}
