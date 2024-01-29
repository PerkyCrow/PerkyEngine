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
            transparent: false
        })

        this.container.appendChild(this.pixiRenderer.view)
    }


    getSize () {
        return {
            width:  this.container.offsetWidth,
            height: this.container.offsetHeight
        }
    }


    getCenter () {
        const {width, height} = this.getSize()

        return {
            x: width  / 2,
            y: height / 2
        }
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
