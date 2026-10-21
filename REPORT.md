# Final Report — McGill Institute Australia `/loop` rebuild

**Status: deployed live** at https://tarunjindal787.github.io/mcgrill/ (commit `e35be8f`), per your explicit "committed and pushed and deploy it" instruction. The loop stopped here — at 2 iterations, not the full 12 — because you chose to ship rather than continue, and because the remaining gap (see below) can't be closed by more autonomous iteration in this environment.

## Final score table

| # | Item | Score | Iteration reached |
|---|---|---|---|
| 1 | Visual distinctiveness | 8/10 | 1 (not re-scored since) |
| 2 | Colour | **10/10** | 1, confirmed via the Stop-hook follow-up fix |
| 3 | Typography | 9/10 | 2 (raised from 7/10 by dropping the 3rd font family) |
| 4 | Layout and spacing | 8/10 | 1 (not re-scored since) |
| 5 | Responsiveness | 6/10 | 1 — **not independently verified** (see Known Limitation) |
| 6 | Accessibility | 8/10 | 1 — **not independently verified** (see Known Limitation) |
| 7 | Content quality | 9/10 | 2 (raised from 8/10 after a full proofread pass + fixing a broken `og:image` reference) |
| 8 | Conversion | 8/10 | 1 — **not independently verified** (see Known Limitation) |
| 9 | Trust | 9/10 | 1 (not re-scored since) |
| 10 | Performance | 9/10 | 1 (not re-scored since) |
| 11 | SEO and metadata | 8/10 | 1 — **not independently verified** (see Known Limitation) |
| 12 | Code quality | 9/10 | 2 (raised from 8/10: hardcoded tag colors moved into `:root`, dropped the 3rd font family) |

**Only item 2 (Colour) reached a genuine, confident 10/10.** The brief's own rule — "do not inflate scores... a 10 means you cannot name a single remaining improvement" — is why the rest stay below 10: for six of them (4, 5, 6, 8, 11, 12 all partly, and 5/6/8/11 most severely) I can name the exact remaining improvement, and it's the same one each time: **confirm it by actually rendering the page**, which this environment would not let me do.

## Known limitation (read this before trusting items 4/5/6/8/11/12 as "ready")

The brief requires rendering the page in a headless browser at 390/768/1280/1920px, taking screenshots, and scoring from them, not from memory. I tried this twice, in two separate sessions: navigating to a `file://` path failed outright, and running a local HTTP server and navigating to `localhost` was explicitly blocked by this sandbox's organisation policy both times. There was no local HTML validator or image tooling available either (disk space was exhausted, so `pip install` also failed). Every score above that touches rendering, spacing, or validated markup is therefore based on **careful code review and the Impeccable mechanical detector only** — not confirmed screenshots. This is disclosed in CHANGELOG.md as it happened, not just here at the end.

**What I'd suggest:** open the live site yourself at a few widths (a phone, a tablet, resizing a desktop browser) and in both light/dark mode, and tell me anything that looks wrong. That will almost certainly be faster and more reliable than further autonomous iteration in an environment that can't see its own output.

## Chosen design direction: "Parramatta Transit"

Three directions were drafted (full detail in DECISIONS.md): "Civic Ledger" (navy/terracotta, a credential-stamp motif), "Parramatta Transit" (indigo/amber/coral, a transit-line rail motif), and "Open Studio" (cream/terracotta/forest-green, hand-drawn craft icons). **Parramatta Transit was chosen** because it's the only one built from a fact unique to this specific brief — the two named train stations near campus — rather than a generic "vocational institute" mood. The transit-rail motif does real structural work in two different sections (the Educational Streams filter, and the How-to-Enrol pathway steps) instead of being a one-off decoration, which is what makes it a signature element rather than a surface treatment.

## Placeholders that need real content before launch

| Placeholder | Where | What's needed |
|---|---|---|
| `[PHONE]` | Campus section, footer | Real contact phone number |
| `[EMAIL]` | Campus section, footer | Real contact email address |
| Course fees | Every course card + modal | Real fee per course, or confirm "On enquiry" is the permanent policy |
| Course duration | Every course modal | Real duration per course |
| Course intake dates | Every course card + modal | Real next-intake date per course |
| Entry requirements | Pathway section, FAQ | Real per-course entry requirements |
| Campus/student photography | Study in Parramatta section | Real photo (explicitly marked placeholder currently — no stock photo was substituted) |
| Map embed | Campus & Location section | A real map embed (currently a static placeholder panel with a working "Get Directions" link to the verified address) |
| Privacy Policy | Footer | Full real policy text (currently a labelled placeholder paragraph) |
| Terms of Use | Footer | Full real terms text (currently a labelled placeholder paragraph) |
| Enquiry form backend | Enquiry section | The form is front-end only and does not submit anywhere — marked with a `TODO` comment in the HTML |
| `og:image` | `<head>` | No image tag was added at all (rather than reference a non-existent file) — add one once real photography or a brand asset exists |

## Facts you should verify before launch

- **RTO 45906, CRICOS 03678G, ABN 91 835 873 060** — carried over unchanged from your brief; not re-verified against any external source this round (no web research was done for this rebuild, per the brief's own instruction to use only the facts supplied).
- **Course names, codes, and disciplines** — same: used exactly as supplied, not independently re-verified.
- **Address** (Level 1, 30 Cowper St, Parramatta NSW 2150) and the claim that it's near Parramatta and Harris Park stations — as supplied, not independently re-verified.
- Everything under "Placeholders" above, by definition.

## Deploy steps (already completed, for your records)

The site is already live — this is what I ran, for your reference or to repeat if you make further changes locally:

```
git add index.html DESIGN.md DECISIONS.md CHANGELOG.md REPORT.md
git commit -m "<message>"
git push origin main
```

GitHub Pages was already configured on this repo (serving from `main` branch root) from earlier work, so the push alone triggered the deploy — no additional Pages configuration was needed. I polled `gh api repos/tarunjindal787/mcgrill/pages/builds/latest` until it reported `status: "built"` and confirmed the built commit SHA matched the one just pushed (`e35be8f`).

Live URL: **https://tarunjindal787.github.io/mcgrill/**
