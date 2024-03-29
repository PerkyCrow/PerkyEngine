import Engine from 'engine/engine'
import assets from 'engine/assets'

import './crowmaker/initialize'


export default async function init () {

    await assets.loadAll()

    const engine = new Engine()
    const {root, viewport} = engine

    engine.mount(document.body)

    const camera = root.create('Camera', {width: 10, height: 8})
    viewport.setMainCamera(camera)

    camera.create('Crow', {
        scale: 2
    })


    const container = camera.create('Node2D', {
        position: {x: 0, y: 0}
    })

    console.log(container.display)

    // container.position = {x: 5, y: 4}
    // container.scale = 2

    const dom = container.create('Dom', {
        position: {x: 0, y: 0}
    })

    console.log(dom.display.getGlobalPosition())

    setTimeout(() => {
        container.position.y = 2
        container.scale = 2
        console.log(dom.display.getGlobalPosition())
    }, 1000)

    // console.log(this.display.getGlobalPosition())

}
