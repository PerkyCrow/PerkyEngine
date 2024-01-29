import Rectangle from './rectangle'


export default class Camera extends Rectangle {

    constructor () {
        super()

        this.isCamera = true
        this.rendererName = 'Camera'
    }


    scaleToFit (target) {
        const {width, height} = target
        const {width: cameraWidth, height: cameraHeight} = this

        const scale = Math.min(width / cameraWidth, height / cameraHeight)

        this.scale = {x: scale, y: scale}
    }

}
