import Sprite from 'engine/nodes/sprite'
import assets from 'engine/assets'

export default class ForestBackground extends Sprite {

    constructor (params) {
        super(params)

        const backgroundTexture = assets.getResource('background')
        const backgroundAspectRatio = backgroundTexture.aspectRatio

        this.sprite = this.create('Sprite', {
            texture: backgroundTexture,
            width:  8 * backgroundAspectRatio,
            height: 8,
            anchor: {
                x: 0.5,
                y: 0.5
            }
        })
    }

}
