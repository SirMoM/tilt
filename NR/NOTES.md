# Notes

- Teaching language can be German for lesson content because the source notes are German.
- Keep lessons short and directly tied to the Dependency Graph View mission.
- Use existing source notes under `NR/webui/` as the baseline.
- The chosen curriculum is twelve short lessons, including end-to-end backend data delivery.
- Evidence from commits <code>691da8b3e</code> and <code>bb5b46e04</code>: <code>/graph</code> routing and React Flow/Dagre prototype work are already done.
- Do not reteach basic route scaffolding or whether React Flow renders; next teaching should target the remaining integration gaps.
- Lesson 2 is complete: <code>DependencyGraphPane.tsx</code> now owns the graph route page boundary.
- The graph should reuse <code>SidebarItemView</code> as each resource custom node so status, navigation, disabled state, and build actions remain consistent.
- Backend lessons should implement static dependencies end-to-end through <code>UIResourceStatus</code>, tygo, WebSocket updates, and frontend edge mapping.
- <code>UIResourceSpec</code> remains intentionally empty because <code>UIResource</code> is a read model, not desired behavior.
- Lesson 10 is complete: <code>UIResourceStatus.ResourceDependencies</code> is populated by <code>toUIResource()</code> and covered by a focused conversion test.
