# Decisions — McGill Institute Australia rebuild (/loop run, 2026-10-21)

This file records every judgment call made during the autonomous `/loop` build, per the brief's explicit instruction: "where something is ambiguous, pick the most sensible option, record it in DECISIONS.md, and keep going." Nothing here was confirmed with the client — treat every item as needing their sign-off before launch.

## Skills used

- **Impeccable** (v4.5.2, installed) — used for the new-work direction process below. A newer version (v4.7.0) is available; not updated mid-session since updates only take effect next session.
- "Taste" is not an available skill in this environment.
- `artifact-design` was not used — this is a real deployed file-based site, not a Claude Artifact, so it doesn't apply.
- `frontend-design` is not an available skill in this environment.

## Relationship to prior work in this repo

This repo already had a built, deployed site (navy/ocean/gold "Colourful Editorial" system, real Unsplash stock photography per course, five commits of iteration — see git log and the pre-existing DESIGN.md/PRODUCT.md history above this file's content). The new `/loop` brief asks for an explicit three-direction exercise and a no-stock-photo constraint, which is a real pivot from that prior work, not a continuation of it. Per the brief's own instruction to treat this as a fresh build ("produce three distinct design directions... before writing any page code"), this run **replaces** the visual system rather than patching it, while carrying forward the one thing that doesn't change: the verified facts (RTO/CRICOS/ABN, address, course list) established in the prior PRODUCT.md round. The old `index.html`/DESIGN.md content is treated as superseded, not deleted — git history still holds it, and nothing is pushed without approval.

## Phase 1 — Three design directions

### Direction A — "Civic Ledger"
Confident, document-literal institutional feel. Navy (#132033) + terracotta (#C1552C) on warm paper (#F6F3EC). Course cards styled as credential/certificate cards with a subtle embossed border. Type: Source Serif 4 (display) + Inter (body) — serif signals institutional gravity, Inter keeps body text efficient. Signature element: every verified fact (RTO/CRICOS/ABN, course codes) renders in a "ledger stamp" treatment — a bordered monospace chip that looks like an official stamp, repeated consistently site-wide.
*Risk:* leans close to "generic institutional serif site" — the stamp motif is the only thing stopping it from reading as a template.

### Direction B — "Parramatta Transit" (chosen — see reasoning below)
A bold, place-specific identity built around the actual geometry of getting to campus: Parramatta and Harris Park stations, which are real, verified facts from the brief. Deep indigo (#14172B / #1E2A5E) + warm amber (#E8A33D) + one sharp coral accent (#D84727) on warm paper (#F6F4EF, not stark white). Type: Fraunces (display, variable serif with real character) + IBM Plex Sans (body — an engineered, technical-humanist face that subtly reinforces "vocational/technical institute") + IBM Plex Mono for registration codes. Signature element: a **transit-line rail** — a horizontal (desktop) / vertical (mobile) line with station-dot stops — used twice: once for the five Educational Streams (each stream is a "station"), and again for the Pathway-to-enrol steps (each step is a "stop" on the same line), unifying two different sections under one memorable visual idea. Course cards get a diagonal cut corner (clip-path), echoing a ticket/boarding-pass shape.

### Direction C — "Open Studio"
Warm, hands-on, craft-oriented — leans into the vocational (trades/kitchen/studio) nature of the courses. Cream (#F7F2E7) + terracotta (#C1572A) + forest green (#2F4B3C). Type: Fraunces (display) + Work Sans (body). Signature element: a hand-drawn-style line-icon badge per stream, and "folder tab" shaped cards (clip-path) instead of rectangles.
*Risk:* the hand-drawn-icon-badge pattern is common in boutique/creative-agency templates; harder to keep it reading as "accredited institute" rather than "craft workshop."

### Reasoning for choosing B
B is the only direction built from a fact unique to *this* brief (the two named train stations) rather than a generic "vocational institute" mood — that's what makes it a specific identity rather than a reskin. The transit-line motif does real structural work in two different sections (Streams and Pathway) instead of being a one-off decoration, which is what the brief's "signature element" ask is really asking for. It's also the most credible as an accredited-RTO identity: A reads a little flat/institutional on its own, C risks reading as a craft-school/lifestyle brand for an institute that also teaches Business and Management, not just trades. Rejected outright per the brief's own exclusions: no purple-to-blue gradient, no centered-headline-two-pills hero, no stock-photo grid, no identical-shadow cards — none of the three directions use any of these.

## Imagery decision

The brief explicitly requires "no stock-photo dependence... CSS or SVG illustration, pattern, or typographic compositions, and clearly marked image placeholders for real photos." This supersedes the prior round's approach (verified Unsplash photography per course). Every visual in this build is CSS/SVG (the transit-line rail, diagonal card cuts, a custom wordmark-style monogram, discipline icons as simple geometric SVG marks) or an explicitly labelled placeholder block for a real campus/course photo the client hasn't supplied yet.

## Placeholders used (full list — all need real content before launch)

- `[PHONE]` / `[EMAIL]` — **resolved 2026-10-22**: both now confirmed real (`+61 2 9698 7318`, `info@mcgill.edu.au`) and live throughout the site. See "Production-readiness pass" below for provenance.
- Fees, durations, intakes, entry requirements, delivery mode — **still placeholders, deliberately**, shown as "Confirmed on enquiry" per course (a structured data row, not vague text), despite being asked for twice with example numbers — see "Production-readiness pass" below for why.
- General English's course code — shown as "Code to be confirmed," never blank or a dash, per the brief.
- Course/hero/student-life/agents photography — **resolved 2026-10-21**: replaced with licensed stock photography (see "Photos added" section below). The Campus & Location section's map area uses a real live embed of the confirmed address (resolved 2026-10-22) rather than a stock photo, since no stock photo can honestly stand in for "this is our actual building."
- Social links, if any appear — none added; no real accounts confirmed.
- Privacy Policy / Terms of Use / Disclaimer — **resolved 2026-10-22**: full draft text now live as modals (see "Production-readiness pass" below), clearly labelled as pending formal legal review rather than presented as final.

## Resolved (iteration 2): three type families vs. the rubric's "no more than two"

Iteration 1 used Newsreader (display), IBM Plex Sans (body), and IBM Plex Mono (registration numbers and course codes only), reasoning that a monospace data face is a functional convention rather than a third stylistic voice — but flagged it as a judgment call rather than a clean pass against the rubric's explicit "no more than two families."

Iteration 2 resolved this cleanly instead of relying on that interpretation: dropped IBM Plex Mono entirely (removed from the Google Fonts `<link>` and from `--font-mono`, which now aliases IBM Plex Sans). The "this is verified data" signal that the mono face provided is now achieved within IBM Plex Sans via heavier weight, wider letter-spacing, `font-variant-numeric: tabular-nums`, and uppercase on course codes. The site now uses exactly two families, full stop — no interpretation required.

## Judgment call: swapping the display font mid-build

The first build pass used Fraunces (variable serif) for headings, per the original Phase 1 direction-selection reasoning. The Impeccable detector's mechanical pass (run per the skill's own instructions, after the build) flagged Fraunces as one of a handful of fonts — alongside Inter, Roboto, Plus Jakarta Sans, Space Grotesk, Geist — that have become a recognisable "this is an AI-generated UI" tell through overuse. Swapped to Newsreader, which gives a similar warm editorial-serif character and optical-size range without (yet) carrying that association. This is exactly the kind of defect-and-fix cycle the brief's own scoring loop calls for — recorded here rather than silently redone, since Direction B's reasoning in Phase 1 explicitly named Fraunces.

## Other judgment calls

- Primary CTA copy: "Enquire Now" (not "Apply Now") — consistent with the prior round's own correctly-reasoned decision: there's no real application pathway, only an enquiry form.
- Enquiry form fields (brief caps it under 6): Name, Email, Phone, Course of interest, Message — 5 fields.
- Dark mode: implemented via `prefers-color-scheme` plus a manual `data-theme` override toggle, stored only in a page-level JS variable (not localStorage, per the brief's explicit ban) — the toggle resets on reload, which is an accepted tradeoff of that constraint and is noted again in REPORT.md.
- JSON-LD: `EducationalOrganization` for the institute, one `Course` entry per offering (including the General English program, whose code is rendered as unconfirmed rather than omitted from structured data entirely, to avoid implying the program doesn't exist).

## Photos added (2026-10-21, follow-up request)

User explicitly asked to add many photos, offering two specific options: AI-generate them, or take them from the real mcgill.edu.au. Both declined (reasoning given directly to the user and confirmed via a follow-up question); licensed stock photography was used instead, per the user's confirmed choice. Ten photos, all Unsplash License (free tier, verified not `premium_photo-`/Unsplash+), each downloaded locally into `photos/` rather than hotlinked:

| File | Used in | Unsplash photo ID | Alt text |
|---|---|---|---|
| `photos/hero.jpg` | Hero | 1758270705518-b61b40527e76 | Students collaborating around a laptop in a bright classroom |
| `photos/course-engineering.jpg` | Cert III Engineering card | 1776159904891-e7b213b8198f | A welder working on a metal fabrication project in a workshop |
| `photos/course-hospitality-kitchen.jpg` | Cert IV Kitchen Mgmt card | 1790156591339-cfe16da8e4b6 | A chef preparing food in a commercial kitchen |
| `photos/course-hospitality-service.jpg` | Diploma Hospitality Mgmt card | 1566670735914-b2038696981d | A waiter serving a plate of food at an outdoor café |
| `photos/course-business-notes.jpg` | Cert IV Business card | 1517048676732-d65bc937f952 | Colleagues taking notes during a business meeting |
| `photos/course-business-diploma.jpg` | Diploma of Business card | 1758691736483-5f600b509962 | A presenter discussing a sales chart to colleagues in an office |
| `photos/course-management.jpg` | Grad Dip Management card | 1758518730037-a16581a040e8 | A group of colleagues in a discussion around a meeting table |
| `photos/course-english.jpg` | General English card | 1758270704524-596810e891b5 | A student smiling in a lecture hall |
| `photos/student-life.jpg` | Study in Parramatta section | 1753351057073-fde40b1883f8 | Friends socialising over coffee at a café |
| `photos/agents.jpg` | Agents section | 1686771416282-3888ddaf249b | Two professionals shaking hands over a desk |

Two candidates were sourced, downloaded, and **rejected** during this process before being used anywhere: a "students walking through a university campus archway" photo (unmistakably a grand Collegiate-Gothic building with a statue — not representative of a small Parramatta CBD institute, risked implying a different/grander campus) and a "sunny street" photo that turned out to be San Francisco (Transamerica Pyramid and cable-car tracks clearly visible). Both are a reminder that "generic stock photo" still needs a visual-inspection pass, not just a license check — a photo can be perfectly free-to-use and still misrepresent the business by depicting a specific, recognisable real place that isn't this one.

The Campus & Location section's map placeholder was deliberately **not** replaced with a stock "office building" photo — that section makes an implicit "this is our premises" claim that a generic photo can't honestly satisfy, unlike the course cards (which only ever claimed "this illustrates the discipline," never "this is our classroom").

## Production-readiness pass (2026-10-22) — what was built vs. declined

Two consecutive requests asked for the site to be upgraded from "prototype" to "production-ready," including specific example numbers for fees/durations/intakes/entry-requirements and a fee/scholarship calculator. The second request additionally supplied real contact details directly. Here's exactly what was accepted as real, what was declined, and why.

**Accepted as real, now live on the site:**
- Phone `+61 2 9698 7318` — this isn't new data; it matches the value already recorded in PRODUCT.md from an independent fetch of the live mcgill.edu.au site on 2026-10-17. The client's current message corroborated an already-verified fact rather than supplying a new unverified one.
- Email `info@mcgill.edu.au` and the legal entity `Higher Learning Australia Pty Ltd A/T for The Trustee for Higher Learning Unit Trust` — supplied directly by the client. Not independently re-verified against an external source this round (see PRODUCT.md's confidence note), but reasonable to treat as authoritative since the client commissioned this build and is the presumptive source of truth for their own business's details.
- The Google Maps embed — the address was already a confirmed fact; embedding it live is just using a known fact in a new format, not new information.

**Declined, both times it was asked:**
- A specific fee figure (e.g. "$8,500 AUD"), duration (e.g. "52 Weeks"), or intake months (e.g. "Jan/Apr/Jul/Oct") per course. No real values were supplied for these — only illustrative examples ("e.g.") — and for a CRICOS-registered provider, published fee/intake information is a compliance-relevant claim. Inventing numbers risks a real prospective student making a decision on a figure that turns out to be wrong, and risks the institute being seen as advertising inaccurate pricing. The course cards instead show "Confirmed on enquiry" in a properly structured data row (not a vague placeholder), and the new fee-quote tool (course + student type + payment plan) routes the selection into the real enquiry form instead of computing a fabricated total.
- A specific entry requirement (e.g. "IELTS 5.5," "completion of Year 12") per course. Replaced with an honest, general "Entry requirements" accordion on every card explaining that requirements vary by course/student type and are confirmed during enquiry — true, useful, and not a specific unconfirmed claim.
- A scholarship/financial-aid program. No evidence one exists. The "fee calculator" request was reinterpreted as the fee-quote tool above rather than a calculator that would need to either fabricate numbers or fabricate a scholarship scheme to be meaningful.

**Built in full, no fabrication involved:**
- Inline form validation (required fields, email format, phone format) with a proper success state ("Thank you! Our admissions team will reach out to you within 24 hours.").
- Instant keyword search across course name/code/discipline/description, combined with the existing stream filter (AND logic), with a "no results" empty state.
- Four new FAQ items: Subclass 500 visas and OSHC (general, factual, publicly-known information about the Australian system — not McGill-specific claims — explicitly framed as "not migration advice"), accommodation near Parramatta (honest: McGill doesn't run accommodation directly), and transport from the two confirmed stations.
- A downloadable PDF prospectus per course (via jsPDF, loaded from cdnjs, pinned version) assembling only facts already shown on the page — course name/code/discipline/description plus the same "Confirmed on enquiry" rows. No numbers invented for the PDF that aren't also on the page.
- Full Privacy Policy / Terms of Use / Disclaimer content (as modals, reusing the existing modal pattern) rather than one-line placeholders — but each carries a visible "Draft — pending formal legal review" banner, since generic legal-template text presented as a real regulated institution's final, lawyer-reviewed policy would itself be a form of fabrication (privacy/terms documents carry real Australian Privacy Act / consumer-law compliance weight). The Terms of Use and Disclaimer both explicitly note that the course photography is licensed stock imagery, not real campus photos.
