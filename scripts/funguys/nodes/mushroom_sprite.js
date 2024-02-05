import Sprite from 'engine/nodes/sprite'
import Timer from 'engine/nodes/timer'


export default class MushroomSprite extends Sprite {

    constructor (options) {
        super(options)
        this.rendererName = 'Mushroom'

        this.timer = new Timer({
            autoStart: true,
            duration: 1,
            repeat: Infinity
        })


        this.timer.on('reached', () => {
            // console.log(this.scale)
            // this.scale.x += 1
        })

        this.addChild(this.timer)
    }

}