import Node2D from 'engine/nodes/node_2d'
import assets from 'engine/assets'


export default class Mushroom extends Node2D {

    onReady () {

        this.timer = this.create('Timer', {
            autoStart: true,
            duration: 1,
            repeat: Infinity
        })

        const texture = assets.getResource('images/shroom_test.png')
        const aspectRatio = texture.aspectRatio

        this.sprite = this.create('Sprite', {
            rendererName: 'Mushroom',
            texture,
            anchor: {
                x: 0.5,
                y: 0.5
            },
            width: 1,
            height: 1 / aspectRatio
        })


        // this.timer.on('reached', () => {
        //     console.log('timer reached')
        // })

    }

}
