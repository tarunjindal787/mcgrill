---
name: McGill Institute Australia
description: An institutional-ledger landing page for a registered training organization — the real RTO/CRICOS registration is the design language, not a footer badge.
colors:
  ground: "#F8F5EC"
  groundDeep: "#EFEADB"
  card-white: "#FFFFFF"
  navy: "#13253F"
  navyDeep: "#0B1826"
  muted: "#4C5A66"
  muted-light: "#5D6B76"
  line: "#DCD5C4"
  line-mark: "#C9C0AC"
  teal: "#1F6F6B"
  teal-deep: "#164F4C"
typography:
  display:
    fontFamily: "Fraunces, Georgia, serif"
    fontWeight: 900
    letterSpacing: "-0.01em"
    textTransform: "uppercase"
  body:
    fontFamily: "Public Sans, sans-serif"
    fontWeight: 400
    lineHeight: 1.6
  registration-data:
    fontFamily: "Space Mono, monospace"
    letterSpacing: "0.1em"
    textTransform: "uppercase"
rounded:
  none: "0px"
spacing:
  sm: "16px"
  md: "32px"
  lg: "56px"
components:
  button-primary:
    backgroundColor: "{colors.teal}"
    textColor: "{colors.ground}"
    rounded: "{rounded.none}"
    padding: "16px 36px"
  plate-card:
    backgroundColor: "{colors.card-white}"
    textColor: "{colors.navy}"
    border: "1px solid {colors.line}"
    cornerMarks: true
---

# Design System: McGill Institute Australia

## Overview

**Creative North Star: "The Registration Plate"**

McGill Institute Australia is a real registered training organization (RTO 45906) and CRICOS-registered provider. Every competitor vocational-college site — including McGill's own prior site — treats that registration as a trust badge tucked in a footer. This identity refuses that: the registration itself becomes the entire visual system. The page reads like an authenticated institutional ledger — registration crosshairs, hairline rules, a literal seal bearing the real RTO number — because that is what the institution actually is, not a decorative conceit layered on top.

**Revision (2026-10-17):** The system was re-skinned from a cream/ink/seal-red ("wax-stamp") palette to a deep-navy / warm-off-white / restrained-teal palette, per the client's request for a more premium, education-sector-appropriate feel and to move away from a color that read closer to "warning/alert red" than "trust." The ledger/plate/seal structural concept — crosshair marks, numbered plates, the rotating registration seal, the mono/sans voice split — is unchanged; only the color identity and the display typeface moved. See "Named Rules" below for what's current.

**Key Characteristics:**
- A warm off-white "ledger" ground throughout, broken only by a dark navy registration strip (header) and the navy header/footer accents.
- Exactly one accent — a restrained, credential-grade teal (`#1F6F6B`) — reserved for the primary enrollment CTA and the registration seal's ring. It never appears as a decorative color elsewhere. (Official document and transcript stamps are commonly blue or teal, not exclusively red, so the "authenticating ink stamp" metaphor the seal relies on still holds with this color.)
- Course offerings are presented as numbered "plates" in a register (Plate No. 01–07), not generic cards — each framed with crosshair registration marks at two corners, like a printed plate's registration furniture. All seven plates now carry a genuinely distinct photograph (no discipline reuses another discipline's image).
- **Fraunces** (a characterful serif with real credential/diploma gravitas) carries every display headline — a deliberate departure from using one sans for both display and body, so the page reads as "institution issuing a document," not "SaaS product page." **Public Sans** remains the body voice (clear, highly readable, no personality competing with Fraunces). **Space Mono** remains the registry voice for every piece of registration data (RTO number, address, course discipline tags, plate numbers).
- The hero's registration seal (SVG, circular, crosshair-marked) rotates slowly and continuously (50s/revolution) — purely decorative dignity, like a wax seal catching light, never implying a live or updating data feed.

## Colors

One warm-white ground, one navy ink, one accent.

