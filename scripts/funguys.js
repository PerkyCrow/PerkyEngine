import Application from 'engine/application'
import assets from 'engine/assets'

import './funguys/initialize'


export default async function init () {

    await assets.loadAll()

    const app = new Application()

    await app.init({container: document.body})

    const main = app.addLayer({
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

    app.addLayer({
        width: 10,
        height: 8
    })

}
