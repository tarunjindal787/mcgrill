---
name: McGill Institute Australia — Parramatta Transit
description: A place-specific identity built around the real geometry of getting to campus (Parramatta & Harris Park stations), expressed as a signature transit-line rail motif. No stock photography; all visuals are CSS/SVG.
colors:
  paper: "#F6F4EF"
  paper-dim: "#ECE7DC"
  card: "#FFFFFF"
  ink: "#14172B"
  indigo: "#1E2A5E"
  indigo-deep: "#10173A"
  amber: "#E8A33D"
  amber-deep: "#C8841F"
  coral: "#B23A1E"
  coral-deep: "#5C1F11"
  coral-bright: "#C73F22"
  coral-text-light: "#B23A1E"
  coral-text-dark: "#FF7A57"
  line: "#D9D2C2"
  line-dark: "#2E3761"
  muted: "#5B5E72"
  muted-light: "#9CA0BE"
  bg-dim-dark: "#161D44"
  footer-dark: "#0B0E22"
  illustration-shade: "#162052"
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

# Design System: McGill Institute Australia — "Parramatta Transit"

## Overview (2026-10-21, `/loop` autonomous rebuild)

This is a full rebuild per an explicit `/loop` brief requiring three candidate design directions, a no-stock-photo constraint, and a 12-point scored rubric. It **replaces** the prior "Colourful Editorial" system (navy/ocean/gold, real Unsplash photography per course) documented further below in this file's git history — see DECISIONS.md for the full three-direction exercise and why this one ("Parramatta Transit") was chosen over the other two.

The identity is built from one real, verifiable fact unique to this brief: the campus sits a short walk from both Parramatta and Harris Park train stations. That fact becomes a **signature transit-line rail** — a line with station-dot stops — reused in two different sections (Educational Streams, and the How-to-Enrol pathway) rather than being a one-off decoration.

## Colors

### Roles, not just hex values
Three roles share the "coral" family, each solving a different contrast problem (the same two-surface trap this project already hit once with its prior cyan/gold accent — bright accent colors frequently fail as text on one of the two surfaces they need to work on):

