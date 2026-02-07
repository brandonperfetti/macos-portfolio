# Documentation

## JSDoc and Comments
Use JSDoc and inline comments to help future engineers understand non-obvious behavior.

Default expectation: when making code changes or adding files, include JSDoc and helpful comments as part of the change (not as a follow-up pass).

### When to Use JSDoc
- Exported components, hooks, and utilities
- Public functions that are used across modules
- Places where types alone don't communicate intent or constraints

### What to Include
- Purpose and high-level behavior
- Params, returns, and side effects when not obvious
- Edge cases, constraints, and invariants

### Comments (Inline)
- Prefer explaining *why* something is done, not *what* the code already says
- Document tricky GSAP math, z-index/focus rules, or window state transitions
- Avoid redundant comments that restate the code

## Examples

### JSDoc for a Hook
```ts
/**
 * Tracks pointer position and derives dock icon scale factors.
 * Uses a Gaussian falloff to keep the dock feel natural.
 */
export function useDockMagnification() {
  // ...
}
```

### JSDoc for a Utility
```ts
/**
 * Returns the next z-index and marks the target window as focused.
 * Side effects: updates `nextZIndex` and `isFocused` flags.
 */
export function focusWindowById(id: WindowId) {
  // ...
}
```

### Inline Comment for Non-Obvious Math
```ts
// Gaussian falloff keeps scale smooth without hard edges.
const intensity = Math.exp(-(distance ** 2.75 / 20000));
```
