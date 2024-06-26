import Application from 'engine/application'
import assets from 'engine/assets'

import './crowmaker/initialize'


export default async function init () {

    await assets.loadAll()

    const app = new Application()

    await app.init({container: document.body})

    const main = app.addLayer({width: 10, height: 8})

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
