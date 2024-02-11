import Animation from './animation'
import {easingFunctions, interpolate, normalize, clamp} from '../utils'


export default class SmoothAnimation extends Animation {

    constructor (params) {
        super(params)

        this.getValue       = params.getter || (typeof params.value === 'function' ? params.value : () => params.value)
        this.onValueChanged = params.change || (() => {})
        this.value          = this.getValue()

        this.setAttribute('easing', {
            accessor: true,
            defaultValue: 'easeInOut',
            value: params.easing
        })

        this.setAttribute('target', {
            accessor: true,
            defaultValue: 1,
            value: params.target
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
        if (super.update(...args)) {
            if (this.playing) {

                const {target, elapsedTime, duration, easing} = this
                const currentValue = this.getValue()
    
                const ratio = remap(elapsedTime, {
                    start:  0,
                    end:    duration,
                    easing: easing
                })
    
                const nextValue = interpolate(currentValue, target, ratio)
    
                if (nextValue !== currentValue) {
                    this.value = nextValue
                    this.onValueChanged(nextValue)
                }
            }

            return true
        }

        return false
    }


    stop () {
        const stop = super.stop()

        if (stop) {
            if (this.value !== this.target) {
                this.value = this.target
                this.onValueChanged(this.target)
            }
        }

        return stop
    }

}


function setParams (animation, {target, easing} = {}) {
    if (typeof target === 'number') {
        animation.target = target
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
