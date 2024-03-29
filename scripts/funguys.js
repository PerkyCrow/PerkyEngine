import Engine from 'engine/engine'
import assets from 'engine/assets'

import './funguys/initialize'


export default async function init () {

    await assets.loadAll()

    const engine = new Engine()
    const {root, viewport} = engine

    await engine.init({container: document.body})

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


    camera.create('Spore')

    camera.create('GrowingSlot', {
        position: {
            x: 3,
            y: 2
        }
    })

}
