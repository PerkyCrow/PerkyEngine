import Model from './model'


export default class Node extends Model {

    constructor () {
        super()
        this.ready     = false
        this.destroyed = false
        this.children  = []
        this.parent    = null
        this.world     = null
        this.root      = this
    }


    get type () {
        return this.constructor.type || this.constructor.name
    }


    get isNode () {
        return true
    }


    get isRoot () {
        return this.root === this
    }


    get isWorldRoot () {
        return this.world && this.world.root === this
    }


    attachChild (node) {
        if (!node.parent) {
            this.children.push(node)
            node.parent = this
            node.root   = getRoot(this)
            node.emit('attached', this)

            if (this.ready && this.world) {
                node.setReady(this.world)
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
            node.world  = null
            node.root   = node
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

        const {destroyed, parent, world} = this

        if (destroyed) {
            return false
        }

        this.safeCallOnChildren('destroy')

        if (world) {
            world.emit('node:destroy', this)
        }

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


    setReady (world) {
        if (!this.ready && world) {
            this.ready = true
            this.world = world

            this.emit('ready', world)
            this.world.emit('node:ready', this)
            this.callOnChildren('setReady', world)
        }
    }

}



function getRoot (node) {
    return node.parent ? getRoot(node.parent) : node
}

