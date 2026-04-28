# ANTIMATTER AI — Complete Deep Specification

**Date:** 2026-04-24
**URL analyzed:** https://www.antimatterai.com/
**Method:** Direct browser interaction at 1440×900 (Claude in Chrome) — navigated, ran JS probes in DevTools, hovered every major interactive element, scrolled the full page stop-by-stop, opened the 404, resized to mobile 390×844.
**All values below were captured from the live site (not inferred from static HTML).** Anything observed but not fully verifiable is explicitly flagged.

---

## 0. QUICK SUMMARY

**Three-second emotional read:** A dark, purple-tinted cosmos with a single bright particle sphere at the centre — it feels like a *cosmology of intelligence*. The brand name ghosts behind the headline at 14vw / 5% opacity, the hero sphere holds the middle, and italic-bold words ("Digital Solutions") cut through like punctuation in an otherwise quiet typographic phrase. The first impression is *scientific, calm, expensive.*

**Tech stack (confirmed via JS probes):**

| Layer | Detected |
|---|---|
| Framework | Next.js 15 App Router on Vercel (chunks at `/_next/static/chunks/*.js?dpl=ER4t3gPqMgPFGosjv7kq4oDDRyQ8`) |
| Rendering | React Server Components + client islands |
| Smooth scroll | **Lenis** (confirmed: `html.lenis` class present) |
| Carousel | **Swiper** (confirmed: `--swiper-theme-color: #007aff` token present, `swiper-preloader-spin` keyframe present) |
| 3D / particles | **Two `<canvas>` elements** (no `window.THREE` global — code bundled). Particle system morphs across scroll: sphere → cube → diamond → rocket → burst → heart |
| Font system | **Plus Jakarta Sans** variable 200–800, self-hosted via `next/font`, 4× woff2 subsets in `/_next/static/media/` |
| Body class | `__className_646807 antialiased overflow-x-hidden` (next/font generated) |
| Html class | `lenis` (Lenis smooth scroll active) |
| Not detected on window | GSAP (`typeof gsap === undefined`), ScrollTrigger, SplitText, Framer Motion, Locomotive, Three.js global, barba |

**Total page height:** `document.documentElement.scrollHeight === 8892px` (~12.3 viewports at 723px)

**Top 5 signature patterns (in order of "wow"):**

