import Node2D from 'engine/nodes/node_2d'
import {randomBetween, weightedChoice} from 'engine/utils'
import assets from 'engine/assets'


export default class SporeEmitter extends Node2D {

    constructor (params = {}) {
        super(params)
        this.targets = []
        this.setAttribute('sporesCount', {
            accessor: true,
            serializable: false,
            defaultValue: 25,
            value: params.sporesCount
        })

    }


    addTarget (value, weight = 1) {
        this.targets.push({value, weight})
    }


    emitSpores () {

        const textures = {
            spore: assets.getResource('spore_scared')
        }

        for (let i = 0; i < this.sporesCount; i++) {

            let container = this.targets.length > 0 ? weightedChoice(this.targets) : this

            const spore = container.create('Physics2D', {
                position: {
                    x: randomBetween(-0.2, 0.2),
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
                spore.scale.x -= deltaTime * (Math.abs(spore.velocity.y) * 0.75)
                spore.scale.y -= deltaTime * (Math.abs(spore.velocity.y) * 0.75)

                if (spore.scale.x <= 0) {
                    spore.destroy()
                }
            })
        }

    }

}
