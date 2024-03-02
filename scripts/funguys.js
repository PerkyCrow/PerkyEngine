import Engine from 'engine/engine'
import assets from 'engine/assets'

import './funguys/initialize'


export default async function init () {

    await assets.loadAll()

    const engine = new Engine()
    const {root, viewport} = engine

    engine.mount(document.body)

    const camera = root.create('Camera', {width: 10, height: 8})
    viewport.setMainCamera(camera)

    camera.create('ForestBackground', {height: camera.height})
    camera.create('Sidebar')

    camera.create('Mushroom', {
        position: {
            x: 0,
            y: 1
        }
    })

}
