# macOS Portfolio - AI Agent Instructions

Interactive macOS-inspired portfolio built with React 19, TypeScript, Vite, GSAP, Zustand, and Tailwind CSS 4.

## Essentials
- Package manager: npm (see `package-lock.json`)
- Commands: `npm run dev`, `npm run build`, `npm run lint`, `npm run preview`

## Types
- Shared type definitions live in `src/types/` and are re-exported via the `#types` alias.
- Finder data uses discriminated unions (`kind` + `fileType`) to keep rendering type-safe.
- Prefer `satisfies` for config/data objects (`dockApps`, `locations`, `WINDOW_CONFIG`) to enforce shape without losing literals.

## Progressive Disclosure
- Architecture and aliases: `docs/ARCHITECTURE.md`
- Accessibility standards: `docs/ACCESSIBILITY.md`
- Styling and Tailwind conventions: `docs/STYLING.md`
- GSAP patterns: `docs/ANIMATION.md`
- Workflow and type safety: `docs/WORKFLOW.md`
- Feature additions: `docs/FEATURES.md`
- Testing notes: `docs/TESTING.md`
- Key dependencies: `docs/DEPENDENCIES.md`
- Finder/navigation structure: `docs/NAVIGATION.md`
- Window state patterns: `docs/STATE.md`
- Documentation guidance: `docs/DOCUMENTATION.md`
- Maintenance checklist: `docs/MAINTENANCE.md`
