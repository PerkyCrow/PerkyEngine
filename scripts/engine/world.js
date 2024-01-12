import Notifier from './notifier'

export default class World extends Notifier {

    constructor () {
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

}
