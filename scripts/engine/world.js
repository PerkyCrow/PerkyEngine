import Notifier from './notifier'
import nodesRegistry from './registries/nodes_registry'


export default class World extends Notifier {

    constructor () {
        super()
        this.root = null
    }


    get isWorld () {
        return true
    }


    attachRoot (node) {
        if (!this.root) {
            this.root = node
            node.root = node
            node.setReady(this)

            return true
        }

        return false
    }


    update (delta) {
        if (this.root) {
            this.emit('update', delta)
            this.root.update(delta)
            this.emit('updated', delta)
        }
    }


    serialize () {
        return {
            root: this.root && this.root.serialize()
        }
    }


    static import (data = {}) {
        const world = new World()

        if (data.root) {
            const root = instantiateNode(data.root)

            if (root) {
                world.attachRoot(root)
            }
        }

        return world
    }

}



function instantiateNode (data) {
    const node = nodesRegistry.instantiate(data.type, data)

    if (node) {
        node.children.forEach(child => node.attachChild(instantiateNode(child)))
    }

    return node
}
