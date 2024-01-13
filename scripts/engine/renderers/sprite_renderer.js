import DisplayRenderer from './display_renderer'
import {Sprite} from '@pixi/sprite'


export default class SpriteRenderer extends DisplayRenderer {

    constructor (node) {
        super(node)
        this.display = new Sprite()

        this.onNode('changed:texture', texture => {
            this.display.texture = texture
        })

        this.onNode('changed:width', width => {
            this.display.width = width
        })

        this.onNode('changed:height', height => {
            this.display.height = height
        })

        this.onNode('changed:anchor', ({x, y}) => {
            this.display.anchor.x = x
            this.display.anchor.y = y
        })
    }

}
