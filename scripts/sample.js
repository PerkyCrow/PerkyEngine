import Engine from './engine/engine'
import Camera from './engine/nodes/camera'
import Sprite from './engine/nodes/sprite'
import assets from './engine/assets'

export default async function init () {

    assets.add({
        path: 'images/shroom_test.png',
        type: 'texture'
    })

    await assets.loadAll()

    const engine = new Engine()
    const {root, viewport} = engine

    const camera = new Camera({
        width: 10,
        height: 6
    })

    const mushroomTexture = assets.getResource('images/shroom_test.png')
    const aspectRatio = mushroomTexture.aspectRatio

    const sprite = new Sprite({
        texture: assets.getResource('images/shroom_test.png'),
        anchor: {
            x: 0.5,
            y: 0.5
        },
        width: 1,
        height: 1 / aspectRatio
    })

    root.addChild(camera)
    camera.addChild(sprite)


    sprite.renderer.onDisplay('click', () => {
        console.log('click')
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
        // camera.position.x += deltaTime * 10
        // sprite.width = 100 + Math.sin(elapsedTime) * 100
        // rectangle.width = 100 + Math.sin(elapsedTime) * 100
    }
}
