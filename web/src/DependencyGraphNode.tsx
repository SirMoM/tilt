import React from "react"
import {Background, BackgroundVariant, Edge, Node, Position, ReactFlow,} from "@xyflow/react"
import "@xyflow/react/dist/style.css"
import dagre from "@dagrejs/dagre"
import {UIResource} from "./core";

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
    direction = "RL"
) => {
    const isHorizontal = direction === "RL"
    dagreGraph.setGraph({rankdir: direction})

    nodes.forEach((node) => {
        dagreGraph.setNode(node.id, {width: nodeWidth, height: nodeHeight})
    })

    edges.forEach((edge) => {
        dagreGraph.setEdge(edge.source, edge.target)
    })

    dagre.layout(dagreGraph)

    const newNodes = nodes.map((node) => {
        const nodeWithPosition = dagreGraph.node(node.id)

        return {
            ...node,
            targetPosition: isHorizontal ? Position.Right : Position.Top,
            sourcePosition: isHorizontal ? Position.Left : Position.Bottom,
            // We are shifting the dagre node position (anchor=center center) to the top left
            // so it matches the React Flow node anchor point (top left).
            position: {
                x: nodeWithPosition.x - nodeWidth / 2,
                y: nodeWithPosition.y - nodeHeight / 2,
            },
        }
    })

    return {nodes: newNodes, edges}
}

const nodeDefaults = {
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
}

const initialNodes: DependencyNode[] = []

const initialEdges: DependencyEdge[] = []

export const DependencyGraphNode = ({uiRes}: DependencyGraphNodeProps) => {
    console.log("Rendering DependencyGraphNode")

    const idToNode: Map<string, DependencyNode> = new Map();
    const uiResources: UIResource[] = uiRes

    uiResources.forEach((uiResource) => {
        if (uiResource.metadata?.name == null) {
            console.error("uiResource.metadata?.name is null")
            return;
        }
        console.log(uiResource)
        let name = uiResource.metadata?.name!!;
        idToNode.set(name, {
                id: name,
                position: {x: 0, y: 0},
                data: {label: name},
                ...nodeDefaults,
            }
        )
    })

    uiResources.forEach((uiRes) => {
        const thisName = uiRes.metadata?.name!!
        initialNodes.push({
            id: thisName,
            position: {x: 0, y: 0},
            data: {label: thisName},
            ...nodeDefaults,
        })

        uiRes.status?.resourceDependencies?.forEach((depName) => {

            initialEdges.push({
                id: thisName + "-" + depName,
                source: thisName,
                target: depName,
            })

        })
    })

    const {nodes: layoutedNodes, edges: layoutedEdges} = getLayoutedElements(
        initialNodes,
        initialEdges
    )

    return (
        <div style={{display: "flex", width: "100vw", height: "100vh", gap: 16}}>
      <textarea readOnly style={{flex: 1, resize: "none"}}>
        {
            JSON.stringify(uiResources, null, 4)
        }
      </textarea>
            <textarea readOnly style={{flex: 1, resize: "none"}}>
        {
            JSON.stringify(initialNodes, null, 4)+
            "/n" +
            JSON.stringify(layoutedNodes, null, 4)
        }
      </textarea>
            <textarea readOnly style={{flex: 1, resize: "none"}}>
        {
            JSON.stringify(initialEdges, null, 4) +
            "/n" +
            JSON.stringify(layoutedEdges, null, 4)
        }
      </textarea>
            <div id="can" style={{flex: 2, minWidth: 0}}>
                <ReactFlow
                    colorMode="dark"
                    nodes={layoutedNodes}
                    edges={layoutedEdges}
                    fitView
                    attributionPosition="bottom-left"
                >
                    <Background variant={BackgroundVariant.Dots} gap={12} size={1}/>
                </ReactFlow>
            </div>
        </div>
    )
}