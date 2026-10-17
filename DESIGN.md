---
name: McGill Institute Australia
description: A colourful, editorial education site built around a verified registration (RTO/CRICOS/ABN) and genuinely distinct, vibrant photography per course.
colors:
  offwhite: "#F7F8FA"
  aqua: "#E6F3F5"
  card-white: "#FFFFFF"
  navy: "#142C50"
  navyDeep: "#0C1D38"
  ocean: "#147DAD"
  oceanDeep: "#0F5F85"
  gold: "#F2A93B"
  goldDeep: "#D98F1F"
  muted: "#49566B"
  muted-light: "#5B6B82"
  line: "#E1E6EC"
  tag-engineering-bg: "#DEEFF6"
  tag-engineering-text: "#0F3A57"
  tag-hospitality-bg: "#FCEAD1"
  tag-hospitality-text: "#6B4610"
  tag-business-bg: "#E6F3F5"
  tag-business-text: "#16424A"
  tag-management-bg: "#E3E8F0"
  tag-management-text: "#142C50"
typography:
  display:
    fontFamily: "Plus Jakarta Sans, sans-serif"
    fontWeight: 800
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Inter, sans-serif"
    fontWeight: 400
    lineHeight: 1.65
  nav-and-buttons:
    fontFamily: "Inter, sans-serif"
    fontWeight: 600
  registration-data:
    fontFamily: "Space Mono, monospace"
    letterSpacing: "0.06em"
rounded:
  card: "16px"
  pill: "9999px"
  focus-ring: "4px"
spacing:
  sm: "16px"
  md: "32px"
  lg: "56px"
components:
  button-primary:
    backgroundColor: "{colors.ocean}"
    textColor: "#FFFFFF"
    rounded: "{rounded.pill}"
    padding: "16px 36px"
  course-card:
    backgroundColor: "{colors.card-white}"
    textColor: "{colors.navy}"
    rounded: "{rounded.card}"
    shadow: true
---

# Design System: McGill Institute Australia

## Overview — Revision 2 (2026-10-17): "Colourful Editorial"

