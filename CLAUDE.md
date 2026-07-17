# K+A Mármoles

Luxury marble furniture site.

## Stack
- React + Vite + TypeScript
- Dev server runs on **port 3001**

## Design tokens
Defined in `src/styles/global.css`. **Never change these without asking first.**
- Black: `#0C0C0C`
- Bone: `#F5F2EC`
- Brass gold: `#C8A55A`
- Display font: **Marcellus**
- Body font: **Archivo**

## Data
- Product data lives in `src/data/productos.ts`.
- A Supabase hook exists but is **not connected yet**.

## Product photos
- Located in `public/productos/`.
- Current images are low-res placeholders from Construex. The client will replace them with real photos using the **same filenames** — keep filenames stable.

## Scope & workflow
- **Claude Code handles UI/component changes only.** Supabase/data/bucket operations are done via terminal heredoc scripts outside Claude Code.
- Verify changes on **localhost:3001** before committing.
- **Commit only when explicitly requested.**

## Known placeholders
- WhatsApp number in `src/components/WhatsAppButton.tsx` is a placeholder (`52XXXXXXXXXX`).
