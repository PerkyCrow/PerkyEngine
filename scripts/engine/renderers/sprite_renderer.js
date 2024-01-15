import DisplayRenderer from './display_renderer'
import {Sprite} from '@pixi/sprite'
import Texture from '../types/texture'

export default class SpriteRenderer extends DisplayRenderer {

    constructor (node) {
        super(node)
        const t = Texture.from('https://pixijs.com/assets/flowerTop.png')
        console.log(t)
        this.display = new Sprite(t)

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