---
name: McGill Institute Australia — Parramatta Transit (OLED redesign)
description: An OLED-black / off-white, strictly alternating light-dark system built around a full-screen photo hero slider and the existing transit-rail signature motif. Replaces the indigo/paper "Parramatta Transit" palette; the transit-rail motif, course-catalogue structure, and all real content/facts carry forward unchanged.
colors:
  oled: "#0B0F17"
  oled-deep: "#0A0A0C"
  oled-card: "#12161F"
  oled-line: "rgba(255,255,255,0.08)"
  off-white: "#F8F9FA"
  card: "#FFFFFF"
  charcoal: "#0F172A"
  white: "#FFFFFF"
  ice: "#E2E8F0"
  amber: "#E8A33D"
  amber-deep: "#C8841F"
  coral: "#B23A1E"
  coral-deep: "#5C1F11"
  coral-bright: "#C73F22"
  coral-text-light: "#B23A1E"
  coral-text-dark: "#FF7A57"
  line: "#E1E4E8"
  muted: "#5B5E72"
  muted-light: "#9CA0BE"
  tag-engineering-bg: "#DEEFF6"
  tag-engineering-text: "#0F3A57"
  tag-hospitality-bg: "#FCEAD1"
  tag-hospitality-text: "#6B4610"
  tag-business-bg: "#E6F3F5"
  tag-business-text: "#16424A"
  tag-management-bg: "#E3E8F0"
  tag-management-text: "#142C50"
  tag-english-bg: "#F3E6D8"
  tag-english-text: "#6B4229"
typography:
  display:
    fontFamily: "Newsreader, serif"
    fontWeight: 700
  body:
    fontFamily: "IBM Plex Sans, sans-serif"
    fontWeight: 400
    lineHeight: 1.65
  data:
    fontFamily: "IBM Plex Sans, sans-serif"
    fontWeight: 700
    letterSpacing: "0.04em"
    fontVariantNumeric: "tabular-nums"
rounded:
  card: "18px"
  modal: "20px"
  feature-panel: "24px"
  input: "10px"
  pill: "999px"
  focus: "6px"
---

# Design System: McGill Institute Australia — OLED redesign of "Parramatta Transit"

## Overview (2026-10-22, full visual-system redesign)

A client brief asked for a full HTML/CSS/JS rebuild into an "award-worthy" experience: a full-screen photo hero slider, strict alternating OLED-black/off-white sections, a glassmorphic floating nav, magnetic CTA buttons with a cursor light-flare, 3D-tilt cards, an asymmetrical Bento grid, and scroll-driven reveals. Per the Impeccable redesign workflow, this **replaces** the prior "Parramatta Transit" indigo/paper palette and its `prefers-color-scheme` + manual toggle dark mode — but keeps the transit-rail signature motif, the course catalogue/filter/search/quote-tool functionality, the real contact and registration facts, the legal modals, the Google Maps embed, and every other piece of product truth untouched. See DECISIONS.md for the full reasoning, including the cross-project JobGen.ai clarification and the toggle-removal trade-off.

## Colors

### Fixed OLED / off-white surfaces, not a reactive dark mode
The prior system toggled the *whole site* between light and dark via `prefers-color-scheme` and a manual button. This brief asks for the opposite: **every section is permanently either dark or light**, alternating down the page, so the "theme" is a layout decision, not a user preference. The two can't coexist (a global toggle would have to invert the fixed alternation), so the toggle was retired. Two fixed, non-reactive utility classes now carry the whole system:

```css
.tone-dark  { --bg: var(--oled); --surface: var(--oled-card); --text: var(--white); --text-muted: var(--ice); --border: var(--oled-line); --coral-text: var(--coral-text-dark); }
.tone-light { --bg: var(--off-white); --surface: var(--card); --text: var(--charcoal); --text-muted: var(--muted); --border: var(--line); --coral-text: var(--coral-text-light); }
```

Applied directly to each `<section>`, so every component inside (cards, chips, forms, tags) reads `var(--bg)/--surface/--text/--text-muted/--border/--coral-text` and never needs to know which tone it's in. The Hero is dark too, but hard-coded (not `.tone-dark`) since its content sits on a video, not a flat fill, and every element inside is given an explicit light color rather than reading the tone tokens.

