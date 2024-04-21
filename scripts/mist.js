import Application from 'engine/application'
import assets from 'engine/assets'

import './mist/initialize'


export default async function init () {

    await assets.loadAll()

    const app = new Application()

    await app.init({container: document.body})

    const main = app.addLayer({
        width:  24,
        height: 12
    })

    const board = main.create('Board')

    const reagents = assets.get('reagents')

    board.create('Sprite', {
        texture: reagents.get('flower_01'),
        width: 1,
        height: 1,
        position: {
            x: 1,
            y: 1
        }
    })


}
