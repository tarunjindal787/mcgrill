---
name: McGill Institute Australia
description: An institutional-ledger landing page for a registered training organization — the real RTO/CRICOS registration is the design language, not a footer badge.
colors:
  ground: "#F7F5F2"
  card-white: "#FFFFFF"
  ink: "#16181A"
  muted: "#5B5952"
  muted-light: "#6F6C64"
  line: "#D8D4CC"
  seal: "#A6281E"
  seal-deep: "#7E1D15"
typography:
  display:
    fontFamily: "Public Sans, sans-serif"
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
    backgroundColor: "{colors.seal}"
    textColor: "{colors.ground}"
    rounded: "{rounded.none}"
    padding: "16px 36px"
  plate-card:
    backgroundColor: "{colors.card-white}"
    textColor: "{colors.ink}"
    border: "1px solid {colors.line}"
    cornerMarks: true
---

# Design System: McGill Institute Australia

## Overview

**Creative North Star: "The Registration Plate"**

McGill Institute Australia is a real registered training organization (RTO 45906) and CRICOS-registered provider. Every competitor vocational-college site — including McGill's own prior site — treats that registration as a trust badge tucked in a footer. This identity refuses that: the registration itself becomes the entire visual system. The page reads like an authenticated institutional ledger — registration crosshairs, hairline rules, a literal seal bearing the real RTO number — because that is what the institution actually is, not a decorative conceit layered on top.

**Key Characteristics:**
- A near-white "ledger" ground throughout, broken only by a dark registration strip (header) and the ink-black primary nav/footer accents.
- Exactly one accent — a deep, authenticating red (`#A6281E`, evoking an ink stamp / wax seal, and deliberately resonant with the red-seal/chop convention many of the institute's international-student audience already read as "authenticated") — reserved for the primary enrollment CTA and the registration seal. It never appears as a decorative color elsewhere.
- Course offerings are presented as numbered "plates" in a register (Plate No. 01–07), not generic cards — each framed with crosshair registration marks at two corners, like a printed plate's registration furniture.
- Public Sans for all display and body type (chosen for its literal US Web Design System / government-service design lineage — genuinely on-theme for "authenticated register," not a trendy default). Space Mono for every piece of registration data (RTO number, address, course discipline tags) — a deliberate type-role split between "institutional voice" (Public Sans) and "registry data" (Space Mono).
- The hero's registration seal (SVG, circular, crosshair-marked) rotates slowly and continuously (50s/revolution) — purely decorative dignity, like a wax seal catching light, never implying a live or updating data feed.

## Colors

One warm-white ground, one ink, one accent.

### Ground & Ink
- **Ground** (#F7F5F2): The page's one background color.
- **Card White** (#FFFFFF): Course-plate and feature-card surfaces.
- **Ink** (#16181A): Primary text and the header/footer registration-strip background. Never pure black.
- **Muted** (#5B5952) / **Muted Light** (#6F6C64): Secondary text. Muted Light is reserved for small uppercase labels (10–11px) and is deliberately darker than a typical "tertiary gray" to clear WCAG AA at that size — a lighter tone was tried and failed contrast at 3.3:1; this one measures 4.8:1+.

### The One Accent — Seal Red
- **Seal** (#A6281E) / **Seal Deep** (#7E1D15, hover): The institute's one accent. Used only for the primary CTA button and the registration seal mark. Never used decoratively elsewhere — diluting it dilutes the "this is the one real stamp of authority" signal the whole system is built on.

### Named Rules
**The One-Seal Rule.** The accent red marks exactly two things: "take this action" (the Apply/Submit buttons) and "this is authenticated" (the seal badge, the registration strip's implicit authority). It never becomes a generic decorative color.

**The Dark-Background Focus Rule.** The accent red fails contrast as a focus ring against its own background (red-on-red) and against the ink header/footer strip. Every button whose own background is `seal` or `ink` carries `.focus-ring-on-dark`, which swaps the focus outline to the ground color. Any new button on a dark/accent background must carry this class too — verified by contrast math, not by eye.

## Typography

**Institutional voice:** Public Sans (display and body) · **Registry voice:** Space Mono (registration numbers, addresses, discipline tags, plate numbers)

### Named Rules
**The Two-Voice Rule.** Public Sans speaks as the institution (headlines, body copy, course descriptions). Space Mono speaks as the register (RTO number, CRICOS status, addresses, "Plate No. 0X" labels, discipline tags). Mixing them — e.g. setting a headline in mono, or registration data in Public Sans — breaks the distinction the whole direction depends on.

## Layout & Components

### The Seal
A circular SVG badge: two concentric rings, curved registration text along the ring (RTO number on top, CRICOS status on the bottom, set via `textPath`), a centered mark, and four crosshair corner ticks outside the circle. Rotates continuously and slowly (50s linear, `prefers-reduced-motion` respected) — decorative dignity, not a data indicator. This is a first-viewport citizen in the hero, not a footer badge.

### Plate Cards
Course-catalog entries are "plates," not generic cards: white background, thin hairline border, a `Space Mono` plate number ("PLATE NO. 01") above the content, and crosshair corner marks on two corners (top-right, bottom-left) via the `.plate-marks` utility. The course grid uses a `gap-px` CSS-grid trick with a `line`-colored background showing through the 1px gaps as hairline dividers, rather than individual card borders — keeps the registry feel of one continuous sheet rather than a stack of separate boxes.

### Trust/Registration Strip
A dark, mono-set strip stating RTO 45906 / CRICOS status / location sits above the main nav on every page load — the registration is literally the first thing rendered, not something a visitor has to scroll to find.

### Discipline Filter
Course filtering by discipline (Engineering/Hospitality/Business/Management/English) uses a hard, immediate state change (`transition: none`, solid ink background on the active pill) rather than a soft fade — a deliberate borrowed discipline (see Direction Contract) meant to read as "selected/struck," not "faded in."

## Do's and Don'ts

### Do:
- Do keep the accent red to exactly two jobs: primary action, and authentication.
- Do keep registration data (RTO number, CRICOS status, addresses, course codes) in Space Mono; keep institutional voice in Public Sans.
- Do add `.focus-ring-on-dark` to any new button whose own background is `seal` or `ink`.
- Do keep the seal's rotation purely decorative — never repurpose it to imply live or updating data.
- Do state only confirmed facts (RTO 45906, CRICOS status, real address/phone, real course names) — course fees, entry requirements, intake dates, staff names, and testimonials are not yet confirmed and must not be invented. See PRODUCT.md's "Absent evidence" list before adding any of these.

### Don't:
- Don't add a second accent color.
- Don't fabricate a working download for the Brochure or Student Handbook/Forms/Policies — none of those files exist yet; route those requests through the enquiry form instead, as built.
- Don't imply the contact/enquiry form delivers anywhere real — it doesn't yet (same class of gap as this operator's other sites); surface this before shipping any claim that it "works."
