# CLAUDE.md

## Before Building: Confirm Geometry & Layout Intent
For any spatial/layout spec (grids, lattices, planes, axes, cell counts), restate your interpretation in 2-3 lines and list the edge cases (odd vs even viewport cell counts, half-cell offsets, origin alignment) BEFORE writing code. Do not start implementation until the interpretation is confirmed.

## Visual & UI Changes
When implementing visual effects (glints, shadows, fades, slice animations), keep them subtle by default and scoped to the element that triggered them - never screen-anchored or global. Effects must have symmetric in/out transitions (e.g. hover delay AND fade-out) and be applied per-instance, not globally. Before declaring done, describe the visual result in one sentence so I can sanity-check it without a screenshot round-trip.

## Verification Before 'Done'
Do not report a task complete until you have shown evidence: build output, passing tests, lint clean, and for anything served over HTTP/browser, an actual request or browser check. If a background task (world reset, server bind, scan run) claims success, prove it by re-reading the resulting state - do not trust the task's own return value.

## Environment Notes
- Dev runs under WSL: services must bind 0.0.0.0, not 127.0.0.1, to be reachable from Windows/Postman. Check the WSL IP with `ip addr show eth0`.
- Playwright MCP cannot launch as root; run browser automation as a non-root user and ensure the MCP config is registered at project scope, not just user scope.
- Paper 26.x nests dimension folders under the primary world folder - account for this in any world reset/delete logic.
