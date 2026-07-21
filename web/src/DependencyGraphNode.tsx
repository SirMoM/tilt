import React from "react"
import {
  Background,
  BackgroundVariant,
  Edge,
  Node,
  Position,
  ReactFlow,
} from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import dagre from "@dagrejs/dagre"

type DependencyGraphNodeProps = {
  children?: React.ReactNode
  uiRes?: any
}

const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}))

const nodeWidth = 172
const nodeHeight = 36

type DependencyNode = Node<{ label: string }>
type DependencyEdge = Edge

const getLayoutedElements = (
  nodes: DependencyNode[],
  edges: DependencyEdge[],
  direction = "TB"
) => {
  const isHorizontal = direction === "LR"
  dagreGraph.setGraph({ rankdir: direction })

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight })
  })

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target)
  })

  dagre.layout(dagreGraph)

  const newNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id)

    return {
      ...node,
      targetPosition: isHorizontal ? Position.Left : Position.Top,
      sourcePosition: isHorizontal ? Position.Right : Position.Bottom,
      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    }
  })

  return { nodes: newNodes, edges }
}

const nodeDefaults = {
  sourcePosition: Position.Bottom,
  targetPosition: Position.Top,
}

const initialNodes: DependencyNode[] = [
  {
    id: "n1",
    position: { x: 0, y: 0 },
    data: { label: "Node dasdadas1" },
    ...nodeDefaults,
  },
  {
    id: "n2",
    position: { x: 0, y: 0 },
    data: { label: "Node 2" },
    ...nodeDefaults,
  },
  {
    id: "n3",
    position: { x: 0, y: 0 },
    data: { label: "Node 4" },
    ...nodeDefaults,
  },
]

const initialEdges: DependencyEdge[] = [
  { id: "n1-n2", source: "n1", target: "n2" },
  { id: "n3-n1", source: "n3", target: "n1" },
  { id: "n3-n2", source: "n3", target: "n2" },
]

export const DependencyGraphNode = ({ uiRes }: DependencyGraphNodeProps) => {
  console.log("Rendering DependencyGraphNode")
  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    initialNodes,
    initialEdges
  )
  return (
    <div style={{ display: "flex", width: "100vw", height: "100vh", gap: 16 }}>
      <textarea readOnly style={{ flex: 1, resize: "none" }}>
        {JSON.stringify(uiRes, null, 4)}
      </textarea>
      <div id="can" style={{ flex: 2, minWidth: 0 }}>
        <ReactFlow
          colorMode="dark"
          nodes={layoutedNodes}
          edges={layoutedEdges}
          fitView
          attributionPosition="bottom-left"
        >
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        </ReactFlow>
      </div>
    </div>
  )
}
