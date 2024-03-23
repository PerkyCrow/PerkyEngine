import {Graphics} from 'pixi.js'
import {Container} from 'pixi.js'


export default class Grid {

    constructor () {
        this.container = new Container()
        this.lines = new Graphics()

        this.container.addChild(this.lines)
    }

    update ({width, height, x, y, scale}) {
        const {
            lines,
            interval = 100
        } = this

        const scaledInterval = interval * scale

        lines.clear()
        lines.lineStyle(1, 0x000000, 0.1)

        for (let i = x % scaledInterval; i < width; i += scaledInterval) {
            lines.moveTo(i, 0)
            lines.lineTo(i, height)
        }

        for (let j = y % scaledInterval; j < height; j += scaledInterval) {
            lines.moveTo(0, j)
            lines.lineTo(width, j)
        }

        // horizontal axis
        lines.lineStyle(1, 0xbb4553, 1)
        lines.moveTo(0, y)
        lines.lineTo(width, y)

        // vertical axis
        lines.lineStyle(1, 0x86b23b, 1)
        lines.moveTo(x, 0)
        lines.lineTo(x, height)
    }

}