import Animation from './animation'
import {easingFunctions, interpolate, normalize, clamp} from '../utils'


export default class SmoothAnimation extends Animation {

    constructor (params) {
        super(params)
        
        this.setAttribute('easing', {
            accessor: true,
            exposable: true,
            defaultValue: 'easeInOut',
            value: params.easing
        })

        this.setAttribute('targetKey', {
            accessor: true,
            exposable: true,
            value: params.targetKey
        })

        this.setAttribute('targetValue', {
            accessor: true,
            exposable: true,
            defaultValue: this.actor[this.targetKey],
            value: params.targetValue
        })
    }


    play (params = {}) {
        const play = super.play(params)

        if (play) {
            setParams(this, params)
        }

        return play
    }


    update (...args) {
        super.update(...args)

        if (this.playing) {
            const {targetKey, targetValue, actor, elapsedTime, duration, easing} = this

            const ratio = remap(elapsedTime, {
                start:  0,
                end:    duration,
                easing: easing
            })

            if (targetKey in actor) {
                actor[targetKey] = interpolate(actor[targetKey], targetValue, ratio)
            }
        }
    }


    stop () {
        const stop = super.stop()

        if (stop) {
            const {targetKey, targetValue, actor} = this

            if (targetKey in actor) {
                actor[targetKey] = targetValue
            }
        }

        return stop
    }

}


function setParams (animation, {targetKey, targetValue, easing} = {}) {
    if (typeof targetKey === 'string') {
        animation.targetKey = targetKey
    }

    if (typeof targetValue === 'number') {
        animation.targetValue = targetValue
    }

    if (easing) {
        animation.easing = easing
    }
}


function remap (value, {start = 0, end = 1, easing = 'linear'} = {}) {
    let ratio = clamp(normalize(value, start, end), 0, 1)

    const easingFunction = easingFunctions[easing]

    if (typeof easingFunction === 'function') {
        return easingFunction(ratio)
    }

    return ratio
}