**This is the second palette/typography revision of the day.** The first revision (documented in git history) moved the site from a cream/seal-red institutional-ledger look to a navy/off-white/teal system. This client brief asked to go further: study the real mcgill.edu.au for factual/branding reference, make the site "colourful," "human," "premium," and "editorial," retire the cold bureaucratic "ledger/plate" motif, and bring in real, vibrant, naturally lit photography. This revision does that. It does **not** copy the official site's visual design — the official site's actual accent is a burnt-orange/rust (~#e95912) — the client explicitly specified the navy/ocean/gold palette below as the target, using the official site only for facts and as evidence of what NOT to just re-skin. The institutional-ledger structural ideas (crosshair marks, numbered "plates," duotone-filtered imagery) are retired this round in favor of a warmer, full-colour, rounded-corner editorial system that is deliberately less bureaucratic and more human.

**What's verified vs. the live mcgill.edu.au (fetched this session, cross-checked across two independent fetches of the homepage and the courses page):**
- CRICOS provider number: **03678G** (previously only "CRICOS provider" with no number was recorded).
- ABN: **91 835 873 060**.
- Qualification codes: MEM31922 (Cert III Engineering – Fabrication Trade), SIT40521 (Cert IV Kitchen Management), SIT50422 (Diploma of Hospitality Management), BSB40120 (Cert IV Business), BSB50120 (Diploma of Business), BSB80120 (Graduate Diploma of Management (Learning) — note the official title includes "(Learning)", now corrected here). General English has no code on the official site either — not fabricated here.
- These were obtained via automated page fetches against the live public site (not a human legal check of the national training register) — treat as high-confidence, not notarized certainty, and verify against the client before using in any binding/compliance context.
- The official site's actual imagery was **not** scraped or re-hosted here — reusing another live business's proprietary photography without a clear license is a real copyright risk, and the client's own brief allows "properly licensed photography" as the fallback. All photography here is sourced under the Unsplash License (free tier only, not Unsplash+), verified live (HTTP 200) at publish time, and visually inspected for authenticity, color, and relevance before use.

## Colors

### Core
- **Off-white** (#F7F8FA): primary page background.
- **Aqua** (#E6F3F5): a secondary light tint used for alternating section backgrounds ("Why McGill," "Brochure") so the page isn't uniformly white — not a repeat of off-white.
- **Navy** (#142C50): primary text color, and the fill for dark sections (registration strip, Agents band, footer).
- **Ocean** (#147DAD) / **Ocean Deep** (#0F5F85, hover): the one interactive accent — every CTA, link-on-hover, and primary icon tint. Measured 4.60:1 (white text on Ocean) and 4.33:1 (Ocean text on off-white) — both clear AA for normal text; Ocean-on-Navy only reaches 3.03:1, so Ocean is never used as small text or an icon color on Navy backgrounds (see Named Rules).
- **Gold** (#F2A93B) / **Gold Deep** (#D98F1F, hover): a secondary highlight, not a second CTA color. Gold text measures a failing 1.88–2.00:1 against off-white/white — it must never be used as text on light backgrounds. It measures 6.98:1 against Navy, so it is used as: (a) small accent icons on Navy/dark sections, (b) a filled chip/button background with Navy text on top (6.98:1), never as colored text on a light surface.
- **Muted** (#49566B) / **Muted Light** (#5B6B82): secondary text, both 5:1+ against off-white/white.

### Named Rules
**The One-CTA-Color Rule.** Ocean is the only color that means "click this" — every primary/secondary button and every interactive text link uses it. Gold is reserved for highlight/authentication accents (icons, chips, the Agents section's secondary button) so it never competes with Ocean for "what's clickable."

**The Gold-Needs-a-Dark-or-Filled-Surface Rule.** Gold fails AA as text on any light surface (1.88–2.00:1). Only use it as: an icon on Navy, a filled pill/button with Navy text on it, or a border/underline (non-text decorative use). Never as a text color on off-white, aqua, or white.

**The Category-Tint Rule.** Each discipline's filter pill and card tag use a small, restrained tint (`.tag-engineering`, `.tag-hospitality`, `.tag-business`, `.tag-management`, `.tag-english`) built from the core palette, each with Navy-family text for contrast — satisfies "use colour to distinguish categories" without inventing new hues outside the five-color brief.

## Typography

**Display:** Plus Jakarta Sans, 600–800 weight, headings only. **Body:** Inter, 400–500. **Nav/buttons:** Inter, 500–600. **Registration/code data:** Space Mono — now reserved specifically for the verified qualification codes (e.g. `BSB50120`) and the RTO/CRICOS numbers, not for a whole "registry voice" layer the way the previous revision used it.

Responsive scale via CSS `clamp()` (not just Tailwind breakpoint classes), defined as custom properties in `<style>`:
- `--fs-hero`: clamp(2.5rem, 1.55rem + 3.6vw, 4.5rem) — ~40px mobile to 72px desktop.
- `--fs-section`: clamp(2rem, 1.55rem + 1.8vw, 3rem) — 32px to 48px.
- `--fs-course-title`: clamp(1.25rem, 1.15rem + 0.4vw, 1.5rem) — 20px to 24px.
- `--fs-body`: clamp(1rem, 0.95rem + 0.2vw, 1.125rem) — 16px to 18px.

## Layout & Components

### Hero
A real, full-colour photograph (diverse students collaborating around a laptop in a bright lecture room) now carries the hero visually, replacing the previous abstract SVG-only treatment — per the brief's explicit "do not use generic gradients/graphics as a replacement for real imagery." The registration seal survives as a small circular badge overlapping the photo's corner (like a stamp on a credential), not as the hero's main visual.

### Course Cards (redesigned)
Rounded-corner (16px), full-colour photographic cards (no duotone filter) with: a category tag chip (color-tinted per discipline), the verified qualification code in Space Mono, the official qualification title in Plus Jakarta Sans, a concise Inter description, and a per-course "Enquire about this course" action threading the course title **and code** into the shared enquiry modal. Hover: gentle lift + 1.07x image zoom, both guarded under `prefers-reduced-motion`.

| Discipline | Course | Code | Photo (Unsplash, free license) |
|---|---|---|---|
| Engineering | Cert III – Fabrication Trade | MEM31922 | `photo-1776159904891-e7b213b8198f` (welder, vivid blue sparks, bright workshop) |
| Hospitality | Cert IV Kitchen Management | SIT40521 | `photo-1790156591339-cfe16da8e4b6` (chef, colourful teal-and-wood kitchen) |
| Hospitality | Diploma of Hospitality Mgmt | SIT50422 | `photo-1566670735914-b2038696981d` (waiter serving a colourful plate, bright outdoor café) |
| Business | Cert IV Business | BSB40120 | `photo-1517048676732-d65bc937f952` (colleagues taking notes, warm natural light) |
| Business | Diploma of Business | BSB50120 | `photo-1758691736483-5f600b509962` (presenter with colourful bar chart, bright office) |
| Management | Grad Dip of Management (Learning) | BSB80120 | `photo-1758518730037-a16581a040e8` (strategy discussion, bright glass office) |
| English | General English Programs | — (none on official site) | `photo-1758270704524-596810e891b5` (smiling adult student, bright lecture hall) |

**A correction, not a style note:** the previous revision's English-course photo (`photo-1567057420215-0afa9aa9253a`) was discovered this round to actually depict young African primary-school children in school uniforms — completely wrong subject matter for an adult Australian vocational institute's English program, and exactly the kind of "unrelated photograph" the brief warns against. It has been replaced.

### Why McGill / Student Experience / Agents
Three distinct layouts instead of three copies of the same card grid, per the brief's "avoid placing identical card grids in every section": an editorial image-+-icon-list split (Why McGill, on an Aqua tint background), a photo-+-copy split (Student Experience, white background), and a dark Navy band with a gold CTA (Agents) — giving the page the "balanced light, coloured and dark sections" rhythm the brief asked for, instead of an all-white page.

## Revision 3 (2026-10-17): Structure & Clarity Pass

Added three sections that previously didn't stand on their own: **About** (`#about` — narrative + a verified facts panel, includes an explicit "not to be confused with McGill University in Canada" line), **Educational Streams** (`#streams` — five clickable tiles, each applying the matching course-discipline filter and scrolling to `#courses`; real navigation, not decoration), and **Campus & Location** (`#campus` — a genuine Google Maps embed of the real address plus a "Get directions" link, `target="_blank" rel="noopener noreferrer"`). Hero headline changed to the client-specified "Quality Education. Better Career Pathways." Fixed a responsive risk: adding a 6th desktop nav link made the header tight at exactly the 1024px breakpoint, so the phone number now only shows at `xl` (1280px+), with just the Enquire Now button visible from `lg` to `xl`. Also reworded one course photo's alt text ("university lecture hall" → "college lecture hall") since this institute is unrelated to McGill University (Canada) and the alt text shouldn't accidentally reinforce that association. `html`'s `scroll-smooth` and the new `goToStream()` JS scroll now both check `prefers-reduced-motion` before animating.

## Do's and Don'ts

### Do:
- Do keep Ocean as the only "this is clickable" color.
- Do keep Gold off light-background text; use it only on Navy or as a filled chip/button background.
- Do keep every course card's photo distinct — verify by eye, not just by filename, before reusing any stock photo (see the English-photo correction above).
- Do verify facts (CRICOS number, ABN, qualification codes) against the real official site before stating them, and disclose the verification method's limits rather than overclaiming certainty.
- Do use "Enquire Now" (not "Apply Now") — there is still no real application pathway, only the enquiry modal/form.

### Don't:
- Don't re-host or hotlink the official McGill site's own proprietary photography without a confirmed license — use properly licensed stock instead, as the brief's own fallback allows.
- Don't fabricate a qualification code for General English — the official site shows none, so neither does this one.
- Don't fabricate a working download for the Brochure or Student Handbook/Forms/Policies — route through the enquiry form, as built.
- Don't imply the contact/enquiry form delivers anywhere real — it doesn't yet.