### Section sequence
Hero (dark, video) → Streams (light) → Courses (dark) → Why McGill (light) → Student Life (dark) → Pathway (light) → Agents (dark) → Campus (light) → FAQ (dark) → Enquiry (light) → Footer (dark, fixed). No two full sections in a row share a tone — 9 content sections between the two fixed-dark anchors (Hero, Footer) is an odd count, so straightforward alternation (light, dark, light, ...) lands correctly on both ends with no accent-bar buffer needed.

**Removed 2026-10-25:** the Trust Strip (a thin dark `RTO/CRICOS/ABN/address` accent bar that previously sat directly under the Hero) was removed at the client's request, along with the hero's own top badge row (the same RTO/CRICOS/PARRAMATTA line, plus the "Not affiliated with McGill University, Canada." disclaimer). Verified before removing: both facts remain clearly, persistently visible elsewhere — the site header's brand mark shows "RTO 45906 · Parramatta NSW" on every page view (it's `position: fixed`, so it never scrolls away), the footer carries the full `RTO 45906 · CRICOS 03678G · ABN 91 835 873 060` line, and the "not affiliated with McGill University Canada" disclaimer is also stated in the FAQ and the legal/footer text. This was a decluttering of two redundant instances, not a removal of the underlying disclosure, which a real CRICOS/RTO provider's marketing materials need to carry somewhere.

