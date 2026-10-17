# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Delegated: static HTML/CSS/JS, no build pipeline. Chosen to match the deployment pattern already used for this operator's other projects (e.g. the Mountain Culture Guitar Lessons site) — deploys directly to GitHub Pages from this repo (`tarunjindal787/mcgrill`), and stays easy for a non-technical site owner to maintain without a build step.

## Users

Both international students (who typically apply via education agents and need CRICOS/visa-pathway clarity) and domestic Australian students (seeking vocational upskilling or a career change) — served equally. This is a general institute site, not weighted toward either audience.

## Product Purpose

A marketing/informational website for McGill Institute Australia, a registered training organization (RTO) and CRICOS-registered education provider, to present its course offerings, attract prospective students and education agents, and drive enrollment inquiries. This is a rebuild of the institute's real, existing website (mcgill.edu.au) — the goal is a better-designed version of a real site, not a new fictional brand.

## Positioning

A registered (RTO 45906), CRICOS-approved vocational and English-language training provider based in Parramatta, Sydney, offering a multi-discipline course catalog (Engineering, Hospitality, Business, Management) plus General English programs, serving both domestic and international students with agent-support infrastructure for international recruitment.

## Operating Context

Education agents play a real recruitment role for international students (the live site has a dedicated Agents section with registration/application materials). Domestic students apply directly. Enrolled students need access to a handbook, forms, and policies (a Students section on the live site). Prospective students browse by course/discipline and submit an inquiry via a contact form.

## Capabilities and Constraints

