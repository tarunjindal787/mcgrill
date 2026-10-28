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

**Changed 2026-10-26:** Courses moved off the homepage entirely onto its own page (`courses.html`) at the client's request -- the full search/filter/catalogue UI can no longer appear on the homepage. Removing it from the middle of the sequence above breaks the alternation rule at exactly that seam: Streams and Why McGill are now adjacent and both `.tone-light`. A true fix would re-alternate every section from Why McGill through Enquiry (6 sections), which conflicts directly with the same request's explicit instruction not to touch Why McGill/How to Enrol/Campus/FAQ -- so this one seam is left as a known, minor, disclosed exception rather than cascading an unrequested tone change through sections the client asked to leave alone. If a future pass is free to touch those sections' visual tone, re-alternating from Why McGill onward (Why→dark, Student Life→light, Pathway→dark, Agents→light, Campus→dark, FAQ→light, Enquiry→dark) would restore strict alternation -- but Enquiry's `::before` photo wash is tuned for a light background (see its section below) and would need reworking too.

**Changed 2026-10-28:** Pathway ("How to Enrol") removed from the homepage entirely at the client's request -- same kind of seam break as above, this time between Student Life and Agents, both `.tone-dark`. Same reasoning applies: a true fix means re-alternating Agents through Enquiry (4 sections), not requested and not done; left as a second known, disclosed exception rather than a cascading, unrequested redesign. The sequence is now: Hero(D) → Streams(L) → Why(L, pre-existing exception) → Student Life(D) → Agents(D, new exception) → Campus(L) → FAQ(D) → Enquiry(L) → Footer(D). The pre-enrolment readiness checklist (`#readiness`, its progress bar, and its JS) and the whole `.transit-rail`/`.rail-stop` "signature motif" CSS (the Streams section stopped using its horizontal variant in an earlier redesign, so Pathway's vertical variant was the last real user) were removed as dead weight along with the section, not just visually hidden -- nothing else in the project referenced any of it. The "How do I enrol?" FAQ answer, which pointed at "the How to Enrol section above," had that sentence dropped since the section it pointed to no longer exists; the rest of that answer already stood on its own.

### Student testimonials marquee (2026-10-28)

New section, `#student-testimonials`, inserted between Student Life and Agents -- and because it's `.tone-light`, it happens to restore the alternation the Pathway removal above broke at exactly that seam (Student Life (D) → Testimonials (L) → Agents (D)), without needing the cascading re-alternation that entry said wasn't worth doing. Sequence is now: Hero(D) → Streams(L) → Why(L, pre-existing exception) → Student Life(D) → **Testimonials(L, new)** → Agents(D) → Campus(L) → FAQ(D) → Enquiry(L) → Footer(D) -- only the one pre-existing Streams/Why exception remains.

**Content is placeholder, not real McGill feedback, and the client said so explicitly.** The five testimonials (James D., Michelle C., Ben H., James Mitchell, Emily Parker) are quotes about guitar lessons, supplied by the client from a different reference project ("Mountain Culture Guitar Lessons") as example content for this component, with the client's own brief stating outright: "these testimonials are supplied as example content," "do not present these as independently verified," and "keep the component flexible enough to replace them with genuine McGill Institute Australia feedback before publication." Kept verbatim as instructed (exact wording, no invented quotes, no fabricated avatar photos -- CSS initials avatars instead, no course/stream label since none was supplied). The "5.0 ★★★★★" rating badge is labeled "Example rating, pending verified reviews" rather than implying a measured score, per the same brief's explicit accuracy requirement. A loud HTML comment sits directly above the section in `index.html` repeating this so it can't be missed, and the `TESTIMONIALS` array (in the homepage's inline script, not a separate data file, since this is the only consumer) is the single place to swap in real content later.

