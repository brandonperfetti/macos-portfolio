# Dependencies

## Key Libraries
Exact versions for these dependencies are tracked in `package.json` and `package-lock.json`; use those files as the source of truth for `lucide-react`, `@radix-ui/react-dropdown-menu`, `tw-animate-css`, `@tailwindcss/vite`, `react-pdf`, and `gsap`/`@gsap/react`.
- `dayjs` - Time formatting in `src/components/Navbar.tsx`
- `react-tooltip` - Dock hover tooltips (`data-tooltip-id` attributes)
- `lucide-react` - Icon components across nav/window/mobile UI
- `@radix-ui/react-dropdown-menu` - Theme mode menu primitives in `src/components/Theme.tsx`
- `tw-animate-css` - Utility animation classes used by Radix menu enter/exit transitions
- `@tailwindcss/vite` - Tailwind v4 Vite plugin
- `react-pdf` - Resume rendering in desktop/mobile resume windows
- `gsap` + `@gsap/react` - Dock magnification and draggable desktop interactions
