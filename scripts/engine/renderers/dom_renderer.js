import RectangleRenderer from './rectangle_renderer'
import {Container} from 'pixi.js'

export default class DomRenderer extends RectangleRenderer {

    initDisplay () {
        this.display = new Container()
        this.domElement = document.createElement('div')
        this.domElement.style.position = 'absolute'
        this.domElement.innerHTML = 'Hello World'
        const parentDomElement = document.querySelector('.perky_view')
        parentDomElement.appendChild(this.domElement)
    }


    syncAttributes () {
        super.syncAttributes()

        this.syncWidth(this.node.width)
        this.syncHeight(this.node.height)
    }


    updateDisplay () {
        console.log('updateDisplay')
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