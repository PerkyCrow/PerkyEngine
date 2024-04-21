import {Spritesheet as PixiSpritesheet} from 'pixi.js'


export default class Spritesheet extends PixiSpritesheet {

    static is (value) {
        return value instanceof Spritesheet
    }


    static cast (value) {
        if (!Spritesheet.is(value)) {
            value = new PixiSpritesheet(value)
        }

        return value
    }


    static serialize (value) {
        return value && value.data && value.data.meta.image
    }


    get (name) {
        return this.textures[name] || this.textures[`${name}.${this.extension}`]
    }

}
