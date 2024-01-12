import {Container} from '@pixi/display'


function isValid (node) {
    return node.is2D
}


function create (node) {
    const container = new Container()
    init(node, container)

    return container
}


function init (node, container) {
    container.x = node.position.x
    container.y = node.position.y
}


export default {
    isValid,
    create,
    init
}