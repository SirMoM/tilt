# Tilt Web UI Dependency Graph Resources

## Knowledge

- [Local note: `Overview.md`](Overview.md)
  Project-level Tilt orientation.
  Use for: locating major repo areas and local UI startup commands.
- [Local note: `webui/Rendering-Stack.md`](webui/Rendering-Stack.md)
  Existing summary of the Web UI stack and `View` data flow.
  Use for: routing, WebSocket state, and where rendering begins.
- [Local note: `webui/Übung-Dependency-Graph-View.md`](webui/%C3%9Cbung-Dependency-Graph-View.md)
  Exercise plan for adding a third Dependency Graph View.
  Use for: sequencing practical implementation work.
- [Local note: `webui/Dependency-Graph-Nodes-und-Storybook.md`](webui/Dependency-Graph-Nodes-und-Storybook.md)
  Component-first plan for graph nodes and Storybook stories.
  Use for: designing `DependencyGraphNode` before graph integration.
- [Local note: `webui/Dependency-Graph-Datenquelle.md`](webui/Dependency-Graph-Datenquelle.md)
  Existing analysis of `UIResource`, current blocker state, and backend `Manifest.ResourceDependencies`.
  Use for: deciding where graph edges can come from.
- [React Router v6 documentation](https://reactrouter.com/6.30.3)
  Official documentation for `Routes`, `Route`, wildcard paths, URL params, and `useNavigate`.
  Use for: adding `/graph` and resource-detail navigation.
- [React Flow documentation](https://reactflow.dev)
  Official documentation for `@xyflow/react`, custom nodes, handles, `ReactFlow`, and `nodeTypes`.
  Use for: graph rendering once routing and node shape are clear.
- [Storybook 6 documentation](https://storybook.js.org/docs/6)
  Official documentation for isolated component stories.
  Use for: graph-node states before full integration.

## Wisdom (Communities)

- [Tilt GitHub repository](https://github.com/tilt-dev/tilt)
  Use for: checking upstream implementation patterns and discussing real contribution constraints.
- [React Flow GitHub discussions](https://github.com/xyflow/xyflow/discussions)
  Use for: graph-specific UI questions after the Tilt data model is understood.

## Gaps

- Need one code-grounded walkthrough of the exact current `HUD.tsx` route structure.
- Need one code-grounded walkthrough of how generated Go model fields become `web/src/*.d.ts` TypeScript fields.
