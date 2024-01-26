import RectangleRenderer from './rectangle_renderer'
import {Sprite} from 'pixi.js'
import Texture from '../types/texture'



export default class SpriteRenderer extends RectangleRenderer {

    constructor (node) {
        super(node)

        this.onNode('changed:texture', texture => this.syncTexture(texture))
    }


    initDisplay () {
        const t = Texture.from('https://pixijs.com/assets/flowerTop.png')
        this.display = new Sprite(t)
    }


    syncPosition ({x, y}) {
        this.display.x = x
        this.display.y = y
    }


    syncWidth (width) {
        this.display.width = width
    }


    syncHeight (height) {
        this.display.height = height
    }


    syncAnchor ({x, y}) {
        this.display.anchor.x = x
        this.display.anchor.y = y
    }

}