### Ground & Ink
- **Ground** (#F8F5EC): The page's one background color.
- **Card White** (#FFFFFF): Course-plate and feature-card surfaces.
- **Navy** (#13253F): Primary text and the header/footer registration-strip background. The institutional "ink."
- **Navy Deep** (#0B1826): Scroll-state header tint base / deepest dark surface.
- **Line Mark** (#C9C0AC): A slightly lighter, more muted gray than the structural hairline color, reserved specifically for the crosshair registration-mark ticks (`.plate-marks`).
- **Muted** (#4C5A66) / **Muted Light** (#5D6B76): Secondary text. Both measured 4.5:1+ against both Ground and Card White (6.50:1 / 5.03:1 respectively against Ground) — computed via WCAG relative-luminance math this session, since no browser contrast checker was available.

### The One Accent — Register Teal
- **Teal** (#1F6F6B) / **Teal Deep** (#164F4C, hover): The institute's one accent. Used only for the primary CTA button, the registration seal's ring, and small discipline icons on light surfaces. Never used decoratively elsewhere.

### Named Rules
**The One-Accent Rule.** Teal marks exactly two things: "take this action" (the Enquire/Submit buttons) and "this is authenticated" (the seal badge, the registration strip's implicit authority). It never becomes a generic decorative color.

**The Dark-Background Focus & Icon Rule.** Teal measures only 2.6:1 against Navy — it fails both text and non-text (icon) contrast there. Two consequences: (1) every button whose own background is `teal` or `navy` carries `.focus-ring-on-dark`, which swaps the focus outline to the ground color; (2) icons placed on the navy registration strip are set in Ground, not Teal — teal icons/text belong on light surfaces (Ground/Card) only, where Teal clears 5.4:1+.

## Typography

**Display voice:** Fraunces (headlines only) · **Institutional/body voice:** Public Sans (body copy, UI labels) · **Registry voice:** Space Mono (registration numbers, addresses, discipline tags, plate numbers)

### Named Rules
**The Three-Voice Rule.** Fraunces speaks only in display headlines (h1/h2/h3-level moments) — it is never set at body size or used for UI chrome. Public Sans carries everything else the institution "says" in its own voice: paragraphs, nav labels, button labels. Space Mono speaks as the register: RTO number, CRICOS status, addresses, "Plate No. 0X" labels, discipline tags. Mixing these — e.g. setting a paragraph in Fraunces, or registration data in Public Sans — breaks the distinction the whole direction depends on.

## Layout & Components

### The Seal
A circular SVG badge: two concentric teal rings, curved registration text along the ring (RTO number on top, CRICOS status on the bottom, set via `textPath`), a centered mark, and four crosshair corner ticks outside the circle. Rotates continuously and slowly (50s linear, `prefers-reduced-motion` respected) — decorative dignity, not a data indicator. This is a first-viewport citizen in the hero, not a footer badge.

### Photographic Plates (signature component)
Each of the seven course plates, plus the "Why McGill" panel, carries a real, distinct photograph (sourced under the Unsplash License, which permits this use without attribution — provenance for each is noted in an HTML comment above its `<img>` tag) treated with a duotone filter (`grayscale(1) contrast(1.08) brightness(1.03)`) plus a bottom navy-gradient overlay (`.plate-photo-frame`). **These are generic stock photos illustrating each discipline (a fabrication workshop, a commercial kitchen, a hotel reception desk, a business meeting, a presentation to an audience, a strategy meeting, a certificate, a student writing), not real photographs of McGill's own campus, students, or facilities** — alt text describes them generically for this reason. Replace with real campus/course photography when available.

| Plate | Course | Photo (Unsplash) |
|---|---|---|
| 01 | Cert III Engineering – Fabrication | `photo-1738162837389-3b02d6dd507b` (metal workshop) |
| 02 | Cert IV Kitchen Management | `photo-1790156591339-cfe16da8e4b6` (chef, commercial kitchen) |
| 03 | Diploma of Hospitality Management | `photo-1660557989695-14fac79c086d` (hotel reception desk) |
| 04 | Cert IV of Business | `photo-1517048676732-d65bc937f952` (business team meeting) |
| 05 | Diploma of Business | `photo-1758691736483-5f600b509962` (presenting charts to an audience) |
| 06 | Graduate Diploma of Management | `photo-1758518730037-a16581a040e8` (strategy meeting) |
| 07 | General English Programs | `photo-1567057420215-0afa9aa9253a` (student writing) |
| — | Why McGill panel | `photo-1589330694653-ded6df03f754` (certificate with seal) |

### Plate Cards
Course-catalog entries are "plates," not generic cards: white background, thin hairline border, a `Space Mono` plate number ("PLATE NO. 01") above the content, and crosshair corner marks on two corners (top-right, bottom-left) via the `.plate-marks` utility. Each plate is a flex column so its footer row — the discipline tag and a per-course "Enquire about this course" action — pins to the bottom regardless of description length. The course grid uses a `gap-px` CSS-grid trick with a `line`-colored background showing through the 1px gaps as hairline dividers.

### Per-Course Enquiry Action
Every plate carries its own "Enquire about this course →" control, threading the exact course title into the shared enquiry modal via `openEnquiryModal('<course title>')`. This does not fabricate a course-specific intake flow (no fee, date, or code fields) — it only pre-fills which course the enquiry is about, in the same honest "Regarding: …" context line the rest of the modal already uses.

### Trust/Registration Strip
A dark navy, mono-set strip stating RTO 45906 / CRICOS status / location sits above the main nav on every page load — the registration is literally the first thing rendered.

### Discipline Filter
Course filtering by discipline (Engineering/Hospitality/Business/Management/English) uses a hard, immediate state change (`transition: none`, solid navy background on the active pill) rather than a soft fade — reads as "selected/struck," not "faded in." The "no results" message carries `aria-live="polite"` so a screen-reader user hears the filter result change.

## Do's and Don'ts

### Do:
- Do keep the teal accent to exactly two jobs: primary action, and authentication.
- Do keep registration data (RTO number, CRICOS status, addresses, course codes) in Space Mono; body copy in Public Sans; headlines in Fraunces.
- Do add `.focus-ring-on-dark` to any new button whose own background is `teal` or `navy`.
- Do keep teal text/icons off navy backgrounds — use Ground there instead (teal-on-navy measures 2.6:1, below AA).
- Do keep the seal's rotation purely decorative — never repurpose it to imply live or updating data.
- Do state only confirmed facts (RTO 45906, CRICOS status, real address/phone, real course names) — course fees, entry requirements, intake dates, staff names, and testimonials are not yet confirmed and must not be invented. See PRODUCT.md's "Absent evidence" list before adding any of these.
- Do use "Enquire Now" (not "Apply Now") for every CTA that opens the enquiry modal — there is no real application pathway yet, only an enquiry/contact mechanism, and the copy should say what actually happens.

### Don't:
- Don't add a second accent color.
- Don't fabricate a working download for the Brochure or Student Handbook/Forms/Policies — none of those files exist yet; route those requests through the enquiry form instead, as built.
- Don't imply the contact/enquiry form delivers anywhere real — it doesn't yet (same class of gap as this operator's other sites); surface this before shipping any claim that it "works."
- Don't reuse one course's photo for another course — each of the seven plates must stay visually distinct.
