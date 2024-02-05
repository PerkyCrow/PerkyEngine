import NotifierProxy from './notifier_proxy'
import Registry from './registry'


export default class Renderer {

    static registry = new Registry()

    static isRendererClass = true


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


    static getRenderer (name) {
        return this.registry.get(name)
    }


    static setRenderer (name, RendererClass) {
        this.registry.set(name, RendererClass)
    }


    static setRenderers (...classes) {
        classes.forEach(RendererClass => {
            const name = RendererClass.name.replace('Renderer', '')
            Renderer.setRenderer(name, RendererClass)
        })
    }


}
