import {Container} from '@pixi/display'

export default class Viewport {

    constructor ({x = 0, y = 0, width = 100, height = 100, scale = 1} = {}) {
        this.container = new Container()
        this.width     = width
        this.height    = height

        this.container.scale.set(scale)
        this.container.position.set(x, y)
    }

    resize ({width, height}) {
        this.width  = width
        this.height = height
    }

    update ({x, y, scale}) {
        this.container.position.set(x, y)
        this.container.scale.set(scale)
    }

    get x () {
        return this.container.x
    }

    set x (value) {
        this.container.x = value
    }

    get y () {
        return this.container.y
    }

    set y (value) {
        this.container.y = value
    }

    get scale () {
        return this.container.scale.x
    }

    set scale (value) {
        this.container.scale.set(value)
    }

    addChild (child) {
        this.container.addChild(child)
    }

    static fromElement (element) {
        const {width, height} = element.getBoundingClientRect()
        console.log(element.offsetWidth, element.offsetHeight)
        console.log(element.width, element.height)
        return new Viewport({width, height})
    }

}