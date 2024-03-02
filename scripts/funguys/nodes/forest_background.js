import Sprite from 'engine/nodes/sprite'
import assets from 'engine/assets'

export default class ForestBackground extends Sprite {

    constructor (params) {
        super(params)

        const backgroundTexture = assets.getResource('background')
        const backgroundAspectRatio = backgroundTexture.aspectRatio

        this.width = backgroundAspectRatio * this.height
        this.anchor = {
            x: 0.5,
            y: 0.5
        }
        this.texture = backgroundTexture
    }

}
