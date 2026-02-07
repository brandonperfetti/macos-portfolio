# Animation

## Dock Magnification (`src/components/Dock.tsx`)
Use `@gsap/react` hooks (`useGSAP`) for lifecycle-aware animations. Clean up event listeners in the return function.

Pattern: Mouse-driven Gaussian scaling with GSAP `to()` updates for scale and Y offset. Keep transforms in GSAP, not Tailwind.
