import Node2D from 'engine/nodes/node_2d'
import assets from 'engine/assets'
import useSquishAnimation from '../animations/squish_animation'

export default class Mushroom extends Node2D {

    onReady () {

        const textures = {
            idle: assets.getResource('shroom_scared_idle'),
            shrink: assets.getResource('shroom_scared_shrink')
        }

        const aspectRatio = textures.idle.aspectRatio

        this.sprite = this.create('Sprite', {
            rendererName: 'Mushroom',
            texture: textures.idle,
            anchor: {
                x: 0.5,
                y: 1
            },
            width: 1,
            height: 1 / aspectRatio
        })

        useSquishAnimation(this)

        this.on('update', () => {
            const scaleAspect = this.scale.y / this.scale.x

            this.sprite.texture = textures.idle

            if (scaleAspect < 0.9) {
                this.sprite.texture = textures.shrink
            }
        })

    }

}
