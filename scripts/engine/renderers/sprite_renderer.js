import RectangleRenderer from './rectangle_renderer'
import {Sprite} from 'pixi.js'
import Vector2 from '../types/vector_2'
import assetManifest from '../../asset_manifest'

export default class SpriteRenderer extends RectangleRenderer {

    constructor (node) {
        super(node)

        this.onNode('changed:texture', texture => this.syncTexture(texture))

        this.onNode('changed:anchor', anchor => this.syncAnchor(anchor))

        this.onNode('changed:position', position => this.syncPosition(position))

        this.onNode('changed:scale', scale => this.syncScale(scale))
    }


    initDisplay () {
        this.display = new Sprite()
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
                texture = assetManifest.getResource(texture)
            }
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


    syncScale ({x, y}) {
        this.scale.x = x
        this.scale.y = y
        this.syncWidth(this.node.width)
        this.syncHeight(this.node.height)
    }


    syncWidth (width) {
        this.display.width = width * this.node.scale.x
    }


    syncHeight (height) {
        this.display.height = height * this.node.scale.y
    }

}
