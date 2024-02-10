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
                y: 1
            },
            width: 1,
            height: 1 / aspectRatio
        })

        this.squish = this.create('AnimationTrack')

        this.squish.addStep({
            getter: () => this.scale.y,
            change: value => {
                this.scale.y = value
            },
            duration: 0.5,
            easing: 'easeInOut',
            target: 0.5
        })

        this.squish.addStep({
            getter: () => this.scale.y,
            change: value => {
                this.scale.y = value
            },
            duration: 1,
            easing: 'easeOut',
            target: 2
        })

        console.log(this.squish.duration)

        // this.squish1 = this.create('SmoothAnimation', {
        //     value: () => this.scale.y,
        //     change: value => {
        //         this.scale.y = value
        //     },
        //     duration: 0.5,
        //     easing: 'easeInOut',
        //     target: 0
        // })

        // this.squish2 = this.create('SmoothAnimation', {
        //     value: () => this.scale.x,
        //     change: value => {
        //         this.scale.x = value
        //     },
        //     duration: 1,
        //     easing: 'easeInOut',
        //     target: 2
        // })

    }

}