- Static HTML/CSS/JS site, no backend, no framework — matches the established pattern for this operator's other deployed projects.
- No confirmed contact-form submission destination yet — if a contact/inquiry form is built, it will not actually deliver submissions anywhere until the client supplies one (same class of gap as the guitar site's booking form); must be surfaced, not silently implied as working.
- No "AI admissions" feature in scope. The client clarified this request as wanting a better-designed website overall, not a literal AI-powered tool or chatbot — do not build one, and do not add "AI-powered" marketing claims that aren't true.
- Course-level specifics (fees, entry requirements, CRICOS course codes, intake dates) are not confirmed beyond the course names themselves — see Evidence on Hand.

## Brand Commitments

- Name: **McGill Institute Australia** (the live site's real name; the client's original request misspelled it "McGrill" — corrected here).
- Regulatory facts that must be preserved exactly, never altered or embellished: **RTO 45906**, **CRICOS provider 03678G**, **ABN 91 835 873 060**.
- The live site currently uses an orange-and-white color scheme. This is recorded as observed incumbent evidence, not a binding brand commitment — the visual direction (preserve, evolve, or replace) is a new-work decision, not decided here.

## Evidence on Hand

Confirmed accurate by the client (pulled from the live mcgill.edu.au site):
- Registration: RTO 45906, CRICOS provider.
- Address: Level 1, 30 Cowper St, Parramatta NSW 2150.
- Phone: +61 2 9698 7318.
- Courses offered: Certificate III in Engineering – Fabrication Trade; Certificate IV in Kitchen Management; Diploma of Hospitality Management; Certificate IV of Business; Diploma of Business; Graduate Diploma of Management; General English programs.
- Site sections on the live site: Courses, Agents, Students (handbook/forms/policies), Brochure, Contact. Rotating banner taglines (e.g. "Quality education creates great careers"). Contact form fields: name, mobile, email, message.

**Additional facts verified directly against the live mcgill.edu.au (2026-10-17, via two independent automated page fetches of the homepage and courses page, cross-consistent both times):**
- CRICOS provider number: **03678G** (footer text quoted verbatim both times: "CRICOS – 03678G • RTO 45906 • ABN – 91 835 873 060").
- ABN: **91 835 873 060**.
- Qualification codes: MEM31922 (Cert III Engineering – Fabrication Trade), SIT40521 (Cert IV Kitchen Management), SIT50422 (Diploma of Hospitality Management), BSB40120 (Cert IV Business), BSB50120 (Diploma of Business), BSB80120 (Graduate Diploma of Management (Learning) — note the official title includes "(Learning)," corrected here from the earlier "Graduate Diploma of Management"). General English carries no code on the official site either.
- Confidence note: this was obtained via automated fetches of the public site, not a human lookup against the national training register (training.gov.au) or a legal document — treat as high-confidence, not notarized, and have the client confirm before using in any compliance-sensitive context.
- The official site's real brand accent is a burnt-orange/rust (~#e95912), not the navy/ocean/gold palette used here — recorded for reference, not adopted, since the client explicitly directed the navy/ocean/gold palette for this redesign.

Absent evidence (do not fabricate): course fees/pricing; specific academic or English-proficiency entry requirements per course; intake dates/term calendar; staff/trainer names or bios; real student testimonials or employment outcomes; a real logo file (none supplied yet — will need a placeholder or type-based wordmark until one is provided); any literal AI-powered feature (explicitly out of scope per client); real photography of McGill's actual campus, classrooms, or students (none supplied yet — see below).

**On imagery (added 2026-10-17, updated 2026-10-17):** All seven course plates and the "Why McGill" panel use real, distinct stock photography (sourced under the Unsplash License, which permits this use without attribution) illustrating each discipline generically — a metal workshop, a commercial kitchen, a hotel reception desk, two different business scenes, a strategy meeting, a student writing, and a certificate with a seal. No two courses share a photo. These are **not** photos of McGill's own campus, staff, or students, and are not captioned or alt-texted as if they were. Replace with real McGill photography when the client supplies it; DESIGN.md's Photographic Plates section records exactly which image is used where and its source.

**On the redesign of 2026-10-17 (round 1):** The client requested a full visual-identity and audit pass (navy/off-white/teal palette replacing the cream/ink/seal-red system, a distinct display typeface, distinct per-course imagery, a per-course enquiry action, and a full interaction/accessibility/SEO review), explicitly authorizing professional judgement on design decisions while instructing that no commit/push/deploy happen without separate explicit authorization. One judgement call made in that pass: every "Apply Now" CTA was renamed to "Enquire Now," since the site has no real application pathway — only the enquiry modal/form — and "Apply Now" overstated what actually happens when clicked. This round was deployed after the client's explicit "deploy all the process."

**On the redesign of 2026-10-17 (round 2 — "colourful editorial"):** The client asked for a second pass: study the real mcgill.edu.au for facts/branding reference (not as a design template), move to a navy/ocean-blue/warm-gold/off-white/soft-aqua palette, bring in colourful real photography, retire the cold "institutional ledger" look in favor of a warmer editorial feel, and add a distinct typeface system (Plus Jakarta Sans headings, Inter body). While inspecting course photography for this round, one photo from round 1 (the English-course image) was found to actually depict young African primary-school children — wrong subject matter entirely, not adult international students — and was replaced. The official site's own photography was deliberately **not** reused/re-hosted here (no confirmed license to do so); the brief's own fallback instruction ("otherwise use properly licensed photography") was followed instead, using free-tier Unsplash-License images only, each verified live and visually inspected before use.

## Product Principles

1. The real regulatory facts (RTO 45906, CRICOS provider status) are non-negotiable and must appear exactly as confirmed — never altered, extended, or paired with unconfirmed accreditation claims.
2. Serve domestic and international audiences equally; no section should implicitly favor one over the other.
3. This is a real institute, not a fictional brand — course names, contact details, and registration numbers must match the real institution. Visual design is free to improve; factual content is not free to invent.
4. No AI-chatbot or AI-backend feature, and no "AI-powered" marketing language — "AI admissions" was clarified as wanting a better overall website, not a literal AI tool.
5. Keep the stack simple (static HTML/CSS/JS, no build pipeline) so it deploys the same way as this operator's other projects.
