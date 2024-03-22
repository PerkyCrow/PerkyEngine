import Node2D from 'engine/nodes/node_2d'
import assets from 'engine/assets'


export default class Spore extends Node2D {

    onReady () {

        this.sprite = this.create('Sprite', {
            texture: assets.getResource('spore_scared'),
            width: 1 / 3,
            height: 1 / 3,
            anchor: {
                x: 0.5,
                y: 0.5
            }
        })

        let spriteMoving = false
        let mousePosition = {x: 0, y: 0}

        this.sprite.onDisplay('pointerdown', () => {
            spriteMoving = true
            this.sprite.rotation = -(Math.PI / 8)
            this.sprite.scale = 1.25
        })

        this.onDisplay('pointerup', () => {
            spriteMoving = false
            this.sprite.position = mousePosition
            this.sprite.rotation = 0
            this.sprite.scale = 1
        })

        this.onDisplay('globalmousemove', (event) => {
            mousePosition = this.localPositionFromEvent(event)

            if (spriteMoving) {
                this.sprite.position = mousePosition
            }
        })

        // this.on('update', () => {
        //     if (spriteMoving) {

        //     }
        // })

    }

}