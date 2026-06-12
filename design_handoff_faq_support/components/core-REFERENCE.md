# ENSŌ Core Components — reference

Reference implementations + props contracts for the design-system primitives used by the support page. **Rebuild these in your app stack** (do not import the prototype `.jsx`). Each section has the usage note, the TypeScript props, and the reference implementation.


---

## Button

**Button** — the brand's action element; amber `primary` is the one CTA per screen, `ghost` is the secondary, `pill` matches the marketing site.

```jsx
<Button variant="primary" arrow>Order ENSŌ 2026</Button>
<Button variant="ghost">Learn more</Button>
<Button variant="pill" tone="dark">Contact support</Button>
```

- **variant**: `primary` (amber block, sharp corners), `ghost` (1px hairline), `pill` (rounded 999, site-compatible).
- **tone**: `light` | `dark` — flips ghost/pill colors for the surface.
- **size**: `sm` · `md` · `lg`. **arrow**: trailing →.
- Never place two amber `primary` buttons on one screen. Text is always UPPERCASE, tracked 0.14em.

### Props
```ts
import * as React from 'react';

/**
 * ENSŌ primary action. Amber `primary` block is the single CTA per screen;
 * `ghost` is the secondary outline; `pill` matches the marketing site.
 *
 * @startingPoint section="Core" subtitle="Amber CTA, ghost & pill variants" viewport="700x160"
 */
export interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  /** Visual style. @default "primary" */
  variant?: 'primary' | 'ghost' | 'pill';
  /** Surface the button sits on. @default "light" */
  tone?: 'light' | 'dark';
  /** @default "md" */
  size?: 'sm' | 'md' | 'lg';
  /** Show a trailing → arrow. @default false */
  arrow?: boolean;
  disabled?: boolean;
  /** Render as an anchor instead of a button. */
  href?: string;
  onClick?: () => void;
}

export function Button(props: ButtonProps): JSX.Element;
```

### Reference implementation
```jsx
import React from 'react';

/**
 * ENSŌ Button.
 * Three variants: `primary` (amber block, sharp corners — the one CTA per
 * screen), `ghost` (1px hairline outline), and `pill` (rounded site button).
 * Works on light (paper) and dark (graphite) surfaces via `tone`.
 */
export function Button({
  children,
  variant = 'primary',
  tone = 'light',
  size = 'md',
  arrow = false,
  disabled = false,
  href,
  onClick,
  style,
  ...rest
}) {
  const dark = tone === 'dark';

  const pads = {
    sm: '12px 24px',
    md: '17px 36px',
    lg: '20px 44px',
  };

  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    fontFamily: 'var(--font-sans)',
    fontWeight: 'var(--fw-medium)',
    fontSize: size === 'sm' ? '12px' : '13px',
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    lineHeight: 1,
    padding: pads[size] || pads.md,
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    textDecoration: 'none',
    transition: 'background-color .18s ease, color .18s ease, box-shadow .18s ease, transform .12s ease',
    boxSizing: 'border-box',
    WebkitFontSmoothing: 'antialiased',
  };

  const variants = {
    primary: {
      background: 'var(--enso-amber)',
      color: 'var(--enso-graphite)',
      borderRadius: 0,
    },
    ghost: {
      background: 'transparent',
      color: dark ? 'var(--enso-cream)' : 'var(--enso-graphite)',
      boxShadow: dark
        ? 'inset 0 0 0 1px var(--enso-cream)'
        : 'inset 0 0 0 1px var(--enso-graphite)',
      borderRadius: 0,
    },
    pill: {
      background: dark ? 'var(--enso-cream)' : 'var(--enso-ink)',
      color: dark ? 'var(--enso-graphite)' : 'var(--enso-cream)',
      borderRadius: 'var(--radius-pill)',
    },
  };

  const [hover, setHover] = React.useState(false);
  const hoverStyle = !disabled && hover ? {
    primary: { background: 'var(--enso-amber-soft)' },
    ghost: dark
      ? { background: 'rgba(240,232,216,0.06)' }
      : { background: 'var(--enso-amber-dim)' },
    pill: { opacity: 0.88 },
  }[variant] : null;

  const Tag = href ? 'a' : 'button';

  return (
    <Tag
      href={href}
      onClick={disabled ? undefined : onClick}
      disabled={Tag === 'button' ? disabled : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ ...base, ...variants[variant], ...hoverStyle, ...style }}
      {...rest}
    >
      {children}
      {arrow && <span aria-hidden="true" style={{ fontWeight: 'var(--fw-light)' }}>→</span>}
    </Tag>
  );
}
```

