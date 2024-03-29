import Engine from 'engine/engine'
import assets from 'engine/assets'

assets.add({
    name: 'shroom_scared_idle',
    path: 'images/funguys/shroom_scared_idle.png',
    type: 'texture'
})


export default async function init () {


    await assets.loadAll()

    const engine = new Engine()
    const {root, viewport} = engine

    await engine.init({container: document.body})


    const camera = root.create('Camera', {width: 10, height: 8})
    viewport.setMainCamera(camera)

    const texture = assets.getResource('shroom_scared_idle')

    camera.create('Sprite', {
        texture: texture,
        anchor: {
            x: 0.5,
            y: 0.5
        },
        width: 1,
        height: 1
    })

}
