
export default class Renderer {

    constructor (node) {
        this.node = node
        this.nodeListeners = {}
        this.init()
    }


    init () {

    }


    onNode (eventName, listener) {
        const {node, nodeListeners} = this

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
    }


    static isValid () {
        return false
    }

}
