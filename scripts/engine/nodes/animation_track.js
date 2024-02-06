import Animation from './animation'

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

}
