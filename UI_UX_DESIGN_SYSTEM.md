# Syntra — Complete Frontend UI/UX & Design System Specification

A complete, turnkey blueprint documenting the visual design language, typography, color system, motion physics, layout architecture, and UI/UX components of **Syntra**. Use this guide to recreate the frontend identically in any modern web stack (React, Next.js, Vue, Svelte, or vanilla HTML/CSS).

---

## 1. Brand Identity & Aesthetic Persona

- **Brand Name:** Syntra
- **Niche / Industry:** Motion-first creative editing studio (video production, motion graphics, thumbnails, branding, and digital design).
- **Core Taglines:**
  - *"Editing-first creative studio"* (Pill eyebrow)
  - *"We craft stories that convert."* (Hero title)
  - *"A creative studio shaping digital experiences — frame by frame."* (About section)
- **Design Persona:** **Dark Luxury Cyber-Editorial & High-Tech Motion Studio**.
- **Key Design Principles:**
  - **Cinematic Contrast:** Pitch obsidian matte darks (`#080808`) balanced with glowing golden-amber highlights (`#FFD100`).
  - **Tactile Surfaces:** Translucent glassmorphism (`backdrop-filter: blur(20px)`), hairline borders, and subtle grain/ambient radial glows.
  - **Editorial Precision:** Avant-garde geometric display headings paired with ultra-clean modern sans-serif body copy.
  - **Motion Choreography:** Intentional physics-driven transitions (`cubic-bezier(0.22, 0.9, 0.18, 1)`), view-trigger animations, infinite tickers, and interactive micro-states.

---

## 2. Typography System

The design system uses two distinct typefaces imported via Google Fonts:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
```

### Font Allocations
1. **Display Font (`--font-display`):** `'Syne', system-ui, sans-serif`
   - **Usage:** Headings (`h1`–`h4`), large statistical metrics, process step numbers, modal titles.
   - **Characteristics:** Wide stance, sculpted curves, high-fashion geometric tech vibe.
2. **Body Font (`--font-body`):** `'Inter', system-ui, sans-serif`
   - **Usage:** Navigation links, paragraphs, card descriptions, labels, form inputs, button copy.
   - **Characteristics:** Clean, highly legible, modern neutral grotesque sans.

### Typographic Scale

| Role | Font Family | Size | Weight | Line Height | Tracking | Text Transform |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Title (H1)** | Syne | `clamp(2.8rem, 7vw, 6rem)` | 700 / 800 | `1.05` | `-0.025em` (tight) | None |
| **Section Titles (H2)** | Syne | `clamp(1.875rem, 4vw, 2.5rem)` | 700 | `1.15` | `-0.02em` | None |
| **Card / Modal Headings (H3/H4)** | Syne | `1.125rem` – `1.5rem` | 600 / 700 | `1.25` | Normal | None |
| **Stat Counter Values** | Syne | `clamp(2.5rem, 6vw, 5rem)` | 800 | `1.00` | Normal | None |
| **Process Step Ghost Numbers** | Syne | `clamp(3.0rem, 7vw, 6rem)` | 800 | `1.00` | Normal | None |
| **Eyebrows & Micro-Headers** | Inter | `10px` | 600 | `1.20` | `0.30em` | UPPERCASE |
| **Pill Badges** | Inter | `10px` | 600 | `1.20` | `0.20em` | UPPERCASE |
| **Navigation & Button Copy** | Inter | `11px` | 600 / 700 | `1.20` | `0.18em` – `0.25em` | UPPERCASE |
| **Body Paragraphs** | Inter | `14px` – `16px` | 300 / 400 | `1.65` | Normal | None |
| **Captions / Microcopy** | Inter | `12px` | 400 | `1.50` | Normal | None |

---

## 3. Color Tokens & Theme System

The design system supports both **Dark** (default) and **Light** modes via CSS custom properties and a root `[data-theme="dark"]` attribute.

### Core Brand Accents
- **Primary Brand Accent (Yellow):** `#FFD100` (RGB: `255, 209, 0`)
- **Accent Dim:** `rgba(255, 209, 0, 0.18)`
- **Accent Glow:** `rgba(255, 209, 0, 0.35)`
- **Accent Gradient:** `linear-gradient(135deg, #FFD100 0%, #ffb700 50%, #FFD100 100%)`
- **Brand Pitch Black:** `#080808`

### Complete CSS Variable Tokens

