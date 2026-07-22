# SidebarItemView selected for graph nodes

Each React Flow custom node will represent one resource and reuse <code>SidebarItemView</code> for status, navigation, disabled state, and build actions.
The graph still owns the full resource collection and layout data; the custom node receives only the prepared sidebar props for its single resource.
