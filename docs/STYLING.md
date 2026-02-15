# Styling

## Tailwind CSS 4 with Custom Utilities
`src/index.css` defines project-wide patterns:

- Custom utilities: `flex-center`, `col-center`, `abs-center` for common layouts
- Custom fonts: `font-georama` (sans), `font-roboto` (mono)
- Custom breakpoint: `3xl:` for 1920px+ screens

Pattern: Use semantic utility classes from `index.css` instead of repeating `flex items-center justify-center`.

## Component Styling
Dock uses Tailwind + GSAP for animations:

- `.dock-icon` class for hover targets
- GSAP handles scale/translate transforms directly (not via Tailwind)

## Selectors and IDs
- Use IDs for unique root containers/anchors only (for example window roots like `#finder`, `#contact`).
- Use classes for reusable/internal UI parts (for example `.window-header`).
- Do not reuse the same ID on mounted components; repeated IDs create invalid HTML and brittle selector behavior.
