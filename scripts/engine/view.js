import Notifier from './notifier'
import renderersRegistry from './registries/renderers_registry'
import {Container} from '@pixi/display'


export default class View extends Notifier {

    constructor () {
        this.container = createDomContainer()
        this.renderers = new WeakMap()
        this.stage = new Container()
    }


    addNode (node) {
        const renderer = createRendererFrom(node)

        if (renderer) {
            this.renderers.set(node, renderer)
            addToParent(this, node, renderer)
        }
    }


    removeNode (node) {
        const renderer = this.renderers.get(node)

        if (renderer) {
            renderer.destroy()
            this.renderers.delete(node)
        }
    }


}


function getRendererFor (node) {
    return node.renderable && renderersRegistry.get(node.rendererName)
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
        view.stage.addChild(renderer)
    } else if (parent2D) {
        const parentRenderer = this.renderers.get(parent2D)
        parentRenderer.addChild(renderer)
    }
}


function createDomContainer () {
    const container = document.createElement('div')
    container.classList.add('perky_view')

    return container
}