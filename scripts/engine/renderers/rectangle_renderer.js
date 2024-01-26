import DisplayRenderer from './display_renderer'
import {Graphics} from 'pixi.js'
import Vector2 from '../types/vector_2'


export default class RectangleRenderer extends DisplayRenderer {

    constructor (node) {
        super(node)

        this.onNode('changed:width', width => this.syncWidth(width))

        this.onNode('changed:height', height => this.syncHeight(height))

        this.onNode('changed:anchor', anchor => this.syncAnchor(anchor))
    }


    initDisplay () {
        this.display = new Graphics()
        this.anchor = new Vector2(this.node.anchor.x, this.node.anchor.y)
        this.updateDisplay()
    }


    updateDisplay () {
        this.display.clear()
        this.display.beginFill(0xFF0000)
        this.display.drawRect(0, 0, this.node.width, this.node.height)
        this.display.endFill()
        this.changed = false
    }


    syncPosition ({x, y}) {
        this.display.x = x - this.node.width * this.anchor.x
        this.display.y = y - this.node.height * this.anchor.y
    }


    syncWidth () {
        this.syncPosition(this.node.position)
        this.updateDisplay()
    }


    syncHeight () {
        this.syncPosition(this.node.position)
        this.updateDisplay()
    }


    syncAnchor ({x, y}) {
        this.anchor.x = x
        this.anchor.y = y
        this.syncPosition(this.node.position)
    }

}
