# Mission: Tilt Web UI Dependency Graph

## Why
I want to understand the Tilt Web UI well enough to build a Dependency Graph View myself.
The concrete target is to work confidently across routing, data flow, node rendering, Storybook, and the backend dependency data source.

## Success looks like
- I can explain how the Web UI receives `View` data and routes it through `HUD`.
- I can add a new `/graph` route without breaking the existing overview and resource pages.
- I can design a graph node in Storybook before integrating it into React Flow.
- I can distinguish current UI blocker state from static backend dependency data.
- I can expose static dependencies through `UIResourceStatus`, generated TypeScript types, and existing WebSocket updates.
- I can reuse `SidebarItemView` as a React Flow custom node with its existing status, navigation, and build actions.

## Constraints
- Keep lessons short and tied to the existing Tilt codebase.
- Prefer small retrieval tasks over long explanations.
- Use the existing repo stack: React 17, TypeScript, React Router 6, Material UI v4, `styled-components`, Storybook 6, Yarn 4.

## Out of scope
- Rebuilding the whole Tilt UI architecture.
- Learning React or TypeScript from zero.
- Designing a production-grade graph layout before the data source and routing are understood.
