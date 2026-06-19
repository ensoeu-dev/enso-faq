# ENSŌ FAQ

A simple troubleshooting and FAQ web page for the ENSŌ electronic shisha device, sold at [ensoshisha.eu](https://ensoshisha.eu).

## Purpose

Help ENSŌ owners quickly diagnose and fix common issues with their device.

## Status

The support page is implemented as a static site — no build step needed.

- `index.html` — the page (open it directly, or serve the folder with any web server)
- `css/enso/` — design tokens copied from the design system (refresh these when the design changes; see `design_handoff_faq_support/CONSUMING-TOKENS.md`)
- `css/page.css` — page styles, built on the tokens
- `js/app.js` — theme switch, quick-start steps, in-page jump links
- `js/troubleshooter.js` — the guided "When something's off." troubleshooter
- `js/troubleshooting-data.js` — generated data the troubleshooter reads (do not edit by hand)
- `assets/` — logos, badges and manual illustrations
- `design_handoff_faq_support/` — the original design reference (not used by the live page)

The "Contact support" button opens an email to `support@ensoshisha.eu` — change the address in `index.html` (CTA) and `js/troubleshooter.js` (`SUPPORT_EMAIL`) if support lives elsewhere.

## Troubleshooting content (the guided flow)

The "When something's off." section is a guided troubleshooter driven by a
spreadsheet, so non-developers can maintain the content.

- **Master spreadsheet:** `data/troubleshooting-master.xlsx` — one row per
  possible result of a check, grouped by issue. The "How to use" tab explains
  every column. **This file is git-ignored on purpose:** it holds internal
  warranty notes and this repo is public, so it lives on the maintainer's
  machine only.
- **Import step:** after editing the spreadsheet, regenerate the site data:

  ```
  .venv/bin/python scripts/import_troubleshooting.py
  ```

  This reads the master and writes `js/troubleshooting-data.js`, **dropping the
  internal-only columns** so they never reach the website.
- **One-time setup** for the import tool:

  ```
  python3 -m venv .venv && .venv/bin/pip install openpyxl
  ```

### Privacy note

Because the repo is public, only the *generated, stripped* data is committed —
never the master. Customer-facing solutions are still visible in the page source
(as with any static site). To truly hide the knowledge base, move it behind a
small server later; the troubleshooter reads its data through one place
(`window.ENSO_TROUBLESHOOTING`), so that swap won't touch the UI.