- **`--coral` (#B23A1E, fixed, not theme-reactive):** background fills with white text on top only — primary buttons, the skip link, hover-fills. Verified 5.97:1 (white on it).
- **`--coral-deep` (#5C1F11, fixed):** the hover-darken state of coral backgrounds, white text 12.7:1. Deepened from an earlier #93301A specifically so that *even the dark-mode `--coral-text` value* (#FF7A57) would pass 4.5:1 against it (4.93:1) — the Impeccable Stop-hook deep pass flagged that theoretical pairing even though no rule actually renders coral-text on this background; rather than chase down whether the pairing was real, darkening coral-deep closes the gap unconditionally.
- **`--coral-bright` (#C73F22, fixed):** decorative fills only (card corner cuts, SVG accents) — tuned so that even if text ever lands on it, it clears 5:1 with white.
- **`--coral-text` (theme-reactive: `--coral-text-light` #B23A1E in light mode / `--coral-text-dark` #FF7A57 in dark mode):** every place coral is used as standalone *text, icon, or accent border* sitting on the page's own `--bg`/`--surface` (section eyebrows, the hero's italic emphasis, rail-dot icons, the "why" numerals, required-field asterisks, placeholder chips). The light-mode value measures 5.43:1 on paper; the dark-mode value measures 6.78:1 on indigo-deep and 5.28:1 on indigo. **Never use the fixed `--coral` as text color on a theme-reactive background** — it fails badly in dark mode (as low as 2.3:1), which the Impeccable detector caught on the first build pass of this round.
- **Amber** (`#E8A33D` / deep `#C8841F`): a secondary highlight only, used on the dark Agents band (icon accents) — never as text on a light surface (same "needs a dark or filled surface" rule the prior design system used, carried forward because it's a correct rule, not a coincidence).

### Neutrals
- **Paper** (#F6F4EF) / **Paper Dim** (#ECE7DC): light-mode backgrounds, warm off-white rather than stark white.
- **Ink** (#14172B): light-mode text; also the trust-strip/agents-band/footer fill in light mode.
- **Indigo** (#1E2A5E) / **Indigo Deep** (#10173A): dark-mode surfaces and page background.
- **Muted** (#5B5E72) / **Muted Light** (#9CA0BE): secondary text, light and dark mode respectively.

## Typography

**Exactly two type families**, per the rubric's explicit cap: **Display:** Newsreader (variable serif, optical-size range) for headings — chosen after the Impeccable detector flagged the original pick, Fraunces, as one of a handful of fonts (alongside Inter, Roboto, Plus Jakarta Sans, Space Grotesk, Geist) that have become an "AI-generated UI" tell through overuse. Newsreader gives a similar warm, editorial-serif character with real optical-size personality without that association (yet). **Body:** IBM Plex Sans — an engineered, technical-humanist face that subtly reinforces "vocational/technical institute."

**Registration numbers and course codes** (RTO/CRICOS/ABN, `MEM31922`, etc.) do **not** get a third typeface. Iteration 1 used IBM Plex Mono for these, reasoning that a monospace "data face" is a functional convention rather than a stylistic one — but iteration 2 resolved this more cleanly by dropping the mono face entirely and signaling "this is verified data" within IBM Plex Sans itself: heavier weight (600–700), wider letter-spacing (0.02–0.06em), `font-variant-numeric: tabular-nums` so digits align in columns, and uppercase on course codes. Same visual distinctiveness, zero ambiguity against the two-family rule.

## Category tags

Each discipline gets a small, restrained tint pill on course cards — reusing the same verified pairs the prior design system established (they were already correct, just needed documenting against this round's fresh DESIGN.md):

| Stream | Background | Text | Contrast |
|---|---|---|---|
| Engineering | #DEEFF6 | #0F3A57 | 10.1:1 |
| Hospitality | #FCEAD1 | #6B4610 | 7.1:1 |
| Business | #E6F3F5 | #16424A | 9.7:1 |
| Management | #E3E8F0 | #142C50 | 11.3:1 |
| English | #F3E6D8 | #6B4229 | 7.0:1 |

## Signature element: the transit rail

A horizontal line with five station-dot stops in the Educational Streams section (each stop is a clickable stream filter — real functionality, not decoration — that both filters the course grid below and scrolls to it), and a vertical version with five numbered stops in the How-to-Enrol pathway section. Reusing the same visual grammar for two structurally different purposes (a filter, and a step sequence) is what makes it a system element rather than a one-off graphic.

Course cards get a diagonal cut top-right corner (`clip-path`) filled with `--coral-bright`, echoing a ticket/boarding-pass shape, extending the "journey" metaphor into the course catalogue itself.

## Decorative illustration palette

The hero, student-life, and agents SVG illustrations use a small set of deeper indigo shades purely for internal shading/depth (e.g. `#162052`, `#243270`, `#2A3680`) — these are not text or UI colors and are scoped to inline SVG fills only, never reused as a background or text token.

## Imagery

**Updated 2026-10-21 (later the same day):** the original `/loop` brief banned stock photography; a direct follow-up request explicitly asked for "many photos." Rather than scrape the real mcgill.edu.au (copyright risk, and the exact thing the original brief said not to copy) or AI-generate fake "students"/"campus" images for a real, CRICOS-registered institution (a materially different risk than decorative stock photography — prospective students make real enrolment and visa decisions based on this material), the resolution — confirmed with the user — was **properly licensed stock photography** (Unsplash License, free tier), used purely as generic illustrative imagery, exactly as an earlier round of this same project already did successfully.

Ten photos, each sourced, verified live (HTTP 200, confirmed free-tier not Unsplash+), and visually inspected before use — see the full list and alt text in DECISIONS.md. None are captioned or alt-texted as if they depict McGill's actual campus, staff, or students. Two early candidates were rejected during sourcing specifically for looking like a *specific, recognisable* real place (a Collegiate-Gothic archway with a statue, and San Francisco's Transamerica Pyramid with its cable-car tracks) — using either would have risked viewers mistaking this small Parramatta CBD institute for a different, grander, or foreign institution.

The Campus & Location section's map still uses a placeholder, not a stock photo of "the building" — that's the one claim ("this is literally our premises") a generic photo can't honestly stand in for. The Student Life section's photo is deliberately generic (friends at a café) rather than claimed to be Parramatta specifically, since Unsplash's own location tagging for "Parramatta" turned out to be unreliable (mostly Perth/Melbourne/generic results) and a specific misattributed-location caption would itself be dishonest.

## Dark mode

Implemented with `prefers-color-scheme` plus a `data-theme` attribute override (the manual toggle button), following the three-state pattern: an un-stamped root respects system preference, an explicit `data-theme="light"`/`"dark"` always wins. The toggle is **not persisted** (no localStorage/sessionStorage, per the brief's explicit ban) — it resets to system preference on reload.

## Do's and Don'ts

### Do:
- Do keep `--coral-text` (not `--coral`) for any new standalone text/icon color — it's the only coral role that's theme-reactive and safe on both surfaces.
- Do keep the transit-rail motif reserved for sequences/journeys (streams, pathway) — don't decorate unrelated sections with it just because it's the signature element.
- Do keep amber off light-background text; it only works as an icon/accent on dark surfaces.
- Do keep every course fact (fees, duration, intake) as an explicit "On enquiry" / "To be confirmed" placeholder — never a number.

### Don't:
- Don't use `--coral` (the fixed, button-fill value) as a text color on `--bg`/`--surface` — it fails contrast in dark mode.
- Don't add a stock photo; every visual slot here is either CSS/SVG or an explicitly labelled placeholder.
- Don't exceed roughly one em-dash per 500 characters of body copy — the Impeccable detector flags saturation as an AI-cadence tell, and this build was trimmed from 16 to 6 for that reason during its first pass.
