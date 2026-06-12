# Consuming ENSŌ design tokens (recommended)

**Goal:** design tweaks made in the design-system project flow into `enso-faq`
as a CSS update — no hand-edited hex values in app code.

## The model
- `styles.css` is the single entry point. It only `@import`s the token files in
  `tokens/` (`colors.css`, `typography.css`, `spacing.css`, `fonts.css`). Link
  **one** file and you get every CSS custom property + the webfont `@font-face`.
- Tokens come in two layers — reference whichever fits:
  - **Raw scale:** `--enso-graphite`, `--enso-amber`, `--enso-cream`, …
  - **Semantic aliases (prefer these):** `--text-body`, `--text-heading`,
    `--surface-card`, `--accent`, `--accent-hover`, `--hairline-light`, …
- In components, use the variables — never paste the hex:
  ```css
  .cta { background: var(--accent); color: var(--on-accent); }
  .card { background: var(--surface-card); box-shadow: inset 0 0 0 1px var(--hairline-light); }
  ```

## Wiring it into the app
1. Copy `styles.css` + the `tokens/` folder into the repo (e.g.
   `src/styles/enso/`), keeping the relative `@import` paths intact.
2. Import once at the app root: `import './styles/enso/styles.css'` (or link it).
3. Build UI against `var(--…)`. Light/dark: set the theme by swapping the
   handful of semantic vars on a root element (see the support page's theme map
   in the main README) rather than rewriting component styles.

## Keeping it in sync (pick one)
- **Git submodule** — add this design-system repo as a submodule under
  `src/styles/enso/`; `git submodule update --remote` to pull design changes.
  Cleanest separation; explicit version bumps.
- **Published package** — publish the token CSS as a small internal package
  (e.g. `@enso/tokens`) and `npm update` to adopt changes. Best if multiple
  apps consume it.
- **Copy-on-change** — simplest: re-copy `styles.css` + `tokens/` when design
  changes. Fine for a single app; least automated.

**Recommendation:** start with **copy-on-change** to move fast, and graduate to
a **submodule or package** once the token set stabilises. Either way, the app
references `var(--…)`, so adopting a design tweak is just refreshing these CSS
files — component code never changes.

## What stays hard-coded
Only truly one-off, page-specific values that aren't part of the system. If you
find yourself repeating a literal, it probably deserves to become a token here
first, then be consumed — not duplicated in the app.