**New literal palette, scoped to `#student-testimonials` only:** `#101C32` navy, `#F7F0E5` cream, `#F3A184` peach, `#ED762D` orange, `#172033`/`#687080` text, `#FFFDF9` card background -- the client's own explicit values for this section. Close to, but not unified with, the `#10243A`/`#FFF8EF`/`#FCE5D5`/`#D94F2B` palette added to Campus/Streams two days earlier; not worth forcing into one set since each brief specified its own exact hex values independently and the visual difference is minor.

**Seamless marquee, built the way the brief specified:** two copies of the five cards in one flex track, each card carrying its own trailing `margin-right` instead of a flex `gap` on the track. This matters -- with a `gap` on the track instead, the inter-copy seam gap and the intra-copy card gaps are the same value but the *count* of gaps differs between "half the track" and "where the second copy actually starts," so `translateX(-50%)` lands half a gap-width short and visibly jumps. Margin-per-card sidesteps that arithmetic entirely: 2N identical (card+margin) units means the Nth+1 unit always starts at exactly 50% of the total, regardless of card width, gap, or count. Reduced motion skips the duplication and animation entirely (single set, natively horizontally scrollable) rather than just stopping a duplicated animation mid-layout, so no testimonial is ever rendered twice for assistive tech and none are harder to reach. A real, labeled pause/resume button (not just hover) covers touch users per the brief's explicit requirement, since hover doesn't exist on touch.

The detector flagged this as a "marquee" slop pattern (continuous auto-scroll demanding attention, hiding content) -- a fair general rule, but the client requested this exact pattern twice, in detail, each time specifying the mitigations (hover-pause, focus-pause, a real pause button, full reduced-motion fallback with every testimonial still reachable) that are the actual substance of that rule's concern. Ignored for this file via `impeccable hooks ignore-value`, reasoned in the config rather than silently suppressed.

**Updated 2026-10-28 (Student Experience/Student Life added):** the old combined "Study in Parramatta" + "Say Good Day to Australia" section was split in two and a new block inserted between them and Testimonials -- see the dedicated entry below for the full reasoning. Sequence is now: Hero(D) → Streams(L) → Why(L, pre-existing exception) → **Student Experience(L, new)** → **Student Life(L, new)** → Settling in Australia(D, renamed from the old `#student-life`) → Testimonials(L) → Agents(D) → Campus(L) → FAQ(D) → Enquiry(L) → Footer(D). Three light sections now run in a row (Student Experience, Student Life, Testimonials) -- a second disclosed exception alongside the pre-existing Streams/Why one, for the same reason: the brief required both new sections to be light/cream (explicitly not dark, to read as one continuous "Student Experience" block) and required Testimonials to immediately follow them, so strict alternation was not worth cascading a tone change through Settling-in/Agents/Campus/FAQ/Enquiry, none of which this brief touched.

### Why McGill Institute: full redesign (2026-10-28)

Replaced the "Four reasons students choose us" asymmetric bento grid (RTO 45906 / CRICOS 03678G / five streams / Parramatta location facts) with a reference-screenshot-driven two-part design: a two-column intro (heading, CTA, photo collage) over four equal feature cards (Quality Education, Supportive Community, Practical Learning, Global Opportunities). This is a full visual replacement per an explicit, highly detailed client brief asking to "recreate the reference design," not an addition alongside the old content.

**No compliance information was lost.** The RTO 45906 and CRICOS 03678G facts that lived in the old cards remain fully documented elsewhere on the page -- the meta description, the header brand subtext, the hero's RTO/CRICOS badge, a dedicated FAQ item (`#faq-rto`, "What do RTO 45906 and CRICOS 03678G mean?"), the enquiry section's pills, and the footer's `reg-codes` line and PDF prospectus. Confirmed via grep before replacing the section, specifically so this redesign wouldn't quietly drop the institute's only on-page explanation of its registration numbers.

