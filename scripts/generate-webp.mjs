#!/usr/bin/env node
// Genera versiones .webp junto a los .jpg de renders y heroes.
// Correr tras agregar o reemplazar cualquier .jpg en esas carpetas:
//   node scripts/generate-webp.mjs
// Solo re-codifica cuando el .webp falta o es más viejo que su .jpg.
// Requiere cwebp (brew install webp).

import { readdirSync, statSync, existsSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

const CARPETAS = [
  { dir: 'public/simulador/renders', calidad: 78 },
  { dir: 'public/heroes', calidad: 75 },
]

let hechos = 0, alDia = 0, fallas = 0
for (const { dir, calidad } of CARPETAS) {
  const abs = path.join(ROOT, dir)
  for (const nombre of readdirSync(abs)) {
    if (!/\.jpe?g$/i.test(nombre)) continue
    const jpg = path.join(abs, nombre)
    const webp = jpg.replace(/\.jpe?g$/i, '.webp')
    if (existsSync(webp) && statSync(webp).mtimeMs >= statSync(jpg).mtimeMs) { alDia++; continue }
    try {
      execFileSync('cwebp', ['-quiet', '-q', String(calidad), '-metadata', 'none', jpg, '-o', webp])
      hechos++
    } catch (err) {
      fallas++
      console.error(`FALLA ${dir}/${nombre}: ${err.message}`)
    }
  }
}
console.log(`webp generados: ${hechos}, ya al día: ${alDia}, fallas: ${fallas}`)
if (fallas) process.exitCode = 1
