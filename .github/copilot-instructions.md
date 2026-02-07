# macOS Portfolio - AI Coding Agent Instructions

## Project Overview
Interactive macOS-inspired portfolio built with React 19, TypeScript, Vite, GSAP, Zustand, and Tailwind CSS 4. Features a complete window management system, animated dock, draggable/resizable windows, and iOS-style mobile layout.

## Architecture

### State Management with Zustand + Immer
Window state is centralized in [src/store/window.ts](../src/store/window.ts) using Zustand with Immer middleware:
- `windows`: Record of all window instances keyed by app id (`finder`, `safari`, `photos`, `contact`, `terminal`, `txtfile`, `imgfile`)
- `nextZIndex`: Auto-incrementing value for focus management
- Actions: `openWindow()`, `closeWindow()`, `focusWindow()` modify state immutably via Immer

**Pattern**: Always use Immer's draft mutations (`state.windows[key].isOpen = true`) instead of returning new objects.

### Constants-Driven Configuration
All app metadata lives in [src/constants/index.ts](../src/constants/index.ts):
- `dockApps`: Dock icon configuration with `canOpen` flags
- `WINDOW_CONFIG`: Initial window state structure
- `locations`: Hierarchical folder/file data for Finder-like navigation
- Uses `as const` assertions for type narrowing

**Pattern**: New windows require entries in both `WINDOW_CONFIG` and `dockApps`.

### Component Architecture
- [src/App.tsx](../src/App.tsx): Root layout with `<Navbar />`, `<Welcome />`, `<Dock />`
- [src/components/Dock.tsx](../src/components/Dock.tsx): GSAP-powered dock with magnification physics
- Barrel exports via [src/components/index.ts](../src/components/index.ts)

## Path Aliases (Critical)
Vite configured with hash-prefixed aliases in [vite.config.ts](../vite.config.ts):
```typescript
import Something from '#components'; // src/components/index.ts
import { navLinks } from '#constants'; // src/constants/index.ts
import useWindowStore from '#store/window'; // src/store/window.ts
```
**Never** use relative imports (`../components`) - always use `#components`, `#constants`, `#store`, `#hoc`, `#windows`.

## Styling Conventions

### Tailwind CSS 4 with Custom Utilities
[src/index.css](../src/index.css) defines project-wide patterns:
- Custom utilities: `flex-center`, `col-center`, `abs-center` for common layouts
- Custom fonts: `font-georama` (sans), `font-roboto` (mono)
- Custom breakpoint: `3xl:` for 1920px+ screens

**Pattern**: Use semantic utility classes from `index.css` instead of repeating `flex items-center justify-center`.

### Component Styling
Dock uses Tailwind + GSAP for animations:
- `.dock-icon` class for hover targets
- GSAP handles scale/translate transforms directly (not via Tailwind)

## GSAP Animation Patterns

### Dock Magnification ([src/components/Dock.tsx](../src/components/Dock.tsx))
```typescript
useGSAP(() => {
  // Mouse-driven Gaussian scaling
  const intensity = Math.exp(-(distance ** 2.75 / 20000));
  gsap.to(el, { scale: 1 + 0.25 * intensity, y: -15 * intensity, duration: 0.2 });
}, []);
```
**Pattern**: Use `@gsap/react` hooks (`useGSAP`) for lifecycle-aware animations. Clean up event listeners in return function.

## Development Workflow

### Commands
```bash
npm run dev      # Start dev server (Vite)
npm run build    # TypeScript check + production build
npm run lint     # ESLint with TypeScript rules
npm run preview  # Preview production build
```

### Type Safety
- Strict TypeScript with project references (`tsconfig.json` → `tsconfig.app.json`)
- `as const` assertions for literal type inference (see `dockApps`)
- Type guards for window keys: `id is keyof typeof windows`

## Adding New Features

### Adding a New Window/App
1. Add entry to `WINDOW_CONFIG` in [src/constants/index.ts](../src/constants/index.ts)
2. Add to `dockApps` array with `canOpen: true`
3. Create window component (reference existing patterns)
4. Update Zustand types if new window requires custom data shape

### Adding Navigation Items
Update `navLinks` in [src/constants/index.ts](../src/constants/index.ts) with `type` matching window keys.

## Key Dependencies
- **dayjs**: Time formatting in Navbar ([src/components/Navbar.tsx](../src/components/Navbar.tsx))
- **react-tooltip**: Dock hover tooltips (`data-tooltip-id` attributes)
- **lucide-react**: Icon components (if used)
- **@tailwindcss/vite**: Tailwind v4 Vite plugin

## Testing Notes
Project currently has no test suite. Manual testing focuses on:
- Window open/close/focus state transitions
- Dock magnification physics across screen sizes
- Mobile responsiveness (iOS-style fallback)
