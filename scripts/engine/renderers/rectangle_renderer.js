import DisplayRenderer from './display_renderer'
import {Graphics} from 'pixi.js'


export default class RectangleRenderer extends DisplayRenderer {

    constructor (node) {
        super(node)

        this.onNode('changed:width', width => this.syncWidth(width))

        this.onNode('changed:height', height => this.syncHeight(height))
    }


    initDisplay () {
        this.display = new Graphics()
    }


    syncAttributes () {
        super.syncAttributes()

        this.syncWidth(this.node.width)
        this.syncHeight(this.node.height)
    }


    updateDisplay () {
        this.display.clear()
        this.display.beginFill(0xFF0000)
        this.display.drawRect(0, 0, this.node.width, this.node.height)
        this.display.endFill()
    }


    syncPosition ({x, y}) {
        this.display.x = x
        this.display.y = y
    }


    syncWidth () {
        this.syncPosition(this.node.position)
        this.updateDisplay()
    }


    syncHeight () {
        this.syncPosition(this.node.position)
        this.updateDisplay()
    }

}
