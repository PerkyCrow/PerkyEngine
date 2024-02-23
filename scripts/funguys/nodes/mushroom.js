import Node2D from 'engine/nodes/node_2d'
import assets from 'engine/assets'
import useSquishAnimation from '../animations/squish_animation'
import {randomBetween} from 'engine/utils'

export default class Mushroom extends Node2D {

    onReady () {

        const textures = {
            idle: assets.getResource('shroom_scared_idle'),
            shrink: assets.getResource('shroom_scared_shrink'),
            spore: assets.getResource('spore')
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




        // this.physics2D = this.create('Physics2D', {})



        // this.physics2D.velocity = {
        //     x: 0.5,
        //     y: 0
        // }

        useSquishAnimation(this)

        this.squish.tracks[0].on('reached:step', (step, index) => {
            if (index === 0) {
                this.spawnSpores()
            }
        })

        this.on('update', () => {
            const scaleAspect = this.scale.y / this.scale.x

            this.sprite.texture = textures.idle

            if (scaleAspect < 0.9) {
                this.sprite.texture = textures.shrink
            }


        })

    }


    spawnSpores () {
        const textures = {
            spore: assets.getResource('spore_scared')
        }

        for (let i = 0; i < 25; i++) {
            const spore = this.create('Physics2D', {
                position: {
                    x: 0,
                    y: -0.5
                },
                velocity: {
                    x: randomBetween(-0.2, 0.2),
                    y: randomBetween(-0.25, -0.75)
                },
                angularVelocity: randomBetween(-1, 1)
            })


            var scale = randomBetween(0.2, 0.5)
            const sprite = spore.create('Sprite', {
                texture: textures.spore,
                rendererName: 'Mushroom',
                width: scale,
                height: scale
            })


            spore.on('changed:position', position => {
                sprite.position = position
            })

            spore.on('update', (deltaTime) => {
                // spore.opacity -= deltaTime * 0.5
                spore.scale.x -= deltaTime * (Math.abs(spore.velocity.y) * 0.75)
                spore.scale.y -= deltaTime * (Math.abs(spore.velocity.y) * 0.75)

                if (spore.scale.x <= 0) {
                    spore.destroy()
                }
            })

            // const timer = spore.create('Timer', {
            //     duration: 3,
            //     autoStart: true
            // })

            // timer.on('reached', () => {
            //     console.log('destroying spore')
            //     spore.destroy()
            // })
        }
    }

}
