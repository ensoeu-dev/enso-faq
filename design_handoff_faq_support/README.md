# Handoff: ENSŌ Support · "Using ENSŌ" page

## Overview
A product **how-to & troubleshooting** support page for the ENSŌ 2026 electric
hookah: a hero, an interactive 5-step Quick Start, a labelled parts diagram, a
temperature-dial explainer, the three heat modes, and a troubleshooting
accordion — with a light/dark theme switch. This is the page consumers reach
from the website's Support link and from the in-box QR code.

## About the design files
The files in this bundle are **design references created in HTML** (a Design
Component prototype + the design-system tokens, components and assets it uses).
They show the intended look and behaviour — they are **not** production code to
ship as-is. The task is to **recreate this page in the `enso-faq` codebase's
environment** (React/Next/Vue/etc.), using that project's established patterns,
then wire in real functionality (search, real FAQ/troubleshooting data, the
contact action). If no framework is chosen yet, pick the most appropriate one.

`FaqPage.dc.html` is authored in this design system's `.dc.html` format and runs
only inside that tooling — treat it as the **visual + interaction reference**,
not a module to import.

## Fidelity
**High-fidelity.** Final colours, typography, spacing, imagery and interactions.
Recreate pixel-faithfully using the codebase's libraries; exact tokens below.

## Screens / Views
Single scrolling page, max content width **1080px**, centred, 40px side padding.
Two themes (dark default / light), toggled in the header.

1. **Header** — logo left; right: "Support" label + a Dark/Light segmented
   switch (pill, 1px hairline border, active option = amber fill + graphite text,
   inactive = transparent + muted text). Logo swaps white↔graphite by theme.
2. **Hero** — centred. Amber eyebrow "USER GUIDE · USING ENSŌ"; italic display
   H1 "Master your ritual." (Montserrat Light Italic, ~52px); one secondary
   paragraph.
3. **Quick Start (interactive)** — section eyebrow with a 48×2 amber rule. A row
   of **5 step tabs** (Inter ExtraBold amber number 01–05 + uppercase title:
   Charge / Fill / Pack / Tune / Enjoy). Below: a 2-column panel — left a
   centred line-art illustration (transparent PNG, white on dark / ink on light),
   right a "STEP 0X" eyebrow + italic title + explanation paragraph.
   **Behaviour:** hovering OR clicking a tab sets it active (full opacity + 2px
   amber top-border; inactive tabs 0.45 opacity, transparent border) and swaps
   the panel image + text. Default active = step 01.
4. **Know your ENSŌ** — 2-col: copy left, the labelled parts diagram (A–K)
   right, sized to 70% of its column, centred.
5. **Temperature control** — 2-col: the thermodial diagram left (70%, centred),
   copy right.
6. **Three modes** — 3 cards (Card component, themed): Regular / G-Mode /
   Blue-Mode, each with an amber tag, title, paragraph.
7. **Troubleshooting** — centred heading; SearchInput ("Search the guide…");
   4 chips (Heat / Battery / Cleaning / Draw); a Card wrapping an Accordion of
   6 Q&A (first open).
8. **CTA** — 48×2 amber rule, italic amber line "Still need a hand?", one amber
   primary Button "Contact support →".
9. **Footer** — transparent (inherits page). Centred: Red Dot badge (~104px,
   white on dark / colour on light), logo (~40px, themed), italic amber slogan
   "Your ritual. Without charcoal.", muted meta line
   "ENSŌ · 21+ only · ensoshisha.com/support · Red Dot Design Award 2026 Winner".

## Interactions & behaviour
- **Theme switch**: toggles every surface/text colour and swaps themed images
  (logo, Red Dot badge, all line-art illustrations) between white (dark) and
  ink (light) variants. Persist the choice (this prototype uses `localStorage`
  key `enso-guide-theme`). In-app, follow your own theming convention.
- **Quick Start**: hover/click → active step. Implement as tabs with the active
  step driving the figure + text. Transitions ~180ms ease on opacity/border.
- **Accordion**: single-open, amber +/− markers, ~220ms grid-rows expand.
- **Search / chips**: in this prototype they are static layout. In-app, wire
  search + category chips to filter the troubleshooting list.
- **Contact support**: primary CTA — route to your support/contact flow.
- Motion is quiet: short fades/position shifts (150–220ms ease-out). No bounce,
  no infinite loops. Respect `prefers-reduced-motion`.

