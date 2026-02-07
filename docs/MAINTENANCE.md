# Maintenance

## Change Review Checklist
Use this after feature work or refactors to keep code comments and documentation accurate.

- Review files changed in the current branch or last commit.
- Add/update JSDoc for exported components, hooks, and utilities that changed.
- Add/update inline comments where behavior is non-obvious (why, edge cases, invariants).
- Prefer adding comments and JSDoc during the change, not in a follow-up pass.
- Update relevant docs in `docs/` when behavior, architecture, or workflows changed.
- Verify `.github/copilot-instructions.md` links are still accurate and add any new doc references.

## Suggested Order
1. Code: update JSDoc/comments in changed files.
2. Docs: update `docs/` entries that describe the changed behavior.
3. Instructions: update `.github/copilot-instructions.md` if new docs or new top-level rules were introduced.
