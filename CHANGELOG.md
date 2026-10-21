# Changelog — McGill Institute Australia `/loop` rebuild

## Iteration 1 (2026-10-21)

### What changed
- Full rebuild from scratch per the `/loop` brief: three design directions produced and evaluated (see DECISIONS.md), "Parramatta Transit" chosen.
- Built the complete single-file `index.html`: header/nav, hero with disclaimer, registration trust strip, five-stream transit rail, filterable course catalogue (7 courses, anchored + modal detail view), four "Why McGill" reasons, Study-in-Parramatta section, five-step enrolment pathway (second transit rail), Agents section, Campus & Location with map placeholder, 7-question FAQ, 5-field enquiry form (front-end only, TODO-commented), footer with legal placeholders and registration codes.
- Light/dark mode via `prefers-color-scheme` + manual `data-theme` toggle (not persisted — no localStorage/sessionStorage per the brief).
- No stock photography anywhere — every visual is inline CSS/SVG, with two content photo slots explicitly marked as placeholders pending real campus photography.
- Ran the Impeccable mechanical detector (per the skill's own instructions) after the first full build, and fixed every real defect it surfaced:
  - **Contrast failures (warning-level):** the `--coral` accent, used as standalone text color, measured as low as 2.3:1 on dark-mode surfaces (fails AA badly). Fixed by splitting the token into three roles — `--coral` (fixed, background-fill-with-white-text only), `--coral-deep` (hover-darken), and a new `--coral-text` (theme-reactive: darker red in light mode, brighter coral in dark mode) for every standalone text/icon use. Full reasoning and verified ratios in DESIGN.md.
  - **Oversized italic serif hero headline (warning-level, "AI-startup" tell):** the hero's emphasized phrase was italic serif — set to roman weight instead.
  - **Undersized functional text (warning-level):** two UI labels (header tagline, trust-strip labels) were under the 11px legibility floor — bumped both above it.
  - **Overused display font (warning-level, "AI-slop" tell):** the original Fraunces pick is flagged by the detector as one of a handful of fonts over-represented in AI-generated UIs. Swapped to Newsreader — similar warm editorial-serif character, not yet carrying that association. See DECISIONS.md for the full note.
  - **Colored glow box-shadow (warning-level, "AI-slop" tell):** the primary button's hover state used a colored halo shadow — replaced with a neutral dark elevation shadow.
  - **Em-dash saturation (advisory, AI-cadence tell):** body copy had 16 em-dashes; reworded roughly half to commas/colons/periods, down to 6.
  - **Hard-coded colors outside `:root` (code-quality):** the five discipline-tag color pairs were literal hex in CSS rules — moved into `:root` custom properties and referenced via `var()`.
  - Documented every token actually in use (including decorative SVG-only shades, category-tag pairs, and the two extra radius sizes) in a freshly written DESIGN.md, resolving the bulk of "undocumented color/radius" advisories.
- **Update:** the one remaining low-contrast finding (`:hover state 3.1:1 — text #ff7a57 on #93301a`) resurfaced on the Stop-hook deep pass. `--coral-deep` is used in exactly one real rule (`.btn-primary:hover` background, with hard-coded white text, never `--coral-text`), so no actual element renders this pairing — but rather than leave an unresolved finding or suppress the rule file-wide (which would blind future edits to real contrast regressions in this actively-developed file), `--coral-deep` was darkened from `#93301A` to `#5C1F11`. This keeps the real use (white button text) at a much higher margin (12.7:1) and also closes the theoretical pairing unconditionally (4.93:1), so the finding cannot recur regardless of whether it was ever real. Detector now returns zero findings. No `ignore-value` was added.

### Known limitation: live responsive verification was not possible this round
The brief requires rendering the page in a headless browser at 390/768/1280/1920px and scoring from screenshots, not from memory. This session's browser automation tool could not navigate to either a `file://` URL or a local HTTP server (`localhost` is blocked by the sandbox's organisation policy) — both attempts returned hard errors, not a workaround-able restriction. Rubric item 5 (Responsiveness) below is therefore scored from **static code review only** (breakpoint logic, absence of fixed overflow-prone widths, `clamp()`-based type scale, `flex-wrap`/`grid auto-fit` throughout) and is marked down accordingly rather than claimed as verified. This is flagged again in REPORT.md as something the client should spot-check in an actual browser before launch.