## State management
- `theme`: 'dark' | 'light' (persisted).
- `activeStep`: 0–4 for Quick Start.
- `query` + `activeCategory`: troubleshooting filter (to be wired to real data).
- FAQ/troubleshooting items: fetch or import the real content set.

## Design tokens
Full token CSS is in `tokens/` (shipped here). Key values:

**Colour**
- Graphite `#1A1813` · BG-2 `#211F18` · Surface `#262420` · Surface-2 `#2E2C27`
  · Hairline (dark) `#3A3731`
- Paper `#FAF6EC` · Cream `#F0E8D8` · White `#FFFFFF` · Hairline (light) `#E3DDCC`
- Ink `#0A0A0A` · Warm-gray `#5A554B` · Cream-dim `#C4B99A` · Muted `#8A8070`
- **Amber `#C8943A`** (THE accent) · Amber-soft `#D4A758` (hover) ·
  Amber-ink `#A07020` (amber-as-text on light) · Burnt-orange `#CC5500` (pressed)

**Theme mapping (this page)**
| token | dark | light |
|---|---|---|
| page bg | `#1A1813` | `#FAF6EC` |
| body text | `#F0E8D8` | `#1A1813` |
| heading | `#F0E8D8` | `#0A0A0A` |
| secondary | `#C4B99A` | `#5A554B` |
| muted | `#8A8070` | `#8A8070` |
| hairline | `#3A3731` | `#E3DDCC` |
| amber | `#C8943A` (both) | |

**Type** — Montserrat (200/300/400/500 + Light Italic); Inter ExtraBold (800)
for numbers only (the step 01–05 figures).
- Display editorial: Montserrat **Light Italic**, ~52px H1 / ~32px H2, lh ~1.12
- H3 / mode name: Medium ~18–30px
- Body: Light 15–16px, lh 1.7–1.75
- Eyebrow: Medium 11–12px, UPPERCASE, letter-spacing .25–.28em, amber
- Step number: Inter 800, ~24px, amber

**Spacing** — 8-pt scale (4/8/12/16/24/32/48/64). Sections breathe at ~88px top.
**Radius** — chips 6 · notes 8 · cards 12 · panels 16 · pills 999.
**Lines** — 1px hairlines; the signature **48×2px amber divider** opens sections.
Cards are defined by an **inset 1px hairline**, not drop shadows.

## Components used (specs in `components/core-REFERENCE.md`)
That file bundles each component's usage note, TypeScript props, and reference
implementation. Rebuild these in your stack rather than importing the prototype:
- **Button** (`primary` amber CTA / `ghost` / `pill`; `tone`, `arrow`)
- **Card** (hairline surface, `tone`)
- **Chip** (amber-dim filter pill, `selected`)
- **SearchInput** (hairline field, `tone`)
- **Accordion** (`items`, `tone`, `defaultOpenIndex`; amber +/− markers)
- Also available: Eyebrow, AmberDivider, SpecRow, Callout, Stat, Logo.

## Assets (included under `assets/`)
- `logo/enso-lockup-horizontal-white.png` + `enso-lockup-graphite.png` (themed)
- `badges/reddot-winner-2026-white.png` + `reddot-winner-2026.png` (themed)
- `manual/` — line-art illustrations extracted from the printed user guide,
  keyed to **transparent** PNG, in white (dark theme) + `-ink` (light theme)
  pairs: `parts-diagram`, `temp-dial`, and the 5 step figures
  `step-charge / step-fill / step-pack / step-tune / step-enjoy`.
  Source: ENSŌ 2026 User Guide PDF. Re-export from the PDF if higher res needed.

## Files in this bundle
- `FaqPage.dc.html` — the page design + interaction reference (Design Component).
- `styles.css`, `tokens/*.css` — the global token CSS (link `styles.css`).
- `components/core-REFERENCE.md` — every core component's usage, props & impl.
- `assets/*` — logos, badges, and line-art illustrations.
- For full brand voice & rules, see the design system's root `readme.md` and
  `SKILL.md` (in the parent project).

## Coming back to tweak the design later
The **design system project remains the source of truth** for visuals. The app
**consumes the token CSS directly** (see `CONSUMING-TOKENS.md`): copy
`styles.css` + `tokens/` into the repo, import once, and build against
`var(--…)`. Then a design tweak here is just a refresh of those CSS files —
component code never changes. Keep production logic in `enso-faq` and design
intent here so the two stay cleanly separated.
