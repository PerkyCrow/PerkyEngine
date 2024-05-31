import Rectangle from './rectangle'


export default class Layer extends Rectangle {

    static renderable = true

    static rendererName = 'Layer'


    constructor (params = {}) {
        super(params)

        this.isLayer = true
        this.rendererName = 'Layer'

        this.setAttribute('autoScale', {
            serializable: true,
            value: params.autoScale,
            defaultValue: 'contain'
        })

        this.setAttribute('autoCenter', {
            serializable: true,
            value: params.autoCenter,
            defaultValue: true
        })
    }


    smartScale (target) {
        const {autoScale} = this

        if (autoScale === 'contain') {
            this.scaleToContain(target)
        } else if (autoScale === 'cover') {
            this.scaleToCover(target)
        } else if (autoScale === 'stretch') {
            this.stretchToCover(target)
        }
    }


    scaleToContain (target) {
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
