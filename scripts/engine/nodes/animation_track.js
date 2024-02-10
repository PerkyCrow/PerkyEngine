import Animation from './animation'
import {sum, pluck} from '../utils'


export default class AnimationTrack extends Animation {

    constructor (params = {}) {
        super(params)

        this.setAttribute('label', {
            accessor: true,
            defaultValue: 'track',
            value: params.label
        })

        this.duration         = 0
        this.steps            = []
        this.currentStepIndex = 0

        registerEvents(this)

        if (Array.isArray(params.steps)) {
            for (let step of params.steps) {
                this.addStep(step)
            }
        }
    }


    get currentStep () {
        return this.steps[this.currentStepIndex]
    }


    addStep (params) {
        return this.create('SmoothAnimation', params)
    }


    play (params) {
        const play = super.play(params)

        if (play) {
            smartPlay(this)
        }

        return play
    }


    update (...args) {
        super.update(...args)

        if (this.playing && this.overflow < 0) {
            if (this.currentStep && !this.currentStep.playing) {
                smartPlay(this)
            }
        }
    }


    syncDuration () {
        this.duration = getDuration(this)
    }

}


function registerEvents (track) {

    function syncDuration () {
        track.duration = getDuration(track)
    }


    track.on('attached:child', child => {
        if (child.isAnimation) {
            track.steps.push(child)
            track.emit('step:added', child)
            track.syncDuration()
        }

        child.on('change:duration', syncDuration)
    })


    track.on('detached:child', child => {
        if (child.isAnimation) {
            const index = track.steps.indexOf(child)
            if (index > -1) {
                track.steps.splice(index, 1)
                child.off('change:duration', syncDuration)
                track.emit('step:removed', child)
                track.syncDuration()
            }
        }
    })

}


function getDuration (track) {
    return sum(pluck(track.steps, 'duration'))
}


function getCurrentStepIndex (track) {
    const {steps, elapsedTime} = track

    let startAt = 0

    for (let i = 0; i < steps.length; i++) {
        const step = steps[i]
        startAt += step.duration
        if (startAt > elapsedTime) {
            return i
        }
    }

    return steps.length
}


function getStepStartAt (track, currentStep) {
    const {steps} = track

    let startAt = 0

    for (let step of steps) {
        if (step === currentStep) {
            return startAt
        }

        startAt += step.duration
    }

    return startAt
}


function smartPlay (track) {
    track.currentStepIndex = getCurrentStepIndex(track)
    const {currentStep} = track

    const stepStartAt = getStepStartAt(track, currentStep)
    const stepElapsedTime = track.elapsedTime - stepStartAt

    if (currentStep) {
        currentStep.play({elapsedTime: stepElapsedTime})
    }
}
