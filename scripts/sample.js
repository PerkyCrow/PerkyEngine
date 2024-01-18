import Engine from './engine/engine'
import Node2D from './engine/nodes/node_2d'
import Sprite from './engine/nodes/sprite'


export default function init () {
    const engine = new Engine()
    const {root, viewport} = engine

    const base = new Node2D()
    const sprite = new Sprite()

    root.addChild(base)
    base.addChild(sprite)

    document.body.appendChild(viewport.container)
    window.addEventListener('resize', () => viewport.resize())

    engine.on('update', animate)

    function animate (deltaTime, elapsedTime) {
        base.position.x = Math.sin(elapsedTime) * 100
        sprite.width = 100 + Math.sin(elapsedTime) * 100
    }
}
