import Node2D from 'engine/nodes/node_2d'
import assets from 'engine/assets'


export default class Crow extends Node2D {

    onReady () {

        this.body = this.create('Sprite', {
            texture: assets.getResource('crow_body_01'),
            width: 1,
            height: 1,
            anchor: {
                x: 0.5,
                y: 0.5
            }
        })

        this.leftEye = this.create('Sprite', {
            texture: assets.getResource('crow_left_eye_01'),
            width: 1,
            height: 1,
            anchor: {
                x: 0.5,
                y: 0.5
            }
        })

        this.beak = this.create('Sprite', {
            texture: assets.getResource('crow_beak_01'),
            width: 1,
            height: 1,
            anchor: {
                x: 0.5,
                y: 0.5
            }
        })

        this.rightEye = this.create('Sprite', {
            texture: assets.getResource('crow_right_eye_03'),
            width: 1,
            height: 1,
            anchor: {
                x: 0.5,
                y: 0.5
            }
        })

    }

}
