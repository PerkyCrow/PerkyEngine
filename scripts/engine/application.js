import World from './world'
import Node from './node'
import View from './view'
import Viewport from './viewport'
import AnimationLoop from './animation_loop'
import Notifier from './notifier'


export default class Application extends Notifier {

    constructor ({name = 'application'} = {}) {
        super()
        this.name     = name
        this.world    = new World()
        this.root     = new Node()
        this.view     = new View()
        this.viewport = new Viewport()

        this.animationLoop = new AnimationLoop({
            autoStart: false,
            callback: (deltaTime, elapsedTime) => this.update(deltaTime, elapsedTime)
        })

        init(this)
    }

    async init ({container} = {
        container: document.body
    }) {
        await this.viewport.init()
        this.mount(container)
    }

    update (deltaTime, elapsedTime) {
        this.world.update(deltaTime, elapsedTime)
        this.emit('update', deltaTime, elapsedTime)
        this.viewport.render(this.view.scene)
    }


    addLayer (params = {}) {
        return this.root.create('Layer', params)
    }

    autoResize () {
        const {root, viewport} = this
        viewport.autoResize()
        const size = viewport.getSize()
        const center = viewport.getCenter()

        root.children.forEach(child => {
            if (child.isLayer) {
                if (child.autoScale) {
                    child.smartScale(size)
                }

                if (child.autoCenter) {
                    child.position = center
                }
            }
        })
    }

    mount (container) {
        container.appendChild(this.viewport.container)
        this.viewport.autoResize()
    }

}


function init (engine) {
    const {world, root, view, animationLoop} = engine

    world.on('node:ready', node => {
        view.addRendererFor(node)
        if (node.isLayer) {
            engine.autoResize()
        }
    })

    world.on('node:destroy', node => {
        view.removeRendererFor(node)
    })

    world.attachRoot(root)

    animationLoop.start()

    function autoResizeListener () {
        engine.autoResize()
    }

    window.addEventListener('resize', autoResizeListener)
}
