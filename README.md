# K+A Mármoles — Website

Mobiliario de mármol de diseño. Mismo stack que Importadora Alegría: **React + Vite + TypeScript + Supabase + Vercel**.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3001
```

El sitio funciona sin Supabase (usa datos semilla en `src/data/productos.ts`). Para conectar Supabase:

1. Crea el proyecto en Supabase y corre `supabase/schema.sql` en el SQL Editor.
2. Copia `.env.example` a `.env` y llena `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY`.
3. Seed de productos: `SUPABASE_URL=... SUPABASE_SERVICE_ROLE=... bash supabase/seed.sh`
4. Crea el bucket `productos` (lectura pública) y sube imágenes; agrega las URLs al array `imagenes` de cada fila.

## Pendientes antes de lanzar

- [ ] Número real de WhatsApp en `src/components/WhatsAppButton.tsx` (const `NUMERO`)
- [ ] Correo real en `src/pages/Contacto.tsx`
- [ ] Confirmar dimensiones y tipos de mármol con el cliente (son placeholders)
- [ ] Fotos reales de las piezas → bucket `productos` (las texturas SVG se reemplazan solas)
- [ ] Logo `logo-ka.png` en `/public` (favicon + navbar)
- [ ] Dominio en Vercel

## Estructura

- `/` Home — hero con veta animada + destacados
- `/coleccion` — grid con filtros por categoría
- `/coleccion/:slug` — detalle con specs y CTA de cotización
- `/nosotros`, `/contacto`

## Workflow (igual que Alegría)

- **Claude Code** para cambios de UI/componentes
- **Scripts de terminal (heredoc)** para operaciones de Supabase/data/buckets
- Verificar en `localhost:3001` antes de commitear; commits siempre explícitos
