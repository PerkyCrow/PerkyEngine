import Node2D from 'engine/nodes/node_2d'
import assets from 'engine/assets'


export default class GrowingSlot extends Node2D {

    onReady () {

        const grassTexture = assets.getResource('grass')

        this.sprite = this.create('Sprite', {
            texture: grassTexture,
            width: 0.85,
            height: 0.85,
            anchor: {
                x: 0.5,
                y: 0.9
            },
            position: {
                x: 0,
                y: 0
            }
        })

    }

}