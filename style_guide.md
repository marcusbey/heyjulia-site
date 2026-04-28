# HeyJulia.ai — Per-Business Style Guide

**Slug:** `0001-heyjulia.ai`
**Reference:** `reference.md` (Antimatter AI deep spec)
**Temperature (Playbook VII):** Cold cosmic violet. Single-temperature; never break into amber/sage/cream.
**Spirit:** Scientific, calm, expensive. A cosmology of a jobsite — the particle morph is audio becoming dashboard.

---

## Design tokens (CSS custom properties)

```css
:root {
  /* core palette — never #000 or #fff */
  --background:    #020202;
  --foreground:    #f6f6fd;
  --primary:       #3e3f7e;
  --accent:        #696aac;
  --secondary:     #a2a3e9;
  --tertiary:      #c7c8f2;
  --lightaccent:   #e3e3f8;

  /* surfaces */
  --card:          #0a0a0e;
  --card-border:   #1f1f26;
  --muted-fg:      #8a8a96;

  /* layout */
  --w-main:        1500px;
  --w-hero:        1280px;
  --gap-section:   clamp(96px, 12vw, 180px);

  /* motion — one named curve */
  --ease-arrival:  cubic-bezier(0.2, 0.8, 0.2, 1);
  --dur-micro:     250ms;
  --dur-std:       500ms;
  --dur-cine:      1000ms;

  /* button gradient (verbatim from reference §8.6) */
  --grad-primary:  linear-gradient(93.92deg, #8587e3 -13.51%, #4c4dac 40.91%, #696aac 113.69%);
}

::selection { background: var(--accent); color: var(--background); }
```

## Typography

- **Family:** Plus Jakarta Sans (self-hosted woff2 — `pjs-roman.woff2`, `pjs-roman-latin-ext.woff2`, `pjs-italic-700.woff2`).
- **H1:** 60–72px / weight 300 roman / line-height 1.0 / letter-spacing normal. Emphasis spans = 700 italic. **Weight-contrast, not size-contrast.**
- **H2:** 48–56px / weight 400.
- **Body:** 16–18px / weight 400.
- **Ghost watermark:** `text-[14vw] opacity-5 font-weight-700 color:var(--foreground)` — absolute, no-wrap, bleeds offscreen both sides.
- **Live clock:** 144px / weight 400 (Tailwind 8xl equivalent).
- **Button label:** 14–15px / weight 500 / tracking slightly tight.

## Motion vocabulary

- One easing: `var(--ease-arrival)` used on every transform/opacity transition.
- Three durations: micro 250ms (button state), standard 500ms (reveals), cinematic 1000ms (nav pill morph).
- **Respect `prefers-reduced-motion`:** disable Lenis, freeze particle canvas at sphere formation, kill reflex-sweep.

## Layout

- Container max: 1500px, centered, horizontal gutter clamp(24px, 5vw, 72px).
- Section rhythm: `--gap-section` air between sections.
- 12-col grid on desktop; single column under 768px.

## Section → pattern mapping

| # | Section | Signature move | Tokens hit |
|---|---|---|---|
| 1 | Nav | Pill morph CTA (2s on engage, text fade → icon-box expand → arrow rotate 45° → bg invert) | `--foreground`, `--ease-arrival` |
| 2 | Hero | Ghost **HEYJULIA** watermark + italic-bold h1 + particle canvas (waveform) + 3-stat odometer + primary button with `::before` reflex sweep | `--primary`, `--accent`, `--grad-primary` |
| 3 | Solution (3 cards, pinned ~3 viewports) | Particle canvas morphs waveform→phone→dashboard-bars while 3 Julia-call cards advance | `--card`, `--primary` |
| 4 | Problem (numbered 01–03 + sticky mockup) | Numbered rows with row-hover `↗` reveal; sticky device column holds `construction_site.png` | `--card-border`, `--accent` |
| 5 | Credibility arc | Curved violet arc, wordmarks iSqFt · STACK · TheDetail.AI riding it, "Built by the founders of iSqFt and STACK" caption | `--accent` |
| 6 | Dome CTA + demo form | `border-radius-top: 50% 50% 0 0` dome, violet radial halo, italic-bold "From voice to *dashboard* in under a minute", 3-field form | `--grad-primary` |
| 7 | Footer | 8xl live ET clock + 3-column menu + phone + copyright | `--foreground`, `--muted-fg` |

## Cursor system (5 states)

1. `default` — dot 6px + ring 24px, both `var(--foreground)` at 60%
2. `link` — ring scales to 36px, dot hidden
3. `button` — ring fills to `var(--accent)`, dot white
4. `media` — crosshair, ring 48px
5. `drag` — (reserved — not used on this landing page)

## Responsive breakpoints

- `<= 640px` (mobile): hamburger nav, hero stacks, 3-card solution swipes horizontally one-at-a-time, sticky mockup becomes inline per row, clock scales to 48–64px.
- `641–1023px` (tablet): hero 2-col → 1-col, solution cards stack vertically, clock ~96px.
- `>= 1024px`: full desktop per sections above.

## The one rule

**Premium is commitment, not addition.** Two fonts (PJS roman + PJS italic 700), one accent (`--accent`), one easing (`var(--ease-arrival)`), one scroll vocabulary (Lenis + shared canvas morph). Any drift fails QA.

## Reproducibility checklist

- [ ] Tokens defined in `:root`
- [ ] Plus Jakarta Sans woff2 loaded locally (no Google Fonts runtime request)
- [ ] Ghost watermark implemented per spec
- [ ] Italic-bold emphasis spans on h1 + CTA h2
- [ ] Particle canvas with 6 formations (waveform → phone → calendar → dashboard → check → heart)
- [ ] Primary button `::before` reflex-sweep + halo bloom
- [ ] Nav pill morph on CTA (2s engage)
- [ ] Sticky mockup column in problem section
- [ ] Curved-arc SVG with wordmarks
- [ ] Dome-top CTA section + radial halo
- [ ] Live clock setInterval(1000) in America/New_York
- [ ] Custom cursor (5 states)
- [ ] `::selection` rule
- [ ] 404.html inherits tokens
- [ ] `prefers-reduced-motion` kill switch
- [ ] Mobile breakpoints verified at 390×844