---

## Eyebrow

**Eyebrow** — the uppercase, tracked, amber label that sits above page titles, section headers and stats.

```jsx
<Eyebrow>Refined for 2026 · 01</Eyebrow>
```

- Always amber, UPPERCASE, tracked 0.26em, Montserrat Medium.
- Use ` · ` middots to append an index or category.

### Props
```ts
import * as React from 'react';

/** Uppercase, amber, tracked eyebrow label that opens sections and titles. */
export interface EyebrowProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  /** Reserved for future inversion; eyebrows are amber on both surfaces. @default "light" */
  tone?: 'light' | 'dark';
  /** Element to render. @default "div" */
  as?: keyof JSX.IntrinsicElements;
}

export function Eyebrow(props: EyebrowProps): JSX.Element;
```

### Reference implementation
```jsx
import React from 'react';

/**
 * ENSŌ Eyebrow — the uppercase, tracked, amber label that opens sections,
 * cards and page titles. The most recognisable type signal in the system.
 */
export function Eyebrow({ children, tone = 'light', as = 'div', style, ...rest }) {
  const Tag = as;
  return (
    <Tag
      style={{
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--type-eyebrow-size)',
        fontWeight: 'var(--fw-medium)',
        letterSpacing: 'var(--type-eyebrow-ls)',
        textTransform: 'uppercase',
        lineHeight: 1,
        color: 'var(--enso-amber)',
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
```

---

## AmberDivider

**AmberDivider** — the 48×2px amber bar that opens sections, or a full-width hairline rule.

```jsx
<AmberDivider />
<AmberDivider full tone="dark" />
```

- Default is the short amber mark — a signature ENSŌ device. Use sparingly, one per section.
- `full` swaps to a 1px hairline (`#E3DDCC` light / `#3A3731` dark).

### Props
```ts
import * as React from 'react';

/** Signature 48×2 amber section mark, or a full-width hairline when `full`. */
export interface AmberDividerProps extends React.HTMLAttributes<HTMLElement> {
  /** Render a 1px full-width hairline instead of the amber mark. @default false */
  full?: boolean;
  /** Hairline color picks light/dark surface. @default "light" */
  tone?: 'light' | 'dark';
}

export function AmberDivider(props: AmberDividerProps): JSX.Element;
```

### Reference implementation
```jsx
import React from 'react';

/**
 * ENSŌ AmberDivider — the signature 48×2px amber bar that opens sections.
 * Set `full` for a 1px hairline rule across the container instead.
 */
export function AmberDivider({ full = false, tone = 'light', style, ...rest }) {
  if (full) {
    return (
      <hr
        style={{
          border: 'none',
          height: '1px',
          width: '100%',
          background: tone === 'dark' ? 'var(--hairline-dark)' : 'var(--hairline-light)',
          margin: 0,
          ...style,
        }}
        {...rest}
      />
    );
  }
  return (
    <div
      aria-hidden="true"
      style={{
        width: 'var(--amber-divider-width)',
        height: 'var(--amber-divider-height)',
        background: 'var(--enso-amber)',
        ...style,
      }}
      {...rest}
    />
  );
}
```

---

## Chip

**Chip** — category / filter pill in amber-dim with an amber hairline.

```jsx
<Chip selected>Device</Chip>
<Chip>Heat</Chip>
<Chip>Battery</Chip>
```

- Reads the same on light and dark (amber tint works on both).
- `selected` deepens fill + border. Keep labels one word where possible.

