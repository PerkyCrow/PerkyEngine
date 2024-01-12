import {Application} from '@pixi/app'


export default class PixiRenderer {

    constructor (params = {}) {
        params = setup(params)
        this.application = new Application(params)
        init(this, params)
    }

}




function setup (params) {
    const {
        parent    = document.body,
        container = createContainer(),
        scale     = 1
    } = params

    return Object.assign(params, {
        container,
        resizeTo: container,
        scale,
        parent
    })
}


function createContainer () {
    const container = document.createElement('div')
    container.classList.add('perky-engine')

    return container
}


function init (engine, {
    parent,
    container,
    scale
}) {
    parent.appendChild(container)
    container.appendChild(engine.view)

    engine.parent = parent
    engine.container = container

    handleResize(engine)
    handleScale(engine, {scale})
}


function handleResize (engine) {
    function resize () {
        const parent = engine.parent
        const width = parent.offsetWidth
        const height = parent.offsetHeight

        engine.renderer.resize(width, height)

        // engine.stage.x = engine.renderer.width / 2
        // engine.stage.y = engine.renderer.height / 2
    }

    engine.container.addEventListener('resize', resize)

    setTimeout(resize)
}


function handleScale (engine, {scale}) {
    engine.stage.scale.set(scale)
}