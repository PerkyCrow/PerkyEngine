import Notifier from './notifier'
import {Sprite} from '@pixi/sprite'
import ContainerRenderer from './renderers/container_renderer'


export default class View extends Notifier {

    static renderers = [
        ContainerRenderer
    ]

    constructor () {
        this.renderers = new WeakMap()
        this.targets = {}
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


function createRendererFrom (view, node) {
    const Renderer = view.constructor.renderers.find(({isValid}) => isValid(node))

    if (Renderer) {
        return Renderer.create(node)
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