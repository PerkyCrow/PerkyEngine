import Sprite from 'engine/nodes/sprite'


export default class Mushroom extends Sprite {

    constructor (options) {
        super(options)
        this.rendererName = 'Mushroom'

        this.timer = this.create('Timer', {
            autoStart: true,
            duration: 1,
            repeat: Infinity
        })


        // this.timer.on('reached', () => {
        //     console.log(this.scale)
        // })

    }

}