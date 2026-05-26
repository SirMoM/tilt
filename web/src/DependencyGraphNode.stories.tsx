import { MemoryRouter } from "react-router"
import { DependencyGraphNode } from "./DependencyGraphNode"
import LogStore from "./LogStore"
import PathBuilder from "./PathBuilder"
import { ResourceNavContextProvider } from "./ResourceNav"
import SidebarItem from "./SidebarItem"
import { Color } from "./style-helpers"
import { oneResource } from "./testdata"
import { ResourceView } from "./types"

const pathBuilder = PathBuilder.forTesting("localhost", "/")

function ItemWrapper(props: { children: React.ReactNode }) {
  let resourceNav = {
    selectedResource: "",
    invalidResource: "",
    openResource: (name: string) => {},
  }

  return (
    <MemoryRouter initialEntries={["/"]}>
      <ResourceNavContextProvider value={resourceNav}>
        {props.children}
      </ResourceNavContextProvider>
    </MemoryRouter>
  )
}

function itemProps() {
  let logStore = new LogStore()
  return {
    item: new SidebarItem(oneResource({}), logStore),
    selected: false,
    resourceView: ResourceView.Log,
    pathBuilder: pathBuilder,
  }
}

export default {
  title: "New UI/Dependancy Graph",
  decorators: [
    // make the pane bg black so that the menu bg stands out
    (Story: any) => (
      <div style={{ backgroundColor: Color.black, height: "300px" }}>
        <Story />
      </div>
    ),
  ],
}

export const Default = () => (
  <ItemWrapper>
    <DependencyGraphNode {...itemProps()}>frontend</DependencyGraphNode>
  </ItemWrapper>
)
