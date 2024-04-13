import Engine from 'engine/engine'
import assets from 'engine/assets'

import './crowmaker/initialize'


export default async function init () {

    await assets.loadAll()

    const engine = new Engine()

    await engine.init({container: document.body})

    const main = engine.addLayer({width: 10, height: 8})

    main.create('Crow', {
        scale: 2
    })


    const container = main.create('Node2D', {
        position: {x: 0, y: 0}
    })

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


}
