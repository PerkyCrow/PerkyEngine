
export default class Node {

    onInit    () {}
    onAttach  () {}
    onDetach  () {}
    onReady   () {}
    onUpdate  () {}
    onDestroy () {}


    constructor () {
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
            node.onAttach(this)

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
            node.onDetach(this)


            return true
        }

        return false
    }


    removeChild (node) {
        if (this.detachChild(node)) {
            node.destroy()

            return true
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
            this.onUpdate(...args)
            this.children.forEach(child => child.update(...args))
        }
    }


    destroy () {
        Array.from(this.children).forEach(child => this.removeChild(child))

        this.children.length = 0
        this.destroyed       = true
        this.ready           = false

        this.onDestroy()

        if (this.parent) {
            this.parent.removeChild(this)
        }
    }


    notifyChildren (method, ...args) {
        this.children.forEach(child => child[method](...args))
    }


    setReady () {
        if (!this.ready) {
            this.ready = true

            this.notifyChildren('setReady')
            this.onReady()
        }
    }

}
