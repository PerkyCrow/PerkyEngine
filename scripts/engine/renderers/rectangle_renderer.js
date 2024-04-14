import DisplayRenderer from './display_renderer'
import {Graphics, Container} from 'pixi.js'


export default class RectangleRenderer extends DisplayRenderer {

    constructor (node) {
        super(node)

        this.onNode('changed:width', width => this.syncWidth(width))

        this.onNode('changed:height', height => this.syncHeight(height))
    }


    initDisplay () {
        this.display = new Container()
        this.graphics = new Graphics()
        this.display.addChild(this.graphics)
    }


    syncAttributes () {
        super.syncAttributes()

        this.syncWidth(this.node.width)
        this.syncHeight(this.node.height)
    }


    updateDisplay () {
        this.graphics.clear()
        this.graphics.rect(0, 0, this.node.width, this.node.height)
        this.graphics.fill(this.node.color || 0xFF0000)
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
