import AnimationTrack from './animation_track'


export default class AnimationPropertyTrack extends AnimationTrack {

    initProperties (params) {
        super.initProperties(params)
        this.getValue       = params.getter || (typeof params.value === 'function' ? params.value : () => params.value)
        this.onValueChanged = params.change || (() => {})
        this.value          = this.getValue()
    }

    addStep (params) {
        return super.addStep(Object.assign({}, params, {
            getter: this.getValue,
            change: this.onValueChanged
        }))
    }

}
