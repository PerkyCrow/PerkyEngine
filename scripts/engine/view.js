import Notifier from './notifier'
import RendererRegistry from './renderer'
import {Container} from '@pixi/display'


export default class View extends Notifier {

    constructor () {
        super()
        this.renderers = new WeakMap()
        this.scene = new Container()
    }


    addRendererFor (node) {
        const renderer = createRendererFrom(this, node)

        if (renderer) {
            this.renderers.set(node, renderer)
            addToParent(this, node, renderer)
        }

        return renderer
    }


    removeRendererFor (node) {
        const renderer = this.renderers.get(node)

        if (renderer) {
            renderer.destroy()
            delete node.renderer
            this.renderers.delete(node)
        }
    }

}


function getRendererFor (node) {
    return node.renderable && RendererRegistry.getRenderer(node.rendererName)
}


function createRendererFrom (view, node) {
    const Renderer = getRendererFor(node)

    if (Renderer) {
        return new Renderer(node)
    }

    return null
}


function addToParent (view, node, renderer) {
    const {parent2D, isRoot2D} = node

    if (isRoot2D) {
        view.scene.addChild(renderer.display)
    } else if (parent2D) {
        const parentRenderer = view.renderers.get(parent2D)
        parentRenderer.display.addChild(renderer.display)
    }
}
