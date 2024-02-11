import Engine from 'engine/engine'
import assets from 'engine/assets'

import {
    normalize,
    remap,
    smoothstep
} from 'engine/utils'


import './funguys/initialize'


export default async function init () {

    assets.add({
        path: 'images/shroom_test.png',
        type: 'texture'
    })

    assets.add({
        name: 'shroom_scared_idle',
        path: 'images/funguys/shroom_scared_idle.png',
        type: 'texture'
    })

    assets.add({
        name: 'shroom_scared_shrink',
        path: 'images/funguys/shroom_scared_shrink.png',
        type: 'texture'
    })

    assets.add({
        name: 'shroom_scared_stretch',
        path: 'images/funguys/shroom_scared_stretch.png',
        type: 'texture'
    })

    assets.add({
        name: 'spore',
        path: 'images/funguys/spore.png',
        type: 'texture'
    })

    await assets.loadAll()

    const engine = new Engine()
    const {root, viewport} = engine


    const camera = root.create('Camera', {
        width: 10,
        height: 6
    })


    const mushroom = camera.create('Mushroom', {
        position: {
            x: 1,
            y: 1
        }
    })

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
        // console.log(smoothstep(elapsedTime, 0, 1))
        // camera.position.x += deltaTime * 10
        // mushroom.width = Math.sin(elapsedTime)
        // mushroom.scale.x = smoothstep(elapsedTime, 0, 1)

        // camera.position.x = 5
        // mushroomSprite.position.x += deltaTime * 2
    }

}
