import DisplayRenderer from './display_renderer'
import {Container} from '@pixi/display'


export default class ContainerRenderer extends DisplayRenderer {

    constructor (node) {
        super(node)
        this.display = new Container()
    }

    static isValid (node) {
        return node.is2D
    }

}
