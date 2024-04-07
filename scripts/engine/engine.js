import World from './world'
import Node from './node'
import View from './view'
import Viewport from './viewport'
import AnimationLoop from './animation_loop'
import Notifier from './notifier'


export default class Engine extends Notifier {

    constructor () {
        super()
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
        this.autoResize()
        this.world.update(deltaTime, elapsedTime)
        this.emit('update', deltaTime, elapsedTime)
        this.viewport.render(this.view.scene)
    }

    autoResize () {
        const {root, viewport} = this
        const size = viewport.getSize()
        const center = viewport.getCenter()

        root.children.forEach(child => {
            if (child.isLayer && child.autoScaleMethod) {
                child.autoScale(size)
                child.position = center
            }
        })
    }

    mount (container) {
        container.appendChild(this.viewport.container)
        this.viewport.resize()
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