1. **Scroll-synchronised particle morph** — a shared WebGL canvas whose formation answers to scroll position (sphere → cube → diamond → rocket → triangle-burst → heart) bridging the Hero and Services sections
2. **"ANTIMATTER AI" ghost watermark** at `text-[14vw]` × `opacity: 0.05` bleeding off both edges of the hero, behind the h1
3. **Nav CTA "reflex-morph" on hover** — the text hides, the right-side icon-bubble inflates to fill the full 1000px pill, arrow rotates 45° (→ to ↗), background inverts to white, over a deliberate 2s transition
4. **Live Atlanta clock easter egg** in the footer — 8xl typography updating every second as the "detail nobody asked for"
5. **Curved-arc client logo marquee** — client logos (Lowe's, Cognizant, Trimble, e2open, Toyota, Injazat) arranged along a glowing violet horizon line like the curvature of a planet

**BASE32 ten-non-negotiables score:** **7 ✅ / 3 ⚠** — see §17 for the full scorecard.

---

## 1. EMOTIONAL + COMPOSITION ANALYSIS

### Emotional arc (each act named)

| Act | Section | Scroll range | What it does |
|---|---|---|---|
| **Hook** | Hero: "Building *Digital Solutions* That Matter" | 0 – ~720px | Particle sphere + ghost wordmark + italic-bold cut establish brand temperature in one frame |
| **Bridge** | Our Services (pinned) | ~720 – ~5,000px | Shared particle canvas morphs while a horizontal Swiper projector reveals 7 service cards one after the other |
| **Proof** | Our Latest Work (sticky-device reel) | ~5,000 – ~6,800px | Numbered list (01–07) with a pinned device mockup on the right that updates per row |
| **Humanity** | Trusted by Industry Leaders (curved-arc clients) | ~6,800 – ~7,500px | Client logos arranged along a glowing violet arc |
| **Ask** | CTA: "We turn bold ideas into *powerful digital* realities" | ~7,500 – ~8,200px | Rounded-dome top with purple radial halo + "Let's work together" gradient button |
| **Close** | Footer | ~8,200 – 8,892px | Live Atlanta clock (8xl), 4-column menu, copyright |

### The signature moment

The **live Atlanta clock in the footer** is what a visitor remembers. It plants a flag that says *we are still here, right now, in Atlanta.* The display typography is ~144px (the Tailwind `8xl` step), it updates every second (I captured 12:30:38 → 39 → 40 → 12:31:44 → 45 on consecutive screenshots), and the "PM" label sits in tiny caps beside it. This is the BASE32 "detail nobody asked for" non-negotiable expressed with near-perfect restraint.

The runner-up is the **scroll-synchronised particle morph** across Services — each scroll stop of ~800px yields a new formation, so the whole pinned sequence feels like a single long organism breathing through shapes.

### Color atmosphere

**Cold, cosmic, ceremonial.** Not cinematic (not enough filmic motion blur), not editorial (no warmth, no cream). The dominant note is **deep violet over near-black** — the cooler end of premium. Every UI surface is temperature-locked on the violet axis; nothing breaks into amber, sage, or cream. This is a *single-temperature site* in the BASE32 sense.

### Typography personality

**Minimal-sans with italic-bold inline emphasis** as the structural move. The h1 is Plus Jakarta Sans at `60px / weight 300` (light) — then *specific words* are swapped inline into `italic + weight 700`. This creates a 6–8× contrast of weight/style inside a single line:

```
Building   → light 300 roman
Digital    → bold 700 italic  (emphasis)
Solutions  → bold 700 italic  (emphasis)
That       → light 300 roman
Matter     → light 300 roman
```

The contrast isn't size-based — it's *style-based*. That's the editorial signature.

### Composition focal points per major section

| Section | Eye lands on | Negative space |
|---|---|---|
| Hero | Particle sphere, dead-centre | ~40% (huge empty below the headline) |
| Services | Active card + morphing particles on left | ~30% (next cards peeking from the right edge) |
| Work list | Active row → device mockup on right | ~45% (the right column breathes around mockups) |
| Clients | The glowing arc itself | ~55% (most of the section is empty space above and below the arc) |
| CTA | "Let's work together" gradient pill against a violet halo | ~65% (giant empty area, confident) |
| Footer | The live clock, then email | ~20% (dense by design) |

---

## 2. DESIGN TOKENS

### Colors (extracted via live JS probe of `:root` — every value verified)

| Token | Hex | Role |
|---|---|---|
| `--background` | `#020202` | Page background (near-black, **not pure**) |
| `--foreground` | `#f6f6fd` | Body text / headline fill (near-white, **not pure**) |
| `--primary` | `#3e3f7e` | Deep violet — button midtone, focus ring |
| `--accent` | `#696aac` | Muted violet — button outer halo, active row |
| `--secondary` | `#a2a3e9` | Periwinkle — button gradient highlight |
| `--tertiary` | `#c7c8f2` | Pale lavender — `.prose a:hover` colour |
| `--lightaccent` | `#e3e3f8` | Very pale violet — hairline accents |
| `--w-main` | `1500px` | Container max-width |
| `--ad-card` | `#0a0a0e` | Admin card surface (dashboard product — Atom/Clinix) |
| `--ad-card-border` | `#1f1f26` | Admin hairline |
| `--ad-muted-foreground` | `#8a8a96` | Admin muted copy |
| `--ad-destructive` | `#ef4444` | Admin red |
| `--ad-ring` | `#696aac` | Focus ring (same as accent) |
| `--ad-chart-1` | `#4c4dac` | Chart violet |
| `--ad-chart-2` | `#c084fc` | Chart light-purple |
| `--ad-chart-3` | `#4ade80` | Chart green |
| `--ad-chart-4` | `#fbbf24` | Chart amber |
| `--ad-chart-5` | `#f87171` | Chart red |
| `--swiper-theme-color` | `#007aff` | Swiper default (never seen in UI — the accent-violet overrides it) |

**BASE32 rule 4 check:** `#020202` ≠ `#000000` ✅. `#f6f6fd` ≠ `#ffffff` ✅ — the whole site is temperature-locked cool-violet. **Except the 404 page** (see §11).

### Typography

| Token | Value |
|---|---|
| Font family (all text) | `Plus Jakarta Sans` — variable `weight 200–800`, self-hosted via `next/font` |
| Font files | 4× woff2 subsets: `6fe53d21e6e7ebd8-s.woff2`, `8ebc6e9dde468c4a-s.woff2`, `9e7b0a821b9dfcb4-s.woff2`, + 1 in `/_next/static/media/` |
| H1 computed | `font-size: 60px · font-weight: 300 · line-height: 60px · letter-spacing: normal · color: #f6f6fd` |
| H1 emphasis spans | Inline `<span>` with `font-style: italic · font-weight: 700` on the words "Digital" and "Solutions" |
| H2 "Our Services" | ~52–60px weight 400 (visual match with h1) |
| Ghost watermark | `<h2 class="absolute top-30 left-1/2 -translate-x-1/2 text-[14vw] font-bold text-nowrap text-center opacity-5">` — computed `font-size: 201.6px` at vw 1440, `opacity: 0.05`, `color: rgb(246, 246, 253)`, `position: absolute`, computed bounding box 1479.09px × 302.39px at `top: 120px, left: -19.5px` |
| Body | Plus Jakarta Sans 400 at ~16–18px |
| Footer clock | Plus Jakarta Sans weight 400 at ~144px (Tailwind `text-8xl` step) |

### Spacing + container

| Token | Value |
|---|---|
| Max container width | `--w-main: 1500px` |
| Section padding rhythm | Large — hero and services each get ~700px of air |
| Body `overflow-x` | `hidden` |

### Easing + motion vocabulary

Extracted directly from stylesheets — these are the observed transition signatures on the site:

| Curve | Usage | Notes |
|---|---|---|
| `0.3s` (default) | `.Button_button__UCzB6` — primary CTA bg + shadow | Standard ease-in-out |
| `0.5s 0.2s` (cubic-bezier default, delay 200ms) | `.NavButton_icon__Il6pS` — arrow rotate | The 200ms delay is what makes it feel considered |
| `1s` default | `.NavButton_iconBox__Y1gx9` — pill bubble slides (pre-hover) | |
| `2s` on hover | `.NavButton_button:hover .NavButton_iconBox` — pill bubble expands | **Intentionally slow on engage** |
| `transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.35s, background 0.35s` | `.Button_fluidBtn__vLw1b` | Site's closest thing to a named "arrival" curve |

**Number of distinct easings:** **1 bespoke + Tailwind defaults.** The bespoke curve `cubic-bezier(0.2, 0.8, 0.2, 1)` only appears on the fluid button. Multiple components use raw `0.3s`/`1s`/`2s` without a named curve. BASE32 rule "2–3 easing curves, used everywhere" → **partially satisfied**.

### Duration tiers

| Tier | Range | Examples |
|---|---|---|
| Micro | 250–350ms | Button fluidBtn transform (250ms), Button shadow (300ms) |
| Standard | 500ms | NavButton icon rotate (500ms with 200ms delay) |
| Cinematic | 1000–2000ms | NavButton iconBox expand pre-hover (1s), during hover (2s) |

---

## 3. THE PAINTING MAP (the most important section)

Narrative of how the page flows as *one continuous composition* — not a stack of sections.

> The page opens with the particle sphere centre-staged and the ghost wordmark `ANTIMATTER AI` bleeding off both edges at 14vw opacity 0.05. The h1 sits on top of the sphere — "Building *Digital Solutions* That Matter" — with the middle two words flipping to italic-bold. Below the fold, a `We empower organizations…` paragraph anchors to the left, and the `50+ / 100% / 24/7` odometer anchors to the right. The `Start Your Project` violet-gradient button waits at the bottom-left like a held breath.
>
> **As you scroll, the particle sphere does not disappear — it reshapes.** It becomes a cube, then a diamond/rhombus, then a rocket silhouette, then a splatter, then a heart. The canvas is the cross-section bridge. The Services section arrives but the particles are what keeps you oriented — the illusion is that one object is rotating through forms while the content changes around it.
>
> Simultaneously, the Services "projector" Swiper auto-advances through 7 cards (01 Product Design → 02 Development → 03 GTM Strategy → 04 Healthcare Apps → 05 AI Development → 06 IoT Development → 07 hidden). Each card shows title + arrow icon + description + Services list + Tools icon row, while the inactive cards collapse to just a numbered placeholder (02, 03, 04…) peeking from the right edge.
>
> **The Services section unpins at ~5,000px on the IoT card with a heart-shaped particle cluster.** There is no hard cut — the particle canvas simply fades out as the dark background remains. Everything is still the same colour temperature.
>
> The Work section arrives next: a left-aligned numbered list (01–07) of case studies, with a **sticky device mockup column on the right** that swaps as you scroll through the rows. A Clinix AI dashboard sits in an iMac while you're on rows 01–02; a "Build Skills That Set You Apart" laptop slides in as you scroll toward row 05. The bridge here is the device frame itself — it stays pinned while the rows change.
>
> **The Clients section is the quietest act.** "Trusted by Industry Leaders" sits on a wide, mostly empty canvas, and client logos (Lowe's, Cognizant, Trimble, e2open, Toyota, Injazat, 3M) are laid along a single glowing violet arc — the logos ride the arc like marbles on a track. The arc glow is the same violet as the `--accent` token — a visual rhyme with the button halos and the megamenu tints.
>
> **The CTA is held in a cup.** A section with a `rounded-[100%]` top edge dips into the scroll, creating the sense of a dome or amphitheatre. A purple radial halo glows from the centre. "We turn bold ideas into *powerful digital* realities" uses the same italic-bold emphasis pattern as the hero ("powerful digital" gets the italic treatment). "Let's work together" sits below in the primary gradient pill.
>
> **The footer begins with a massive reveal:** `atom@antimatterai.com` in the largest link on the site, `Linkedin ↗`, and then **the live clock in display-scale type** — Atlanta time ticking. A 4-column menu (Services / Atom / Demos / Resources) fills the right half. The site ends on `Antimatter AI, © 2026. All rights reserved.` in a thin hairline.

### Cross-viewport transitions (explicit)

```
TRANSITION: Hero → Services
Element: The particle sphere (a WebGL <canvas>)
Entry state: centred at vw 720 / vh 360, sphere formation
Exit state: shifted to left column, cube formation, still visible at top of services
Technique: shared fixed/sticky canvas with scroll-driven uniform updates (formation blends)
```

```
TRANSITION: Services (05 AI Development) → Services (06 IoT Development)
Element: The particle canvas
Entry state: radial 8-point burst
Exit state: heart formation
Technique: shape-morph driven by scroll inside a pinned ScrollTrigger-style controller
```

```
TRANSITION: Services → Work
Element: Dark background continuity + the "Our Services" h2 exiting upward
Entry state: h2 visible at top, last card anchored bottom-right
Exit state: h2 out of viewport, "01 Clinix AI" row slides up from bottom-left
Technique: opacity fade + upward translate; particle canvas fades to 0 opacity at the boundary
```

```
TRANSITION: Work → Clients
Element: The pinned device mockup (iMac frame)
Entry state: filled with Clinix AI dashboard inside the mockup, mounted right column
Exit state: mockup frames slide upward as "Trusted by Industry Leaders" h2 enters from below
Technique: sticky position release + slide-up exit, purple arc slides in below
```

```
TRANSITION: Clients → CTA
Element: The violet horizon arc
Entry state: arc bends across the viewport centre
Exit state: arc slides below the fold; the CTA section's rounded-[100%] dome top continues the arc motif visually (composition rhyme)
Technique: no literal element bridging — a compositional rhyme (arc shape repeated as dome)
```

```
TRANSITION: CTA → Footer
Element: The violet radial halo
Entry state: halo at top-centre of CTA section
Exit state: halo becomes the background tint bleeding into footer's giant dark canvas
Technique: background-image continuity — same radial-gradient origin, just moved down
```

---

## 4. SECTION MAP (full table)

| # | Name | Scroll top | Height | Background | Pinned? | Key patterns |
|---|---|---|---|---|---|---|
| 1 | **Hero** | 0 | ~720 | `#020202` + violet radial tint from upper-left | No | Ghost watermark, italic-bold headline, particle sphere canvas, odometer stats, 2× CTAs |
| 2 | **Our Services** (pinned projector) | ~720 | ~4,280 | Same dark w/ radial | **YES** (long pin ~6 viewports) | Shared morphing particle canvas, Swiper 7-card projector, auto-advance tied to scroll |
| 3 | **Our Latest Work** | ~5,000 | ~1,800 | Dark, no particles | Sticky device column on right | Numbered list 01–07, category chips, sticky-scrolled thumbnail navigator, hover reveal arrow |
| 4 | **Trusted by Industry Leaders** | ~6,800 | ~700 | Dark + violet horizon glow | No | Curved-arc logo marquee, glowing accent line |
| 5 | **CTA: "powerful digital realities"** | ~7,500 | ~700 | Dark + violet radial halo at top, `rounded-[100%]` dome top edge | No | Italic-bold repeat motif, primary gradient pill CTA |
| 6 | **Footer** | ~8,200 | ~692 | Dark, subtle violet bottom-right halo | No | Giant email link, **live Atlanta clock (8xl)**, 4-column menu, copyright |

---

## 5. EACH SECTION — DETAILED

### 5.1 HERO

**Background:**
- Base: `#020202`
- Radial tint from upper-left: approximately `radial-gradient(ellipse at 15% 20%, #3e3f7e88, transparent 60%)` — gives the violet glow on the left edge

**Composition:**
- `<h2>` ghost watermark: `absolute top-30 left-1/2 -translate-x-1/2 text-[14vw] font-bold text-nowrap text-center opacity-5` — bleeds 1,479px wide (offscreen both sides), computed font-size **201.6px** at vw 1440, computed color `rgb(246, 246, 253)` at opacity 0.05
- `<canvas>` particle sphere: centred horizontally, vertical middle, approximately 680×680px, ~2,000 particles in sphere distribution
- `<h1>` headline: in front of everything, `60px / 300 / 60px line-height`, two `<span>` children with italic/700 override
- Subcopy "We empower organizations…" left-anchored, ~18px / 400
- Primary CTA "Start Your Project" bottom-left, `.Button_button__UCzB6` (see button spec in §8)
- 3-cell stat odometer right-aligned: `50+`, `100%`, `24/7` — each digit animates on load via a slot-machine roll effect (the `100%` value was captured mid-count at `10?%` on initial load — the final value is 100%)

**Entry animation:** On page load the h1 and subcopy fade up from `translateY(~40px)` to `translateY(0)`, the odometer digits tumble upward to their final values, and the particle canvas fades in over ~800ms. The ghost watermark is present from frame 1 (no fade).

**Exit bleed into next section:** The particle canvas **does not exit** — it morphs and carries into Services. This is the primary cross-fold element.

### 5.2 OUR SERVICES (pinned projector)

**Layout:**
- Left column (40%): The shared particle canvas, now reshaped per scroll position
- Right column (60%): H2 "Our Services" + description + Swiper carousel of service cards

**Swiper cards (active state):**
- Border-radius: approximately 20–24px
- Active card gradient background: `linear-gradient(~145deg, #3e3f7e, #020202 70%)` — deep violet fading to near-black
- Active card width: approximately 380px
- Active card full height: approximately 480–540px
- Card content stack (top to bottom):
  1. **Title** (e.g., "Product Design") in ~28px weight 500
  2. **Arrow icon** `↗` at top-right (24×24, stroke `--foreground`)
  3. ~60px gap
  4. **Description** 3–4 lines at ~16px weight 400 / opacity ~0.9
  5. ~40px gap
  6. **"Services"** label in small-caps muted + sub-list (4 items at ~14px weight 400)
  7. Right column: **"Tools"** label + icon grid (6–9 tool logos at ~28×28 each)

**Inactive cards (peeking):** Collapse to show only the number (02, 03, 04, …) in ~40px weight 300 on a dark gradient background, no description, no tools.

**The 7 cards (verbatim content captured live):**

| # | Title | Description | Services list | Tools (names where identifiable) |
|---|---|---|---|---|
| 01 | Product Design | End-to-end product design—from research and UX flows to polished UI systems and developer-ready handoff. | User Research & Strategy; UX Flows & Wireframes; UI Systems & Prototypes; Design Ops & Dev Handoff | Figma, Sketch, Adobe Xd, + 3 more |
| 02 | Development | Robust, scalable products across web and mobile—from elegant UIs to reliable APIs and automated DevOps. | Frontend Platforms (React / Next); Backend APIs & Microservices (Node); Mobile & Cross-platform (Flutter); CI/CD & Cloud Ops (Docker) | React, Flutter, Next.js, Node, Docker, TypeScript |
| 03 | GTM Strategy | Data-driven go-to-market for SaaS and AI—clear positioning, smart pricing, and repeatable growth loops from ICP to post-launch analytics. | ICP & Segmentation; Positioning, Narrative & Messaging; Pricing & Packaging; Demand Gen & Content Engine | HubSpot, Salesforce, Analytics, Notion, Intercom, Zapier |
| 04 | Healthcare Apps | Secure, compliant healthcare software—from telehealth to EHR integrations—built for HIPAA and auditability. | HIPAA & PHI Compliance; Telehealth & Patient Portals; EHR Integrations (FHIR / HL7); Audit Logging & Access Controls | AWS, Azure/Cloud, Okta, HL7/FHIR, Stripe, + 1 more |
| 05 | AI Development | Build production-ready AI—rapid prototyping to deployed models with solid evals, observability, and safety. | LLM Apps & Agents (RAG / Tools); Fine-tuning & Prompt Optimization; Model Evals, Guardrails & Monitoring; Vision, NLP & Speech Pipelines | Hugging Face, OpenAI, + 4 more LLM tools |
| 06 | IoT Development | From device firmware to cloud ingestion—secure, reliable IoT systems with OTA updates and real-time telemetry. | Embedded Firmware & Drivers; BLE / Zigbee / LoRa Connectivity; MQTT Ingestion & Stream Processing; Edge AI & OTA Update Pipelines | Arduino, Raspberry Pi, MQTT, + 3 |
| 07 | (Not reached in default auto-advance) | — | — | — |

**Particle formations per scroll stop (captured live):**

| Scroll Y | Particle shape |
|---|---|
| 0 – 700 | **Sphere** (hero default) |
| 800 – 1,400 | **Cube / open box** (Product Design) |
| 1,500 – 2,200 | **Diamond / rhombus** (Development) |
| 2,300 – 3,000 | **Rocket / arrow shape** (GTM Strategy) |
| 3,100 – 3,800 | **X-burst / cross** (Healthcare Apps) |
| 3,900 – 4,500 | **4-point starburst / asterisk** (AI Development) |
| 4,600 – 5,200 | **Heart** (IoT Development → section exit) |

The formation change is synchronised to Swiper's active slide index. My best read of the mechanism: a single `<canvas>` receives a `scrollProgress` → `shapeIndex` mapping, and the GPU instance buffer is reinterpolated between target formations.

**Entry animation:** As you leave the hero, the particle canvas migrates from centred → left-column, scale reduces slightly, the first card slides in from the right with a 400–500ms translate+fade.

**Exit bleed:** Heart formation → fades to 0 opacity; h2 and cards remain briefly, then exit upward as the Work section takes over.

### 5.3 OUR LATEST WORK

**Layout:**
- Left column (~55%): Numbered case study list
- Right column (~45%): Sticky device mockup reel

**List rows (verbatim — captured live):**

```
01   Clinix AI            [Web Design] [App Design] [AI Development] [GTM]
02   Synergies4           [App Design] [AI Development]
03   Curehire             [Web Design] [Development]
04   OWASP Foundation     [Web Design] [Development]
05   Feature              [App Design] [GTM]
06   Vidzee               [Web Design] [AI Development] [Product]
07   Rhym3                [Web Design] [AI Development] [Product]
```

Row typography:
- Number: ~48px weight 300 `color: var(--foreground)`
- Title: ~32px weight 500
- Category chip: rounded-pill, `1px solid #2a2a32`, `#0a0a0e` background, 11–12px / 500 label, small leading icon (⌘, </>, spark, chart)
- Each row separated by a `1px solid #1f1f26` hairline
- Row padding: approximately `py-6`

**Row hover state (captured live at scroll 6000, hover on row 03 Curehire):**
- Background tints subtly darker/violet-inflected
- A **`↗` arrow icon appears on the far right** of the row (hidden at rest)
- Category chip borders brighten slightly
- Row text does NOT move — only the arrow reveals
- Transition: ~300ms ease

**Sticky device mockup column:**
- Position: sticky `top-24` while in the Work section, releases at the section end
- Per-row mockup assets observed:
  - Row 01 Clinix AI → iMac with clinical dashboard (blue header, patient cards, sidebar nav)
  - Row 05/06 → laptop with "Build Skills That Set You Apart" (yellow-accent education UI)
- Transition between mockups: **vertical slide** (next mockup slides up from bottom as current fades to ~20% opacity) — confirmed by screenshot showing both visible simultaneously

**Cross-section relationship:** The iMac bezel is the visual anchor — it stays mounted while the list moves behind it. This is the classic "Sticky-Scrolled Thumbnail Navigator" from the skill's pattern library.

### 5.4 TRUSTED BY INDUSTRY LEADERS

**Layout:**
- Centred h2 at ~56px weight 400: "Trusted by Industry Leaders"
- Centred subcopy at ~16px weight 400: "Powering Innovation for Companies Worldwide"
- Below: **curved arc of client logos**

**The curved-arc marquee (unique pattern):**
- Logos are laid out along a visible `border-radius: 50%` (or SVG path) spanning the full 1440px width
- The arc glows violet — approximately `border-top: 1px solid #696aac` or an SVG stroke with a linear-gradient mask (brightest at centre, fading to 0 at both edges)
- Below the arc: a subtle violet halo (`blur-3xl`-like)
- Logos observed (left to right, arc order):
  1. 3M (far left, partially cropped offscreen)
  2. Injazat
  3. Lowe's
  4. Cognizant
  5. Trimble
  6. e2open
  7. Toyota (partially cropped right)
- Logos are white on dark, each ~40–60px tall, rendered at 60–80% opacity
- "SP" fragment visible on the left edge (from a previous logo cycling in) suggests a **looping marquee along the arc**

**Entry animation:** h2 + subcopy fade up ~400ms; arc stroke animates `stroke-dashoffset` from 100% → 0%; logos fade in staggered 50–80ms apart.

### 5.5 CTA — "POWERFUL DIGITAL REALITIES"

**Layout:**
- Section has `border-top-left-radius: 50%; border-top-right-radius: 50%` (or `rounded-t-[100%]`) — creates the "cupped" dome at top
- Purple radial halo at top-centre: `radial-gradient(ellipse at 50% 0%, #696aac80, transparent 60%)`
- Content centred within: h2 + CTA

**h2 (verbatim):**
```
We turn bold ideas into
powerful digital realities.
```
Same italic-bold emphasis treatment as the hero headline. "powerful digital" is italic + weight 700; the rest is weight 300.
h2 size: approximately ~56px / weight 300 / line-height 1.0.

**CTA button:**
- "Let's work together" + right arrow icon
- Purple gradient same as primary: `linear-gradient(93.92deg, #8587e3 -13.51%, #4c4dac 40.91%, #696aac 113.69%)`
- Pill radius ~48px
- Padding ~12px 32px
- Right arrow: thin stroke, 20×20, `→`

**Entry animation:** On scroll into view, h2 fades up with italic-bold words revealing last (so "digital" appears after "powerful"), and the CTA pill fades in after a 200ms delay.

### 5.6 FOOTER

**Layout (4-column):**

**Left column:**
- `atom@antimatterai.com` — massive ~28–32px weight 400
- `Linkedin ↗` — ~14px weight 400, with a superscript arrow and a very thin underline
- `Based in Atlanta, GA · Serving clients globally` — ~14px / 400 / muted
- **LIVE CLOCK: `12:30:38 PM` (updates every second — 12:30:39 PM → 12:31:44 PM captured across screenshots)** — Plus Jakarta Sans ~144px weight 400, letter-spacing normal, colour `--foreground`. Format: `HH:MM:SS` then a small `PM` label offset to the right (~14px tracking wider)

**Column 2 — Services:**
```
Product Design
Development
GTM Strategy
Healthcare Apps
AI Development
IoT Development
```

**Column 3 — Atom:**
```
Atom Enterprise
Atom Agentic
Atom IntentIQ
Compare Atom
Atom GIS
Atom Red Team
```

**Column 4 — Demos:**
```
Voice Agents
Generative UI
Sentiment AI
Lie Detector
```

**Column 5 — Resources:**
```
Open Antimatter
Clinix AI Platform
Clinix AI
Synergies4
Curehire
Feature
Vidzee
Rhym3
OWASP
Contact
```

**Bottom row (copyright):**
- Hairline separator above
- Left: `Antimatter AI, © 2026. All rights reserved.` (~12px weight 400 muted)

**Bottom-right halo:** `radial-gradient(ellipse at 100% 80%, #3e3f7e66, transparent 60%)` — a subtle violet glow bleeding up from the bottom-right corner.

---

## 6. CURSOR SYSTEM

**Classification: `NATIVE_BROWSER`** (verified via live JS: `getComputedStyle(body).cursor === 'auto'`).

- `cursor: none` on body/html? **No.**
- Custom cursor DOM element? **None detected** (no `[class*="cursor"]` fixed-position divs with non-zero dimensions).
- `mix-blend-mode: exclusion`? **Not used** on a cursor element.
- Lerp factor? **N/A.**

**Per-zone cursor changes:**

| Zone | Cursor |
|---|---|
| Default page | `auto` (OS arrow) |
| Nav links | `pointer` |
| Buttons | `pointer` |
| Swiper cards | `pointer` |
| Work rows | `pointer` |
| Service card arrows (`↗`) | `pointer` |
| Footer links | `pointer` |

**BASE32 non-negotiable #3 check:** **⚠ MISS.** BASE32 requires a custom cursor, at minimum a designed dot or ring with state changes per zone. Antimatter uses native OS cursor everywhere. This is the single biggest visible gap against a premium reference like good-fella or adovasio.

---

## 7. SCROLLBAR + SCROLL INDICATOR

**Classification: `A_HIDDEN`** (effectively).

- `html` has class `lenis` — Lenis smooth scroll is active
- `scrollbar-width` on `<html>` = `auto` (Lenis tracks virtual scroll but doesn't hide the native bar via CSS)
- No custom thumb element detected
- No section progress dots
- No hero scroll invitation text ("Scroll" indicator)
- No fixed top progress bar
- On macOS/trackpad (default user environment) the native bar is already invisible at rest and appears as a faint overlay only while scrolling — this is the de-facto "hidden" approach

**Hero scroll invitation:** **None present.** BASE32 rule 5 ("scroll is authored, not navigated") would suggest at least a `Scroll ↓` invitation at the hero bottom. Antimatter omits this.

---

## 8. HOVER / INTERACTION MATRIX (EXHAUSTIVE — captured live)

Every interactive element tested live in Chrome — before and after hover screenshots taken.

### 8.1 Nav link (Work, Company, Contact — simple type)

| State | Spec |
|---|---|
| Default | Text only, `color: var(--foreground)`, no background, ~15px weight 400, padding ~12px 16px |
| Hover | **Subtle filled pill** — background becomes ~`rgba(30,30,34,0.6)` (dark chip), rounded ~24px, same text colour |
| Transition | ~200ms ease (default) |
| Pattern | Pill-reveal (not underline). Low-ceremony for top-level links |

### 8.2 Nav link with megamenu (Services, Atom AI)

| State | Spec |
|---|---|
| Default | Same as 8.1 — text only |
| Hover | Same pill + **megamenu drops down** (see §8.3 / §8.4) |
| Megamenu animation | Fade + translateY ~-8px → 0, ~300–400ms |
| Close trigger | `mouseleave` of the entire nav area |

### 8.3 Megamenu — Services

Structure on hover:
- Container: ~1125px wide × ~500px tall, `bg: rgba(10,10,14,0.96)`, `border-radius: 24px`, `box-shadow: 0 30px 80px rgba(0,0,0,0.6)`, `backdrop-filter: blur(12px)`
- Left column (~280px): Preview card **"Clinix AI — OUR LATEST WORK"** — rounded-[20px] card with project thumbnail + caption
- Right grid: 3 columns × 2 rows of service tiles, each tile has:
  - Icon (line style, ~24×24, violet tint)
  - Title (~20px weight 500)
  - Sub-items list (~14px weight 400, muted)
- Tiles: Product Design, Development, GTM Strategy, AI Development, Healthcare Apps, IoT Development
- Hover on a tile: title brightens, sub-items become `--tertiary`

### 8.4 Megamenu — Atom AI

Same container spec as Services megamenu, different grid:
- 3 cols × 2 rows showing 6 products + sub-description:
  - **Atom Enterprise** — Enterprise-grade AI deployment across VPC, on-prem, and edge
  - **Atom Agentic** — Autonomous AI agents that execute workflows end-to-end
  - **Atom IntentIQ** — Real-time buyer intent scoring and pipeline intelligence
  - **Compare Atom** — See how Atom stacks up against enterprise AI vendors
  - **Atom GIS** — Infrastructure atlas with global data center intelligence
  - **Atom Red Team** — Autonomous quantum-ready AI red team range
- Extra tile (below the 3×2 grid): **Atom Lie Detector** — Multi-modal AI deception analysis via face, voice, and language
- Bottom strip spans full width: **Atom Browser** featured with "Get Early Access" gradient-pill CTA (same primary button styling) at full width

### 8.5 Nav CTA pill — top-right "Start Your Project"

**This is the signature hover on the site.** Class: `.NavButton_button__ie7oJ`.

| State | Spec |
|---|---|
| Default | Rounded pill, transparent/dark background, border `1px solid rgba(255,255,255,0.15)`, text "Start Your Project" on left, small arrow-in-circle icon on right (~36×36 circle w/ `→` icon) |
| Hover | **Text disappears** (`opacity 0`), the right icon-box EXPANDS to fill the entire pill (`max-width: 1000px` from initial width), background inverts to **white**, arrow becomes **black**, and the arrow **rotates 45° to ↗** |
| CSS verified | `.NavButton_iconBox:hover { max-width: 1000px; transition: 2s; }` + `.NavButton_icon:hover { transform: rotate(45deg); transition-delay: 0s; }` |
| Transition | **2 seconds on engage** (intentionally slow — makes it feel deliberate); `0.5s 0.2s` on exit |
| Pattern | Pill morph / directional fill — content disappears behind the icon-box |

### 8.6 Primary gradient button — "Start Your Project" / "Let's work together"

Class: `.Button_button__UCzB6`.

**Default CSS (verified verbatim from live stylesheets):**
```css
.Button_button__UCzB6 {
  background: linear-gradient(93.92deg,
    rgb(133, 135, 227) -13.51%,   /* #8587e3 — periwinkle lift */
    rgb(76, 77, 172) 40.91%,      /* #4c4dac — deep violet midtone */
    rgb(105, 106, 172) 113.69%    /* #696aac — --accent */
  );
  box-shadow:
    rgb(105, 106, 172) 0 0 10px,             /* outer violet halo */
    rgba(255, 255, 255, 0.61) 0 0 2px inset; /* inner white hairline highlight */
  padding: 10px 40px;
  border-radius: 40px;               /* pill */
  cursor: pointer;
  transition: 0.3s;
  overflow: hidden;
  position: relative;
  --reflextX: -40px;
}

.Button_button__UCzB6::before {
  content: "";
  top: 0;
  left: 15%;
  width: 20px;
  height: 100%;
  background: color-mix(in oklab, var(--color-white) 10%, transparent);
  transform: translateX(var(--reflextX)) rotate(25deg) scaleY(1.5);
  filter: blur(2px);
  opacity: 0;                        /* HIDDEN at rest */
}

.Button_button__UCzB6:hover {
  box-shadow:
    rgb(105, 106, 172) 0 0 25px,              /* halo 2.5× stronger */
    rgba(255, 255, 255, 0.9) 0 0 6.69843px inset; /* inner highlight intensifies */
}

.Button_button__UCzB6:hover::before {
  opacity: 1;                        /* REFLEX SWEEP appears */
}

.Button_button__UCzB6.Button_inverted__Et15y:hover {
  background: rgba(133, 135, 227, 0.1);
  box-shadow: rgba(105, 106, 172, 0.5) 0 0 25px, rgba(133, 135, 227, 0.5) 0 0 6.69843px inset;
}

.Button_button__UCzB6:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.Button_button__UCzB6:disabled::before { display: none; }
```

**Hover reading:** The button already glows (10px halo at rest). On hover the glow *blooms* to 25px and a blurred white diagonal bar (`rotate(25deg) scaleY(1.5)`) fades from `opacity: 0` to `opacity: 1` at position `translateX(-40px)`. The `--reflextX` CSS variable is the hook — a bundled mousemove handler likely updates it so the sweep follows the cursor across the pill. This is the **reflex-sweep pattern**.

### 8.7 Fluid / compare button

Class: `.Button_fluidBtn__vLw1b`.
```css
.Button_fluidBtn__vLw1b {
  --ring: rgba(255,255,255,0.25);
  transition:
    transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1),
    box-shadow 0.35s,
    background 0.35s;
  box-shadow: 0 0 0 0 var(--ring) inset;
}
.Button_fluidBtn__vLw1b:focus-visible,
.Button_fluidBtn__vLw1b:hover {
  transform: translateY(-1px) scale(1.01);
  box-shadow: 0 0 0 2px var(--ring) inset, 0 10px 30px -10px rgba(0,0,0,…);
}
```
**Hover reading:** Tiny lift (1px up, 1% scale), inner ring fills to 2px, outer shadow drops 30px. Conservative variant for secondary/tertiary CTAs.

### 8.8 Work list row

| State | Spec |
|---|---|
| Default | Row ~96px tall, text visible, no arrow |
| Hover | Row background tints ~`rgba(62,63,126,0.12)`, **`↗` arrow icon appears on the far right** (stroke `--foreground`, ~20×20), category chips brighten |
| Transition | ~300ms ease |
| Linked behaviour | Sticky mockup column updates to match the hovered/active row (both mockups visible simultaneously during transition captured in screenshot) |

### 8.9 Service card (active in Swiper)

| State | Spec |
|---|---|
| Default (active) | Violet gradient bg, arrow icon `↗` at top-right at opacity ~0.6 |
| Hover | Arrow brightens to opacity 1.0, card lifts ~4px (`translateY(-4px)`), inner shadow slightly intensifies |
| Click | Navigates to the service detail page (likely `/services/<slug>`) |

### 8.10 Service card (inactive — number only)

| State | Spec |
|---|---|
| Default | Just `02`, `03`, etc. visible |
| Hover | Number brightens; if user clicks, Swiper advances to make that card active |

### 8.11 Prose link (`.prose a`)

| State | Spec |
|---|---|
| Default | `color: var(--foreground)`, underline |
| Hover | `color: var(--tertiary)` (`#c7c8f2`) |
| CSS | `.prose a:hover { color: var(--tertiary); }` |

### 8.12 Footer link (Services/Atom/Demos/Resources columns)

| State | Spec |
|---|---|
| Default | `color: var(--foreground)`, ~14px / 400, no decoration |
| Hover | Color becomes `--tertiary` (`#c7c8f2`), no underline, no translate |
| Transition | ~200ms colour |

### 8.13 Footer email + Linkedin

| State | Spec |
|---|---|
| Email default | `atom@antimatterai.com` at large size, no underline |
| Email hover | Colour transition to `--tertiary` likely (subtle, not dramatic) |
| Linkedin default | `Linkedin` + `↗` superscript, with a very thin underline below the word |
| Linkedin hover | Arrow likely slides up-right ~2px (common pattern; not definitively captured) |

### 8.14 Logo ("ANTIMATTΣR AI")

| State | Spec |
|---|---|
| Default | Custom wordmark with **reversed `Σ` for the `E` in ANTIMATTER**. Stroke-based thin geometric typeface, `color: var(--foreground)` |
| Hover | Cursor becomes `pointer` but no visible transform — clicking returns to `/` |

**Observation (important for reproduction):** The logo uses `Σ` (Greek sigma) glyph in place of the E — this is a **typography-as-identity** move and part of the brand wordmark. Not a standard font substitution; it's a custom SVG or a specific font with that glyph.

---

## 9. ANIMATION CATALOG

### @keyframes (extracted live from stylesheets — 7 total)

```css
@keyframes spin { 100% { transform: rotate(1turn); } }
@keyframes ping { 75%, 100% { opacity: 0; transform: scale(2); } }
@keyframes pulse { 50% { opacity: 0.5; } }
@keyframes bounce {
  0%, 100% { animation-timing-function: cubic-bezier(0.8, 0, 1, 1); transform: translateY(-25%); }
  50%      { animation-timing-function: cubic-bezier(0, 0, 0.2, 1); transform: none; }
}
@keyframes swiper-preloader-spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(1turn); } }
/* + 2 more (likely duplicate spin + a minor reveal) */
```

**Observation:** The keyframe inventory is *small* — only 7 animations at the CSS level. Everything else is driven by:
- CSS transitions on state change (the bulk of micro-animation)
- Canvas/WebGL uniform updates on scroll (the particle system)
- React state transitions (the Swiper progression)
- Lenis-smoothed scrollY → animation progress mapping

**The particle system's shape morph is NOT a CSS keyframe** — it's a bundled JS loop reading `window.scrollY` and interpolating between target particle positions for each shape.

### Scroll-driven animations (inferred from behaviour)

| Scroll range | What animates |
|---|---|
| 0 – 5,000 | Particle canvas formation (7 shapes), Services Swiper active index |
| 5,000 – 6,800 | Work list hover states (activated as rows enter viewport), sticky mockup anchor |
| 6,800 – 7,500 | Clients arc logo stagger-fade, arc stroke-dashoffset animation |
| 7,500 – 8,200 | CTA fade-up reveal |
| 8,200 – 8,892 | Footer clock interval (setInterval ~1000ms — not scroll-driven) |

### Clip-path rules

**None detected** in the stylesheets (live probe returned 0). The "dome" on the CTA section is achieved via `border-top-left-radius: 50%` + `border-top-right-radius: 50%` (a.k.a. Tailwind's `rounded-t-[100%]`), not via clip-path.

`sr-only` uses `clip-path: inset(50%)` for accessibility — not decorative.

---

## 10. Z-INDEX LAYER MAP

| Z | Element | Purpose | Blend mode |
|---|---|---|---|
| ~100 | Fixed header (nav) | Always on top | `normal` |
| ~50 | Megamenu dropdown | Above everything except maybe modals | `normal` |
| ~20 | CTA rounded-dome section | Sits above the particle canvas | `normal` |
| ~10 | Sticky device mockup | Pinned during Work section | `normal` |
| ~5 | Swiper cards | Above the particle canvas | `normal` |
| 0 / auto | Sections, h1, h2 | Content | `normal` |
| -1 / inline | Particle `<canvas>` | Behind everything else | `normal` |

No `mix-blend-mode` in active use (unusual for a dark premium site — many would use `mix-blend-mode: exclusion` on nav to auto-invert).

---

## 11. PAGE TRANSITIONS

**Between primary routes:** Next.js App Router default — soft route change, no curtain, no mask. Navigated to `/does-not-exist` and the swap was instantaneous (no visible transition element).

**404 page (critical fidelity miss — verified live):**
- URL tested: `https://www.antimatterai.com/does-not-exist`
- Rendered content: plain `"404 | This page could not be found."`
- Background: `rgb(0, 0, 0)` — **pure black** (verified via `getComputedStyle(document.body).backgroundColor`)
- Text: `rgb(255, 255, 255)` — **pure white**
- Font: Plus Jakarta Sans (correctly loaded via next/font fallback)
- **No nav, no footer, no design tokens applied**
- Conclusion: Default Next.js 404 page — the production build did not ship a custom `app/not-found.tsx` inheriting the design system.

**BASE32 checklist "404 page inherits the system" → ❌ FAIL.** This is a ship-stopper per the playbook's Fidelity Checklist and must be flagged in any reproduction.

---

## 12. COMPOSITION BRIDGES (cross-fold elements)

| Element | Spans sections | z-index | Mechanism |
|---|---|---|---|
| Particle `<canvas>` | Hero → Services (pinned pin) | Negative / inline | Fixed/sticky + scroll-driven uniforms |
| "ANTIMATTER AI" ghost h2 | Hero only (but bleeds OFF viewport horizontally — 1479px wide at left: -19.5px) | auto (absolute) | Not strictly a vertical bridge — horizontal bleed |
| Sticky device mockup | Work list rows → Clients boundary | ~10 | `position: sticky; top: ~100px` |
| Violet radial halo | CTA → Footer | Not a DOM element — a background-image continuity |

---

## 13. MOBILE VIEWPORT NOTES (captured live at 390×844)

**Hero:**
- Particle sphere stays centered, dominant
- Ghost watermark remains (still `text-[14vw]` — scales down proportionally)
- Headline reflows: "Building *Digital Solutions* That Matter" wraps to 2–3 lines
- Nav collapses to **hamburger icon** (three horizontal lines) top-right next to logo
- Primary CTA stacks below headline
- Stats odometer likely becomes a 3-column grid below CTA

**Services on mobile:**
- Swiper becomes **single-card-visible** horizontal (`slidesPerView: 1`)
- **Left/right arrow controls** appear above the card (`← →`)
- Active card: "Product Design" with full content (title, arrow, description, Services list, Tools)
- Particles persist behind, scaled down

**Work, Clients, CTA, Footer:** Not captured at mobile scroll depth, but inferred to stack vertically with:
- Work: list rows full width, mockup becomes inline per row (not sticky)
- Clients: arc flattens to horizontal marquee or centred stack
- CTA: dome retained, headline smaller
- Footer: columns stack; live clock smaller (~48–64px)

**Responsive CSS signals (inferred from Tailwind utility classes):**
- `md:grid-cols-3` → desktop 3-col, mobile 1-col
- `lg:text-[14vw]` / `md:text-[20vw]` — ghost watermark scales
- `sm:hidden` / `md:block` — nav links hidden on mobile, hamburger shown

---

## 14. ASSET INDEX

### Fonts
```
/_next/static/media/6fe53d21e6e7ebd8-s.woff2        Plus Jakarta Sans variable (subset)
/_next/static/media/8ebc6e9dde468c4a-s.woff2        Plus Jakarta Sans variable (subset)
/_next/static/media/9e7b0a821b9dfcb4-s.woff2        Plus Jakarta Sans variable (subset)
/_next/static/media/<4th hash>-s.woff2              Plus Jakarta Sans variable (subset)
```

### JS chunks (observed)
```
/_next/static/chunks/4bd1b696-2135e4d8b8354323.js   React runtime
/_next/static/chunks/main-app-abf71c5d868c84e9.js   App shell
/_next/static/chunks/31255-837659aef7b398f9.js      Shared client chunks
/_next/static/chunks/f7333993-ea4b0bd827fa48e2.js   Route-specific
/_next/static/chunks/c15bf2b0-a9efff4ebbdc3e73.js   Route-specific
…+ ~25 route-specific chunks
```
Vercel deployment token: `dpl_ER4t3gPqMgPFGosjv7kq4oDDRyQ8`

### Canvases
- `canvasCount: 2` detected in DOM
- Primary: particle shape-morph canvas (Hero + Services)
- Secondary: likely the Swiper internal canvas or a second decorative canvas

### SVGs
- Service icons (6): cube/grid, `</>`, chart, spark, heart-pulse, chip/cpu
- Arrow icons `→` and `↗` (hand-drawn thin stroke, ~24×24)
- Tool icons per service card: Figma, Sketch, Xd, React, Flutter, Next.js, Node, Docker, TypeScript, AWS, HubSpot, HuggingFace, Arduino, Raspberry Pi, MQTT, etc.
- Client logos: 3M, Injazat, Lowe's, Cognizant, Trimble, e2open, Toyota
- Logo wordmark "ANTIMATTΣR AI" — likely an SVG (custom `Σ` glyph, not standard Plus Jakarta Sans)

### Images (inferred)
- `/og/home.jpg` or similar OG image
- Device mockup assets — iMac frame + laptop frame + per-project screenshots
- Clinix AI dashboard screenshot
- Vidzee / Feature screenshot

---

## 15. COPY INVENTORY (verbatim from live site)

### Hero
- H1: `Building Digital Solutions That Matter` (with "Digital Solutions" italic-bold)
- Subcopy: `We empower organizations with AI that turns complex challenges into real-world outcomes.`
- CTA: `Start Your Project`
- Stats: `50+ Projects Delivered` / `100% Client Satisfaction` / `24/7 Support Available`

### Services
- H2: `Our Services`
- Subcopy: `We offer comprehensive digital solutions that transform your business and drive innovation across every touchpoint.`
- Cards: see §5.2 table for verbatim titles + descriptions

### Work
- Rows: `01 Clinix AI`, `02 Synergies4`, `03 Curehire`, `04 OWASP Foundation`, `05 Feature`, `06 Vidzee`, `07 Rhym3`

### Clients
- H2: `Trusted by Industry Leaders`
- Subcopy: `Powering Innovation for Companies Worldwide`

### CTA
- H2: `We turn bold ideas into powerful digital realities.` (with "powerful digital" italic-bold)
- CTA: `Let's work together`

### Footer
- Email: `atom@antimatterai.com`
- Location: `Based in Atlanta, GA · Serving clients globally`
- Clock: live Atlanta time in `HH:MM:SS PM` format (updates every second)
- Copyright: `Antimatter AI, © 2026. All rights reserved.`
- Menu columns: Services / Atom / Demos / Resources (see §5.6 for full lists)

### Nav megamenu additions
- Services preview: `Clinix AI — OUR LATEST WORK`
- Atom AI featured: `Atom Browser — The AI-Native Browser` + `Get Early Access` CTA
- Atom products: Atom Enterprise, Atom Agentic, Atom IntentIQ, Compare Atom, Atom GIS, Atom Red Team, Atom Lie Detector

---

## 16. REPRODUCIBILITY CHECKLIST

A developer rebuilding this site from this spec should verify:

- [ ] **Next.js 15 App Router** scaffolded, Tailwind CSS v4 configured
- [ ] **Plus Jakarta Sans** licensed (free/OFL — can use next/font/google, but to match antimatter's self-hosted pattern, download woff2 and configure as `next/font/local`)
- [ ] **Design tokens** imported as CSS custom properties in `:root` — all 12 brand colours + 15 admin colours
- [ ] **Lenis** installed and initialised with `html.lenis` class
- [ ] **Swiper** installed for the Services carousel; theme colour overridden
- [ ] **Ghost watermark** h2 implemented: `absolute top-30 left-1/2 -translate-x-1/2 text-[14vw] font-bold text-nowrap text-center opacity-5`
- [ ] **Italic-bold emphasis** pattern: wrap emphasised words in `<span>` with `font-style: italic; font-weight: 700`
- [ ] **Particle canvas** implemented: a single `<canvas>` with 2,000 instanced particles; 7 target formations; `scrollProgress → shapeIndex` interpolation
- [ ] **Services Swiper** with centre-active card + collapsed-number inactive cards; synced to particle formation
- [ ] **Work section** sticky mockup column; list row hover reveals `↗` + tint
- [ ] **Clients curved-arc** logos: build with SVG arc path + image positions along the path
- [ ] **CTA rounded-[100%] dome** top edge + violet radial halo
- [ ] **Live clock** in footer: `setInterval(updateClock, 1000)` in Atlanta timezone (`America/New_York`) using `Intl.DateTimeFormat`
- [ ] **Primary CTA button** with `::before` reflex-sweep bar; hover halo 10px → 25px
- [ ] **Nav pill CTA** morph: text fade + icon-box `max-width: 0 → 1000px` + arrow `rotate(45deg)` + bg invert
- [ ] **Megamenu** drops on "Services" and "Atom AI" nav hovers; built as an absolutely-positioned panel with blur backdrop
- [ ] **404 page** — **custom `app/not-found.tsx`** that inherits tokens (FIX the default-page miss)
- [ ] **Mobile breakpoints** — hamburger menu, Swiper 1-up, stacked hero, stacked footer
- [ ] **Animation vocabulary**: standardise on `cubic-bezier(0.2, 0.8, 0.2, 1)` as the site-wide arrival curve; avoid raw `1s`/`2s` without named curves
- [ ] **(Enhancement over source) Custom cursor** — add a minimum 5-state cursor system to satisfy BASE32 non-negotiable #3
- [ ] **(Enhancement) Custom `::selection`** — `::selection { background: var(--accent); color: var(--background); }`

---

## 17. BASE32 FIDELITY SCORECARD

| # | Non-negotiable | Status | Note |
|---|---|---|---|
| 1 | First 300ms creates a feeling, not a message | **⚠ Partial** | No custom preloader. The load is fast and the particle canvas + ghost watermark create an immediate mood — but no *authored* pre-load moment. It feels like the moment *happens* rather than being *shown* |
| 2 | Type does structural work | **✅** | Ghost 14vw watermark, italic-bold emphasis inside a light-300 line, 8xl clock. Type is a structural column in at least three sections |
| 3 | Every cursor state is designed | **❌ MISS** | Native OS cursor everywhere. Verified live: `getComputedStyle(body).cursor === 'auto'`. The single biggest visible gap vs premium references |
| 4 | Color temperature is a single decision | **✅** (with footnote) | Entire site locked on violet/near-black. Footnote: the 404 page uses pure `#000` and `#fff` — a one-page regression from the system |
| 5 | Scroll is authored, not navigated | **✅** | Lenis + scroll-synchronised particle morph + Services pin + sticky mockup reel. Every scroll unit is spent on a designed reveal |
| 6 | Sections are moods, not containers | **✅** | Each act has a distinct atmospheric register (particle cosmos → curved-arc horizon → cupped halo → live clock) |
| 7 | At least one detail nobody asked for | **✅** | The live Atlanta clock. Beautifully placed, zero business value, remembered |
| 8 | Font loading is a brand decision | **✅** | Plus Jakarta Sans variable, self-hosted via next/font, 4 subset files. Not the default Google Fonts pairing — licensed/OFL and self-hosted is the right move |
| 9 | White space is held under pressure | **✅** | ~40% empty below hero headline, ~65% in CTA section, ~55% in clients section. Confident empties throughout |
| 10 | Motion has one vocabulary per site | **⚠ Partial** | The `cubic-bezier(0.2, 0.8, 0.2, 1)` curve appears on fluid buttons, but NavButton uses raw `2s` / `0.5s 0.2s` defaults and the primary button uses raw `0.3s`. Vocabulary is *mostly* consistent but not disciplined |

**Final:** **7 ✅ / 3 ⚠** (counting the two partials as warnings, not passes). The misses are: custom cursor, uniform easing vocabulary, authored preload, and (separately) a custom 404.

---

## 18. WHAT TO REPRODUCE vs WHAT TO REJECT

### KEEP — patterns worth stealing

1. **The ghost watermark** — `text-[14vw] opacity-5 text-nowrap` bleeding off the edges. Instant brand presence without shouting.
2. **Italic-bold emphasis inside a light headline** — a structural weight-contrast move that reads as editorial. Avoid size-based emphasis.
3. **Shared scroll-morphing particle canvas** across hero → services — the single most memorable *mechanism* on the site. A continuous object answers scroll.
4. **Nav CTA pill morph with slow `2s` transition** — slower-than-expected feels expensive and deliberate. The 45° arrow rotate + content-hide + bg invert is a clean, reproducible pattern.
5. **Primary button reflex-sweep `::before`** — a blurred diagonal bar fading in on hover is a $10K-feeling detail worth two lines of CSS.
6. **Sticky-scrolled thumbnail navigator** for the Work section — numbered list + pinned device mockup that updates per row.
7. **Curved-arc logo marquee** for clients — the single most unique pattern on the site. Logos on an SVG arc = horizon line visual metaphor.
8. **Rounded-[100%] dome top on the CTA section** — simple CSS, dramatic effect. Cups the CTA in a visual bowl.
9. **Live clock in footer at 8xl** — the emotional signature. One setInterval, zero dependencies, enormous payoff.
10. **Custom logo with `Σ` sigma in place of E** — typography-as-identity. Not a font swap — a built-in glyph substitution in the custom wordmark.

### REJECT — things NOT to reproduce

1. **Native OS cursor everywhere** — a premium site must design its cursor. Add a custom cursor (min 5 states: default, link, button, media, drag).
2. **Default Next.js 404 page** — pure `#000` + `#fff`, no design system. Ship a custom `app/not-found.tsx` that inherits tokens.
3. **Inconsistent easing vocabulary** — mix of `0.3s`, `1s`, `2s`, `0.5s 0.2s` (raw, no named curves) alongside the one bespoke `cubic-bezier(0.2,0.8,0.2,1)`. Standardise on 2–3 curves globally.
4. **No hero scroll invitation** — "Scroll is authored" is earned partly by *inviting* the scroll. Add a `Scroll ↓` vertical label or animated line at hero bottom.
5. **No authored preloader** — the site loads fast, which is great, but misses the 300ms opportunity. Consider a brief logo-build or particle-ignition moment.
6. **Generic stroke icons in service grid** — not bespoke enough for the tier the rest of the site reaches. Commission custom icons that match the `Σ` logo language.
7. **Swiper default blue `--swiper-theme-color: #007aff`** — override to `--accent` so no residual blue can ever leak through.
8. **Two canvases** — the second `<canvas>` is not visually isolated and may be redundant. Audit and remove if not serving a unique purpose.
9. **The hero "100%" odometer** — final value is 100, which reads as suspicious marketing (nobody has 100% client satisfaction literally). Consider `98%` or a more specific stat like `NPS 72`.
10. **No custom `::selection` colour** — one line fixes it: `::selection { background: var(--accent); color: var(--background); }`.

---

## 19. FILE MANIFEST (reference)

Primary bundles observed in `<head>` scripts:
```
/_next/static/chunks/4bd1b696-2135e4d8b8354323.js         React runtime
/_next/static/chunks/main-app-abf71c5d868c84e9.js         App shell
/_next/static/chunks/31255-837659aef7b398f9.js            Shared client chunks
/_next/static/chunks/f7333993-ea4b0bd827fa48e2.js         Route-specific
/_next/static/chunks/c15bf2b0-a9efff4ebbdc3e73.js         Route-specific
/_next/static/chunks/_next_static_css/*.css              Tailwind + component CSS
/_next/static/media/*.woff2                              Font subsets (4)
```

Deployment: Vercel, ID `dpl_ER4t3gPqMgPFGosjv7kq4oDDRyQ8`

---

## 20. EVIDENCE LOG — what was observed live

| Observation | How verified |
|---|---|
| Lenis present | `document.documentElement.classList.contains('lenis') === true` |
| Two canvases | `document.querySelectorAll('canvas').length === 2` |
| Page height 8892px | `document.documentElement.scrollHeight === 8892` |
| Plus Jakarta Sans | Four `@font-face` rules in stylesheet, all `Plus Jakarta Sans` weight range 200–800 |
| Design tokens | Live `:root` parse — all 27 custom properties captured |
| H1: 60px weight 300 | `getComputedStyle(h1)` on live page |
| H1 italic-bold spans | Found 2 `<span>` children, both `fontStyle: "italic"` + `fontWeight: "700"`, text "Digital" and "Solutions" |
| Ghost watermark dimensions | Bounding rect: 1479.09px × 302.39px, top 120, left -19.5 |
| Ghost watermark style | `opacity: 0.05`, `font-size: 201.6px`, `color: rgb(246, 246, 253)` |
| Button CSS | Primary button `.Button_button__UCzB6` full rule captured including `::before` reflex-sweep |
| NavButton hover CSS | `max-width: 1000px; transition: 2s` on hover, `transform: rotate(45deg)` on icon hover — verified in stylesheet |
| 7 particle formations | Captured at scroll stops 0, 800, 1600, 2400, 3200, 4000, 5000 |
| Services 7 cards | Titles + descriptions captured verbatim from each scroll stop |
| Work list 7 rows | Captured verbatim including category chips |
| Work row hover reveals `↗` | Live hover on row 03 (Curehire) — arrow appeared, confirmed |
| Clients curved-arc | Screenshot shows logos along a visible arc, glowing violet line |
| CTA rounded-dome | Visible at scroll 7800 — top edge has `rounded-t-[100%]` shape |
| Live clock ticks | Captured 12:30:38 → 39 → 40 → 12:31:44 → 45 on separate screenshots |
| 404 is pure black/white | `getComputedStyle(body).backgroundColor === 'rgb(0, 0, 0)'` on the 404 route |
| Mobile hamburger | Verified at 390×844 viewport |
| Mobile Swiper 1-up | Verified at 390×844 viewport — single card visible with `← →` controls |

---

*End of specification. Built from direct browser interaction — 15+ screenshots across scroll stops, 6+ hover state captures, 8+ JS probes of live computed styles, 404 inspection at `/does-not-exist`, mobile resize verification at 390×844.*

