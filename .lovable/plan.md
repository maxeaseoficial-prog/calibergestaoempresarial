---
title: Brazil Interactive Map Section
description: Redesign the "National Presence" section to feature an interactive Brazil map with state-level hover effects and synchronized chips.
type: feature
---

## Goals
- Replace static office cards with a premium interactive map of Brazil.
- Highlight 10 specific states (MT, MS, PA, AC, AM, SP, PR, RO, BA, PI).
- Implement synchronized hover between the map and a list of state chips.
- Maintain premium, clean, and corporate aesthetic using the official purple palette.

## Technical Details
- **Component**: `src/components/site/NationalPresence.tsx` (redesign).
- **Sub-component**: `src/components/site/BrazilMap.tsx` (new) for SVG logic.
- **Data**: `src/lib/map-data.ts` (new) for state definitions and descriptions.
- **Interactions**: Framer Motion / CSS Transitions for tooltips and highlights.
- **Responsive**: 2-column desktop (42/58 split), stacked mobile.

## Implementation Steps
1. Create `src/lib/map-data.ts` with state IDs, names, and descriptions.
2. Create `src/components/site/BrazilMap.tsx` with optimized SVG paths and hover logic.
3. Rewrite `src/components/site/NationalPresence.tsx` with the new layout (Institutional left, Map right).
4. Implement synchronized state synchronization (shared state or hover events).
5. Add tooltips and mobile touch support.
6. Verify against all 10 states and responsive breakpoints.
