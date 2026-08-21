#!/usr/bin/env node
// Batch-generate room renders: material swatch + scene photo -> gemini-2.5-flash-image.
// Usage: GEMINI_API_KEY=... node scripts/generate-renders.mjs
// Resumable: existing files in public/simulador/renders/ are skipped.

import { readFileSync, existsSync, mkdirSync, writeFileSync, unlinkSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const PUBLIC = path.join(ROOT, 'public')
const OUT_DIR = path.join(PUBLIC, 'simulador', 'renders')
const MODEL = 'gemini-2.5-flash-image'
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`
const DELAY_MS = Number(process.env.DELAY_MS ?? 4000)
const MAX_WIDTH = 2000
const JPEG_QUALITY = 80

const API_KEY = process.env.GEMINI_API_KEY
if (!API_KEY) {
  console.error('Missing GEMINI_API_KEY env var. Run: export GEMINI_API_KEY=... first.')
  process.exit(1)
}

// Already rendered manually in Google Flow — skip all 3 scenes for these.
const SKIP_SLUGS = new Set([
  'arabescato-blue',
  'arabescato-corchia',
  'augusta-grey',
  'barbarian-grey',
  'bianco-magari',
  'bianco-panno-2',
  'bianco-panno',
])

const SCENES = {
  cocina: 'kitchen — backsplash, island top, waterfall side faces, and perimeter countertop',
  bano: 'bathroom — full back wall, shower wall, vanity top, and floor',
  sala: 'living room — fireplace wall (not the firebox opening) and coffee table top',
}

const promptFor = sceneDesc =>
  `Replace all the marble/stone surfaces in this ${sceneDesc} with the stone from the first reference image, matching its exact color and veining character, with the veining scaled realistically for large slab surfaces. Keep everything else in the room absolutely identical: cabinets, fixtures, lighting, shadows, reflections, furniture, decor, and camera angle. The stone must remain clearly distinguishable from any dark matte cabinetry. Professional interior photography of the same room built entirely from this stone.`

// Parse slug + imagen pairs out of src/data/materiales.ts (no TS loader needed).
function loadMaterials() {
  const src = readFileSync(path.join(ROOT, 'src', 'data', 'materiales.ts'), 'utf8')
  const re = /slug: '([^']+)', categoria: '[^']+',\s*\n\s*imagen: (?:'([^']+)'|null)/g
  const materials = []
  for (const m of src.matchAll(re)) {
    if (m[2]) materials.push({ slug: m[1], imagen: m[2] })
  }
  return materials
}

const b64 = filePath => readFileSync(filePath).toString('base64')
const mimeOf = filePath => (path.extname(filePath).toLowerCase() === '.png' ? 'image/png' : 'image/jpeg')
const sleep = ms => new Promise(r => setTimeout(r, ms))

async function generateImage(swatchPath, scenePath, prompt) {
  const body = {
    contents: [{
      parts: [
        { inline_data: { mime_type: mimeOf(swatchPath), data: b64(swatchPath) } },
        { inline_data: { mime_type: mimeOf(scenePath), data: b64(scenePath) } },
        { text: prompt },
      ],
    }],
  }
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': API_KEY },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    const err = new Error(`HTTP ${res.status}: ${text.slice(0, 300)}`)
    err.retryable = res.status === 429 || res.status >= 500
    throw err
  }
  const json = await res.json()
  const parts = json.candidates?.[0]?.content?.parts ?? []
  const imgPart = parts.find(p => p.inlineData?.data || p.inline_data?.data)
  if (!imgPart) {
    const reason = json.candidates?.[0]?.finishReason ?? json.promptFeedback?.blockReason ?? 'no image part in response'
    throw new Error(`No image returned (${reason})`)
  }
  return Buffer.from(imgPart.inlineData?.data ?? imgPart.inline_data.data, 'base64')
}

// Re-encode as JPEG quality 80, downscaling to 2000px wide if larger. Uses macOS sips.
function compressToJpeg(rawBuffer, outPath) {
  const tmp = outPath + '.tmp'
  writeFileSync(tmp, rawBuffer)
  try {
    const widthOut = execFileSync('sips', ['-g', 'pixelWidth', tmp], { encoding: 'utf8' })
    const width = Number(widthOut.match(/pixelWidth: (\d+)/)?.[1] ?? 0)
    const args = width > MAX_WIDTH ? ['--resampleWidth', String(MAX_WIDTH)] : []
    execFileSync('sips', [
      ...args,
      '--setProperty', 'format', 'jpeg',
      '--setProperty', 'formatOptions', String(JPEG_QUALITY),
      tmp, '--out', outPath,
    ], { stdio: 'pipe' })
  } finally {
    try { unlinkSync(tmp) } catch {}
  }
}

async function main() {
  mkdirSync(OUT_DIR, { recursive: true })

  const materials = loadMaterials().filter(m => !SKIP_SLUGS.has(m.slug))
  const jobs = []
  for (const mat of materials) {
    for (const scene of Object.keys(SCENES)) {
      jobs.push({ ...mat, scene })
    }
  }

  const pending = jobs.filter(j => !existsSync(path.join(OUT_DIR, `${j.slug}-${j.scene}.jpg`)))
  const total = jobs.length
  console.log(`${materials.length} materials x ${Object.keys(SCENES).length} scenes = ${total} renders`)
  console.log(`${total - pending.length} already exist, ${pending.length} to generate\n`)

  let done = total - pending.length
  const failures = []

  for (const job of pending) {
    const outPath = path.join(OUT_DIR, `${job.slug}-${job.scene}.jpg`)
    const swatchPath = path.join(PUBLIC, job.imagen)
    const scenePath = path.join(PUBLIC, 'simulador', `${job.scene}.jpg`)
    const label = `${job.slug}-${job.scene}`

    if (!existsSync(swatchPath)) {
      console.error(`[SKIP] ${label}: swatch not found at ${swatchPath}`)
      failures.push(label)
      continue
    }

    try {
      let raw
      try {
        raw = await generateImage(swatchPath, scenePath, promptFor(SCENES[job.scene]))
      } catch (err) {
        if (!err.retryable) throw err
        console.warn(`  retrying ${label} after: ${err.message}`)
        await sleep(15000)
        raw = await generateImage(swatchPath, scenePath, promptFor(SCENES[job.scene]))
      }
      compressToJpeg(raw, outPath)
      done++
      console.log(`[${done}/${total}] ${label}`)
    } catch (err) {
      failures.push(label)
      console.error(`[FAIL] ${label}: ${err.message}`)
    }

    await sleep(DELAY_MS)
  }

  console.log(`\nDone: ${done}/${total} rendered, ${failures.length} failed.`)
  if (failures.length) {
    console.log('Failed (re-run the script to retry these):')
    for (const f of failures) console.log(`  - ${f}`)
    process.exitCode = 1
  }
}

main()
