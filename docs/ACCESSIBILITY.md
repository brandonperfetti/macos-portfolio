# Accessibility

We aim to meet core accessibility standards across all UI contributions.
When adding or updating components, follow the checklist below.

## Baseline Standards
- Use semantic HTML elements (`button`, `nav`, `main`, `section`, etc.).
- Ensure all interactive elements are keyboard focusable and usable.
- Provide accessible names for controls (`aria-label`, associated `<label>`).
- Maintain visible focus styles for keyboard users.
- Ensure sufficient color contrast between text and backgrounds.
- Avoid relying solely on color to convey meaning.
- Use `aria-*` only when native semantics are insufficient.
- Avoid duplicate `id` values in the DOM.

## Common Patterns
- Prefer `<button type="button">` over clickable `<div>`.
- Use `aria-disabled` only when the control must remain focusable; otherwise use `disabled`.
- Ensure icons with meaning have accessible text (hidden or visible).
- For links opening new tabs, include `rel="noopener noreferrer"`.

## Review Checklist
- Can you complete the flow using only a keyboard?
- Do screen readers announce controls and state clearly?
- Are focus indicators visible on all interactive elements?
- Are headings and landmarks structured logically?

If you’re unsure, add a short comment explaining the accessibility decision.
