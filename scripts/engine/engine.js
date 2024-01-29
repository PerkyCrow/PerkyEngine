import World from './world'
import Node from './node'
import View from './view'
import Viewport from './viewport'
import AnimationLoop from './animation_loop'
import Notifier from './notifier'
import AssetManifest from './asset_manifest'


export default class Engine extends Notifier {

    constructor ({assetManifest} = {}) {
        super()
        this.world    = new World()
        this.root     = new Node()
        this.view     = new View()
        this.viewport = new Viewport()
        this.assetManifest = assetManifest || new AssetManifest()

        this.animationLoop = new AnimationLoop({
            autoStart: false,
            callback: (deltaTime, elapsedTime) => this.update(deltaTime, elapsedTime)
        })

        init(this)
    }

    update (deltaTime, elapsedTime) {
        this.world.update(deltaTime, elapsedTime)
        this.emit('update', deltaTime, elapsedTime)
        this.viewport.render(this.view.scene)
    }


    getAsset (name) {
        return this.assetManifest.get(name)
    }


    getResource (name) {
        return this.assetManifest.getResource(name)
    }

}


function init (engine) {
    const {world, root, view, animationLoop} = engine

    world.on('node:ready', node => {
        view.addRendererFor(node)
    })

    world.on('node:destroy', node => {
        view.removeRendererFor(node)
    })

    world.attachRoot(root)

    animationLoop.start()
}
