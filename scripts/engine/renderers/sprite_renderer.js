import RectangleRenderer from './rectangle_renderer'
import {Sprite, Container} from 'pixi.js'
import Vector2 from '../vector_2'
import assets from '../assets'

export default class SpriteRenderer extends RectangleRenderer {

    constructor (node) {
        super(node)

        this.onNode('changed:texture', texture => this.syncTexture(texture))

        this.onNode('changed:anchor', anchor => this.syncAnchor(anchor))

        this.onNode('changed:position', position => this.syncPosition(position))

        this.onNode('changed:scale', scale => this.syncScale(scale))

        this.syncAttributes()
    }


    initDisplay () {
        this.display = new Container()
        this.sprite = new Sprite()
        this.display.addChild(this.sprite)
    }


    syncAttributes () {
        if (!this.scale) {
            this.scale = new Vector2(this.node.scale)
        }

        super.syncAttributes()

        this.syncScale(this.node.scale)
        this.syncTexture(this.node.texture)
        this.syncAnchor(this.node.anchor)
    }


    syncTexture (texture) {
        if (texture) {
            if (typeof texture === 'string') {
                texture = assets.get(texture)
            }
            this.sprite.texture = texture
        }
    }


    syncAnchor ({x, y}) {
        this.sprite.anchor.x = x
        this.sprite.anchor.y = y
    }


    syncPosition ({x, y}) {
        this.display.x = x
        this.display.y = y
    }


    syncScale ({x, y}) {
        this.scale.x = x
        this.scale.y = y
        this.syncWidth(this.node.width)
        this.syncHeight(this.node.height)
    }


    syncWidth (width) {
        this.sprite.width = width
    }


    syncHeight (height) {
        this.sprite.height = height
    }

}
