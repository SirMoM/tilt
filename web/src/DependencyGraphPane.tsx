import React from "react"
import styled from "styled-components"
import { DependencyGraphNode } from "./DependencyGraphNode"
import HeaderBar, { HeaderBarPage } from "./HeaderBar"
import LogStore from "./LogStore"
import PathBuilder from "./PathBuilder"
import SidebarItem from "./SidebarItem"
import { Color } from "./style-helpers"
import { ResourceView } from "./types"
import type { View } from "./webview"
import {UIResource} from "./core";

type DependencyGraphPaneProps = {
  view: View
  isSocketConnected: boolean
  logStore?: LogStore
  pathBuilder?: PathBuilder
}

// Needed for letting the HeaderBar component render correctly (grow to width of window)
const DependencyGraphPaneRoot = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background-color: ${Color.gray20};
`
// TODO:
const DependencyGraphContent = styled.div`
  flex: 1;
  min-height: 0;
`

export default function DependencyGraphPane({
  view,
  isSocketConnected,
  pathBuilder,
}: DependencyGraphPaneProps) {
  const graphResources: UIResource[] = view.uiResources ?? []

  return (
    <DependencyGraphPaneRoot>
      <HeaderBar
        view={view}
        currentPage={HeaderBarPage.Grid}
        isSocketConnected={isSocketConnected}
      />

      <DependencyGraphContent aria-label="Dependency graph">
        {graphResources && pathBuilder && graphResources.length > 0 && (
          <div>
            <h2>Dependency Graph</h2>
            <DependencyGraphNode uiRes={graphResources} />
          </div>
        )}
      </DependencyGraphContent>
    </DependencyGraphPaneRoot>
  )
}
