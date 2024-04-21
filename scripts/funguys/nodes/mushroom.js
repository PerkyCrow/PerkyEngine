import Node2D from 'engine/nodes/node_2d'
import assets from 'engine/assets'
import useSquishAnimation from '../animations/squish_animation'


export default class Mushroom extends Node2D {

    onReady () {

        const textures = {
            idle: assets.get('shroom_scared_idle'),
            shrink: assets.get('shroom_scared_shrink'),
            spore: assets.get('spore')
        }

        const aspectRatio = textures.idle.aspectRatio

        this.backgroundSpores = this.create('Node2D')

        this.spriteContainer = this.create('Node2D')

        this.foregroundSpores = this.create('Node2D')

        this.sprite = this.spriteContainer.create('Sprite', {
            texture: textures.idle,
            anchor: {
                x: 0.5,
                y: 1
            },
            width: 1,
            height: 1 / aspectRatio
        })

        const grassTexture = assets.get('grass')

        this.create('Sprite', {
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

        this.sprite.onDisplay('pointerdown', async () => {
            await this.sprite.parent.squish.play()

            this.spriteContainer.scale.y = 1
            this.spriteContainer.scale.x = 1
        })

        this.sporeEmitter = this.create('SporeEmitter')
        this.sporeEmitter.addTarget(this.backgroundSpores, 2)
        this.sporeEmitter.addTarget(this.foregroundSpores, 1)

        useSquishAnimation(this.spriteContainer)

        this.spriteContainer.squish.tracks[0].on('reached:step', (step, index) => {
            if (index === 0) {
                this.spawnSpores()
            }
        })

        this.on('update', () => {
            const scaleAspect = this.spriteContainer.scale.y / this.spriteContainer.scale.x

            this.sprite.texture = textures.idle

            if (scaleAspect < 0.9) {
                this.sprite.texture = textures.shrink
            }
        })

    }


    spawnSpores () {
        this.sporeEmitter.emitSpores()
    }

}
