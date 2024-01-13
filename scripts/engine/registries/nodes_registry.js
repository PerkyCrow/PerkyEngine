import Registry from '../registry'
import Node from '../node'
import Node2D from '../nodes/node_2d'

const registry = new Registry()

registry.addClass(
    Node,
    Node2D
)


export default registry
