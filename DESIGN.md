---
name: K+A Mármoles
description: Atelier-level marble furniture, presented like a museum after hours
colors:
  negro-sala: "#0C0C0C"
  carbon: "#161615"
  hueso: "#F5F2EC"
  laton: "#C8A55A"
  gris-veta: "#8A8A86"
  linea: "#F5F2EC1F"
typography:
  display:
    fontFamily: "Marcellus, serif"
    fontSize: "clamp(52px, 9vw, 128px)"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "0.01em"
  headline:
    fontFamily: "Marcellus, serif"
    fontSize: "clamp(32px, 4.5vw, 54px)"
    fontWeight: 400
    lineHeight: 1.1
  title:
    fontFamily: "Marcellus, serif"
    fontSize: "24px"
    fontWeight: 400
    lineHeight: 1.1
  body:
    fontFamily: "Archivo, sans-serif"
    fontSize: "17px"
    fontWeight: 300
    lineHeight: 1.6
  label:
    fontFamily: "Archivo, sans-serif"
    fontSize: "12px"
    fontWeight: 500
    letterSpacing: "0.28em"
rounded:
  none: "0"
  pill: "999px"
spacing:
  gutter: "24px"
  card: "24px"
  header-gap: "56px"
  section: "110px"
components:
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.hueso}"
    rounded: "{rounded.none}"
    padding: "14px 32px"
  button-outline-hover:
    backgroundColor: "{colors.hueso}"
    textColor: "{colors.negro-sala}"
  button-brass:
    backgroundColor: "transparent"
    textColor: "{colors.laton}"
    rounded: "{rounded.none}"
    padding: "14px 32px"
  button-brass-hover:
    backgroundColor: "{colors.laton}"
    textColor: "{colors.negro-sala}"
  filter-chip:
    backgroundColor: "transparent"
    textColor: "{colors.gris-veta}"
    rounded: "{rounded.none}"
    padding: "10px 22px"
  filter-chip-active:
    backgroundColor: "transparent"
    textColor: "{colors.laton}"
    rounded: "{rounded.none}"
  card-product:
    backgroundColor: "{colors.negro-sala}"
    textColor: "{colors.hueso}"
    rounded: "{rounded.none}"
    padding: "0"
  card-product-hover:
    backgroundColor: "{colors.carbon}"
---

# Design System: K+A Mármoles

## 1. Overview

**Creative North Star: "El Museo de Noche"**

A museum after hours. The rooms are near-black, each piece stands under its own quiet light, the plaques are brass, the vitrines are hairline glass. The visitor whispers. Every layout decision follows from that scene: the interface is the darkened room, the marble photography is the lit object, and the UI chrome — labels, buttons, rules — behaves like engraved signage that never competes with the collection.

The system is sober, precise, and monumental. Density is low: one dominant idea per fold, generous vertical space (110px sections), and copy that stays within reading measure. Depth is optical, not simulated — light lives inside the stone imagery, never in CSS shadows. The system explicitly rejects the stone-trade look (slab grids, per-m² pricing), generic furniture e-commerce (carts, badges, price tags), rustic-artisanal warmth, template SaaS aesthetics, bright white backgrounds, and rounded cards with drop shadows. The bar: it sits next to Salvatori and Antolini without embarrassment.

