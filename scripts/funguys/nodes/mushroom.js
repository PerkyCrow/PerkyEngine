import Node2D from 'engine/nodes/node_2d'
import assets from 'engine/assets'


export default class Mushroom extends Node2D {

    onReady () {

        this.on('ready', () => {
            console.log('Mushroom ready')
        })

        this.timer = this.create('Timer', {
            autoStart: true,
            duration: 1,
            repeat: Infinity
        })

        const mushroomTexture = assets.getResource('images/shroom_test.png')
        const aspectRatio = mushroomTexture.aspectRatio

        this.sprite = this.create('Sprite', {
            rendererName: 'Mushroom',
            texture: 'images/shroom_test.png',
            anchor: {
                x: 0.5,
                y: 0.5
            },
            width: 1,
            height: 1 / aspectRatio
        })


        // this.timer.on('reached', () => {
        //     console.log(this.scale)
        // })

    }

}