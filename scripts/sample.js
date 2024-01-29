import Engine from './engine/engine'
import Camera from './engine/nodes/camera'
import Sprite from './engine/nodes/sprite'
import Rectangle from './engine/nodes/rectangle'

export default function init () {
    const engine = new Engine()
    const {root, viewport} = engine

    const camera = new Camera()
    const sprite = new Sprite()
    const rectangle = new Rectangle()

    root.addChild(camera)
    camera.addChild(rectangle)
    camera.addChild(sprite)

    sprite.anchor.x = 0.5
    sprite.anchor.y = 0.5

    sprite.width  = 1
    sprite.height = 1

    camera.width = 10
    camera.height = 6

    rectangle.width = 10
    rectangle.height = 6
    rectangle.position.x = -5
    rectangle.position.y = -3

    camera.scaleToFit(viewport.getSize())

    camera.position.x = 0

    document.body.appendChild(viewport.container)
    window.addEventListener('resize', () => viewport.resize())

    engine.on('update', animate)



    Object.assign(camera.position, viewport.getCenter())




    window.addEventListener('resize', () => {
        viewport.resize()
        const center = viewport.getCenter()

        camera.scaleToFit(viewport.getSize())
        Object.assign(camera.position, viewport.getCenter())
    })

    function animate (deltaTime, elapsedTime) {
        // camera.position.x += deltaTime * 10
        // sprite.width = 100 + Math.sin(elapsedTime) * 100
        // rectangle.width = 100 + Math.sin(elapsedTime) * 100
    }
}
