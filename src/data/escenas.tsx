/*
 * Escenas del simulador — sistema de capas:
 *
 *   [abajo]  textura del material (cover) → visible solo a través de la MÁSCARA
 *   [medio]  velo de luz (gradiente multiply) para que la piedra herede la iluminación
 *   [arriba] ilustración de la sala con las zonas de piedra TRANSPARENTES
 *
 * REEMPLAZO POR FOTOS REALES (cuando existan):
 *   Cada escena acepta archivos externos en lugar de los SVG estilizados.
 *   Entregar por escena, en public/escenas/:
 *     1. {id}-room.png  — foto del espacio a 1600×1000 px, con las superficies de
 *        piedra RECORTADAS (alfa transparente). PNG-24 con canal alfa.
 *     2. {id}-mask.png  — 1600×1000 px, canal alfa: opaco (cualquier color) donde
 *        va la piedra, transparente en el resto. Debe calzar 1:1 con los recortes
 *        del room.png (mismo encuadre, mismos píxeles).
 *   Y en este archivo, en la escena correspondiente, definir:
 *     salaSrc: '/escenas/cocina-room.png',
 *     mascaraSrc: '/escenas/cocina-mask.png',
 *   (con eso se ignoran el SVG inline y la máscara vectorial).
 *   Mantener la proporción 16:10; el contenedor usa aspect-ratio 1600/1000.
 */
import type { ReactNode } from 'react'

/*
 * MODO FOTO (preferido): si existe public/simulador/{id}.jpg, el visor usa la
 * foto real con las superficies definidas como POLÍGONOS en coordenadas
 * porcentuales (0–100, x desde la izquierda, y desde arriba). Afinar números
 * a ojo con ?debug=1 en la URL, que dibuja los contornos sobre la foto.
 * `escala` controla el tamaño del azulejo de textura por superficie
 * (1 = el ancho completo de la escena; muros ~1.2–1.4, cubiertas ~0.5).
 * Si la foto no existe, el visor cae a la escena SVG estilizada de abajo.
 * Las fotos idealmente en proporción 16:10 (p. ej. 1600×1000); otras
 * proporciones se recortan con object-fit: cover.
 */
export type Punto = [number, number]

export interface Superficie {
  nombre: string
  /** Tamaño del tile de textura relativo al ancho de la escena. */
  escala: number
  /**
   * Aplastamiento vertical de la textura (scaleY) para caras horizontales
   * vistas en perspectiva (cubiertas, barras): ~0.4–0.6. Omitir en caras verticales.
   */
  aplanar?: number
  /**
   * Uno o más polígonos (vértices [x, y] en porcentaje del encuadre).
   * Las superficies con perspectiva se cubren con varios cuadriláteros:
   * p. ej. la isla = tapa + frente en cascada, cada cara su propio quad.
   * Los polígonos deben RODEAR los objetos en primer plano (espejos, llaves,
   * lavabos, tina): un agujero sobre un objeto lo borra de la foto.
   */
  poligonos: Punto[][]
}

export interface Escena {
  id: string
  nombre: string
  /** Foto real del espacio (superficies en mármol gris claro, luz pareja). */
  foto: string
  /** Proporción nativa de la foto (el visor la respeta 1:1, sin recorte). */
  proporcion: string
  /** Superficies de piedra sobre la foto. */
  superficies: Superficie[]
  /** Máscara vectorial del modo SVG (fallback). */
  mascara: string
  /** Ilustración estilizada de la sala (fallback; zonas de piedra transparentes). */
  Sala: () => ReactNode
}

// Construye una máscara SVG data-URI: blanco = piedra visible.
const mascaraDe = (formas: string) =>
  `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 1000' preserveAspectRatio='none'><g fill='white'>${formas}</g></svg>`,
  )}")`

