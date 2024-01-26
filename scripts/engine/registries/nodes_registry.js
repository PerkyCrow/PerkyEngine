import Registry from '../registry'
import Node from '../node'
import Node2D from '../nodes/node_2d'
import Rectangle from '../nodes/rectangle'

const registry = new Registry()

registry.addClass(
    Node,
    Node2D,
    Rectangle
)


export default registry
