import DisplayRenderer from './display_renderer'
import {Container} from '@pixi/display'


export default class ContainerRenderer extends DisplayRenderer {

    constructor (node) {
        super(node)
        this.display = new Container()
    }

}
