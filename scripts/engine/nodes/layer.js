import Rectangle from './rectangle'


export default class Layer extends Rectangle {

    static renderable = true

    static rendererName = 'Layer'


    constructor (params = {}) {
        super(params)

        this.isLayer = true
        this.rendererName = 'Layer'

        this.setAttribute('autoScaleMethod', {
            accessor: true,
            serializable: true,
            value: params.autoScaleMethod,
            defaultValue: 'scaleToFit'
        })
    }


    autoScale (target) {
        const {autoScaleMethod} = this

        if (autoScaleMethod === 'scaleToFit') {
            this.scaleToFit(target)
        } else if (autoScaleMethod === 'scaleToCover') {
            this.scaleToCover(target)
        } else if (autoScaleMethod === 'stretchToCover') {
            this.stretchToCover(target)
        }
    }


    scaleToFit (target) {
        const {width, height} = target
        const {width: layerWidth, height: layerHeight} = this

        const scale = Math.min(width / layerWidth, height / layerHeight)

        this.scale = {x: scale, y: scale}
    }


    scaleToCover (target) {
        const {width, height} = target
        const {width: layerWidth, height: layerHeight} = this

        const scale = Math.max(width / layerWidth, height / layerHeight)

        this.scale = {x: scale, y: scale}
    }


    stretchToCover (target) {
        const {width, height} = target
        const {width: layerWidth, height: layerHeight} = this

        this.scale = {
            x: width  / layerWidth,
            y: height / layerHeight
        }
    }

}
