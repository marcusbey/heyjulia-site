# heyjulia.ai — premium static rebuild

Static landing site for **HeyJulia** (AI voice agent for construction GCs — built by founders of iSqFt and STACK). Generated through the BASE32 Studio website-service-pipeline (lead slot `0001-heyjulia.ai`).

## Stack

- Plain HTML + CSS + vanilla JS (no build step)
- Three.js (CDN) — footer dot-matrix shader
- Custom cursor, sticky how-it-works rail, live ET clock, odometer stats
- Palette: cosmic black + orange `#ff8903` (primary)
- Fonts: Plus Jakarta Sans (UI) + Geist (hero)

## Project layout

```
.
├── README.md             # this file
├── CLAUDE.md             # pipeline contract for Claude Code
├── snapshot.json         # scraped facts (sole source of truth — see CLAUDE.md)
├── style_guide.md        # per-business design system
├── design.md             # design notes
├── reference.md          # full BASE32 playbook ref
├── deploy.sh             # Vercel deploy script
├── package.json          # serve helper only
├── vercel.json           # routing config (under site/)
└── site/
    ├── index.html        # home
    ├── about.html
    ├── pricing.html
    ├── demo.html
    ├── faqs.html
    ├── 404.html
    └── assets/
        ├── css/main.css
        ├── js/
        │   ├── main.js          # cursor, clock, sticky rail, stats
        │   └── footer-webgl.js  # Three.js dot-matrix footer
        ├── img/
        ├── fonts/               # Plus Jakarta Sans + Geist (woff2)
        └── heyJulia.mp4         # hero background
```

## Run locally

```bash
python3 -m http.server 8765 --directory site
# → http://127.0.0.1:8765/index.html
```

Or:

```bash
npm run dev
```

## Deploy (Vercel)

```bash
./deploy.sh           # preview
./deploy.sh --prod    # production
```

Requires `vercel` CLI + `vercel login`. Output written to `deploy_url.txt` and `deploy_result.json`.

## Sections

1. **Hero** — full-bleed video + glass card, big claim, 3 stats odometer
2. **How it works** — 5-step sticky rail (header pinned, mockup swaps on scroll)
3. **Problem** — numbered 01–03 + sticky mockup
4. **Solution** — 3-card projector with tab switcher
5. **Built by** — credibility arc (iSqFt + STACK founders)
6. **Demo dome** — embedded CTA + form
7. **Footer** — live ET clock + WebGL dot-matrix shader

## Performance notes

- WebGL footer: gated by `IntersectionObserver` + Page Visibility API. DPR capped 1.5 desktop / 1 mobile. `mediump` shader precision.
- Respects `prefers-reduced-motion` everywhere.
- No build step, no framework — direct `<script defer>` loads.

## Hard rules (from `CLAUDE.md`)

- Every fact traces to `snapshot.json` — no fabricated content.
- No pure `#000` / `#fff` — always tinted toward palette.
- Max 2 fonts, 4 colors, 3 easing curves.

See `CLAUDE.md` for full pipeline contract.