### Props
```ts
import * as React from 'react';

/** Category / filter chip: amber-dim fill, amber hairline, amber-ink text. */
export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  /** Deepen the fill to mark the active filter. @default false */
  selected?: boolean;
  onClick?: () => void;
}

export function Chip(props: ChipProps): JSX.Element;
```

### Reference implementation
```jsx
import React from 'react';

/**
 * ENSŌ Chip — category / filter pill. Amber-dim fill with an amber hairline
 * border and amber-ink text. `selected` deepens the fill.
 */
export function Chip({ children, selected = false, onClick, style, ...rest }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        fontFamily: 'var(--font-sans)',
        fontWeight: 'var(--fw-medium)',
        fontSize: '12px',
        color: 'var(--enso-amber-ink)',
        background: selected
          ? 'rgba(200,148,58,0.22)'
          : (hover ? 'rgba(200,148,58,0.18)' : 'var(--enso-amber-dim)'),
        boxShadow: `inset 0 0 0 1px ${selected ? 'rgba(200,148,58,0.55)' : 'var(--enso-amber-border)'}`,
        borderRadius: 'var(--radius-chip)',
        border: 'none',
        padding: '9px 16px',
        cursor: 'pointer',
        lineHeight: 1,
        transition: 'background-color .16s ease, box-shadow .16s ease',
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
```

---

## Card

**Card** — the base surface, defined by a hairline rather than a shadow.

```jsx
<Card tone="light">…</Card>
<Card tone="dark" pad={false}>…</Card>
```

- Light: white fill + `#E3DDCC` inset hairline. Dark: `#262420` fill + `#3A3731` hairline.
- 12px radius, 26px padding by default. ENSŌ avoids drop shadows — depth comes from the surface stack.

### Props
```ts
import * as React from 'react';

/**
 * Base surface card — hairline-defined, no drop shadow.
 *
 * @startingPoint section="Core" subtitle="Hairline card on paper or graphite" viewport="700x220"
 */
export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  /** Light (paper/white) or dark (graphite stack). @default "light" */
  tone?: 'light' | 'dark';
  /** Apply the 26px card padding. @default true */
  pad?: boolean;
}

export function Card(props: CardProps): JSX.Element;
```

### Reference implementation
```jsx
import React from 'react';

/**
 * ENSŌ Card — the base surface. Defined by a hairline, not a shadow.
 * Light: white fill + #E3DDCC inset hairline. Dark: #262420 fill, optional
 * #3A3731 hairline. Padding defaults to the 26px card constant.
 */
export function Card({ children, tone = 'light', pad = true, style, ...rest }) {
  const dark = tone === 'dark';
  return (
    <div
      style={{
        background: dark ? 'var(--enso-surface)' : 'var(--surface-card)',
        boxShadow: dark
          ? 'inset 0 0 0 1px var(--hairline-dark)'
          : 'inset 0 0 0 1px var(--hairline-light)',
        borderRadius: 'var(--radius-card)',
        padding: pad ? 'var(--card-padding)' : 0,
        color: dark ? 'var(--text-body-dark)' : 'var(--text-body)',
        fontFamily: 'var(--font-sans)',
        boxSizing: 'border-box',
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
```

---

## SearchInput

**SearchInput** — hairline text field, 8px radius, muted placeholder.

```jsx
<SearchInput value={q} onChange={e => setQ(e.target.value)} />
```

- Default placeholder is the canonical "Search the ritual…".
- `tone="dark"` switches to the `#262420` surface with a dark hairline.

### Props
```ts
import * as React from 'react';

/** Hairline search field with the canonical "Search the ritual…" placeholder. */
export interface SearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  /** @default "Search the ritual…" */
  placeholder?: string;
  /** @default "light" */
  tone?: 'light' | 'dark';
}

export function SearchInput(props: SearchInputProps): JSX.Element;
```

