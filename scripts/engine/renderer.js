
export default class Renderer {

    constructor (node) {
        this.node = node
        this.nodeListeners = {}
    }


    onNode (eventName, listener) {
        const {node, nodeListeners} = this

        if (nodeListeners[eventName]) {
            this.offNode(eventName)
        }

        nodeListeners[eventName] = listener
        node.on(eventName, listener)
    }


    offNode (eventName) {
        const {node, nodeListeners} = this
        const listener = nodeListeners[eventName]

        if (listener) {
            node.off(eventName, listener)
        }
    }


    destroy () {
        const {nodeListeners} = this

        for (const eventName in nodeListeners) {
            this.offNode(eventName)
        }

        if (this.display && this.display.destroy) {
            this.display.destroy()
        }
    }


}