**"Discover Our Difference" and all four "Learn more" links go to real, working destinations**, chosen by inspecting the existing page rather than inventing routes: the CTA and the old card 1 both went to `#faq-rto` already (an existing homepage behavior, `openFaqFromHash()` in the inline script, that auto-opens that specific FAQ `<details>` on hashchange) -- reused as-is, so "Discover Our Difference" lands on the RTO/CRICOS explanation and auto-expands it. Quality Education → `#streams`, Supportive Community → `#student-experience`, Practical Learning → `courses.html` (the full catalogue), Global Opportunities → `#settling-in` (the Australian Government settling-in content, the most relevant existing "international life" section on the page).

**Dead code removed as a direct consequence of the replacement:** the old `.why-grid`/`.why-card`/`.why-badge`/`.why-card-art`/`.why-card-seal` CSS (all of it was exclusively for the removed markup -- grepped first to confirm `.tilt-card`/`attachTilt` is still used by `course-card.tilt-card` on `courses.html`, so that shared function and its CSS were kept), and the now-orphaned `document.querySelectorAll('.why-card.tilt-card').forEach(attachTilt)` call in `index.html`'s inline script (the only thing that `if` block did; removed as an empty wrapper rather than left pointing at nothing).

**New literal palette**, scoped to `.why-section`/`.why-*` only, per the brief's own exact table: `#FBF6EE` ivory background (distinct from, if close to, the Student Experience/Testimonials cream `#F7F0E5` -- same "each brief specified its own hex" reasoning as those two), `#FFFDF9` card background (shared value, reused deliberately since it's the same literal white both briefs independently chose), `#101C32` navy, `#252B36` charcoal, `#687080` muted, `#ED762D` orange, `#F3A184` peach, `#E9DED0` border. New 14px card radius, outside the existing `rounded` scale but matching the brief's explicit "12-16px" card requirement.

**New font:** Caveat (weight 600, Google Fonts, added to the existing Newsreader/IBM Plex Sans `<link>` rather than a second request) for the decorative "Your Future Starts Here" handwritten note beside the main photo -- purely decorative, `aria-hidden="true"`, hidden entirely below 900px per the brief's own instruction not to let it crowd tablet/mobile layouts.

**Photography:** two new photos, downloaded locally (Pexels License, free for commercial use, no attribution required) -- `photos/why-students-main.jpg` ("College Students Standing Close Together" by RDNE Stock project, cropped from 3:2 to ~1.82:1) for the main intro photo, and `photos/why-sydney-harbour.jpg` (Wikimedia Commons, "Sydney Opera House Sunset" by Danijel James, CC BY 3.0, attribution: Danijel James) for the Global Opportunities card, cropped to drop empty sky/water. The other three cards reuse the Student Experience section's own photos (`student-experience-library.jpg`, `-community.jpg`, `-collaboration.jpg`) rather than sourcing three more near-duplicate campus photos for what are thematically the same subjects (a student with a laptop, a diverse group interacting, students collaborating) already shot and licensed for this site.

**Link alignment technique:** each card is a flex column; the description `<p>` gets `flex: 1` (not the photo) so it absorbs the leftover vertical space from the grid's equal-height row, keeping the "Learn more" link and the photo at the same position in every card regardless of how many lines each description wraps to -- the photo itself has no `margin-top: auto`, since pushing *it* down instead would let the link's position drift per card.

