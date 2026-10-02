# Premium Portfolio — Vishal Pandey, Senior React Native Developer

A dark-first, Apple/Linear-quality single-page portfolio with immersive project case studies, built entirely from the CV (source of truth — nothing invented).

## Design system

- Deep charcoal / near-black background, off-white type, one refined accent (warm amber), thin borders, subtle grain, sparing glassmorphism
- Large display typography (a premium serif-leaning display + clean sans body), generous whitespace, rounded cards, premium shadows
- Motion: scroll reveals, staggered text, parallax, magnetic buttons, count-up numbers, smooth section transitions — all respecting `prefers-reduced-motion` and fast on mobile

## Page structure (single-page app at `/`)

1. **Hero** — professional photo, name, "Senior React Native Developer", positioning statement, 5+ years, CTAs ("View My Work", "Let's Work Together"), LinkedIn/GitHub links, subtle animated glow/grid backdrop
2. **About** — narrative intro communicating what Vishal builds and solves (not a tech wall)
3. **Proof / credibility** — animated count-up stats from the CV: 5+ years, 9 production apps, 5,000+ concurrent users, 60% fewer upload failures, 35% checkout conversion lift, 50% donation efficiency
4. **Experience timeline** — scroll-revealed: Isynbus (2023–26), Planify Capital (2022–23), Oodles (2021–22), The WebPlant (2020–21), with roles, achievements, tech
5. **Featured projects** — large immersive case-study cards for the 9 shipped apps: Besein, Zien, Diosync, Bunchy, YDF, Cyberwolf Service, Jabburr, Planify, Parure La Plee — each with description, role, stack, key features, platform, impact metrics, and the real App Store / Play Store links provided
6. **Project detail** — clicking a project opens a case-study view (Overview / Product / Role / Challenges / Solution / Tech / Outcome / Links) with smooth shared-element-style transition; only CV-verified content, concise where public info is thin
7. **Tech stack** — grouped interactive section (Mobile, Languages, State/Data, Backend/APIs, Payments, Maps, DevOps, Testing) with hover states, CV-only technologies
8. **Working with me** — services supported by the CV (new apps, migration, performance, architecture, payments, auth, AI integrations, store deployment)
9. **Contact** — "Have a product in mind?" CTA with email, LinkedIn, GitHub buttons

## Technical details

- TanStack Start + Tailwind v4; design tokens in `src/styles.css` (oklch), fonts via `<link>` in `__root.tsx`
- Photo uploaded to CDN via lovable-assets and used in the hero
- Motion via CSS animations + IntersectionObserver-based reveals (no heavy animation library); lazy-loaded images, semantic HTML, keyboard-accessible
- SEO: per-route `head()` with title/description/OG/Twitter tags targeting "Senior React Native Developer" etc., structured data (Person schema)
- Fully responsive with a deliberate mobile layout and premium mobile menu
- No backend needed — all content is static from the CV
