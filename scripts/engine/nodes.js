import Node from './node'
import Node2D from './nodes/node_2d'


export const nodes = {}

registerNode(
    Node,
    Node2D
)


export function registerNode (...newNodeTypes) {
    for (const NodeType of newNodeTypes) {
        nodes[NodeType.name] = NodeType
    }
}


export function getNode (name) {
    return nodes[name]
}
