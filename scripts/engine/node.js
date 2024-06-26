import Model from './model'
import Registry from './registry'
import {getCapability} from './capabilities'


export default class Node extends Model {

    static registry = new Registry()

    static isNodeClass = true

    static renderable = false

    static rendererName = null

    constructor ({renderable, rendererName, name} = {}) {
        super()
        this.ready        = false
        this.destroyed    = false
        this.children     = []
        this.capabilities = new Set()
        this.parent       = null
        this.world        = null
        this.root         = this
        this.renderable   = renderable || this.constructor.renderable
        this.rendererName = rendererName || this.constructor.rendererName
        this.name         = name || this.constructor.name
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


    create (data, params) {
        const node = this.constructor.instantiate(data, params)

        return node && this.attachChild(node)
    }


    add (node) {
        return this.addChild(node)
    }


    hasCapability (capability) {
        let useCapability

        if (typeof capability === 'string') {
            useCapability = getCapability(capability)
        } else if (typeof capability === 'function') {
            useCapability = capability
        }

        return useCapability && this.capabilities.has(useCapability)
    }


    listCapabilities () {
        return Array.from(this.capabilities).map(capability => capability.name)
    }


    use (capability, ...args) {
        let useCapability

        if (typeof capability === 'string') {
            useCapability = getCapability(capability)
        } else if (typeof capability === 'function') {
            useCapability = capability
        }

        if (useCapability && !this.hasCapability(useCapability)) {
            this.capabilities.add(useCapability)
            return useCapability(this, ...args)
        }

        return null
    }


    attachChild (node) {
        if (!node.parent) {
            this.children.push(node)
            node.parent = this
            node.root   = getRoot(this)
            node.emit('attached', this)
            this.emit('attached:child', node)

            if (this.ready && this.world) {
                node.setReady(this.world)
            }

            return node
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
            this.emit('detached:child', node)

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

            return true
        }

        return false
    }


    onDestroy () {

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

        this.onDestroy()
        this.emit('destroyed', parent)

        return true
    }


    callOnChildren (method, ...args) {
        this.children.forEach(child => child[method](...args))
    }


    safeCallOnChildren (method, ...args) {
        Array.from(this.children).forEach(child => child[method](...args))
    }


    onReady () {

    }


    setReady (world) {
        if (!this.ready && world) {
            this.ready = true
            this.world = world

            this.world.emit('node:ready', this)
            this.onReady()
            this.emit('ready', world)
            this.callOnChildren('setReady', world)
        }
    }


    static register (...Nodes) {
        Nodes.forEach(N => this.registry.set(N.name, N))
    }


    static instantiate (data, params) { // eslint-disable-line complexity
        const {registry} = this

        let node

        if (typeof data === 'string') {
            node = registry.instantiate(data, params)
        } else if (typeof data === 'function' && data.isNodeClass) {
            node = new data(params)
        } else if (typeof data === 'object') {
            const {children} = data
            node = registry.instantiate(data.type, data)

            if (node && children) {
                children.forEach(child => node.attachChild(this.instantiate(child)))
            }
        }

        return node
    }

}



function getRoot (node) {
    return node.parent ? getRoot(node.parent) : node
}


Node.register(Node)
