# ENSŌ Support Page — project guide

Customer support / troubleshooting page for the ENSŌ 2026 electric hookah
(sold at ensoshisha.eu). This file is the canonical context for the project —
read it first.

## What it is / stack
- **Plain static site.** No framework, no build step. Hand-written HTML/CSS/JS.
- `index.html` — the whole page (hero, interactive Quick Start, parts diagram,
  temperature dial, three modes, the guided troubleshooter, CTA, footer).
- `css/enso/` — design tokens copied from a **separate Claude design-system
  project** (the source of truth for visuals). Consume via `var(--…)`, never
  hard-code hex. Refresh = re-copy `styles.css` + `tokens/` (see
  `design_handoff_faq_support/CONSUMING-TOKENS.md`).
- `css/page.css` — page styles, built entirely on the tokens.
- `js/app.js` — theme switch (localStorage `enso-guide-theme`), Quick Start
  step tabs + pro tips, smooth-scroll in-page jump links (`[data-scroll-to]`).
- `js/troubleshooter.js` — the guided "When something's off." troubleshooter.
- `js/troubleshooting-data.js` — **generated**, do not hand-edit.
- `design_handoff_faq_support/` — original design reference (not used at runtime;
  contains `{{ }}` template syntax — see `.nojekyll` note below).

## Hosting / deploy
- **GitHub Pages**, repo `ensoeu-dev/enso-faq`, branch `main`. **Public repo.**
- **Auto-deploys on every push to `main`** (~1–3 min, occasionally longer).
- Live (staging): **https://ensoeu-dev.github.io/enso-faq/**
- `.nojekyll` at repo root is **required** (Jekyll chokes on the `{{ }}` in the
  design-handoff files). Don't remove it.
- `<meta name="robots" content="noindex">` is in `index.html` on purpose — keeps
  the staging URL out of search. **Remove it when going to a production domain.**
- "Contact support" → `mailto:support@ensoshisha.eu` (in `index.html` CTA and
  `js/troubleshooter.js` `SUPPORT_EMAIL`).

## The guided troubleshooter (main feature)
Driven by a spreadsheet so non-developers maintain content.

- **Master:** `data/troubleshooting-master.xlsx` — **git-ignored on purpose**
  (public repo; it holds internal warranty notes). One row = one possible result
  of one check, grouped by Issue in Step order. The "How to use" tab documents
  every column.
- **Import:** `.venv/bin/python scripts/import_troubleshooting.py` reads the
  master → writes `js/troubleshooting-data.js` (sets
  `window.ENSO_TROUBLESHOOTING`), **dropping the internal column**.
- **Flow codes** ("Then…" column): Solved / Next step / Contact support →
  `solved` / `next` / `support`. A "Next step" row MUST have guidance text
  (the importer errors otherwise).
- **Image column** conventions: asset base name (e.g. `led-temp`); comma-separate
  for multiple side-by-side; `@NN` scales one (`dial-turn@60` = 60%); trailing
  `!` = show on the "try this" fix step only, not the question
  (`battery-remove!`). Images otherwise show on **both** the question step and
  the try-this panel. Each figure needs a themed pair: `name.png` (white, dark
  theme) + `name-ink.png` (ink, light theme) in `assets/manual/`.

## Manual figures
- Source: `data/User_Guide_ENSO2026-compressed.pdf` (**git-ignored**, local only).
- Figures are vector line-art. Extract with **PyMuPDF** at 400 dpi, build alpha
  from luminance (white strokes → opaque, dark bg → transparent), trim, then save
  white + ink (`#0A0A0A`) variants ≤ ~400px tall, optimized PNG. See git history
  of `scripts/` and past extractions for the recipe (window crop, then clean
  stray leader-lines via thin tall/wide vertical-run removal + connected
  components). Reuse existing `assets/manual/*` where one fits.

## Key decisions (don't relitigate)
- **Customer-only v1.** The master's warranty logic (HW versions, approve/reject)
  is internal — used only to decide where each branch routes; customers are sent
  to support, never shown approve/reject. Stays in the internal column, stripped
  at import.
- **Static-first, migratable.** Designed so the data layer can later move behind
  a small server (SQLite) to truly hide the KB; the troubleshooter reads through
  one source so the swap won't touch the UI.
- Cosmetic/packaging defects → route to support (humans judge), never reject on
  the page.
- SND-01 "mute mode" gets no image (manual doesn't illustrate it).

## Local dev / tooling
- **Python venv** at `.venv/` (git-ignored): `openpyxl`, `pymupdf`, `numpy`,
  `scipy`, `pillow`.
- **Preview server:** `.claude/launch.json` runs `scripts/dev_server.py`, a
  **no-cache** static server on port 8741 (plain `http.server` made the browser
  cache stale files — this fixes it). `dev_server.py` + the launch.json change
  are **kept local, not pushed** (per the maintainer). Use the preview_* tools,
  not Bash, for running/checking the server.
- Browser still needs **one hard refresh** (Cmd+Shift+R) after switching to the
  no-cache server to flush pre-existing cache; then normal refreshes are fresh.

## Workflow when changing things
1. Edit `data/troubleshooting-master.xlsx` (content) → re-run the import.
2. Verify in the preview — and **always check mobile (375px), not just desktop**
   (standing rule from the maintainer; the in-box QR sends people to a phone).
3. **Before any push:** grep the generated data for internal leakage
   (`drive.google`, `approved`, `rejected`, `HW0`, `cleaning glove`,
   `replace the main`, `internal note`, etc.) — must be clean. Confirm
   `data/*.xlsx`, `data/*.pdf`, `.venv` stay git-ignored.
4. Push only `main`; it auto-deploys. Confirm the live URL actually updated
   (curl the changed file) — don't assume.

## Gotchas
- Don't commit the master xlsx, the PDF, the venv, or the dev-server files.
- The generated data once got its Evidence column corrupted by a column insert;
  if numbers look off, restore Evidence from the last committed
  `js/troubleshooting-data.js` (it's the clean source) keyed by id+question+result.
- The page reads images/CSS/JS with **relative** paths (works under the `/enso-faq/`
  Pages subpath) — keep them relative.

## Current state (as of this writing)
Live and working: theme switch, Quick Start with pro tips + "Temperature control"
jump links (anchored to the dial image with a 32px gap), parts/dial/modes
sections, and the guided troubleshooter with 18 issues across 9 categories.
Manual illustrations are on the LED question (thermodial + LED indicator), the
charge/battery/reseat-tank fix steps, shown on both question and try-this.
