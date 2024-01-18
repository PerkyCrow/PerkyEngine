import {Renderer} from '@pixi/core'


export default class Viewport {

    constructor ({
        container = createContainer()
    } = {}) {
        this.container = container

        if (!this.container.classList.contains('perky_view')) {
            this.container.classList.add('perky_view')
        }

        this.pixiRenderer = new Renderer({
            width: container.offsetWidth,
            height: container.offsetHeight,
            antialias: true,
            transparent: false,
            resolution: window.devicePixelRatio || 1
        })

        this.container.appendChild(this.pixiRenderer.view)
    }


    resize () {
        this.pixiRenderer.resize(this.container.offsetWidth, this.container.offsetHeight)
    }


    render (scene) {
        this.pixiRenderer.render(scene)
    }

}


function createContainer () {
    const container = document.createElement('div')
    container.style.position = 'absolute'
    container.style.width = '100%'
    container.style.height = '100%'
    document.body.appendChild(container)

    return container
}
