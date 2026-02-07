# Navigation

## Finder/Locations Structure
Finder-like navigation is driven by `locations` in `src/constants/index.ts`.

- `locations` contains the hierarchical folder/file tree used by the Finder UI
- Keep names and nesting consistent with existing patterns

Pattern: When adding new items, update `locations` to reflect the correct hierarchy and include any metadata used by the UI.
