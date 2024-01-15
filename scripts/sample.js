import World from './engine/world'
import Node from './engine/node'
import View from './engine/view'

import Node2D from './engine/nodes/node_2d'
import Sprite from './engine/nodes/sprite'

import {Renderer} from '@pixi/core'



export default function init () {
    const world = new World()
    const root = new Node()
    const view = new View()

    const base = new Node2D()
    const sprite = new Sprite()

    root.addChild(base)
    base.addChild(sprite)


    world.on('node:ready', node => {
        view.addRendererFor(node)
    })

    world.attachRoot(root)

    const container = document.createElement('div')
    container.classList.add('perky_view')
    container.style.position = 'absolute'
    container.style.width = '100vw'
    container.style.height = '100vh'

    document.body.appendChild(container)

    let renderer = new Renderer({
        width: container.offsetWidth,
        height: container.offsetHeight,
        antialias: true,
        transparent: false,
        resolution: window.devicePixelRatio || 1
    })


    container.appendChild(renderer.view)


    window.addEventListener('resize', resize)

    function resize () {
        renderer.resize(container.offsetWidth, container.offsetHeight)
    }


    let time
    let delta

    function animate (timestamp) {
        if (!time) {
            time = timestamp
        }

        delta = (timestamp - time) * 0.001
        time = timestamp

        base.position.x = Math.sin(time * 0.001) * 100

        sprite.width = 100 + Math.sin(time * 0.001) * 100
        world.update(delta)

        renderer.render(view.scene)

        requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
}
