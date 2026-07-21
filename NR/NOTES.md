# Notes

- Teaching language can be German for lesson content because the source notes are German.
- Keep lessons short and directly tied to the Dependency Graph View mission.
- Use existing source notes under `NR/webui/` as the baseline.
- The chosen curriculum is nine short lessons, matching the implementation path while splitting confusing data and graph-rendering topics.
- Evidence from commits <code>691da8b3e</code> and <code>bb5b46e04</code>: <code>/graph</code> routing and React Flow/Dagre prototype work are already done.
- Do not reteach basic route scaffolding or whether React Flow renders; next teaching should target the remaining integration gaps.
- Lesson 2 is complete: <code>DependencyGraphPane.tsx</code> now owns the graph route page boundary.
