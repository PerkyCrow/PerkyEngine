import Engine from './engine/engine'
import Node2D from './engine/nodes/node_2d'
import Sprite from './engine/nodes/sprite'


import {Renderer} from '@pixi/core'



export default function init () {
    const engine = new Engine()
    const {root, view, viewport} = engine

    const base = new Node2D()
    const sprite = new Sprite()

    root.addChild(base)
    base.addChild(sprite)


    console.log(viewport)

    document.body.appendChild(viewport.container)

    let renderer = new Renderer({
        width: viewport.container.offsetWidth,
        height: viewport.container.offsetHeight,
        antialias: true,
        transparent: false,
        resolution: window.devicePixelRatio || 1
    })


    viewport.container.appendChild(renderer.view)


    window.addEventListener('resize', resize)

    function resize () {
        renderer.resize(viewport.container.offsetWidth, viewport.container.offsetHeight)
    }

    engine.on('update', animate)


    function animate (deltaTime, elapsedTime) {
        base.position.x = Math.sin(elapsedTime) * 100

        sprite.width = 100 + Math.sin(elapsedTime) * 100

        renderer.render(view.scene)
    }

}
