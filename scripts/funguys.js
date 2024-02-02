import Engine from 'engine/engine'
import Camera from 'engine/nodes/camera'
import Mushroom from './funguys/nodes/mushroom'

import './funguys/initialize'


export default async function init ({assetManifest}) {

    assetManifest.add({
        path: 'images/shroom_test.png',
        type: 'texture'
    })

    await assetManifest.loadAll()

    const engine = new Engine({assetManifest})
    const {root, viewport} = engine

    const camera = new Camera({
        width: 10,
        height: 6
    })

    const mushroomTexture = engine.getResource('images/shroom_test.png')
    const aspectRatio = mushroomTexture.aspectRatio

    const mushroom = new Mushroom({
        texture: engine.getResource('images/shroom_test.png'),
        anchor: {
            x: 0.5,
            y: 0.5
        },
        width: 1,
        height: 1 / aspectRatio
    })

    root.addChild(camera)
    camera.addChild(mushroom)

    document.body.appendChild(viewport.container)


    engine.on('update', animate)

    function resize () {
        viewport.resize()
        camera.scaleToFit(viewport.getSize())
        Object.assign(camera.position, viewport.getCenter())
    }


    window.addEventListener('resize', resize)

    resize()

    function animate (deltaTime, elapsedTime) {
        // camera.position.x += deltaTime * 10
        // sprite.width = 100 + Math.sin(elapsedTime) * 100
        // rectangle.width = 100 + Math.sin(elapsedTime) * 100
    }
}