/* Zonas de piedra por escena (una sola fuente de verdad: máscara + contornos). */
const ZONAS = {
  cocina: {
    barra: 'M120 470 h1360 v34 H120 Z',
    islaTapa: 'M380 600 L1220 600 L1260 640 L340 640 Z',
    islaFrente: 'M340 640 h920 v240 H340 Z',
  },
  bano: {
    muro: 'M180 120 h1240 v400 H180 Z',
    tocadorTapa: 'M300 640 L1300 640 L1330 672 L270 672 Z',
    tocadorFrente: 'M270 672 h1060 v180 H270 Z',
  },
  sala: {
    piso: 'M0 700 h1600 v300 H0 Z',
    mesaTapa: 'M600 760 L1000 760 L1030 790 L570 790 Z',
    mesaFrente: 'M570 790 h460 v90 H570 Z',
  },
}

const contorno = { fill: 'none', stroke: 'rgba(245,242,236,0.14)', strokeWidth: 2 } as const

function SalaCocina() {
  const z = ZONAS.cocina
  return (
    <svg viewBox="0 0 1600 1000" width="100%" height="100%" aria-hidden="true">
      <defs>
        <linearGradient id="c-ventana" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#34342f" /><stop offset="1" stopColor="#22221f" />
        </linearGradient>
        <linearGradient id="c-piso" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#121211" /><stop offset="1" stopColor="#0a0a09" />
        </linearGradient>
      </defs>
      {/* muro y ventana */}
      <rect x="0" y="0" width="1600" height="470" fill="#191917" />
      <rect x="1060" y="90" width="380" height="290" fill="url(#c-ventana)" />
      <path d="M1060 90 h380 v290 h-380 Z M1250 90 v290 M1060 235 h380" stroke="#0C0C0C" strokeWidth="10" fill="none" />
      {/* campana */}
      <path d="M640 60 h320 v90 l60 60 H580 l60 -60 Z" fill="#141413" stroke="rgba(245,242,236,0.08)" />
      {/* gabinetes bajo la barra (la franja de piedra queda arriba, transparente) */}
      <rect x="120" y="504" width="1360" height="136" fill="#161615" />
      <path d="M460 504 v136 M800 504 v136 M1140 504 v136" stroke="#0C0C0C" strokeWidth="4" />
      {/* piso: rodea la isla (la isla es piedra y debe quedar descubierta) */}
      <path d="M0 640 H340 V880 H1260 V640 H1600 V1000 H0 Z" fill="url(#c-piso)" />
      {/* sombra de la isla */}
      <rect x="330" y="882" width="950" height="24" fill="#000" opacity="0.45" />
      {/* lámparas colgantes */}
      <g stroke="#C8A55A" strokeWidth="3">
        <line x1="660" y1="0" x2="660" y2="250" /><line x1="940" y1="0" x2="940" y2="250" />
      </g>
      <circle cx="660" cy="272" r="24" fill="none" stroke="#C8A55A" strokeWidth="4" />
      <circle cx="940" cy="272" r="24" fill="none" stroke="#C8A55A" strokeWidth="4" />
      {/* contornos de las zonas de piedra */}
      <path d={z.barra} {...contorno} />
      <path d={z.islaTapa} {...contorno} />
      <path d={z.islaFrente} {...contorno} />
    </svg>
  )
}

