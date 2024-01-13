import {Renderer as PixiRenderer} from '@pixi/core'


export default class Renderer {

    constructor (baseParams = {}) {
        const params = getParams(baseParams)
        this.adapter = new PixiRenderer(params)
        init(this, params)
    }

}


function getParams (baseParams) {
    const {
        parent    = document.body,
        container = createContainer()
    } = baseParams

    return Object.assign({}, baseParams, {
        container,
        resizeTo: container,
        parent
    })

}


function createContainer () {
    const container = document.createElement('div')
    container.classList.add('perky-renderer')

    return container
}


function init (renderer, {
    parent,
    container
}) {
    parent.appendChild(container)
    container.appendChild(renderer.view)

    renderer.parent = parent
    renderer.container = container
}
