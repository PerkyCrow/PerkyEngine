import Engine from 'engine/engine'
import assets from 'engine/assets'

import './funguys/initialize'


export default async function init () {

    await assets.loadAll()

    const engine = new Engine()
    const {root, viewport} = engine

    engine.mount(document.body)

    const camera = root.create('Camera', {
        width: 10,
        height: 6
    })

    viewport.setMainCamera(camera)

    camera.create('ForestBackground')

    camera.create('Mushroom', {
        position: {
            x: 1,
            y: 1
        }
    })

}