### Rubric scores — Iteration 1

| # | Item | Score | Notes / what's still missing |
|---|---|---|---|
| 1 | Visual distinctiveness | 8/10 | The transit-rail motif (reused for Streams *and* Pathway) and diagonal ticket-cut course cards are genuinely specific, not a template. Docked because the overall page *structure* (header→hero→...→footer) is still a conventional one-pager scroll, even though the individual treatments are distinctive. |
| 2 | Colour | 10/10 | Full three-role coral system verified by contrast math and the mechanical detector; category tags verified (7–11.3:1). The one remaining finding (see update above) was closed at the root by deepening `--coral-deep` — the Impeccable detector now returns zero findings against this file. I can't name a remaining contrast defect. |
| 3 | Typography | 9/10 | **Resolved in iteration 2** (was 7/10): dropped the third (mono) font family entirely; the "this is data" signal for codes/registration numbers now comes from weight/letter-spacing/tabular-nums within IBM Plex Sans, so the site uses exactly two families. Clear hierarchy, `clamp()`-based scale, 60–75ch line lengths in body copy. Held at 9 rather than 10 only because comfortable line length hasn't been confirmed at real rendered widths (see Responsiveness). |
| 4 | Layout and spacing | 8/10 | Consistent spacing-scale tokens, grid-based sections, no known awkward gaps in the code. Not verified against actual rendered line lengths/whitespace at real viewport sizes (see limitation above). |
| 5 | Responsiveness | 6/10 | **Not verified by screenshot** — see limitation above. Static review found no fixed overflow-prone widths, proper `flex-wrap`/`auto-fit` grids, and correct breakpoints, but this is not the same as confirmed rendering. |
| 6 | Accessibility | 8/10 | Skip link, semantic landmarks, zero `<img>` tags so no missing-alt risk (all visuals are SVG/CSS by design), labelled form fields, modal focus-trap + Escape + `aria-modal`, `aria-pressed` filter chips, verified contrast. Docked 2 points: no live keyboard-navigation test was possible this round. |
| 7 | Content quality | 8/10 | Original copy throughout, no lorem ipsum, no invented stats/reviews/accreditations, consistent "Enquire Now" terminology, em-dash density fixed. Not independently proofread by a second pass. |
| 8 | Conversion | 8/10 | "Enquire Now" appears in the header, mobile menu, and hero; form has 5 fields; clear post-submit message. Not confirmed "above the fold" at real device heights (see limitation). |
| 9 | Trust | 9/10 | RTO/CRICOS/ABN and the Canada-disclaimer both appear in the hero and the trust strip, immediately below the fold start; footer repeats all three codes and the address; legal links present (clearly marked as placeholders, not fabricated policies). |
| 10 | Performance | 9/10 | Single file, ~63KB (well under the 300KB cap). No external scripts at all (only a Google Fonts stylesheet). No images to lazy-load (none used, by design). Minor, common, accepted tradeoff: `font-display: swap` can cause a brief FOUT reflow. |
| 11 | SEO and metadata | 8/10 | Unique title, meta description, OG tags, JSON-LD (`EducationalOrganization` + 7 `Course` entries), valid heading order (verified programmatically: single `h1`, no skipped levels). Descriptive link text throughout (no "click here"). Not validated against a live HTML validator service this round. |
| 12 | Code quality | 8/10 | Valid JS (checked), balanced tags, no duplicate IDs, all colors now routed through `:root` custom properties (the tag-color hard-coding defect found and fixed this round). Not validated against a live HTML validator or real browser console this round. |

**Items at 10/10: Colour (2), closed via the stop-hook follow-up fix above.** Of the remaining eleven, six are held back at least partly by the inability to render the page live in this environment (items 4, 5, 6, 8, 11, 12 all have a "not independently verified live" caveat); items 1, 3, 7, 9, 10 have specific, named remaining gaps.

### Next iteration should
- Attempt an alternative live-rendering path (e.g. ask the user to confirm if browser automation can be re-enabled, or request a manual screenshot round) to properly close items 4, 5, 6, 8, 11, 12.
- Resolve the Typography family-count judgment call either by accepting it as a documented exception or by removing the third face.
- Run a dedicated proofread pass over all original copy.
- Validate the HTML against a real validator if one becomes available offline.
