import Notifier from './notifier'
import Node from './node'


export default class World extends Notifier {

    constructor () {
        super()
        this.isWorld = true
        this.root = null
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

            return true
        }

        return false
    }


    serialize () {
        return {
            root: this.root && this.root.serialize()
        }
    }


    static import (data = {}) {
        const world = new World()

        if (data.root) {
            const root = Node.instantiate(data.root)

            if (root) {
                world.attachRoot(root)
            }
        }

        return world
    }

}
