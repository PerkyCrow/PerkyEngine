import Animation from './animation'
import SmoothAnimation from './smooth_animation'
import {pluck, sum} from './utils'

export default class AnimationTrack extends Animation {

    constructor (params = {}) {
        super(params)
        this.steps = []
        this.head  = 0

        const {steps} = params
        if (Array.isArray(steps)) {
            steps.forEach(step => this.addStep(step))
        }
    }


    get duration () {
        return sum(pluck(this.steps, 'duration'))
    }


    set duration (duration) {
        super.duration = duration
    }


    get current () {
        return this.steps[this.head]
    }


    addStep (step) {
        Object.assign(step, {parent: this})

        if (!(step instanceof Animation)) {
            step = new SmoothAnimation(step)
        }

        this.steps.push(step)

        return step
    }


    start () {
        this.head = 0
    }


    update () {
        update(this)
    }

}


function update (track) {
    const {current} = track

    if (current) {
        current.play()
        const startAt = getStepStartAt(track, current)
        current.elapsedTime = track.elapsedTime - startAt

        if (!current.playing) {
            track.head += 1
            update(track)
        }
    }
}




function getStepStartAt (track, step) {
    const {steps} = track

    let startAt = 0

    for (let animation of steps) {
        if (animation === step) {
            return startAt
        }

        startAt += animation.duration
    }

    return startAt
}