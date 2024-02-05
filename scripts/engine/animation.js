export default class Animation {

    static duration  = 1
    static rate      = 1

    constructor (params = {}) {
        const {parent} = params

        this.parent           = parent
        this.rate             = this.constructor.rate
        this.duration         = this.constructor.duration
        this.elapsedTimeCache = 0
        this.playing          = false

        setParams(this, params)

        if (this.initialize) {
            this.initialize(params)
        }
    }


    get rate () {
        const {relativeRate, parent} = this
        const parentRate = parent ? parent.rate : 1

        return relativeRate * parentRate
    }


    set rate (rate) {
        this.relativeRate = rate
    }


    get duration () {
        return this.relativeDuration / this.rate
    }


    set duration (duration) {
        this.relativeDuration = duration
    }


    get progress () {
        return this.elapsedTime / this.duration
    }


    set progress (progress) {
        this.elapsedTime = this.duration * Math.max(0, Math.min(1, progress))
    }


    get elapsedTime () {
        return this.elapsedTimeCache
    }


    set elapsedTime (elapsedTime) {
        const {elapsedTimeCache} = this
        this.elapsedTimeCache = elapsedTime

        const deltaTime = elapsedTime - elapsedTimeCache

        update(this, deltaTime)
    }


    get overflow () {
        return this.elapsedTime - this.duration
    }


    play (params) {
        if (!this.playing) {
            this.playing = true

            setParams(this, params)

            if (this.start) {
                this.start(params)
            }

            update(this, this.elapsedTime)

            return new Promise(resolve => {
                this.notifyStop = resolve
            })
        }

        return false
    }


    tick (deltaTime) {
        if (this.playing) {
            this.elapsedTime += deltaTime
        }
    }


    stop () {
        if (this.playing) {
            this.playing = false

            if (this.notifyStop) {
                this.notifyStop()
                delete this.notifyStop
            }

            if (this.end) {
                this.end()
            }
        }
    }

}



function setParams (animation, {rate, duration, elapsedTime} = {}) {
    if (typeof rate === 'number') {
        animation.rate = rate
    }

    if (typeof duration === 'number') {
        animation.duration = duration
    }

    if (typeof elapsedTime === 'number') {
        animation.elapsedTimeCache = elapsedTime
    }
}



function update (animation, deltaTime) {
    if (animation.update) {
        animation.update(deltaTime)
    }

    if (animation.overflow >= 0) {
        animation.stop()
    }
}
