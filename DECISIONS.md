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

- `[PHONE]` — real phone number not supplied this round (the prior round's PRODUCT.md records a phone sourced from the live mcgill.edu.au, `+61 2 9698 7318`, but that's the *real external institute's* number scraped from their site, not confirmed as this client's own contact line for this rebuild — treated as unconfirmed and placeholder'd rather than reused, since the brief for this run says contact details "are NOT known to you" and should be clearly labelled placeholders).
- `[EMAIL]` — no email address supplied.
- Fees, durations, intakes, entry requirements, delivery mode — shown as "On enquiry" / "To be confirmed" per course, never invented.
- General English's course code — shown as "Code to be confirmed," never blank or a dash, per the brief.
- Course/hero/student-life/agents photography — **resolved 2026-10-21**: replaced with licensed stock photography (see "Photos added" section below). The Campus & Location section's map area remains a placeholder, since no stock photo can honestly stand in for "this is our actual building."
- Map embed — a static placeholder panel (no live iframe, since no confirmed Google Maps API key/embed policy for this exact rebuild) with a real "Get directions" link to the verified address via a standard Google Maps search URL (not an embedded API frame).
- Social links, if any appear — none added; no real accounts confirmed.

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
