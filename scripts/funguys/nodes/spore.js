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

        this.sprite.use('draggable')

        this.sprite.on('drag:start', () => {
            this.sprite.rotation = -(Math.PI / 8)
            this.sprite.scale = 1.25
            document.body.style.cursor = 'none'
        })

        this.sprite.on('drag:end', () => {
            this.sprite.rotation = 0
            this.sprite.scale = 1
            document.body.style.cursor = 'auto'
        })


    }

}
