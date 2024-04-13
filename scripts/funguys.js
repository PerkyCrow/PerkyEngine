import Engine from 'engine/engine'
import assets from 'engine/assets'

import './funguys/initialize'


export default async function init () {

    await assets.loadAll()

    const engine = new Engine()

    await engine.init({container: document.body})

    const main = engine.addLayer({
        width: 10,
        height: 8
    })



    main.create('ForestBackground', {height: main.height})
    main.create('Sidebar')

    main.create('Mushroom', {
        position: {
            x: 0,
            y: 1
        }
    })


    main.create('Spore')

    main.create('GrowingSlot', {
        position: {
            x: 3,
            y: 2
        }
    })

    engine.addLayer({
        width: 10,
        height: 8
    })

}