function SalaBano() {
  const z = ZONAS.bano
  return (
    <svg viewBox="0 0 1600 1000" width="100%" height="100%" aria-hidden="true">
      <defs>
        <radialGradient id="b-espejo" cx="0.35" cy="0.3" r="1">
          <stop offset="0" stopColor="#2e2e2b" /><stop offset="1" stopColor="#171716" />
        </radialGradient>
      </defs>
      {/* muros alrededor del panel de piedra (el panel queda transparente) */}
      <rect x="0" y="0" width="1600" height="120" fill="#161614" />
      <rect x="0" y="0" width="180" height="1000" fill="#151513" />
      <rect x="1420" y="0" width="180" height="1000" fill="#151513" />
      <rect x="180" y="520" width="1240" height="120" fill="#161614" />
      {/* piso */}
      <rect x="180" y="852" width="1240" height="148" fill="#0e0e0d" />
      {/* espejo sobre el panel */}
      <circle cx="800" cy="320" r="150" fill="url(#b-espejo)" stroke="#C8A55A" strokeWidth="3" />
      {/* apliques */}
      <g stroke="#C8A55A" strokeWidth="4" opacity="0.85">
        <line x1="540" y1="230" x2="540" y2="410" /><line x1="1060" y1="230" x2="1060" y2="410" />
      </g>
      {/* lavabo y grifería sobre la cubierta de piedra */}
      <rect x="700" y="596" width="200" height="44" rx="10" fill="#101010" stroke="rgba(245,242,236,0.12)" />
      <path d="M800 560 v-40 h46 v14" stroke="#C8A55A" strokeWidth="6" fill="none" />
      {/* sombra bajo la cubierta */}
      <rect x="270" y="852" width="1060" height="18" fill="#000" opacity="0.4" />
      <path d={z.muro} {...contorno} />
      <path d={z.tocadorTapa} {...contorno} />
      <path d={z.tocadorFrente} {...contorno} />
    </svg>
  )
}

function SalaEstar() {
  const z = ZONAS.sala
  return (
    <svg viewBox="0 0 1600 1000" width="100%" height="100%" aria-hidden="true">
      <defs>
        <linearGradient id="s-luz" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2c2c27" /><stop offset="1" stopColor="#1d1d1a" />
        </linearGradient>
      </defs>
      {/* muro (el piso queda transparente: es piedra) */}
      <rect x="0" y="0" width="1600" height="700" fill="#161615" />
      {/* obra enmarcada */}
      <rect x="230" y="150" width="300" height="390" fill="#111110" stroke="#C8A55A" strokeWidth="2" />
      {/* panel de luz / ventana */}
      <rect x="1160" y="80" width="320" height="520" fill="url(#s-luz)" />
      <path d="M1160 80 h320 v520 h-320 Z" stroke="#0C0C0C" strokeWidth="8" fill="none" />
      {/* sofás (se dibujan sobre el piso de piedra) */}
      <g fill="#131312" stroke="rgba(245,242,236,0.08)">
        <rect x="40" y="430" width="520" height="150" rx="26" />
        <rect x="40" y="545" width="520" height="250" rx="26" />
        <rect x="1090" y="560" width="430" height="235" rx="26" />
        <rect x="1090" y="455" width="430" height="140" rx="26" />
      </g>
      <path d="M300 545 v250 M1305 595 v200" stroke="#0C0C0C" strokeWidth="4" />
      {/* sombra de la mesa */}
      <rect x="560" y="882" width="480" height="20" fill="#000" opacity="0.45" />
      {/* lámpara de pie */}
      <line x1="1560" y1="330" x2="1560" y2="700" stroke="#C8A55A" strokeWidth="4" />
      <circle cx="1560" cy="310" r="20" fill="none" stroke="#C8A55A" strokeWidth="4" />
      <path d={z.piso} {...contorno} />
      <path d={z.mesaTapa} {...contorno} />
      <path d={z.mesaFrente} {...contorno} />
    </svg>
  )
}