### Reference implementation
```jsx
import React from 'react';

/**
 * ENSŌ SearchInput — hairline field, 8px radius, muted placeholder.
 * Canonical placeholder: "Search the ritual…".
 */
export function SearchInput({
  value,
  onChange,
  placeholder = 'Search the ritual…',
  tone = 'light',
  style,
  ...rest
}) {
  const dark = tone === 'dark';
  return (
    <input
      type="search"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        width: '100%',
        boxSizing: 'border-box',
        fontFamily: 'var(--font-sans)',
        fontWeight: 'var(--fw-light)',
        fontSize: '14px',
        color: dark ? 'var(--enso-cream)' : 'var(--enso-graphite)',
        background: dark ? 'var(--enso-surface)' : 'var(--enso-white)',
        boxShadow: dark
          ? 'inset 0 0 0 1px var(--hairline-dark)'
          : 'inset 0 0 0 1px var(--hairline-light)',
        border: 'none',
        borderRadius: 'var(--radius-note)',
        padding: '15px 18px',
        outline: 'none',
        ...style,
      }}
      {...rest}
    />
  );
}
```

---

## SpecRow

**SpecRow** — a labelled spec line (uppercase muted label + value) divided by a hairline.

```jsx
<SpecRow label="Battery" value="5,000 mAh · swap-out · 4 LED" />
<SpecRow label="Pre-heat" value="5 minutes" />
```

- Stack several to build a spec table. First row can set `divider={false}`.
- Values use ` · ` middots to separate facts.

### Props
```ts
import * as React from 'react';

/** Labelled spec line — uppercase muted label, value, hairline above. */
export interface SpecRowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Left-hand uppercase label, e.g. "BATTERY". */
  label: React.ReactNode;
  /** Right-hand value, e.g. "5,000 mAh · swap-out · 4 LED". */
  value: React.ReactNode;
  /** @default "light" */
  tone?: 'light' | 'dark';
  /** Hairline above the row. @default true */
  divider?: boolean;
}

export function SpecRow(props: SpecRowProps): JSX.Element;
```

### Reference implementation
```jsx
import React from 'react';

/**
 * ENSŌ SpecRow — a labelled spec line with a hairline above. Uppercase muted
 * label on the left, value on the right. Used in spec lists and cards.
 */
export function SpecRow({ label, value, tone = 'light', divider = true, style, ...rest }) {
  const dark = tone === 'dark';
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        gap: '24px',
        padding: '14px 0',
        borderTop: divider
          ? `1px solid ${dark ? 'var(--hairline-dark)' : 'var(--hairline-light)'}`
          : 'none',
        fontFamily: 'var(--font-sans)',
        ...style,
      }}
      {...rest}
    >
      <span style={{
        fontSize: '10px',
        fontWeight: 'var(--fw-medium)',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'var(--enso-muted)',
        whiteSpace: 'nowrap',
      }}>{label}</span>
      <span style={{
        fontSize: '13px',
        fontWeight: 'var(--fw-light)',
        textAlign: 'right',
        color: dark ? 'var(--enso-cream)' : 'var(--enso-graphite)',
      }}>{value}</span>
    </div>
  );
}
```

---

## Callout

**Callout** — a soft amber note for shipping lines, reassurances and asides.

```jsx
<Callout>Ships globally from our warehouses · ~2 weeks delivery.</Callout>
```

- 10% amber fill, 35% amber hairline, amber-ink text. Reads on light and dark.
- Keep copy short and factual — never a health claim, never hype.

### Props
```ts
import * as React from 'react';

/** Soft amber note — 10% fill, amber hairline, amber-ink text. */
export interface CalloutProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export function Callout(props: CalloutProps): JSX.Element;
```

### Reference implementation
```jsx
import React from 'react';

/**
 * ENSŌ Callout — a soft amber note. 10% amber fill, 35% amber hairline,
 * amber-ink text, 8px radius. For shipping notes, reassurances, asides.
 */
export function Callout({ children, style, ...rest }) {
  return (
    <div
      style={{
        background: 'rgba(200,148,58,0.10)',
        boxShadow: 'inset 0 0 0 1px rgba(200,148,58,0.35)',
        borderRadius: 'var(--radius-note)',
        padding: '16px 22px',
        fontFamily: 'var(--font-sans)',
        fontWeight: 'var(--fw-light)',
        fontSize: '13px',
        lineHeight: 1.5,
        color: 'var(--enso-amber-ink)',
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
```