```css
/* LIGHT THEME */
:root {
  --font-display: 'Syne', system-ui, sans-serif;
  --font-body: 'Inter', system-ui, sans-serif;

  --brand-yellow: #FFD100;
  --brand-yellow-dim: rgba(255, 209, 0, 0.18);
  --brand-yellow-glow: rgba(255, 209, 0, 0.35);
  --brand-black: #080808;

  --bg-primary: #f9f9f7;
  --bg-secondary: #f2f2ee;
  --bg-card: rgba(255, 255, 255, 0.92);
  --bg-card-hover: rgba(255, 255, 255, 0.98);
  --bg-overlay: rgba(0, 0, 0, 0.04);
  --bg-gradient-start: rgba(255, 255, 255, 0.04);
  --bg-gradient-end: rgba(255, 209, 0, 0.07);

  --text-primary: #0a0a0a;
  --text-secondary: #3d3d3d;
  --text-tertiary: #737373;
  --text-muted: #a3a3a3;

  --border-color: rgba(10, 10, 10, 0.09);
  --border-hover: rgba(10, 10, 10, 0.18);
  --header-bg: rgba(249, 249, 247, 0.90);
  --modal-bg: rgba(249, 249, 247, 0.98);
  --card-shadow: rgba(0, 0, 0, 0.08);

  --selection-bg: #FFD100;
  --selection-text: #080808;
}

/* DARK THEME */
[data-theme="dark"] {
  --bg-primary: #080808;
  --bg-secondary: #0d0d0d;
  --bg-card: rgba(14, 14, 14, 0.90);
  --bg-card-hover: rgba(20, 20, 20, 0.95);
  --bg-overlay: rgba(255, 255, 255, 0.04);
  --bg-gradient-start: rgba(255, 255, 255, 0.03);
  --bg-gradient-end: rgba(255, 209, 0, 0.08);

  --text-primary: #f5f5f3;
  --text-secondary: #c0c0ba;
  --text-tertiary: #8a8a84;
  --text-muted: #525250;

  --border-color: rgba(255, 255, 255, 0.07);
  --border-hover: rgba(255, 255, 255, 0.15);
  --header-bg: rgba(8, 8, 8, 0.92);
  --modal-bg: rgba(8, 8, 8, 0.98);
  --card-shadow: rgba(0, 0, 0, 0.60);

  --selection-bg: #FFD100;
  --selection-text: #080808;
}
```

---

## 4. Surfaces, Effects & Styling Details

### 1. Ambient Background Blobs
Fixed, non-interactive radial gradients in the background give depth without distracting:
```html
<div class="pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
  <!-- Top Left Blob -->
  <div class="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.035]"
    style="background: radial-gradient(circle, #FFD100 0%, transparent 70%); filter: blur(60px);" />
  <!-- Bottom Right Blob -->
  <div class="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-[0.025]"
    style="background: radial-gradient(circle, #FFD100 0%, transparent 70%); filter: blur(80px);" />
</div>
```

### 2. Live Dot Eyebrow Pill (`.pill-label`)
```css
.pill-label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 9999px;
  font-size: 10px;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-weight: 600;
  border: 1px solid var(--border-color);
  color: var(--text-tertiary);
  background: var(--bg-overlay);
}
.pill-label::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--brand-yellow);
}
```

### 3. Bento Card Hover Effects (`.bento-card`)
```css
.bento-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  transition: border-color 0.35s ease, background 0.35s ease, transform 0.35s var(--ease-brand), box-shadow 0.35s ease;
  will-change: transform;
  overflow: hidden;
}
.bento-card:hover {
  border-color: rgba(255, 209, 0, 0.4);
  background: var(--bg-card-hover);
  transform: translateY(-3px);
  box-shadow: 0 20px 50px -15px rgba(255, 209, 0, 0.12);
}
```

### 4. Shimmer Primary Button (`.btn-shimmer`)
```css
.btn-shimmer {
  position: relative;
  overflow: hidden;
  background: var(--brand-yellow);
  color: #080808;
}
.btn-shimmer::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%);
  background-size: 200% 100%;
  opacity: 0;
  transition: opacity 0.3s;
}
.btn-shimmer:hover::after {
  opacity: 1;
  animation: shimmer 0.8s ease forwards;
}
@keyframes shimmer {
  from { background-position: -200% center; }
  to   { background-position:  200% center; }
}
```

---

## 5. Motion, Easing & Choreography

- **Custom Brand Curve:** `cubic-bezier(0.22, 0.9, 0.18, 1)`
- **Duration Scale:**
  - Micro-states (buttons, links): `300ms`
  - Medium cards & reveals: `500ms`
  - Theme switches: `350ms`
- **Scroll Reveal Technique (`useReveal`):**
  - Unrevealed: `opacity: 0; transform: translateY(14px);`
  - Revealed: `opacity: 1; transform: translateY(0);`
- **Continuous Marquee Ticker:**
  - 35s linear infinite translation (`translateX(0)` to `translateX(-50%)`).
  - Pauses automatically on user hover (`animation-play-state: paused`).
  - Edge fade masks: `mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent)`.
- **Accessibility:**
  - When `prefers-reduced-motion: reduce` is detected, animations immediately complete at `0.01ms` duration with zero translation.

---

## 6. Structural Layout & Component Specifications

