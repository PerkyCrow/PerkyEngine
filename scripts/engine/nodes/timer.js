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
        this.reapeat     = repeat
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
            this.emit('timer:start')
        }
    }


    stop () {
        if (this.started) {
            this.started = false
            this.emit('timer:stop')
        }
    }


    update (...args) {
        this.tick(...args)
    }


    tick (deltaTime) {
        if (this.started && !this.ended) {

            this.elapsedTime += deltaTime

            if (this.elapsedTime >= this.duration) {
                this.elapsedTime = 0
                this.iteration += 1
                this.emit('timer:repeat')

                if (this.iteration >= this.reapeat) {
                    this.end()
                }
            }

        }
    }


    end () {
        if (this.started && !this.ended) {
            this.ended = true
            this.emit('timer:end')
            this.stop()
        }
    }

}
