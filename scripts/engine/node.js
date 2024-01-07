import Notifier from './notifier'


export default class Node extends Notifier {

    constructor () {
        super()
        this.ready     = false
        this.destroyed = false
        this.children  = []
    }


    get type () {
        return this.constructor.type || this.constructor.name
    }


    get root () {
        return this.parent ? this.parent.root : this
    }


    isRoot () {
        return !this.parent
    }


    attachChild (node) {
        if (!node.parent) {
            this.children.push(node)
            node.parent = this
            node.emit('attached', this)

            if (this.ready) {
                node.setReady()
            }

            return true
        }

        return false
    }


    addChild (node) {
        if (node.parent) {
            node.parent.detachChild(node)
        }

        return this.attachChild(node)
    }


    detachChild (node) {
        const index = this.children.indexOf(node)

        if (index !== -1) {
            this.children.splice(index, 1)
            node.parent = null
            node.emit('detached', this)

            return true
        }

        return false
    }


    removeChild (node) {
        if (node.parent === this) {
            return node.destroy()
        }

        return false
    }


    findChild (filter) {
        if (typeof filter === 'string') {
            return this.children.find(child => child.name === filter)
        } else if (typeof filter === 'function') {
            return this.children.find(filter)
        }

        return null
    }


    findChildren (filter) {
        return filter ? this.children.filter(filter) : Array.from(this.children)
    }


    update (...args) {
        if (this.ready) {
            this.emit('update', ...args)
            this.children.forEach(child => child.update(...args))
            this.emit('updated', ...args)
        }
    }


    destroy () {
        if (this.destroyed) {
            return false
        }

        this.safeCallOnChildren('destroy')

        const {parent} = this
        if (parent) {
            parent.detachChild(this)
        }

        this.children.length = 0
        this.destroyed       = true
        this.ready           = false

        this.emit('destroyed', parent)

        return true
    }


    callOnChildren (method, ...args) {
        this.children.forEach(child => child[method](...args))
    }


    safeCallOnChildren (method, ...args) {
        Array.from(this.children).forEach(child => child[method](...args))
    }


    setReady () {
        if (!this.ready) {
            this.ready = true

            this.callOnChildren('setReady')
            this.emit('ready')
        }
    }

}