### Header & Sticky Navigation
- **Height / Position:** Fixed top `0`, height `64px`, `backdrop-filter: blur(24px)`.
- **Left:** Brand logo (height 32px) with soft ambient drop-shadow.
- **Center:** Desktop nav items in 11px uppercase tracking `0.18em`: `About`, `Services`, `Testimonials`, `Process`, `Contact`.
- **Right:**
  - Celestial toggle switch (Sun & Moon states with clouds and star map).
  - "Start a project →" pill CTA button (`.btn-shimmer`).
  - Mobile hamburger toggle for touch viewports.

### Hero Section
- **Vertical Edge Metadata (Desktop):**
  - Left edge: Rotated text `Experiential · Branding · Digital` (tracking `0.4em`).
  - Right edge: `India · IST · [Live Clock HH:MM in Asia/Kolkata timezone]`.
- **Primary Content:**
  - Pill label: `Editing-first creative studio`
  - H1 headline: `We craft stories` / `<span style="color: var(--brand-yellow);">that convert.</span>`
  - Horizontal metric strip: `150+ Projects`, `60+ Happy Clients`, `5 Countries`, `100% Delivery Rate`, `2023 Founded`.
  - Action buttons: `View Services →` (Shimmer Yellow) and `Start a project` (Outlined).
- **Hero Visual Card:**
  - 4:5 aspect ratio mock editing viewport with timeline scrubber indicators, bezier guides, and choreographed geometry.

### Continuous Infinite Marquee
- Marquee tags repeated twice:
  `Video Editing` • `Motion Graphics` • `Brand Identity` • `Thumbnail Design` • `Web Design` • `Content Strategy` • `Logo Design` • `Reels & Shorts`
- Bullet dividers: `w-1.5 h-1.5 rounded-full bg-yellow-400`.

### About Section
- Two-column split layout:
  - **Left:** Full story narrative inside a card with top hairline gradient (`from-transparent via-yellow-400/40 to-transparent`).
  - **Right:** "Our Focus" bulleted list with yellow status indicators, followed by 2 metadata cards (`Based in: India` and `Founded: 2025`).

### Services Section & Bento Grid
- **Category Navigation Tabs:**
  - 5 pill tabs: `VIDEO`, `GRAPHICS`, `THUMBNAILS`, `CONTENT`, `WEB`.
  - Active Tab: Golden border, yellow glow shadow (`0 0 28px rgba(255,209,0,0.2)`), 10% yellow fill.
- **Category Overview Banner:**
  - Dynamic explanatory copy for the selected category + detailed service stack itemization.
- **Bento Grid Layout:**
  - Cards adapt responsively: 3-column for Video, 4-column for Graphics, 3-column for Thumbnails, 2-column for Content/Web.
  - Cards feature category tag eyebrow, title, description, and hover slide arrow `Learn more →`.
- **Interactive Multi-Media Modal:**
  - Fullscreen backdrop blur (`backdrop-filter: blur(24px)`).
  - Handles YouTube video players, Google Drive video streams, Instagram Reels branded cards, live Website preview iframes, and image gallery lightbox triggers.

### Process Section
- 4-step sequence (`01 Discovery`, `02 Draft`, `03 Edit`, `04 Deliver`).
- Horizontal gradient connecting hairline.
- Giant ghost numerals (`.step-num`) with `clamp(3rem, 7vw, 6rem)` in low-opacity yellow (`rgba(255, 209, 0, 0.12)`) that light up to `0.22` opacity on hover.

### Dynamic Stats Section
- Golden gradient clipped numerals (`clamp(2.5rem, 6vw, 5rem)`, weight 800) powered by an automated count-up trigger on scroll entry.

### Team Section
- Centered member card featuring circular monogram initials avatar in an amber glowing ring (`border: 2px solid rgba(255,209,0,0.3); background: rgba(255,209,0,0.08)`).
- Member name pill badge + role description (`Owner / Founder`).

### Testimonials Section
- 3-column grid (`md:grid-cols-2 lg:grid-cols-3`).
- Cards include 48px round client avatar with amber border, client name, company/creator handle, gold star rating (`★`), and quote.

### Contact Section
- **Left Column:** Headline `Let's make something great.` + 3 social pill cards (Instagram, WhatsApp, Email) with hover offset and slide arrows.
- **Right Column:** Glassmorphism card (`backdrop-filter: blur(20px)`) with animated floating input labels, validation error alerts, and full-width shimmer submit button.

### Footer
- 3-column structure:
  1. Brand logo + elevator pitch.
  2. "Navigate" anchor directory.
  3. "Connect" social direct links.
- Bottom line: `© 2025 Syntra. All rights reserved.` | `Crafted with ♥ in India`.

---

## 7. Tailwind CSS Configuration Reference

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-black': '#070707',
        'brand-yellow': '#FFD100',
      },
      fontFamily: {
        display: ['Syne', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      transitionDuration: {
        'fast': '300ms',
        'medium': '500ms',
      },
      transitionTimingFunction: {
        'brand': 'cubic-bezier(0.22, 0.9, 0.18, 1)',
      },
    },
  },
  plugins: [],
};
```
