# ENSŌ FAQ

A simple troubleshooting and FAQ web page for the ENSŌ electronic shisha device, sold at [ensoshisha.eu](https://ensoshisha.eu).

## Purpose

Help ENSŌ owners quickly diagnose and fix common issues with their device.

## Status

The support page is implemented as a static site — no build step needed.

- `index.html` — the page (open it directly, or serve the folder with any web server)
- `css/enso/` — design tokens copied from the design system (refresh these when the design changes; see `design_handoff_faq_support/CONSUMING-TOKENS.md`)
- `css/page.css` — page styles, built on the tokens
- `js/app.js` — theme switch, quick-start steps, accordion, search & category filters
- `assets/` — logos, badges and manual illustrations
- `design_handoff_faq_support/` — the original design reference (not used by the live page)

The "Contact support" button currently opens an email to `support@ensoshisha.eu` — change the address in `index.html` if support lives elsewhere.
