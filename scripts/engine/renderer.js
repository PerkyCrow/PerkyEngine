import NotifierProxy from './notifier_proxy'


export default class Renderer {

    constructor (node) {
        this.node = node
        this.nodeNotifier = new NotifierProxy({target: node})
    }


    onNode (eventName, listener) {
        return this.nodeNotifier.on(eventName, listener)
    }


    offNode (eventName, listener) {
        return this.nodeNotifier.off(eventName, listener)
    }


    destroy () {
        this.nodeNotifier.removeListeners()

        if (this.display && this.display.destroy) {
            this.display.destroy()
        }
    }

}
