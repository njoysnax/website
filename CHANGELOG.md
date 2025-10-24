# CHANGELOG

## v1.1 — Enhancements
- **Hero carousel**: Centered within hero section, larger footprint, proper aspect ratio (16:9 desktop / 4:3 mobile), `object-fit: cover`. Added pause-on-hover and swipe on mobile. Honors `prefers-reduced-motion`.
- **Apple-style text cards**: Key text blocks on the home page are wrapped in `.card.reveal` containers with rounded corners, subtle shadows, and clean spacing.
- **On-scroll reveal**: Lightweight `IntersectionObserver` reveals cards with restrained fade/slide animations; animations disabled for users who prefer reduced motion.
- **General polish**: Fluid type scale via `clamp()`, CSS variables, improved spacing. Removed CSS that hid the hero (`.home-visual { display:none }`), ensuring the hero is visible.
- **Performance & accessibility**: No external libs; semantic HTML kept intact; ARIA attributes for the carousel.

## v1.0 — Base site
- Initial structure and content.

## v1.2 — Tweaks
- Carousel interval reduced to **2000 ms** for faster rotation.
- Desktop hero: reduced frame size and switched hero images to **object-fit: contain** on desktop so the entire image is visible.
- Footer: Replaced “Taste the Tradition. Trust the Quality.” with the address “M/s. CENTUM NUTRIFOODS PRIVATE LTD, MSMR HOUSE, 48, Permual Street, Kovilpatti(Tamilnadu).” across all pages.