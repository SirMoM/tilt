import { render, screen } from "@testing-library/react"
import React from "react"
import { MemoryRouter } from "react-router-dom"
import DependencyGraphPane from "./DependencyGraphPane"
import PathBuilder, { PathBuilderProvider } from "./PathBuilder"
import { SnapshotActionTestProvider } from "./snapshot"
import { oneResourceView } from "./testdata"

describe("DependencyGraphPane", () => {
  beforeEach(() => {
    ;(global as any).Notification = {
      requestPermission: () => Promise.resolve("denied"),
    }
  })

  it("renders the graph route as a page pane with the shared header", () => {
    render(
      <MemoryRouter
        initialEntries={["/graph"]}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <PathBuilderProvider value={PathBuilder.forTesting("localhost", "/")}>
          <SnapshotActionTestProvider
            value={{ enabled: true, openModal: () => {} }}
          >
            <DependencyGraphPane
              view={oneResourceView()}
              isSocketConnected={true}
            />
          </SnapshotActionTestProvider>
        </PathBuilderProvider>
      </MemoryRouter>
    )

    expect(screen.getByLabelText("Dashboard menu")).toBeInTheDocument()
    expect(screen.getByLabelText("Dependency graph")).toBeInTheDocument()
  })
})
