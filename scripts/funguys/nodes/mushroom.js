import Node2D from 'engine/nodes/node_2d'
import assets from 'engine/assets'


export default class Mushroom extends Node2D {

    onReady () {

        this.timer = this.create('Timer', {
            autoStart: true,
            duration: 1,
            repeat: Infinity
        })

        const textures = {
            idle: assets.getResource('shroom_scared_idle'),
            shrink: assets.getResource('shroom_scared_shrink'),
            stretch: assets.getResource('shroom_scared_stretch')
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

        this.squish = this.create('AnimationSequence', {
            tracks: [{
                label: 'scaleY',
                getter: () => this.scale.y,
                change: value => {
                    this.scale.y = value
                },
                steps: [{
                    duration: 0.25,
                    easing: 'easeOut',
                    target: 0.5
                }, {
                    duration: 0.25,
                    easing: 'easeInOut',
                    target: 1.25
                }, {
                    duration: 0.75,
                    easing: 'easeOut',
                    target: 1
                }]
            }, {
                label: 'scaleX',
                getter: () => this.scale.x,
                change: value => {
                    this.scale.x = value
                },
                steps: [{
                    duration: 0.25,
                    easing: 'easeOut',
                    target: 1.5
                }, {
                    duration: 0.25,
                    easing: 'easeInOut',
                    target: 0.75
                }, {
                    duration: 0.75,
                    easing: 'easeOut',
                    target: 1
                }]
            }]
        })

        this.on('update', () => {
            const scaleAspect = this.scale.y / this.scale.x

            if (scaleAspect < 0.9) {
                this.sprite.texture = textures.shrink
            } else {
                this.sprite.texture = textures.idle
            }
        })

    }

}
