import RectangleRenderer from './rectangle_renderer'
import {Sprite} from 'pixi.js'
import Texture from '../types/texture'



export default class SpriteRenderer extends RectangleRenderer {

    constructor (node) {
        super(node)

        this.onNode('changed:texture', texture => this.syncTexture(texture))

        this.onNode('changed:anchor', anchor => this.syncAnchor(anchor))
    }


    initDisplay () {
        const t = Texture.from('../../images/shroom_test.png')
        this.display = new Sprite(t)
    }


    syncAttributes () {
        super.syncAttributes()

        this.syncTexture(this.node.texture)
        this.syncAnchor(this.node.anchor)
    }


    syncTexture (texture) {
        if (texture) {
            this.display.texture = texture
        }
    }


    syncAnchor ({x, y}) {
        this.display.anchor.x = x
        this.display.anchor.y = y
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

}
