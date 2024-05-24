import Application from 'engine/application'
import assets from 'engine/assets'
import inputs from 'engine/inputs'

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

    const sprite = board.create('Sprite', {
        texture: reagents.get('flower_01'),
        width: 1,
        height: 1,
        position: {
            x: 1,
            y: 1
        }
    })

    const r = board.create('Reagent', {
        texture: 'flower_02',
        position: {
            x: 0,
            y: 0
        }
    })


    setTimeout(() => {
        r.assetName = 'flower_03'
    }, 1000)

    const boardInputs = inputs.create('board', {
        active: true,
        map: {
            left:  ['ArrowLeft'],
            right: ['ArrowRight']
        }
    })


    boardInputs.on('pressed:left', () => {
        sprite.position.x -= 1
    })

    inputs.on('action:pressed:right', () => {
        sprite.position.x += 1
    })

    inputs.on('input:pressed:ArrowUp', () => {
        sprite.position.y -= 1
    })

    inputs.inputObserver.on('pressed:ArrowDown', () => {
        sprite.position.y += 1
    })

}