export const ESCENAS: Escena[] = [
  {
    id: 'cocina', nombre: 'Cocina',
    foto: '/simulador/cocina.jpg',
    proporcion: '2000 / 1116',
    superficies: [
      // Trazado sobre la foto real (los gabinetes negros parten el muro de mármol).
      {
        nombre: 'Muro de mármol', escala: 1.25,
        poligonos: [
          [[24.3, 9.2], [84.8, 9.2], [84.8, 23.6], [24.3, 23.6]],   // banda sobre los gabinetes altos
          [[24.3, 37.2], [84.8, 37.2], [84.8, 54.2], [24.3, 54.2]], // backsplash
        ],
      },
      {
        nombre: 'Barra perimetral', escala: 0.5, aplanar: 0.45,
        poligonos: [[[23.7, 54.2], [85.8, 54.2], [85.8, 56.2], [23.7, 56.2]]],
      },
      {
        nombre: 'Isla — cubierta', escala: 0.6, aplanar: 0.5,
        poligonos: [[[23.4, 57.3], [77.0, 57.3], [80.6, 61.8], [18.4, 61.2]]],
      },
      {
        nombre: 'Isla — frente', escala: 0.6,
        poligonos: [[[18.3, 61.2], [80.6, 61.8], [78.8, 96.2], [19.8, 97.2]]],
      },
    ],
    mascara: mascaraDe(Object.values(ZONAS.cocina).map(d => `<path d='${d}'/>`).join('')),
    Sala: SalaCocina,
  },
  {
    id: 'bano', nombre: 'Baño',
    foto: '/simulador/bano.jpg',
    proporcion: '2000 / 1116',
    superficies: [
      // El muro tras la tina se parte en 3 para rodear la grifería y la tina.
      {
        // Muro completo, de plafón a nivel del tocador/tina; hueco solo en el espejo.
        // Apliques y llaves quedan como siluetas re-sombreadas por el velo.
        nombre: 'Muro principal', escala: 1.35,
        poligonos: [
          [[9.5, 5.0], [19.0, 5.0], [19.0, 84.2], [9.5, 84.2]],     // muro lateral (entre regadera y esquina)
          [[19.0, 9.0], [23.5, 9.0], [23.5, 63.4], [19.0, 63.4]],   // a la izquierda del espejo
          [[23.5, 9.0], [50.7, 9.0], [50.7, 15.7], [23.5, 15.7]],   // sobre el espejo
          [[23.5, 50.0], [50.7, 50.0], [50.7, 63.4], [23.5, 63.4]], // bajo el espejo
          [[50.7, 9.0], [55.7, 9.0], [55.7, 63.4], [50.7, 63.4]],   // a la derecha del espejo
          [[55.7, 9.0], [89.7, 9.0], [89.7, 60.0], [55.7, 60.0]],   // paño tras la tina
          [[55.7, 60.0], [67.8, 60.0], [67.8, 67.2], [55.7, 67.2]], // a la izquierda del grifo
          [[75.2, 60.0], [89.7, 60.0], [89.7, 66.5], [75.2, 66.5]], // a la derecha del grifo
          [[88.2, 66.5], [89.7, 66.5], [89.7, 70.0], [88.2, 70.0]], // columna a la derecha de la tina
        ],
      },
      {
        nombre: 'Muro de la regadera', escala: 1.35,
        poligonos: [[[0.5, 4.0], [9.5, 4.0], [9.5, 99.0], [0.5, 99.0]]],
      },
      {
        nombre: 'Piso', escala: 1.6, aplanar: 0.35,
        poligonos: [
          [[9.5, 84.2], [57.0, 84.2], [57.0, 99.5], [9.5, 99.5]],   // a la izquierda de la tina
          [[57.0, 93.5], [94.0, 93.5], [94.0, 99.5], [57.0, 99.5]], // franja frente a la tina
          [[94.0, 84.2], [96.5, 84.2], [96.5, 99.5], [94.0, 99.5]], // a la derecha de la tina, antes de la cortina
        ],
      },
      {
        nombre: 'Tocador — cubierta', escala: 0.5, aplanar: 0.55,
        poligonos: [
          [[15.5, 63.3], [21.0, 63.3], [21.0, 65.9], [14.8, 65.9]], // tramo libre a la izquierda
          [[31.5, 63.3], [33.5, 63.3], [33.5, 65.9], [31.5, 65.9]], // tramo libre al centro
          [[53.8, 63.6], [55.3, 63.6], [55.3, 65.9], [53.8, 65.9]], // esquina derecha tras la maceta
        ],
      },
      {
        nombre: 'Tocador — canto', escala: 0.5,
        poligonos: [[[14.8, 65.9], [55.3, 65.9], [55.3, 68.1], [14.8, 68.1]]],
      },
    ],
    mascara: mascaraDe(Object.values(ZONAS.bano).map(d => `<path d='${d}'/>`).join('')),
    Sala: SalaBano,
  },
  {
    id: 'sala', nombre: 'Sala',
    foto: '/simulador/sala.jpg',
    proporcion: '2000 / 1116',
    superficies: [
      // El cuerpo de la chimenea rodea al hogar con 3 quads.
      {
        nombre: 'Chimenea', escala: 1.3,
        poligonos: [
          [[35.2, 7.5], [63.0, 7.5], [63.0, 50.7], [35.2, 50.7]],   // cuerpo sobre el hogar
          [[35.2, 50.7], [43.5, 50.7], [43.5, 69.0], [35.2, 69.0]], // a la izquierda del hogar
          [[55.8, 50.7], [63.0, 50.7], [63.0, 69.0], [55.8, 69.0]], // a la derecha del hogar
        ],
      },
      {
        nombre: 'Muros laterales', escala: 1.3,
        poligonos: [
          // Panel izquierdo completo hasta la consola: las ramas oscuras reaparecen
          // como silueta por el velo multiply; el jarrón claro se funde con la piedra.
          [[17.0, 11.1], [34.8, 11.1], [34.8, 55.0], [17.0, 55.0]],
          [[33.7, 37.6], [35.0, 37.6], [35.0, 74.0], [33.7, 74.0]], // franja junto a la chimenea
          [[63.2, 9.9], [82.8, 9.9], [82.8, 53.4], [63.2, 53.4]],   // panel derecho (sobre el sofá)
          [[63.2, 53.4], [76.0, 53.4], [76.0, 59.5], [63.2, 59.5]], // panel der. — cuña sobre el brazo del sofá
        ],
      },
      {
        nombre: 'Mesa — cubierta', escala: 0.45, aplanar: 0.5,
        poligonos: [[[37.3, 74.9], [64.6, 74.9], [71.3, 89.1], [29.7, 89.1]]],
      },
      {
        nombre: 'Mesa — canto', escala: 0.45,
        poligonos: [[[29.7, 89.1], [71.3, 89.1], [71.3, 91.8], [29.7, 91.8]]],
      },
    ],
    mascara: mascaraDe(Object.values(ZONAS.sala).map(d => `<path d='${d}'/>`).join('')),
    Sala: SalaEstar,
  },
]

