import Rectangle from './rectangle'


export default class Camera extends Rectangle {

    static renderable = true

    static rendererName = 'Camera'


    constructor (params = {}) {
        super(params)

        this.isCamera = true
        this.rendererName = 'Camera'
    }


    scaleToFit (target) {
        const {width, height} = target
        const {width: cameraWidth, height: cameraHeight} = this

        const scale = Math.min(width / cameraWidth, height / cameraHeight)

        this.scale = {x: scale, y: scale}
    }


    scaleToCover (target) {
        const {width, height} = target
        const {width: cameraWidth, height: cameraHeight} = this

        const scale = Math.max(width / cameraWidth, height / cameraHeight)

        this.scale = {x: scale, y: scale}
    }


    stretchToCover (target) {
        const {width, height} = target
        const {width: cameraWidth, height: cameraHeight} = this

        this.scale = {
            x: width  / cameraWidth,
            y: height / cameraHeight
        }
    }

}
