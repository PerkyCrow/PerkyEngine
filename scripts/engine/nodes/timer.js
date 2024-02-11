import Node from '../node'


export default class Timer extends Node {

    constructor ({
        autoStart = false,
        duration  = 1,
        repeat    = 1
    } = {}) {
        super()

        this.started     = false
        this.ended       = false
        this.isTimer     = true

        this.duration    = duration
        this.repeat     = repeat
        this.elapsedTime = 0
        this.iteration   = 0

        if (autoStart) {
            this.start()
        }
    }


    start (elapsedTime = 0) {
        if (!this.started) {
            this.elapsedTime = elapsedTime
            this.started = true
            this.iteration = 0
            this.emit('start')
        }
    }


    stop () {
        if (this.started) {
            this.started = false
            this.emit('stop')
        }
    }


    update (...args) {
        super.update(...args)
        this.tick(...args)
    }


    tick (deltaTime) {
        if (this.started && !this.ended) {
            this.elapsedTime += deltaTime

            while (this.elapsedTime >= this.duration) {
                this.elapsedTime -= this.duration
                this.iteration += 1
                this.emit('reached')
    
                if (this.iteration >= this.repeat) {
                    this.end()
                    break
                }
            }
        }
    }


    end () {
        if (this.started && !this.ended) {
            this.ended = true
            this.emit('end')
            this.stop()
        }
    }

}