---

## Accordion

**Accordion** — the FAQ row group; question in Medium, answer in Light, amber +/− markers.

```jsx
<Accordion
  defaultOpenIndex={0}
  items={[
    { q: 'Does ENSŌ use charcoal?', a: 'No. ENSŌ is fully electronic — controlled heat from 180 to 330 °C. No charcoal, no ash, no open flame.' },
    { q: 'How long does one charge last?', a: '…' },
  ]}
/>
```

- Rows are divided by hairlines; the open row shows the answer with a `−`.
- `tone="dark"` inverts to graphite surfaces with cream text.

### Props
```ts
import * as React from 'react';

/**
 * FAQ accordion — Medium question, Light answer, amber +/− markers.
 *
 * @startingPoint section="Core" subtitle="FAQ accordion with amber +/− markers" viewport="700x320"
 */
export interface AccordionItem {
  q: React.ReactNode;
  a: React.ReactNode;
}

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  items: AccordionItem[];
  /** @default "light" */
  tone?: 'light' | 'dark';
  /** Index open on mount, -1 for all closed. @default -1 */
  defaultOpenIndex?: number;
}

export function Accordion(props: AccordionProps): JSX.Element;
```

### Reference implementation
```jsx
import React from 'react';

/**
 * ENSŌ Accordion — FAQ row group. Question in Medium, answer in Light,
 * amber +/− markers. Hairline between rows. Uncontrolled by default; pass
 * `defaultOpenIndex` to open one on mount.
 */
export function Accordion({ items = [], tone = 'light', defaultOpenIndex = -1, style, ...rest }) {
  const [open, setOpen] = React.useState(defaultOpenIndex);
  const dark = tone === 'dark';
  const line = dark ? 'var(--hairline-dark)' : 'var(--hairline-light)';

  return (
    <div style={{ fontFamily: 'var(--font-sans)', ...style }} {...rest}>
      {items.map((it, i) => {
        const isOpen = open === i;
        return (
          <div key={i} style={{ borderTop: i === 0 ? 'none' : `1px solid ${line}` }}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '18px 0',
                textAlign: 'left',
                color: dark ? 'var(--enso-cream)' : 'var(--enso-graphite)',
                fontFamily: 'var(--font-sans)',
                fontWeight: 'var(--fw-medium)',
                fontSize: '14px',
                lineHeight: 1.3,
              }}
            >
              <span>{it.q}</span>
              <span aria-hidden="true" style={{
                color: 'var(--enso-amber)',
                fontWeight: 'var(--fw-light)',
                fontSize: '20px',
                lineHeight: 1,
                flexShrink: 0,
              }}>{isOpen ? '−' : '+'}</span>
            </button>
            <div style={{
              display: 'grid',
              gridTemplateRows: isOpen ? '1fr' : '0fr',
              transition: 'grid-template-rows .22s ease',
            }}>
              <div style={{ overflow: 'hidden' }}>
                <p style={{
                  margin: 0,
                  padding: '0 0 20px',
                  fontWeight: 'var(--fw-light)',
                  fontSize: '13.5px',
                  lineHeight: 1.7,
                  color: dark ? 'var(--enso-cream-dim)' : 'var(--enso-warm-gray)',
                  maxWidth: '52ch',
                }}>{it.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
```

---

## Stat

**Stat** — a large figure set in Inter Extra Bold (the only place Inter appears) with a caption.

```jsx
<Stat value="20M+" caption="cumulative organic views" />
<Stat value="330 °C" caption="max controlled heat" accent />
```

- Use for numbers/stats only, on site & press surfaces.
- `accent` colors the figure amber; otherwise ink (light) / cream (dark).

### Props
```ts
import * as React from 'react';

/** Large data figure in Inter Extra Bold with a caption. Numbers only. */
export interface StatProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The figure, e.g. "20M+" or "330 °C". */
  value: React.ReactNode;
  /** Caption beneath, e.g. "cumulative organic views". */
  caption?: React.ReactNode;
  /** @default "light" */
  tone?: 'light' | 'dark';
  /** Render the figure in amber instead of ink/cream. @default false */
  accent?: boolean;
}

export function Stat(props: StatProps): JSX.Element;
```