### Coral family (unchanged roles, now also carrying a Bento feature-tile background)
- **`--coral`** (#B23A1E, fixed): background fills with white text — primary buttons, the skip link, hover-fills. Also used as the start of the Why McGill Bento tile's gradient.
- **`--coral-deep`** (#5C1F11, fixed): hover-darken state; also the Bento tile gradient's end stop.
- **`--coral-bright`** (#C73F22, fixed): decorative fills (card corner-cuts, dots) and the hero's large italic-weight `<em>` emphasis — verified 3.8:1 against the hero's dark backdrop, which clears WCAG's 3:1 **large-text** threshold (the hero headline is 40–88px, bold).
- **`--coral-text`** (theme-reactive via `.tone-dark`/`.tone-light`): every standalone coral text/icon/border use within a toned section.

### Known theoretical-only contrast pairs (do not chase further)
The mechanical detector checks every distinct text color against every distinct background used anywhere on the page, not just pairs that actually render together. Two such theoretical pairs remain after this round's fixes and are *not* real on-page defects:
- `--coral-bright` as text against `--coral-deep`/`--oled`/the hero scrim gradient as background: coral-bright is never rendered as text on a coral-deep fill anywhere, and its one real text usage (hero `<em>`) is large text (40–88px, bold), which only needs 3:1 and clears it at 3.8–3.9:1.
- `--charcoal` (light-mode text) against `--oled-deep` (the Footer background): both are real tokens, but they never co-occur — every element on an `--oled-deep` background is given an explicit white/`--white`/`--muted-light` color, never `var(--text)`. Darkening either token further isn't meaningful (both are already near-black), so unlike the original "Parramatta Transit" coral-deep fix, there is no unconditional close available here; this is accepted as a structural artifact of having two non-overlapping color systems on one page by design.

**Unresolved after investigation — a detector artifact, not a located defect:** three low-contrast findings report white/near-white hero text (disclaimer, lede, scroll-cue) against a background of `#76787D`, a value that doesn't match any token in this file and that persisted across every change made to the hero's own gradients, so it isn't simply "the gradient's darkest stop." Two real, independent legibility mitigations were added regardless (a `text-shadow` on every hero text element, and a second dedicated scrim gradient on `#hero-content` itself, layered on top of each slide's own `::after` darkening), which cover the actual risk this class of finding is pointing at — a photo behind white text can be lighter than the gradient alone guarantees — regardless of whether they move this specific static heuristic's number. Flag for a follow-up with the detector's own output showing a source line/selector if it recurs after a tool update.

One **real** bug this pairing check did catch and that was fixed: the Hero's second CTA ("Explore Courses") was a `.btn-outline`, which reads `color: var(--text)` — correct inside a `.tone-dark`/`.tone-light` section, but the Hero isn't one (it's dark via hardcoded photo/gradient styling, not the tone-class system), so the button silently inherited the root light-mode charcoal text color onto a dark photo. Fixed by switching it to `.btn-ghost-inverse`, the component already built for outline buttons on dark/photo sections (same one the Agents section's "Enquire as an Agent" button uses).

## Shadows

Decorative elevation shadows (the glass header's `rgba(0,0,0,0.4)`, card hovers' `rgba(15,17,30,0.35)`, modal backdrops' `rgba(10,10,12,0.6)`) are neutral-black at varying opacity, scoped to `box-shadow`/backdrop fills only — not text/surface colors, so not part of the swatch list above.

## Typography

Unchanged from the prior round: Newsreader (display) + IBM Plex Sans (body/data), two families, data/code values signaled via weight + tracking + tabular-nums rather than a third face. See the prior system's reasoning, still valid.

## Signature element: the transit rail

Unchanged — the horizontal rail (Educational Streams filter) and vertical rail (How-to-Enrol pathway) carry forward exactly as before.

## New this round

### Hero: full-screen photo slider
Three slides (`photos/hero.jpg`, `photos/hero-slide-2.jpg`, `photos/hero-slide-3.jpg` — the latter two reuse the already-verified welder and business-meeting Unsplash photos at 1920×1080, see DECISIONS.md), cross-fading via an `.is-active` opacity toggle (not a scroll-snap carousel, so it can autoplay). A bottom-anchored gradient (`rgba(0,0,0,0.85)` at the text zone, fading to transparent) keeps the headline legible regardless of which photo is active; headline/lede/scroll-cue also carry a `text-shadow` as a second, photo-content-independent legibility layer. Pagination is three Instagram-stories-style progress bars (completed bars fill solid, the active bar fills over 6s via a CSS animation, replayed on every manual or automatic advance). Autoplay pauses on hover, advances on click of a bar, and responds to touch swipe and mouse drag (50px threshold). Headline/disclaimer/lede/CTAs stagger in via a `.kinetic-play` class toggled (with a forced reflow) on every slide change, skipped entirely under `prefers-reduced-motion`.

### Magnetic CTA buttons
Every `.btn-primary` gets a cursor-tracking `radial-gradient` flare (via `--mx`/`--my` custom properties set on `mousemove`) and a small pull toward the cursor (`translate()`, capped at ±7px/±5px), attached only under `(hover: hover) and (pointer: fine)` and only when `prefers-reduced-motion` is off. Without that match, buttons keep their plain `:hover` lift — no degraded experience on touch.

### 3D-tilt cards
Course cards and the four Why-McGill tiles get a `perspective`/`rotateX`/`rotateY` tilt following the cursor (±8°) plus a coral ring-glow, under the same fine-pointer/no-reduced-motion guard. Course cards are built by JS from the `COURSES` array, so the tilt listener is attached in a second pass right after the grid is populated.

### Why McGill: asymmetrical Bento grid

**Superseded 2026-10-22 by an L-shaped staggered layout** (see immediately below) — this paragraph is kept for history only; the 4-col/2×2+2×1+1×1+1×1 composition it describes is no longer what ships.

Four reasons become a 4-column/2-row Bento layout at ≥760px: the first ("Nationally registered training") is the featured 2×2 tile with a coral gradient fill, the second is a 2×1 wide tile, the remaining two are 1×1. Stacks to a single column below 760px. This is the one substantive layout change here — the reasons themselves are the same four facts, just re-weighted visually to highlight the single most load-bearing trust claim (RTO registration) rather than giving all four equal visual weight.

### Why McGill: staggered L-shaped grid (2026-10-22 update)

Replaced the 2×2+2×1+1×1+1×1 Bento composition above with a 3-column/2-row asymmetric layout at ≥760px: tile 1 ("Nationally registered training") spans both rows as a tall featured column on the left; tile 2 ("CRICOS-registered...") is a horizontal tile spanning the remaining two columns across the top; tiles 3 and 4 sit side by side underneath it. Stacks to a single column below 760px, same as before. Copy, facts, and the `tilt-card`/`.reveal` interactions are unchanged — this is a layout/visual pass only, per a client brief asking for a "staggered, asymmetric 4-card grid" with glassmorphism and glowing details.

New in this pass:
- **`#why::before` blueprint-grid texture**: a faint two-axis hairline grid (`var(--border)` at the section's existing line color, 48px cells), radial-masked so it fades out toward the section edges rather than tiling uniformly edge to edge. Grounded as a drafting/blueprint motif (apt for an Engineering/Fabrication-trade institute) per Impeccable's rule that a two-axis grid overlay needs an actual canvas/blueprint reason, not bare decoration — flagged `advisory` by the detector as a known generated-UI pattern, kept deliberately for this reason and disclosed to the client rather than silently removed.
- **`.why-badge` / `.why-badge--tint`**: a small glass-pill badge (`RTO 45906` on tile 1, `CRICOS 03678G` on tile 2) — `backdrop-filter: blur(8px)` plus a translucent fill and a soft coral-bright glow (`box-shadow`, using the existing `--coral-bright` token, not a new literal). White-glass variant for tile 1 (on the coral gradient) carries a `text-shadow` as a contrast safety margin, the same defensive pattern already used on the hero's photo-backed text, since blended translucent-white-on-coral at this badge's small font size sits close to the 4.5:1 floor on paper.
- **Per-tile authored SVG motifs** (all hand-drawn geometry, not photos or emoji, per the craft floor's illustration rule): an official-seal ring-and-tick-mark mark faded into tile 1's background (`.why-card-seal`, 14% opacity, bleeding off the top-right corner, clipped by the card's own `overflow:hidden`); a line-art globe with a dashed flight path for tile 2 (`.why-card-art--globe`); a root-node-to-five-leaves branch diagram for tile 3, directly symbolic of "five streams, one campus" (`.why-card-art--branch`); a two-tone (coral/amber) map pin for tile 4 (`.why-card-art--pin`).
- **`.why-learn-more`** on tile 1 only: a real link (not decorative), `href="#faq-rto"`, deep-linking to the existing "What do RTO 45906 and CRICOS 03678G mean?" FAQ answer. A small `hashchange`/on-load JS handler auto-opens that `<details>` so the link's promise ("learn more") is actually kept, not just a scroll. Required adding `id="faq-rto"` to that FAQ item and `scroll-margin-top` to `.faq-item` so the deep link doesn't land the answer under the fixed header.

### Footer
Unchanged content (RTO/CRICOS/ABN, the real legal entity, phone, email, legal-policy modals) under the existing OLED-deep dark fill — already matches the brief's "executive minimalist dark footer" intent. The brief's "Powered by JobGen.ai" badge is a confirmed-real fact for a *different* project (Mountain Culture Guitar Lessons) and was not carried over here — see DECISIONS.md.

### Removed
The `prefers-color-scheme` + manual `data-theme` toggle (button markup, CSS, and `applyTheme`/`systemPrefersDark`/`currentTheme` JS) — superseded by the fixed per-section tone classes above.

## Do's and Don'ts

### Do:
- Do apply `.tone-dark`/`.tone-light` to any new `<section>` — never hardcode a section background outside those two classes (Hero/Trust-strip/Footer are the only sanctioned exceptions, and each hardcodes *every* child's text color explicitly rather than relying on `var(--text)`).
- Do keep `--coral-text` (not `--coral`) for standalone text/icon color inside a toned section.
- Do attach any new pointer-driven effect (tilt, magnetic pull) behind `(hover: hover) and (pointer: fine)` and `!prefersReducedMotion`.

### Don't:
- Don't use a class that reads `var(--text)`/`var(--border)` (e.g. `.btn-outline`) inside the Hero — it doesn't define those custom properties locally, so it will silently resolve to the root light-mode values. Use `.btn-ghost-inverse` (or an explicit color) there instead.
- Don't add a global theme toggle back without removing the strict-alternation requirement first — the two are mutually exclusive by construction.