**Key Characteristics:**
- Near-black galleries (#0C0C0C) with bone text and a single brass voice
- Square-cut geometry everywhere; hairline 1px borders instead of shadows
- Marcellus display serif at monumental scale over featherweight Archivo body
- Uppercase, wide-tracked labels as the "brass plaque" signage system
- The stone is the protagonist; UI recedes

## 2. Colors

A committed monochrome dark palette with one metallic accent — the room, the bone, and the brass.

### Primary
- **Latón** (#C8A55A): The brass plaque. The single accent voice — eyebrow labels, active states, the marble-variety tag on product cards, focus outlines, the quote CTA. It marks what the museum wants you to read next. Used sparingly; its rarity is its authority.

### Neutral
- **Negro Sala** (#0C0C0C): The darkened gallery room. Body background of every page. Never lightened to charcoal-gray "for softness".
- **Carbón** (#161615): The raised surface. Hover state of product cards, the CTA band, the cookie banner — one perceptible step above the room, achieved tonally, never with shadow.
- **Hueso** (#F5F2EC): Bone — the pale marble. Primary text, button borders, hover-state text. The light in the room.
- **Gris Veta** (#8A8A86): Vein gray. Secondary text: descriptions, nav resting state, metadata. Watch its contrast on Negro Sala — it passes AA at body sizes but must never be used below 13px for essential content.
- **Línea** (#F5F2EC at 12%): The hairline. Every border, divider, and vitrine edge. Always 1px.

### Named Rules
**The Brass Budget Rule.** Latón appears on well under 10% of any screen. If two adjacent elements are both brass, one of them is wrong.

**The No-White Rule.** Pure white (#FFFFFF) is prohibited. The lightest value in the system is Hueso (#F5F2EC). Bright white backgrounds are a named anti-reference; they never appear, not even in modals or form fields.

## 3. Typography

**Display Font:** Marcellus (with serif fallback)
**Body Font:** Archivo (with sans-serif fallback)

**Character:** A Roman inscription over a modern grotesque. Marcellus carries the monumental, carved-in-stone register at 400 weight only — it is never bolded. Archivo at light 300 keeps body copy airy and technical, tightening to 500 only for the uppercase label system.

### Hierarchy
- **Display** (400, clamp(52px, 9vw, 128px), 1.1): Hero headline only — one per page, maximum 12ch. The single monumental gesture.
- **Headline** (400, clamp(32px, 4.5vw, 54px), 1.1): Section headings. `text-wrap: balance` recommended.
- **Title** (400, 24px, 1.1): Product card names, process-step titles.
- **Body** (300, 15–17px, 1.6): Descriptions and prose, in Gris Veta or Hueso. Max measure 46–68ch depending on context.
- **Label** (500, 12–13px, 0.14–0.28em tracking, uppercase): The brass-plaque signage — eyebrows, nav links, buttons, marble-variety tags, footer column heads. Almost always Latón or Gris Veta.

### Named Rules
**The Carved Once Rule.** Marcellus exists in exactly one weight (400) and is never italicized, bolded, or tracked tighter than -0.01em. Stone is carved once.

## 4. Elevation

Flatness is doctrine. Depth comes only from three sources: hairline Línea borders (the vitrine glass), the one-step tonal lift from Negro Sala to Carbón (the pedestal), and the light inside the stone photography itself. There are no drop shadows on cards, buttons, or panels, and no elevation stacks. The single tolerated exception is the floating WhatsApp button (`0 8px 30px rgba(0,0,0,0.5)`), because it genuinely floats above the page. The fixed navbar separates itself with a blur backdrop and a Línea border — not a shadow.

### Named Rules
**The One Shadow Rule.** Exactly one element on the entire site may cast a shadow: the floating WhatsApp button. Anything else needing separation gets a hairline border or a Carbón background.

## 5. Components

Component character: **"placas de museo"** — quiet until touched. Hairline-bordered, letter-spaced uppercase, responding with a slow brass warm-up rather than movement. Nothing bounces, nothing scales beyond a whisper.

### Buttons
- **Shape:** Square-cut (0 radius), 1px border
- **Outline (default):** transparent with Hueso border and text, 14px 32px padding, 13px/0.16em uppercase label
- **Brass (primary CTA):** same geometry, Latón border and text — reserved for the quote action
- **Hover / Focus:** background fills with the border color, text inverts to Negro Sala, over 0.3s. Focus-visible: 1px Latón outline, 4px offset — the universal focus treatment
- **Pill variant:** cookie-banner actions only (999px radius); it does not escape the banner

### Chips (category filters)
- **Style:** transparent, 1px Línea border, Gris Veta uppercase text, 10px 22px, square-cut
- **State:** hover raises border/text toward Hueso; active turns border and text Latón (never filled)

### Cards / Containers (product cards)
- **Corner Style:** square (0)
- **Background:** Negro Sala, lifting to Carbón on hover
- **Shadow Strategy:** none — the grid's 2px Línea gaps and 1px outer border form the vitrines
- **Internal Padding:** 24px on the info block, separated from the image by a Línea hairline
- **Image:** 4:3, slow zoom on hover (scale 1.05 over 0.7s); marble variety in Latón label above the Marcellus title

### Inputs / Fields
- **Style:** square-cut, transparent background, 1px Gris Veta or Línea border (see cookie checkboxes — the only shipped input pattern)
- **Focus:** 1px Latón outline at 3–4px offset; checked state fills with a Latón mark
- **Never:** white backgrounds, rounded corners, or glow effects

### Navigation
- **Style:** fixed, blur-backdrop over Negro Sala at 85%, Línea bottom border, 72px tall
- **Typography:** 13px/0.14em uppercase Archivo; resting Gris Veta, hover/active Hueso
- **Mobile:** collapses to a bordered toggle opening a full-width Negro Sala panel

### MarbleSwatch (signature component)
Procedural SVG marble textures (feTurbulence veining, five tones: blanco, negro, travertino, verde, gris) used as the materials strip and as premium placeholders wherever a product photo is missing. Displayed oversized (320%) and cropped so the vein reads at small sizes. When real photography exists, photography always wins.

## 6. Do's and Don'ts

### Do:
- **Do** keep Negro Sala (#0C0C0C) as the body background of every page — the darkened room is the brand.
- **Do** use 1px Línea hairlines for all separation: card grids, specs tables, section borders.
- **Do** reserve Latón for what must be read next: one CTA, one label system, active states, focus rings.
- **Do** let photography carry the light; oversize it, crop it, and keep UI chrome off of it except a single overlaid headline or quote.
- **Do** respect `prefers-reduced-motion` on every animation (already global — keep it), and keep hover transitions in the 0.25–0.7s ease range.
- **Do** state real dimensions and real marble varieties on every piece — precision is the credibility.

### Don't:
- **Don't** use bright white backgrounds anywhere — a named anti-reference; Hueso is the ceiling.
- **Don't** add rounded cards with drop shadows — both square-cut geometry and the One Shadow Rule prohibit it; that's the "template SaaS look" PRODUCT.md bans.
- **Don't** drift toward the stone-distributor register: no slab grids, no per-m² pricing tables, no promo banners (Marble.com is the anti-reference).
- **Don't** add e-commerce furniture: no carts, prices, discount badges, or "buy now" — every path ends in a conversation, not a checkout.
- **Don't** go rustic-artisanal: no textured paper backgrounds, no handwritten fonts, no burlap warmth. The register is museum, not market.
- **Don't** fabricate proof — no invented testimonials, press logos, or awards, ever.
- **Don't** touch the design tokens (colors, fonts) without explicit approval — they are contractual (see CLAUDE.md).
