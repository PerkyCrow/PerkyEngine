import {autoDetectRenderer} from 'pixi.js'


export default class Viewport {

    constructor ({
        container = createContainer()
    } = {}) {
        this.container = container

        if (!this.container.classList.contains('perky_view')) {
            this.container.classList.add('perky_view')
        }

    }

    async init () {
        this.adapter = await autoDetectRenderer({
            width: this.container.offsetWidth,
            height: this.container.offsetHeight,
            antialias: true
        })

        this.container.appendChild(this.adapter.canvas)

        window.addEventListener('resize', () => {
            this.autoResize()
        })
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
        this.adapter.resize(this.container.offsetWidth, this.container.offsetHeight)
    }


    render (scene) {
        if (this.adapter) {
            this.adapter.render(scene)
        }
    }


    setMainCamera (camera) {
        this.mainCamera = camera
        this.autoResize()
    }


    autoResize () {
        this.resize()

        if (this.mainCamera) {
            this.mainCamera.scaleToFit(this.getSize())
            Object.assign(this.mainCamera.position, this.getCenter())
        }
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

