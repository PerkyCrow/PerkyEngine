import Renderer from '../renderer'


export default class DisplayRenderer extends Renderer {

    constructor (node) {
        super(node)

        this.onNode('changed:position', ({x, y}) => {
            this.display.x = x
            this.display.y = y
        })

        this.onNode('changed:rotation', rotation => {
            this.display.rotation = rotation
        })

        this.onNode('changed:scale', ({x, y}) => {
            this.display.scale.x = x
            this.display.scale.y = y
        })

        this.onNode('changed:pivot', ({x, y}) => {
            this.display.pivot.x = x
            this.display.pivot.y = y
        })
    }

}