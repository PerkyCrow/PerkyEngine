import Engine from 'engine/engine'
import assets from 'engine/assets'

import './funguys/initialize'


export default async function init () {

    await assets.loadAll()

    const engine = new Engine()
    const {root, viewport} = engine


    const camera = root.create('Camera', {
        width: 10,
        height: 6
    })

    camera.create('ForestBackground')

    camera.create('Mushroom', {
        position: {
            x: 1,
            y: 1
        }
    })

    document.body.appendChild(viewport.container)


    function resize () {
        viewport.resize()
        camera.scaleToFit(viewport.getSize())
        Object.assign(camera.position, viewport.getCenter())
    }


    window.addEventListener('resize', resize)

    resize()

}
