import {Texture as PixiTexture} from '@pixi/core'


export default class Texture extends PixiTexture {

    static is (value) {
        return value instanceof PixiTexture
    }


    static cast (value) {
        if (!Texture.is(value)) {
            value = new Texture(value)
        }

        return value
    }


    static serialize (value) {
        return value.textureCacheIds[0]
    }


    get originalWidth () {
        return this.baseTexture ? this.baseTexture.width : 1
    }


    get originalHeight () {
        return this.baseTexture ? this.baseTexture.height : 1
    }


    get aspectRatio () {
        return this.originalWidth / this.originalHeight
    }

}