The decorative peach blob (`.why-shape`, a plain positioned div with a radial-gradient background, low opacity, `pointer-events: none`, placed before the section's visible content) **replaces** the section's pre-existing hairline grid-line background (`#why::before`) rather than layering on top of it -- the brief's own "no multiple unnecessary decorative shapes" instruction and the reference screenshot both call for one atmospheric shape, not two different decorative treatments stacked.

### Student Experience & Student Life replace "Study in Parramatta" (2026-10-28)

The old `#student-life` section held two unrelated things in one `<section>`: a "Study in Parramatta" `.life-grid` block (eyebrow, heading, paragraph, three commuting/precinct bullet points, one photo) and, immediately below it in the same section, "Say Good Day to Australia" (the settling-in accordion + services grid, sourced from the Australian Government's Study Australia site). The client's brief asked only to remove the first block and replace it with a new "Student Experience" + "Student Life" pair — the second block is unrelated content that still belongs on the page.

**What was removed:** the entire `.life-grid` div (eyebrow "Study in Parramatta", heading "Campus life in Sydney's second CBD", the Parramatta/Cowper Street paragraph, the three bullet points about train stations/precinct/multi-discipline campus, and its photo) plus the now-dead `.life-grid`/`.life-art`/`.life-feature-list`/`.life-feature-icon` CSS and `photos/student-life.jpg` (used nowhere else — confirmed by grepping the whole project before deleting it). The unrelated "Say Good Day to Australia" content, including its real references to Parramatta/Harris Park stations and Cowper Street, was left completely untouched and still exists on the page — only its wrapping `<section>` was renamed (see below). Other legitimate Parramatta/Harris Park/Cowper Street references elsewhere on the page (Campus & Location facts, the FAQ answer about getting to campus) were deliberately left alone; they're independent, verified facts, not part of this section.

**The `id="student-life"` collision:** the brief's spec requires a *new* nested subsection with `id="student-life"` as the scroll target for a "Discover Student Life" CTA — but that id was already in use by the old section described above. Nothing in the codebase linked to `#student-life` (grepped first to confirm — no nav item, no other anchor referenced it), so the old section was renamed to `id="settling-in"` with its content and tone (`.tone-dark`) otherwise unchanged, freeing `#student-life` for the new subsection. New section/anchor order where the old combined section used to sit: **Student Experience** (`#student-experience`, new) → **Student Life** (`#student-life`, new, reuses the freed id) → **Settling in Australia** (`#settling-in`, the renamed old section, content unchanged) → Student Testimonials (unchanged, still immediately follows). This keeps Testimonials directly after the new Student Life block as the brief asked, without moving or editing the Settling-in content itself.

**New nav item:** "Student Life" added to both the desktop and mobile nav (between "Why McGill" and "Campus"), linking to `#student-experience` — the top of the whole new block. The in-page "Discover Student Life" CTA inside that block scrolls further down to the nested `#student-life` subsection; the two anchors are deliberately different targets so the nav entry and the CTA each land somewhere sensible.

**Palette:** reuses the Student Testimonials section's literal values exactly where they coincide (`#F7F0E5` cream background, `#101C32` navy headings, `#ED762D` orange accents) and adds two values the testimonials brief didn't need: `#69717D` muted body text (close to but distinct from testimonials' own `#687080` — both briefs gave their own exact hex, not unified) and `#E9DED0` for card borders. Scoped under `#student-experience`/`#student-life` only.

**New radius values:** 12px on the "Discover Student Life" CTA and 16px on the photo collage/card images — both outside the existing `rounded` scale (`card: 18px`, `input: 10px`, etc.) but within the brief's explicit "~10-12px" and "~14-18px" requirements; added deliberately for this section rather than forcing an existing token that didn't match the spec.

**Photos:** `photos/student-experience-community.jpg`, `-library.jpg`, and `-collaboration.jpg` are new, downloaded locally (not hotlinked) from Pexels (Pexels License: free for commercial use, no attribution required, no implied endorsement) — "Multiethnic students gathering around table with laptop" (Monstera Production), "Modern library interior with students studying" (Ugo Mendes Donelli, cropped to drop a strip of Italian-language reading-room signage visible at the bottom of the original frame — a European public library, not meant to suggest otherwise), and "College students hanging out and having fun" (RDNE Stock project). `photos/campus-parramatta-skyline.jpg` (already on site, already verified/documented above) is reused as the fourth collage/card image for its honest "Australian cityscape" content — same file, two unrelated captions, neither claiming it's McGill's own campus. All four photos are also reused as the four Student Life cards' images, matching each card's theme to its collage counterpart, rather than sourcing eight separate images for what is visually one coherent set.

### Campus skyline photo: removed a channel-marker sign (2026-10-27)

`photos/campus-parramatta-skyline.jpg` had a small blue informational sign (on a river channel-marker post, lower-right of the frame) that read as a distracting foreground object against the skyline/tree backdrop. Removed via clone-retouching (PIL: sampled a clean, tonally-matched patch of the same tree line/water from ~70px to the right, feathered into place) -- covers the sign, the pole, and its full reflection. This is ordinary photo retouching (removing one small distracting object), not a change to what the photograph depicts or any re-crop/re-composition; the skyline, river, buildings, and the other channel-marker poles are untouched. Took three attempts to get a clean result -- the first two left either a translucent ghost of the sign (mask blur radius too large relative to its own opaque inset, diluting coverage) or a visible rectangular seam in the water (source patch sampled too far away, at a different tonal/shadow band); both were caused by iterating on an already-edited file, which let artifacts compound, so the working version was done as a single clean pass from the original unedited crop. Re-verified by rendering zoomed crops of the retouched area before and after, and a full-frame render, rather than assuming the first attempt worked.

### Course discovery & credibility pass (2026-10-27)

A broad brief asked for course discovery improvements (level/duration/mode/fees/entry-requirements on cards, search+filter+sort, dedicated detail pages, Apply Now flows), testimonials, and a "trust" section, framed for a dynamic app with a CMS/backend/testimonial database. This project has none of those -- static HTML/CSS/JS, `courses-data.js` as the one course dataset, no backend, no auth. Implemented the parts that fit real data and the existing architecture; deliberately skipped or substituted the rest rather than inventing content, each noted below.

**Implemented:**
- `COURSES` entries gained a `level` field (`courses-data.js`) -- the AQF level each course's own real name already states (e.g. "Certificate III in Engineering..." -> `'Certificate III'`), not a new fact, just pulled into its own field so the card/filter code doesn't re-parse names. `null` for General English, which isn't AQF-leveled; UI treats `null` as "no badge, not matched by any level filter," never a default.
- Course cards (`courses.html`) show the level as a pill next to the course code, plus a line stating the one real, verified delivery fact every course shares (Parramatta campus) and pointing fees/intakes to the existing "confirmed on enquiry" pattern. `.course-actions { margin-top: auto }` keeps the action row flush to the bottom of every card regardless of description length, so action buttons align across a row.
- A second filter-chip row for qualification level (All/Certificate III/Certificate IV/Diploma/Graduate Diploma, values cross-checked programmatically against `courses-data.js`) alongside the existing stream filter, combined with it and the keyword search in `applySearchAndFilter`. Added the explicit "Clear filters" action the brief asked for (resets stream, level, and search together; only visible when some filter is active).
- Course modal reorganized into labeled sections (Overview / Course details / Entry requirements / How to apply) with the same real fields plus Campus and Study mode rows -- Study mode is "Contact us for details" since delivery mode per course isn't in the data and wasn't invented.
- The modal's "Enquire about this course" link now passes the real course name to the homepage's enquiry form via the same `?qcourse=` query-param handoff already built for the fee-quote tool (`index.html`'s existing prefill script, unchanged) -- previously this link carried no course context at all, so this closes a real, pre-existing functional gap using infrastructure that already existed, not new plumbing.

**Deliberately not done, each because no real data exists to do it honestly (listed because the client's own brief asked for exactly this disclosure):**
- **Testimonials**: none exist for this project. No fake names, quotes, or outcomes were written. No section was added to the homepage; the brief's own fallback for this case ("hide the section until approved content is supplied") was taken literally.
- **New campus/student photography**: no verified real McGill Institute Australia campus or student photos are available to this session. All existing photography is unchanged and was already disclosed as licensed stock imagery (see the site's own Terms/Disclaimer content and PRODUCT.md), not claimed as real campus or student photos -- that disclosure already satisfies the brief's "do not present stock imagery as real" requirement; no re-engineering was needed.
- **Dedicated course detail pages / new routes**: the existing course-detail modal already is this project's detail view. Building 7 separate static HTML files for 7 courses on a plain multi-page site (no templating/build step) would duplicate course content across files, directly against the brief's own "single maintainable source of truth" and "do not create duplicate routes" instructions. The modal was reorganized in place instead.
- **A separate "featured courses" homepage section**: the existing Streams section already links into the same catalogue with the matching stream pre-filtered -- it already is the homepage's course-discovery entry point. Adding a second, parallel one would duplicate it and lengthen the homepage against the brief's own "don't add every section" instruction.
- **New institutional "trust" section**: RTO/CRICOS/ABN, address, FAQ, and legal content already exist and are unchanged; nothing verified was missing to add.
- **"Apply Now" button**: not added anywhere. There is no separate application pathway distinct from enquiry in this project; the brief explicitly says to use Apply Now "only when there is a genuine, working application pathway" and never to invent one.

### Campus & Location and Streams: explicit ivory/terracotta palette (2026-10-27)

**New, deliberate literal colors**, scoped to `#campus` and `#streams` only: `#FFF8EF` (warm ivory base), `#FCE5D5` (soft peach), `#D94F2B` (terracotta accent -- the "Parramatta"/"choice." headline highlights and both sections' decorative curves), plus `#10243A` (deep navy, used at ~7% opacity for the Streams "05" watermark's fill). These are close to but distinct from the sitewide `--off-white`/`--coral` tokens; they're client-specified exact hex values for these two sections, not a redefinition of those tokens, so nothing else on the page shifted. Flagged by the detector as "outside DESIGN.md colors" the first time it ran against this -- documenting it here, per the detector's own guidance, rather than suppressing it, since it's a real and intentional addition, now shared by both sections rather than one-off.

The first pass at this section's background (2026-10-26, see the Campus entry below) used the same blob technique as Streams but at 6-9% opacity -- too faint, and the client said so explicitly ("still looks plain and empty"). The next revision pushed the two corner curves to 30-34% opacity at 14-18px blur plus a soft blurred glow and a thin translucent outlined ring behind the contact-card/map row, and added the real photograph described below as a small (clamp 280-460px) rounded, drop-shadowed corner card.

**Superseded again (2026-10-27)**, against a reference screenshot the client attached: the photo was still "a small thumbnail or a separate floating picture card" by the client's own description, not the large, full-width-band treatment the reference showed (skyline clearly starting on the right and fading left into the cream, roughly spanning the full width of the hero down to the top of the card/map row). `.campus-photo` is now `position:absolute; top:0; left:0; right:0; height:clamp(220px,32vw,440px)` -- no border-radius, no shadow, reads as background rather than a card -- with its own `::after` fade overlay staying fully opaque cream through the heading column's actual width (verified by rendering the composite with real heading text positioned at its real column width before shipping; an earlier attempt that faded too early left "Your future starts in" partly readable over live skyline detail, which would have hurt the "without reducing text readability" requirement in production even though it looked passable in a flat-color mockup) before fading out by ~74% across, plus a gentler bottom fade into the card/map row. No longer hidden below 900px -- present at every width, but the mobile variant (`max-width:639px`) shrinks the band and pushes the fade to ~70%/95% since mobile headline text can wrap across nearly the full container width, where the desktop-tuned fade stops would risk the same readability problem.

The photo itself (`photos/campus-parramatta-skyline.jpg`) is the same real, CC BY-SA 3.0-licensed photograph as before (photographer: Saberwyn, via Wikimedia Commons, credited on-page in a `<figcaption>`) -- re-cropped from the original source to a taller 4:3-ish ratio (1600x1200, up from the previous 1400x656 wide strip) to suit the new full-height treatment, with `object-position: 78% center` keeping the buildings anchored toward the side that stays opaque. A same-session attempt to push the photo's color grade warmer (per the reference's golden-hour mood) via naive per-channel RGB scaling produced an off, slightly-cyan cast rather than genuine warmth and was discarded -- the shipped photo is untouched, natural daytime color; the warm mood instead comes from the cream/peach gradient and fade it sits within. A second Wikimedia candidate shot at actual sunset ("Sunset on Parramatta River", CC BY-SA 4.0) was also considered and rejected: the buildings read as near-black silhouettes against the sky, which would have undercut "modern buildings near the river" as a recognizable subject.

Consistent with this project's standing honesty rule around photography (see the Evidence-on-Hand / stock-imagery disclaimers elsewhere in this doc and in the site's own Disclaimer content): this is a real, attributed, unmodified-in-content photo of the suburb, not a generated image and not a claim that it depicts McGill's own campus.

**Known minor discrepancy:** the client's two most recent messages about this section gave two different hex values for "terracotta orange" -- `#D94F2B` (used when this section's palette was first added, also since adopted by Streams) and `#E64B2E` (given in the most recent message). The two are close enough to be visually near-identical; `#D94F2B` was kept for consistency with the already-shipped, already-documented shared value rather than introducing a third shade for an imperceptible difference. Flagged to the client directly rather than silently guessed at.

### Streams: wide balanced grid (2026-10-26 revision)

**Superseded the asymmetric "1 feature + 4 regular" grid from the prior Streams redesign** (feature card spanning 2 columns, Management/English as a `.stream-card--wide` 2-up second row) after client feedback that it produced a narrow-looking grid, uneven card sizing, and the fifth card isolating awkwardly at in-between widths. All 5 `.stream-card`s are now visually equal weight (no `--feature`/`--wide` modifiers, one consistent 4:3 photo ratio) in a grid that scales 1→2→3→5 columns (640px/980px/1360px breakpoints) rather than capping at 3-4; `.stream-card-body` and `.stream-card-cta { margin-top: auto }` keep every card's "Explore courses" link flush to the bottom regardless of description length, so row heights stay visually even.

`#streams` also gets its own wider content width (`#streams .container { max-width: 1400px }`, vs. the sitewide `.container`'s 1200px -- scoped to this section only, every other section keeps 1200px) and a shallower top/bottom padding (`clamp(2.5rem, 2rem + 2vw, 3.5rem)` vs. the generic section's fixed 6rem), both aimed at the "excessive empty ivory" complaint. The flat ivory fill is replaced by a vertical gradient (`#FFFDF8` → `--off-white` → `#FBF4EE`) plus two large, heavily blurred, low-opacity coral radial-gradient blobs (`#streams::before`/`::after`, 6-9% opacity) anchored off two corners -- decorative depth without a literal texture asset or anything bold enough to compete with the cards.

**Superseded again (2026-10-27)** -- same complaint as Campus's first pass: the 6-9% opacity blobs read as "still looks plain and empty" to the client. This revision, verified by rendering the gradient + corner elements as a flat image before shipping (an empty-canvas render confirmed the earlier pass was too faint and the new one isn't), pushes both corners to 28-30% opacity at 1-20px blur and merges the old inline "05" numeral (previously a `.streams-head-mark` flex sibling of the heading text) into the upper-right corner's own decorative layer as background-generated content (`#streams::before { content: "05"; ... }`), so it now reads as a faint watermark behind the content rather than a layout element beside it. Added matching soft glows behind `.streams-head` and `.stream-grid` individually, plus a thin translucent outlined ring behind the card row. The headline's emphasized word moved from none to `<em>choice.</em>` in terracotta, per the client's explicit ask.

Stacking is now fully explicit rather than relying on default grid-item behavior: `#streams` gets `isolation: isolate` (its own stacking context), every decorative pseudo-element is `z-index: 0`, and every real content layer (`.streams-head`, `.streams-head-text`, `.stream-grid`, `.stream-card`) is `position: relative; z-index: 1`. No negative z-index anywhere in this section -- a z-index:-1 pseudo-element can escape its own element's stacking context and render behind the section's (or even the page's) background if that context isn't airtight, which is a plausible contributor to earlier "invisible decoration" complaints; non-negative z-index paired with explicit positive stacking on real content sidesteps the question entirely.

The oversized outlined "05" numeral moved from an absolutely-positioned overlap (sitting in empty space to the heading's right) into a `.streams-head` flex row alongside a new `.streams-head-text` wrapper (eyebrow/h2/p), so it now deliberately fills the width the wider container opens up beside the heading instead of floating over unrelated whitespace. Still aria-hidden/decorative, still hidden below 760px, still degrades to a faint flat fill where `-webkit-text-stroke` isn't supported.

**Removed 2026-10-25:** the Trust Strip (a thin dark `RTO/CRICOS/ABN/address` accent bar that previously sat directly under the Hero) was removed at the client's request, along with the hero's own top badge row (the same RTO/CRICOS/PARRAMATTA line, plus the "Not affiliated with McGill University, Canada." disclaimer). Verified before removing: both facts remain clearly, persistently visible elsewhere — the site header's brand mark shows "RTO 45906 · Parramatta NSW" on every page view (it's `position: fixed`, so it never scrolls away), the footer carries the full `RTO 45906 · CRICOS 03678G · ABN 91 835 873 060` line, and the "not affiliated with McGill University Canada" disclaimer is also stated in the FAQ and the legal/footer text. This was a decluttering of two redundant instances, not a removal of the underlying disclosure, which a real CRICOS/RTO provider's marketing materials need to carry somewhere.

### Coral family (unchanged roles, now also carrying a Bento feature-tile background)
- **`--coral`** (#B23A1E, fixed): background fills with white text — primary buttons, the skip link, hover-fills. Also used as the start of the Why McGill Bento tile's gradient.
- **`--coral-deep`** (#5C1F11, fixed): hover-darken state; also the Bento tile gradient's end stop.
- **`--coral-bright`** (#C73F22, fixed): decorative fills (card corner-cuts, dots) and the hero's `<em>` emphasis — ~3.8:1 against the hero's dark backdrop, which clears WCAG's 3:1 **large-text** threshold when the `<em>` sits in the h1 (40–88px, bold). **Since 2026-10-26**, the emphasised phrase moved to the hero subtext (`.hero-lede`, ~18.4px/800-weight) when the client restructured the hero to headline="McGill Institute Australia" + subtext carrying the value prop — that size sits just under WCAG's 14pt/18.66px bold large-text cutoff, so the 3.8:1 figure is no longer a clean pass on its own. Added a dedicated, stronger `text-shadow` on `.hero-lede em` as the same defensive margin already used elsewhere on hero text, rather than picking a new color.
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

**Superseded, in stages, by 2026-10-26 — kept for history only.** The hero went through several real rebuilds after this was written: a 3-photo crossfade (described below, now gone) → a 20s/4-segment AI-video background with a text-swap hero (see the 2026-10-24 video-hero commit) → a 10s/3-segment AI-video with a Bento-card "focus dashboard" synced to the video (2026-10-25) → **current state (2026-10-26): a plain looping AI-video background with a simplified, constant headline + subtext + two CTAs ("Enquire Now", "Explore Courses"), no sync dashboard at all.** The simplification was explicit client direction toward a cleaner, more minimalist hero; the `--header-h`-based clearance padding and the AI-video disclosure line (`.hero-ai-disclosure`) both carry forward unchanged through every rebuild. The video itself (`videos/hero-focus-loop.mp4`) is confirmed AI-generated (Google Veo, via C2PA metadata) — see PRODUCT.md's 2026-10-25 note.

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
Unchanged content (RTO/CRICOS/ABN, the real legal entity, phone, email, legal-policy modals) under the existing OLED-deep dark fill — already matches the brief's "executive minimalist dark footer" intent. A "Powered by JobGen.ai" badge was initially held back (round 1) since it was, at the time, only a confirmed fact for a *different* project (Mountain Culture Guitar Lessons) — see DECISIONS.md. **Added 2026-10-25:** the client explicitly confirmed, when asked directly a second time, that JobGen.AI is genuinely involved in this build too, not just the other project; added as a plain-text credit in `.footer-bottom` alongside the reg-codes and copyright line.

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