### Reference implementation
```jsx
import React from 'react';

/**
 * ENSŌ Stat — a large number in Inter Extra Bold with a caption below.
 * Numbers/stats only, on site & press surfaces.
 */
export function Stat({ value, caption, tone = 'light', accent = false, style, ...rest }) {
  const dark = tone === 'dark';
  return (
    <div style={{ fontFamily: 'var(--font-sans)', ...style }} {...rest}>
      <div style={{
        fontFamily: 'var(--font-data)',
        fontWeight: 800,
        fontSize: 'var(--type-stat-size)',
        letterSpacing: '-0.02em',
        lineHeight: 1,
        color: accent ? 'var(--enso-amber)' : (dark ? 'var(--enso-cream)' : 'var(--enso-ink)'),
      }}>{value}</div>
      {caption && (
        <div style={{
          marginTop: '10px',
          fontWeight: 'var(--fw-light)',
          fontSize: '13px',
          color: dark ? 'var(--enso-cream-dim)' : 'var(--enso-warm-gray)',
        }}>{caption}</div>
      )}
    </div>
  );
}
```

---

## Logo

**Logo** — the ENSŌ wordmark lockup. The wordmark is sacred.

```jsx
{/* Official lockup image (preferred for real surfaces) */}
<Logo src="/assets/logo/enso-lockup-white.png" height={32} />

{/* Text wordmark fallback, always available */}
<Logo tone="dark" height={28} />
```

- Wordmark face: Montserrat Medium, letter-spacing **0**, macron **Ō** mandatory. Never amber, never tracked out, never light weight.
- Cream `#F0E8D8` on dark, graphite `#1A1813` on light.
- The brush ensō mark sits to the LEFT of the wordmark. Use `src` for the official lockup, or `markSrc` to add the mark beside the text wordmark.

### Props
```ts
import * as React from 'react';

/**
 * ENSŌ lockup. Wordmark is Montserrat Medium, letter-spacing 0, macron Ō
 * mandatory, never amber. Cream on dark, graphite on light.
 */
export interface LogoProps extends React.HTMLAttributes<HTMLElement> {
  /** Surface tone. @default "dark" */
  tone?: 'light' | 'dark';
  /** Rendered height in px. @default 30 */
  height?: number;
  /** Official lockup image (mark + wordmark). Overrides the text wordmark. */
  src?: string;
  /** Brush ensō mark image to place left of the text wordmark. */
  markSrc?: string;
}

export function Logo(props: LogoProps): JSX.Element;
```

### Reference implementation
```jsx
import React from 'react';

/**
 * ENSŌ Logo / wordmark lockup. The wordmark is sacred: Montserrat Medium,
 * letter-spacing 0, macron Ō mandatory, never amber.
 *
 * - Pass `src` to render the official lockup image (mark + wordmark).
 * - Otherwise the wordmark renders as text; pass `markSrc` to place the
 *   brush ensō mark to its left.
 */
export function Logo({
  tone = 'dark',
  height = 30,
  src,
  markSrc,
  style,
  ...rest
}) {
  const color = tone === 'dark' ? 'var(--enso-cream)' : 'var(--enso-graphite)';

  if (src) {
    return (
      <img
        src={src}
        alt="ENSŌ"
        style={{ height, width: 'auto', display: 'block', ...style }}
        {...rest}
      />
    );
  }

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: `${Math.round(height * 0.4)}px`,
        ...style,
      }}
      {...rest}
    >
      {markSrc && (
        <img src={markSrc} alt="" aria-hidden="true" style={{ height, width: 'auto', display: 'block' }} />
      )}
      <span
        style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 'var(--fw-medium)',
          fontSize: `${Math.round(height * 0.74)}px`,
          letterSpacing: 0,
          lineHeight: 1,
          color,
        }}
      >ENSŌ</span>
    </span>
  );
}
```
