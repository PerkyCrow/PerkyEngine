import {Container} from '@pixi/display'

export class Viewport {

    constructor ({x = 0, y = 0, width = 100, height = 100, scale = 1}) {
        this.container = new Container()
        this.width     = width
        this.height    = height

        this.container.scale.set(scale)
        this.container.position.set(x, y)
    }

}