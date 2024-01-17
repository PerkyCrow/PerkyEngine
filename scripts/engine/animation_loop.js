const loopEngine = global.requestAnimationFrame || setTimeout


export default class AnimationLoop {

    constructor ({requestNext = loopEngine, autoStart = true, callback} = {}) {

        this.lastElapsedTime = 1
        this.paused          = false
        this.started         = false
        this.pausedAt        = 0
        this.pausedTime      = 0
        this.requestNext     = () => requestNext(elapsedTime => this.next(elapsedTime))
        this.callback        = callback

        if (autoStart) {
            this.start()
        }
    }


    start () {
        if (!this.started) {
            this.started = true
            this.requestNext()
        }
    }


    stop () {
        if (this.started) {
            this.started = false
        }
    }


    pause () {
        if (!this.paused) {
            this.paused = true
            this.pausedAt = Date.now()
        }
    }


    resume () {
        if (this.paused) {
            this.paused      = false
            this.pausedTime += Date.now() - this.pausedAt
            this.pausedAt    = 0
            this.requestNext()
        }
    }


    next (elapsedTime) {
        if (this.paused || !this.started) {
            return
        }

        elapsedTime         -= this.pausedTime
        const deltaTime      = elapsedTime - this.lastElapsedTime
        this.lastElapsedTime = elapsedTime

        if (this.callback) {
            this.callback(deltaTime / 1000, elapsedTime / 1000)
        }

        this.requestNext()
    }

}