/* Utilidades del modo foto */

/** clip-path CSS de un polígono. */
export const clipDePoligono = (poligono: Punto[]) =>
  `polygon(${poligono.map(([x, y]) => `${x}% ${y}%`).join(', ')})`

/** Todos los polígonos de una escena, aplanados en orden (para máscaras y debug). */
export const poligonosDe = (superficies: Superficie[]) =>
  superficies.flatMap(s => s.poligonos.map(poligono => ({ superficie: s, poligono })))

/** Máscara alfa (data-URI) que muestra SOLO los polígonos (para el velo de luz). */
export const mascaraPoligonos = (superficies: Superficie[]) =>
  `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'><g fill='white'>${poligonosDe(superficies)
      .map(({ poligono }) => `<polygon points='${poligono.map(p => p.join(',')).join(' ')}'/>`)
      .join('')}</g></svg>`,
  )}")`

/** Máscara alfa (data-URI) con AGUJEROS en los polígonos (para la foto de la sala). */
export const mascaraAgujeros = (superficies: Superficie[]) =>
  `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'><path fill='white' fill-rule='evenodd' d='M0 0 H100 V100 H0 Z ${poligonosDe(superficies)
      .map(({ poligono }) => `M${poligono.map(p => p.join(' ')).join(' L')} Z`)
      .join(' ')}'/></svg>`,
  )}")`
